"""Search engine for the Leet Code Learning Tool.

This module contains all search-related functionality including query parsing,
search execution, result filtering, grouping, and enrichment.
"""

from typing import Any

from ..data.category_data import Solution, category_manager

__all__ = [
    "parse_search_query",
    "execute_search",
    "group_by_similarity",
    "apply_filters_to_results",
    "apply_filters_to_solutions",
    "matches_filters",
    "enrich_results_with_category",
    "serialize_results",
]

# Similarity score thresholds for search result grouping
SIMILARITY_EXACT = 1.0
SIMILARITY_HIGH = 0.8
SIMILARITY_MEDIUM = 0.5
MIN_SIMILARITY_SCORE = 0.1


def parse_search_query(query: str) -> tuple[str, dict[str, Any]]:
    """Parse search query to determine mode and extract data.

    Args:
        query: Raw search query string

    Returns:
        Tuple of (mode, data) where mode is one of:
        - "navigate": Direct navigation to problem number
        - "similar": Similarity search with optional filters
        - "name_search": Name-based search with optional filters
        - "filter": Filter-only search
    """
    tokens = query.split()
    filters = {}
    numbers = []
    text_tokens = []

    # Parse tokens
    for token in tokens:
        if "=" in token:
            # Filter token
            key, value = token.split("=", 1)
            filters[key] = value
        elif token.isdigit():
            # Number token
            numbers.append(token)
        else:
            # Text token
            text_tokens.append(token)

    # Determine mode
    if numbers and not text_tokens and not filters:
        # Pure number = navigate
        return "navigate", {"number": numbers[0]}
    elif numbers and filters:
        # Number + filters = similarity search
        return "similar", {"number": numbers[0], "filters": filters}
    elif text_tokens and not numbers:
        # Text tokens = name search
        search_term = " ".join(text_tokens)
        return "name_search", {"search_term": search_term, "filters": filters}
    elif filters and not numbers and not text_tokens:
        # Only filters = filter search
        return "filter", {"filters": filters}
    elif numbers and text_tokens:
        # Number + text = similar search (text ignored for now)
        return "similar", {"number": numbers[0], "filters": filters}
    else:
        # Default to name search
        search_term = " ".join(text_tokens)
        return "name_search", {"search_term": search_term, "filters": filters}


def group_by_similarity(similar_problems: list[tuple[Solution, float]]) -> dict[str, list[tuple[Solution, float]]]:
    """Group similar problems by similarity tiers.

    Args:
        similar_problems: List of (Solution, similarity_score) tuples

    Returns:
        Dictionary with keys: "exact", "high", "medium", "low"
    """
    results: dict[str, list[tuple[Solution, float]]] = {
        "exact": [],  # 1.0 (perfect match)
        "high": [],  # >= 0.8
        "medium": [],  # >= 0.5
        "low": [],  # < 0.5
    }

    for solution, score in similar_problems:
        if score >= SIMILARITY_EXACT:
            results["exact"].append((solution, score))
        elif score >= SIMILARITY_HIGH:
            results["high"].append((solution, score))
        elif score >= SIMILARITY_MEDIUM:
            results["medium"].append((solution, score))
        else:
            results["low"].append((solution, score))

    return results


def apply_filters_to_results(
    results: list[tuple[Solution, float]], filters: dict[str, str]
) -> list[tuple[Solution, float]]:
    """Apply filters to similarity search results.

    Args:
        results: List of (Solution, similarity_score) tuples
        filters: Dictionary of filter key-value pairs

    Returns:
        Filtered list of (Solution, similarity_score) tuples
    """
    filtered = []
    for solution, score in results:
        if matches_filters(solution, filters):
            filtered.append((solution, score))
    return filtered


def apply_filters_to_solutions(solutions: list[Solution], filters: dict[str, str]) -> list[Solution]:
    """Apply filters to a list of solutions.

    Args:
        solutions: List of Solution objects
        filters: Dictionary of filter key-value pairs

    Returns:
        Filtered list of Solution objects
    """
    filtered = []
    for solution in solutions:
        if matches_filters(solution, filters):
            filtered.append(solution)
    return filtered


def matches_filters(solution: Solution, filters: dict[str, str]) -> bool:
    """Check if a solution matches all provided filters.

    Args:
        solution: Solution object to check
        filters: Dictionary of filter key-value pairs

    Returns:
        True if solution matches all filters
    """
    for key, value in filters.items():
        if key == "difficulty":
            if solution.difficulty.lower() != value.lower():
                return False
        elif key == "category":
            # Need to find category for this solution
            for cat in category_manager.get_categories():
                if solution in cat.solutions:
                    if cat.slug != value:
                        return False
                    break
        elif key == "complexity" and value.lower() not in solution.time_complexity.lower():
            # Match time complexity (simplified)
            return False

    return True


def enrich_results_with_category(results: dict[str, list[tuple[Solution, float]]]) -> dict[str, list[dict[str, Any]]]:
    """Add category information to search results.

    Args:
        results: Dictionary of similarity tier to list of (Solution, score) tuples

    Returns:
        Dictionary of similarity tier to list of result dictionaries with category info
    """
    enriched: dict[str, list[dict[str, Any]]] = {}

    for tier, tier_results in results.items():
        enriched[tier] = []
        for solution, score in tier_results:
            # Find category for this solution
            category_slug = None
            category_name = None
            for cat in category_manager.get_categories():
                if solution in cat.solutions:
                    category_slug = cat.slug
                    category_name = cat.name
                    break

            enriched[tier].append(
                {"solution": solution, "score": score, "category_slug": category_slug, "category_name": category_name}
            )

    return enriched


def serialize_results(results: dict[str, list[dict[str, Any]]]) -> dict[str, list[dict[str, Any]]]:
    """Serialize results for JSON response.

    Args:
        results: Enriched results dictionary

    Returns:
        Serialized results dictionary
    """
    serialized: dict[str, list[dict[str, Any]]] = {}

    for tier, tier_results in results.items():
        serialized[tier] = []
        for item in tier_results:
            solution = item["solution"]
            serialized[tier].append(
                {
                    "number": solution.number,
                    "name": solution.name,
                    "filename": solution.url_filename,
                    "difficulty": solution.difficulty,
                    "score": item["score"],
                    "category_slug": item["category_slug"],
                    "category_name": item["category_name"],
                }
            )

    return serialized


def execute_search(query: str) -> dict[str, Any]:
    """Execute search and return structured results.

    Args:
        query: Search query string

    Returns:
        Dictionary with search results containing:
        - mode: Search mode (navigate, similar, name_search, filter)
        - data: Mode-specific data
        - error: Error message if any
    """
    from ..search.solution_finder import find_solution_category

    if not query:
        return {"error": "No search query provided", "mode": None}

    # Parse the query to determine search mode
    mode, data = parse_search_query(query)

    # Execute search based on mode
    if mode == "navigate":
        reference_number = data["number"]
        solution = category_manager.find_by_number(reference_number)
        if solution:
            category_info = find_solution_category(solution)
            if category_info:
                cat_slug, cat_name = category_info
                return {
                    "mode": "navigate",
                    "solution": solution,
                    "category_slug": cat_slug,
                    "category_name": cat_name,
                }
        return {"error": f"Problem #{reference_number} not found", "mode": "navigate"}

    elif mode == "similar":
        reference_number = data["number"]
        filters = data.get("filters", {})

        reference = category_manager.find_by_number(reference_number, include_tags=True)
        if not reference:
            return {"error": f"Reference problem #{reference_number} not found", "mode": "similar"}

        similar_problems = category_manager.find_similar_problems(reference_number, min_similarity=MIN_SIMILARITY_SCORE)

        if filters:
            similar_problems = apply_filters_to_results(similar_problems, filters)

        results_tuples = group_by_similarity(similar_problems)
        results = enrich_results_with_category(results_tuples)

        return {"mode": "similar", "reference": reference, "results": results, "filters": filters}

    elif mode == "name_search":
        search_term = data["search_term"]
        filters = data.get("filters", {})

        matching_problems = category_manager.find_by_name(search_term, include_tags=True)

        if filters:
            matching_problems = apply_filters_to_solutions(matching_problems, filters)

        results_tuples = {"exact": [], "high": [(sol, 0.0) for sol in matching_problems], "medium": [], "low": []}
        results = enrich_results_with_category(results_tuples)

        return {"mode": "name_search", "search_term": search_term, "results": results, "filters": filters}

    elif mode == "filter":
        filters = data["filters"]
        all_solutions = category_manager.get_all_solutions(include_tags=True)
        filtered_solutions = apply_filters_to_solutions(all_solutions, filters)

        results_tuples = {"exact": [], "high": [(sol, 0.0) for sol in filtered_solutions], "medium": [], "low": []}
        results = enrich_results_with_category(results_tuples)

        return {"mode": "filter", "results": results, "filters": filters}

    return {"error": "Invalid search query", "mode": None}
