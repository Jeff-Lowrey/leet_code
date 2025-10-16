#!/usr/bin/env python3
"""
LeetCode Python Solutions Coverage Analysis Script

This script analyzes all Python solution files in the solutions directory
to count test cases and identify coverage gaps.
"""

import os
import re
from pathlib import Path
from typing import Dict, List, Tuple
import ast

def count_test_cases(file_path: str) -> Tuple[int, List[str], Dict[str, any]]:
    """
    Count test cases in a Python solution file.

    Returns:
        - Number of test cases found
        - List of test case patterns/descriptions
        - Metadata about the file structure
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        return 0, [], {"error": str(e)}

    test_cases = []
    metadata = {
        "has_main_block": "if __name__ ==" in content,
        "has_helper_functions": False,
        "multiple_solutions": False,
        "classes_count": 0,
        "functions_count": 0,
        "problem_numbers": [],
        "difficulty": None
    }

    # Extract problem numbers from docstrings and comments
    problem_pattern = r'(\d+)\.\s+([^\n]+)'
    problems = re.findall(problem_pattern, content)
    metadata["problem_numbers"] = [int(p[0]) for p, _ in problems]
    metadata["multiple_solutions"] = len(set(metadata["problem_numbers"])) > 1

    # Extract difficulty
    difficulty_match = re.search(r'(Easy|Medium|Hard)', content)
    if difficulty_match:
        metadata["difficulty"] = difficulty_match.group(1)

    # Count classes and functions
    try:
        tree = ast.parse(content)
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                metadata["classes_count"] += 1
            elif isinstance(node, ast.FunctionDef):
                metadata["functions_count"] += 1
                if node.name.startswith(('create_', 'build_', 'list_to_', 'print_')):
                    metadata["has_helper_functions"] = True
    except:
        pass  # AST parsing failed, skip detailed analysis

    # Look for test case patterns in main block
    if metadata["has_main_block"]:
        # Find the main block
        main_match = re.search(r'if __name__ == "__main__":(.*)', content, re.DOTALL)
        if main_match:
            main_content = main_match.group(1)

            # Pattern 1: Test case comments
            test_comments = re.findall(r'# Test case (\d+)', main_content, re.IGNORECASE)
            test_cases.extend([f"Test case {i}" for i in test_comments])

            # Pattern 2: Variable assignments with test data
            var_patterns = [
                r'(\w+\d+)\s*=\s*\[.*?\]',  # array assignments like nums1 = [1,2,3]
                r'(\w+\d+)\s*=\s*".*?"',     # string assignments like s1 = "test"
                r'(\w+\d+)\s*=\s*\d+',       # number assignments like n1 = 5
                r'(\w+\d+)\s*=\s*\(.*?\)',   # tuple assignments
            ]

            for pattern in var_patterns:
                matches = re.findall(pattern, main_content)
                test_cases.extend([f"Variable: {match}" for match in matches])

            # Pattern 3: Direct test case arrays/lists
            test_arrays = re.findall(r'test_cases?\s*=\s*\[(.*?)\]', main_content, re.DOTALL)
            for array in test_arrays:
                # Count elements in test array
                elements = re.findall(r'\([^)]+\)|\[[^\]]+\]|"[^"]*"|\w+', array)
                test_cases.extend([f"Test array element {i+1}" for i in range(len(elements))])

            # Pattern 4: Multiple solution calls with different inputs
            solution_calls = re.findall(r'solution\.\w+\([^)]+\)', main_content)
            if not test_cases and solution_calls:
                test_cases.extend([f"Solution call {i+1}" for i in range(len(solution_calls))])

            # Pattern 5: Print statements with test results
            print_statements = re.findall(r'print\([^)]*solution\.[^)]+\)', main_content)
            if not test_cases and print_statements:
                test_cases.extend([f"Print test {i+1}" for i in range(len(print_statements))])

    # Remove duplicates and return count
    unique_tests = list(set(test_cases))
    return len(unique_tests), unique_tests, metadata

def analyze_solutions_directory(solutions_dir: str) -> Dict:
    """Analyze all Python files in the solutions directory."""

    results = {
        "total_files": 0,
        "files_by_coverage": {
            "0": [],      # No test cases
            "1-2": [],    # Very few test cases
            "3-5": [],    # Few test cases
            "6-9": [],    # Moderate test cases
            "10+": []     # Good coverage (10+ test cases)
        },
        "files_details": {},
        "categories": {},
        "difficulties": {"Easy": [], "Medium": [], "Hard": [], "Unknown": []},
        "quality_patterns": {
            "has_helper_functions": 0,
            "multiple_solutions": 0,
            "has_main_block": 0,
            "multiple_problems": 0
        }
    }

    # Find all Python files
    solutions_path = Path(solutions_dir)
    python_files = list(solutions_path.rglob("*.py"))

    for file_path in python_files:
        if file_path.name == "top-50-solutions.py":
            continue  # Skip the compilation file

        results["total_files"] += 1

        # Get category from directory structure
        relative_path = file_path.relative_to(solutions_path)
        category = relative_path.parts[0] if len(relative_path.parts) > 1 else "root"

        if category not in results["categories"]:
            results["categories"][category] = []

        # Analyze the file
        test_count, test_patterns, metadata = count_test_cases(str(file_path))

        # Categorize by coverage
        if test_count == 0:
            coverage_key = "0"
        elif test_count <= 2:
            coverage_key = "1-2"
        elif test_count <= 5:
            coverage_key = "3-5"
        elif test_count <= 9:
            coverage_key = "6-9"
        else:
            coverage_key = "10+"

        file_info = {
            "path": str(file_path),
            "category": category,
            "test_count": test_count,
            "test_patterns": test_patterns,
            "metadata": metadata
        }

        results["files_by_coverage"][coverage_key].append(file_info)
        results["files_details"][str(file_path)] = file_info
        results["categories"][category].append(file_info)

        # Track difficulty
        difficulty = metadata.get("difficulty", "Unknown")
        results["difficulties"][difficulty].append(file_info)

        # Track quality patterns
        if metadata.get("has_helper_functions"):
            results["quality_patterns"]["has_helper_functions"] += 1
        if metadata.get("multiple_solutions"):
            results["quality_patterns"]["multiple_solutions"] += 1
        if metadata.get("has_main_block"):
            results["quality_patterns"]["has_main_block"] += 1
        if len(metadata.get("problem_numbers", [])) > 1:
            results["quality_patterns"]["multiple_problems"] += 1

    return results

def generate_markdown_report(analysis_results: Dict) -> str:
    """Generate a comprehensive markdown report."""

    report = "# LeetCode Python Solutions Coverage Analysis Report\n\n"

    # Overview
    total = analysis_results["total_files"]
    report += f"## Executive Summary\n\n"
    report += f"- **Total Python Solutions Analyzed**: {total}\n"
    report += f"- **Solutions with 10+ Test Cases**: {len(analysis_results['files_by_coverage']['10+'])} ({len(analysis_results['files_by_coverage']['10+'])/total*100:.1f}%)\n"
    report += f"- **Solutions Needing More Examples**: {len(analysis_results['files_by_coverage']['0']) + len(analysis_results['files_by_coverage']['1-2']) + len(analysis_results['files_by_coverage']['3-5'])} ({(len(analysis_results['files_by_coverage']['0']) + len(analysis_results['files_by_coverage']['1-2']) + len(analysis_results['files_by_coverage']['3-5']))/total*100:.1f}%)\n"
    report += f"- **Categories Covered**: {len(analysis_results['categories'])}\n\n"

    # Coverage Distribution
    report += "## Test Coverage Distribution\n\n"
    report += "| Coverage Level | Count | Percentage | Files |\n"
    report += "|----------------|-------|------------|-------|\n"

    for level, files in analysis_results["files_by_coverage"].items():
        count = len(files)
        percentage = count/total*100 if total > 0 else 0
        file_names = [Path(f["path"]).name for f in files[:3]]  # Show first 3
        more = f" (+{count-3} more)" if count > 3 else ""
        report += f"| {level} | {count} | {percentage:.1f}% | {', '.join(file_names)}{more} |\n"

    report += "\n"

    # Solutions Needing More Examples
    report += "## Solutions Needing More Examples (< 10 test cases)\n\n"

    need_examples = []
    for level in ["0", "1-2", "3-5", "6-9"]:
        need_examples.extend(analysis_results["files_by_coverage"][level])

    need_examples.sort(key=lambda x: x["test_count"])

    report += "| File | Category | Current Tests | Difficulty | Problems |\n"
    report += "|------|----------|---------------|------------|----------|\n"

    for file_info in need_examples:
        filename = Path(file_info["path"]).name
        category = file_info["category"]
        test_count = file_info["test_count"]
        difficulty = file_info["metadata"].get("difficulty", "Unknown")
        problems = file_info["metadata"].get("problem_numbers", [])
        problem_str = ", ".join(map(str, problems)) if problems else "N/A"

        report += f"| `{filename}` | {category} | {test_count} | {difficulty} | {problem_str} |\n"

    report += "\n"

    # Category Analysis
    report += "## Analysis by Category\n\n"
    report += "| Category | Total Files | Avg Tests | Well Covered (10+) |\n"
    report += "|----------|-------------|-----------|--------------------|\n"

    for category, files in analysis_results["categories"].items():
        if not files:
            continue
        total_files = len(files)
        avg_tests = sum(f["test_count"] for f in files) / total_files
        well_covered = len([f for f in files if f["test_count"] >= 10])

        report += f"| {category} | {total_files} | {avg_tests:.1f} | {well_covered} |\n"

    report += "\n"

    # Quality Patterns
    report += "## Quality Standards Observed\n\n"
    patterns = analysis_results["quality_patterns"]

    report += "### Common Patterns Found:\n\n"
    report += f"- **Files with Main Block**: {patterns['has_main_block']}/{total} ({patterns['has_main_block']/total*100:.1f}%)\n"
    report += f"- **Files with Helper Functions**: {patterns['has_helper_functions']}/{total} ({patterns['has_helper_functions']/total*100:.1f}%)\n"
    report += f"- **Files with Multiple Solutions**: {patterns['multiple_solutions']}/{total} ({patterns['multiple_solutions']/total*100:.1f}%)\n"
    report += f"- **Files with Multiple Problems**: {patterns['multiple_problems']}/{total} ({patterns['multiple_problems']/total*100:.1f}%)\n\n"

    # Example Structure Analysis
    report += "### Standard Structure Observed:\n\n"
    report += "Most well-covered solutions follow this pattern:\n\n"
    report += "```python\n"
    report += '"""\n'
    report += "Problem Number. Problem Title\n"
    report += "Difficulty Level\n"
    report += "\n"
    report += "Problem description...\n"
    report += "\n"
    report += "Example:\n"
    report += "Input: ...\n"
    report += "Output: ...\n"
    report += '"""\n'
    report += "\n"
    report += "class Solution:\n"
    report += "    def solutionMethod(self, ...):\n"
    report += '        """\n'
    report += "        Approach: Description\n"
    report += "        Time Complexity: O(...)\n"
    report += "        Space Complexity: O(...)\n"
    report += '        """\n'
    report += "        # Implementation\n"
    report += "\n"
    report += '# Test cases\n'
    report += 'if __name__ == "__main__":\n'
    report += "    solution = Solution()\n"
    report += "    \n"
    report += "    # Multiple test cases with clear comments\n"
    report += "    # Edge cases included\n"
    report += "```\n\n"

    # Recommendations
    report += "## Recommendations for Improvement\n\n"

    no_tests = len(analysis_results["files_by_coverage"]["0"])
    few_tests = len(analysis_results["files_by_coverage"]["1-2"]) + len(analysis_results["files_by_coverage"]["3-5"])

    report += "### Priority Actions:\n\n"
    if no_tests > 0:
        report += f"1. **High Priority**: {no_tests} files have no test cases - add basic test coverage\n"
    if few_tests > 0:
        report += f"2. **Medium Priority**: {few_tests} files have minimal test cases - expand to include edge cases\n"

    report += "\n### Recommended Test Case Types to Add:\n\n"
    report += "- **Edge Cases**: Empty inputs, single elements, maximum constraints\n"
    report += "- **Boundary Cases**: Minimum/maximum values, off-by-one scenarios\n"
    report += "- **Invalid Inputs**: Error handling (where applicable)\n"
    report += "- **Performance Cases**: Large inputs to verify complexity\n"
    report += "- **Alternative Scenarios**: Different valid input patterns\n\n"

    # Detailed File Lists
    report += "## Detailed File Analysis\n\n"

    for level in ["0", "1-2", "3-5"]:
        files = analysis_results["files_by_coverage"][level]
        if not files:
            continue

        report += f"### Files with {level} test cases:\n\n"

        for file_info in sorted(files, key=lambda x: x["path"]):
            filename = Path(file_info["path"]).name
            problems = file_info["metadata"].get("problem_numbers", [])
            problem_str = f" (Problems: {', '.join(map(str, problems))})" if problems else ""

            report += f"- **{filename}**{problem_str}\n"
            report += f"  - Category: {file_info['category']}\n"
            report += f"  - Current test count: {file_info['test_count']}\n"
            report += f"  - Difficulty: {file_info['metadata'].get('difficulty', 'Unknown')}\n"
            report += f"  - Has main block: {'✅' if file_info['metadata'].get('has_main_block') else '❌'}\n"
            report += f"  - Multiple solutions: {'✅' if file_info['metadata'].get('multiple_solutions') else '❌'}\n"
            if file_info["test_patterns"]:
                report += f"  - Test patterns: {', '.join(file_info['test_patterns'][:3])}\n"
            report += "\n"

    return report

if __name__ == "__main__":
    solutions_dir = "/Users/jeff/git/claude-knowledge/projects/leet_code/solutions"

    print("Analyzing LeetCode Python solutions...")
    analysis = analyze_solutions_directory(solutions_dir)

    print(f"Found {analysis['total_files']} Python solution files")
    print("Generating report...")

    report = generate_markdown_report(analysis)

    # Save report
    with open("leetcode_coverage_analysis.md", "w", encoding="utf-8") as f:
        f.write(report)

    print("✅ Analysis complete! Report saved to 'leetcode_coverage_analysis.md'")

    # Print summary to console
    print("\n" + "="*60)
    print("QUICK SUMMARY")
    print("="*60)

    total = analysis["total_files"]
    print(f"Total files analyzed: {total}")

    for level, files in analysis["files_by_coverage"].items():
        count = len(files)
        print(f"  {level} test cases: {count} files ({count/total*100:.1f}%)")

    need_work = len(analysis["files_by_coverage"]["0"]) + len(analysis["files_by_coverage"]["1-2"])
    print(f"\nFiles needing immediate attention: {need_work}")
    print(f"Files with good coverage (10+): {len(analysis['files_by_coverage']['10+'])}")
