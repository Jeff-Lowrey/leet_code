# Overview

[🏠 Home](README.md) | [Next: Flask Architecture →](02-flask-architecture.md)

---

## Table of Contents

- [Project Purpose](#project-purpose)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Quality Standards](#code-quality-standards)
- [Getting Started](#getting-started)

## Project Purpose

The LeetCode Learning Tool is a Flask-based web application designed to help developers learn and practice coding interview problems. It provides an intuitive interface for browsing, viewing, and downloading solutions across 29 algorithm categories.

## Key Components (Task-Oriented Architecture)

The application is organized around **functional tasks** rather than technical layers. Each module contains all code related to a specific activity.

### 1. Data Module (`src/leet_code/data/`)
Centralized data models and constants:
- **`category_data.py`**: Solution/Category dataclasses, CategoryManager with caching
- **`language_constants.py`**: Language metadata (13+ languages), file extensions, comment styles
- **`markdown_extraction.py`**: Universal language-agnostic markdown parser

**Key Features**: File system scanning, metadata extraction, language detection

### 2. Content Module (`src/leet_code/content/`)
Content extraction and processing:
- **`content_processing.py`**: Extract problem data, parse explanations, merge content (13 functions)
- **`syntax_highlighting.py`**: Pygments syntax highlighting with theme support

**Key Features**: Markdown to HTML conversion, section parsing, content organization

### 3. Code Generation Module (`src/leet_code/code_generation/`)
Code transformation and generation:
- **`skeleton_generator.py`**: Generate practice templates for all languages
- **`leetcode_converter.py`**: Convert Python snake_case to camelCase

**Key Features**: Multi-language skeleton generation, format conversion

### 4. Search Module (`src/leet_code/search/`)
Search and solution discovery:
- **`search_engine.py`**: Parse queries, execute searches, filter results (8 functions)
- **`solution_finder.py`**: Solution lookup, category enrichment, path generation

**Key Features**: Multi-mode search (navigate, name, similar, filter), similarity grouping

### 5. Views Module (`src/leet_code/views/`)
Flask views (class-based):
- **`main_views.py`**: Home page, categories, virtual categories
- **`solution_views.py`**: Solution display, downloads, uploads
- **`search_views.py`**: Search interface and results
- **`api_views.py`**: JSON API endpoints

**Key Features**: RESTful routing, template rendering, file handling

### 6. Application Factory (`src/leet_code/factory.py`)
Flask application initialization:
- Application factory pattern
- Blueprint registration
- Configuration management

### 7. Templates & Static Assets
Jinja2 templates and frontend:
- Base layout with navigation
- Category and solution views
- CSS styling and JavaScript interactivity

## Architecture Overview (Task-Oriented)

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP Request
       ↓
┌─────────────────────────────────────────────────┐
│         Flask Views (views/)                    │
│  ┌──────────────┐  ┌──────────────────────┐    │
│  │ main_views   │  │ solution_views       │    │
│  │ search_views │  │ api_views            │    │
│  └──────┬───────┘  └──────────┬───────────┘    │
└─────────┼──────────────────────┼────────────────┘
          │                      │
          ↓                      ↓
┌─────────────────────┐  ┌─────────────────────┐
│  DATA MODULE        │  │  SEARCH MODULE      │
│  ├─ category_data   │  │  ├─ search_engine   │
│  ├─ language_const  │  │  └─ solution_finder │
│  └─ markdown_extract│  └─────────────────────┘
└──────────┬──────────┘
           │
           ↓
┌──────────────────────────────────────────────┐
│  CONTENT MODULE                              │
│  ├─ content_processing (extract, parse)     │
│  └─ syntax_highlighting (theme, format)     │
└──────────┬───────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────┐
│  CODE GENERATION MODULE                      │
│  ├─ skeleton_generator (multi-lang)         │
│  └─ leetcode_converter (format convert)     │
└──────────┬───────────────────────────────────┘
           │
           ↓
┌──────────────────────────────────────────────┐
│  Template Rendering (Jinja2)                │
└──────────┬───────────────────────────────────┘
           │ HTML Response
           ↓
       ┌─────────────┐
       │   Browser   │
       └─────────────┘
```

## Data Flow (Task-Oriented Modules)

### Solution Display Flow
1. User navigates to solution page
2. Flask routes request to `solution_views.py` handler
3. `CategoryManager` (data/category_data.py) reads solution file
4. `extract_all_problem_data()` (content/content_processing.py) extracts:
   - Uses `extract_markdown_from_code()` (data/markdown_extraction.py)
   - Parses problem description and explanation sections
   - Returns clean code + problem data
5. `generate_skeleton()` (code_generation/skeleton_generator.py) creates practice template
6. `highlight()` (content/syntax_highlighting.py) applies syntax coloring
7. Jinja2 renders `solution.html` template
8. Browser displays formatted solution

### Search Flow
1. User enters search query
2. Flask routes to `search_views.py` handler
3. `execute_search()` (search/search_engine.py):
   - Parses query to determine mode (navigate, name, similar, filter)
   - Queries CategoryManager for matching solutions
   - Groups results by similarity if needed
4. `enrich_solutions_with_category()` (search/solution_finder.py) adds metadata
5. Renders search results template
6. Browser displays matching solutions

### Download Flow
1. User clicks download button
2. Request routes to `solution_views.py` with format parameter
3. `generate_skeleton()` (code_generation/skeleton_generator.py) creates skeleton
4. `convert_to_leetcode_format()` (code_generation/leetcode_converter.py) for LeetCode version
5. For "both" format: Creates ZIP with all variants
6. Returns file as downloadable response

## Development Workflow

### Adding a New Solution
1. Create solution file in `docs/solutions/{category}/{number}-{name}.py`
2. Follow [SOLUTION_FORMATTING_GUIDE.md](../upload-guide/SOLUTION_FORMATTING_GUIDE.md)
3. CategoryManager auto-discovers on next request
4. Solution appears in category view
5. All download formats generated automatically

### Adding a New Feature
1. Define route in `app.py`
2. Create/modify templates in `templates/`
3. Add static assets if needed (CSS/JS)
4. Update documentation
5. Run quality checks (see Section 7)

## Technology Choices

### Why Flask?
- Lightweight and flexible
- Excellent for learning tools
- Easy to extend
- Great template system with Jinja2

### Why PDM?
- Modern Python package manager
- Better dependency resolution than pip
- Lock file for reproducible builds
- Virtual environment management

### Why Pygments?
- Industry-standard syntax highlighter
- Supports 500+ languages
- Customizable themes
- HTML output with CSS classes

### Why Markdown?
- Human-readable format
- Easy to write documentation
- Converts to HTML for display
- Supports code blocks and tables

---

## Appendix: Project Structure

```
leet_code/
├── README.md                       # Main project documentation
├── CHANGELOG.md                    # Version history
├── pyproject.toml                  # PDM configuration
├── pdm.lock                        # Dependency lock file
│
├── src/
│   └── leet_code/                  # Application source
│       ├── app.py                  # Flask application (main entry point)
│       ├── category_data.py        # Solution data management
│       └── leetcode_converter.py   # Snake_case to camelCase converter
│
├── docs/                           # Documentation hub
│   ├── README.md                   # Documentation overview
│   ├── solutions/                  # Problem solutions (298+)
│   │   ├── arrays-hashing/         # Category folders (29 categories)
│   │   │   ├── 001-two-sum.py     # Python solutions
│   │   │   └── alternatives/       # Other language solutions
│   │   └── templates/              # Solution templates
│   ├── user-guide/                 # User documentation
│   ├── upload-guide/               # Contributor documentation
│   └── developer-guide/            # This guide
│
├── templates/                      # Jinja2 HTML templates
│   ├── base.html                   # Base layout
│   ├── index.html                  # Homepage
│   └── solution.html               # Solution view
│
└── static/                         # Static assets
    ├── css/
    └── js/
```

---

[🏠 Home](README.md) | [Next: Flask Architecture →](02-flask-architecture.md)
