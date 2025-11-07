# Views Module

[← Previous: Search Module](06-search-module.md) | [🏠 Home](README.md) | [Next: Module Interactions →](08-interactions.md)

---

## Overview

The `views/` module contains all Flask HTTP handlers using class-based views.

**Purpose**: Handle HTTP requests, coordinate task modules, render templates.

## Module Structure

```
views/
├── __init__.py
├── main_views.py       # Home, categories, virtual categories
├── solution_views.py   # Solution display, downloads, uploads
├── search_views.py     # Search interface
└── api_views.py        # JSON API endpoints
```

---

## `main_views.py`

### Key Views

```python
class HomeView(MethodView):
    """Home page with all categories."""

class CategoryView(MethodView):
    """List solutions in a category."""

class DifficultyView(MethodView):
    """Filter by difficulty (Easy/Medium/Hard)."""

class ComplexityView(MethodView):
    """Filter by time/space complexity."""
```

---

## `solution_views.py`

### Key Views

```python
class SolutionView(MethodView):
    """Display solution with problem description and code."""

class SolutionLeetCodeView(MethodView):
    """Display LeetCode format version."""

class DownloadSolution(MethodView):
    """Download skeleton/solution/ZIP."""

class UploadSolution(MethodView):
    """Upload alternative language solution."""

class ViewAlternativeSolution(MethodView):
    """Switch to different language version."""
```

---

## `search_views.py`

### Key Views

```python
class SearchView(MethodView):
    """Search interface and results page."""
```

---

## `api_views.py`

### Key Views

```python
class APICategoriesView(MethodView):
    """GET /api/categories - List all categories."""

class APICategorySolutionsView(MethodView):
    """GET /api/category/<slug>/solutions - Solutions in category."""

class APIStatsView(MethodView):
    """GET /api/stats/* - Difficulty/complexity statistics."""
```

---

[← Previous: Search Module](06-search-module.md) | [🏠 Home](README.md) | [Next: Module Interactions →](08-interactions.md)
