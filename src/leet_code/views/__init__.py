"""Flask class-based views for the Leet Code Learning Tool."""

from .api_views import (
    APICategoriesView,
    APICategoryComplexityStatsView,
    APICategoryDifficultyStatsView,
    APICategorySolutionsView,
    APIComplexityByDifficultyView,
    APIComplexityStatsView,
    APIDifficultyByComplexityView,
    APIDifficultyStatsView,
    APISearchView,
)
from .docs_views import DocsIndexView, DocsReadmeView, DocsView
from .main_views import (
    CategoryView,
    ComplexityOverviewView,
    ComplexityPatternView,
    DifficultyLevelView,
    DifficultyOverviewView,
    IndexView,
)
from .search_views import SearchView
from .solution_views import (
    DownloadSolutionView,
    SolutionLeetCodeView,
    SolutionView,
    UploadSolutionView,
)

__all__ = [
    # Main views
    "IndexView",
    "CategoryView",
    "DifficultyOverviewView",
    "ComplexityOverviewView",
    "DifficultyLevelView",
    "ComplexityPatternView",
    # Solution views
    "SolutionView",
    "SolutionLeetCodeView",
    "DownloadSolutionView",
    "UploadSolutionView",
    # Documentation views
    "DocsIndexView",
    "DocsReadmeView",
    "DocsView",
    # Search views
    "SearchView",
    # API views
    "APICategoriesView",
    "APICategorySolutionsView",
    "APISearchView",
    "APIDifficultyStatsView",
    "APIComplexityStatsView",
    "APIComplexityByDifficultyView",
    "APIDifficultyByComplexityView",
    "APICategoryDifficultyStatsView",
    "APICategoryComplexityStatsView",
]
