"""Simple tests to improve coverage without complex mocking."""

from src.leet_code.category_data import CategoryManager, Solution
from src.leet_code.leetcode_converter import (
    convert_params_in_signature,
    convert_snake_case_params,
    extract_solution_class,
    regex_based_conversion,
)


class TestSimpleCoverage:
    """Simple tests to hit uncovered code paths."""

    def test_solution_post_init_without_number(self) -> None:
        """Test Solution with filename without number."""
        solution = Solution("problem-name.py", "Problem Name")
        assert solution.number == ""
        assert solution.slug == "problem-name"

    def test_solution_post_init_with_number(self) -> None:
        """Test Solution with numbered filename."""
        solution = Solution("042-problem-name.py", "Problem Name")
        assert solution.number == "042"
        assert solution.slug == "problem-name"

    def test_extract_solution_class_no_class(self) -> None:
        """Test extract_solution_class when no Solution class exists."""
        code = """
def standalone_function():
    pass

class NotSolution:
    pass
"""
        result = extract_solution_class(code)
        assert result == code  # Should return original code

    def test_convert_params_in_signature_simple(self) -> None:
        """Test parameter conversion in function signature."""
        signature = "(self, first_param, second_param)"
        result = convert_params_in_signature(signature)
        assert "firstParam" in result
        assert "secondParam" in result

    def test_convert_snake_case_params_preserves_builtins(self) -> None:
        """Test that builtin functions are preserved."""
        line = "result = max(len(nums))"
        result = convert_snake_case_params(line)
        assert "max" in result
        assert "len" in result

    def test_convert_snake_case_params_converts_variables(self) -> None:
        """Test variable name conversion."""
        line = "complement_value = target_sum - current_num"
        result = convert_snake_case_params(line)
        assert "complementValue" in result
        assert "targetSum" in result
        assert "currentNum" in result

    def test_regex_based_conversion_simple(self) -> None:
        """Test regex-based conversion."""
        code = """
class Solution:
    def two_sum(self, nums, target):
        return []
"""
        result = regex_based_conversion(code)
        assert "twoSum" in result
        assert "# LeetCode Submission Format" in result

    def test_category_manager_nonexistent_files(self) -> None:
        """Test CategoryManager with nonexistent paths."""
        manager = CategoryManager()

        # These should return None for nonexistent files
        assert manager.read_solution_content("nonexistent", "file.py") is None
        assert manager.read_documentation("nonexistent") is None

    def test_category_manager_get_nonexistent_solution(self) -> None:
        """Test getting nonexistent solution."""
        manager = CategoryManager()

        # Should return None for nonexistent solutions
        assert manager.get_solution("nonexistent", "file.py") is None
        assert manager.get_category("nonexistent") is None

    def test_category_manager_statistics_empty(self) -> None:
        """Test statistics with no categories loaded."""
        manager = CategoryManager()
        manager._categories = []

        stats = manager.get_statistics()
        assert stats["total_categories"] == 0
        assert stats["total_solutions"] == 0
        assert stats["average_per_category"] == 0
