#!/usr/bin/env python3
"""
Python-First Documentation Fixer

Strategy:
1. Fix Python documentation to 100% quality
2. Copy Python docs to TypeScript/JavaScript with language adjustments
3. This ensures consistency across all languages
"""

import json
import re
from pathlib import Path
from typing import Dict, List, Optional


class PythonFirstFixer:
    """Fix Python docs first, then sync to other languages."""

    def __init__(self, base_dir: str = "solutions"):
        self.base_dir = Path(base_dir)
        self.language_map = {
            'python': {'ext': '.py', 'comment_start': '"""', 'comment_end': '"""', 'code_block': 'python'},
            'typescript': {'ext': '.ts', 'comment_start': '/**', 'comment_end': ' */', 'code_block': 'typescript'},
            'javascript': {'ext': '.js', 'comment_start': '/**', 'comment_end': ' */', 'code_block': 'javascript'},
        }

    def find_problem_files(self, problem_number: str, category: str) -> Dict[str, Optional[Path]]:
        """Find all language versions of a problem."""
        files = {}
        for lang, info in self.language_map.items():
            pattern = f"{problem_number}-*{info['ext']}"
            matches = list((self.base_dir / category / lang).glob(pattern))
            files[lang] = matches[0] if matches else None
        return files

    def extract_python_docs(self, python_file: Path) -> Optional[str]:
        """Extract documentation from Python file (before code starts)."""
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

    def convert_docs_to_language(self, python_docs: str, target_lang: str) -> str:
        """Convert Python documentation to target language format."""
        info = self.language_map[target_lang]

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
        """Find where code starts in a file."""
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

    def sync_documentation(self, problem_number: str, category: str) -> Dict[str, bool]:
        """Sync documentation from Python to all languages."""
        results = {}

        # Find all language files
        files = self.find_problem_files(problem_number, category)

        if not files.get('python') or not files['python'].exists():
            print(f"  ⚠ No Python file found for {problem_number}")
            return results

        # Extract Python documentation
        python_docs = self.extract_python_docs(files['python'])
        if not python_docs:
            print(f"  ⚠ Could not extract Python documentation for {problem_number}")
            return results

        print(f"  ✓ Extracted Python documentation for {problem_number}")

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
                print(f"    ✓ Synced to {lang}")

            except Exception as e:
                results[lang] = False
                print(f"    ✗ Failed to sync to {lang}: {e}")

        return results

    def sync_category(self, category: str) -> Dict[str, Dict[str, bool]]:
        """Sync all problems in a category."""
        results = {}

        # Find all Python files in category
        python_dir = self.base_dir / category / 'python'
        if not python_dir.exists():
            print(f"⚠ No Python directory found for {category}")
            return results

        python_files = sorted(python_dir.glob('*.py'))
        print(f"\nSyncing {len(python_files)} problems in {category}...")

        for py_file in python_files:
            # Extract problem number
            match = re.match(r'(\d{4})-', py_file.name)
            if not match:
                continue

            problem_num = match.group(1)
            results[problem_num] = self.sync_documentation(problem_num, category)

        return results


def main():
    """Main entry point."""
    import sys

    if len(sys.argv) < 2:
        print("Usage: python python_first_fixer.py <category>")
        print("Example: python python_first_fixer.py backtracking")
        sys.exit(1)

    category = sys.argv[1]
    fixer = PythonFirstFixer()

    print(f"\n{'='*80}")
    print(f"Python-First Documentation Sync: {category}")
    print(f"{'='*80}")

    results = fixer.sync_category(category)

    # Summary
    total = len(results)
    synced_ts = sum(1 for r in results.values() if r.get('typescript', False))
    synced_js = sum(1 for r in results.values() if r.get('javascript', False))

    print(f"\n{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"Total problems: {total}")
    print(f"Synced to TypeScript: {synced_ts}/{total}")
    print(f"Synced to JavaScript: {synced_js}/{total}")
    print(f"{'='*80}\n")


if __name__ == '__main__':
    main()
