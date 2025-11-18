"""API endpoint views."""

from flask import Response, abort, jsonify, request

from ..data.category_data import category_manager
from .base import BaseView


class APICategoriesView(BaseView):
    """API endpoint to get all categories."""

    def get(self) -> Response:
        """Handle GET request for categories API.

        Returns:
            JSON response with categories list
        """
        categories = category_manager.get_categories()
        return jsonify([{"name": cat.name, "slug": cat.slug, "count": cat.count} for cat in categories])


class APICategorySolutionsView(BaseView):
    """API endpoint to get solutions for a category."""

    def get(self, category: str) -> Response:
        """Handle GET request for category solutions API.

        Args:
            category: Category slug

        Returns:
            JSON response with solutions list
        """
        cat_data = category_manager.get_category(category)
        if not cat_data:
            abort(404)
        return jsonify(
            [{"filename": sol.filename, "name": sol.name, "number": sol.number} for sol in cat_data.solutions]
        )


class APISearchView(BaseView):
    """API endpoint for search (returns JSON)."""

    def get(self) -> Response | tuple[Response, int]:
        """Handle GET request for search API.

        Returns:
            JSON response with search results
        """
        from ..search.search_engine import execute_search, serialize_results

        query = request.args.get("q", "").strip()

        # Execute search
        search_result = execute_search(query)

        # Handle error case
        if "error" in search_result:
            status_code = 404 if search_result["mode"] in ["navigate", "similar"] else 400
            return jsonify({"error": search_result["error"]}), status_code

        mode = search_result["mode"]

        # Handle navigate mode
        if mode == "navigate":
            solution = search_result["solution"]
            return jsonify(
                {
                    "mode": "navigate",
                    "solution": {
                        "number": solution.number,
                        "name": solution.name,
                        "category": search_result["category_slug"],
                        "filename": solution.url_filename,
                    },
                }
            )

        # Handle similar mode
        elif mode == "similar":
            reference = search_result["reference"]
            return jsonify(
                {
                    "mode": "similar",
                    "reference": {"number": reference.number, "name": reference.name},
                    "results": serialize_results(search_result["results"]),
                }
            )

        # Handle name_search mode
        elif mode == "name_search":
            return jsonify({"mode": "name_search", "results": serialize_results(search_result["results"])})

        # Handle filter mode
        elif mode == "filter":
            return jsonify({"mode": "filter", "results": serialize_results(search_result["results"])})

        return jsonify({"error": "Invalid search query"}), 400


class APIDifficultyStatsView(BaseView):
    """API endpoint to get difficulty level counts."""

    def get(self) -> Response:
        """Handle GET request for difficulty stats API.

        Returns:
            JSON response with difficulty counts
        """
        from ..search.solution_finder import count_by_difficulty

        all_solutions = category_manager.get_all_solutions()
        difficulty_counts = count_by_difficulty(all_solutions)
        return jsonify(difficulty_counts)


class APIComplexityStatsView(BaseView):
    """API endpoint to get complexity pattern counts."""

    def get(self) -> Response:
        """Handle GET request for complexity stats API.

        Returns:
            JSON response with complexity counts
        """
        from ..search.solution_finder import count_by_time_complexity

        all_solutions = category_manager.get_all_solutions()
        complexity_counts = count_by_time_complexity(all_solutions)
        return jsonify(complexity_counts)


class APIComplexityByDifficultyView(BaseView):
    """API endpoint to get complexity counts for a specific difficulty level."""

    def get(self, level: str) -> Response:
        """Handle GET request for complexity by difficulty API.

        Args:
            level: Difficulty level (easy, medium, hard)

        Returns:
            JSON response with complexity counts for difficulty level
        """
        from ..search.solution_finder import count_by_time_complexity

        # Filter solutions by difficulty level
        filtered_solutions = category_manager.filter_solutions({"difficulty": level.capitalize()})
        complexity_counts = count_by_time_complexity(filtered_solutions)
        return jsonify(complexity_counts)


class APIDifficultyByComplexityView(BaseView):
    """API endpoint to get difficulty counts for a specific complexity pattern."""

    def get(self, complexity_key: str) -> Response | tuple[Response, int]:
        """Handle GET request for difficulty by complexity API.

        Args:
            complexity_key: Complexity key in format "time_space"

        Returns:
            JSON response with difficulty counts for complexity
        """
        from ..search.solution_finder import count_by_difficulty

        # Parse complexity key (format: "time_space")
        parts = complexity_key.split("_", 1)
        if len(parts) != 2:
            return jsonify({"error": "Invalid complexity key format"}), 400

        time_comp, space_comp = parts

        # Filter solutions matching the complexity combination
        all_solutions = category_manager.get_all_solutions()
        matching_solutions = [
            sol
            for sol in all_solutions
            if (sol.time_complexity or "Unknown") == time_comp and (sol.space_complexity or "Unknown") == space_comp
        ]

        difficulty_counts = count_by_difficulty(matching_solutions)
        return jsonify(difficulty_counts)


class APICategoryDifficultyStatsView(BaseView):
    """API endpoint to get difficulty counts for a specific category."""

    def get(self, category: str) -> Response | tuple[Response, int]:
        """Handle GET request for category difficulty stats API.

        Args:
            category: Category slug

        Returns:
            JSON response with difficulty counts for category
        """
        from ..search.solution_finder import count_by_difficulty

        category_data = category_manager.get_category(category)
        if not category_data:
            return jsonify({"error": "Category not found"}), 404

        difficulty_counts = count_by_difficulty(category_data.solutions)

        return jsonify(difficulty_counts)


class APICategoryComplexityStatsView(BaseView):
    """API endpoint to get complexity pattern counts for a specific category."""

    def get(self, category: str) -> Response | tuple[Response, int]:
        """Handle GET request for category complexity stats API.

        Args:
            category: Category slug

        Returns:
            JSON response with complexity counts for category
        """
        from ..search.solution_finder import count_by_time_complexity

        category_data = category_manager.get_category(category)
        if not category_data:
            return jsonify({"error": "Category not found"}), 404

        complexity_counts = count_by_time_complexity(category_data.solutions)
        return jsonify(complexity_counts)
