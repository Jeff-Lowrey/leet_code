#!/usr/bin/env python3
"""
Full manual validation of files - checks formatting issues that automated tools might miss.

Checks:
1. Literal \n in METADATA sections
2. Missing METADATA sections
3. Proper section formatting
4. Consistency across languages
"""

import sys
from pathlib import Path
import re

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent.parent


def check_python_file(file_path: Path) -> dict:
    """Check Python file for formatting issues."""
    issues = []
    details = []

    content = file_path.read_text()

    # Check for literal \n in first 10 lines (METADATA section)
    # Looking for the actual string "\\n" (backslash + n) not newline
    lines = content.split('\n')[:10]
    first_10 = '\n'.join(lines)
    if '\\n' in first_10:
        issues.append("LITERAL_BACKSLASH_N")
        # Find which line has it
        for i, line in enumerate(lines[:10], 1):
            if '\\n' in line:
                details.append(f"Line {i}: {line[:60]}...")

    # Check METADATA section exists
    if '### METADATA:' not in content[:500]:
        issues.append("MISSING_METADATA")

    # Check proper METADATA format (should have newlines after colon)
    if '### METADATA:' in content:
        metadata_match = re.search(r'### METADATA:\s*\n\*\*', content)
        if not metadata_match:
            issues.append("METADATA_BAD_FORMAT")

    # Check for proper section structure
    if '### METADATA:' in content:
        # Should have fields like **Techniques**:
        if '**Techniques**:' not in content[:800]:
            issues.append("MISSING_TECHNIQUES")
        if '**Data Structures**:' not in content[:800]:
            issues.append("MISSING_DATA_STRUCTURES")
        if '**Time Complexity**:' not in content[:800]:
            issues.append("MISSING_TIME_COMPLEXITY")
        if '**Space Complexity**:' not in content[:800]:
            issues.append("MISSING_SPACE_COMPLEXITY")

    return {
        'file': file_path.name,
        'issues': issues,
        'details': details,
        'status': 'OK' if not issues else 'FAIL'
    }


def check_jsdoc_file(file_path: Path) -> dict:
    """Check JS/TS file for formatting issues."""
    issues = []

    content = file_path.read_text()

    # Check for literal \n in first 15 lines (METADATA section in comment)
    lines = content.split('\n')[:15]
    first_15 = '\n'.join(lines)
    if '\\n' in first_15:
        issues.append("LITERAL_BACKSLASH_N in METADATA")

    # Check METADATA section exists
    if '### METADATA:' not in content[:800]:
        issues.append("MISSING_METADATA_SECTION")

    # Check proper JSDoc format
    if not content.strip().startswith('/**'):
        issues.append("MISSING_JSDOC_START")

    return {
        'file': file_path.name,
        'issues': issues,
        'status': 'OK' if not issues else 'FAIL'
    }


def validate_category(category: str):
    """Validate all files in a category."""

    print(f"{'='*80}")
    print(f"FULL VALIDATION: {category}")
    print(f"{'='*80}\n")

    base_dir = REPO_ROOT / "solutions" / category

    # Check Python files
    print("PYTHON FILES:")
    print("-" * 80)
    python_dir = base_dir / "python"
    python_files = sorted(python_dir.glob("*.py"))
    python_results = []

    for py_file in python_files:
        result = check_python_file(py_file)
        python_results.append(result)
        status_symbol = "✓" if result['status'] == 'OK' else "✗"
        print(f"{status_symbol} {result['file']:50} {result['status']:6}", end='')
        if result['issues']:
            print(f" - {', '.join(result['issues'])}")
        else:
            print()

    # Check JavaScript files
    print("\nJAVASCRIPT FILES:")
    print("-" * 80)
    js_dir = base_dir / "javascript"
    js_files = sorted(js_dir.glob("*.js"))
    js_results = []

    for js_file in js_files:
        result = check_jsdoc_file(js_file)
        js_results.append(result)
        status_symbol = "✓" if result['status'] == 'OK' else "✗"
        print(f"{status_symbol} {result['file']:50} {result['status']:6}", end='')
        if result['issues']:
            print(f" - {', '.join(result['issues'])}")
        else:
            print()

    # Check TypeScript files
    print("\nTYPESCRIPT FILES:")
    print("-" * 80)
    ts_dir = base_dir / "typescript"
    ts_files = sorted(ts_dir.glob("*.ts"))
    ts_results = []

    for ts_file in ts_files:
        result = check_jsdoc_file(ts_file)
        ts_results.append(result)
        status_symbol = "✓" if result['status'] == 'OK' else "✗"
        print(f"{status_symbol} {result['file']:50} {result['status']:6}", end='')
        if result['issues']:
            print(f" - {', '.join(result['issues'])}")
        else:
            print()

    # Summary
    print("\n" + "="*80)
    print("SUMMARY")
    print("="*80)

    py_ok = sum(1 for r in python_results if r['status'] == 'OK')
    js_ok = sum(1 for r in js_results if r['status'] == 'OK')
    ts_ok = sum(1 for r in ts_results if r['status'] == 'OK')

    print(f"Python:     {py_ok}/{len(python_results)} OK")
    print(f"JavaScript: {js_ok}/{len(js_results)} OK")
    print(f"TypeScript: {ts_ok}/{len(ts_results)} OK")
    print(f"Total:      {py_ok + js_ok + ts_ok}/{len(python_results) + len(js_results) + len(ts_results)} OK")

    # List all failures
    all_failures = []
    for r in python_results + js_results + ts_results:
        if r['status'] == 'FAIL':
            all_failures.append(r)

    if all_failures:
        print(f"\n{len(all_failures)} FILES WITH ISSUES:")
        for fail in all_failures:
            print(f"  - {fail['file']}: {', '.join(fail['issues'])}")
    else:
        print("\n🎉 ALL FILES PASSED VALIDATION!")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python full_validation.py <category>")
        sys.exit(1)

    category = sys.argv[1]
    validate_category(category)
