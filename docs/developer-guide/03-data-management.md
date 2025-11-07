# Data Management

[← Previous: Flask Architecture](02-flask-architecture.md) | [🏠 Home](README.md) | [Next: Template System →](04-template-system.md)

---

> **📌 Note**: This document describes the data management system. For the **current task-oriented module structure**, see [Module Structure Guide](module-structure/README.md), specifically the [Data Module](module-structure/03-data-module.md) section.

## Table of Contents

- [Overview](#overview)
- [CategoryManager Class](#categorymanager-class)
- [Category Data Structure](#category-data-structure)
- [Solution Discovery](#solution-discovery)
- [Metadata Extraction](#metadata-extraction)
- [Alternative Languages](#alternative-languages)
- [Data Access Patterns](#data-access-patterns)
- [Performance Optimization](#performance-optimization)

## Overview

The `data/category_data.py` module provides centralized data management for all categories and solutions in the project. It handles automatic discovery, metadata parsing, and efficient data access.

For detailed information about the data module's role in the task-oriented architecture, see [Data Module Documentation](module-structure/03-data-module.md).

## Data Classes

### Category Dataclass

```python
@dataclass
class Category:
    """Represents a solution category with metadata."""
    slug: str                           # URL-friendly name (e.g., "arrays-hashing")
    name: str                           # Display name (e.g., "Arrays Hashing")
    description: str                    # Category description
    solutions: list["Solution"] = []    # List of solutions

    @property
    def count(self) -> int:
        """Return the number of solutions in this category."""
        return len(self.solutions)
```

**Example**:
```python
category = Category(
    slug="arrays-hashing",
    name="Arrays & Hashing",
    description="Fundamental data structure problems...",
    solutions=[...]
)
print(category.count)  # 25 solutions
```

### Solution Dataclass

```python
@dataclass
class Solution:
    """Represents a single solution with metadata."""
    filename: str              # e.g., "001-two-sum.py"
    name: str                  # e.g., "Two Sum"
    number: str = ""           # e.g., "001"
    slug: str = ""             # e.g., "two-sum"
    difficulty: str = ""       # "Easy", "Medium", or "Hard"
    time_complexity: str = ""  # e.g., "O(n)"
    space_complexity: str = "" # e.g., "O(n)"

    def __post_init__(self) -> None:
        """Process filename to extract metadata."""
        # Auto-extracts number and slug from filename
```

**Filename Parsing**:
```python
# Input: "042-trapping-water.py"
solution = Solution(filename="042-trapping-water.py", name="")

# After __post_init__:
solution.number  # "042"
solution.slug    # "trapping-water"
solution.name    # "Trapping Water" (generated from slug)
```

## CategoryManager Class

### Initialization

```python
class CategoryManager:
    def __init__(self, base_dir: Path | None = None):
        self.base_dir = base_dir or Path(__file__).parent.parent.parent
        self.solutions_dir = self.base_dir / "docs" / "solutions"
        self.docs_dir = self.base_dir / "docs"
        self._categories: list[Category] | None = None
```

**Directory Structure**:
```
base_dir (leet_code/)
├── docs/
│   └── solutions/          # solutions_dir
│       ├── arrays-hashing/
│       ├── dynamic-programming/
│       └── ...
└── docs/                   # docs_dir
    ├── user-guide/
    └── upload-guide/
```

### Core Methods

#### 1. Get All Categories

```python
def get_categories(self, force_refresh: bool = False) -> list[Category]:
    """Get all categories with their solutions."""
```

**Process**:
1. Check cache (`self._categories`)
2. Scan `solutions_dir` for directories
3. For each directory:
   - Create Category object
   - Scan for `.py` files
   - Parse metadata from each file
   - Create Solution objects
   - Add to category
4. Sort categories alphabetically
5. Cache results
6. Return categories list

**Example**:
```python
manager = CategoryManager()
categories = manager.get_categories()

for cat in categories:
    print(f"{cat.name}: {cat.count} solutions")

# Output:
# Arrays & Hashing: 25 solutions
# Backtracking: 15 solutions
# Binary Search: 12 solutions
# ...
```

#### 2. Get Specific Category

```python
def get_category(self, slug: str) -> Category | None:
    """Get a specific category by slug."""
```

**Example**:
```python
category = manager.get_category("arrays-hashing")
if category:
    print(category.name)  # "Arrays & Hashing"
    print(category.solutions[0].name)  # "Two Sum"
```

#### 3. Get Specific Solution

```python
def get_solution(self, category_slug: str, filename: str) -> Solution | None:
    """Get a specific solution by category and filename."""
```

**Example**:
```python
solution = manager.get_solution("arrays-hashing", "001-two-sum.py")
if solution:
    print(solution.name)        # "Two Sum"
    print(solution.difficulty)  # "Easy"
    print(solution.time_complexity)  # "O(n)"
```

#### 4. Read Solution Content

```python
def read_solution_content(self, category_slug: str, filename: str) -> str | None:
    """Read the content of a solution file."""
```

**Example**:
```python
code = manager.read_solution_content("arrays-hashing", "001-two-sum.py")
if code:
    print(code[:100])  # First 100 characters
```

#### 5. Read Documentation

```python
def read_documentation(self, category_slug: str, doc_name: str | None = None) -> str | None:
    """Read documentation file for a category."""
```

**Example**:
```python
# Read category README
readme = manager.read_documentation("arrays-hashing")

# Read specific doc
guide = manager.read_documentation("arrays-hashing", "introduction")
```

#### 6. Get Statistics

```python
def get_statistics(self) -> dict[str, int]:
    """Get overall statistics."""
```

**Returns**:
```python
{
    "total_categories": 29,
    "total_solutions": 298,
    "average_per_category": 10
}
```

#### 7. Force Refresh

```python
def refresh(self) -> None:
    """Force refresh of cached data."""
```

Clears cache and re-scans filesystem. Use after:
- Adding new solutions
- Modifying solution files
- Changing category structure

## Metadata Parsing

### `_parse_solution_metadata()`

Extracts metadata from solution file content:

```python
def _parse_solution_metadata(self, file_path: Path) -> tuple[str, str, str]:
    """Parse difficulty and complexity from solution file.

    Returns:
        Tuple of (difficulty, time_complexity, space_complexity)
    """
```

**Difficulty Patterns**:
```python
difficulty_patterns = [
    r"(?:Difficulty:|#)\s*(Easy|Medium|Hard)",
    r"^(Easy|Medium|Hard)\s*$"
]
```

**Example Match**:
```python
# In solution file:
"""
Difficulty: Medium
"""
# Extracted: "Medium"
```

**Time Complexity Patterns**:
```python
time_patterns = [
    r"Time Complexity:\s*(\*\*)?O\([^)]+\)(\*\*)?",
    r"TIME COMPLEXITY:\s*(\*\*)?O\([^)]+\)(\*\*)?",
    r"Time:\s*(\*\*)?O\([^)]+\)(\*\*)?"
]
```

**Example Match**:
```python
# In solution file:
"""
Time Complexity: O(n log n)
"""
# Extracted: "O(n log n)"
```

**Space Complexity Patterns**:
```python
space_patterns = [
    r"Space Complexity:\s*(\*\*)?O\([^)]+\)(\*\*)?",
    r"SPACE COMPLEXITY:\s*(\*\*)?O\([^)]+\)(\*\*)?",
    r"Space:\s*(\*\*)?O\([^)]+\)(\*\*)?"
]
```

## Category Descriptions

The `DESCRIPTIONS` dict maps category slugs to descriptions:

```python
DESCRIPTIONS = {
    "arrays-hashing": "Fundamental data structure problems using arrays and hash tables...",
    "backtracking": "Explore all possibilities systematically...",
    "binary-search": "Efficiently find targets in sorted data...",
    # ... 29 categories total
}
```

**Usage**:
```python
description = CategoryManager.DESCRIPTIONS.get(
    category_slug,
    "Collection of algorithm problems and solutions."  # Default
)
```

## Singleton Instance

The module provides a global singleton instance:

```python
# Singleton instance for easy import
category_manager = CategoryManager()
```

**Usage in Flask App**:
```python
from .category_data import category_manager

@app.route("/")
def index():
    categories = category_manager.get_categories()
    stats = category_manager.get_statistics()
    return render_template("index.html", ...)
```

## File System Organization

### Expected Structure

```
docs/solutions/
├── arrays-hashing/
│   ├── 001-two-sum.py
│   ├── 002-valid-anagram.py
│   ├── 003-contains-duplicate.py
│   └── alternatives/
│       ├── 001-two-sum.js
│       └── 002-valid-anagram.js
├── dynamic-programming/
│   ├── 070-climbing-stairs.py
│   └── 300-longest-increasing-subsequence.py
└── ...
```

### Naming Conventions

**Category Folders**:
- Lowercase with hyphens
- Match DESCRIPTIONS keys
- Examples: `arrays-hashing`, `dynamic-programming`

**Solution Files**:
- Format: `{number}-{name}.py`
- Number: 3 digits (001, 042, 300)
- Name: Lowercase with hyphens
- Examples: `001-two-sum.py`, `042-trapping-water.py`

**Alternative Languages**:
- Location: `{category}/alternatives/`
- Format: `{number}-{name}.{ext}`
- Examples: `001-two-sum.js`, `042-trapping-water.cpp`

## Performance Characteristics

### Caching Strategy
- **First Call**: Scans filesystem (~50-100ms for 298 solutions)
- **Subsequent Calls**: Returns cached data (~1-2ms)
- **Memory**: ~50KB for 298 solutions

### Refresh Overhead
- Full rescan required after structural changes
- Automatic discovery of new files
- No hot-reloading (manual refresh needed)

## Usage Examples

### Complete Example

```python
from category_data import category_manager

# Get all categories
categories = category_manager.get_categories()
print(f"Total: {len(categories)} categories")

# Get specific category
arrays = category_manager.get_category("arrays-hashing")
print(f"Arrays & Hashing: {arrays.count} solutions")

# Iterate solutions
for solution in arrays.solutions:
    print(f"{solution.number}. {solution.name} ({solution.difficulty})")
    print(f"  Time: {solution.time_complexity}")
    print(f"  Space: {solution.space_complexity}")

# Get solution details
solution = category_manager.get_solution("arrays-hashing", "001-two-sum.py")
code = category_manager.read_solution_content("arrays-hashing", "001-two-sum.py")

# Get statistics
stats = category_manager.get_statistics()
print(f"Total Solutions: {stats['total_solutions']}")
print(f"Average per Category: {stats['average_per_category']}")

# Force refresh (after adding new solution)
category_manager.refresh()
```

---

[← Previous: Flask Architecture](02-flask-architecture.md) | [🏠 Home](README.md) | [Next: Template System →](04-template-system.md)
