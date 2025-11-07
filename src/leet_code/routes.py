"""Route registration for the Flask application."""

from flask import Flask

from .views import (
    APICategoriesView,
    APICategoryComplexityStatsView,
    APICategoryDifficultyStatsView,
    APICategorySolutionsView,
    APIComplexityByDifficultyView,
    APIComplexityStatsView,
    APIDifficultyByComplexityView,
    APIDifficultyStatsView,
    APISearchView,
    CategoryView,
    ComplexityOverviewView,
    ComplexityPatternView,
    DifficultyLevelView,
    DifficultyOverviewView,
    DocsIndexView,
    DocsReadmeView,
    DocsView,
    DownloadSolutionView,
    IndexView,
    SearchView,
    SolutionLeetCodeView,
    SolutionView,
    UploadSolutionView,
)


def register_routes(app: Flask) -> None:
    """Register all routes with the Flask application.

    Args:
        app: Flask application instance
    """
    # Main views
    app.add_url_rule("/", view_func=IndexView.as_view("index"))
    app.add_url_rule("/category/<category>", view_func=CategoryView.as_view("category_view"))
    app.add_url_rule("/difficulty", view_func=DifficultyOverviewView.as_view("difficulty_overview"))
    app.add_url_rule("/complexity", view_func=ComplexityOverviewView.as_view("complexity_overview"))
    app.add_url_rule("/difficulty/<level>", view_func=DifficultyLevelView.as_view("difficulty_level_view"))
    app.add_url_rule("/complexity/<pattern>", view_func=ComplexityPatternView.as_view("complexity_pattern_view"))

    # Solution views
    app.add_url_rule("/solution/<category>/<filename>", view_func=SolutionView.as_view("solution_view"))
    app.add_url_rule(
        "/solution/<category>/<filename>/leetcode", view_func=SolutionLeetCodeView.as_view("solution_leetcode_view")
    )
    app.add_url_rule(
        "/solution/<category>/<filename>/download/<format>",
        view_func=DownloadSolutionView.as_view("download_solution"),
    )
    app.add_url_rule(
        "/solution/<category>/<filename>/download/<format>/<language>",
        view_func=DownloadSolutionView.as_view("download_solution_lang"),
    )
    app.add_url_rule("/solution/<category>/<filename>/upload", view_func=UploadSolutionView.as_view("upload_solution"))

    # Documentation views
    app.add_url_rule("/docs", view_func=DocsIndexView.as_view("docs_index"))
    app.add_url_rule("/docs/README", view_func=DocsReadmeView.as_view("docs_readme"))
    app.add_url_rule("/docs/<category>", view_func=DocsView.as_view("docs_view"))
    app.add_url_rule("/docs/<category>/<page>", view_func=DocsView.as_view("docs_view_page"))

    # Search views
    app.add_url_rule("/search", view_func=SearchView.as_view("search"))

    # API views
    app.add_url_rule("/api/categories", view_func=APICategoriesView.as_view("api_categories"))
    app.add_url_rule(
        "/api/category/<category>/solutions", view_func=APICategorySolutionsView.as_view("api_category_solutions")
    )
    app.add_url_rule("/api/search", view_func=APISearchView.as_view("api_search"))
    app.add_url_rule("/api/stats/difficulty", view_func=APIDifficultyStatsView.as_view("api_difficulty_stats"))
    app.add_url_rule("/api/stats/complexity", view_func=APIComplexityStatsView.as_view("api_complexity_stats"))
    app.add_url_rule(
        "/api/stats/complexity/difficulty/<level>",
        view_func=APIComplexityByDifficultyView.as_view("api_complexity_by_difficulty"),
    )
    app.add_url_rule(
        "/api/stats/difficulty/complexity/<pattern>",
        view_func=APIDifficultyByComplexityView.as_view("api_difficulty_by_complexity"),
    )
    app.add_url_rule(
        "/api/category/<category>/stats/difficulty",
        view_func=APICategoryDifficultyStatsView.as_view("api_category_difficulty_stats"),
    )
    app.add_url_rule(
        "/api/category/<category>/stats/complexity",
        view_func=APICategoryComplexityStatsView.as_view("api_category_complexity_stats"),
    )
