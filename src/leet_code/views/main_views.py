"""Main page views (index, category, difficulty, complexity)."""

from typing import Any

import markdown
from flask import abort, render_template

from ..category_data import category_manager
from .base import BaseView

# Constants
COMPLEXITY_PATTERN_MAP = {
    "o1": "O(1)",
    "ologn": "O(log n)",
    "on": "O(n)",
    "on-log-n": "O(n log n)",
    "onlogn": "O(n log n)",
    "on2": "O(n²)",
    "on3": "O(n³)",
    "o2n": "O(2^n)",
    "onm": "O(n*m)",
    "on-m": "O(n+m)",
}

VALID_DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"]


class IndexView(BaseView):
    """Home page showing all categories."""

    def get(self) -> str:
        """Handle GET request to home page.

        Returns:
            Rendered template for home page
        """
        categories = category_manager.get_categories()
        stats = category_manager.get_statistics()

        return render_template(
            "index.html",
            categories=categories,
            total_solutions=stats["total_solutions"],
            total_categories=stats["total_categories"],
        )


class CategoryView(BaseView):
    """View all solutions in a category."""

    def get(self, category: str) -> str:
        """Handle GET request for category view.

        Args:
            category: Category slug

        Returns:
            Rendered template for category page
        """
        cat_data = category_manager.get_category(category)
        if not cat_data:
            abort(404)

        # Read category documentation
        doc_content = category_manager.read_documentation(category)
        doc_html = markdown.markdown(doc_content, extensions=["fenced_code", "tables"]) if doc_content else None

        return render_template(
            "category.html",
            category=category,
            category_name=cat_data.name,
            solutions=cat_data.solutions,
            documentation=doc_html,
        )


class DifficultyOverviewView(BaseView):
    """View all solutions organized by difficulty level."""

    def get(self) -> str:
        """Handle GET request for difficulty overview.

        Returns:
            Rendered template for difficulty overview page
        """
        from ..solution_utils import enrich_solutions_with_category

        all_solutions = category_manager.get_all_solutions()

        # Group solutions by difficulty
        difficulties: dict[str, dict[str, Any]] = {
            "Easy": {"solutions": [], "count": 0},
            "Medium": {"solutions": [], "count": 0},
            "Hard": {"solutions": [], "count": 0},
        }

        # Group solutions by difficulty level
        difficulty_groups: dict[str, list[Any]] = {"Easy": [], "Medium": [], "Hard": []}
        for solution in all_solutions:
            difficulty = solution.difficulty.capitalize()
            if difficulty in difficulty_groups:
                difficulty_groups[difficulty].append(solution)

        # Enrich each group with category metadata
        total_count = 0
        for difficulty, solutions in difficulty_groups.items():
            enriched = enrich_solutions_with_category(solutions)
            difficulties[difficulty]["solutions"] = enriched
            difficulties[difficulty]["count"] = len(enriched)
            total_count += len(enriched)

        return render_template(
            "difficulty.html",
            difficulties=difficulties,
            total_count=total_count,
        )


class ComplexityOverviewView(BaseView):
    """View all solutions organized by time/space complexity."""

    def get(self) -> str:
        """Handle GET request for complexity overview.

        Returns:
            Rendered template for complexity overview page
        """
        from ..solution_utils import enrich_solutions_with_category

        all_solutions = category_manager.get_all_solutions()

        # Group solutions by complexity combination
        complexity_groups: dict[str, list[Any]] = {}

        for solution in all_solutions:
            time_comp = solution.time_complexity or "Unknown"
            space_comp = solution.space_complexity or "Unknown"
            complexity_key = f"{time_comp}_{space_comp}"

            if complexity_key not in complexity_groups:
                complexity_groups[complexity_key] = []
            complexity_groups[complexity_key].append(solution)

        # Enrich each group with category metadata
        complexities: dict[str, dict[str, Any]] = {}
        total_count = 0

        for complexity_key, solutions in complexity_groups.items():
            time_comp, space_comp = complexity_key.split("_", 1)
            enriched = enrich_solutions_with_category(solutions)

            complexities[complexity_key] = {
                "display_name": f"Time: {time_comp} | Space: {space_comp}",
                "solutions": enriched,
                "count": len(enriched),
            }
            total_count += len(enriched)

        # Sort complexities by count (descending)
        sorted_complexities = dict(sorted(complexities.items(), key=lambda x: x[1]["count"], reverse=True))

        return render_template(
            "complexity.html",
            complexities=sorted_complexities,
            total_count=total_count,
        )


class DifficultyLevelView(BaseView):
    """View solutions filtered by a specific difficulty level."""

    def get(self, level: str) -> str:
        """Handle GET request for difficulty level view.

        Args:
            level: Difficulty level (easy, medium, hard)

        Returns:
            Rendered template for virtual category page
        """
        from ..solution_utils import enrich_solutions_with_category

        # Normalize the level input
        level_normalized = level.lower().capitalize()

        # Validate difficulty level
        if level_normalized not in VALID_DIFFICULTY_LEVELS:
            abort(404)

        # Use CategoryManager to filter and sort solutions
        filtered_solutions = category_manager.filter_solutions({"difficulty": level_normalized})
        sorted_solutions = category_manager.sort_by_number(filtered_solutions)

        # Attach category metadata to solutions
        solutions = enrich_solutions_with_category(sorted_solutions)

        return render_template(
            "virtual_category.html",
            category_name=f"{level_normalized} Problems",
            category_description=f"All problems with {level_normalized} difficulty across all categories",
            solutions=solutions,
            is_virtual=True,
            virtual_type="difficulty",
            virtual_value=level_normalized,
        )


class ComplexityPatternView(BaseView):
    """View solutions filtered by a specific time complexity pattern."""

    def get(self, pattern: str) -> str:
        """Handle GET request for complexity pattern view.

        Args:
            pattern: Complexity pattern (e.g., o1, on, on2)

        Returns:
            Rendered template for virtual category page
        """
        from ..solution_utils import enrich_solutions_with_category

        # Normalize pattern and get display name
        pattern_lower = pattern.lower()
        complexity_display = COMPLEXITY_PATTERN_MAP.get(pattern_lower)

        if not complexity_display:
            # Try to match patterns like "O(n)", "O(n log n)" directly
            if pattern.startswith(("O(", "o(")):
                complexity_display = pattern
            else:
                abort(404)

        # Get all solutions and filter by time complexity
        all_solutions = category_manager.get_all_solutions()

        # Filter solutions matching this time complexity
        matching_solutions = []
        for solution in all_solutions:
            time_comp = solution.time_complexity

            # Match complexity (case-insensitive, handle variations)
            if time_comp and (
                time_comp == complexity_display
                or time_comp.lower() == complexity_display.lower()
                or time_comp.replace(" ", "").lower() == complexity_display.replace(" ", "").lower()
            ):
                matching_solutions.append(solution)

        # Sort by problem number
        sorted_solutions = category_manager.sort_by_number(matching_solutions)

        # Attach category metadata
        solutions = enrich_solutions_with_category(sorted_solutions)

        # Add space_complexity to each solution dict
        for sol_dict in solutions:
            sol_dict["space_complexity"] = sol_dict["solution"].space_complexity

        return render_template(
            "virtual_category.html",
            category_name=f"Time Complexity: {complexity_display}",
            category_description=f"All problems with time complexity {complexity_display} across all categories",
            solutions=solutions,
            is_virtual=True,
            virtual_type="complexity",
            virtual_value=complexity_display,
        )
