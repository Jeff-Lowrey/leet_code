"""Unit tests for main_views.py - all main page class-based views."""

from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from flask import Flask

from src.leet_code.category_data import Category, Solution
from src.leet_code.views.main_views import (
    COMPLEXITY_PATTERN_MAP,
    VALID_DIFFICULTY_LEVELS,
)


@pytest.fixture
def app() -> Flask:
    """Create test Flask app."""
    from src.leet_code.factory import create_app

    flask_app = create_app()
    flask_app.config["TESTING"] = True
    return flask_app


@pytest.fixture
def client(app: Flask) -> Any:
    """Create test client."""
    return app.test_client()


@pytest.fixture
def mock_categories() -> list[Category]:
    """Create mock categories for testing."""
    return [
        Category(
            slug="arrays-hashing",
            name="Arrays & Hashing",
            description="Array problems",
            solutions=[
                Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)"),
                Solution("217-contains-duplicate.py", "Contains Duplicate", "217", "Easy", "O(n)", "O(n)"),
            ],
        ),
        Category(
            slug="two-pointers",
            name="Two Pointers",
            description="Two pointer technique",
            solutions=[
                Solution("125-valid-palindrome.py", "Valid Palindrome", "125", "Easy", "O(n)", "O(1)"),
            ],
        ),
    ]


@pytest.fixture
def mock_solution() -> Solution:
    """Create a single mock solution."""
    return Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)")


class TestIndexView:
    """Test IndexView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any, mock_categories: list[Category]) -> None:
        """Test successful GET request to home page."""
        mock_manager.get_categories.return_value = mock_categories
        mock_manager.get_statistics.return_value = {"total_solutions": 3, "total_categories": 2}

        response = client.get("/")
        assert response.status_code == 200
        assert b"Leet Code Learning Tool" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_empty_categories(self, mock_manager: MagicMock, client: Any) -> None:
        """Test home page with no categories."""
        mock_manager.get_categories.return_value = []
        mock_manager.get_statistics.return_value = {"total_solutions": 0, "total_categories": 0}

        response = client.get("/")
        assert response.status_code == 200


class TestCategoryView:
    """Test CategoryView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any, mock_categories: list[Category]) -> None:
        """Test successful GET request for category view."""
        mock_manager.get_category.return_value = mock_categories[0]
        mock_manager.read_documentation.return_value = "# Arrays & Hashing\n\nArray documentation."

        response = client.get("/category/arrays-hashing")
        assert response.status_code == 200
        assert b"Arrays &amp; Hashing" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_category_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for non-existent category."""
        mock_manager.get_category.return_value = None

        response = client.get("/category/nonexistent")
        assert response.status_code == 404

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_no_documentation(self, mock_manager: MagicMock, client: Any, mock_categories: list[Category]) -> None:
        """Test category view with no documentation."""
        mock_manager.get_category.return_value = mock_categories[0]
        mock_manager.read_documentation.return_value = None

        response = client.get("/category/arrays-hashing")
        assert response.status_code == 200


class TestDifficultyOverviewView:
    """Test DifficultyOverviewView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_success(
        self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any, mock_categories: list[Category]
    ) -> None:
        """Test successful GET request for difficulty overview."""
        all_solutions = []
        for cat in mock_categories:
            all_solutions.extend(cat.solutions)

        mock_manager.get_all_solutions.return_value = all_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/difficulty")
        assert response.status_code == 200

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_empty_solutions(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test difficulty overview with no solutions."""
        mock_manager.get_all_solutions.return_value = []
        mock_enrich.return_value = []

        response = client.get("/difficulty")
        assert response.status_code == 200


class TestComplexityOverviewView:
    """Test ComplexityOverviewView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_success(
        self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any, mock_categories: list[Category]
    ) -> None:
        """Test successful GET request for complexity overview."""
        all_solutions = []
        for cat in mock_categories:
            all_solutions.extend(cat.solutions)

        mock_manager.get_all_solutions.return_value = all_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity")
        assert response.status_code == 200

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_groups_by_complexity(
        self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any, mock_categories: list[Category]
    ) -> None:
        """Test complexity grouping logic."""
        all_solutions = []
        for cat in mock_categories:
            all_solutions.extend(cat.solutions)

        mock_manager.get_all_solutions.return_value = all_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity")
        assert response.status_code == 200

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_groups_with_unknown_complexity(
        self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test complexity grouping with Unknown complexity."""
        solutions_with_unknown = [
            Solution("001.py", "Test", "1", "Easy", "", ""),  # Unknown complexity (empty strings)
        ]

        mock_manager.get_all_solutions.return_value = solutions_with_unknown
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity")
        assert response.status_code == 200
        # Should group under "Unknown_Unknown"
        assert b"Unknown" in response.data or b"unknown" in response.data.lower()


class TestDifficultyLevelView:
    """Test DifficultyLevelView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_easy(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for easy difficulty level."""
        easy_solutions = [
            Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)"),
            Solution("125-valid-palindrome.py", "Valid Palindrome", "125", "Easy", "O(n)", "O(1)"),
        ]

        mock_manager.filter_solutions.return_value = easy_solutions
        mock_manager.sort_by_number.return_value = easy_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/difficulty/easy")
        assert response.status_code == 200
        assert b"Easy Problems" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_medium(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for medium difficulty level."""
        medium_solutions = [Solution("002-add-two-numbers.py", "Add Two Numbers", "2", "Medium", "O(n)", "O(1)")]

        mock_manager.filter_solutions.return_value = medium_solutions
        mock_manager.sort_by_number.return_value = medium_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/difficulty/medium")
        assert response.status_code == 200
        assert b"Medium Problems" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_hard(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for hard difficulty level."""
        hard_solutions = [Solution("004-median-sorted-arrays.py", "Median", "4", "Hard", "O(log n)", "O(1)")]

        mock_manager.filter_solutions.return_value = hard_solutions
        mock_manager.sort_by_number.return_value = hard_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/difficulty/hard")
        assert response.status_code == 200
        assert b"Hard Problems" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_invalid_level(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request with invalid difficulty level."""
        response = client.get("/difficulty/invalid")
        assert response.status_code == 404

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_case_insensitive(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test difficulty level is case-insensitive."""
        easy_solutions = [Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)")]

        mock_manager.filter_solutions.return_value = easy_solutions
        mock_manager.sort_by_number.return_value = easy_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/difficulty/EASY")
        assert response.status_code == 200


class TestComplexityPatternView:
    """Test ComplexityPatternView class-based view."""

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_o1_pattern(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for O(1) complexity pattern."""
        o1_solutions = [Solution("125-valid-palindrome.py", "Valid Palindrome", "125", "Easy", "O(1)", "O(1)")]

        mock_manager.get_all_solutions.return_value = o1_solutions
        mock_manager.sort_by_number.return_value = o1_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity/o1")
        assert response.status_code == 200
        assert b"Time Complexity: O(1)" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_on_pattern(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for O(n) complexity pattern."""
        on_solutions = [Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)")]

        mock_manager.get_all_solutions.return_value = on_solutions
        mock_manager.sort_by_number.return_value = on_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity/on")
        assert response.status_code == 200
        assert b"Time Complexity: O(n)" in response.data

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_on2_pattern(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for O(n²) complexity pattern."""
        on2_solutions = [Solution("003-longest-substring.py", "Longest", "3", "Medium", "O(n²)", "O(n)")]

        mock_manager.get_all_solutions.return_value = on2_solutions
        mock_manager.sort_by_number.return_value = on2_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity/on2")
        assert response.status_code == 200

    @patch("src.leet_code.views.main_views.category_manager")
    def test_get_invalid_pattern(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request with invalid complexity pattern."""
        mock_manager.get_all_solutions.return_value = []

        response = client.get("/complexity/invalid")
        assert response.status_code == 404

    @patch("src.leet_code.views.main_views.category_manager")
    @patch("src.leet_code.solution_utils.enrich_solutions_with_category")
    def test_get_direct_o_notation(self, mock_enrich: MagicMock, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request with direct O() notation."""
        on_solutions = [Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)")]

        mock_manager.get_all_solutions.return_value = on_solutions
        mock_manager.sort_by_number.return_value = on_solutions
        mock_enrich.side_effect = lambda sols: [{"solution": sol, "category_slug": "test"} for sol in sols]

        response = client.get("/complexity/O(n)")
        assert response.status_code == 200


class TestComplexityPatternMap:
    """Test COMPLEXITY_PATTERN_MAP constant."""

    def test_pattern_map_completeness(self) -> None:
        """Test that all expected patterns are in the map."""
        expected_patterns = ["o1", "ologn", "on", "on-log-n", "onlogn", "on2", "on3", "o2n", "onm", "on-m"]
        for pattern in expected_patterns:
            assert pattern in COMPLEXITY_PATTERN_MAP

    def test_pattern_map_values(self) -> None:
        """Test that pattern map values are correctly formatted."""
        assert COMPLEXITY_PATTERN_MAP["o1"] == "O(1)"
        assert COMPLEXITY_PATTERN_MAP["on"] == "O(n)"
        assert COMPLEXITY_PATTERN_MAP["on2"] == "O(n²)"


class TestValidDifficultyLevels:
    """Test VALID_DIFFICULTY_LEVELS constant."""

    def test_difficulty_levels_completeness(self) -> None:
        """Test that all expected difficulty levels are present."""
        assert "Easy" in VALID_DIFFICULTY_LEVELS
        assert "Medium" in VALID_DIFFICULTY_LEVELS
        assert "Hard" in VALID_DIFFICULTY_LEVELS
        assert len(VALID_DIFFICULTY_LEVELS) == 3
