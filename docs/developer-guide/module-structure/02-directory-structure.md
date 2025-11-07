# Directory Structure

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Data Module →](03-data-module.md)

---

## Complete Module Layout

```
src/leet_code/
├── app.py                      # CLI entry point (29 lines)
├── factory.py                  # Flask application factory
│
├── data/                       # DATA MODELS & CONSTANTS
│   ├── __init__.py
│   ├── category_data.py        # Solution/Category models, CategoryManager
│   ├── language_constants.py  # Language metadata & mappings
│   └── markdown_extraction.py # Universal markdown parser
│
├── content/                    # CONTENT PROCESSING
│   ├── __init__.py
│   ├── content_processing.py  # Extraction, parsing, merging
│   └── syntax_highlighting.py # Pygments syntax highlighting
│
├── code_generation/            # CODE GENERATION
│   ├── __init__.py
│   ├── skeleton_generator.py  # Template/skeleton generation
│   └── leetcode_converter.py  # Snake_case to camelCase conversion
│
├── search/                     # SEARCH & DISCOVERY
│   ├── __init__.py
│   ├── search_engine.py        # Query parsing, search execution
│   └── solution_finder.py      # Solution lookup, enrichment
│
└── views/                      # FLASK VIEWS (class-based)
    ├── __init__.py
    ├── main_views.py           # Home, categories, virtual categories
    ├── solution_views.py       # Solution display, downloads, uploads
    ├── search_views.py         # Search interface
    └── api_views.py            # JSON API endpoints
```

## Module Breakdown

### Entry Points

#### `app.py` (29 lines)
- CLI entry point
- Parses command-line arguments
- Runs development server

#### `factory.py`
- Application factory pattern
- Flask app initialization
- Blueprint registration
- Configuration

### Task Modules

#### `data/` - Data Management
**3 files, ~600 lines total**

| File | Purpose | Lines |
|------|---------|-------|
| category_data.py | Models & caching | ~259 |
| language_constants.py | Language metadata | ~150 |
| markdown_extraction.py | Universal parser | ~200 |

#### `content/` - Content Processing
**2 files, ~560 lines total**

| File | Purpose | Lines |
|------|---------|-------|
| content_processing.py | Extract, parse, merge | ~520 |
| syntax_highlighting.py | Pygments themes | ~40 |

#### `code_generation/` - Code Transformation
**2 files**

| File | Purpose |
|------|---------|
| skeleton_generator.py | Multi-language skeletons |
| leetcode_converter.py | Format conversion |

#### `search/` - Search & Discovery
**2 files, ~440 lines total**

| File | Purpose | Lines |
|------|---------|-------|
| search_engine.py | Query parsing, execution | ~303 |
| solution_finder.py | Solution lookup | ~136 |

#### `views/` - HTTP Handlers
**4 files**

| File | Purpose |
|------|---------|
| main_views.py | Home, categories, virtual categories |
| solution_views.py | Solution display, downloads, uploads |
| search_views.py | Search interface |
| api_views.py | JSON API endpoints |

## File Count Summary

- **Entry Points**: 2 files (app.py, factory.py)
- **Data Module**: 3 files
- **Content Module**: 2 files
- **Code Generation Module**: 2 files
- **Search Module**: 2 files
- **Views Module**: 4 files
- **Total**: 15 Python files (excluding __init__.py)

## Lines of Code

- **Entry Points**: ~150 lines
- **Data Module**: ~600 lines
- **Content Module**: ~560 lines
- **Code Generation Module**: ~400 lines
- **Search Module**: ~440 lines
- **Views Module**: ~600 lines
- **Total**: ~2,750 lines

*Note: Down from ~1,686 lines in monolithic app.py plus modules at root*

## Directory Organization Principles

### 1. Flat Module Structure
Each module is one level deep - no nested subdirectories within modules.

### 2. Clear Naming
Module and file names clearly indicate purpose:
- `data/category_data.py` - obvious it's about category data
- `search/search_engine.py` - obvious it's the search engine

### 3. Minimal Files Per Module
Most modules have 2-3 files maximum, making them easy to understand.

### 4. Entry Points Separate
CLI and factory separate from task modules.

### 5. Views Last
Views depend on task modules but task modules don't depend on views.

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Data Module →](03-data-module.md)
