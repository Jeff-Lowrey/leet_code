"""Black box tests for search functionality."""

import re

from playwright.sync_api import Page, expect


def test_navigate_mode_search(page: Page) -> None:
    """Test search using navigate mode (#number)."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("#443")
    search_input.press("Enter")
    # Should navigate to search results or solution page
    page.wait_for_url(re.compile(r"/(search|solution)"), timeout=5000)


def test_similar_mode_search(page: Page) -> None:
    """Test search using similar mode (similar:#number)."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("similar:#443")
    search_input.press("Enter")
    # Should navigate to search results
    page.wait_for_url(re.compile(r"/search"), timeout=5000)


def test_filter_mode_difficulty(page: Page) -> None:
    """Test search using filter mode (difficulty:easy)."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("difficulty:easy")
    search_input.press("Enter")
    page.wait_for_url(re.compile(r"/search"), timeout=5000)


def test_filter_mode_complexity(page: Page) -> None:
    """Test search using complexity filter (complexity:O(n))."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("complexity:O(n)")
    search_input.press("Enter")
    page.wait_for_url(re.compile(r"/search"), timeout=5000)


def test_name_search_mode(page: Page) -> None:
    """Test search by problem name (text search)."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("palindrome")
    search_input.press("Enter")
    page.wait_for_url(re.compile(r"/search"), timeout=5000)


def test_search_error_handling(page: Page) -> None:
    """Test search handles invalid queries gracefully."""
    page.goto("/")
    search_input = page.locator("input.search-input, #search-input").first
    search_input.fill("invalid:query:format")
    search_input.press("Enter")
    # Should either show error or navigate to search page
    page.wait_for_timeout(1000)
    # Check that page didn't crash (title still present)
    expect(page).to_have_title(re.compile("Leet Code"))
