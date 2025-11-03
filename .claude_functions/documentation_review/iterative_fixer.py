#!/usr/bin/env python3
"""Iterative Claude-Assisted Documentation Fixer with Python-First Sync

Iterates until all files in a category reach 100% quality.

Workflow:
1. Analyze all files in category
2. Find files < 100% quality
3. Present issues to Claude
4. Claude provides fixes (in conversation)
5. Apply fixes and re-validate
6. **Python-First Sync**: Auto-sync Python docs to TypeScript/JavaScript
7. Repeat until all files = 100%

Python-First Strategy:
- Python files are the source of truth for documentation
- When Python documentation is fixed, it automatically syncs to other languages
- Language-specific adjustments: code block identifiers, comment formats
- Eliminates documentation inconsistencies across language implementations

Auto Mode:
- With --auto flag, script loops automatically:
  1. Present batch → 2. Wait for fixes.json → 3. Apply → 4. Sync docs → 5. Re-analyze → Loop
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

from claude_assisted_fixer import ClaudeAssistedFixer


class IterativeFixer:
    """Iterative fixer that processes files until all reach 100%."""

    def __init__(self, repo_root: Path, category: str):
        self.repo_root = repo_root
        self.category = category
        self.fixer = ClaudeAssistedFixer(repo_root, category=category)  # Pass category for validation
        self.fixer.solutions_dir = repo_root / "solutions" / category
        self.iteration = 0
        self.fixes_applied = []

    def analyze_all_files(self) -> List[Dict]:
        """Analyze all files in the category.

        Returns:
            List of file analyses sorted by score (lowest first)
        """
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
        """Filter to files that are not at 100% quality.

        Args:
            analyses: List of file analyses

        Returns:
            List of analyses for files < 100%
        """
        # Only consider files with scores < 100% as imperfect
        # Template issues don't affect quality if score is 100%
        return [a for a in analyses if a["overall_score"] < 100]

    def present_batch(self, files: List[Dict], batch_size: int = 5) -> List[Dict]:
        """Present a batch of files for Claude review.

        Args:
            files: List of file analyses
            batch_size: Number of files to present in this batch

        Returns:
            The batch of files that were presented
        """
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

            # Python-first: sync documentation to other languages
            print(f"\n{'='*80}")
            print("SYNCING DOCUMENTATION TO OTHER LANGUAGES")
            print(f"{'='*80}\n")

            python_files_fixed = [
                file_path for file_path, success in results.items()
                if success and file_path.endswith('.py')
            ]

            if python_files_fixed:
                for py_file_str in python_files_fixed:
                    py_file = Path(py_file_str)
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

    def extract_python_docs(self, python_file: Path) -> Optional[str]:
        """Extract documentation from Python file (before code starts).

        Args:
            python_file: Path to Python file

        Returns:
            Documentation string, or None if extraction fails
        """
        try:
            with open(python_file, 'r') as f:
                lines = f.readlines()

            # Find end of documentation (where code starts)
            doc_end = None
            for i, line in enumerate(lines):
                # Documentation ends at first non-comment, non-blank line after initial docstring
                if i > 5 and (line.strip().startswith('from ') or
                             line.strip().startswith('import ') or
                             line.strip().startswith('class ') or
                             line.strip().startswith('def ')):
                    doc_end = i
                    break

            if doc_end is None:
                return None

            # Extract and clean documentation
            docs = ''.join(lines[:doc_end])

            # Remove <details> tags if present
            docs = re.sub(r'<details>.*?</details>', '', docs, flags=re.DOTALL)

            return docs.strip()

        except Exception as e:
            print(f"  Error extracting Python docs: {e}")
            return None

    def convert_docs_to_language(self, python_docs: str, target_lang: str) -> str:
        """Convert Python documentation to target language format.

        Args:
            python_docs: Python documentation string
            target_lang: Target language ('typescript' or 'javascript')

        Returns:
            Converted documentation string
        """
        info = LANGUAGE_MAP[target_lang]

        # Replace code block language identifiers
        docs = python_docs.replace('```python', f'```{info["code_block"]}')

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

    def sync_documentation_from_python(self, python_file: Path) -> Dict[str, bool]:
        """Sync documentation from Python file to other languages.

        Args:
            python_file: Path to Python file

        Returns:
            Dict mapping language names to success status
        """
        results = {}

        # Extract Python documentation
        python_docs = self.extract_python_docs(python_file)
        if not python_docs:
            print(f"  ⚠ Could not extract Python documentation")
            return results

        # Find all language files
        files = self.find_problem_files(python_file)

        # Sync to other languages
        for lang in ['typescript', 'javascript']:
            if not files.get(lang) or not files[lang].exists():
                continue

            try:
                # Convert documentation
                target_docs = self.convert_docs_to_language(python_docs, lang)

                # Find code start
                code_start = self.find_code_start(files[lang], lang)

                # Read existing code
                with open(files[lang], 'r') as f:
                    lines = f.readlines()

                # Write new file with synced docs
                with open(files[lang], 'w') as f:
                    f.write(target_docs)
                    f.write('\n\n')
                    f.write(''.join(lines[code_start:]))

                results[lang] = True

            except Exception as e:
                results[lang] = False
                print(f"    Error syncing to {lang}: {e}")

        return results

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
            # Manual mode: show instructions
            print(f"\n{'='*80}")
            print("WAITING FOR CLAUDE TO PROVIDE FIXES")
            print(f"{'='*80}")
            print()
            print("Claude should now:")
            print("1. Analyze the issues presented above")
            print("2. Provide improved content for each problematic section")
            print("3. User will apply fixes and re-run this script")
            print()
            print(f"Files remaining: {len(imperfect)}")
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

    if args.report:
        # Just show progress report
        print(fixer.generate_progress_report())
    elif args.auto:
        # Auto mode: loop until complete
        fixer.run_auto_loop(max_iterations=args.max_iterations)
    else:
        # Manual mode: single iteration
        has_more = fixer.run_iteration(auto_mode=False)

        if not has_more:
            print(fixer.generate_progress_report())


if __name__ == "__main__":
    main()
