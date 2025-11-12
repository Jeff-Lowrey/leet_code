"""Unit tests for docs_views.py - documentation class-based views."""

from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from flask import Flask


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


class TestDocsIndexView:
    """Test DocsIndexView class-based view."""

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_success(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test successful GET request for docs index."""
        # Mock docs directory structure
        mock_docs_dir.exists.return_value = True

        mock_category_dir = MagicMock()
        mock_category_dir.is_dir.return_value = True
        mock_category_dir.name = "user-guide"

        mock_readme = MagicMock()
        mock_readme.exists.return_value = True
        mock_category_dir.__truediv__.return_value = mock_readme

        mock_docs_dir.iterdir.return_value = [mock_category_dir]

        response = client.get("/docs")
        assert response.status_code == 200

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_no_docs_directory(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test docs index when docs directory doesn't exist."""
        mock_docs_dir.exists.return_value = False

        response = client.get("/docs")
        assert response.status_code == 200  # Should still render with empty list

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_special_categories(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test docs index with special category names."""
        mock_docs_dir.exists.return_value = True

        # Create multiple category dirs with special names
        # Make mocks sortable by providing __lt__ method based on name
        categories = ["user-guide", "developer-guide", "upload-guide", "arrays-hashing", "two-pointers"]
        mock_category_dirs = []
        for cat_name in categories:
            mock_cat = MagicMock()
            mock_cat.is_dir.return_value = True
            mock_cat.name = cat_name
            # Make mock sortable by comparing names
            mock_cat.__lt__ = lambda self, other: self.name < other.name
            mock_readme = MagicMock()
            mock_readme.exists.return_value = True
            mock_cat.__truediv__.return_value = mock_readme
            mock_category_dirs.append(mock_cat)

        # Return already sorted list to avoid comparison issues
        mock_docs_dir.iterdir.return_value = sorted(mock_category_dirs, key=lambda x: x.name)

        response = client.get("/docs")
        assert response.status_code == 200
        # All categories should be processed
        assert b"User Guide" in response.data or b"user" in response.data.lower()


class TestDocsReadmeView:
    """Test DocsReadmeView class-based view."""

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_success(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test successful GET request for main README."""
        mock_readme = MagicMock()
        mock_readme.exists.return_value = True
        mock_readme.read_text.return_value = "# Documentation\n\nMain documentation content."
        mock_docs_dir.__truediv__.return_value = mock_readme

        response = client.get("/docs/README")
        assert response.status_code == 200

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_not_found(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test GET request when README doesn't exist."""
        mock_readme = MagicMock()
        mock_readme.exists.return_value = False
        mock_docs_dir.__truediv__.return_value = mock_readme

        response = client.get("/docs/README")
        assert response.status_code == 404


class TestDocsView:
    """Test DocsView class-based view."""

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_category_readme(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test GET request for category README."""
        mock_doc_path = MagicMock()
        mock_doc_path.exists.return_value = True
        mock_doc_path.read_text.return_value = "# User Guide\n\nUser guide content."
        mock_docs_dir.__truediv__.return_value.__truediv__.return_value = mock_doc_path

        response = client.get("/docs/user-guide")
        assert response.status_code == 200

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_sub_page(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test GET request for documentation sub-page."""
        mock_doc_path = MagicMock()
        mock_doc_path.exists.return_value = True
        mock_doc_path.read_text.return_value = "# Overview\n\nOverview content."
        mock_docs_dir.__truediv__.return_value.__truediv__.return_value = mock_doc_path

        response = client.get("/docs/user-guide/01-overview")
        assert response.status_code == 200

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_sub_page_with_md_extension(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test GET request for sub-page with .md extension."""
        mock_doc_path = MagicMock()
        mock_doc_path.exists.return_value = True
        mock_doc_path.read_text.return_value = "# Overview\n\nOverview content."
        mock_docs_dir.__truediv__.return_value.__truediv__.return_value = mock_doc_path

        response = client.get("/docs/user-guide/01-overview.md")
        assert response.status_code == 200

    @patch("src.leet_code.views.docs_views.DOCS_DIR")
    def test_get_page_not_found(self, mock_docs_dir: MagicMock, client: Any) -> None:
        """Test GET request when documentation page doesn't exist."""
        mock_doc_path = MagicMock()
        mock_doc_path.exists.return_value = False
        mock_docs_dir.__truediv__.return_value.__truediv__.return_value = mock_doc_path

        response = client.get("/docs/nonexistent")
        assert response.status_code == 404
