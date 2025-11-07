"""Unit tests for search execution logic."""

from unittest.mock import patch

from src.leet_code.data.category_data import Solution
from src.leet_code.search.search_engine import execute_search


class TestExecuteSearch:
    """Test the execute_search function."""

    def test_empty_query_returns_error(self) -> None:
        """Test empty query returns error."""
        result = execute_search("")
        assert "error" in result
        assert result["error"] == "No search query provided"
        assert result["mode"] is None

    def test_navigate_mode_found(self) -> None:
        """Test navigate mode with existing problem."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_solution = Solution(
                number="1",
                name="Two Sum",
                filename="001-two-sum.py",
                difficulty="Easy",
                time_complexity="O(n)",
                space_complexity="O(n)",
            )
            mock_cm.find_by_number.return_value = mock_solution

            with patch("src.leet_code.search.solution_finder.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                result = execute_search("1")

                assert result["mode"] == "navigate"
                assert result["solution"] == mock_solution
                assert result["category_slug"] == "arrays-hashing"
                assert result["category_name"] == "Arrays & Hashing"

    def test_navigate_mode_not_found(self) -> None:
        """Test navigate mode with non-existent problem."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_cm.find_by_number.return_value = None

            result = execute_search("99999")

            assert "error" in result
            assert "99999" in result["error"]
            assert result["mode"] == "navigate"

    def test_similar_mode_found(self) -> None:
        """Test similarity search with valid reference."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_reference = Solution(
                number="1",
                name="Two Sum",
                filename="001-two-sum.py",
                difficulty="Easy",
                time_complexity="O(n)",
                space_complexity="O(n)",
            )
            mock_similar = Solution(
                number="15",
                name="3Sum",
                filename="015-3sum.py",
                difficulty="Medium",
                time_complexity="O(n²)",
                space_complexity="O(n)",
            )

            mock_cm.find_by_number.return_value = mock_reference
            mock_cm.find_similar_problems.return_value = [(mock_similar, 0.75)]

            with patch("src.leet_code.search.solution_finder.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                result = execute_search("1 difficulty=medium")

                assert result["mode"] == "similar"
                assert result["reference"] == mock_reference
                assert "results" in result
                assert "filters" in result
                assert result["filters"]["difficulty"] == "medium"

    def test_similar_mode_reference_not_found(self) -> None:
        """Test similarity search with invalid reference."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_cm.find_by_number.return_value = None

            result = execute_search("99999 difficulty=easy")

            assert "error" in result
            assert "99999" in result["error"]
            assert result["mode"] == "similar"

    def test_name_search_mode(self) -> None:
        """Test name search mode."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_solutions = [
                Solution(
                    number="1",
                    name="Two Sum",
                    filename="001-two-sum.py",
                    difficulty="Easy",
                    time_complexity="O(n)",
                    space_complexity="O(n)",
                ),
                Solution(
                    number="15",
                    name="3Sum",
                    filename="015-3sum.py",
                    difficulty="Medium",
                    time_complexity="O(n²)",
                    space_complexity="O(n)",
                ),
            ]
            mock_cm.find_by_name.return_value = mock_solutions

            with patch("src.leet_code.search.solution_finder.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                result = execute_search("sum")

                assert result["mode"] == "name_search"
                assert result["search_term"] == "sum"
                assert "results" in result
                assert "filters" in result

    def test_name_search_with_filters(self) -> None:
        """Test name search with difficulty filter."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_solutions = [
                Solution(
                    number="1",
                    name="Two Sum",
                    filename="001-two-sum.py",
                    difficulty="Easy",
                    time_complexity="O(n)",
                    space_complexity="O(n)",
                )
            ]
            mock_cm.find_by_name.return_value = mock_solutions

            with patch("src.leet_code.search.solution_finder.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                result = execute_search("sum difficulty=easy")

                assert result["mode"] == "name_search"
                assert result["search_term"] == "sum"
                assert result["filters"]["difficulty"] == "easy"

    def test_filter_mode(self) -> None:
        """Test pure filter mode."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_solutions = [
                Solution(
                    number="1",
                    name="Two Sum",
                    filename="001-two-sum.py",
                    difficulty="Easy",
                    time_complexity="O(n)",
                    space_complexity="O(n)",
                )
            ]
            mock_cm.get_all_solutions.return_value = mock_solutions

            with patch("src.leet_code.search.solution_finder.find_solution_category") as mock_find:
                mock_find.return_value = ("arrays-hashing", "Arrays & Hashing")

                result = execute_search("difficulty=easy")

                assert result["mode"] == "filter"
                assert "results" in result
                assert result["filters"]["difficulty"] == "easy"

    def test_filter_mode_multiple_filters(self) -> None:
        """Test filter mode with multiple filters."""
        with patch("src.leet_code.search.search_engine.category_manager") as mock_cm:
            mock_solutions: list[Solution] = []
            mock_cm.get_all_solutions.return_value = mock_solutions

            result = execute_search("difficulty=hard complexity=O(n)")

            assert result["mode"] == "filter"
            assert result["filters"]["difficulty"] == "hard"
            assert result["filters"]["complexity"] == "O(n)"
