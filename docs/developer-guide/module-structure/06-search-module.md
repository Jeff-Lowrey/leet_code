# Search Module

[← Previous: Code Generation Module](05-code-generation-module.md) | [🏠 Home](README.md) | [Next: Views Module →](07-views-module.md)

---

## Overview

The `search/` module handles all search and solution discovery functionality.

**Purpose**: Parse search queries, execute searches, find solutions, and enrich metadata.

## Module Structure

```
search/
├── __init__.py
├── search_engine.py     # Query parsing, search execution (~303 lines, 8 functions)
└── solution_finder.py   # Solution lookup, enrichment (~136 lines, 8 functions)
```

---

## `search_engine.py`

### Search Modes

1. **Navigate**: Direct problem number (e.g., "1", "443")
2. **Name**: Fuzzy text search (e.g., "palindrome")
3. **Similar**: Find related problems (e.g., "1 difficulty=medium")
4. **Filter**: Browse by criteria (e.g., "difficulty=easy category=arrays")

### Key Functions

```python
def parse_search_query(query: str) -> tuple[str, dict[str, Any]]:
    """Parse query and determine search mode."""

def execute_search(query: str) -> dict[str, Any]:
    """Execute search and return structured results."""

def group_by_similarity(similar_problems: list[tuple[Solution, float]]) -> dict[str, list[tuple[Solution, float]]]:
    """Group similar problems by similarity tiers (High/Medium/Low)."""

def filter_solutions(solutions: list[Solution], filters: dict[str, str]) -> list[Solution]:
    """Apply difficulty/category/complexity filters."""
```

---

## `solution_finder.py`

### Responsibilities

- Find solutions by category
- Look up category metadata
- Enrich solutions with additional data
- Generate solution file paths
- Get available alternative languages

### Key Functions

```python
def find_solution_category(solution: Solution) -> tuple[str, str] | None:
    """Find category slug and name for a solution."""

def enrich_solutions_with_category(solutions: list[Solution], extra_fields: dict[str, Any] | None = None) -> list[dict[str, Any]]:
    """Add category metadata and extra fields to solutions."""

def get_solution_path(category_slug: str, filename: str, language: str = "python") -> Path:
    """Get filesystem path for a solution file."""
```

---

[← Previous: Code Generation Module](05-code-generation-module.md) | [🏠 Home](README.md) | [Next: Views Module →](07-views-module.md)
