"""Skeleton code generator for multiple programming languages.

This module provides utilities to generate skeleton code templates from solution
implementations across different programming languages.
"""

import ast
import re

from ..data.category_data import Solution


def generate_python_skeleton(code: str, solution: Solution, is_leetcode: bool = False) -> str:
    """Generate a Python skeleton template from solution code.

    Args:
        code: The Python source code
        solution: Solution metadata object
        is_leetcode: If True, generates LeetCode-ready skeleton

    Returns:
        Python skeleton code with method signatures and TODO placeholders
    """
    header_text = "LeetCode Submission Skeleton" if is_leetcode else "Problem Skeleton - Practice Template"

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
        skeleton_lines.extend(["from typing import List, Optional", ""])

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

    # Parse the code to extract class and methods
    try:
        tree = ast.parse(code)

        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                # Skip test classes
                if node.name in ["Test", "TestCase"]:
                    continue

                # Add class definition
                skeleton_lines.append(f"class {node.name}:")

                # Extract methods
                for item in node.body:
                    if isinstance(item, ast.FunctionDef):
                        # Get function signature
                        args = []
                        for arg in item.args.args:
                            arg_name = arg.arg
                            # Include type annotation if available
                            if arg.annotation:
                                try:
                                    arg_type = ast.unparse(arg.annotation)
                                    args.append(f"{arg_name}: {arg_type}")
                                except Exception:
                                    args.append(arg_name)
                            else:
                                args.append(arg_name)

                        # Get return type if available
                        return_type = ""
                        if item.returns:
                            try:
                                return_type = f" -> {ast.unparse(item.returns)}"
                            except Exception:
                                return_type = ""

                        # Build method signature
                        method_sig = f"    def {item.name}({', '.join(args)}){return_type}:"
                        skeleton_lines.append(method_sig)

                        # Add docstring if present
                        docstring = ast.get_docstring(item)
                        if docstring and len(docstring) < 200:
                            skeleton_lines.append(f'        """{docstring}"""')

                        # Add TODO placeholder
                        skeleton_lines.append("        # TODO: Implement this method")
                        skeleton_lines.append("        pass")
                        skeleton_lines.append("")

    except SyntaxError:
        # If parsing fails, provide a basic skeleton
        skeleton_lines.extend(
            [
                "class Solution:",
                "    def solve(self, *args, **kwargs):",
                "        # TODO: Implement the solution",
                "        pass",
            ]
        )

    return "\n".join(skeleton_lines)


def generate_javascript_skeleton(code: str, solution: Solution) -> str:
    """Generate a JavaScript skeleton template from solution code.

    Args:
        code: The JavaScript source code
        solution: Solution metadata object

    Returns:
        JavaScript skeleton code
    """
    try:
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
                    f"     * {class_name} constructor",
                    "     * @param {{...any}} args - Constructor parameters",
                    "     */",
                    "    constructor(...args) {",
                    "        // TODO: Initialize class properties",
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
                                    f"     * {method_name} method",
                                    "     * @param {{...any}} args - Method parameters",
                                    "     * @return {{any}} - Return value",
                                    "     */",
                                    f"    {signature} {{",
                                    "        // TODO: Implement this method",
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
                        f" * {func_name} function",
                        " * @param {{...any}} args - Function parameters",
                        " * @return {{any}} - Return value",
                        " */",
                        f"{signature} {{",
                        "    // TODO: Implement this function",
                        "    return null;",
                        "}",
                        "",
                    ]
                )

        return "\n".join(skeleton_lines)

    except Exception:
        # Fallback skeleton
        return f"""/**
 * {solution.number}. {solution.name}
 *
 * TODO: Implement the solution
 */

class Solution {{
    solve(...args) {{
        // TODO: Implement this method
        return null;
    }}
}}
"""


def generate_typescript_skeleton(code: str, solution: Solution) -> str:
    """Generate a TypeScript skeleton template from solution code.

    Args:
        code: The TypeScript source code
        solution: Solution metadata object

    Returns:
        TypeScript skeleton code
    """
    skeleton_lines = [
        "/**",
        f" * {solution.number}. {solution.name}",
        " *",
        " * Problem Skeleton - Practice Template",
        " *",
        f" * Difficulty: {solution.difficulty}",
        f" * Time Complexity: {solution.time_complexity or 'O(?)'}",
        f" * Space Complexity: {solution.space_complexity or 'O(?)'}",
        " */",
        "",
    ]

    # Add helper structures if needed
    if "ListNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for singly-linked list.",
                "// class ListNode {",
                "//     val: number",
                "//     next: ListNode | null",
                "//     constructor(val?: number, next?: ListNode | null) {",
                "//         this.val = (val===undefined ? 0 : val)",
                "//         this.next = (next===undefined ? null : next)",
                "//     }",
                "// }",
                "",
            ]
        )

    if "TreeNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for a binary tree node.",
                "// class TreeNode {",
                "//     val: number",
                "//     left: TreeNode | null",
                "//     right: TreeNode | null",
                "//     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {",
                "//         this.val = (val===undefined ? 0 : val)",
                "//         this.left = (left===undefined ? null : left)",
                "//         this.right = (right===undefined ? null : right)",
                "//     }",
                "// }",
                "",
            ]
        )

    # Extract class signatures
    class_match = re.search(r"class\s+(\w+)", code)
    if class_match:
        class_name = class_match.group(1)
        if class_name not in ["Test", "TestCase"]:
            skeleton_lines.append(f"class {class_name} {{")

            # Find methods with type annotations
            method_pattern = r"\s+(\w+)\s*\([^)]*\)(?:\s*:\s*[\w\[\]<>|]+)?\s*\{"
            for match in re.finditer(method_pattern, code):
                method_name = match.group(1)
                if method_name not in ["constructor"]:
                    skeleton_lines.extend(
                        [
                            f"    {method_name}(...args: any[]): any {{",
                            "        // TODO: Implement this method",
                            "        throw new Error('Not implemented');",
                            "    }",
                            "",
                        ]
                    )

            skeleton_lines.append("}")
    else:
        skeleton_lines.extend(
            [
                "function solve(...args: any[]): any {",
                "    // TODO: Implement this function",
                "    throw new Error('Not implemented');",
                "}",
            ]
        )

    skeleton_lines.extend(["", "export default Solution;" if class_match else "export default solve;"])

    return "\n".join(skeleton_lines)


def generate_java_skeleton(code: str, solution: Solution) -> str:
    """Generate a Java skeleton template from solution code.

    Args:
        code: The Java source code
        solution: Solution metadata object

    Returns:
        Java skeleton code
    """
    skeleton_lines = [
        "/**",
        f" * {solution.number}. {solution.name}",
        " *",
        " * Problem Skeleton - Practice Template",
        " *",
        f" * Difficulty: {solution.difficulty}",
        f" * Time Complexity: {solution.time_complexity or 'O(?)'}",
        f" * Space Complexity: {solution.space_complexity or 'O(?)'}",
        " */",
        "",
    ]

    # Add helper structures if needed
    if "ListNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for singly-linked list.",
                "// class ListNode {",
                "//     int val;",
                "//     ListNode next;",
                "//     ListNode() {}",
                "//     ListNode(int val) { this.val = val; }",
                "//     ListNode(int val, ListNode next) { this.val = val; this.next = next; }",
                "// }",
                "",
            ]
        )

    if "TreeNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for a binary tree node.",
                "// class TreeNode {",
                "//     int val;",
                "//     TreeNode left;",
                "//     TreeNode right;",
                "//     TreeNode() {}",
                "//     TreeNode(int val) { this.val = val; }",
                "//     TreeNode(int val, TreeNode left, TreeNode right) {",
                "//         this.val = val;",
                "//         this.left = left;",
                "//         this.right = right;",
                "//     }",
                "// }",
                "",
            ]
        )

    # Extract class and method signatures
    class_match = re.search(r"class\s+(\w+)", code)
    if class_match:
        class_name = class_match.group(1)
        skeleton_lines.append(f"class {class_name} {{")

        # Find all public methods
        method_pattern = r"public\s+([\w<>\[\]]+)\s+(\w+)\s*\([^)]*\)"
        for match in re.finditer(method_pattern, code):
            return_type = match.group(1)
            method_name = match.group(2)
            skeleton_lines.extend(
                [
                    f"    public {return_type} {method_name}(...) {{",
                    "        // TODO: Implement this method",
                ]
            )
            if return_type == "void":
                skeleton_lines.append("    }")
            elif return_type in ["int", "long", "short", "byte"]:
                skeleton_lines.extend(["        return 0;", "    }"])
            elif return_type == "boolean":
                skeleton_lines.extend(["        return false;", "    }"])
            elif return_type in ["double", "float"]:
                skeleton_lines.extend(["        return 0.0;", "    }"])
            else:
                skeleton_lines.extend(["        return null;", "    }"])
            skeleton_lines.append("")

        skeleton_lines.append("}")
    else:
        skeleton_lines.extend(["class Solution {", "    // TODO: Add methods", "}"])

    return "\n".join(skeleton_lines)


def generate_cpp_skeleton(code: str, solution: Solution) -> str:
    """Generate a C++ skeleton template from solution code.

    Args:
        code: The C++ source code
        solution: Solution metadata object

    Returns:
        C++ skeleton code
    """
    skeleton_lines = [
        "/**",
        f" * {solution.number}. {solution.name}",
        " *",
        f" * Difficulty: {solution.difficulty}",
        f" * Time Complexity: {solution.time_complexity or 'O(?)'}",
        f" * Space Complexity: {solution.space_complexity or 'O(?)'}",
        " */",
        "",
        "#include <vector>",
        "#include <string>",
        "",
        "using namespace std;",
        "",
    ]

    # Add helper structures if needed
    if "ListNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for singly-linked list.",
                "// struct ListNode {",
                "//     int val;",
                "//     ListNode *next;",
                "//     ListNode() : val(0), next(nullptr) {}",
                "//     ListNode(int x) : val(x), next(nullptr) {}",
                "//     ListNode(int x, ListNode *next) : val(x), next(next) {}",
                "// };",
                "",
            ]
        )

    if "TreeNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for a binary tree node.",
                "// struct TreeNode {",
                "//     int val;",
                "//     TreeNode *left;",
                "//     TreeNode *right;",
                "//     TreeNode() : val(0), left(nullptr), right(nullptr) {}",
                "//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}",
                "//     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}",
                "// };",
                "",
            ]
        )

    # Extract class name
    class_match = re.search(r"class\s+(\w+)", code)
    if class_match:
        class_name = class_match.group(1)
        skeleton_lines.extend([f"class {class_name} {{", "public:"])

        # Find methods
        method_pattern = r"([\w<>]+)\s+(\w+)\s*\([^)]*\)"
        for match in re.finditer(method_pattern, code):
            return_type = match.group(1)
            method_name = match.group(2)
            if method_name not in ["public", "private", "protected", class_name]:
                skeleton_lines.extend(
                    [f"    {return_type} {method_name}(...) {{", "        // TODO: Implement this method", "    }", ""]
                )

        skeleton_lines.append("};")
    else:
        skeleton_lines.extend(["class Solution {", "public:", "    // TODO: Add methods", "};"])

    return "\n".join(skeleton_lines)


def generate_go_skeleton(code: str, solution: Solution) -> str:
    """Generate a Go skeleton template from solution code.

    Args:
        code: The Go source code
        solution: Solution metadata object

    Returns:
        Go skeleton code
    """
    skeleton_lines = [
        "/**",
        f" * {solution.number}. {solution.name}",
        " *",
        f" * Difficulty: {solution.difficulty}",
        f" * Time Complexity: {solution.time_complexity or 'O(?)'}",
        f" * Space Complexity: {solution.space_complexity or 'O(?)'}",
        " */",
        "",
        "package main",
        "",
    ]

    # Add helper structures if needed
    if "ListNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for singly-linked list.",
                "// type ListNode struct {",
                "//     Val int",
                "//     Next *ListNode",
                "// }",
                "",
            ]
        )

    if "TreeNode" in code:
        skeleton_lines.extend(
            [
                "// Definition for a binary tree node.",
                "// type TreeNode struct {",
                "//     Val int",
                "//     Left *TreeNode",
                "//     Right *TreeNode",
                "// }",
                "",
            ]
        )

    # Extract function signatures
    func_pattern = r"func\s+(\w+)\s*\([^)]*\)"
    for match in re.finditer(func_pattern, code):
        func_name = match.group(1)
        if func_name not in ["main", "test", "Test"]:
            skeleton_lines.extend(
                [
                    f"func {func_name}(args ...interface{{}}) interface{{}} {{",
                    "    // TODO: Implement this function",
                    "    return nil",
                    "}",
                    "",
                ]
            )

    if not any("func " in line for line in skeleton_lines):
        skeleton_lines.extend(
            [
                "func solve(args ...interface{}) interface{} {",
                "    // TODO: Implement this function",
                "    return nil",
                "}",
            ]
        )

    return "\n".join(skeleton_lines)


def generate_skeleton(code: str, solution: Solution, language: str = "Python", is_leetcode: bool = False) -> str:
    """Generate a skeleton template from solution code for any supported language.

    Args:
        code: The source code to extract skeleton from
        solution: Solution metadata object
        language: Programming language (Python, JavaScript, TypeScript, Java, C++, Go)
        is_leetcode: If True, generates LeetCode-ready skeleton (Python only)

    Returns:
        Skeleton code with method signatures and TODO placeholders

    Raises:
        ValueError: If the language is not supported
    """
    generators = {
        "Python": lambda: generate_python_skeleton(code, solution, is_leetcode),
        "JavaScript": lambda: generate_javascript_skeleton(code, solution),
        "TypeScript": lambda: generate_typescript_skeleton(code, solution),
        "Java": lambda: generate_java_skeleton(code, solution),
        "C++": lambda: generate_cpp_skeleton(code, solution),
        "Go": lambda: generate_go_skeleton(code, solution),
    }

    generator = generators.get(language)
    if not generator:
        raise ValueError(f"Skeleton generation not supported for language: {language}")

    return generator()


# Backward compatibility aliases
generate_js_skeleton = generate_javascript_skeleton
