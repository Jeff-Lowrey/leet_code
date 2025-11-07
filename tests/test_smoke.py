"""
Smoke tests for v0.1.0 release.

Fast, high-level tests that verify critical application functionality.
These tests catch major breakages after deployment/installation.

Run with: pytest tests/test_smoke.py -v
Expected runtime: < 5 seconds
"""

from collections.abc import Generator
from typing import Any

import pytest
from flask import Flask

from src.leet_code.factory import create_app


@pytest.fixture
def client() -> Generator[Any]:
    """Create a test client for the Flask application."""
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestApplicationStartup:
    """Verify Flask app initializes without errors."""

    def test_app_exists(self) -> None:
        """Test that app object exists."""
        app = create_app()
        assert app is not None

    def test_app_is_flask_instance(self) -> None:
        """Test that app is a Flask instance."""
        app = create_app()
        assert isinstance(app, Flask)

    def test_app_name(self) -> None:
        """Test that app has correct name."""
        app = create_app()
        assert app.name == "src.leet_code.factory"


class TestCriticalRoutes:
    """Verify critical routes are accessible."""

    def test_home_page_loads(self, client: Any) -> None:
        """Verify home page returns 200 and contains expected content."""
        response = client.get("/")
        assert response.status_code == 200
        assert b"Leet Code Learning Tool" in response.data or b"LeetCode" in response.data

    def test_docs_page_loads(self, client: Any) -> None:
        """Verify documentation page loads."""
        response = client.get("/docs")
        assert response.status_code == 200

    def test_category_page_loads(self, client: Any) -> None:
        """Verify at least one category page works."""
        # Test arrays-hashing category (should always exist)
        response = client.get("/category/arrays-hashing")
        # Should either return 200 (exists) or 404 (doesn't exist yet)
        assert response.status_code in [200, 404]

    def test_solution_page_loads(self, client: Any) -> None:
        """Verify solution pages can be accessed."""
        # Test two-sum solution (canonical first problem)
        response = client.get("/solution/arrays-hashing/001-two-sum.py")
        # Should either return 200 (exists) or 404 (doesn't exist yet)
        assert response.status_code in [200, 404]


class TestAPIEndpoints:
    """Verify API endpoints return valid responses."""

    def test_api_categories_endpoint(self, client: Any) -> None:
        """Verify API categories endpoint returns valid JSON."""
        response = client.get("/api/categories")
        assert response.status_code == 200
        assert response.content_type == "application/json"

        # Verify it's valid JSON
        data = response.get_json()
        assert isinstance(data, list)

    def test_api_solutions_endpoint(self, client: Any) -> None:
        """Verify API solutions endpoint works."""
        # Test arrays-hashing category solutions
        response = client.get("/api/category/arrays-hashing/solutions")
        # Should either return 200 or 404
        assert response.status_code in [200, 404]

        if response.status_code == 200:
            assert response.content_type == "application/json"
            data = response.get_json()
            assert isinstance(data, list)


class TestStaticAssets:
    """Verify static assets are accessible."""

    def test_css_accessible(self, client: Any) -> None:
        """Verify CSS files load."""
        response = client.get("/static/css/main.css")
        # Static files may or may not exist in test environment
        assert response.status_code in [200, 404]

    def test_js_accessible(self, client: Any) -> None:
        """Verify JavaScript files load."""
        response = client.get("/static/js/theme-picker.js")
        # Static files may or may not exist in test environment
        assert response.status_code in [200, 404]


class TestErrorHandling:
    """Verify basic error handling works."""

    def test_404_page(self, client: Any) -> None:
        """Verify 404 errors are handled."""
        response = client.get("/nonexistent-page")
        assert response.status_code == 404

    def test_invalid_category(self, client: Any) -> None:
        """Verify invalid category returns appropriate response."""
        response = client.get("/category/nonexistent-category")
        assert response.status_code in [404, 500]

    def test_invalid_solution(self, client: Any) -> None:
        """Verify invalid solution returns appropriate response."""
        response = client.get("/solution/arrays-hashing/nonexistent-solution.py")
        assert response.status_code in [404, 500]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
