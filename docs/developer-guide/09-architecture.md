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

The LeetCode Learning Tool follows a **task-oriented module architecture** with clear separation of concerns. Each module contains all functionality related to a specific task:

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
│  │           Flask Views (class-based, views/)              │  │
│  │  ┌────────────────┐  ┌────────────────┐                 │  │
│  │  │  main_views    │  │ solution_views │                 │  │
│  │  │  - index()     │  │ - display()    │                 │  │
│  │  │  - categories  │  │ - downloads    │                 │  │
│  │  │  - virtual cat │  │ - uploads      │                 │  │
│  │  └────────────────┘  └────────────────┘                 │  │
│  │  ┌────────────────┐  ┌────────────────┐                 │  │
│  │  │ search_views   │  │   api_views    │                 │  │
│  │  │  - interface   │  │ - JSON endpoints│                │  │
│  │  │  - results     │  │ - stats/data   │                 │  │
│  │  └────────────────┘  └────────────────┘                 │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────┬──────────────────────────────────────┘
                          │
┌─────────────────────────┴──────────────────────────────────────┐
│                    Task-Oriented Modules                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  DATA (data/)                                            │  │
│  │  ├─ category_data.py: Solution/Category models, caching │  │
│  │  ├─ language_constants.py: Language metadata            │  │
│  │  └─ markdown_extraction.py: Universal parsing           │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CONTENT (content/)                                      │  │
│  │  ├─ content_processing.py: Extract, parse, merge        │  │
│  │  └─ syntax_highlighting.py: Pygments themes             │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  CODE GENERATION (code_generation/)                      │  │
│  │  ├─ skeleton_generator.py: Multi-language templates     │  │
│  │  └─ leetcode_converter.py: Format conversion            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  SEARCH (search/)                                        │  │
│  │  ├─ search_engine.py: Query parsing, execution          │  │
│  │  └─ solution_finder.py: Solution lookup, enrichment     │  │
│  └──────────────────────────────────────────────────────────┘  │
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

### Design Philosophy

**Task-Oriented Organization**: All code related to a specific task is co-located in one module:
- Want to modify search? → `search/` directory
- Need to change content processing? → `content/` directory
- Adding language support? → `data/language_constants.py`

**Benefits**:
- Easy to find code related to a feature
- Clear module boundaries
- Reduced coupling between modules
- Simpler mental model

## Component Interactions

### Core Components

**1. Flask Views (views/)**
- **Responsibilities:**
  - Handle HTTP requests and responses
  - Route URL patterns to handlers
  - Render templates with context data
  - Coordinate between task modules
  - Manage file uploads and downloads

- **Modules:**
  - `main_views.py`: Home, categories, virtual categories
  - `solution_views.py`: Solution display, downloads, uploads
  - `search_views.py`: Search interface and results
  - `api_views.py`: JSON API endpoints

- **Dependencies:**
  - CategoryManager (data access)
  - Content processing modules
  - Search engine modules
  - Code generation modules

**2. Data Module (data/)**
- **`category_data.py` - CategoryManager**
  - Scan and index solution files
  - Parse solution metadata
  - Cache category and solution data
  - Provide data access interface
  - Detect and map languages

- **`language_constants.py` - Language Configuration**
  - Language metadata and mappings
  - File extension definitions
  - Comment style specifications
  - Pygments lexer mappings

- **`markdown_extraction.py` - Universal Parser**
  - Language-agnostic markdown extraction
  - Parse metadata from markdown
  - Extract problem data structure
  - Support all 13+ languages

**3. Content Module (content/)**
- **`content_processing.py` - Content Processing**
  - Extract problem data from code
  - Parse problem descriptions
  - Parse explanation sections
  - Merge and organize content
  - Generate display-ready HTML

- **`syntax_highlighting.py` - Syntax Highlighting**
  - Create Pygments formatters
  - Theme detection (light/dark)
  - Multi-language lexer support

**4. Code Generation Module (code_generation/)**
- **`skeleton_generator.py` - Skeleton Generation**
  - Generate practice templates
  - Multi-language support
  - Preserve type annotations
  - Include test case templates

- **`leetcode_converter.py` - Format Conversion**
  - Convert snake_case to camelCase
  - Extract solution classes
  - Transform code format
  - Preserve documentation

**5. Search Module (search/)**
- **`search_engine.py` - Search Engine**
  - Parse search queries (navigate, name, similar, filter modes)
  - Execute searches
  - Filter and group results
  - Similarity calculations

- **`solution_finder.py` - Solution Finder**
  - Find solutions by category
  - Enrich with metadata
  - Generate solution paths
  - Category lookups

### Interaction Patterns

**Request → Response Flow (with task modules):**
```
User Request
    ↓
Flask View Handler (views/)
    ↓
CategoryManager.get_solution() (data/category_data.py)
    ↓
extract_all_problem_data() (content/content_processing.py)
    ↓
  ├─ extract_markdown_from_code() (data/markdown_extraction.py)
  ├─ parse_problem_markdown() (content/content_processing.py)
  └─ parse_explanation_into_sections() (content/content_processing.py)
    ↓
highlight() (content/syntax_highlighting.py)
    ↓
Template Rendering (Jinja2)
    ↓
HTTP Response
```

**Search Flow:**
```
User Search Query
    ↓
Search View (views/search_views.py)
    ↓
execute_search() (search/search_engine.py)
    ↓
  ├─ parse_search_query() - Determine mode
  ├─ CategoryManager queries - Get data
  └─ group_by_similarity() - Organize results
    ↓
enrich_solutions_with_category() (search/solution_finder.py)
    ↓
Template Rendering
    ↓
Search Results Display
```

**File Upload Flow:**
```
User Uploads File
    ↓
Solution View Handler (views/solution_views.py)
    ↓
Validate Filename Format (data/language_constants.py)
    ↓
Check Language Mapping (data/language_constants.py)
    ↓
Verify File Extension
    ↓
Read and Validate Content
    ↓
Write to Category Directory
    ↓
Clear CategoryManager Cache (data/category_data.py)
    ↓
Redirect to Solution View
```

**Download Flow:**
```
User Requests Download
    ↓
Solution View Handler (views/solution_views.py)
    ↓
generate_skeleton() (code_generation/skeleton_generator.py)
    ↓
convert_to_leetcode_format() (code_generation/leetcode_converter.py)
    ↓
Create ZIP Bundle
    ↓
Send File Response
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

### Language Configuration (`data/language_constants.py`)

The language system is centralized in `data/language_constants.py` for easy maintenance and extension.

**LANGUAGE_MAP Structure:**
```python
LANGUAGE_MAP = {
    'python': {
        'name': 'Python',
        'extension': '.py',
        'pygments_lexer': 'python',
        'mime_type': 'text/x-python',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.py$',
        'comment_style': 'docstring',  # """..."""
        'icon': '🐍',
    },
    'javascript': {
        'name': 'JavaScript',
        'extension': '.js',
        'pygments_lexer': 'javascript',
        'mime_type': 'text/javascript',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.js\.js$',
        'comment_style': 'jsdoc',  # /** ... */
        'icon': '📜',
    },
    # ... 13+ languages
}
```

**Language-Agnostic Processing:**
- Universal markdown extraction (`data/markdown_extraction.py`)
- Comment style detection based on file extension
- Automatic metadata parsing for all languages
- Consistent structure across languages

### Language Detection Flow

```
File Upload
    ↓
Extract Filename
    ↓
Check Extension (data/language_constants.py)
    ↓
Match Against LANGUAGE_MAP
    ↓
Validate Pattern
    ↓
Determine Language & Comment Style
    ↓
Apply Universal Processing (data/markdown_extraction.py)
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

### Adding New Features (Task-Oriented Approach)

**1. New View Type (e.g., by tag):**
```python
# Add view class in views/main_views.py or new views file
class TagView(MethodView):
    def get(self, tag_name):
        # Implement tag-based filtering
        pass

# Register in factory.py
app.add_url_rule('/tags/<tag_name>', view_func=TagView.as_view('tag_view'))

# Add to CategoryManager in data/category_data.py
def get_solutions_by_tag(self, tag: str):
    # Implement tag lookup
    pass
```

**2. New Download Format:**
```python
# Add generator function in code_generation/skeleton_generator.py
def generate_pdf_format(solution: Solution) -> bytes:
    # Convert solution to PDF
    pass

# Add route in views/solution_views.py
class PdfDownload(MethodView):
    def get(self, category, solution_slug):
        # Generate and send PDF
        pass
```

**3. New Search Mode:**
```python
# Add to search/search_engine.py
def parse_tag_search(query: str) -> dict[str, Any]:
    # Parse tag-based search
    pass

# Update execute_search() in search/search_engine.py
def execute_search(query: str) -> dict[str, Any]:
    # Add new mode handling
    if mode == "tag":
        return handle_tag_search(query)
```

**4. New Content Processor:**
```python
# Add to content/content_processing.py
def extract_video_links(markdown_content: str) -> list[str]:
    # Extract video tutorial links
    pass

# Use in views/solution_views.py
video_links = extract_video_links(problem_data.markdown)
```

**5. New Language Support:**
1. Add to LANGUAGE_MAP in `data/language_constants.py`
2. Update `data/markdown_extraction.py` if special comment handling needed
3. Create template in `docs/developer-guide/templates/`
4. Create formatting guide in `docs/upload-guide/05-formatting-guidelines/`
5. Add example solution
6. Update documentation

### Customization Points

**Task Module Extensions:**
- **Data**: Extend Solution/Category dataclasses in `data/category_data.py`
- **Content**: Add processors in `content/content_processing.py`
- **Code Generation**: Add generators in `code_generation/`
- **Search**: Add modes in `search/search_engine.py`
- **Views**: Add view classes in `views/`

**Templates (Jinja2):**
- Extend `base.html` for consistent layout
- Override blocks for custom content
- Add custom CSS/JS in `static/`

**Styling:**
- Modify `static/css/style.css`
- Add new Pygments themes in `content/syntax_highlighting.py`
- Customize color schemes

**Benefits of Task-Oriented Extensions:**
- All related code in one module
- Clear extension points per task
- Minimal cross-module changes
- Easy to test in isolation

---

[← Previous: Language Support](08-language-support/README.md) | [🏠 Home](README.md) | [Next: Testing Languages →](10-testing-languages.md)
