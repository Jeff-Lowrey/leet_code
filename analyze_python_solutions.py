#!/usr/bin/env python3
"""
Analyze Python solutions in LeetCode project for example coverage
"""
import os
import re
from pathlib import Path
from collections import defaultdict

def analyze_python_file(filepath):
    """Analyze a single Python file for examples and test cases"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count different types of examples
    examples = {
        'docstring_examples': len(re.findall(r'Example[\s\d]*:', content)),
        'test_cases': len(re.findall(r'# Test case \d+', content)),
        'input_output_pairs': len(re.findall(r'print\(.*Output.*\)', content)),
        'solution_methods': len(re.findall(r'def \w+\(self,', content)),
        'main_block': 1 if 'if __name__ == "__main__"' in content else 0
    }

    # Extract problem info
    problem_match = re.search(r'(\d+)\.\s*([^\n]+)', content)
    problem_number = problem_match.group(1) if problem_match else "Unknown"
    problem_title = problem_match.group(2) if problem_match else "Unknown"

    # Extract difficulty
    difficulty_match = re.search(r'(Easy|Medium|Hard)', content)
    difficulty = difficulty_match.group(1) if difficulty_match else "Unknown"

    return {
        'filepath': filepath,
        'problem_number': problem_number,
        'problem_title': problem_title,
        'difficulty': difficulty,
        **examples
    }

def main():
    solutions_dir = Path("/Users/jeff/git/claude-knowledge/projects/leet_code/solutions")

    # Find all Python files
    python_files = list(solutions_dir.rglob("*.py"))
    python_files = [f for f in python_files if "__pycache__" not in str(f)]

    print(f"🔍 Found {len(python_files)} Python solution files\n")

    # Analyze each file
    analyses = []
    category_stats = defaultdict(list)

    for py_file in python_files:
        analysis = analyze_python_file(py_file)
        analyses.append(analysis)

        # Categorize by directory
        category = py_file.parent.name
        category_stats[category].append(analysis)

    # Sort by problem number
    analyses.sort(key=lambda x: int(x['problem_number']) if x['problem_number'].isdigit() else 9999)

    # Generate report
    print("=" * 80)
    print("📊 LEETCODE PYTHON SOLUTIONS ANALYSIS")
    print("=" * 80)

    print(f"\n📈 SUMMARY STATISTICS:")
    print(f"Total Python Solutions: {len(analyses)}")
    print(f"Total Categories: {len(category_stats)}")

    # Difficulty distribution
    difficulty_count = defaultdict(int)
    for analysis in analyses:
        difficulty_count[analysis['difficulty']] += 1

    print(f"\n📊 DIFFICULTY DISTRIBUTION:")
    for difficulty, count in sorted(difficulty_count.items()):
        percentage = (count / len(analyses)) * 100
        print(f"  {difficulty:10}: {count:3} problems ({percentage:5.1f}%)")

    # Example coverage analysis
    print(f"\n🧪 EXAMPLE COVERAGE ANALYSIS:")

    total_docstring_examples = sum(a['docstring_examples'] for a in analyses)
    total_test_cases = sum(a['test_cases'] for a in analyses)
    total_input_output = sum(a['input_output_pairs'] for a in analyses)
    files_with_main = sum(a['main_block'] for a in analyses)

    print(f"  Total Docstring Examples: {total_docstring_examples}")
    print(f"  Total Test Cases: {total_test_cases}")
    print(f"  Total Input/Output Pairs: {total_input_output}")
    print(f"  Files with __main__ block: {files_with_main} ({(files_with_main/len(analyses)*100):.1f}%)")

    avg_examples_per_file = total_test_cases / len(analyses) if analyses else 0
    print(f"  Average Test Cases per File: {avg_examples_per_file:.1f}")

    # Category breakdown
    print(f"\n📁 CATEGORY BREAKDOWN:")
    for category, files in sorted(category_stats.items()):
        if category != "solutions":  # Skip the root directory
            total_examples = sum(f['test_cases'] for f in files)
            avg_examples = total_examples / len(files) if files else 0
            print(f"  {category:20}: {len(files):2} files, {total_examples:3} test cases (avg: {avg_examples:.1f})")

    # Files with low example coverage
    print(f"\n⚠️  FILES WITH LOW EXAMPLE COVERAGE (< 2 test cases):")
    low_coverage_files = [a for a in analyses if a['test_cases'] < 2]

    for analysis in low_coverage_files:
        rel_path = str(Path(analysis['filepath']).relative_to(solutions_dir))
        print(f"  {analysis['problem_number']:3} - {rel_path:50} ({analysis['test_cases']} test cases)")

    # Files with good coverage
    print(f"\n✅ FILES WITH GOOD EXAMPLE COVERAGE (≥ 3 test cases):")
    good_coverage_files = [a for a in analyses if a['test_cases'] >= 3]

    for analysis in sorted(good_coverage_files, key=lambda x: x['test_cases'], reverse=True):
        rel_path = str(Path(analysis['filepath']).relative_to(solutions_dir))
        print(f"  {analysis['problem_number']:3} - {rel_path:50} ({analysis['test_cases']} test cases)")

    # Solution method analysis
    print(f"\n🔧 SOLUTION METHODS ANALYSIS:")
    method_counts = defaultdict(int)
    for analysis in analyses:
        method_counts[analysis['solution_methods']] += 1

    for method_count, file_count in sorted(method_counts.items()):
        print(f"  {method_count} solution methods: {file_count} files")

    multiple_solutions = [a for a in analyses if a['solution_methods'] > 1]
    print(f"\n🎯 FILES WITH MULTIPLE SOLUTION APPROACHES ({len(multiple_solutions)} files):")
    for analysis in sorted(multiple_solutions, key=lambda x: x['solution_methods'], reverse=True):
        rel_path = str(Path(analysis['filepath']).relative_to(solutions_dir))
        print(f"  {analysis['problem_number']:3} - {rel_path:50} ({analysis['solution_methods']} methods)")

if __name__ == "__main__":
    main()
