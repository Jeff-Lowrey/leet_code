# System Architecture

[← Previous: Language Support](08-language-support/README.md) | [🏠 Home](README.md) | [Next: Testing Languages →](10-testing-languages.md)

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Component Interactions](#component-interactions)
- [Data Flow](#data-flow)
- [Request Lifecycle](#request-lifecycle)
- [Multi-Language System](#multi-language-system)
- [Caching Strategy](#caching-strategy)
- [Extension Points](#extension-points)

## Architecture Overview

The LeetCode Learning Tool follows a layered architecture pattern with clear separation of concerns:

```
┌────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐               │
│  │  Templates │  │    CSS     │  │ JavaScript │               │
│  │  (Jinja2)  │  │  Styling   │  │  Interac.  │               │
│  └────────────┘  └────────────┘  └────────────┘               │
└─────────────────────────┬──────────────────────────────────────┘
                          │
┌─────────────────────────┴──────────────────────────────────────┐
│                      Application Layer                          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Flask Routes (app.py)                       │  │
│  │  - index()            - solution_view()                  │  │
│  │  - category_view()    - download_*()                     │  │
│  │  - difficulty_view()  - upload_solution()                │  │
│  └────────────┬─────────────────────────┬───────────────────┘  │
│               │                         │                       │
│  ┌────────────┴────────────┐  ┌────────┴──────────────────┐   │
│  │  Solution Processing    │  │  File Operations          │   │
│  │  - Parse docstrings     │  │  - Read/Write files       │   │
│  │  - Extract metadata     │  │  - Generate downloads     │   │
│  │  - Generate skeletons   │  │  - Validate uploads       │   │
│  └─────────────────────────┘  └───────────────────────────┘   │
└─────────────────────────┬──────────────────────────────────────┘
                          │
┌─────────────────────────┴──────────────────────────────────────┐
│                       Business Logic Layer                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           CategoryManager (category_data.py)             │  │
│  │  - Category and Solution dataclasses                     │  │
│  │  - File system scanning and caching                      │  │
│  │  - Metadata extraction and indexing                      │  │
│  │  - Language detection and mapping                        │  │
│  └────────────┬─────────────────────────┬───────────────────┘  │
│               │                         │                       │
│  ┌────────────┴────────────┐  ┌────────┴──────────────────┐   │
│  │  LeetCode Converter     │  │  Syntax Highlighting      │   │
│  │  - Format conversion    │  │  - Pygments integration   │   │
│  │  - Code transformation  │  │  - Multi-language support │   │
│  └─────────────────────────┘  └───────────────────────────┘   │
└─────────────────────────┬──────────────────────────────────────┘
                          │
┌─────────────────────────┴──────────────────────────────────────┐
│                         Data Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │   Solution   │  │   Templates  │  │    Static    │         │
│  │    Files     │  │    Files     │  │    Assets    │         │
│  │  (*.py, etc) │  │  (*.html)    │  │  (CSS, JS)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────────────────────────────────────────────────────────┘
```

## Component Interactions

### Core Components

**1. Flask Application (app.py)**
- **Responsibilities:**
  - Handle HTTP requests and responses
  - Route URL patterns to handlers
  - Render templates with context data
  - Coordinate between components
  - Manage file uploads and downloads

- **Dependencies:**
  - CategoryManager for data access
  - Pygments for syntax highlighting
  - Jinja2 for templating
  - Python-Markdown for rendering

**2. CategoryManager (category_data.py)**
- **Responsibilities:**
  - Scan and index solution files
  - Parse solution metadata
  - Cache category and solution data
  - Provide data access interface
  - Detect and map languages

- **Dependencies:**
  - File system access
  - Solution file parsers
  - Language configuration

**3. LeetCode Converter (leetcode_converter.py)**
- **Responsibilities:**
  - Convert between naming conventions
  - Extract solution classes
  - Transform code format
  - Preserve documentation

- **Dependencies:**
  - Python AST parser
  - Code transformation utilities

### Interaction Patterns

**Request → Response Flow:**
```
User Request
    ↓
Flask Route Handler
    ↓
CategoryManager.get_solution()
    ↓
Parse Solution Content
    ↓
Extract Metadata
    ↓
Syntax Highlighting (Pygments)
    ↓
Markdown Processing
    ↓
Template Rendering (Jinja2)
    ↓
HTTP Response
```

**File Upload Flow:**
```
User Uploads File
    ↓
Validate Filename Format
    ↓
Check Language Mapping
    ↓
Verify File Extension
    ↓
Read and Validate Content
    ↓
Write to Category Directory
    ↓
Clear CategoryManager Cache
    ↓
Redirect to Solution View
```

## Data Flow

### Solution Data Structure

```python
@dataclass
class Solution:
    number: int                    # Problem number (e.g., 1)
    title: str                     # Problem title (e.g., "Two Sum")
    slug: str                      # URL-friendly slug
    filename: str                  # Base filename
    category: str                  # Category name
    difficulty: str                # Easy, Medium, Hard
    time_complexity: Optional[str] # O(n), O(log n), etc.
    space_complexity: Optional[str]
    language: str                  # python, javascript, java, etc.
    file_path: str                 # Full path to file
    alternative_languages: List[str] # Other available languages
```

### Category Data Structure

```python
@dataclass
class Category:
    name: str                      # Category name
    slug: str                      # URL-friendly slug
    description: str               # Category description
    color: str                     # UI color theme
    solution_count: int            # Number of solutions
    solutions: List[Solution]      # List of solution objects
    difficulty_counts: Dict[str, int]  # Easy/Medium/Hard counts
    complexity_counts: Dict[str, int]  # Complexity distribution
```

### Data Flow Pipeline

**1. Initialization (Application Startup):**
```
Load Configuration
    ↓
Scan Solution Directories
    ↓
Parse Solution Files
    ↓
Extract Metadata
    ↓
Build Category Index
    ↓
Cache in Memory
```

**2. Request Processing:**
```
Receive HTTP Request
    ↓
Parse URL Parameters
    ↓
Query CategoryManager
    ↓
Retrieve Cached Data
    ↓
Process Solution Content
    ↓
Apply Syntax Highlighting
    ↓
Render Template
    ↓
Return Response
```

**3. File Operations:**
```
Read Solution File
    ↓
Parse Docstring
    ↓
Extract Explanation Block
    ↓
Parse Code Content
    ↓
Generate Variants:
  - Skeleton (problem only)
  - LeetCode format (converted)
  - ZIP bundle (all formats)
```

## Request Lifecycle

### Example: Viewing a Solution

**1. User navigates to `/category/arrays-hashing/solution/0001-two-sum`**

**2. Flask routes to `solution_view()` handler:**
```python
@app.route('/category/<category_slug>/solution/<solution_slug>')
def solution_view(category_slug, solution_slug):
    # Extract problem number
    # Get solution from CategoryManager
    # Read solution content
    # Parse and process
    # Render template
```

**3. CategoryManager retrieves solution:**
```python
def get_solution(category_slug, solution_slug, language='python'):
    # Find category in cache
    # Find solution by slug
    # Check for language alternatives
    # Return Solution object
```

**4. Content processing:**
```python
# Read file content
content = read_file(solution.file_path)

# Parse docstring for problem description
docstring = extract_docstring(content)

# Parse explanation block
explanation = extract_explanation_block(docstring)

# Extract code
code = extract_code(content)

# Apply syntax highlighting
highlighted_code = highlight(code, PythonLexer(), HtmlFormatter())

# Process markdown in explanation
rendered_explanation = markdown.markdown(explanation)
```

**5. Template rendering:**
```python
return render_template(
    'solution.html',
    solution=solution,
    problem_description=docstring,
    explanation=rendered_explanation,
    code=highlighted_code,
    alternatives=alternative_languages
)
```

**6. Response sent to browser**

## Multi-Language System

### Language Configuration

**LANGUAGE_MAP in app.py:**
```python
LANGUAGE_MAP = {
    'python': {
        'name': 'Python',
        'extension': '.py',
        'pygments_lexer': 'python',
        'mime_type': 'text/x-python',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.py$',
    },
    'javascript': {
        'name': 'JavaScript',
        'extension': '.js',
        'pygments_lexer': 'javascript',
        'mime_type': 'text/javascript',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.js\.js$',
    },
    # ... more languages
}
```

### Language Detection Flow

```
File Upload
    ↓
Extract Filename
    ↓
Check Extension
    ↓
Match Against LANGUAGE_MAP
    ↓
Validate Pattern
    ↓
Determine Language
    ↓
Apply Language-Specific Processing
```

### Directory Structure for Multi-Language

```
solutions/
├── arrays-hashing/
│   ├── python/
│   │   ├── 0001-two-sum.py
│   │   └── 0217-contains-duplicate.py
│   ├── javascript/
│   │   ├── 0001-two-sum.js.js
│   │   └── 0217-contains-duplicate.js.js
│   ├── java/
│   │   └── 0001-two-sum.java.java
│   ├── cpp/
│   │   └── 0001-two-sum.cpp.cpp
│   └── go/
│       └── 0001-two-sum.go.go
```

### Language Badge Display

**Algorithm:**
1. Scan category directory for subdirectories
2. For each language subdirectory, check for matching files
3. Build list of available languages per solution
4. Display language badges in UI
5. Enable language switching on solution pages

## Caching Strategy

### In-Memory Cache

**CategoryManager maintains cached data:**
```python
class CategoryManager:
    def __init__(self):
        self._categories: Dict[str, Category] = {}
        self._solutions: Dict[str, Solution] = {}
        self._last_scan: Optional[float] = None

    def _should_rescan(self) -> bool:
        # Check if cache is stale
        # Rescan if directory modified
```

**Cache Invalidation:**
- On file upload (clear cache)
- On application restart (rebuild cache)
- On directory modification (automatic rescan)

### Benefits
- Fast response times (no repeated file I/O)
- Reduced disk access
- Quick metadata lookups
- Efficient category browsing

### Trade-offs
- Memory usage (acceptable for ~300 solutions)
- Cache invalidation complexity
- Startup time for initial scan

## Extension Points

### Adding New Features

**1. New View Type (e.g., by tag):**
```python
# Add route in app.py
@app.route('/tags/<tag_name>')
def tag_view(tag_name):
    # Implement tag-based filtering
    pass

# Add to CategoryManager
def get_solutions_by_tag(self, tag: str):
    # Implement tag lookup
    pass
```

**2. New Download Format:**
```python
# Add generator function
def generate_pdf_format(solution: Solution) -> bytes:
    # Convert solution to PDF
    pass

# Add route
@app.route('/download/<category>/<solution>/pdf')
def download_pdf(category, solution):
    # Generate and send PDF
    pass
```

**3. New Language Support:**
1. Add to LANGUAGE_MAP in app.py
2. Create template in docs/developer-guide/templates/
3. Create formatting guide
4. Add example solution
5. Update documentation

### Customization Points

**Templates (Jinja2):**
- Extend `base.html` for consistent layout
- Override blocks for custom content
- Add custom CSS/JS in static/

**Styling:**
- Modify `static/css/style.css`
- Add new Pygments themes
- Customize color schemes

**Data Processing:**
- Extend Solution/Category dataclasses
- Add metadata extractors
- Implement custom parsers

---

[← Previous: Language Support](08-language-support/README.md) | [🏠 Home](README.md) | [Next: Testing Languages →](10-testing-languages.md)
