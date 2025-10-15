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

The Flask application (`src/leet_code/app.py`) follows a functional architecture with clear separation of concerns:

```python
app = Flask(__name__, template_folder="../../templates", static_folder="../../static")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-key-change-in-production")
```

### Key Configuration
- **Template Folder**: `../../templates` (relative to app.py location)
- **Static Folder**: `../../static` (relative to app.py location)
- **Secret Key**: From environment variable or dev default
- **Default Port**: 9501
- **Debug Mode**: Enabled by default (toggle with `--debug` flag)

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

### 1. Docstring Processing

**`extract_problem_description(code: str) -> str | None`**
- Extracts problem description from module docstring
- Removes "Difficulty:" metadata line
- Converts Markdown to HTML
- Location: `app.py:170`

**`parse_docstring_explanation(code: str) -> tuple[str, dict[str, str] | None]`**
- Extracts solution explanation from `<details>` tags
- Parses sections: INTUITION, APPROACH, ALGORITHM, COMPLEXITY
- Returns clean code + explanation dict
- Location: `app.py:36`

### 2. Skeleton Generation

**`generate_skeleton(code: str, solution: Any, is_leetcode: bool = False) -> str`**
- Creates practice template from full solution
- Preserves method signatures with type annotations
- Adds TODO comments for implementation
- Includes test case template
- Location: `app.py:1141`

**`generate_js_skeleton(code: str, solution: Any) -> str`**
- JavaScript version of skeleton generation
- Extracts classes and functions
- Includes JSDoc templates
- Location: `app.py:515`

### 3. Syntax Highlighting

**`create_code_formatter() -> HtmlFormatter[str]`**
- Creates Pygments HTML formatter
- Supports theme switching (light/dark)
- Adds line numbers
- Location: `app.py:834`

**Theme Detection**:
```python
def get_syntax_highlighting_style() -> str:
    theme = request.cookies.get("theme", "light")
    theme_param = request.args.get("theme")
    if theme_param in ["light", "dark"]:
        theme = theme_param
    return "monokai" if theme == "dark" else "default"
```

### 4. Language Support

**Supported Languages**:
- Python (primary)
- JavaScript
- Java
- C++/C
- TypeScript
- Go
- Rust
- C#
- Swift
- And 15+ more

**Lexer Mapping**:
```python
lexers = {
    "Python": PythonLexer(),
    "Java": JavaLexer(),
    "C++": CppLexer(),
    "JavaScript": JavascriptLexer(),
    # ... more lexers
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
