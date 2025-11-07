# Code Generation Module

[← Previous: Content Module](04-content-module.md) | [🏠 Home](README.md) | [Next: Search Module →](06-search-module.md)

---

## Overview

The `code_generation/` module handles all code transformation and generation.

**Purpose**: Generate practice skeletons and convert code formats.

## Module Structure

```
code_generation/
├── __init__.py
├── skeleton_generator.py  # Multi-language template generation
└── leetcode_converter.py  # Snake_case to camelCase conversion
```

---

## `skeleton_generator.py`

### Responsibilities

- Extract method signatures from solutions
- Preserve type annotations
- Add TODO comments for implementation
- Support 7+ languages (Python, JavaScript, TypeScript, Java, C++, Go, Rust)
- Include test case templates

### Key Functions

```python
def generate_skeleton(code: str, solution: Solution, is_leetcode: bool = False) -> str:
    """Generate skeleton code for practicing."""

def generate_python_skeleton(code: str, solution: Solution) -> str:
    """Python-specific skeleton generation."""

def generate_js_skeleton(code: str, solution: Solution) -> str:
    """JavaScript-specific skeleton generation."""
```

---

## `leetcode_converter.py`

### Responsibilities

- Convert snake_case to camelCase for method names
- Extract Solution class from file
- Preserve docstrings and comments
- Transform code format for LeetCode compatibility

### Key Functions

```python
def convert_to_leetcode_format(code: str) -> str:
    """Convert Python solution to LeetCode format (camelCase)."""

def extract_solution_class(code: str) -> str:
    """Extract just the Solution class from file."""
```

---

[← Previous: Content Module](04-content-module.md) | [🏠 Home](README.md) | [Next: Search Module →](06-search-module.md)
