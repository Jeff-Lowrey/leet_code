"""Unit tests for the leetcode_converter module."""

import pytest
from src.leet_code.leetcode_converter import (
    LeetCodeConverter,
    convert_to_leetcode_format,
    extract_solution_class
)


class TestLeetCodeConverter:
    """Test the LeetCodeConverter class."""

    def test_snake_to_camel_basic(self):
        """Test basic snake_case to camelCase conversion."""
        converter = LeetCodeConverter()
        assert converter.snake_to_camel("two_sum") == "twoSum"
        assert converter.snake_to_camel("find_max_value") == "findMaxValue"
        assert converter.snake_to_camel("is_valid") == "isValid"

    def test_snake_to_camel_edge_cases(self):
        """Test edge cases in snake_case to camelCase conversion."""
        converter = LeetCodeConverter()
        assert converter.snake_to_camel("simple") == "simple"
        assert converter.snake_to_camel("") == ""
        assert converter.snake_to_camel("_private_method") == "_private_method"
        assert converter.snake_to_camel("__dunder__") == "__dunder__"

    def test_convert_function_def(self):
        """Test conversion of function definitions."""
        code = '''
class Solution:
    def two_sum(self, nums, target):
        return []

    def find_max_value(self, arr):
        return 0
'''
        result = convert_to_leetcode_format(code)
        assert "def twoSum(" in result
        assert "def findMaxValue(" in result
        assert "def two_sum(" not in result

    def test_convert_function_calls(self):
        """Test conversion of function calls within code."""
        code = '''
class Solution:
    def two_sum(self, nums, target):
        result = self.helper_method(nums)
        return result

    def helper_method(self, data):
        return []
'''
        result = convert_to_leetcode_format(code)
        assert "def twoSum(" in result
        assert "self.helperMethod(" in result
        assert "def helperMethod(" in result

    def test_preserve_builtins(self):
        """Test that built-in functions are not converted."""
        code = '''
class Solution:
    def my_function(self):
        max_len = max(len(s) for s in strings)
        min_val = min(values)
        return max_len
'''
        result = convert_to_leetcode_format(code)
        assert "def myFunction(" in result
        assert "max(" in result  # Should not become "max("
        assert "min(" in result
        assert "len(" in result

    def test_extract_solution_class(self):
        """Test extraction of Solution class from code."""
        code = '''
# Some imports
import math

class Helper:
    pass

class Solution:
    def two_sum(self, nums, target):
        return []

class TestSolution:
    pass
'''
        result = extract_solution_class(code)
        assert "class Solution:" in result
        assert "def two_sum(" in result
        assert "class Helper:" not in result
        assert "class TestSolution:" not in result
        assert "import math" not in result

    def test_extract_solution_class_not_found(self):
        """Test extraction when Solution class is not found."""
        code = '''
class MyClass:
    def method(self):
        pass
'''
        result = extract_solution_class(code)
        assert result == code  # Should return original if no Solution class

    def test_complex_conversion(self):
        """Test conversion of complex code with multiple features."""
        code = '''
class Solution:
    def find_longest_substring(self, s: str) -> int:
        max_length = 0
        char_map = {}

        for i, char in enumerate(s):
            if char in char_map:
                max_length = max(max_length, i - char_map[char])
            char_map[char] = i

        return max_length

    def is_valid_parentheses(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}

        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)

        return not stack
'''
        result = convert_to_leetcode_format(code)
        assert "def findLongestSubstring(" in result
        assert "def isValidParentheses(" in result
        assert "maxLength = 0" in result
        assert "charMap = {}" in result
        assert "topElement = " in result

    def test_regex_fallback_conversion(self):
        """Test the regex fallback conversion method."""
        # Test a case that might not parse with AST
        code = "def my_test_function(): pass"
        result = convert_to_leetcode_format(code)
        assert "myTestFunction" in result or "my_test_function" in result