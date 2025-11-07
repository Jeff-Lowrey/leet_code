"""Search-related views."""

from flask import redirect, render_template, request, url_for
from werkzeug.wrappers.response import Response as WerkzeugResponse

from .base import BaseView


class SearchView(BaseView):
    """Search results page."""

    def get(self) -> str | WerkzeugResponse:
        """Handle GET request for search.

        Returns:
            Rendered template for search results or redirect to solution
        """
        from ..search_utils import execute_search
        from ..solution_utils import find_solution_category

        query = request.args.get("q", "").strip()

        # Execute search
        search_result = execute_search(query)

        # Handle error case
        if "error" in search_result:
            return render_template("search_results.html", query=query, results=[], error=search_result["error"])

        mode = search_result["mode"]

        # Handle navigate mode (redirect to solution)
        if mode == "navigate":
            solution = search_result["solution"]
            category_slug = search_result["category_slug"]
            return redirect(url_for("solution_view", category=category_slug, filename=solution.url_filename))

        # Handle other modes (render results page)
        elif mode == "similar":
            # Get reference solution details
            reference_solution = search_result["reference"]
            reference_category = find_solution_category(reference_solution)

            reference_problem = {
                "number": reference_solution.number,
                "name": reference_solution.name,
                "difficulty": reference_solution.difficulty,
                "category": reference_category[0] if reference_category else "",
                "category_name": reference_category[1] if reference_category else "",
                "filename": reference_solution.url_filename,
                "time_complexity": reference_solution.time_complexity,
            }

            return render_template(
                "search_results.html",
                query=query,
                mode="similar",
                reference_problem=reference_problem,
                results=search_result["results"],
                filters=search_result.get("filters", {}),
            )

        elif mode == "name_search":
            query_info = {"search_term": search_result.get("search_term", query)}
            return render_template(
                "search_results.html",
                query=query,
                mode="name_search",
                query_info=query_info,
                results=search_result["results"],
                filters=search_result.get("filters", {}),
            )

        elif mode == "filter":
            return render_template(
                "search_results.html",
                query=query,
                mode="filter",
                results=search_result["results"],
                filters=search_result.get("filters", {}),
            )

        return render_template("search_results.html", query=query, results=[], error="Invalid search query")
