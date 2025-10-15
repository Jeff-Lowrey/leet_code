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

## Key Components

### 1. Flask Application (`src/leet_code/app.py`)
The main web application providing:
- Route handlers for all views
- Solution parsing and rendering
- Syntax highlighting with Pygments
- Markdown processing
- Skeleton code generation
- Download functionality (skeleton, solution, LeetCode format, ZIP bundles)

**Lines of Code**: ~1686 lines

### 2. Category Manager (`src/leet_code/category_data.py`)
Centralized data management system:
- `Category` dataclass: Represents solution categories
- `Solution` dataclass: Represents individual solutions
- `CategoryManager` class: Manages all categories and solutions
- Automatic metadata parsing (difficulty, complexity)
- File system scanning and caching

**Lines of Code**: ~259 lines

### 3. LeetCode Converter (`src/leet_code/leetcode_converter.py`)
Converts Python solutions between formats:
- Snake_case → camelCase for LeetCode submissions
- Extracts Solution class for clean downloads
- Preserves docstrings and comments

### 4. Templates Directory
Jinja2 templates for all views:
- Base layout with navigation
- Homepage with category grid
- Category views with solution lists
- Solution views with code display
- Download and upload interfaces

### 5. Static Assets
CSS and JavaScript for:
- Responsive design
- Syntax highlighting themes
- Interactive features
- Navigation components

## Architecture Overview

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP Request
       ↓
┌─────────────────────────────────────┐
│         Flask Application           │
│          (app.py)                   │
│                                     │
│  ┌──────────────────────────────┐  │
│  │  Route Handlers              │  │
│  │  - index()                   │  │
│  │  - category_view()           │  │
│  │  - solution_view()           │  │
│  │  - download_solution()       │  │
│  └────────┬─────────────────────┘  │
│           │                         │
│           ↓                         │
│  ┌──────────────────────────────┐  │
│  │  CategoryManager             │  │
│  │  - get_categories()          │  │
│  │  - get_solution()            │  │
│  │  - read_solution_content()   │  │
│  └────────┬─────────────────────┘  │
│           │                         │
│           ↓                         │
│  ┌──────────────────────────────┐  │
│  │  Processing Pipeline         │  │
│  │  - Parse docstring           │  │
│  │  - Extract explanation       │  │
│  │  - Generate skeleton         │  │
│  │  - Syntax highlight          │  │
│  └────────┬─────────────────────┘  │
│           │                         │
│           ↓                         │
│  ┌──────────────────────────────┐  │
│  │  Template Rendering          │  │
│  │  (Jinja2)                    │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
       │ HTML Response
       ↓
┌──────────────┐
│   Browser    │
└──────────────┘
```

## Data Flow

### Solution Display Flow
1. User navigates to solution page
2. Flask routes request to `solution_view()` handler
3. `CategoryManager` reads solution file from `docs/solutions/{category}/{filename}.py`
4. `parse_docstring_explanation()` extracts problem description and explanation
5. `generate_skeleton()` creates practice template
6. Pygments highlights code with syntax coloring
7. Jinja2 renders `solution.html` template
8. Browser displays formatted solution

### Download Flow
1. User clicks download button
2. Request routes to `download_solution()` with format parameter
3. For "both" format: Creates ZIP with skeleton + solution + LeetCode format
4. For single format: Generates appropriate content
5. Returns file as downloadable response

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
