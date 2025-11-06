#!/usr/bin/env python3
"""Iterative Claude-Assisted Documentation Fixer with Python-First Sync

Iterates until all files in a category reach 100% quality.

Workflows:

1. **BATCH MODE** (Recommended - Non-Interactive):
   - Run: python iterative_fixer.py <category> --batch-mode
   - Collects ALL issues from category
   - Presents all issues at once
   - **EXITS IMMEDIATELY** (does not wait)
   - Claude creates complete fixes.json with all fixes
   - Run: python iterative_fixer.py <category> --apply-fixes
   - Applies all fixes in batch + auto-syncs Python → TS/JS

2. **AUTO MODE** (Blocks/Waits - Use with caution):
   - Run: python iterative_fixer.py <category> --auto
   - Presents batch → **WAITS** for fixes.json → Applies → Loops
   - WARNING: Script blocks waiting for fixes.json (10min timeout per batch)

3. **MANUAL MODE**:
   - Run: python iterative_fixer.py <category>
   - Single iteration, presents batch
   - **EXITS IMMEDIATELY** (does not wait)

Python-First Strategy:
- Python files are the source of truth for documentation
- When Python documentation is fixed, it automatically syncs to other languages
- Language-specific adjustments: code block identifiers, comment formats
- Eliminates documentation inconsistencies across language implementations
"""

import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json
import time
import re

# Setup paths
SCRIPT_DIR = Path(__file__).resolve().parent
# REPO_ROOT should be /Volumes/Flower/Documents/git/leet_code
# SCRIPT_DIR is .claude_functions/documentation_review, so we go up 2 levels
REPO_ROOT = SCRIPT_DIR.parent.parent
sys.path.insert(0, str(REPO_ROOT / "src"))
sys.path.insert(0, str(SCRIPT_DIR))

# Language configuration for Python-first approach
LANGUAGE_MAP = {
    'python': {'ext': '.py', 'comment_start': '"""', 'comment_end': '"""', 'code_block': 'python'},
    'typescript': {'ext': '.ts', 'comment_start': '/**', 'comment_end': ' */', 'code_block': 'typescript'},
    'javascript': {'ext': '.js', 'comment_start': '/**', 'comment_end': ' */', 'code_block': 'javascript'},
}

from fixer import ClaudeAssistedFixer
from validators.server_manager import FlaskServerManager


class IterativeFixer:
    """Iterative fixer that processes files until all reach 100%."""

    def __init__(self, repo_root: Path, category: str):
        self.repo_root = repo_root
        self.category = category
        self.server_manager: Optional[FlaskServerManager] = None
        self.fixer: Optional[ClaudeAssistedFixer] = None
        self.iteration = 0
        self.fixes_applied = []

    def ensure_server_running(self) -> None:
        """Ensure Flask server is running for HTML validation.

        Raises:
            RuntimeError: If server fails to start
        """
        if self.server_manager is None:
            print("Starting Flask server for HTML validation...")
            self.server_manager = FlaskServerManager(self.repo_root)
            success, message = self.server_manager.start_server(timeout=15)
            if not success:
                raise RuntimeError(f"Failed to start Flask server: {message}")
            print(f"✓ {message}\n")

        # Create fixer with server's base URL
        if self.fixer is None:
            base_url = self.server_manager.get_base_url()
            self.fixer = ClaudeAssistedFixer(self.repo_root, category=self.category, base_url=base_url)
            self.fixer.solutions_dir = self.repo_root / "solutions" / self.category

    def stop_server(self) -> None:
        """Stop the Flask server if running."""
        if self.server_manager is not None:
            print("\nStopping Flask server...")
            self.server_manager.stop_server()
            self.server_manager = None
            print("✓ Server stopped")

    def analyze_all_files(self) -> List[Dict]:
        """Analyze all files in the category.

        Returns:
            List of file analyses sorted by score (lowest first)
        """
        self.ensure_server_running()
        results = []

        for file_path in self.fixer.solutions_dir.rglob("*"):
            if file_path.is_file() and file_path.suffix in [".py", ".js", ".ts", ".java", ".cpp"]:
                try:
                    analysis = self.fixer.analyze_file(file_path)
                    results.append(analysis)
                except Exception as e:
                    print(f"Warning: Failed to analyze {file_path}: {e}")

        # Sort by score (lowest first)
        results.sort(key=lambda x: x["overall_score"])
        return results

    def get_imperfect_files(self, analyses: List[Dict]) -> List[Dict]:
        """Filter to Python files that are not at 100% quality.

        Args:
            analyses: List of file analyses

        Returns:
            List of analyses for Python files < 100%
        """
        # Only consider Python files with scores < 100% as imperfect
        # Python files are the source of truth - fixes sync to TS/JS automatically
        # Template issues don't affect quality if score is 100%
        return [a for a in analyses if a["overall_score"] < 100 and a["file_path"].endswith('.py')]

    def present_batch(self, files: List[Dict], batch_size: int = 3) -> List[Dict]:
        """Present a batch of files for Claude review.

        Groups files by problem number (first 4 digits of filename) and only
        includes files from the same problem in a batch.

        Args:
            files: List of file analyses (sorted by score)
            batch_size: Maximum number of files to present (default: 3)

        Returns:
            The batch of files that were presented
        """
        if not files:
            return []

        # Extract problem number from first file (format: XXXX-problem-name.ext)
        import re
        first_file = Path(files[0]['file_path']).name
        match = re.match(r'^(\d{4})-', first_file)
        if not match:
            # Fallback to old behavior if no problem number
            return files[:batch_size]

        problem_num = match.group(1)

        # Collect all files for this problem (up to batch_size)
        batch = []
        for analysis in files:
            filename = Path(analysis['file_path']).name
            if filename.startswith(problem_num + '-'):
                batch.append(analysis)
                if len(batch) >= batch_size:
                    break

        # If we didn't find enough files for this problem, just take the first batch_size
        if not batch:
            batch = files[:batch_size]

        print(f"\n{'='*80}")
        print(f"ITERATION {self.iteration} - Batch of {len(batch)} files")
        print(f"{'='*80}\n")

        for i, analysis in enumerate(batch, 1):
            rel_path = Path(analysis['file_path']).relative_to(self.repo_root)
            print(f"\n{'-'*80}")
            print(f"FILE {i}/{len(batch)}: {rel_path}")
            print(f"Score: {analysis['overall_score']}/100")
            print(f"{'-'*80}\n")

            # Show template issues
            if analysis["template_issues"]:
                print("TEMPLATE ISSUES:")
                for issue in analysis["template_issues"]:
                    print(f"  - {issue}")
                print()

            # Show HTML validation issues
            if analysis.get("html_issues"):
                print("HTML VALIDATION ISSUES:")
                for issue in analysis["html_issues"]:
                    print(f"  - {issue}")
                print()

            # Show problematic sections (< 100% score)
            problematic_sections = [
                (name, data)
                for name, data in analysis["sections"].items()
                if data["score"] < 100
            ]

            if problematic_sections:
                print("SECTIONS NEEDING IMPROVEMENT:")
                print()

                for name, data in problematic_sections:
                    print(f"### {name} (Score: {data['score']}/100)")
                    print()

                    if data["issues"]:
                        print("Issues:")
                        for issue in data["issues"]:
                            print(f"  - {issue}")
                        print()

                    if data["present"] and data["content"]:
                        print("Current Content:")
                        print("```")
                        # Truncate very long content
                        content = data["content"]
                        if len(content) > 500:
                            print(content[:500] + "\n... [truncated]")
                        else:
                            print(content)
                        print("```")
                    else:
                        print("Current Content: [MISSING]")

                    print()

            print()

        return batch

    def wait_for_fixes_file(self, timeout_seconds: int = 300) -> Optional[Path]:
        """Wait for fixes.json file to be created.

        Args:
            timeout_seconds: Maximum time to wait (default: 5 minutes)

        Returns:
            Path to fixes.json if found, None if timeout
        """
        fixes_file = SCRIPT_DIR / "tmp" / "fixes.json"
        start_time = time.time()

        print(f"\n{'='*80}")
        print("WAITING FOR FIXES FILE")
        print(f"{'='*80}")
        print(f"Looking for: {fixes_file}")
        print("Claude should create this file with fixes for the presented batch.")
        print(f"Timeout: {timeout_seconds}s")
        print()

        while time.time() - start_time < timeout_seconds:
            if fixes_file.exists():
                print(f"✓ Found fixes file after {int(time.time() - start_time)}s")
                return fixes_file

            # Show progress every 10 seconds
            elapsed = int(time.time() - start_time)
            if elapsed > 0 and elapsed % 10 == 0:
                print(f"  Still waiting... ({elapsed}s elapsed)")

            time.sleep(1)

        print(f"✗ Timeout after {timeout_seconds}s")
        return None

    def apply_fixes_from_json(self, fixes_file: Path) -> Dict[str, bool]:
        """Apply fixes from JSON file.

        Expected JSON format:
        {
            "fixes": [
                {
                    "file": "relative/path/to/file.py",
                    "section": "METADATA",
                    "content": "new content here"
                }
            ]
        }

        Args:
            fixes_file: Path to fixes.json

        Returns:
            Dict mapping file paths to success status
        """
        # Ensure server is running for validation
        self.ensure_server_running()

        print(f"\n{'='*80}")
        print("APPLYING FIXES FROM JSON")
        print(f"{'='*80}\n")

        try:
            with open(fixes_file) as f:
                fixes_data = json.load(f)

            fixes = fixes_data.get("fixes", [])
            if not fixes:
                print("Warning: No fixes found in JSON file")
                return {}

            results = {}
            for fix in fixes:
                file_rel = fix.get("file")
                section = fix.get("section")
                content = fix.get("content")

                if not all([file_rel, section, content]):
                    print(f"  ✗ Skipping incomplete fix: {fix}")
                    continue

                file_path = self.repo_root / file_rel
                print(f"Applying fix to {file_rel} / {section}")

                try:
                    success = self.fixer.apply_section_fix(file_path, section, content)
                    results[str(file_path)] = success
                    if success:
                        print(f"  ✓ Applied")
                    else:
                        print(f"  ✗ Failed")
                except Exception as e:
                    print(f"  ✗ Error: {e}")
                    results[str(file_path)] = False

            # Archive the fixes file
            archive_name = f"fixes_applied_{int(time.time())}.json"
            archive_path = SCRIPT_DIR / "tmp" / archive_name
            fixes_file.rename(archive_path)
            print(f"\nArchived fixes to: {archive_name}")

            # Validate all fixed files
            print(f"\n{'='*80}")
            print("VALIDATING FIXED FILES")
            print(f"{'='*80}\n")

            fixed_files = set(results.keys())
            validation_results = self.validate_fixed_files(fixed_files)

            self.print_validation_report(validation_results)

            # Python-first: sync ALL Python files to other languages
            # This ensures JS/TS stay in sync even if Python files weren't in fixes.json
            print(f"\n{'='*80}")
            print("SYNCING DOCUMENTATION TO OTHER LANGUAGES")
            print(f"{'='*80}\n")

            # Get all Python files in the category
            python_dir = self.repo_root / "solutions" / self.category / "python"
            all_python_files = sorted(python_dir.glob("*.py"))

            if all_python_files:
                for py_file in all_python_files:
                    print(f"Syncing from: {py_file.relative_to(self.repo_root)}")
                    sync_results = self.sync_documentation_from_python(py_file)

                    for lang, success in sync_results.items():
                        if success:
                            print(f"  ✓ Synced to {lang}")
                        else:
                            print(f"  ✗ Failed to sync to {lang}")
                print()
            else:
                print("No Python files were fixed in this batch, skipping sync.\n")

            return results

        except Exception as e:
            print(f"Error reading fixes file: {e}")
            return {}

    # DEPRECATED: extract_python_docs() removed - use extract_markdown_from_code() from src/ instead
    # This function was stripping problem descriptions and <details> tags

    def convert_docs_to_language(self, python_docs: str, target_lang: str) -> str:
        """Convert Python documentation to target language format.

        Args:
            python_docs: Python documentation string
            target_lang: Target language ('typescript' or 'javascript')

        Returns:
            Converted documentation string
        """
        info = LANGUAGE_MAP[target_lang]

        # Normalize any literal \n that might have snuck through
        docs = python_docs.replace('\\n', '\n')

        # Replace code block language identifiers
        docs = docs.replace('```python', f'```{info["code_block"]}')

        # Convert comment format
        if target_lang in ['typescript', 'javascript']:
            # Remove Python docstring markers
            docs = docs.replace('"""', '')

            # Add JSDoc-style comments
            lines = docs.split('\n')
            formatted_lines = [info['comment_start']]
            for line in lines:
                if line.strip():
                    formatted_lines.append(f' * {line}')
                else:
                    formatted_lines.append(' *')
            formatted_lines.append(info['comment_end'])
            docs = '\n'.join(formatted_lines)

        return docs

    def find_code_start(self, file_path: Path, language: str) -> int:
        """Find where code starts in a file.

        Args:
            file_path: Path to file
            language: Language ('python', 'typescript', or 'javascript')

        Returns:
            Line number where code starts
        """
        try:
            with open(file_path, 'r') as f:
                lines = f.readlines()

            if language == 'python':
                for i, line in enumerate(lines):
                    if i > 5 and (line.strip().startswith('from ') or
                                 line.strip().startswith('import ') or
                                 line.strip().startswith('class ') or
                                 line.strip().startswith('def ')):
                        return i

            elif language in ['typescript', 'javascript']:
                for i, line in enumerate(lines):
                    if (line.strip().startswith('class ') or
                        line.strip().startswith('function ') or
                        line.strip().startswith('const ') or
                        line.strip().startswith('interface ')):
                        return i

            return 0

        except Exception:
            return 0

    def find_problem_files(self, python_file: Path) -> Dict[str, Optional[Path]]:
        """Find all language versions of a problem given the Python file.

        Args:
            python_file: Path to Python file

        Returns:
            Dict mapping language names to file paths
        """
        files = {}

        # Extract problem number from Python filename
        filename = python_file.name
        match = re.match(r'(\d{4})-', filename)
        if not match:
            return files

        problem_number = match.group(1)

        # Find files in other languages
        for lang, info in LANGUAGE_MAP.items():
            if lang == 'python':
                files[lang] = python_file
                continue

            # Look for corresponding file in sibling language directory
            lang_dir = python_file.parent.parent / lang
            if not lang_dir.exists():
                files[lang] = None
                continue

            pattern = f"{problem_number}-*{info['ext']}"
            matches = list(lang_dir.glob(pattern))
            files[lang] = matches[0] if matches else None

        return files

    def validate_fixed_files(self, file_paths: set) -> List[Dict]:
        """Validate all fixed files using all validators.

        Args:
            file_paths: Set of file paths that were fixed

        Returns:
            List of validation results for each file
        """
        validation_results = []

        for file_path_str in sorted(file_paths):
            file_path = Path(file_path_str)
            if not file_path.exists():
                continue

            try:
                # Run complete analysis with all validators
                analysis = self.fixer.analyze_file(file_path)
                validation_results.append(analysis)
            except Exception as e:
                print(f"  ✗ Error validating {file_path.name}: {e}")

        return validation_results

    def print_validation_report(self, validation_results: List[Dict]) -> None:
        """Print detailed validation report for all validators.

        Args:
            validation_results: List of file validation results
        """
        if not validation_results:
            print("No files to validate.")
            return

        total_score = 0
        perfect_count = 0

        for result in validation_results:
            file_path = Path(result['file_path'])
            rel_path = file_path.relative_to(self.repo_root)
            score = result['overall_score']
            total_score += score

            print(f"\n{'-'*80}")
            print(f"FILE: {rel_path}")
            print(f"Overall Score: {score:.1f}/100")

            # Show component breakdown
            html_score = result.get('html_score', 100)
            html_skipped = result.get('html_validation_skipped', False)
            if not html_skipped:
                print(f"  • Section Quality: {score * 2 - html_score:.1f}/100")
                print(f"  • HTML Validation: {html_score:.1f}/100")
            print(f"{'-'*80}")

            # Template Validator Results
            if result['template_issues']:
                print("\n❌ TEMPLATE VALIDATION:")
                for issue in result['template_issues']:
                    print(f"  - {issue}")
            else:
                print("\n✅ TEMPLATE VALIDATION: Passed")

            # Quality Validator Results (Section Scores)
            print("\n📊 QUALITY VALIDATION (Section Scores):")
            sections = result['sections']
            all_perfect = True
            for section_name, section_data in sections.items():
                section_score = section_data['score']
                if section_score < 100:
                    all_perfect = False
                    status = "❌" if section_score < 80 else "⚠️"
                    print(f"  {status} {section_name}: {section_score}/100")
                    if section_data['issues']:
                        for issue in section_data['issues']:
                            print(f"      - {issue}")
                else:
                    print(f"  ✅ {section_name}: {section_score}/100")

            # HTML Validator Results
            html_score = result.get('html_score', 100)
            html_skipped = result.get('html_validation_skipped', False)
            html_perfect = html_skipped or html_score >= 100

            # File is perfect if: all sections are 100%, no template issues, and HTML is 100% (or skipped)
            if all_perfect and not result['template_issues'] and html_perfect:
                perfect_count += 1

            if html_skipped:
                print("\n⚠️  HTML VALIDATION: Skipped (server not running)")
            elif html_score >= 100:
                print(f"\n✅ HTML VALIDATION: Passed ({html_score:.0f}/100)")
            else:
                print(f"\n❌ HTML VALIDATION: {html_score:.0f}/100")
                for issue in result['html_issues']:
                    print(f"  - {issue}")

            print()

        # Summary
        avg_score = total_score / len(validation_results) if validation_results else 0
        print(f"{'='*80}")
        print("VALIDATION SUMMARY")
        print(f"{'='*80}")
        print(f"Files validated: {len(validation_results)}")
        print(f"Perfect (100%): {perfect_count}/{len(validation_results)}")
        print(f"Average score: {avg_score:.1f}/100")

        if perfect_count == len(validation_results):
            print("\n🎉 All fixed files passed all validators at 100%!")
        else:
            print(f"\n⚠️  {len(validation_results) - perfect_count} file(s) still need improvement")
        print()

    def sync_documentation_from_python(self, python_file: Path) -> Dict[str, bool]:
        """Sync documentation from Python file to other languages.

        Uses src/leet_code/markdown_extraction.py functions to extract and inject
        markdown properly, preserving all content including problem descriptions.

        Args:
            python_file: Path to Python file

        Returns:
            Dict mapping language names to success status
        """
        results = {}

        # Read Python file
        with open(python_file, 'r') as f:
            python_code = f.read()

        # Extract markdown using src/ function (preserves ALL content)
        from leet_code.markdown_extraction import extract_markdown_from_code
        python_markdown = extract_markdown_from_code(python_code, '.py')

        if not python_markdown:
            print(f"  ⚠ Could not extract Python documentation")
            return results

        # Find all language files
        files = self.find_problem_files(python_file)

        # Sync to other languages
        for lang in ['typescript', 'javascript']:
            if not files.get(lang) or not files[lang].exists():
                continue

            try:
                # Read target file
                with open(files[lang], 'r') as f:
                    target_code = f.read()

                # Convert markdown to target language comment format
                target_markdown = self.convert_docs_to_language(python_markdown, lang)

                # Get file extension
                ext = '.js' if lang == 'javascript' else '.ts'

                # Inject markdown using src/ injection function
                from ..injection import inject_markdown_to_code
                updated_code = inject_markdown_to_code(target_code, target_markdown, ext)

                if not updated_code:
                    print(f"    ⚠ Failed to inject markdown for {lang}")
                    results[lang] = False
                    continue

                # Write updated code
                with open(files[lang], 'w') as f:
                    f.write(updated_code)

                results[lang] = True

            except Exception as e:
                results[lang] = False
                print(f"    Error syncing to {lang}: {e}")

        return results

    def collect_all_issues(self) -> List[Dict]:
        """Collect all issues from all files in category.

        Returns:
            List of all file analyses that need fixes
        """
        print("Collecting all issues from category...")
        all_analyses = self.analyze_all_files()
        imperfect = self.get_imperfect_files(all_analyses)

        # Statistics
        total_files = len(all_analyses)
        perfect_files = total_files - len(imperfect)
        avg_score = sum(a["overall_score"] for a in all_analyses) / total_files if total_files > 0 else 0

        print(f"\nCategory: {self.category}")
        print(f"Total files: {total_files}")
        print(f"Perfect (100%): {perfect_files}")
        print(f"Needs work: {len(imperfect)}")
        print(f"Average score: {avg_score:.1f}%\n")

        return imperfect

    def present_all_issues(self, imperfect_files: List[Dict]) -> None:
        """Present all issues at once for batch fixing.

        Args:
            imperfect_files: List of file analyses that need fixes
        """
        if not imperfect_files:
            print(f"\n🎉 All files in {self.category} are at 100% quality!")
            return

        print(f"\n{'='*80}")
        print(f"ALL ISSUES IN {self.category.upper()}")
        print(f"{'='*80}\n")
        print(f"Total files needing fixes: {len(imperfect_files)}\n")

        for file_idx, analysis in enumerate(imperfect_files, 1):
            rel_path = Path(analysis['file_path']).relative_to(self.repo_root)
            print(f"\n{'-'*80}")
            print(f"FILE {file_idx}/{len(imperfect_files)}: {rel_path}")
            print(f"Score: {analysis['overall_score']}/100")
            print(f"{'-'*80}\n")

            # Show template issues
            if analysis["template_issues"]:
                print("TEMPLATE ISSUES:")
                for issue in analysis["template_issues"]:
                    print(f"  - {issue}")
                print()

            # Show HTML validation issues
            if analysis.get("html_issues"):
                print("HTML VALIDATION ISSUES:")
                for issue in analysis["html_issues"]:
                    print(f"  - {issue}")
                print()

            # Show problematic sections (< 100% score)
            problematic_sections = [
                (name, data)
                for name, data in analysis["sections"].items()
                if data["score"] < 100
            ]

            if problematic_sections:
                print("SECTIONS NEEDING IMPROVEMENT:")
                print()

                for name, data in problematic_sections:
                    print(f"### {name} (Score: {data['score']}/100)")
                    print()

                    if data["issues"]:
                        print("Issues:")
                        for issue in data["issues"]:
                            print(f"  - {issue}")
                        print()

                    if data["present"] and data["content"]:
                        print("Current Content:")
                        print("```")
                        # Truncate very long content
                        content = data["content"]
                        if len(content) > 500:
                            print(content[:500] + "\n... [truncated]")
                        else:
                            print(content)
                        print("```")
                    else:
                        print("Current Content: [MISSING]")

                    print()

            print()

        print(f"\n{'='*80}")
        print("SCRIPT COMPLETE - ALL ISSUES PRESENTED")
        print(f"{'='*80}\n")
        print("Next steps for Claude:")
        print("1. Review all issues above")
        print("2. Create fixes.json with ALL fixes at once")
        print()
        print("Next steps for user:")
        print("1. After Claude creates fixes.json, run with --apply-fixes")
        print()
        print("Expected fixes.json location:")
        print("   .claude_functions/documentation_review/tmp/fixes.json")
        print()
        print("Expected fixes.json format:")
        print("""
{
    "fixes": [
        {
            "file": "solutions/backtracking/python/0078-subsets.py",
            "section": "METADATA",
            "content": "..."
        },
        {
            "file": "solutions/backtracking/python/0078-subsets.py",
            "section": "SPACE COMPLEXITY",
            "content": "..."
        }
    ]
}
""")
        print()
        print(">>> Script exiting now. No further action until --apply-fixes is run. <<<")
        print()

    def run_iteration(self, auto_mode: bool = False) -> bool:
        """Run one iteration of analysis and presentation.

        Args:
            auto_mode: If True, wait for fixes.json and apply automatically

        Returns:
            True if there are still files to fix, False if all are at 100%
        """
        self.iteration += 1

        print(f"\n{'#'*80}")
        print(f"# ITERATION {self.iteration}")
        print(f"{'#'*80}\n")

        # Analyze all files
        print("Analyzing all files...")
        all_analyses = self.analyze_all_files()

        # Filter to imperfect files
        imperfect = self.get_imperfect_files(all_analyses)

        # Statistics
        total_files = len(all_analyses)
        perfect_files = total_files - len(imperfect)
        avg_score = sum(a["overall_score"] for a in all_analyses) / total_files if total_files > 0 else 0

        print(f"\nCategory: {self.category}")
        print(f"Total files: {total_files}")
        print(f"Perfect (100%): {perfect_files}")
        print(f"Needs work: {len(imperfect)}")
        print(f"Average score: {avg_score:.1f}%")

        if not imperfect:
            print(f"\n🎉 All files in {self.category} are at 100% quality!")
            return False

        # Present batch for fixing
        print(f"\nPresenting next batch for Claude review...")
        batch = self.present_batch(imperfect, batch_size=5)

        if auto_mode:
            # Auto mode: wait for fixes.json and apply
            print(f"\n{'='*80}")
            print("AUTO MODE: WAITING FOR FIXES")
            print(f"{'='*80}")
            print()
            print("Claude should create: .claude_functions/documentation_review/tmp/fixes.json")
            print(f"Files in this batch: {len(batch)}")
            print()

            fixes_file = self.wait_for_fixes_file(timeout_seconds=600)  # 10 minute timeout
            if fixes_file:
                self.apply_fixes_from_json(fixes_file)
            else:
                print("\nTimeout reached. Exiting auto mode.")
                return False
        else:
            # Manual mode: show instructions and exit
            print(f"\n{'='*80}")
            print("SCRIPT COMPLETE - ISSUES PRESENTED TO CLAUDE")
            print(f"{'='*80}")
            print()
            print("Next steps for Claude:")
            print("1. Analyze the issues presented above")
            print("2. Provide improved content for each problematic section")
            print()
            print("Next steps for user:")
            print("1. Re-run this script after Claude provides fixes")
            print()
            print(f"Files remaining: {len(imperfect)}")
            print()
            print(">>> Script exiting now. No further action until re-run. <<<")
            print()

        return True

    def run_auto_loop(self, max_iterations: int = 100) -> None:
        """Run automatic loop until all files reach 100% or max iterations.

        Args:
            max_iterations: Maximum number of iterations
        """
        print(f"\n{'='*80}")
        print("AUTO MODE: CONTINUOUS LOOP")
        print(f"{'='*80}")
        print(f"Category: {self.category}")
        print(f"Max iterations: {max_iterations}")
        print()

        for i in range(max_iterations):
            has_more = self.run_iteration(auto_mode=True)

            if not has_more:
                # All files at 100%
                print(self.generate_progress_report())
                break

            # Small delay before next iteration
            print("\nWaiting 2 seconds before next iteration...")
            time.sleep(2)
        else:
            # Max iterations reached
            print(f"\n⚠️  Max iterations ({max_iterations}) reached")
            print("Some files may still need work.")
            print(self.generate_progress_report())

    def generate_progress_report(self) -> str:
        """Generate a progress report for the category.

        Returns:
            Formatted progress report
        """
        all_analyses = self.analyze_all_files()
        imperfect = self.get_imperfect_files(all_analyses)

        total_files = len(all_analyses)
        perfect_files = total_files - len(imperfect)
        avg_score = sum(a["overall_score"] for a in all_analyses) / total_files if total_files > 0 else 0

        report = []
        report.append(f"\n{'='*80}")
        report.append(f"PROGRESS REPORT: {self.category}")
        report.append(f"{'='*80}\n")
        report.append(f"Total files: {total_files}")
        report.append(f"Perfect (100%): {perfect_files} ({perfect_files/total_files*100:.1f}%)")
        report.append(f"Needs work: {len(imperfect)}")
        report.append(f"Average score: {avg_score:.1f}%\n")

        if imperfect:
            report.append("Files needing improvement:")
            for analysis in imperfect[:10]:
                rel_path = Path(analysis['file_path']).relative_to(self.repo_root)
                report.append(f"  - {rel_path}: {analysis['overall_score']:.1f}%")

            if len(imperfect) > 10:
                report.append(f"  ... and {len(imperfect) - 10} more")

        return "\n".join(report)


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Iterative Claude-assisted documentation fixer"
    )
    parser.add_argument(
        "category",
        help="Category to process (e.g., arrays-hashing, two-pointers)"
    )
    parser.add_argument(
        "--report",
        action="store_true",
        help="Just show progress report without presenting issues"
    )
    parser.add_argument(
        "--auto",
        action="store_true",
        help="Auto mode: loop continuously, wait for fixes.json, apply, and repeat until 100%%"
    )
    parser.add_argument(
        "--batch-mode",
        action="store_true",
        help="Batch mode: present ALL issues at once (no waiting), create fixes.json, then apply all"
    )
    parser.add_argument(
        "--apply-fixes",
        action="store_true",
        help="Apply fixes from fixes.json file (use with --batch-mode)"
    )
    parser.add_argument(
        "--max-iterations",
        type=int,
        default=100,
        help="Maximum iterations in auto mode (default: 100)"
    )

    args = parser.parse_args()

    repo_root = REPO_ROOT
    category = args.category

    # Verify category exists
    category_dir = repo_root / "solutions" / category
    if not category_dir.exists():
        print(f"Error: Category '{category}' not found at {category_dir}")
        sys.exit(1)

    fixer = IterativeFixer(repo_root, category)

    try:
        if args.report:
            # Just show progress report
            print(fixer.generate_progress_report())
        elif args.batch_mode:
            # Batch mode: collect and present all issues at once
            print(f"\n{'='*80}")
            print("BATCH MODE: NON-INTERACTIVE WORKFLOW")
            print(f"{'='*80}\n")

            imperfect_files = fixer.collect_all_issues()
            fixer.present_all_issues(imperfect_files)
        elif args.apply_fixes:
            # Apply fixes from fixes.json
            fixes_file = SCRIPT_DIR / "tmp" / "fixes.json"
            if not fixes_file.exists():
                print(f"Error: fixes.json not found at {fixes_file}")
                sys.exit(1)

            print(f"\n{'='*80}")
            print("APPLYING ALL FIXES FROM BATCH")
            print(f"{'='*80}\n")

            results = fixer.apply_fixes_from_json(fixes_file)

            # Show final statistics
            print(f"\n{'='*80}")
            print("BATCH APPLICATION COMPLETE")
            print(f"{'='*80}\n")
            print(f"Files processed: {len(results)}")
            print(f"Successful: {sum(1 for s in results.values() if s)}")
            print(f"Failed: {sum(1 for s in results.values() if not s)}")
            print()
            print(fixer.generate_progress_report())
        elif args.auto:
            # Auto mode: loop until complete
            fixer.run_auto_loop(max_iterations=args.max_iterations)
        else:
            # Manual mode: single iteration
            has_more = fixer.run_iteration(auto_mode=False)

            if not has_more:
                print(fixer.generate_progress_report())
    finally:
        # Always stop the server when done
        fixer.stop_server()


if __name__ == "__main__":
    main()
