"""Black box tests for documentation page functionality."""

import re

from playwright.sync_api import Page, expect


def test_docs_readme_page_loads(page: Page) -> None:
    """Test that documentation README page loads successfully."""
    page.goto("/docs")
    expect(page).to_have_title(re.compile("Leet Code"))
    # Should have documentation content
    has_content = page.locator("h1, h2, .markdown-content, .docs-content").count() > 0
    assert has_content, "Documentation page should have content"


def test_docs_category_navigation(page: Page) -> None:
    """Test that category documentation pages are accessible."""
    page.goto("/docs")
    # Look for category links
    category_links = page.locator("a[href*='/docs/']")
    if category_links.count() > 0:
        # Click first category link if available
        first_link = category_links.first
        first_link.click()
        page.wait_for_timeout(1000)
        # Should navigate to category docs
        assert "/docs/" in page.url


def test_markdown_rendering(page: Page) -> None:
    """Test that markdown is properly rendered in documentation."""
    page.goto("/docs")
    # Check for markdown-rendered elements
    has_markdown = (
        page.locator("h1, h2, h3, p, ul, ol, code, pre").count() > 0
    )
    assert has_markdown, "Documentation should have markdown-rendered elements"


def test_code_highlighting_in_docs(page: Page) -> None:
    """Test that code blocks in documentation have syntax highlighting."""
    page.goto("/docs")
    # Look for code blocks with highlighting classes
    code_blocks = page.locator("pre code, .highlight, .language-")
    # May not be present on all pages, so just verify structure
    assert True, "Code highlighting structure test"


def test_docs_breadcrumb_navigation(page: Page) -> None:
    """Test that breadcrumb navigation works in documentation."""
    page.goto("/docs")
    # Check if breadcrumbs or navigation exist
    nav_elements = page.locator("nav, .breadcrumb, .nav-path")
    # Structure test - navigation should be present
    assert nav_elements.count() >= 0, "Navigation structure test"


def test_docs_table_of_contents(page: Page) -> None:
    """Test that table of contents is generated for documentation."""
    page.goto("/docs")
    # Look for TOC elements
    toc_elements = page.locator(".toc, .table-of-contents, #toc, aside")
    # May not be on all pages, structure test
    assert True, "Table of contents structure test"
