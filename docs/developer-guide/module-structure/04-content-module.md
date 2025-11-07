# Content Module

[← Previous: Data Module](03-data-module.md) | [🏠 Home](README.md) | [Next: Code Generation Module →](05-code-generation-module.md)

---

## Table of Contents

- [Overview](#overview)
- [Module Structure](#module-structure)
- [`content_processing.py`](#content_processingpy)
- [`syntax_highlighting.py`](#syntax_highlightingpy)

## Overview

The `content/` module handles all content extraction, parsing, and formatting operations.

**Purpose**: Extract problem data, parse explanations, merge content, and apply syntax highlighting.

## Module Structure

```
content/
├── __init__.py
├── content_processing.py  # Extraction, parsing, merging (13 functions, ~520 lines)
└── syntax_highlighting.py # Pygments syntax highlighting (~40 lines)
```

---

## `content_processing.py`

**Lines**: ~520 | **Functions**: 13

### Key Functions

#### extract_all_problem_data
```python
def extract_all_problem_data(code: str, file_extension: str) -> tuple[str, ProblemData]:
    """
    Main extraction orchestrator using language-agnostic parsing.
    Returns (clean_code, problem_data).
    """
```

#### parse_problem_markdown
```python
def parse_problem_markdown(markdown_content: str) -> str | None:
    """
    Parse problem description, remove metadata, convert to HTML.
    """
```

#### parse_explanation_into_sections
```python
def parse_explanation_into_sections(content: str) -> dict[str, str]:
    """
    Parse explanation from <details> tag into section dict.
    Returns: {"intuition": "...", "approach": "...", "complexity": "..."}
    """
```

#### merge_and_reorganize_content
```python
def merge_and_reorganize_content(documentation: str | None, explanation: str | None) -> str | None:
    """
    Merge problem description and explanation, remove duplicates.
    """
```

### Processing Flow

1. Extract markdown from code (`data/markdown_extraction.py`)
2. Parse problem description (this module)
3. Parse explanation sections (this module)
4. Merge and clean content (this module)
5. Return ready-to-display HTML

---

## `syntax_highlighting.py`

**Lines**: ~40

### Key Functions

#### get_syntax_highlighting_style
```python
def get_syntax_highlighting_style() -> str:
    """
    Detect theme (light/dark) from cookies/request and return Pygments style name.
    """
```

#### create_code_formatter
```python
def create_code_formatter() -> HtmlFormatter[str]:
    """
    Create HTML formatter with appropriate theme.
    """
```

### Themes

- **Light**: "default" Pygments style
- **Dark**: "monokai" Pygments style

---

[← Previous: Data Module](03-data-module.md) | [🏠 Home](README.md) | [Next: Code Generation Module →](05-code-generation-module.md)
