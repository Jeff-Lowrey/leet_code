#!/usr/bin/env python3
"""Leet Code Learning Tool Web Interface"""

import argparse
import ast
import os
import re
from pathlib import Path
from typing import Any, cast

import markdown
from flask import Flask, Response, abort, flash, jsonify, redirect, render_template, request, url_for
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import (
    CLexer,
    CppLexer,
    CSharpLexer,
    GoLexer,
    JavaLexer,
    JavascriptLexer,
    PythonLexer,
    RustLexer,
    SwiftLexer,
    TypeScriptLexer,
    get_lexer_by_name,
)

from .category_data import category_manager
from .leetcode_converter import convert_to_leetcode_format, extract_solution_class

app = Flask(__name__, template_folder="../../templates", static_folder="../../static")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-key-change-in-production")


def parse_docstring_explanation(code: str) -> tuple[str, dict[str, str] | None]:
    """Parse Python code to extract explanation sections and clean code.

    Returns:
        Tuple of (clean_code_without_explanation, explanation_sections_dict)
    """
    try:
        # Look for <details> sections anywhere in the code
        details_pattern = r"<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>(.*?)</details>"
        match = re.search(details_pattern, code, re.DOTALL)

        if match:
            explanation_content = match.group(1).strip()

            # Parse into logical sections
            sections = parse_explanation_into_sections(explanation_content)

            # Remove the entire <details> section from the code
            clean_code = re.sub(
                r"<details>\s*<summary><b>🔍 SOLUTION EXPLANATION</b></summary>.*?</details>\s*",
                "",
                code,
                flags=re.DOTALL,
            )

            return clean_code, sections

        return code, None

    except Exception:
        # If parsing fails, return original code
        return code, None


def parse_explanation_into_sections(content: str) -> dict[str, str]:
    """Parse explanation content into logical sections."""
    sections = {}

    # Define section patterns with their display names
    section_patterns = [
        (r"### INTUITION:(.*?)(?=###|$)", "intuition"),
        (r"### KEY INSIGHT:(.*?)(?=###|$)", "key_insight"),
        (r"### APPROACH:(.*?)(?=###|$)", "approach"),
        (r"### ALGORITHM:(.*?)(?=###|$)", "algorithm"),
        (r"### WHY THIS WORKS:(.*?)(?=###|$)", "why_this_works"),
        (r"### EXAMPLE WALKTHROUGH:(.*?)(?=###|$)", "example"),
        (r"### EXAMPLES?:(.*?)(?=###|$)", "example"),
        (r"### WALKTHROUGH:(.*?)(?=###|$)", "example"),
        (r"### EDGE CASES:(.*?)(?=###|$)", "edge_cases"),
        (r"### COMPLEXITY:(.*?)(?=###|$)", "complexity"),
        (r"### TIME & SPACE COMPLEXITY:(.*?)(?=###|$)", "complexity"),
        (r"### ANALYSIS:(.*?)(?=###|$)", "complexity"),
        (r"### WHY LINKED LIST\?:(.*?)(?=###|$)", "additional_notes"),
        (r"### WHY.*\?:(.*?)(?=###|$)", "additional_notes"),
        (r"### NOTES?:(.*?)(?=###|$)", "additional_notes"),
        (r"### INSIGHTS?:(.*?)(?=###|$)", "additional_notes"),
        (r"### OPTIMIZATIONS?:(.*?)(?=###|$)", "optimizations"),
        (r"### ALTERNATIVES?:(.*?)(?=###|$)", "alternatives"),
    ]

    # Extract each section
    for pattern, section_key in section_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            section_content = match.group(1).strip()
            # Convert to HTML
            sections[section_key] = markdown.markdown(section_content, extensions=["fenced_code", "tables"])

    return sections


def parse_explanation_sections(content: str) -> dict[str, str]:
    """Parse explanation content into structured sections."""
    sections = {"strategy": "", "steps": "", "analysis": "", "insights": ""}

    # Convert to markdown first
    content_html = markdown.markdown(content, extensions=["fenced_code", "tables"])

    # Look for common section patterns
    strategy_patterns = [
        r"### INTUITION:(.*?)(?=###|$)",
        r"### APPROACH:(.*?)(?=###|$)",
        r"### STRATEGY:(.*?)(?=###|$)",
    ]

    steps_patterns = [
        r"### ALGORITHM:(.*?)(?=###|$)",
        r"### STEPS:(.*?)(?=###|$)",
        r"### IMPLEMENTATION:(.*?)(?=###|$)",
    ]

    analysis_patterns = [
        r"### COMPLEXITY:(.*?)(?=###|$)",
        r"### ANALYSIS:(.*?)(?=###|$)",
        r"### TIME & SPACE:(.*?)(?=###|$)",
    ]

    insights_patterns = [r"### INSIGHTS:(.*?)(?=###|$)", r"### NOTES:(.*?)(?=###|$)", r"### ADDITIONAL:(.*?)(?=###|$)"]

    # Extract strategy/intuition
    for pattern in strategy_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["strategy"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract steps/algorithm
    for pattern in steps_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["steps"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract complexity analysis
    for pattern in analysis_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["analysis"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # Extract additional insights
    for pattern in insights_patterns:
        match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
        if match:
            sections["insights"] = markdown.markdown(match.group(1).strip(), extensions=["fenced_code", "tables"])
            break

    # If no specific sections found, put everything in strategy
    if not any(sections.values()):
        sections["strategy"] = content_html

    return sections


def extract_problem_description(code: str) -> str | None:
    """Extract problem description from the docstring."""
    try:
        # Look for the main docstring at the beginning
        docstring_pattern = r'"""(.*?)"""'
        match = re.search(docstring_pattern, code, re.DOTALL)

        if match:
            docstring = match.group(1).strip()

            # Remove the solution explanation section if present
            # Split at the first <details> tag
            if "<details>" in docstring:
                docstring = docstring.split("<details>")[0].strip()

            # Remove "# Difficulty:" line from problem description
            # This metadata is shown as a badge, not in the problem text
            docstring = re.sub(r'^#\s*Difficulty:\s*\w+\s*\n?', '', docstring, flags=re.MULTILINE)

            # Convert to HTML
            return markdown.markdown(docstring, extensions=["fenced_code", "tables"])

        return None
    except Exception:
        return None


def merge_and_reorganize_content(documentation: str | None, explanation: str | None) -> str | None:
    """Merge documentation and explanation content, removing redundancy and creating logical flow.

    Returns:
        Reorganized HTML content with logical structure
    """
    if not documentation and not explanation:
        return None

    # Parse documentation content if available
    doc_sections = {}
    if documentation:
        # Extract sections from documentation
        doc_sections = extract_documentation_sections(documentation)

    # Parse explanation content if available
    exp_sections = {}
    if explanation:
        exp_sections = extract_explanation_sections(explanation)

    # Build reorganized content
    reorganized_parts = []

    # 1. Problem Description (prefer doc version, fallback to explanation)
    problem_desc = doc_sections.get("problem_description") or exp_sections.get("problem_description")
    if problem_desc:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📋 Problem</h3>")
        reorganized_parts.append(problem_desc)
        reorganized_parts.append("</div>")

    # 2. Solution Strategy (merge intuition and approach, include algorithm if brief)
    strategy_content = []
    if exp_sections.get("intuition"):
        strategy_content.append("<h4>Key Insight</h4>")
        strategy_content.append(exp_sections["intuition"])

    # Choose the best approach content (prefer concise explanation over detailed docs when both exist)
    approach_content = None
    if exp_sections.get("approach") and doc_sections.get("approach"):
        # If explanation approach is brief (< 500 chars) and doc approach is long, use explanation
        exp_approach_length = len(exp_sections["approach"])
        doc_approach_length = len(doc_sections["approach"])
        if exp_approach_length < 500 and doc_approach_length > 1000:
            approach_content = exp_sections["approach"]
        else:
            approach_content = doc_sections["approach"]
    else:
        approach_content = doc_sections.get("approach") or exp_sections.get("approach")

    if approach_content:
        # Clean up the approach content to remove redundant headings
        cleaned_approach = clean_approach_content(approach_content)
        strategy_content.append("<h4>Approach</h4>")
        strategy_content.append(cleaned_approach)

    if strategy_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>🔍 Solution Strategy</h3>")
        reorganized_parts.extend(strategy_content)
        reorganized_parts.append("</div>")

    # 3. Algorithm Steps (only if significantly different from approach)
    algorithm = doc_sections.get("algorithm")
    if algorithm and not content_too_similar(approach_content or "", algorithm):
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>⚙️ Algorithm Steps</h3>")
        reorganized_parts.append(algorithm)
        reorganized_parts.append("</div>")

    # 4. Example Walkthrough (merge examples, prefer more detailed)
    example = doc_sections.get("example") or exp_sections.get("example")
    if example:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📝 Example</h3>")
        reorganized_parts.append(example)
        reorganized_parts.append("</div>")

    # 5. Analysis (complexity, why it works)
    analysis_content = []
    if exp_sections.get("why_works"):
        analysis_content.append("<h4>Why This Works</h4>")
        analysis_content.append(exp_sections["why_works"])

    complexity = doc_sections.get("complexity")
    if complexity:
        analysis_content.append("<h4>Complexity Analysis</h4>")
        analysis_content.append(complexity)

    if analysis_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>📈 Analysis</h3>")
        reorganized_parts.extend(analysis_content)
        reorganized_parts.append("</div>")

    # 6. Additional Information (alternatives, tips, variations)
    additional_content = []
    if doc_sections.get("alternatives"):
        additional_content.append("<h4>Alternative Approaches</h4>")
        additional_content.append(doc_sections["alternatives"])

    if doc_sections.get("tips"):
        additional_content.append("<h4>Key Takeaways</h4>")
        additional_content.append(doc_sections["tips"])

    if doc_sections.get("variations"):
        additional_content.append("<h4>Common Variations</h4>")
        additional_content.append(doc_sections["variations"])

    if additional_content:
        reorganized_parts.append('<div class="content-section">')
        reorganized_parts.append("<h3>💡 Additional Insights</h3>")
        reorganized_parts.extend(additional_content)
        reorganized_parts.append("</div>")

    return "\n".join(reorganized_parts) if reorganized_parts else None


def extract_documentation_sections(html_content: str) -> dict[str, str]:
    """Extract sections from documentation HTML content."""
    sections = {}

    # Remove the title (h1) as it's redundant with page title
    content = re.sub(r"<h1>.*?</h1>", "", html_content, flags=re.DOTALL)

    # Extract problem description (everything before "Solution Explanation" or "Approach")
    prob_match = re.search(r"<h2>Problem Description</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if prob_match:
        sections["problem_description"] = prob_match.group(1).strip()

    # Extract approach/solution explanation
    approach_match = re.search(r"<h2>Solution Explanation</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if approach_match:
        sections["approach"] = approach_match.group(1).strip()

    # Extract algorithm steps
    algo_match = re.search(r"<h3>Algorithm Steps</h3>(.*?)(?=<h[1-6]>|$)", content, re.DOTALL)
    if algo_match:
        sections["algorithm"] = algo_match.group(1).strip()

    # Extract visual example
    example_match = re.search(r"<h3>Visual Example</h3>(.*?)(?=<h[1-6]>|$)", content, re.DOTALL)
    if example_match:
        sections["example"] = example_match.group(1).strip()

    # Extract complexity analysis
    complexity_match = re.search(r"<h2>Complexity Analysis</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if complexity_match:
        sections["complexity"] = complexity_match.group(1).strip()

    # Extract alternative approaches
    alt_match = re.search(r"<h2>Alternative Approaches</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if alt_match:
        sections["alternatives"] = alt_match.group(1).strip()

    # Extract key takeaways
    tips_match = re.search(r"<h2>Key Takeaways</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if tips_match:
        sections["tips"] = tips_match.group(1).strip()

    # Extract variations
    var_match = re.search(r"<h2>Common Variations</h2>(.*?)(?=<h2>|$)", content, re.DOTALL)
    if var_match:
        sections["variations"] = var_match.group(1).strip()

    return sections


def extract_explanation_sections(html_content: str) -> dict[str, str]:
    """Extract sections from explanation HTML content."""
    sections = {}

    # Extract intuition
    intuition_match = re.search(r"<h3>INTUITION:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if intuition_match:
        sections["intuition"] = intuition_match.group(1).strip()

    # Extract approach
    approach_match = re.search(r"<h3>APPROACH:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if approach_match:
        sections["approach"] = approach_match.group(1).strip()

    # Extract why this works
    why_match = re.search(r"<h3>WHY THIS WORKS:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if why_match:
        sections["why_works"] = why_match.group(1).strip()

    # Extract example walkthrough
    example_match = re.search(r"<h3>EXAMPLE WALKTHROUGH:</h3>(.*?)(?=<h3>|$)", html_content, re.DOTALL)
    if example_match:
        sections["example"] = example_match.group(1).strip()

    return sections


def clean_approach_content(content: str) -> str:
    """Clean approach content by removing redundant headings and formatting."""
    # Remove redundant h3 headings like "Approach:" or "Algorithm Steps"
    content = re.sub(r"<h3>\s*(?:Approach[:\s]*|Algorithm Steps?[:\s]*).*?</h3>", "", content, flags=re.IGNORECASE)

    # Remove redundant h4 headings that repeat the same information
    content = re.sub(r"<h4>\s*(?:Approach[:\s]*|Algorithm[:\s]*).*?</h4>", "", content, flags=re.IGNORECASE)

    # Clean up excessive whitespace
    content = re.sub(r"\n\s*\n\s*\n", "\n\n", content)

    return content.strip()


def content_too_similar(content1: str, content2: str) -> bool:
    """Check if two content sections are too similar to warrant separate sections."""
    if not content1 or not content2:
        return False

    # Remove HTML tags and normalize whitespace for comparison
    text1 = re.sub(r"<[^>]+>", " ", content1).lower()
    text1 = re.sub(r"\s+", " ", text1).strip()

    text2 = re.sub(r"<[^>]+>", " ", content2).lower()
    text2 = re.sub(r"\s+", " ", text2).strip()

    # If one is much shorter, they're probably different
    if len(text1) < 100 or len(text2) < 100:
        return False

    # Simple similarity check - if 70% of words overlap, consider too similar
    words1 = set(text1.split())
    words2 = set(text2.split())

    if not words1 or not words2:
        return False

    overlap = len(words1.intersection(words2))
    similarity = overlap / max(len(words1), len(words2))

    return similarity > 0.7


def parse_jsdoc_explanation(code: str) -> tuple[str, dict[str, str] | None]:
    """Parse JavaScript code to extract clean code and explanation sections from JSDoc comments."""
    try:
        # Look for the first JSDoc comment block
        jsdoc_pattern = r"/\*\*(.*?)\*/"
        match = re.search(jsdoc_pattern, code, re.DOTALL)

        if not match:
            # No JSDoc found, return code as-is
            return code, None

        jsdoc_content = match.group(1)

        # Clean up JSDoc formatting - preserve blank lines for markdown paragraph breaks
        lines = []
        for line in jsdoc_content.split('\n'):
            # Remove leading whitespace and asterisk
            cleaned = re.sub(r"^\s*\*\s?", "", line)
            lines.append(cleaned)
        jsdoc_content = '\n'.join(lines)

        # Extract explanation content (everything from <details> onward)
        details_match = re.search(r"<details>", jsdoc_content, re.IGNORECASE)
        explanation_content = jsdoc_content[details_match.start() :].strip() if details_match else ""

        # Remove the JSDoc comment from code
        clean_code = re.sub(jsdoc_pattern, "", code, flags=re.DOTALL).strip()

        # Parse explanation sections if present
        explanation_sections = None
        if explanation_content and "<details>" in explanation_content:
            explanation_sections = parse_explanation_into_sections(explanation_content)

        return clean_code, explanation_sections

    except Exception:
        # If parsing fails, return original code
        return code, None


def extract_js_problem_description(code: str) -> str | None:
    """Extract problem description from JSDoc comment."""
    try:
        # Look for the first JSDoc comment
        jsdoc_pattern = r"/\*\*(.*?)\*/"
        match = re.search(jsdoc_pattern, code, re.DOTALL)

        if match:
            jsdoc_content = match.group(1)

            # Clean up JSDoc formatting - preserve blank lines for markdown paragraph breaks
            lines = []
            for line in jsdoc_content.split('\n'):
                # Remove leading whitespace and asterisk
                cleaned = re.sub(r"^\s*\*\s?", "", line)
                lines.append(cleaned)
            jsdoc_content = '\n'.join(lines)

            # Extract everything before <details> or the whole thing if no details
            details_match = re.search(r"<details>", jsdoc_content, re.IGNORECASE)
            if details_match:
                problem_description = jsdoc_content[: details_match.start()].strip()
            else:
                problem_description = jsdoc_content.strip()

            # Remove "Difficulty:" line from problem description
            # This metadata is shown as a badge, not in the problem text
            problem_description = re.sub(r'^Difficulty:\s*\w+\s*\n?', '', problem_description, flags=re.MULTILINE)

            # Convert to HTML
            problem_html = markdown.markdown(problem_description, extensions=["fenced_code", "tables"])
            return problem_html

    except Exception:  # nosec B110 - Intentional: return None on parsing failure
        pass

    return None


def generate_js_skeleton(code: str, solution: Any) -> str:
    """Generate comprehensive skeleton code for JavaScript solutions."""
    try:
        # Enhanced JavaScript skeleton generation
        # Extract function signatures, classes, and other structures
        function_pattern = r"function\s+(\w+)\s*\([^)]*\)\s*{"
        class_pattern = r"class\s+(\w+)\s*(?:extends\s+\w+)?\s*{"

        functions = re.findall(function_pattern, code)
        classes = re.findall(class_pattern, code)

        # Enhanced header with problem context
        skeleton_lines = [
            "/**",
            f" * {solution.number}. {solution.name}",
            f" * Category: {solution.category.replace('-', ' ').title()}" if hasattr(solution, "category") else "",
            " *",
            " * JavaScript Practice Template",
            " *",
            " * This skeleton provides the structure for implementing the solution.",
            " * Fill in the TODO sections with your implementation.",
            " *",
            " * Key areas to implement:",
            " * - Main algorithm logic",
            " * - Edge case handling",
            " * - Return statement with correct type",
            " *",
            " * Time Complexity: O(?)",
            " * Space Complexity: O(?)",
            " */",
            "",
        ]

        # Add helper structures if needed
        if "ListNode" in code:
            skeleton_lines.extend(
                [
                    "/**",
                    " * Definition for singly-linked list.",
                    " * function ListNode(val, next) {",
                    " *     this.val = (val===undefined ? 0 : val)",
                    " *     this.next = (next===undefined ? null : next)",
                    " * }",
                    " */",
                    "",
                ]
            )

        if "TreeNode" in code:
            skeleton_lines.extend(
                [
                    "/**",
                    " * Definition for a binary tree node.",
                    " * function TreeNode(val, left, right) {",
                    " *     this.val = (val===undefined ? 0 : val)",
                    " *     this.left = (left===undefined ? null : left)",
                    " *     this.right = (right===undefined ? null : right)",
                    " * }",
                    " */",
                    "",
                ]
            )

        # Handle classes first
        for class_name in classes:
            if class_name in ["Test", "TestCase", "Main"]:
                continue

            skeleton_lines.extend(
                [
                    f"class {class_name} {{",
                    "    /**",
                    f"     * {class_name} constructor - TODO: Add constructor description",
                    "     * @param {...any} args - TODO: Describe constructor parameters",
                    "     */",
                    "    constructor(...args) {",
                    "        // TODO: Initialize class properties",
                    "        // this.property = value;",
                    "    }",
                    "",
                ]
            )

            # Extract methods from the class
            class_methods_pattern = rf"class\s+{class_name}\s*(?:extends\s+\w+)?\s*\{{(.*?)\n\}}"
            class_match = re.search(class_methods_pattern, code, re.DOTALL)
            if class_match:
                class_body = class_match.group(1)
                method_pattern = r"(\w+)\s*\([^)]*\)\s*\{"
                methods = re.findall(method_pattern, class_body)

                for method_name in methods:
                    if method_name not in ["constructor"]:
                        # Extract method signature
                        method_match = re.search(rf"{method_name}\s*\([^)]*\)", class_body)
                        if method_match:
                            signature = method_match.group(0)
                            skeleton_lines.extend(
                                [
                                    "    /**",
                                    f"     * {method_name} - TODO: Add method description",
                                    "     *",
                                    "     * Algorithm approach:",
                                    "     * 1. TODO: Describe step 1",
                                    "     * 2. TODO: Describe step 2",
                                    "     * 3. TODO: Describe step 3",
                                    "     *",
                                    "     * @param {...any} args - TODO: Describe parameters",
                                    "     * @return {any} - TODO: Describe return value",
                                    "     *",
                                    "     * Time Complexity: O(?)",
                                    "     * Space Complexity: O(?)",
                                    "     */",
                                    f"    {signature} {{",
                                    "        // TODO: Handle edge cases",
                                    "        // if (!input || input.length === 0) {",
                                    "        //     return defaultValue;",
                                    "        // }",
                                    "",
                                    "        // TODO: Initialize variables",
                                    "        // let variable = initialValue;",
                                    "",
                                    "        // TODO: Main algorithm implementation",
                                    "        // for/while loop or recursive logic here",
                                    "",
                                    "        // TODO: Return result",
                                    "        return null;",
                                    "    }",
                                    "",
                                ]
                            )

            skeleton_lines.append("}")
            skeleton_lines.append("")

        # Handle standalone functions
        for func_name in functions:
            if func_name in ["runTests", "main", "test", "testSolution", "demonstrateSolution"]:
                continue

            # Extract the full function signature
            func_match = re.search(rf"function\s+{func_name}\s*\([^)]*\)", code)
            if func_match:
                signature = func_match.group(0)
                skeleton_lines.extend(
                    [
                        "/**",
                        f" * {func_name} - TODO: Add function description",
                        " *",
                        " * Algorithm approach:",
                        " * 1. TODO: Describe step 1",
                        " * 2. TODO: Describe step 2",
                        " * 3. TODO: Describe step 3",
                        " *",
                        " * @param {...any} args - TODO: Describe parameters",
                        " * @return {any} - TODO: Describe return value",
                        " *",
                        " * Time Complexity: O(?)",
                        " * Space Complexity: O(?)",
                        " */",
                        f"{signature} {{",
                        "    // TODO: Handle edge cases",
                        "    // if (!input || input.length === 0) {",
                        "    //     return defaultValue;",
                        "    // }",
                        "",
                        "    // TODO: Initialize variables",
                        "    // let variable = initialValue;",
                        "",
                        "    // TODO: Main algorithm implementation",
                        "    // for/while loop or recursive logic here",
                        "",
                        "    // TODO: Return result",
                        "    return null;",
                        "}",
                        "",
                    ]
                )

        # Add test case template
        skeleton_lines.extend(
            [
                "/**",
                " * Test cases for the solution",
                " */",
                "function testSolution() {",
                "    console.log('Testing solution...');",
                "",
                "    // TODO: Add test cases",
                "    // Test case 1: Basic functionality",
                "    // const result1 = functionName(testInput);",
                "    // const expected1 = expectedOutput;",
                "    // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);",
                "",
                "    // TODO: Add edge cases",
                "    // Test case 2: Edge case",
                "    // Test case 3: Large input",
                "",
                "    console.log('All tests passed!');",
                "}",
                "",
                "/**",
                " * Example usage and demonstration",
                " */",
                "function demonstrateSolution() {",
                f"    console.log('\\n=== Problem {solution.number}. {solution.name} ===');",
                f"    console.log('Category: {solution.category.replace('-', ' ').title()}');"
                if hasattr(solution, "category")
                else "",
                "    console.log('');",
                "",
                "    testSolution();",
                "}",
                "",
                "// Run tests if this file is executed directly",
                "if (require.main === module) {",
                "    demonstrateSolution();",
                "}",
                "",
                "// Export for use in other modules",
                "module.exports = {",
                "    // TODO: Add exports",
                "    testSolution,",
                "    demonstrateSolution",
                "};",
            ]
        )

        # Fallback if no functions or classes found
        if not functions and not classes:
            skeleton_lines.extend(
                [
                    "/**",
                    " * Main solution function - TODO: Add description",
                    " * @param {...any} args - TODO: Describe parameters",
                    " * @return {any} - TODO: Describe return value",
                    " */",
                    "function solve(...args) {",
                    "    // TODO: Implement solution",
                    "    return null;",
                    "}",
                ]
            )

        return "\n".join(skeleton_lines)

    except Exception as e:
        # Enhanced fallback skeleton
        return f"""/**
 * {solution.number}. {solution.name}
 * JavaScript Practice Template
 *
 * Note: Could not parse original code structure (Error: {str(e)})
 * Please implement the solution manually
 *
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */

/**
 * Main solution function - TODO: Add description
 * @param {{...any}} args - TODO: Describe parameters
 * @return {{any}} - TODO: Describe return value
 */
function solve(...args) {{
    // TODO: Handle edge cases
    // if (!input || input.length === 0) {{
    //     return defaultValue;
    // }}

    // TODO: Initialize variables
    // let variable = initialValue;

    // TODO: Main algorithm implementation
    // for/while loop or recursive logic here

    // TODO: Return result
    return null;
}}

/**
 * Test cases for the solution
 */
function testSolution() {{
    console.log('Testing solution...');

    // TODO: Add test cases
    console.log('All tests passed!');
}}

// Run tests if this file is executed directly
if (require.main === module) {{
    testSolution();
}}

// Export for use in other modules
module.exports = {{
    solve,
    testSolution
}};"""


def get_syntax_highlighting_style() -> str:
    """Get the appropriate syntax highlighting style based on theme preference."""
    # Check for theme preference from cookies or headers
    theme = request.cookies.get("theme", "light")

    # You can also check from localStorage via a query parameter if needed
    theme_param = request.args.get("theme")
    if theme_param in ["light", "dark"]:
        theme = theme_param

    # Return appropriate Pygments style
    if theme == "dark":
        return "monokai"  # Dark theme
    else:
        return "default"  # Light theme


def create_code_formatter() -> HtmlFormatter[str]:
    """Create a code formatter with appropriate theme."""
    style = get_syntax_highlighting_style()
    return HtmlFormatter(style=style, linenos=True)


@app.route("/")
def index() -> str:
    """Home page showing all categories."""
    categories = category_manager.get_categories()
    stats = category_manager.get_statistics()

    return render_template(
        "index.html",
        categories=categories,
        total_solutions=stats["total_solutions"],
        total_categories=stats["total_categories"],
    )


@app.route("/category/<category>")
def category_view(category: str) -> str:
    """View all solutions in a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)

    # Read category documentation
    doc_content = category_manager.read_documentation(category)
    doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables"]) if doc_content else None

    return render_template(
        "category.html",
        category=category,
        category_name=cat_data.name,
        solutions=cat_data.solutions,
        documentation=doc_html,
    )


@app.route("/difficulty/<difficulty>")
def difficulty_view(difficulty: str) -> str:
    """View all solutions of a specific difficulty level."""
    # Get all categories and filter solutions by difficulty
    all_categories = category_manager.get_categories()
    filtered_solutions = []

    for category in all_categories:
        for solution in category.solutions:
            if solution.difficulty.lower() == difficulty.lower():
                # Add category info to solution for navigation
                filtered_solutions.append({
                    "solution": solution,
                    "category": category.slug,
                    "category_name": category.name,
                })

    if not filtered_solutions:
        abort(404)

    return render_template(
        "difficulty.html",
        difficulty=difficulty.capitalize(),
        solutions=filtered_solutions,
        total_count=len(filtered_solutions),
    )


@app.route("/complexity/<time_complexity>/<space_complexity>")
def complexity_view(time_complexity: str, space_complexity: str) -> str:
    """View all solutions with specific time/space complexity."""
    # Get all categories and filter solutions by complexity
    all_categories = category_manager.get_categories()
    filtered_solutions = []

    for category in all_categories:
        for solution in category.solutions:
            time_match = time_complexity == "any" or solution.time_complexity == time_complexity
            space_match = space_complexity == "any" or solution.space_complexity == space_complexity

            if time_match and space_match:
                # Add category info to solution for navigation
                filtered_solutions.append({
                    "solution": solution,
                    "category": category.slug,
                    "category_name": category.name,
                })

    if not filtered_solutions:
        abort(404)

    return render_template(
        "complexity.html",
        time_complexity=time_complexity,
        space_complexity=space_complexity,
        solutions=filtered_solutions,
        total_count=len(filtered_solutions),
    )


@app.route("/solution/<category>/<filename>")
def solution_view(category: str, filename: str) -> str:
    """View a specific solution."""
    # Add .py extension if not present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution_code = category_manager.read_solution_content(category, filename)
    if not solution_code:
        abort(404)

    # Get solution metadata
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Extract problem description from docstring
    problem_description = extract_problem_description(solution_code)

    # Parse docstring to extract explanation sections
    clean_code, explanation_sections = parse_docstring_explanation(solution_code)

    # Generate skeleton code
    skeleton = generate_skeleton(clean_code, solution, is_leetcode=False)

    # Syntax highlighting for Python code
    formatter = create_code_formatter()
    highlighted_code = highlight(clean_code, PythonLexer(), formatter)
    highlighted_skeleton = highlight(skeleton, PythonLexer(), formatter)

    # Get category name
    cat_data = category_manager.get_category(category)

    # Get all available languages for this problem
    available_languages = get_available_languages(category, filename)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=solution.name,
        problem_description=problem_description,
        skeleton_code=highlighted_skeleton,
        code=highlighted_code,
        explanation=explanation_sections,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=False,
        available_languages=available_languages,
        difficulty=solution.difficulty,
        time_complexity=solution.time_complexity,
        space_complexity=solution.space_complexity,
    )


@app.route("/solution/<category>/<filename>/leetcode")
def solution_leetcode_view(category: str, filename: str) -> str:
    """View solution in LeetCode format (camelCase)."""
    # Add .py extension if not present
    if not filename.endswith(".py"):
        filename = filename + ".py"
    solution_code = category_manager.read_solution_content(category, filename)
    if not solution_code:
        abort(404)

    # Convert to LeetCode format
    leetcode_code = convert_to_leetcode_format(solution_code)
    solution_class = extract_solution_class(leetcode_code)

    # Get solution metadata
    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Syntax highlighting
    formatter = create_code_formatter()
    highlighted_code = highlight(solution_class, PythonLexer(), formatter)

    cat_data = category_manager.get_category(category)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=solution.name + " (LeetCode Format)",
        code=highlighted_code,
        documentation=None,
        explanation=None,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=True,
        available_languages=[],
    )


@app.route("/solution/<category>/<filename>/download/<format>")
@app.route("/solution/<category>/<filename>/download/<format>/<language>")
def download_solution(category: str, filename: str, format: str, language: str = "Python") -> Response:
    """Download solution in specified format and language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    # Get the appropriate solution code based on language
    if language == "Python":
        solution_code = category_manager.read_solution_content(category, filename)
    else:
        # Get alternative language solution
        base_name = filename.replace(".py", "")
        lang_extension = get_file_extension(language)
        alt_filename = f"{base_name}{lang_extension}"
        alt_path = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives" / alt_filename

        if alt_path.exists():
            with open(alt_path) as f:
                solution_code = f.read()
        else:
            abort(404)

    if not solution_code:
        abort(404)

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    base_name = f"{solution.number}_{solution.name.lower().replace(' ', '_')}_{language.lower()}"

    # Handle 'both' format - return a zip file with skeleton and solution for the specific language
    if format == "both":
        import io
        import zipfile

        # Create in-memory zip file
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            # Get the appropriate file extension
            file_ext = get_file_extension(language) if language != "Python" else ".py"

            # Add skeleton
            skeleton_content = generate_skeleton(solution_code, solution)
            zip_file.writestr(f"{base_name}_skeleton{file_ext}", skeleton_content)

            # Add full solution
            zip_file.writestr(f"{base_name}_solution{file_ext}", solution_code)

            # Only add LeetCode format for Python
            if language == "Python":
                # Add LeetCode format solution (camelCase)
                leetcode_code = convert_to_leetcode_format(solution_code)
                leetcode_content = extract_solution_class(leetcode_code)
                zip_file.writestr(f"{base_name}_leetcode.py", leetcode_content)

                # Add LeetCode skeleton (camelCase, hidden from UI)
                leetcode_skeleton = generate_skeleton(leetcode_code, solution, is_leetcode=True)
                zip_file.writestr(f"{base_name}_leetcode_skeleton.py", leetcode_skeleton)

        zip_buffer.seek(0)
        return Response(
            zip_buffer.getvalue(),
            mimetype="application/zip",
            headers={"Content-Disposition": f"attachment; filename={base_name}.zip"},
        )

    # Generate appropriate content based on format
    elif format == "skeleton":
        # Extract just the method signatures without implementation
        content = generate_skeleton(solution_code, solution)
        file_ext = get_file_extension(language) if language != "Python" else ".py"
        download_name = f"{base_name}_skeleton{file_ext}"
    elif format == "solution":
        # Full solution in original format
        content = solution_code
        file_ext = get_file_extension(language) if language != "Python" else ".py"
        download_name = f"{base_name}_solution{file_ext}"
    elif format == "leetcode":
        # Solution in LeetCode camelCase format (only for Python)
        if language != "Python":
            # For non-Python languages, just return the solution
            content = solution_code
            file_ext = get_file_extension(language)
            download_name = f"{base_name}_solution{file_ext}"
        else:
            leetcode_code = convert_to_leetcode_format(solution_code)
            content = extract_solution_class(leetcode_code)
            download_name = f"{base_name}_leetcode.py"
    else:
        abort(400)  # Bad request for invalid format

    # Return as downloadable file
    return Response(
        content, mimetype="text/x-python", headers={"Content-Disposition": f"attachment; filename={download_name}"}
    )


def generate_skeleton(code: str, solution: Any, is_leetcode: bool = False) -> str:
    """Generate a comprehensive skeleton template from solution code.

    Args:
        code: The source code to extract skeleton from
        solution: Solution metadata object
        is_leetcode: If True, generates LeetCode-ready skeleton (for hidden file)
    """

    header_text = "LeetCode Submission Skeleton" if is_leetcode else "Problem Skeleton - Practice Template"

    # Enhanced header with problem context
    skeleton_lines = [
        '"""',
        f"{solution.number}. {solution.name}",
        f"Category: {solution.category.replace('-', ' ').title()}" if hasattr(solution, "category") else "",
        "",
        f"{header_text}",
        "",
        "This skeleton provides the structure for implementing the solution.",
        "Fill in the TODO sections with your implementation.",
        "",
        "Key areas to implement:",
        "- Main algorithm logic",
        "- Edge case handling",
        "- Return statement with correct type",
        "",
        "Time Complexity: O(?)",
        "Space Complexity: O(?)",
        '"""',
        "",
    ]

    # Add necessary imports if LeetCode format
    if is_leetcode:
        skeleton_lines.extend(
            [
                "from typing import List, Optional",
                "",
            ]
        )

    # Add helper classes/structures if needed
    if "ListNode" in code:
        skeleton_lines.extend(
            [
                "# Definition for singly-linked list.",
                "# class ListNode:",
                "#     def __init__(self, val=0, next=None):",
                "#         self.val = val",
                "#         self.next = next",
                "",
            ]
        )

    if "TreeNode" in code:
        skeleton_lines.extend(
            [
                "# Definition for a binary tree node.",
                "# class TreeNode:",
                "#     def __init__(self, val=0, left=None, right=None):",
                "#         self.val = val",
                "#         self.left = left",
                "#         self.right = right",
                "",
            ]
        )

    try:
        tree = ast.parse(code)
        solution_class_found = False

        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef) and node.name == "Solution":
                solution_class_found = True
                skeleton_lines.append("class Solution:")

                for method in node.body:
                    if isinstance(method, ast.FunctionDef):
                        # Get method signature with full type annotations
                        args = []
                        for arg in method.args.args:
                            arg_str = arg.arg
                            if arg.annotation:
                                # Get annotation as string
                                ann_str = (
                                    ast.unparse(arg.annotation) if hasattr(ast, "unparse") else str(arg.annotation)
                                )
                                arg_str += f": {ann_str}"
                            args.append(arg_str)

                        args_str = ", ".join(args)
                        returns = ""
                        if method.returns:
                            returns = (
                                f" -> {ast.unparse(method.returns) if hasattr(ast, 'unparse') else str(method.returns)}"
                            )

                        skeleton_lines.append(f"    def {method.name}({args_str}){returns}:")

                        # Enhanced docstring with structure
                        skeleton_lines.extend(
                            [
                                '        """',
                                f"        {method.name} - TODO: Add method description",
                                "",
                                "        Algorithm approach:",
                                "        1. TODO: Describe step 1",
                                "        2. TODO: Describe step 2",
                                "        3. TODO: Describe step 3",
                                "",
                                "        Args:",
                                "            TODO: Describe parameters",
                                "",
                                "        Returns:",
                                "            TODO: Describe return value",
                                "",
                                "        Time Complexity: O(?)",
                                "        Space Complexity: O(?)",
                                '        """',
                            ]
                        )

                        # Implementation template with structure
                        skeleton_lines.extend(
                            [
                                "        # TODO: Handle edge cases",
                                "        # if not input or len(input) == 0:",
                                "        #     return default_value",
                                "",
                                "        # TODO: Initialize variables",
                                "        # variable = initial_value",
                                "",
                                "        # TODO: Main algorithm implementation",
                                "        # for/while loop or recursive logic here",
                                "",
                                "        # TODO: Return result",
                                "        pass",
                                "",
                            ]
                        )

                # Add test case template if not LeetCode format
                if not is_leetcode:
                    skeleton_lines.extend(
                        [
                            "",
                            "",
                            "def test_solution():",
                            '    """Test cases for the solution."""',
                            "    solution = Solution()",
                            "",
                            "    # TODO: Add test cases",
                            "    # Test case 1: Basic functionality",
                            "    # result = solution.method_name(test_input)",
                            "    # expected = expected_output",
                            "    # assert result == expected, f'Test failed: expected {expected}, got {result}'",
                            "",
                            "    # TODO: Add edge cases",
                            "    # Test case 2: Edge case",
                            "    # Test case 3: Large input",
                            "",
                            '    print("All tests passed!")',
                            "",
                            "",
                            'if __name__ == "__main__":',
                            "    test_solution()",
                        ]
                    )
                break

        if not solution_class_found:
            # Fallback: create basic structure
            skeleton_lines.extend(
                [
                    "class Solution:",
                    "    def solve(self, *args, **kwargs):",
                    '        """',
                    "        TODO: Implement the main solution method",
                    '        """',
                    "        # TODO: Implement solution",
                    "        pass",
                ]
            )

    except Exception as e:
        # Enhanced fallback with error info
        skeleton_lines.extend(
            [
                f"# Note: Could not parse original code structure (Error: {str(e)})",
                "# Please implement the solution class manually",
                "",
                "class Solution:",
                "    def solve(self, *args, **kwargs):",
                '        """TODO: Implement the solution method"""',
                "        pass",
            ]
        )

    return "\n".join(skeleton_lines)


@app.route("/solution/<category>/<filename>/upload", methods=["GET", "POST"])
def upload_alternative_solution(category: str, filename: str) -> str | Response:
    """Upload solution in a different programming language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    if request.method == "POST":
        # Check if file was uploaded (support both 'file' and 'solution_file')
        file_field = "file" if "file" in request.files else "solution_file"
        if file_field not in request.files:
            flash("No file selected", "error")
            # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

        file = request.files[file_field]
        language = request.form.get("language")

        if file.filename == "":
            flash("No file selected", "error")
            # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

        if file and language:
            # Validate file extension matches language
            expected_ext = get_file_extension(language)
            if file.filename and not file.filename.endswith(expected_ext):
                flash("Invalid file extension for selected language", "error")
                # Remove .py for redirect
            display_filename = filename.replace(".py", "")
            return cast(Response, redirect(url_for("solution_view", category=category, filename=display_filename)))

    # GET request - show upload form
    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")
    return render_template("upload_solution.html", category=category, filename=display_filename, solution=solution)


@app.route("/solution/<category>/<filename>/view/<language>")
def view_alternative_solution(category: str, filename: str, language: str) -> str:
    """View solution in a specific programming language."""
    # Handle .py extension if present
    if not filename.endswith(".py"):
        filename = filename + ".py"

    solution = category_manager.get_solution(category, filename)
    if not solution:
        abort(404)

    # Get the alternative solution file
    base_name = filename.replace(".py", "")
    lang_extension = get_file_extension(language)
    alt_filename = f"{base_name}{lang_extension}"
    alt_path = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives" / alt_filename

    if not alt_path.exists():
        abort(404)

    # Read the alternative solution
    with open(alt_path) as f:
        code_content = f.read()

    # Parse content based on language
    if language.lower() == "javascript":
        # Parse JavaScript code
        clean_code, explanation_sections = parse_jsdoc_explanation(code_content)
        problem_description = extract_js_problem_description(code_content)
        skeleton_code = generate_js_skeleton(clean_code, solution)
    else:
        # For other languages, use basic parsing or add more language support as needed
        clean_code = code_content
        explanation_sections = None
        problem_description = None
        skeleton_code = None

    # Get appropriate lexer for syntax highlighting
    lexer = get_lexer_for_language(language)
    formatter = create_code_formatter()
    highlighted_code = highlight(clean_code, lexer, formatter)
    highlighted_skeleton = highlight(skeleton_code, lexer, formatter) if skeleton_code else None

    # Get all available languages for this problem
    available_languages = get_available_languages(category, filename)

    cat_data = category_manager.get_category(category)

    # Remove .py from filename for URL display
    display_filename = filename.replace(".py", "")

    return render_template(
        "solution.html",
        category=category,
        category_name=cat_data.name if cat_data else category.replace("-", " ").title(),
        filename=display_filename,
        problem_number=solution.number,
        problem_name=solution.name,
        problem_description=problem_description,
        skeleton_code=highlighted_skeleton,
        code=highlighted_code,
        explanation=explanation_sections,
        style=formatter.get_style_defs(".highlight"),  # type: ignore[no-untyped-call]
        is_leetcode_format=False,
        current_language=language,
        available_languages=available_languages,
        difficulty=solution.difficulty,
        time_complexity=solution.time_complexity,
        space_complexity=solution.space_complexity,
    )


def get_file_extension(language: str) -> str:
    """Get file extension for a programming language."""
    extensions = {
        "Python": ".py",
        "Java": ".java",
        "C++": ".cpp",
        "C": ".c",
        "JavaScript": ".js",
        "TypeScript": ".ts",
        "Go": ".go",
        "Rust": ".rs",
        "C#": ".cs",
        "Swift": ".swift",
        "Kotlin": ".kt",
        "Ruby": ".rb",
        "PHP": ".php",
        "Scala": ".scala",
        # Additional languages
        "Lua": ".lua",
        "Perl": ".pl",
        "R": ".r",
        "Julia": ".jl",
        "Clojure": ".clj",
        "Haskell": ".hs",
        "Elixir": ".ex",
        "OCaml": ".ml",
        "Scheme": ".scm",
        "Lisp": ".lisp",
        # .NET languages
        "VB.NET": ".vb",
        "F#": ".fs",
        # Shell scripts
        "Bash": ".sh",
        "Zsh": ".zsh",
        "Fish": ".fish",
        "PowerShell": ".ps1",
        "Batch": ".bat",
    }
    return extensions.get(language, ".txt")


def get_lexer_for_language(language: str) -> Any:
    """Get Pygments lexer for a programming language."""
    lexers = {
        "Python": PythonLexer(),
        "Java": JavaLexer(),
        "C++": CppLexer(),
        "C": CLexer(),
        "JavaScript": JavascriptLexer(),
        "TypeScript": TypeScriptLexer(),
        "Go": GoLexer(),
        "Rust": RustLexer(),
        "C#": CSharpLexer(),
        "Swift": SwiftLexer(),
    }
    return lexers.get(language, get_lexer_by_name(language.lower()))


def get_available_languages(category: str, filename: str) -> list[str]:
    """Get list of available programming languages for a solution."""
    languages = ["Python"]  # Always have Python

    # Check alternatives directory
    alt_dir = Path(__file__).parent.parent.parent / "solutions" / category / "alternatives"
    if alt_dir.exists():
        base_name = filename.replace(".py", "")

        # Map file extensions to languages
        extension_to_language = {
            ".js": "JavaScript",
            ".java": "Java",
            ".cpp": "C++",
            ".c": "C",
            ".ts": "TypeScript",
            ".go": "Go",
            ".rs": "Rust",
            ".cs": "C#",
            ".swift": "Swift",
            ".kt": "Kotlin",
            ".rb": "Ruby",
            ".php": "PHP",
            ".scala": "Scala",
            # Additional languages
            ".lua": "Lua",
            ".pl": "Perl",
            ".r": "R",
            ".jl": "Julia",
            ".clj": "Clojure",
            ".hs": "Haskell",
            ".ex": "Elixir",
            ".ml": "OCaml",
            ".scm": "Scheme",
            ".lisp": "Lisp",
            # .NET languages
            ".vb": "VB.NET",
            ".fs": "F#",
            # Shell scripts
            ".sh": "Bash",
            ".bash": "Bash",
            ".zsh": "Zsh",
            ".fish": "Fish",
            ".ps1": "PowerShell",
            ".bat": "Batch",
        }

        for file_path in alt_dir.iterdir():
            if file_path.name.startswith(base_name) and file_path.is_file():
                # Check for simple naming pattern: base_name.ext (e.g., "048-rotate-image.js")
                file_extension = file_path.suffix.lower()
                if file_extension in extension_to_language:
                    language = extension_to_language[file_extension]
                    languages.append(language)

    return sorted(set(languages))


@app.route("/docs")
def docs_index() -> str:
    """Documentation index - show available documentation categories."""
    docs = []
    docs_path = Path(__file__).parent.parent.parent / "docs"

    if docs_path.exists():
        for category_dir in sorted(docs_path.iterdir()):
            if category_dir.is_dir() and not category_dir.name.startswith("."):
                readme_path = category_dir / "README.md"
                if readme_path.exists():
                    # Convert directory name to display name
                    display_name = category_dir.name.replace("-", " & ").title()
                    if category_dir.name == "arrays-hashing":
                        display_name = "Arrays & Hashing"
                    elif category_dir.name == "two-pointers":
                        display_name = "Two Pointers"
                    elif category_dir.name == "dynamic-programming":
                        display_name = "Dynamic Programming"
                    elif category_dir.name == "binary-search":
                        display_name = "Binary Search"
                    elif category_dir.name == "bit-manipulation":
                        display_name = "Bit Manipulation"
                    elif category_dir.name == "topological-sort":
                        display_name = "Topological Sort"
                    elif category_dir.name == "string-manipulation":
                        display_name = "String Manipulation"
                    elif category_dir.name == "monotonic-stack":
                        display_name = "Monotonic Stack"
                    elif category_dir.name == "segment-tree":
                        display_name = "Segment Tree"
                    elif category_dir.name == "prefix-sum":
                        display_name = "Prefix Sum"
                    elif category_dir.name == "sliding-window":
                        display_name = "Sliding Window"
                    elif category_dir.name == "union-find":
                        display_name = "Union Find"

                    docs.append({"slug": category_dir.name, "name": display_name})

    return render_template("docs.html", docs=docs)


@app.route("/docs/README")
def docs_readme() -> str:
    """View main documentation README."""
    docs_path = Path(__file__).parent.parent.parent / "docs" / "README.md"
    if docs_path.exists():
        doc_content = docs_path.read_text()
        doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])
        return render_template("doc_view.html", category="README", category_name="README", content=doc_html)
    abort(404)


@app.route("/docs/<category>")
def docs_view(category: str) -> str:
    """View category documentation."""
    # Handle user guide specially
    if category == "user_guide":
        docs_path = Path(__file__).parent.parent.parent / "docs" / "user_guide.md"
        if docs_path.exists():
            doc_content = docs_path.read_text()
            doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables", "toc"])
            return render_template("doc_view.html", category=category, category_name="User Guide", content=doc_html)
        abort(404)

    # Handle regular category documentation
    doc_content_result = category_manager.read_documentation(category)
    if not doc_content_result:
        abort(404)

    # Type narrowing: at this point doc_content_result must be str
    doc_html = markdown.markdown(doc_content_result, extensions=["fenced_code", "tables", "toc"])

    return render_template(
        "doc_view.html", category=category, category_name=category.replace("-", " ").title(), content=doc_html
    )


@app.errorhandler(404)
def not_found(error: Any) -> tuple[str, int]:
    """404 error handler."""
    return render_template("404.html"), 404


# API endpoints for sidebar navigation
@app.route("/api/categories")
def api_categories() -> Response:
    """API endpoint to get all categories."""
    categories = category_manager.get_categories()
    return jsonify([{"name": cat.name, "slug": cat.slug, "count": cat.count} for cat in categories])


@app.route("/api/category/<category>/solutions")
def api_category_solutions(category: str) -> Response:
    """API endpoint to get solutions for a category."""
    cat_data = category_manager.get_category(category)
    if not cat_data:
        abort(404)
    return jsonify([{"filename": sol.filename, "name": sol.name, "number": sol.number} for sol in cat_data.solutions])


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Leet Code Learning Tool Web Interface")
    parser.add_argument("--host", default="127.0.0.1", help="Hostname to bind to (default: 127.0.0.1)")
    parser.add_argument("--port", type=int, default=9501, help="Port to bind to (default: 9501)")
    parser.add_argument("--debug", action="store_true", default=True, help="Enable debug mode (default: True)")

    args = parser.parse_args()

    app.run(debug=args.debug, host=args.host, port=args.port)
