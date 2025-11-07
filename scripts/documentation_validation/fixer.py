#!/usr/bin/env python3
"""Claude-Assisted Documentation Fixer

Hybrid approach: Script does maximum automated analysis (90%), Claude provides semantic fixes (10%).

Workflow:
1. Script: Template validation + heuristic quality analysis
2. Script: Score sections 0-100%, filter problematic ones (< 80%)
3. Script: Present issues to Claude in structured format
4. Claude: Analyze and provide improved content (in conversation)
5. Script: Apply improvements, re-validate, iterate until 100%

This script is meant to be run interactively with Claude in the conversation.
"""

import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json
import os
import urllib.request
import urllib.error
import time
import re
from difflib import unified_diff

# Get repository root and add paths
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(REPO_ROOT / "src"))
sys.path.insert(0, str(SCRIPT_DIR))

from leet_code.markdown_extraction import extract_markdown_from_code, parse_complete_problem_data
from validators.template_validator import TemplateValidator
from validators.extractors import extract_problem_data
from validators.quality_validator import QualityValidator
from validators.html_validator import HTMLValidator
from validators.server_manager import FlaskServerManager
from injection import inject_section_to_code
from injection import inject_markdown_to_code, update_file_with_markdown
import re
from html.parser import HTMLParser


class HTMLTextExtractor(HTMLParser):
    """Extract text content from HTML."""

    def __init__(self):
        super().__init__()
        self.text = []

    def handle_data(self, data):
        self.text.append(data.strip())

    def get_text(self):
        return ' '.join(filter(None, self.text))


def normalize_text(text: str) -> str:
    """Normalize text for comparison by removing markdown formatting and extra whitespace."""
    # Remove markdown code blocks - just remove the backtick delimiters
    text = text.replace('```', '')

    # Remove markdown formatting characters
    text = text.replace('**', '')  # Bold
    text = text.replace('*', '')   # Italic/emphasis
    text = text.replace('`', '')   # Inline code

    # Remove common list markers and bullets
    text = text.replace('- ', ' ')
    text = text.replace('+ ', ' ')

    # Normalize whitespace first - collapse all whitespace to single spaces
    text = ' '.join(text.split())

    # Remove numbered list markers (1. 2. 3. etc.)
    # After whitespace normalization, they appear as " 1. " or at the start as "1. "
    words = text.split()
    filtered_words = []
    i = 0
    while i < len(words):
        word = words[i]
        # Check if word looks like a numbered list marker (digit followed by period)
        if len(word) >= 2 and word[-1] == '.' and word[:-1].isdigit():
            # Skip this word (it's a list marker like "1." or "2.")
            i += 1
            continue
        filtered_words.append(word)
        i += 1

    text = ' '.join(filtered_words)

    # Remove common punctuation differences
    text = text.replace('—', '-')
    text = text.replace('–', '-')

    # Normalize punctuation spacing - remove spaces before punctuation
    text = text.replace(' .', '.')
    text = text.replace(' ,', ',')
    text = text.replace(' :', ':')
    text = text.replace(' ;', ';')
    text = text.replace(' !', '!')
    text = text.replace(' ?', '?')

    return text.lower().strip()


def text_matches(text1: str, text2: str) -> bool:
    """Check if two texts match after normalization."""
    norm1 = normalize_text(text1)
    norm2 = normalize_text(text2)
    return norm1 == norm2


class ClaudeAssistedFixer:
    """Main fixer class that orchestrates the workflow."""

    def __init__(self, repo_root: Path, category: str | None = None, base_url: str | None = None):
        self.repo_root = repo_root
        self.template_validator = TemplateValidator(repo_root)
        self.solutions_dir = repo_root / "solutions"
        self.category = category  # Category scope for safety
        self.base_url = base_url  # Server base URL for HTML validation

    def _format_metadata(self, problem_data) -> str:
        """Format ProblemData metadata fields into a string for validation."""
        if not problem_data:
            return ""

        parts = []
        if problem_data.techniques:
            parts.append(f"**Techniques**: {', '.join(problem_data.techniques)}")
        if problem_data.data_structures:
            parts.append(f"**Data Structures**: {', '.join(problem_data.data_structures)}")
        if problem_data.patterns:
            parts.append(f"**Patterns**: {', '.join(problem_data.patterns)}")
        if problem_data.time_complexity:
            parts.append(f"**Time Complexity**: {problem_data.time_complexity}")
        if problem_data.space_complexity:
            parts.append(f"**Space Complexity**: {problem_data.space_complexity}")

        return '\n'.join(parts)

    def _get_language(self, file_ext: str) -> str:
        """Map file extension to language name."""
        ext_to_lang = {
            '.py': 'python',
            '.js': 'javascript',
            '.ts': 'typescript',
            '.java': 'java',
            '.cpp': 'cpp',
        }
        return ext_to_lang.get(file_ext, 'python')

    def _validate_file_in_category(self, file_path: Path) -> bool:
        """Validate that file is within the category scope.

        Args:
            file_path: File path to validate

        Returns:
            True if file is in category or no category set, False otherwise
        """
        if self.category is None:
            return True  # No category restriction

        category_dir = self.repo_root / "solutions" / self.category
        try:
            file_path.resolve().relative_to(category_dir.resolve())
            return True
        except ValueError:
            return False

    def analyze_file(self, file_path: Path) -> Dict:
        """Analyze a single file and return all issues.

        Args:
            file_path: Path to solution file

        Returns:
            Dict with analysis results

        Raises:
            ValueError: If file is outside category scope
        """
        # Validate file is in category
        if not self._validate_file_in_category(file_path):
            raise ValueError(
                f"File {file_path} is outside category scope '{self.category}'. "
                f"Expected files in {self.repo_root / 'solutions' / self.category}"
            )

        # Read file
        content = file_path.read_text()
        file_ext = file_path.suffix
        language = self._get_language(file_ext)

        # Extract ProblemData using src/ parser
        problem_data = extract_problem_data(content, language)

        # Template validation using ProblemData directly from src/ parser
        if problem_data:
            template_issues = self.template_validator.validate_problem_data(problem_data, language)
        else:
            template_issues = ["[TEMPLATE] Failed to extract documentation"]

        # Score each section from ProblemData
        section_scores = {}
        section_issues = {}

        # Map ProblemData fields to section names
        section_mapping = {
            "METADATA": self._format_metadata(problem_data) if problem_data else "",
            "INTUITION": problem_data.intuition if problem_data else "",
            "APPROACH": problem_data.approach if problem_data else "",
            "WHY THIS WORKS": problem_data.why_works if problem_data else "",
            "EXAMPLE WALKTHROUGH": problem_data.example_walkthrough if problem_data else "",
            "TIME COMPLEXITY": problem_data.time_complexity_explanation if problem_data else "",
            "SPACE COMPLEXITY": problem_data.space_complexity_explanation if problem_data else "",
            "EDGE CASES": problem_data.edge_cases if problem_data else "",
        }

        for name, section_content in section_mapping.items():
            score, issues = QualityValidator.score_section(name, section_content)
            section_scores[name] = score
            section_issues[name] = issues

        # HTML Rendering Validation
        html_issues = []
        html_score = 100  # Default: perfect score
        html_validation_skipped = False

        if self.base_url is not None:
            # Extract category and filename from file path
            # Path format: .../solutions/{category}/{language}/{filename}
            try:
                parts = file_path.parts
                solutions_idx = parts.index('solutions')
                category = parts[solutions_idx + 1]
                filename = file_path.stem  # Without extension

                # Fetch rendered HTML using provided base URL
                main_css = self._fetch_css()
                html_content = self._fetch_and_inline_html(category, filename, main_css)

                if html_content:
                    # Check for rendering issues
                    validation_checks = 0
                    passed_checks = 0

                    validation_checks += 1
                    if '<details>' in html_content:
                        passed_checks += 1
                    else:
                        html_issues.append("[HTML] Missing <details> tag in rendered output")

                    validation_checks += 1
                    if '<summary>' in html_content:
                        passed_checks += 1
                    else:
                        html_issues.append("[HTML] Missing <summary> tag in rendered output")

                    validation_checks += 1
                    if 'class="solution-explanation"' in html_content and '<details>' in html_content:
                        passed_checks += 1
                    else:
                        html_issues.append("[HTML] Missing solution explanation section or details elements")

                    # Check for unclosed tags or malformed HTML
                    validation_checks += 1
                    if html_content.count('<details>') == html_content.count('</details>'):
                        passed_checks += 1
                    else:
                        html_issues.append("[HTML] Mismatched <details> tags in rendered output")

                    # Compare rendered content with source markdown
                    content_checks = self._validate_content_match(html_content, section_mapping)
                    validation_checks += len(content_checks['checks'])
                    passed_checks += content_checks['passed']
                    html_issues.extend(content_checks['issues'])

                    # Calculate HTML score based on passed checks
                    html_score = (passed_checks / validation_checks * 100) if validation_checks > 0 else 0
                else:
                    html_issues.append("[HTML] Failed to fetch rendered HTML from server")
                    html_score = 0
            except (ValueError, IndexError) as e:
                html_issues.append(f"[HTML] Could not validate rendering: {e}")
                html_score = 0
        else:
            # This should never happen if server manager is used properly
            html_issues.append("[HTML] No base URL provided - server not initialized")
            html_validation_skipped = True
            html_score = 0

        # Calculate overall score including HTML validation
        # HTML validation counts as one component alongside section scores
        if section_scores:
            section_avg = sum(section_scores.values()) / len(section_scores)
            if html_validation_skipped:
                # If HTML validation was skipped, only use section scores
                overall_score = section_avg
            else:
                # Include HTML score in overall calculation (weighted equally with sections)
                overall_score = (section_avg + html_score) / 2
        else:
            overall_score = 0

        return {
            "file_path": str(file_path),
            "language": language,
            "overall_score": round(overall_score, 1),
            "html_score": round(html_score, 1),
            "html_validation_skipped": html_validation_skipped,
            "template_issues": template_issues,
            "html_issues": html_issues,
            "sections": {
                name: {
                    "score": section_scores.get(name, 0),
                    "issues": section_issues.get(name, []),
                    "content": content,
                    "present": bool(content),
                }
                for name, content in section_mapping.items()
            },
        }

    def _fetch_css(self) -> str:
        """Fetch the main CSS file from the server.

        Returns:
            CSS content as string
        """
        if self.base_url is None:
            return ""

        try:
            with urllib.request.urlopen(f"{self.base_url}/static/css/main.css", timeout=10) as response:
                return response.read().decode('utf-8')
        except Exception as e:
            print(f"Warning: Could not fetch main.css: {e}")
            return ""

    def _validate_content_match(self, html_content: str, section_mapping: dict) -> dict:
        """Validate that rendered HTML content matches source markdown.

        Args:
            html_content: Rendered HTML from server
            section_mapping: Dict of section names to markdown content

        Returns:
            Dict with 'checks', 'passed', and 'issues' keys
        """
        checks_run = 0
        checks_passed = 0
        issues = []

        # Sections to validate (map template names to markdown section names)
        sections_to_check = {
            'Intuition': 'INTUITION',
            'Approach': 'APPROACH',
            'Why This Works': 'WHY THIS WORKS',
            'Example Walkthrough': 'EXAMPLE WALKTHROUGH',
            'Edge Cases': 'EDGE CASES',
        }

        for html_section_name, markdown_section_name in sections_to_check.items():
            # Get source markdown content
            markdown_content = section_mapping.get(markdown_section_name, '')
            if not markdown_content:
                continue  # Skip if section doesn't exist in source

            # Extract HTML content for this section
            # Look for <summary>Section Name</summary>...<div class="explanation-content">...</div>
            pattern = rf'<summary>{re.escape(html_section_name)}</summary>.*?<div class="explanation-content">(.*?)</div>'
            match = re.search(pattern, html_content, re.DOTALL | re.IGNORECASE)

            if not match:
                continue  # Skip if section not found in HTML

            html_section_content = match.group(1)

            # Extract text from HTML
            extractor = HTMLTextExtractor()
            try:
                extractor.feed(html_section_content)
                html_text = extractor.get_text()
            except Exception:
                continue  # Skip if HTML parsing fails

            # Compare plain text after normalization
            matches = text_matches(markdown_content, html_text)
            checks_run += 1

            if matches:
                checks_passed += 1
            else:
                # Find where the texts differ
                md_norm = normalize_text(markdown_content)
                html_norm = normalize_text(html_text)

                # Find first difference
                min_len = min(len(md_norm), len(html_norm))
                first_diff_pos = None
                for i in range(min_len):
                    if md_norm[i] != html_norm[i]:
                        first_diff_pos = i
                        break

                if first_diff_pos is None and len(md_norm) != len(html_norm):
                    first_diff_pos = min_len

                if first_diff_pos is not None:
                    start = max(0, first_diff_pos - 50)
                    end = min(len(md_norm), first_diff_pos + 50)
                    md_context = md_norm[start:end]
                    html_context = html_norm[start:min(len(html_norm), first_diff_pos + 50)]
                    issues.append(
                        f"[HTML] {html_section_name} content mismatch at position {first_diff_pos}\n"
                        f"  Source: ...{md_context}...\n"
                        f"  Rendered: ...{html_context}..."
                    )
                else:
                    issues.append(f"[HTML] {html_section_name} content mismatch (lengths: {len(md_norm)} vs {len(html_norm)})")

        return {
            'checks': range(checks_run),
            'passed': checks_passed,
            'issues': issues
        }

    def _fetch_and_inline_html(self, category: str, filename: str, main_css: str) -> Optional[str]:
        """Fetch rendered HTML and inline the CSS.

        Args:
            category: Problem category (e.g., 'arrays-hashing')
            filename: Problem filename without extension (e.g., '0001-two-sum')
            main_css: CSS content to inline

        Returns:
            HTML content with inlined CSS, or None if fetch failed
        """
        if self.base_url is None:
            return None

        url = f"{self.base_url}/solution/{category}/{filename}"
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

    def find_problematic_files(self, quality_threshold: int = 80, max_files: int = 10) -> List[Dict]:
        """Find files with quality issues.

        Args:
            quality_threshold: Score threshold (files below this are problematic)
            max_files: Maximum number of files to return

        Returns:
            List of file analysis results, sorted by score (lowest first)
        """
        results = []

        # Scan all solution files
        for file_path in self.solutions_dir.rglob("*"):
            if file_path.is_file() and file_path.suffix in [".py", ".js", ".ts", ".java", ".cpp"]:
                analysis = self.analyze_file(file_path)
                if analysis["overall_score"] < quality_threshold:
                    results.append(analysis)

        # Sort by score (lowest first)
        results.sort(key=lambda x: x["overall_score"])

        return results[:max_files]

    def present_issues_for_claude(self, analysis: Dict) -> str:
        """Format issues for presentation to Claude.

        Args:
            analysis: File analysis results

        Returns:
            Formatted string for Claude
        """
        output = []
        output.append(f"\n{'='*80}")
        output.append(f"FILE: {analysis['file_path']}")
        output.append(f"Language: {analysis['language']}")
        output.append(f"Overall Score: {analysis['overall_score']}/100")
        output.append(f"{'='*80}\n")

        # Template issues
        if analysis["template_issues"]:
            output.append("TEMPLATE ISSUES:")
            for issue in analysis["template_issues"]:
                output.append(f"  - {issue}")
            output.append("")

        # HTML validation issues
        if analysis["html_issues"]:
            output.append("HTML VALIDATION ISSUES:")
            for issue in analysis["html_issues"]:
                output.append(f"  - {issue}")
            output.append("")

        # Section issues (only sections < 80% score)
        problematic_sections = [
            (name, data)
            for name, data in analysis["sections"].items()
            if data["score"] < 80
        ]

        if problematic_sections:
            output.append("SECTIONS NEEDING IMPROVEMENT:")
            output.append("")

            for name, data in problematic_sections:
                output.append(f"### {name} (Score: {data['score']}/100)")
                output.append("")

                if data["issues"]:
                    output.append("Issues:")
                    for issue in data["issues"]:
                        output.append(f"  - {issue}")
                    output.append("")

                if data["present"]:
                    output.append("Current Content:")
                    output.append("```")
                    output.append(data["content"])
                    output.append("```")
                else:
                    output.append("Current Content: [MISSING]")

                output.append("")
                output.append("---")
                output.append("")

        return "\n".join(output)

    def apply_section_fix(self, file_path: Path, section_name: str, new_content: str) -> bool:
        """Apply a fix to a specific section.

        Args:
            file_path: Path to file to update
            section_name: Name of section to update
            new_content: New content for the section

        Returns:
            True if successful, False otherwise

        Raises:
            ValueError: If file is outside category scope
        """
        # Validate file is in category
        if not self._validate_file_in_category(file_path):
            raise ValueError(
                f"Cannot apply fix: File {file_path} is outside category scope '{self.category}'. "
                f"Expected files in {self.repo_root / 'solutions' / self.category}"
            )

        try:
            # Read original file
            original_code = file_path.read_text()
            file_ext = file_path.suffix

            # Use surgical section replacement (preserves all other sections)
            updated_code = inject_section_to_code(original_code, section_name, new_content, file_ext)
            if not updated_code:
                print(f"Failed to inject section {section_name}")
                return False

            # Write back
            file_path.write_text(updated_code)
            return True

        except Exception as e:
            print(f"Error applying fix: {e}")
            return False

    def _remove_duplicate_sections(self, markdown: str) -> str:
        """Remove duplicate documentation sections from markdown.

        Keeps the first occurrence of each section and removes all subsequent
        duplicates. This preserves unique sections while removing only true duplicates.

        Example:
            Input:  METADATA(1) → INTUITION → METADATA(2) → APPROACH
            Output: METADATA(1) → INTUITION → APPROACH
            (METADATA(2) removed, APPROACH kept)

        Args:
            markdown: Original markdown with potential duplicates

        Returns:
            Cleaned markdown with only first occurrence of each section
        """
        import re

        # Section headers in expected order
        section_headers = [
            "### METADATA:",
            "### INTUITION:",
            "### APPROACH:",
            "### WHY THIS WORKS:",
            "### EXAMPLE WALKTHROUGH:",
            "### TIME COMPLEXITY:",
            "### SPACE COMPLEXITY:",
            "### EDGE CASES:",
        ]

        # Pattern to find next section boundary
        section_pattern = r'\n### [A-Z][A-Z\s]+:'

        # Find all section positions with their content boundaries
        all_sections = []
        for header in section_headers:
            pos = 0
            while True:
                pos = markdown.find(header, pos)
                if pos == -1:
                    break

                # Find where this section ends (next section or end of markdown)
                search_from = pos + len(header)
                next_section_match = re.search(section_pattern, markdown[search_from:])
                if next_section_match:
                    section_end = search_from + next_section_match.start()
                else:
                    section_end = len(markdown)

                all_sections.append({
                    'header': header,
                    'start': pos,
                    'end': section_end,
                    'content': markdown[pos:section_end]
                })
                pos += len(header)

        # Sort by position
        all_sections.sort(key=lambda x: x['start'])

        # Track which headers we've seen and which sections to keep
        seen_headers = set()
        sections_to_keep = []

        for section in all_sections:
            if section['header'] not in seen_headers:
                # First occurrence - keep it
                sections_to_keep.append(section)
                seen_headers.add(section['header'])
            # else: duplicate occurrence - skip it

        # Reconstruct markdown from kept sections
        if not sections_to_keep:
            return markdown

        # Build new markdown maintaining original order
        result_parts = []
        last_end = 0

        for section in sections_to_keep:
            # Add any content before this section (if at start of doc)
            if last_end == 0 and section['start'] > 0:
                result_parts.append(markdown[:section['start']])

            # Add the section content
            result_parts.append(section['content'])
            last_end = section['end']

        return ''.join(result_parts).rstrip()

    def _update_section_in_place(self, markdown: str, section_name: str, new_content: str) -> str:
        """Update a specific section in markdown without rebuilding entire document.

        Args:
            markdown: Original markdown content
            section_name: Section to update (e.g., "METADATA", "INTUITION")
            new_content: New content for the section

        Returns:
            Updated markdown with section replaced
        """
        import re

        # Map section names to their markdown headers
        section_header = f"### {section_name}:"

        # Find the section start
        section_start = markdown.find(section_header)
        if section_start == -1:
            # Section doesn't exist - append at appropriate location
            return self._append_new_section(markdown, section_name, new_content)

        # Find the next section header (or end of markdown)
        next_section_pattern = r'\n### [A-Z][A-Z\s]+:'
        search_from = section_start + len(section_header)
        next_section_match = re.search(next_section_pattern, markdown[search_from:])

        if next_section_match:
            section_end = search_from + next_section_match.start()
        else:
            section_end = len(markdown)

        # Replace the section content
        before_section = markdown[:section_start]
        after_section = markdown[section_end:]

        # Build new section
        new_section = f"{section_header}\n{new_content.strip()}\n"

        return before_section + new_section + after_section

    def _append_new_section(self, markdown: str, section_name: str, new_content: str) -> str:
        """Append a new section to markdown in the correct position.

        Args:
            markdown: Original markdown content
            section_name: Section name to add
            new_content: Content for the new section

        Returns:
            Markdown with new section appended
        """
        # Section order for documentation
        section_order = [
            "METADATA",
            "INTUITION",
            "APPROACH",
            "WHY THIS WORKS",
            "EXAMPLE WALKTHROUGH",
            "TIME COMPLEXITY",
            "SPACE COMPLEXITY",
            "EDGE CASES",
        ]

        # Find where to insert this section
        if section_name not in section_order:
            # Unknown section - append at end
            return markdown.rstrip() + f"\n\n### {section_name}:\n{new_content.strip()}\n"

        section_index = section_order.index(section_name)

        # Find the last section that comes before this one
        insert_pos = 0
        for i in range(section_index - 1, -1, -1):
            prev_section = f"### {section_order[i]}:"
            pos = markdown.find(prev_section)
            if pos != -1:
                # Found previous section - find its end
                search_from = pos + len(prev_section)
                next_section_pattern = r'\n### [A-Z][A-Z\s]+:'
                import re
                next_match = re.search(next_section_pattern, markdown[search_from:])
                if next_match:
                    insert_pos = search_from + next_match.start()
                else:
                    insert_pos = len(markdown)
                break

        # Insert the new section
        before = markdown[:insert_pos].rstrip()
        after = markdown[insert_pos:].lstrip()
        new_section = f"\n\n### {section_name}:\n{new_content.strip()}\n"

        if after:
            return before + new_section + "\n" + after
        else:
            return before + new_section

    def _rebuild_markdown(self, problem_data, original_markdown: str) -> str:
        """Rebuild markdown from ProblemData.

        Properly serializes ProblemData back to markdown format.
        NO <details> blocks - flat documentation structure.
        """
        parts = []

        # Title and difficulty
        if problem_data.number and problem_data.title:
            parts.append(f"# {problem_data.number}. {problem_data.title}")
            parts.append("")

        if problem_data.difficulty:
            parts.append(problem_data.difficulty)
            parts.append("")

        # Problem statement (if present)
        if problem_data.problem_statement:
            parts.append(problem_data.problem_statement.strip())
            parts.append("")

        # METADATA section (NO <details> wrapper)
        if problem_data.techniques or problem_data.data_structures or problem_data.time_complexity or problem_data.space_complexity:
            parts.append("### METADATA:")
            if problem_data.techniques:
                parts.append(f"**Techniques**: {', '.join(problem_data.techniques)}")
            if problem_data.data_structures:
                parts.append(f"**Data Structures**: {', '.join(problem_data.data_structures)}")
            if problem_data.patterns:
                parts.append(f"**Patterns**: {', '.join(problem_data.patterns)}")
            if problem_data.time_complexity:
                parts.append(f"**Time Complexity**: {problem_data.time_complexity}")
            if problem_data.space_complexity:
                parts.append(f"**Space Complexity**: {problem_data.space_complexity}")
            parts.append("")

        # INTUITION
        if problem_data.intuition:
            parts.append("### INTUITION:")
            parts.append(problem_data.intuition)
            parts.append("")

        # APPROACH
        if problem_data.approach:
            parts.append("### APPROACH:")
            parts.append(problem_data.approach)
            parts.append("")

        # WHY THIS WORKS
        if problem_data.why_works:
            parts.append("### WHY THIS WORKS:")
            parts.append(problem_data.why_works)
            parts.append("")

        # EXAMPLE WALKTHROUGH
        if problem_data.example_walkthrough:
            parts.append("### EXAMPLE WALKTHROUGH:")
            parts.append(problem_data.example_walkthrough)
            parts.append("")

        # TIME COMPLEXITY (full explanation)
        if problem_data.time_complexity_explanation:
            parts.append("### TIME COMPLEXITY:")
            parts.append(problem_data.time_complexity_explanation)
            parts.append("")

        # SPACE COMPLEXITY (full explanation)
        if problem_data.space_complexity_explanation:
            parts.append("### SPACE COMPLEXITY:")
            parts.append(problem_data.space_complexity_explanation)
            parts.append("")

        # EDGE CASES
        if problem_data.edge_cases:
            parts.append("### EDGE CASES:")
            parts.append(problem_data.edge_cases)
            parts.append("")

        return "\n".join(parts)

    def _get_language(self, file_ext: str) -> str:
        """Map file extension to language name."""
        ext_to_lang = {
            ".py": "python",
            ".js": "javascript",
            ".ts": "typescript",
            ".java": "java",
            ".cpp": "cpp",
            ".c": "c",
            ".go": "go",
            ".rs": "rust",
        }
        return ext_to_lang.get(file_ext, "python")


def main():
    """Main entry point for interactive use."""
    fixer = ClaudeAssistedFixer(REPO_ROOT)

    print("Claude-Assisted Documentation Fixer")
    print("=" * 80)
    print()
    print("Finding files with quality issues (< 80% score)...")
    print()

    # Find problematic files
    problematic_files = fixer.find_problematic_files(quality_threshold=80, max_files=10)

    if not problematic_files:
        print("No files found with quality issues!")
        return

    print(f"Found {len(problematic_files)} files needing improvement:")
    print()

    for i, analysis in enumerate(problematic_files, 1):
        print(f"{i}. {analysis['file_path']} (Score: {analysis['overall_score']}/100)")

    print()
    print("=" * 80)
    print()
    print("Presenting first file for Claude review:")

    # Present first file
    first_file = problematic_files[0]
    presentation = fixer.present_issues_for_claude(first_file)
    print(presentation)

    print()
    print("=" * 80)
    print()
    print("Next steps:")
    print("1. Claude analyzes the issues and provides improved content")
    print("2. Script applies improvements")
    print("3. Re-validate and iterate until 100%")


if __name__ == "__main__":
    main()
