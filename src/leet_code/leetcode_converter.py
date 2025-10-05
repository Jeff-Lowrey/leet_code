#!/usr/bin/env python3
"""Converter for snake_case Python code to LeetCode camelCase format."""

import ast
import re


class LeetCodeConverter(ast.NodeTransformer):
    """AST transformer to convert snake_case to camelCase for LeetCode."""

    def __init__(self) -> None:
        self.method_mapping: dict[str, str] = {}
        self.converted_methods: set[str] = set()
        self.variable_mapping: dict[str, str] = {}

    def snake_to_camel(self, name: str) -> str:
        """Convert snake_case to camelCase."""
        if not name or "_" not in name:
            return name

        # Handle special cases
        if name.startswith("_"):
            return name  # Keep private methods as-is

        parts = name.split("_")
        # First part stays lowercase, rest are capitalized
        return parts[0] + "".join(word.capitalize() for word in parts[1:])

    def visit_FunctionDef(self, node: ast.FunctionDef) -> ast.FunctionDef:
        """Transform function definitions from snake_case to camelCase."""
        self.generic_visit(node)

        # Only convert methods in Solution class
        if "_" in node.name and not node.name.startswith("_"):
            original_name = node.name
            new_name = self.snake_to_camel(node.name)

            # Store mapping for later use
            self.method_mapping[original_name] = new_name
            self.converted_methods.add(new_name)

            # Update the function name
            node.name = new_name

            # Update argument names
            for arg in node.args.args:
                if "_" in arg.arg:
                    arg.arg = self.snake_to_camel(arg.arg)

        return node

    def visit_Name(self, node: ast.Name) -> ast.Name:
        """Update references to renamed methods and variables."""
        if hasattr(node, "id"):
            if node.id in self.method_mapping:
                node.id = self.method_mapping[node.id]
            elif "_" in node.id and not node.id.startswith("_"):
                # Convert variable names on the fly
                node.id = self.snake_to_camel(node.id)
        return node

    def visit_Attribute(self, node: ast.Attribute) -> ast.Attribute:
        """Update method calls like self.method_name."""
        self.generic_visit(node)
        if node.attr in self.method_mapping:
            node.attr = self.method_mapping[node.attr]
        return node


def convert_to_leetcode_format(code: str) -> str:
    """
    Convert Python code with snake_case to LeetCode camelCase format.

    Args:
        code: Python source code with snake_case naming

    Returns:
        Converted code with camelCase for LeetCode submission
    """
    try:
        # Parse the code into AST
        tree = ast.parse(code)

        # Apply transformations in two passes
        converter = LeetCodeConverter()

        # First pass: collect method names and build mapping
        converter.visit(tree)

        # Second pass: apply transformations using the complete mapping
        modified_tree = converter.visit(tree)

        # Convert back to source code
        import astor  # type: ignore[import-untyped]

        converted_code = astor.to_source(modified_tree)

        # Add LeetCode submission header
        header = """# LeetCode Submission Format
# Copy the Solution class below to LeetCode's code editor
# ============================================================

"""

        return header + str(converted_code)

    except ImportError:
        # Fallback to regex-based conversion if astor is not available
        return regex_based_conversion(code)
    except Exception:
        # If AST parsing fails, use regex-based approach
        return regex_based_conversion(code)


def regex_based_conversion(code: str) -> str:
    """Fallback regex-based converter for snake_case to camelCase."""
    lines = code.split("\n")
    converted_lines = []
    method_mapping = {}

    # First pass: identify all method definitions
    for line in lines:
        match = re.match(r"(\s*)def\s+([a-z_]+)\s*\(", line)
        if match and "_" in match.group(2):
            original = match.group(2)
            if not original.startswith("_"):
                parts = original.split("_")
                camel = parts[0] + "".join(w.capitalize() for w in parts[1:])
                method_mapping[original] = camel

    # Second pass: convert the code
    for line in lines:
        converted_line = line

        # Convert method definitions
        match = re.match(r"(\s*)def\s+([a-z_]+)(\s*\(.*\):.*)", line)
        if match and match.group(2) in method_mapping:
            indent = match.group(1)
            old_name = match.group(2)
            rest = match.group(3)
            new_name = method_mapping[old_name]

            # Also convert parameter names in the signature
            rest = convert_params_in_signature(rest)
            converted_line = f"{indent}def {new_name}{rest}"

        # Convert self.method_name calls
        for old_name, new_name in method_mapping.items():
            pattern = rf"\bself\.{old_name}\b"
            converted_line = re.sub(pattern, f"self.{new_name}", converted_line)

        # Convert parameter names in the line
        converted_line = convert_snake_case_params(converted_line)

        converted_lines.append(converted_line)

    header = """# LeetCode Submission Format
# Copy the Solution class below to LeetCode's code editor
# ============================================================

"""

    return header + "\n".join(converted_lines)


def convert_params_in_signature(signature: str) -> str:
    """Convert parameter names in a function signature."""

    # Match parameter names with underscores
    def replacer(match: re.Match[str]) -> str:
        param = match.group(0)
        if "_" in param and not param.startswith("_"):
            parts = param.split("_")
            return parts[0] + "".join(w.capitalize() for w in parts[1:])
        return param

    # Find and replace parameter names
    pattern = r"\b[a-z][a-z_]*\b(?=\s*:|\s*\)|,)"
    return re.sub(pattern, replacer, signature)


def convert_snake_case_params(line: str) -> str:
    """Convert snake_case parameter names to camelCase."""

    def snake_to_camel_replacer(match: re.Match[str]) -> str:
        """Convert a snake_case match to camelCase."""
        word = match.group(0)
        # Skip if it's a protected/private member or builtin
        if word.startswith("_") or word in {"__init__", "__str__", "__repr__", "max", "min", "len", "sum", "abs"}:
            return word
        # Convert snake_case to camelCase
        if "_" in word:
            parts = word.split("_")
            return parts[0] + "".join(p.capitalize() for p in parts[1:])
        return word

    # Pattern to match snake_case identifiers
    pattern = r"\b[a-z][a-z0-9_]*\b"
    result = re.sub(pattern, snake_to_camel_replacer, line)
    return result


def extract_solution_class(code: str) -> str:
    """Extract just the Solution class from the code."""
    lines = code.split("\n")
    in_solution_class = False
    solution_lines = []
    indent_level = 0

    for line in lines:
        if line.strip().startswith("class Solution"):
            in_solution_class = True
            indent_level = len(line) - len(line.lstrip())
            solution_lines.append(line)
        elif in_solution_class:
            if line.strip() and not line[indent_level : indent_level + 1].isspace() and line.strip()[0] not in "#":
                # We've hit a new top-level definition, stop
                break
            solution_lines.append(line)

    # Return original code if no Solution class found
    if not solution_lines:
        return code

    return "\n".join(solution_lines)


if __name__ == "__main__":
    # Example usage
    sample_code = '''
class Solution:
    def two_sum(self, nums: list[int], target: int) -> list[int]:
        """Find two numbers that sum to target."""
        seen_values = {}
        for i, num in enumerate(nums):
            complement_value = target - num
            if complement_value in seen_values:
                return [seen_values[complement_value], i]
            seen_values[num] = i
        return []

    def max_area(self, height: list[int]) -> int:
        """Find maximum area container."""
        left_ptr = 0
        right_ptr = len(height) - 1
        max_val = 0

        while left_ptr < right_ptr:
            area = min(height[left_ptr], height[right_ptr]) * (right_ptr - left_ptr)
            max_val = max(max_val, area)

            if height[left_ptr] < height[right_ptr]:
                left_ptr += 1
            else:
                right_ptr -= 1

        return max_val
'''

    converted = convert_to_leetcode_format(sample_code)
    print(converted)
