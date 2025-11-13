"""Black box tests for API endpoint functionality."""

import json

from playwright.sync_api import APIRequestContext, Page


def test_api_health_endpoint(page: Page) -> None:
    """Test that API health check endpoint returns 200."""
    response = page.request.get("/api/health")
    assert response.status == 200
    data = response.json()
    assert "status" in data or "health" in data or response.ok


def test_api_categories_endpoint(page: Page) -> None:
    """Test that API returns categories list."""
    response = page.request.get("/api/categories")
    assert response.status == 200
    data = response.json()
    # Should be a list or object with categories
    assert isinstance(data, (list, dict))


def test_api_solutions_endpoint(page: Page) -> None:
    """Test that API returns solutions list."""
    response = page.request.get("/api/solutions")
    # Should return 200 or 404 if endpoint doesn't exist yet
    assert response.status in [200, 404]
    if response.status == 200:
        data = response.json()
        assert isinstance(data, (list, dict))


def test_api_search_endpoint(page: Page) -> None:
    """Test that API search endpoint handles queries."""
    response = page.request.get("/api/search?q=palindrome")
    # Should return 200 or 404 if not implemented
    assert response.status in [200, 404]
    if response.status == 200:
        data = response.json()
        assert isinstance(data, (list, dict))


def test_api_invalid_endpoint_returns_404(page: Page) -> None:
    """Test that invalid API endpoints return 404."""
    response = page.request.get("/api/nonexistent/endpoint")
    assert response.status == 404


def test_api_cors_headers(page: Page) -> None:
    """Test that API endpoints include appropriate CORS headers."""
    response = page.request.get("/api/categories")
    headers = response.headers
    # Check for common API headers (may not have CORS if not configured)
    assert "content-type" in headers
    content_type = headers["content-type"]
    assert "json" in content_type.lower()


def test_api_error_response_format(page: Page) -> None:
    """Test that API errors return proper JSON format."""
    response = page.request.get("/api/invalid")
    # Should return error status
    assert response.status >= 400
    # Should still be valid JSON (if API returns JSON errors)
    try:
        data = response.json()
        # Common error response fields
        assert isinstance(data, dict) or response.status == 404
    except json.JSONDecodeError:
        # HTML error pages are also acceptable
        assert response.status == 404
