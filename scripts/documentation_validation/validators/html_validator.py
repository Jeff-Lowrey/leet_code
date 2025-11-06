#!/usr/bin/env python3
"""HTML Rendering Validator

Validates documentation by comparing rendered HTML pages from Flask server.
Provides functionality for:
- Downloading HTML from running Flask server
- Comparing HTML between branches
- Basic HTML structure validation
"""

import urllib.request
import urllib.error
import time
import re
from pathlib import Path
from typing import Optional, Dict, List, Tuple
from difflib import unified_diff


# Server configuration
SERVER_HOST = "127.0.0.1"
SERVER_PORT = "9501"
BASE_URL = f"http://{SERVER_HOST}:{SERVER_PORT}"

# Repository root (3 levels up from this file)
REPO_ROOT = Path(__file__).resolve().parent.parent.parent.parent


class HTMLValidator:
    """Validates documentation by comparing rendered HTML pages.

    Replicates functionality of standalone scripts:
    - .claude_functions/html_validate/download_complete_pages.py
    - .claude_functions/html_validate/compare_html.py
    """

    @staticmethod
    def check_server_running() -> bool:
        """Check if the Flask server is running."""
        try:
            with urllib.request.urlopen(f"{BASE_URL}/", timeout=5) as response:
                return response.status == 200
        except Exception:
            return False

    @staticmethod
    def fetch_css() -> str:
        """Fetch the main CSS file from the server."""
        try:
            with urllib.request.urlopen(f"{BASE_URL}/static/css/main.css", timeout=10) as response:
                return response.read().decode('utf-8')
        except Exception as e:
            print(f"Warning: Could not fetch main.css: {e}")
            return ""

    @staticmethod
    def fetch_and_inline_html(category: str, filename: str, main_css: str) -> Optional[str]:
        """Fetch rendered HTML and inline the CSS.

        Args:
            category: Problem category (e.g., 'arrays-hashing')
            filename: Problem filename without extension (e.g., '0001-two-sum')
            main_css: CSS content to inline

        Returns:
            HTML content with inlined CSS, or None if fetch failed
        """
        url = f"{BASE_URL}/solution/{category}/{filename}"
        try:
            with urllib.request.urlopen(url, timeout=10) as response:
                html_content = response.read().decode('utf-8')

            # Inline CSS if available
            if main_css:
                css_tag = f'<style>\n{main_css}\n</style>'
                html_content = re.sub(
                    r'<link rel="stylesheet" href="/static/css/main\.css">',
                    css_tag,
                    html_content
                )

            return html_content
        except Exception as e:
            print(f"Error fetching {url}: {e}")
            return None

    @staticmethod
    def validate_html_structure(html_content: str) -> Tuple[bool, List[str]]:
        """Validate basic HTML structure.

        Args:
            html_content: HTML content to validate

        Returns:
            Tuple of (is_valid, list of issues)
        """
        issues = []

        if not html_content:
            return False, ["HTML content is empty"]

        # Check for required tags
        if '<details>' not in html_content:
            issues.append("Missing <details> tag in rendered output")
        if '<summary>' not in html_content:
            issues.append("Missing <summary> tag in rendered output")
        if 'SOLUTION EXPLANATION' not in html_content:
            issues.append("Missing 'SOLUTION EXPLANATION' in rendered output")

        # Check for mismatched tags
        if html_content.count('<details>') != html_content.count('</details>'):
            issues.append("Mismatched <details> tags in rendered output")
        if html_content.count('<summary>') != html_content.count('</summary>'):
            issues.append("Mismatched <summary> tags in rendered output")

        return len(issues) == 0, issues

    @staticmethod
    def normalize_html(html_content: str) -> str:
        """Normalize HTML for comparison by removing dynamic content.

        Args:
            html_content: HTML content to normalize

        Returns:
            Normalized HTML content
        """
        # Remove debugger PIN and timestamps that change between runs
        html_content = re.sub(r'Debugger PIN: \d+-\d+-\d+', 'Debugger PIN: XXX-XXX-XXX', html_content)
        return html_content

    @staticmethod
    def compare_files(html1: str, html2: str, label1: str = "reference", label2: str = "current") -> Tuple[bool, List[str]]:
        """Compare two HTML strings and return differences.

        Args:
            html1: First HTML content (reference)
            html2: Second HTML content (current)
            label1: Label for first HTML in diff
            label2: Label for second HTML in diff

        Returns:
            Tuple of (are_identical, diff_lines)
        """
        html1 = HTMLValidator.normalize_html(html1)
        html2 = HTMLValidator.normalize_html(html2)

        if html1 == html2:
            return True, []

        # Generate unified diff
        lines1 = html1.splitlines(keepends=True)
        lines2 = html2.splitlines(keepends=True)

        diff = list(unified_diff(
            lines1, lines2,
            fromfile=label1,
            tofile=label2,
            lineterm=''
        ))

        return False, diff[:100]  # Limit to first 100 lines of diff

    @staticmethod
    def download_and_save_html(category: str, filename: str, language: str,
                               output_dir: Path, main_css: str) -> Tuple[bool, str]:
        """Download and save rendered HTML with inlined CSS.

        Args:
            category: Problem category (e.g., 'arrays-hashing')
            filename: Problem filename without extension (e.g., '0001-two-sum')
            language: Language (e.g., 'python', 'javascript')
            output_dir: Base output directory
            main_css: CSS content to inline

        Returns:
            Tuple of (success: bool, message: str)
        """
        html_content = HTMLValidator.fetch_and_inline_html(category, filename, main_css)
        if not html_content:
            return False, f"Error fetching {category}/{language}/{filename}"

        # Save to file
        output_path = output_dir / category / language / f"{filename}.html"
        output_path.parent.mkdir(parents=True, exist_ok=True)

        try:
            output_path.write_text(html_content)
            return True, f"Downloaded: {category}/{language}/{filename}"
        except Exception as e:
            return False, f"Error saving {output_path}: {e}"

    @staticmethod
    def download_category_html(category: str, output_dir: Path, main_css: str = None) -> Dict:
        """Download all HTML for a category.

        Args:
            category: Problem category to download
            output_dir: Output directory for HTML files
            main_css: CSS content to inline (fetched if None)

        Returns:
            Dict with download statistics
        """
        # Fetch CSS if not provided
        if main_css is None:
            print("Fetching CSS...")
            main_css = HTMLValidator.fetch_css()
            if main_css:
                print(f"✓ Fetched CSS ({len(main_css)} bytes)")

        # Discover solutions in category
        solutions_dir = REPO_ROOT / "solutions" / category
        if not solutions_dir.exists():
            return {
                'success': 0,
                'failure': 0,
                'errors': [f"Category not found: {category}"]
            }

        solutions = []
        for lang_path in sorted(solutions_dir.iterdir()):
            if not lang_path.is_dir():
                continue
            language = lang_path.name
            for solution_file in sorted(lang_path.iterdir()):
                if solution_file.is_file() and solution_file.suffix in ['.py', '.js', '.ts', '.cpp', '.go', '.java']:
                    filename = solution_file.stem
                    solutions.append((category, filename, language))

        # Download all solutions
        success_count = 0
        failure_count = 0
        errors = []

        for i, (cat, fname, lang) in enumerate(solutions, 1):
            success, message = HTMLValidator.download_and_save_html(
                cat, fname, lang, output_dir, main_css
            )
            if success:
                success_count += 1
            else:
                failure_count += 1
                errors.append(message)

            time.sleep(0.05)  # Small delay to avoid overwhelming server

        return {
            'total': len(solutions),
            'success': success_count,
            'failure': failure_count,
            'errors': errors
        }

    @staticmethod
    def compare_html_directories(dir1: Path, dir2: Path) -> Dict:
        """Compare all HTML files in two directories.

        Args:
            dir1: Reference HTML directory (e.g., from main branch)
            dir2: Current HTML directory (e.g., from feature branch)

        Returns:
            Dict with comparison results
        """
        if not dir1.exists() or not dir2.exists():
            return {
                'error': 'One or both directories do not exist',
                'identical': 0,
                'different': 0,
                'missing': 0
            }

        # Find all HTML files in dir1
        html_files1 = sorted(dir1.rglob("*.html"))

        identical_count = 0
        different_count = 0
        missing_count = 0
        differences = []

        for file1 in html_files1:
            # Get relative path
            rel_path = file1.relative_to(dir1)
            file2 = dir2 / rel_path

            if not file2.exists():
                missing_count += 1
                differences.append({
                    'file': str(rel_path),
                    'status': 'MISSING',
                    'diff': []
                })
                continue

            # Read and compare files
            try:
                html1 = file1.read_text()
                html2 = file2.read_text()

                identical, diff = HTMLValidator.compare_files(
                    html1, html2,
                    str(file1.relative_to(dir1.parent)),
                    str(file2.relative_to(dir2.parent))
                )

                if identical:
                    identical_count += 1
                else:
                    different_count += 1
                    differences.append({
                        'file': str(rel_path),
                        'status': 'DIFFERENT',
                        'diff': diff
                    })
            except Exception as e:
                different_count += 1
                differences.append({
                    'file': str(rel_path),
                    'status': 'ERROR',
                    'diff': [f"Error comparing: {e}"]
                })

        return {
            'total': len(html_files1),
            'identical': identical_count,
            'different': different_count,
            'missing': missing_count,
            'differences': differences
        }
