# Flask Architecture

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Data Management →](03-data-management.md)

---

## Table of Contents

- [Application Structure](#application-structure)
- [Route Structure](#route-structure)
- [Request Flow](#request-flow)
- [Core Processing Functions](#core-processing-functions)
- [Template System](#template-system)
- [Jinja2 Filters and Functions](#jinja2-filters-and-functions)
- [Error Handling](#error-handling)
- [Running the Application](#running-the-application)
- [Performance Considerations](#performance-considerations)

## Application Structure

The Flask application follows a **task-oriented module architecture** with clear separation of concerns. The application uses the **application factory pattern** (`factory.py`) for initialization, with modules organized by functionality rather than technical layers.

### Task-Oriented Module Structure

```
src/leet_code/
├── app.py                      # CLI entry point (29 lines)
├── factory.py                  # Flask application factory
│
├── data/                       # DATA MODELS & CONSTANTS
│   ├── category_data.py        # Solution/category models, caching
│   ├── language_constants.py  # Language metadata & mappings
│   └── markdown_extraction.py # Universal markdown parser
│
├── content/                    # CONTENT PROCESSING
│   ├── content_processing.py  # Extraction, parsing, merging
│   └── syntax_highlighting.py # Pygments syntax highlighting
│
├── code_generation/            # CODE GENERATION
│   ├── skeleton_generator.py  # Template/skeleton generation
│   └── leetcode_converter.py  # Snake_case to camelCase conversion
│
├── search/                     # SEARCH & DISCOVERY
│   ├── search_engine.py        # Query parsing, search execution
│   └── solution_finder.py      # Solution lookup, enrichment
│
└── views/                      # FLASK VIEWS (class-based)
    ├── main_views.py           # Home, categories, virtual categories
    ├── solution_views.py       # Solution display, downloads, uploads
    ├── search_views.py         # Search interface
    └── api_views.py            # JSON API endpoints
```

### Key Configuration
- **Application Factory**: `create_app()` in `factory.py`
- **Template Folder**: `../../templates` (relative to factory.py)
- **Static Folder**: `../../static` (relative to factory.py)
- **Secret Key**: From environment variable or dev default
- **Default Port**: 9501
- **Debug Mode**: Enabled by default (toggle with `--debug` flag)

### Module Responsibilities

**data/** - Data models and constants
- Solution/Category dataclasses
- CategoryManager (caching, data loading)
- Language metadata and mappings
- Universal markdown extraction

**content/** - Content extraction and processing
- Extract problem data from code
- Parse explanations into sections
- Merge and reorganize content
- Syntax highlighting with themes

**code_generation/** - Code transformation
- Generate method signature skeletons
- Convert Python snake_case to LeetCode camelCase
- Multi-language skeleton support

**search/** - Search and solution discovery
- Parse search queries (navigate, name, similar, filter modes)
- Execute searches with filtering
- Find solutions and enrich with metadata
- Generate solution paths

**views/** - Flask views (class-based)
- Home page and category browsing
- Solution display and format conversion
- Download and upload handling
- JSON API endpoints

## Route Structure

### Main Routes

| Route | Handler | Purpose |
|-------|---------|---------|
| `/` | `index()` | Homepage with category grid |
| `/category/<category>` | `category_view()` | List solutions in category |
| `/difficulty/<difficulty>` | `difficulty_view()` | Filter by difficulty level |
| `/complexity/<time>/<space>` | `complexity_view()` | Filter by complexity |
| `/solution/<category>/<filename>` | `solution_view()` | View solution details |
| `/solution/<category>/<filename>/leetcode` | `solution_leetcode_view()` | LeetCode format view |
| `/solution/<category>/<filename>/download/<format>` | `download_solution()` | Download solution files |
| `/solution/<category>/<filename>/view/<language>` | `view_alternative_solution()` | View in other languages |
| `/docs` | `docs_index()` | Documentation hub |
| `/docs/<category>` | `docs_view()` | Category documentation |

### API Routes

| Route | Handler | Purpose |
|-------|---------|---------|
| `/api/categories` | `api_categories()` | Get all categories (JSON) |
| `/api/category/<category>/solutions` | `api_category_solutions()` | Get category solutions (JSON) |

## Request Flow

### Homepage Request
```
GET /
  ↓
index()
  ↓
category_manager.get_categories()
  ↓
category_manager.get_statistics()
  ↓
render_template('index.html', ...)
  ↓
HTTP 200 with HTML
```

### Solution View Request
```
GET /solution/arrays-hashing/001-two-sum
  ↓
solution_view(category, filename)
  ↓
category_manager.read_solution_content()  # Read file
  ↓
extract_problem_description()             # Parse docstring
  ↓
parse_docstring_explanation()             # Extract explanation
  ↓
generate_skeleton()                       # Create practice template
  ↓
highlight(code, PythonLexer(), formatter) # Syntax highlighting
  ↓
render_template('solution.html', ...)
  ↓
HTTP 200 with HTML
```

### Download Request
```
GET /solution/arrays-hashing/001-two-sum/download/both
  ↓
download_solution(category, filename, format='both')
  ↓
generate_skeleton()                       # Create skeleton
  ↓
convert_to_leetcode_format()              # LeetCode version
  ↓
zipfile.ZipFile()                         # Bundle files
  ↓
HTTP 200 with application/zip
```

## Core Processing Functions

### 1. Content Processing (`content/content_processing.py`)

**`extract_all_problem_data(code: str, file_extension: str) -> tuple[str, ProblemData]`**
- Main extraction orchestrator using language-agnostic parsing
- Extracts problem data from any supported language
- Returns clean code + complete problem data structure
- Uses unified markdown extraction system

**`parse_problem_markdown(markdown_content: str) -> str | None`**
- Parses problem description from markdown content
- Removes metadata (difficulty, problem number)
- Converts Markdown to HTML
- Works for all languages

**`parse_explanation_into_sections(content: str) -> dict[str, str]`**
- Extracts solution explanation from `<details>` tags
- Parses sections: INTUITION, APPROACH, COMPLEXITY, and optional sections
- Returns section dictionary with HTML-rendered content
- Supports optional sections (EDGE CASES, WHY THIS WORKS, etc.)

**`merge_and_reorganize_content(documentation: str | None, explanation: str | None) -> str | None`**
- Merges problem description and explanation
- Removes duplicate content
- Creates logical flow for display

### 2. Skeleton Generation (`code_generation/skeleton_generator.py`)

**`generate_skeleton(code: str, solution: Any, is_leetcode: bool = False) -> str`**
- Creates practice template from full solution
- Preserves method signatures with type annotations
- Adds TODO comments for implementation
- Includes test case template
- Supports Python, JavaScript, Java, C++, Go, Rust, TypeScript

**Multi-Language Support**:
- Python: Preserves type hints, docstrings
- JavaScript/TypeScript: Preserves JSDoc, type annotations
- Java: Preserves method signatures, Javadoc
- C++: Preserves function signatures, Doxygen
- Go: Preserves function signatures, comments
- Rust: Preserves ownership/borrowing in signatures

### 3. Syntax Highlighting (`content/syntax_highlighting.py`)

**`create_code_formatter() -> HtmlFormatter[str]`**
- Creates Pygments HTML formatter
- Supports theme switching (light/dark)
- Adds line numbers
- Configurable styles

**`get_syntax_highlighting_style() -> str`**
- Detects theme from cookies or request parameters
- Returns appropriate Pygments style
- Supports light ("default") and dark ("monokai") themes

**Theme Detection Flow**:
```python
def get_syntax_highlighting_style() -> str:
    theme = request.cookies.get("theme", "light")
    theme_param = request.args.get("theme")
    if theme_param in ["light", "dark"]:
        theme = theme_param
    return "monokai" if theme == "dark" else "default"
```

### 4. Language Support (`data/language_constants.py`)

**Supported Languages**:
- Python, JavaScript, TypeScript
- Java, C++, C, C#
- Go, Rust, Swift, Kotlin, Scala
- And more (13+ languages)

**Language Configuration**:
- Language metadata (extensions, names, icons, comment styles)
- File extension mappings
- Pygments lexer configuration
- Comment block formats for markdown extraction

**LANGUAGE_MAP Structure**:
```python
LANGUAGE_MAP = {
    'python': {
        'name': 'Python',
        'extension': '.py',
        'pygments_lexer': 'python',
        'comment_style': 'docstring',  # """..."""
        # ... more metadata
    },
    'javascript': {
        'name': 'JavaScript',
        'extension': '.js',
        'pygments_lexer': 'javascript',
        'comment_style': 'jsdoc',  # /** ... */
        # ... more metadata
    },
    # ... more languages
}
```

## Template System

### Base Template (`templates/base.html`)
Provides common structure:
- Header with navigation
- Category sidebar
- Main content area
- Footer
- JavaScript includes

### Template Inheritance
```jinja2
{% extends "base.html" %}

{% block title %}Solution: {{ problem_name }}{% endblock %}

{% block content %}
    <!-- Solution-specific content -->
{% endblock %}
```

### Key Templates
- `index.html`: Homepage with category cards
- `category.html`: Category solution list
- `solution.html`: Solution detail view
- `difficulty.html`: Difficulty-filtered view
- `complexity.html`: Complexity-filtered view
- `doc_view.html`: Documentation viewer
- `404.html`: Error page

## Jinja2 Filters and Functions

### Custom Filters
```jinja2
{{ problem_name|title }}           {# Title case #}
{{ category|replace("-", " ") }}   {# Format slug #}
{{ code|safe }}                    {# Render HTML #}
```

### Template Variables
Common variables passed to templates:
- `category`: Category slug
- `category_name`: Formatted category name
- `problem_number`: Solution number
- `problem_name`: Solution name
- `code`: Highlighted code HTML
- `skeleton_code`: Highlighted skeleton HTML
- `explanation`: Explanation sections dict
- `difficulty`: Easy/Medium/Hard
- `time_complexity`: Big-O time
- `space_complexity`: Big-O space

## Error Handling

### 404 Handler
```python
@app.errorhandler(404)
def not_found(error: Any) -> tuple[str, int]:
    return render_template("404.html"), 404
```

### File Not Found
```python
if not solution_code:
    abort(404)
```

### Invalid Downloads
```python
if format not in ["skeleton", "solution", "leetcode", "both"]:
    abort(400)  # Bad request
```

## Running the Application

### Development Server
```bash
# Default (localhost:9501)
python -m src.leet_code.app

# Custom host/port
python -m src.leet_code.app --host 0.0.0.0 --port 8080

# Disable debug mode
python -m src.leet_code.app --debug false
```

### With PDM
```bash
# Using PDM scripts
pdm run flask

# Or direct run
pdm run python -m src.leet_code.app
```

### Command-Line Arguments
```python
parser.add_argument("--host", default="127.0.0.1")
parser.add_argument("--port", type=int, default=9501)
parser.add_argument("--debug", action="store_true", default=True)
```

## Performance Considerations

### Caching
- CategoryManager caches category data after first scan
- Force refresh: `category_manager.refresh()`
- Automatic discovery of new solutions

### File I/O
- Solutions read on-demand (not preloaded)
- Documentation cached by Flask in debug mode
- Static files served directly by Flask

### Optimization Opportunities
1. Add Redis/Memcached for solution caching
2. Pre-generate highlighted code
3. Lazy-load categories on homepage
4. Implement pagination for large categories
5. Add CDN for static assets

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Data Management →](03-data-management.md)
