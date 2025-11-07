"""Unit tests for api_views.py - API endpoint class-based views."""

from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from flask import Flask

from src.leet_code.category_data import Category, Solution


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
            ],
        ),
    ]


@pytest.fixture
def mock_solution() -> Solution:
    """Create a single mock solution."""
    return Solution("001-two-sum.py", "Two Sum", "1", "Easy", "O(n)", "O(n)")


class TestAPICategoriesView:
    """Test APICategoriesView API endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any, mock_categories: list[Category]) -> None:
        """Test successful GET request for categories API."""
        mock_manager.get_categories.return_value = mock_categories

        response = client.get("/api/categories")
        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) == 1
        assert data[0]["slug"] == "arrays-hashing"

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_empty_categories(self, mock_manager: MagicMock, client: Any) -> None:
        """Test categories API with no categories."""
        mock_manager.get_categories.return_value = []

        response = client.get("/api/categories")
        assert response.status_code == 200
        data = response.get_json()
        assert data == []


class TestAPICategorySolutionsView:
    """Test APICategorySolutionsView API endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any, mock_categories: list[Category]) -> None:
        """Test successful GET request for category solutions API."""
        mock_manager.get_category.return_value = mock_categories[0]

        response = client.get("/api/category/arrays-hashing/solutions")
        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()
        assert isinstance(data, list)
        assert len(data) == 1

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_category_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test category solutions API when category doesn't exist."""
        mock_manager.get_category.return_value = None

        response = client.get("/api/category/nonexistent/solutions")
        assert response.status_code == 404


class TestAPISearchView:
    """Test APISearchView API endpoint."""

    @patch("src.leet_code.app.execute_search")
    def test_get_error(self, mock_execute: MagicMock, client: Any) -> None:
        """Test search API with error result."""
        mock_execute.return_value = {"error": "Invalid query", "mode": None}

        response = client.get("/api/search?q=invalid")
        assert response.status_code == 400
        data = response.get_json()
        assert "error" in data

    @patch("src.leet_code.app.execute_search")
    def test_get_navigate_mode(self, mock_execute: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test search API with navigate mode."""
        mock_execute.return_value = {
            "mode": "navigate",
            "solution": mock_solution,
            "category_slug": "arrays-hashing",
        }

        response = client.get("/api/search?q=#1")
        assert response.status_code == 200
        data = response.get_json()
        assert data["mode"] == "navigate"
        assert "solution" in data

    @patch("src.leet_code.app.execute_search")
    @patch("src.leet_code.app.serialize_results")
    def test_get_similar_mode(
        self, mock_serialize: MagicMock, mock_execute: MagicMock, client: Any, mock_solution: Solution
    ) -> None:
        """Test search API with similar mode."""
        mock_execute.return_value = {
            "mode": "similar",
            "reference": mock_solution,
            "results": {"exact": [], "high": [], "medium": [], "low": []},
            "filters": {},
        }
        mock_serialize.return_value = []

        response = client.get("/api/search?q=similar:#1")
        assert response.status_code == 200
        data = response.get_json()
        assert data["mode"] == "similar"


class TestAPIDifficultyStatsView:
    """Test APIDifficultyStatsView API endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any) -> None:
        """Test successful GET request for difficulty stats API."""
        mock_solutions = [
            Solution("001.py", "Test", "1", "Easy", "O(n)", "O(1)"),
            Solution("002.py", "Test2", "2", "Medium", "O(n)", "O(1)"),
        ]
        mock_manager.get_all_solutions.return_value = mock_solutions

        response = client.get("/api/stats/difficulty")
        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)


class TestAPIComplexityStatsView:
    """Test APIComplexityStatsView API endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_success(self, mock_manager: MagicMock, client: Any) -> None:
        """Test successful GET request for complexity stats API."""
        mock_solutions = [
            Solution("001.py", "Test", "1", "Easy", "O(n)", "O(1)"),
        ]
        mock_manager.get_all_solutions.return_value = mock_solutions

        response = client.get("/api/stats/complexity")
        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)

    @patch("src.leet_code.app.execute_search")
    @patch("src.leet_code.app.serialize_results")
    def test_get_name_search_mode(self, mock_serialize: MagicMock, mock_execute: MagicMock, client: Any) -> None:
        """Test search API with name search mode."""
        mock_execute.return_value = {
            "mode": "name_search",
            "search_term": "two sum",
            "results": {"exact": [], "high": [], "medium": [], "low": []},
            "filters": {},
        }
        mock_serialize.return_value = []

        response = client.get("/api/search?q=two sum")
        assert response.status_code == 200
        data = response.get_json()
        assert data["mode"] == "name_search"

    @patch("src.leet_code.app.execute_search")
    @patch("src.leet_code.app.serialize_results")
    def test_get_filter_mode(self, mock_serialize: MagicMock, mock_execute: MagicMock, client: Any) -> None:
        """Test search API with filter mode."""
        mock_execute.return_value = {
            "mode": "filter",
            "results": {"exact": [], "high": [], "medium": [], "low": []},
            "filters": {"difficulty": "Easy"},
        }
        mock_serialize.return_value = []

        response = client.get("/api/search?q=difficulty:easy")
        assert response.status_code == 200
        data = response.get_json()
        assert data["mode"] == "filter"

    @patch("src.leet_code.app.execute_search")
    def test_get_navigate_error(self, mock_execute: MagicMock, client: Any) -> None:
        """Test search API with navigate mode error."""
        mock_execute.return_value = {"error": "Solution not found", "mode": "navigate"}

        response = client.get("/api/search?q=#999")
        assert response.status_code == 404
        data = response.get_json()
        assert "error" in data

    @patch("src.leet_code.app.execute_search")
    def test_get_unknown_mode(self, mock_execute: MagicMock, client: Any) -> None:
        """Test search API with unknown mode (fallback error)."""
        mock_execute.return_value = {"mode": "unknown", "results": []}

        response = client.get("/api/search?q=something")
        assert response.status_code == 400
        data = response.get_json()
        assert "error" in data
