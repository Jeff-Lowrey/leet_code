#!/usr/bin/env python3
"""Unit tests for category stats API routes - Issue #36

Tests the fixed API routes:
- /api/category/<category>/stats/difficulty
- /api/category/<category>/stats/complexity

Target: 85% coverage of route handling logic
"""

from typing import Any
from unittest.mock import MagicMock, patch

import pytest
from flask import Flask

from src.leet_code.data.category_data import Category, Solution


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
def mock_category() -> Category:
    """Create mock category with varied solutions."""
    return Category(
        slug="arrays-hashing",
        name="Arrays & Hashing",
        description="Array problems",
        solutions=[
            Solution("001-two-sum.py", "Two Sum", "1", "", "Easy", "O(n)", "O(n)"),
            Solution("002-add-two.py", "Add Two", "2", "", "Easy", "O(n)", "O(1)"),
            Solution("003-longest.py", "Longest", "3", "", "Medium", "O(n)", "O(n)"),
            Solution("004-median.py", "Median", "4", "", "Hard", "O(log n)", "O(1)"),
        ],
    )


class TestAPICategoryDifficultyStatsRoute:
    """Test /api/category/<category>/stats/difficulty endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_difficulty_stats_success(
        self, mock_manager: MagicMock, client: Any, mock_category: Category
    ) -> None:
        """Test successful GET request for category difficulty stats."""
        mock_manager.get_category.return_value = mock_category

        response = client.get("/api/category/arrays-hashing/stats/difficulty")

        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()

        # Verify difficulty counts
        assert isinstance(data, dict)
        assert "easy" in data or "Easy" in data
        assert data.get("easy", data.get("Easy", 0)) == 2
        assert data.get("medium", data.get("Medium", 0)) == 1
        assert data.get("hard", data.get("Hard", 0)) == 1

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_difficulty_stats_category_not_found(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test difficulty stats API when category doesn't exist."""
        mock_manager.get_category.return_value = None

        response = client.get("/api/category/nonexistent/stats/difficulty")

        assert response.status_code == 404
        assert response.is_json
        data = response.get_json()
        assert "error" in data

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_difficulty_stats_empty_category(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test difficulty stats with category containing no solutions."""
        empty_category = Category(
            slug="empty",
            name="Empty",
            description="Empty category",
            solutions=[]
        )
        mock_manager.get_category.return_value = empty_category

        response = client.get("/api/category/empty/stats/difficulty")

        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)
        # Should return empty counts or zero counts
        total = sum(data.values())
        assert total == 0

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_difficulty_stats_special_chars_in_slug(
        self, mock_manager: MagicMock, client: Any, mock_category: Category
    ) -> None:
        """Test difficulty stats with special characters in category slug."""
        mock_category.slug = "two-pointers"
        mock_manager.get_category.return_value = mock_category

        response = client.get("/api/category/two-pointers/stats/difficulty")

        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_difficulty_stats_case_sensitivity(
        self, mock_manager: MagicMock, client: Any, mock_category: Category
    ) -> None:
        """Test difficulty stats with different case in category slug."""
        mock_manager.get_category.return_value = mock_category

        response = client.get("/api/category/Arrays-Hashing/stats/difficulty")

        # Should call category_manager with the slug as provided
        mock_manager.get_category.assert_called_once_with("Arrays-Hashing")


class TestAPICategoryComplexityStatsRoute:
    """Test /api/category/<category>/stats/complexity endpoint."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_complexity_stats_success(
        self, mock_manager: MagicMock, client: Any, mock_category: Category
    ) -> None:
        """Test successful GET request for category complexity stats."""
        mock_manager.get_category.return_value = mock_category

        response = client.get("/api/category/arrays-hashing/stats/complexity")

        assert response.status_code == 200
        assert response.is_json
        data = response.get_json()

        # Verify complexity counts
        assert isinstance(data, dict)
        # Should have O(n) and O(log n) entries
        assert len(data) > 0

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_complexity_stats_category_not_found(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test complexity stats API when category doesn't exist."""
        mock_manager.get_category.return_value = None

        response = client.get("/api/category/nonexistent/stats/complexity")

        assert response.status_code == 404
        assert response.is_json
        data = response.get_json()
        assert "error" in data

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_complexity_stats_empty_category(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test complexity stats with category containing no solutions."""
        empty_category = Category(
            slug="empty",
            name="Empty",
            description="Empty category",
            solutions=[]
        )
        mock_manager.get_category.return_value = empty_category

        response = client.get("/api/category/empty/stats/complexity")

        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)
        # Should return empty dict or zero counts
        total = sum(data.values())
        assert total == 0

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_complexity_stats_various_patterns(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test complexity stats with various complexity patterns."""
        varied_category = Category(
            slug="varied",
            name="Varied",
            description="Varied complexity",
            solutions=[
                Solution("001.py", "Test1", "1", "", "Easy", "O(1)", "O(1)"),
                Solution("002.py", "Test2", "2", "", "Easy", "O(n)", "O(1)"),
                Solution("003.py", "Test3", "3", "", "Easy", "O(n log n)", "O(n)"),
                Solution("004.py", "Test4", "4", "", "Easy", "O(n^2)", "O(1)"),
            ],
        )
        mock_manager.get_category.return_value = varied_category

        response = client.get("/api/category/varied/stats/complexity")

        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)
        # Should have multiple complexity entries
        assert len(data) >= 3

    @patch("src.leet_code.views.api_views.category_manager")
    def test_get_complexity_stats_unknown_complexity(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test complexity stats with unknown complexity values."""
        unknown_category = Category(
            slug="unknown",
            name="Unknown",
            description="Unknown complexity",
            solutions=[
                Solution("001.py", "Test1", "1", "", "Easy", None, None),
                Solution("002.py", "Test2", "2", "", "Easy", "", ""),
            ],
        )
        mock_manager.get_category.return_value = unknown_category

        response = client.get("/api/category/unknown/stats/complexity")

        assert response.status_code == 200
        data = response.get_json()
        assert isinstance(data, dict)


class TestRouteIntegration:
    """Integration tests for both routes working together."""

    @patch("src.leet_code.views.api_views.category_manager")
    def test_both_routes_same_category(
        self, mock_manager: MagicMock, client: Any, mock_category: Category
    ) -> None:
        """Test both difficulty and complexity routes for same category."""
        mock_manager.get_category.return_value = mock_category

        # Test difficulty route
        diff_response = client.get("/api/category/arrays-hashing/stats/difficulty")
        assert diff_response.status_code == 200

        # Test complexity route
        comp_response = client.get("/api/category/arrays-hashing/stats/complexity")
        assert comp_response.status_code == 200

        # Both should return valid JSON dicts
        assert isinstance(diff_response.get_json(), dict)
        assert isinstance(comp_response.get_json(), dict)

    @patch("src.leet_code.views.api_views.category_manager")
    def test_route_path_validation(
        self, mock_manager: MagicMock, client: Any
    ) -> None:
        """Test that old route paths no longer work."""
        mock_manager.get_category.return_value = None

        # Old route pattern (should 404)
        old_diff_response = client.get("/api/stats/category/arrays-hashing/difficulty")
        assert old_diff_response.status_code == 404

        old_comp_response = client.get("/api/stats/category/arrays-hashing/complexity")
        assert old_comp_response.status_code == 404


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--cov=src.leet_code.views.api_views", "--cov-report=term-missing"])
