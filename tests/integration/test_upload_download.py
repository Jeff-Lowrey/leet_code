"""Integration tests for file upload and download functionality."""

import zipfile
from collections.abc import Generator
from io import BytesIO
from typing import Any
from unittest.mock import MagicMock, mock_open, patch

import pytest

from src.leet_code.app import app
from src.leet_code.category_data import Solution


@pytest.fixture
def client() -> Generator[Any]:
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    app.config["SECRET_KEY"] = "test-secret-key"
    with app.test_client() as client:
        yield client


class TestUploadFunctionality:
    """Test file upload functionality."""

    @patch("src.leet_code.app.category_manager")
    def test_upload_page_renders(self, mock_manager: Any, client: Any) -> None:
        """Test upload page renders correctly."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum.py/upload")
        assert response.status_code == 200
        assert b"Upload Solution" in response.data
        assert b"001-two-sum.py" in response.data or b"Two Sum" in response.data

    @patch("builtins.open", new_callable=mock_open)
    @patch("src.leet_code.app.Path")
    @patch("src.leet_code.app.category_manager")
    def test_successful_upload(self, mock_manager: Any, mock_path_class: Any, mock_file: Any, client: Any) -> None:
        """Test successful file upload."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        # Mock the path operations
        mock_path_instance = MagicMock()
        mock_path_instance.mkdir.return_value = None
        mock_path_class.return_value = mock_path_instance
        mock_path_instance.__truediv__.return_value = mock_path_instance

        # Create a test file upload
        data = {"language": "Java", "file": (BytesIO(b"public class Solution { }"), "001-two-sum.java")}

        response = client.post(
            "/solution/arrays-hashing/001-two-sum.py/upload",
            data=data,
            content_type="multipart/form-data",
            follow_redirects=False,
        )

        assert response.status_code == 302  # Redirect after successful upload

    @patch("src.leet_code.app.category_manager")
    def test_upload_without_file(self, mock_manager: Any, client: Any) -> None:
        """Test upload without selecting a file."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        data = {"language": "Java"}

        with client.session_transaction() as sess:
            sess["_flashes"] = []

        response = client.post("/solution/arrays-hashing/001-two-sum.py/upload", data=data, follow_redirects=False)

        # Should redirect with error
        assert response.status_code == 302

    @patch("src.leet_code.app.category_manager")
    def test_upload_invalid_extension(self, mock_manager: Any, client: Any) -> None:
        """Test upload with invalid file extension."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        data = {"language": "Java", "file": (BytesIO(b"content"), "test.txt")}  # Wrong extension

        response = client.post(
            "/solution/arrays-hashing/001-two-sum.py/upload",
            data=data,
            content_type="multipart/form-data",
            follow_redirects=False,
        )

        # Should redirect with error
        assert response.status_code == 302

    @patch("src.leet_code.app.category_manager")
    def test_upload_solution_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test upload when solution doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/non-existent.py/upload")
        assert response.status_code == 404


class TestDownloadFunctionality:
    """Test file download functionality."""

    @patch("src.leet_code.app.Path")
    @patch("src.leet_code.app.category_manager")
    def test_download_skeleton(self, mock_manager: Any, mock_path_class: Any, client: Any) -> None:
        """Test downloading skeleton file."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        '''Implementation here'''
        return []
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/skeleton")
        assert response.status_code == 200
        assert response.content_type.startswith("text/")
        assert b"def two_sum" in response.data or b"def twoSum" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_download_solution(self, mock_manager: Any, client: Any) -> None:
        """Test downloading full solution."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        return [0, 1]
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/solution")
        assert response.status_code == 200
        assert b"two_sum" in response.data or b"twoSum" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_download_leetcode_format(self, mock_manager: Any, client: Any) -> None:
        """Test downloading LeetCode formatted solution."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        return [0, 1]
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/leetcode")
        assert response.status_code == 200
        # Should contain camelCase
        assert b"twoSum" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_download_both_as_zip(self, mock_manager: Any, client: Any) -> None:
        """Test downloading both skeleton and solution as ZIP."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = """
class Solution:
    def two_sum(self, nums, target):
        return [0, 1]
"""

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/both")
        assert response.status_code == 200
        assert response.content_type == "application/zip"

        # Verify ZIP contents
        zip_data = BytesIO(response.data)
        with zipfile.ZipFile(zip_data, "r") as zip_file:
            files = zip_file.namelist()
            assert any("skeleton" in f for f in files)
            assert any("solution" in f for f in files)

    @patch("builtins.open", mock_open(read_data="public class Solution { }"))
    @patch("src.leet_code.app.Path")
    @patch("src.leet_code.app.category_manager")
    def test_download_alternative_language(self, mock_manager: Any, mock_path_class: Any, client: Any) -> None:
        """Test downloading solution in alternative language."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        # Mock Java file path operations
        mock_path_instance = MagicMock()
        mock_path_instance.exists.return_value = True
        mock_path_instance.__truediv__.return_value = mock_path_instance
        mock_path_class.return_value.parent.parent.parent = MagicMock()
        mock_path_class.return_value.parent.parent.parent.__truediv__.return_value = mock_path_instance

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/solution/Java")
        assert response.status_code == 200
        assert b"public class Solution" in response.data

    @patch("src.leet_code.app.category_manager")
    def test_download_invalid_format(self, mock_manager: Any, client: Any) -> None:
        """Test downloading with invalid format."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum.py/download/invalid")
        assert response.status_code == 400

    @patch("src.leet_code.app.category_manager")
    def test_download_solution_not_found(self, mock_manager: Any, client: Any) -> None:
        """Test downloading non-existent solution."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/non-existent.py/download/solution")
        assert response.status_code == 404


class TestLanguageViewing:
    """Test multi-language viewing functionality."""

    @patch("src.leet_code.language_constants.get_lexer_for_language")
    @patch("src.leet_code.language_constants.get_file_extension")
    @patch("src.leet_code.app.get_solution_path")
    @patch("src.leet_code.app.category_manager")
    def test_view_alternative_language(
        self,
        mock_manager: Any,
        mock_get_path: Any,
        mock_get_ext: Any,
        mock_get_lexer: Any,
        client: Any,
    ) -> None:
        """Test viewing solution in alternative language."""
        from unittest.mock import mock_open as mock_file_open

        from pygments.lexers import JavaLexer

        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_solution.available_languages = ["Python", "Java"]
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

        # Mock solution path
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path.suffix = ".java"
        mock_get_path.return_value = mock_path

        # Mock helper functions
        mock_get_ext.return_value = ".java"
        mock_get_lexer.return_value = JavaLexer()

        # Mock file reading
        java_code = "/** Java solution */\npublic class Solution { }"
        with patch("builtins.open", mock_file_open(read_data=java_code)):
            response = client.get("/solution/arrays-hashing/001-two-sum.py?lang=Java")
            assert response.status_code == 200
            # The response should contain the Java code (check for class and Solution separately due to HTML formatting)
            assert b"class" in response.data and b"Solution" in response.data

    @patch("src.leet_code.app.get_file_extension")
    @patch("src.leet_code.app.Path")
    @patch("src.leet_code.app.category_manager")
    def test_view_non_existent_language(
        self, mock_manager: Any, mock_path_class: Any, mock_get_ext: Any, client: Any
    ) -> None:
        """Test viewing solution in language that doesn't exist."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution

        # Mock helper function
        mock_get_ext.return_value = ".rs"

        # Mock Path(__file__).parent.parent.parent path construction
        mock_alt_path = MagicMock()
        mock_alt_path.exists.return_value = False

        # Mock the complete path chain
        mock_path_class.return_value.parent.parent.parent.__truediv__.return_value.__truediv__.return_value.__truediv__.return_value.__truediv__.return_value = mock_alt_path

        response = client.get("/solution/arrays-hashing/001-two-sum.py/view/Rust")
        assert response.status_code == 404

    @patch("src.leet_code.app.Path")
    @patch("src.leet_code.app.category_manager")
    def test_list_available_languages(self, mock_manager: Any, mock_path_class: Any, client: Any) -> None:
        """Test that available languages are listed correctly."""
        mock_solution = Solution("001-two-sum.py", "Two Sum")
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.read_solution_content.return_value = "def two_sum(): pass"

        # Mock alternatives directory
        mock_alt_dir = MagicMock()
        mock_java = MagicMock()
        mock_java.name = "001-two-sum.java"
        mock_cpp = MagicMock()
        mock_cpp.name = "001-two-sum.cpp"
        mock_alt_dir.exists.return_value = True
        mock_alt_dir.iterdir.return_value = [mock_java, mock_cpp]

        mock_path_class.return_value = mock_alt_dir

        response = client.get("/solution/arrays-hashing/001-two-sum.py")
        assert response.status_code == 200
        # Should show language options
        assert b"Python" in response.data or b"python" in response.data
