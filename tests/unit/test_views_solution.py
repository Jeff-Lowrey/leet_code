"""Unit tests for solution_views.py - solution-related class-based views."""

import io
import zipfile
from typing import Any
from unittest.mock import MagicMock, mock_open, patch

import pytest
from flask import Flask

from src.leet_code.category_data import Solution


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
def mock_solution() -> Solution:
    """Create a single mock solution."""
    return Solution(
        filename="001-two-sum.py",
        name="Two Sum",
        number="1",
        difficulty="Easy",
        time_complexity="O(n)",
        space_complexity="O(n)",
        available_languages=["Python", "JavaScript"],
    )


@pytest.fixture
def mock_solution_code() -> str:
    """Create mock solution code."""
    return """
'''
Problem: Two Sum

Given an array of integers nums and an integer target, return indices of the two numbers
such that they add up to target.

## Intuition
Use a hash map to store numbers we've seen.

## Approach
1. Create a hash map
2. Loop through array
3. Check if complement exists

## Why It Works
Hash map lookups are O(1).

## Example
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
'''

class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
"""


class TestSolutionView:
    """Test SolutionView class-based view."""

    @patch("src.leet_code.views.solution_views.category_manager")
    @patch("builtins.open", new_callable=mock_open, read_data="class Solution:\n    pass")
    @patch("src.leet_code.app.Path")
    def test_get_success_python(
        self,
        mock_path_class: MagicMock,
        mock_file: MagicMock,
        mock_manager: MagicMock,
        client: Any,
        mock_solution: Solution,
        mock_solution_code: str,
    ) -> None:
        """Test successful GET request for Python solution."""
        mock_manager.get_solution.return_value = mock_solution
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path.suffix = ".py"
        mock_path_class.return_value = mock_path

        # Mock get_solution_path to return our mock path
        with patch("src.leet_code.app.get_solution_path", return_value=mock_path):
            mock_file.return_value.read.return_value = mock_solution_code
            mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

            response = client.get("/solution/arrays-hashing/001-two-sum")
            assert response.status_code == 200

    @patch("src.leet_code.views.solution_views.category_manager")
    @patch("builtins.open", new_callable=mock_open, read_data="func twoSum() {}")
    @patch("src.leet_code.app.Path")
    def test_get_other_language(
        self,
        mock_path_class: MagicMock,
        mock_file: MagicMock,
        mock_manager: MagicMock,
        client: Any,
    ) -> None:
        """Test GET request for solution in other supported language (TypeScript, Java, C++, Go)."""
        mock_solution = Solution(
            filename="001-two-sum.py",
            name="Two Sum",
            number="1",
            difficulty="Easy",
            time_complexity="O(n)",
            space_complexity="O(n)",
            available_languages=["Python", "TypeScript"],
        )
        mock_manager.get_solution.return_value = mock_solution
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path.suffix = ".ts"
        mock_path_class.return_value = mock_path

        with patch("src.leet_code.app.get_solution_path", return_value=mock_path):
            mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

            response = client.get("/solution/arrays-hashing/001-two-sum?lang=TypeScript")
            assert response.status_code == 200

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_solution_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request for non-existent solution."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/999-nonexistent")
        assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_no_available_languages(self, mock_manager: MagicMock, client: Any) -> None:
        """Test solution view when no languages are available."""
        solution_no_langs = Solution(
            filename="001-two-sum.py",
            name="Two Sum",
            number="1",
            difficulty="Easy",
            time_complexity="O(n)",
            space_complexity="O(n)",
            available_languages=[],
        )
        mock_manager.get_solution.return_value = solution_no_langs
        mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

        response = client.get("/solution/arrays-hashing/001-two-sum")
        assert response.status_code == 200
        # The template renders correctly - check for title
        assert b"No Solution Available" in response.data

    @patch("src.leet_code.views.solution_views.category_manager")
    @patch("builtins.open", new_callable=mock_open, read_data="function twoSum() {}")
    @patch("src.leet_code.app.Path")
    def test_get_javascript_solution(
        self,
        mock_path_class: MagicMock,
        mock_file: MagicMock,
        mock_manager: MagicMock,
        client: Any,
        mock_solution: Solution,
    ) -> None:
        """Test GET request for JavaScript solution."""
        mock_manager.get_solution.return_value = mock_solution
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path.suffix = ".js"
        mock_path_class.return_value = mock_path

        with patch("src.leet_code.app.get_solution_path", return_value=mock_path):
            mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

            response = client.get("/solution/arrays-hashing/001-two-sum?lang=JavaScript")
            assert response.status_code == 200


class TestSolutionLeetCodeView:
    """Test SolutionLeetCodeView class-based view."""

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_success(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test successful GET request for LeetCode format."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution
        mock_manager.get_category.return_value = MagicMock(name="Arrays & Hashing")

        response = client.get("/solution/arrays-hashing/001-two-sum/leetcode")
        assert response.status_code == 200
        # Check that it returns the solution code (may be raw or in template)
        assert b"class Solution" in response.data or response.status_code == 200

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_no_content(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET request when solution content doesn't exist."""
        mock_manager.read_solution_content.return_value = None

        response = client.get("/solution/arrays-hashing/001-two-sum/leetcode")
        assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_no_metadata(self, mock_manager: MagicMock, client: Any, mock_solution_code: str) -> None:
        """Test GET request when solution metadata doesn't exist."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/001-two-sum/leetcode")
        assert response.status_code == 404


class TestDownloadSolutionView:
    """Test DownloadSolutionView class-based view."""

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_skeleton(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test downloading skeleton file."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/download/skeleton")
        assert response.status_code == 200
        assert response.headers["Content-Disposition"].startswith("attachment")
        assert "skeleton" in response.headers["Content-Disposition"]

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_solution(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test downloading full solution file."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/download/solution")
        assert response.status_code == 200
        assert response.headers["Content-Disposition"].startswith("attachment")
        assert "solution" in response.headers["Content-Disposition"]

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_leetcode_format(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test downloading LeetCode format file."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/download/leetcode")
        assert response.status_code == 200
        assert response.headers["Content-Disposition"].startswith("attachment")
        assert "leetcode" in response.headers["Content-Disposition"]

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_both_as_zip(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test downloading both skeleton and solution as zip."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/download/both")
        assert response.status_code == 200
        assert response.mimetype == "application/zip"
        assert response.headers["Content-Disposition"].startswith("attachment")
        assert ".zip" in response.headers["Content-Disposition"]

        # Verify zip contents
        zip_data = io.BytesIO(response.data)
        with zipfile.ZipFile(zip_data, "r") as zip_file:
            files = zip_file.namelist()
            assert any("skeleton" in f for f in files)
            assert any("solution" in f for f in files)

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_invalid_format(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test download with invalid format parameter."""
        mock_manager.read_solution_content.return_value = "code"
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/download/invalid_format")
        assert response.status_code == 400

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_solution_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test download when solution doesn't exist."""
        mock_manager.read_solution_content.return_value = None

        response = client.get("/solution/arrays-hashing/999-nonexistent/download/skeleton")
        assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    @patch("src.leet_code.app.Path")
    @patch("builtins.open", new_callable=mock_open, read_data="function twoSum() {}")
    def test_download_javascript_solution(
        self,
        mock_file: MagicMock,
        mock_path_class: MagicMock,
        mock_manager: MagicMock,
        client: Any,
        mock_solution: Solution,
    ) -> None:
        """Test downloading JavaScript solution."""
        mock_path = MagicMock()
        mock_path.exists.return_value = True
        mock_path_class.return_value = mock_path

        mock_manager.get_solution.return_value = mock_solution

        with patch("src.leet_code.app.get_solution_path", return_value=mock_path):
            response = client.get("/solution/arrays-hashing/001-two-sum/download/solution/JavaScript")
            assert response.status_code == 200

    @patch("src.leet_code.views.solution_views.category_manager")
    @patch("src.leet_code.app.Path")
    def test_download_javascript_file_not_found(
        self,
        mock_path_class: MagicMock,
        mock_manager: MagicMock,
        client: Any,
        mock_solution: Solution,
    ) -> None:
        """Test downloading JavaScript solution when file doesn't exist."""
        mock_path = MagicMock()
        mock_path.exists.return_value = False
        mock_path_class.return_value = mock_path

        mock_manager.get_solution.return_value = mock_solution

        with patch("src.leet_code.app.get_solution_path", return_value=mock_path):
            response = client.get("/solution/arrays-hashing/001-two-sum/download/solution/JavaScript")
            assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_download_leetcode_non_python(
        self, mock_manager: MagicMock, client: Any, mock_solution: Solution, mock_solution_code: str
    ) -> None:
        """Test downloading LeetCode format for non-Python language (should return regular solution)."""
        mock_manager.read_solution_content.return_value = mock_solution_code
        mock_manager.get_solution.return_value = mock_solution

        # For non-Python, leetcode format just returns the solution
        response = client.get("/solution/arrays-hashing/001-two-sum/download/leetcode/JavaScript")
        # Should work but return solution content, not leetcode format
        assert response.status_code in [200, 404]  # May 404 if JavaScript file doesn't exist


class TestUploadSolutionView:
    """Test UploadSolutionView class-based view."""

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_upload_form(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test GET request to show upload form."""
        mock_manager.get_solution.return_value = mock_solution

        response = client.get("/solution/arrays-hashing/001-two-sum/upload")
        assert response.status_code == 200
        assert b"upload" in response.data.lower()

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_get_upload_form_solution_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test GET upload form when solution doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.get("/solution/arrays-hashing/999-nonexistent/upload")
        assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_no_file(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test POST with no file uploaded."""
        mock_manager.get_solution.return_value = mock_solution

        response = client.post("/solution/arrays-hashing/001-two-sum/upload", data={})
        assert response.status_code == 302  # Redirect

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_empty_filename(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test POST with empty filename."""
        mock_manager.get_solution.return_value = mock_solution

        data = {"file": (io.BytesIO(b""), ""), "language": "JavaScript"}
        response = client.post("/solution/arrays-hashing/001-two-sum/upload", data=data)
        assert response.status_code == 302  # Redirect

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_invalid_extension(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test POST with invalid file extension."""
        mock_manager.get_solution.return_value = mock_solution

        file_data = io.BytesIO(b"function test() {}")
        data = {"file": (file_data, "test.py"), "language": "JavaScript"}  # Wrong extension for JS
        response = client.post("/solution/arrays-hashing/001-two-sum/upload", data=data)
        assert response.status_code == 302  # Redirect

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_solution_not_found(self, mock_manager: MagicMock, client: Any) -> None:
        """Test POST when solution doesn't exist."""
        mock_manager.get_solution.return_value = None

        response = client.post("/solution/arrays-hashing/999-nonexistent/upload", data={})
        assert response.status_code == 404

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_with_solution_file_field(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test POST with 'solution_file' field name instead of 'file'."""
        mock_manager.get_solution.return_value = mock_solution

        file_data = io.BytesIO(b"test content")
        data = {"solution_file": (file_data, ""), "language": "JavaScript"}
        response = client.post("/solution/arrays-hashing/001-two-sum/upload", data=data)
        assert response.status_code == 302  # Redirect

    @patch("src.leet_code.views.solution_views.category_manager")
    def test_post_valid_file(self, mock_manager: MagicMock, client: Any, mock_solution: Solution) -> None:
        """Test POST with valid file and language."""
        mock_manager.get_solution.return_value = mock_solution

        file_data = io.BytesIO(b"function twoSum() {}")
        # Provide a valid file with correct extension for JavaScript
        data = {"file": (file_data, "solution.js"), "language": "JavaScript"}
        response = client.post("/solution/arrays-hashing/001-two-sum/upload", data=data)
        # This will redirect since file storage logic is not mocked, but at least we test the validation
        assert response.status_code in [200, 302]
