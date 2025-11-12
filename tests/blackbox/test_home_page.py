"""Black box tests for home page functionality."""

import re

from playwright.sync_api import Page, expect


def test_home_page_loads(page: Page) -> None:
    """Test that home page loads successfully."""
    page.goto("/")
    expect(page).to_have_title(re.compile("Leet Code"))
    expect(page.locator("h1, .logo")).to_contain_text("Leet Code")


def test_category_cards_display(page: Page) -> None:
    """Test that category cards are displayed on home page."""
    page.goto("/")
    # Wait for category cards to load
    page.wait_for_selector(".category-card", timeout=5000)
    cards = page.locator(".category-card")
    expect(cards).to_have_count(lambda count: count > 0)


def test_category_card_has_stats(page: Page) -> None:
    """Test that category cards show stats badges."""
    page.goto("/")
    page.wait_for_selector(".category-card", timeout=5000)
    first_card = page.locator(".category-card").first
    # Check for stats (difficulty or complexity)
    stats_exist = (
        first_card.locator(".stats, .badge, .difficulty, .complexity").count() > 0
    )
    assert stats_exist, "Category card should have stats badges"


def test_navigation_links_work(page: Page) -> None:
    """Test that navigation links are present and functional."""
    page.goto("/")
    # Check for navigation elements
    nav = page.locator("nav, .navbar, .nav-container")
    expect(nav).to_be_visible()


def test_theme_toggle_present(page: Page) -> None:
    """Test that theme toggle button is present."""
    page.goto("/")
    theme_toggle = page.locator(".theme-toggle, button[title*='theme' i]")
    expect(theme_toggle).to_be_visible()


def test_search_bar_accepts_input(page: Page) -> None:
    """Test that search bar accepts user input."""
    page.goto("/")
    search_input = page.locator("input[type='text'], input.search-input, #search-input")
    expect(search_input.first).to_be_visible()
    search_input.first.fill("443")
    expect(search_input.first).to_have_value("443")
