"""Test fixtures and utilities for black box testing."""

from pathlib import Path

# Fixture paths
FIXTURES_DIR = Path(__file__).parent
SAMPLE_SOLUTIONS_DIR = FIXTURES_DIR / "sample_solutions"
SAMPLE_MARKDOWN_DIR = FIXTURES_DIR / "sample_markdown"
SAMPLE_CATEGORIES_DIR = FIXTURES_DIR / "sample_categories"

__all__ = [
    "FIXTURES_DIR",
    "SAMPLE_SOLUTIONS_DIR",
    "SAMPLE_MARKDOWN_DIR",
    "SAMPLE_CATEGORIES_DIR",
]
