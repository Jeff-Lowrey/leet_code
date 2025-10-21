"""Integration tests for error conditions and edge cases."""

from collections.abc import Generator
from typing import Any
from unittest.mock import MagicMock, mock_open, patch

import pytest

from src.leet_code.app import app
from src.leet_code.category_data import Category, Solution


@pytest.fixture
def client() -> Generator[Any]:
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestErrorConditions:
    """Test error conditions and edge cases."""

    @patch("src.leet_code.app.category_manager")
    def test_category_view_no_documentation(self, mock_manager: Any, client: Any) -> None:
        """Test category view when documentation is None."""
        mock_category = Category(
            slug="test-category",
            name="Test Category",
            description="Test description",
            solutions=[Solution("test.py", "Test Solution")],
        )
        mock_manager.get_category.return_value = mock_category
        mock_manager.read_documentation.return_value = None  # No documentation

        response = client.get("/category/test-category")
        assert response.status_code == 200
        # Should render without documentation section
        assert b"Test Category" in response.data

    @patch("src.leet_code.app.get_solution_path")
    @patch("src.leet_code.app.category_manager")
    def test_solution_view_no_content(self, mock_manager: Any, mock_path_func: Any, client: Any) -> None:
        """Test solution view when solution file doesn't exist."""
        mock_solution = Solution("test.py", "Test Solution")
        mock_solution.available_languages = ["Python"]  # Has Python available
        mock_manager.get_solution.return_value = mock_solution

        # Mock path that doesn't exist
        mock_path = MagicMock()
        mock_path.exists.return_value = False
        mock_path_func.return_value = mock_path

        response = client.get("/solution/test-category/test.py")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_solution_view_no_available_languages(self, mock_manager: Any, client: Any) -> None:
        """Test solution view when no language implementations exist."""
        mock_solution = Solution("test.py", "Test Solution")
        mock_solution.available_languages = []  # No languages available
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.get_category.return_value = MagicMock(name="Test Category")

        response = client.get("/solution/test-category/test.py")
        # Should show no_solution.html template
        assert response.status_code == 200
        assert b"Test Solution" in response.data or b"test" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_solution_view_no_metadata(self, mock_manager: Any, client: Any) -> None:
        """Test solution view when solution metadata is not found."""
        mock_manager.get_solution.return_value = None  # No solution metadata

        response = client.get("/solution/test-category/test.py")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_leetcode_view_no_content(self, mock_manager: Any, client: Any) -> None:
        """Test LeetCode view when solution content is None."""
        mock_solution = Solution("test.py", "Test Solution")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = None  # No content

        response = client.get("/solution/test-category/test.py/leetcode")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_download_no_solution(self, mock_manager: Any, client: Any) -> None:
        """Test download when solution doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/test-category/test.py/download/solution")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_download_no_content(self, mock_manager: Any, client: Any) -> None:
        """Test download when solution content is None."""
        mock_solution = Solution("test.py", "Test Solution")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = None  # No content

        response = client.get("/solution/test-category/test.py/download/solution")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_upload_no_solution_metadata(self, mock_manager: Any, client: Any) -> None:
        """Test upload when solution metadata doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/test-category/test.py/upload")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_view_alternative_no_solution_metadata(self, mock_manager: Any, client: Any) -> None:
        """Test viewing alternative language when solution metadata doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/test-category/test.py/view/Java")
        assert response.status_code == 404

    @patch("src.leet_code.app.Path")
    def test_docs_readme_not_found(self, mock_path: Any, client: Any) -> None:
        """Test docs README when file doesn't exist."""
        mock_file = MagicMock()
        mock_file.exists.return_value = False

        # Mock the Path constructor to return our mock file
        mock_path.return_value.parent.parent.parent.__truediv__.return_value.__truediv__.return_value = mock_file

        response = client.get("/docs/README")
        assert response.status_code == 404

    @patch("src.leet_code.app.category_manager")
    def test_docs_category_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test docs category when documentation doesn't exist."""
        mock_manager.read_documentation.return_value = None

        response = client.get("/docs/non-existent-category")
        assert response.status_code == 404


class TestFileExtensionEdgeCases:
    """Test edge cases for file extension handling."""

    @patch("src.leet_code.app.get_solution_path")
    @patch("src.leet_code.app.category_manager")
    def test_solution_view_without_py_extension(self, mock_manager: Any, mock_get_path: Any, client: Any) -> None:
        """Test solution view with filename that doesn't have .py extension."""
        from unittest.mock import mock_open as mock_file_open

        mock_solution = Solution("test.py", "Test Solution")
        mock_solution.available_languages = ["Python"]
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.get_category.return_value = MagicMock(name="Test Category")

        # Mock solution path that exists
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path.suffix = ".py"
        mock_get_path.return_value = mock_path

        # Access without .py extension - should work due to route handling
        with patch("builtins.open", mock_file_open(read_data="def test(): pass")):
            response = client.get("/solution/test-category/test")
            assert response.status_code == 200

    @patch("src.leet_code.app.category_manager")
    def test_upload_without_py_extension(self, mock_manager: Any, client: Any) -> None:
        """Test upload page with filename that doesn't have .py extension."""
        mock_solution = Solution("test.py", "Test Solution")
        mock_manager.get_solution.return_value = mock_solution

        # Access without .py extension
        response = client.get("/solution/test-category/test/upload")
        assert response.status_code == 200
