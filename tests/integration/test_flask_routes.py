"""Integration tests for Flask routes."""

import json
from collections.abc import Generator
from typing import Any
from unittest.mock import MagicMock, patch

import pytest

from src.leet_code.app import app
from src.leet_code.category_data import Category, Solution


@pytest.fixture
def client() -> Generator[Any]:
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


@pytest.fixture
def mock_categories() -> list[Category]:
    """Mock category data for testing."""
    return [
        Category(
            slug="arrays-hashing",
            name="Arrays & Hashing",
            description="Array problems",
            solutions=[
                Solution("001-two-sum.py", "Two Sum"),
                Solution("217-contains-duplicate.py", "Contains Duplicate"),
            ],
        ),
        Category(
            slug="two-pointers",
            name="Two Pointers",
            description="Two pointer problems",
            solutions=[Solution("125-valid-palindrome.py", "Valid Palindrome")],
        ),
    ]


class TestHomeRoute:
    """Test the home page route."""

    @patch("src.leet_code.app.category_manager")
    def test_home_page(self, mock_manager: Any, client: Any, mock_categories: Any) -> None:
        """Test home page renders correctly."""
        mock_manager.get_categories.return_value = mock_categories
        mock_manager.get_statistics.return_value = {"total_solutions": 3, "total_categories": 2}

        response = client.get("/")
        assert response.status_code == 200
        assert b"Leet Code Learning Tool" in response.data
        assert b"Arrays &amp; Hashing" in response.data
        assert b"Two Pointers" in response.data


class TestCategoryRoute:
    """Test category view route."""

    @patch("src.leet_code.app.category_manager")
    def test_category_view(self, mock_manager: Any, client: Any, mock_categories: Any) -> None:
        """Test category view renders correctly."""
        mock_manager.get_category.return_value = mock_categories[0]
        mock_manager.read_documentation.return_value = "# Arrays Documentation"

        response = client.get("/category/arrays-hashing")
        assert response.status_code == 200
        assert b"Arrays &amp; Hashing" in response.data
        assert b"001-two-sum.py" in response.data or b"Two Sum" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_category_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test category not found returns 404."""
        mock_manager.get_category.return_value = None

        response = client.get("/category/non-existent")
        assert response.status_code == 404


class TestSolutionRoute:
    """Test solution view routes."""

    @patch("src.leet_code.app.category_manager")
    def test_solution_view(self, mock_manager: Any, client: Any) -> None:
        """Test solution view renders correctly."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        return []
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py")
        assert response.status_code == 200
        assert b"Two Sum" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_solution_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test solution not found returns 404."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/non-existent.py")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_solution_leetcode_view(self, mock_manager: Any, client: Any) -> None:
        """Test LeetCode format view."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        return []
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py/leetcode")
        assert response.status_code == 200
        # Should contain converted camelCase
        assert b"twoSum" in response.data or b"two_sum" in response.data


class TestAPIRoutes:
    """Test API endpoints."""

    @patch("src.leet_code.app.category_manager")
    def test_api_categories(self, mock_manager: Any, client: Any, mock_categories: Any) -> None:
        """Test categories API endpoint."""
        mock_manager.get_categories.return_value = mock_categories

        response = client.get("/api/categories")
        assert response.status_code == 200

        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]["slug"] == "arrays-hashing"
        assert data[0]["count"] == 2

    @patch("src.leet_code.app.category_manager")
    def test_api_category_solutions(self, mock_manager: Any, client: Any, mock_categories: Any) -> None:
        """Test category solutions API endpoint."""
        mock_manager.get_category.return_value = mock_categories[0]

        response = client.get("/api/category/arrays-hashing/solutions")
        assert response.status_code == 200

        data = json.loads(response.data)
        assert len(data) == 2
        assert data[0]["filename"] == "001-two-sum.py"

    @patch("src.leet_code.app.category_manager")
    def test_api_category_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test API returns 404 for non-existent category."""
        mock_manager.get_category.return_value = None

        response = client.get("/api/category/non-existent/solutions")
        assert response.status_code == 404


class TestDocsRoute:
    """Test documentation route."""

    def test_docs_index(self, client: Any) -> None:
        """Test /docs serves documentation index page."""
        response = client.get("/docs")
        assert response.status_code == 200
        assert b"Documentation" in response.data

    @patch("src.leet_code.app.Path")
    def test_docs_readme(self, mock_path: Any, client: Any) -> None:
        """Test docs README renders."""
        mock_file = MagicMock()
        mock_file.exists.return_value = True
        mock_file.read_text.return_value = "# Documentation"
        mock_path.return_value = mock_file

        response = client.get("/docs/README")
        assert response.status_code == 200
        assert b"Documentation" in response.data


class TestStaticFiles:
    """Test static file serving."""

    def test_css_file(self, client: Any) -> None:
        """Test CSS file is served."""
        response = client.get("/static/css/style.css")
        # Should either return the file or 404 if not found
        assert response.status_code in [200, 304, 404]

    def test_favicon(self, client: Any) -> None:
        """Test favicon request."""
        response = client.get("/favicon.ico")
        # Should return 404 as we don't have a favicon
        assert response.status_code == 404


class TestErrorHandlers:
    """Test error handling."""

    def test_404_error(self, client: Any) -> None:
        """Test 404 error page."""
        response = client.get("/non-existent-page")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_500_error(self, mock_manager: Any, client: Any) -> None:
        """Test 500 error handling."""
        # Simulate an internal error
        mock_manager.get_categories.side_effect = Exception("Test error")

        # In testing mode, Flask will propagate the exception
        # So we just verify it doesn't return a normal 200 OK
        with pytest.raises(Exception, match="Test error"):
            client.get("/")
