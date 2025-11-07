"""Solution utilities for the Leet Code Learning Tool.

This module contains utility functions for working with Solution objects,
including category lookups, enrichment, and path management.
"""

from pathlib import Path
from typing import Any

from .category_data import Solution, category_manager
from .language_constants import get_file_extension


def find_solution_category(solution: Solution) -> tuple[str, str] | None:
    """Find category slug and name for a solution.

    Args:
        solution: Solution object to find category for

    Returns:
        Tuple of (category_slug, category_name) or None if not found
    """
    for cat in category_manager.get_categories():
        if solution in cat.solutions:
            return (cat.slug, cat.name)
    return None


def enrich_solutions_with_category(
    solutions: list[Solution], extra_fields: dict[str, Any] | None = None
) -> list[dict[str, Any]]:
    """Add category metadata to solutions.

    Args:
        solutions: List of Solution objects
        extra_fields: Optional dict of additional fields to include in each result

    Returns:
        List of dicts with solution and category metadata
    """
    enriched = []
    for solution in solutions:
        category_info = find_solution_category(solution)
        if category_info:
            cat_slug, cat_name = category_info
            result = {
                "solution": solution,
                "category": cat_slug,
                "category_name": cat_name,
            }
            # Add any extra fields (e.g., space_complexity for complexity views)
            if extra_fields:
                result.update(extra_fields)
            enriched.append(result)
    return enriched


def ensure_py_extension(filename: str) -> str:
    """Ensure filename has .py extension.

    Args:
        filename: Filename with or without .py extension

    Returns:
        Filename with .py extension
    """
    return filename if filename.endswith(".py") else filename + ".py"


def remove_py_extension(filename: str) -> str:
    """Remove .py extension from filename for display.

    Args:
        filename: Filename with .py extension

    Returns:
        Filename without .py extension
    """
    return filename.replace(".py", "")


def get_solution_path(category: str, filename: str, language: str) -> Path:
    """Get path to solution file in specific language.

    Args:
        category: Category slug
        filename: Python filename (with .py extension)
        language: Target programming language

    Returns:
        Path to solution file
    """
    from .language_constants import SUPPORTED_LANGUAGES

    base_name = remove_py_extension(filename)
    lang_extension = get_file_extension(language)
    solution_filename = f"{base_name}{lang_extension}"

    # Use SUPPORTED_LANGUAGES mapping to get correct directory name
    # Falls back to lowercase if language not in mapping
    language_dir = SUPPORTED_LANGUAGES.get(language, language.lower())

    return Path(__file__).parent.parent.parent / "solutions" / category / language_dir / solution_filename


def count_by_difficulty(solutions: list[Solution]) -> dict[str, int]:
    """Count solutions by difficulty level.

    Args:
        solutions: List of Solution objects

    Returns:
        Dictionary with counts for easy, medium, hard
    """
    counts = {"easy": 0, "medium": 0, "hard": 0}
    for solution in solutions:
        difficulty = solution.difficulty.lower()
        if difficulty in counts:
            counts[difficulty] += 1
    return counts


def count_by_time_complexity(solutions: list[Solution]) -> dict[str, int]:
    """Count solutions by time complexity.

    Args:
        solutions: List of Solution objects

    Returns:
        Dictionary mapping complexity strings to counts
    """
    counts: dict[str, int] = {}
    for solution in solutions:
        time_comp = solution.time_complexity or "Unknown"
        counts[time_comp] = counts.get(time_comp, 0) + 1
    return counts
