# Module Structure Reference

**Last Updated**: 2025-11-07
**Architecture**: Task-Oriented Module Organization

---

## Overview

The LeetCode Learning Tool follows a **task-oriented module architecture** where all code related to a specific functional task is co-located in one module. This makes it easy to find, understand, and modify code by organizing around what the code does rather than technical implementation details.

## Design Philosophy

### Task-Oriented vs. Technical Layers

**Traditional Layered Approach (NOT used)**:
```
models/          # All data models
services/        # All business logic
controllers/     # All route handlers
utils/           # All utilities
```

**Task-Oriented Approach (USED)**:
```
data/            # Everything related to data management
content/         # Everything related to content processing
search/          # Everything related to search functionality
code_generation/ # Everything related to code generation
views/           # Everything related to HTTP handling
```

### Benefits

1. **Feature Locality**: All code for a feature is in one place
2. **Easier Navigation**: "I need to change search" → `search/` directory
3. **Clearer Boundaries**: Module interfaces are task-based, not technical
4. **Reduced Coupling**: Changes in one task module rarely affect others
5. **Simpler Mental Model**: Think in terms of "what does it do" not "how is it built"

---

## Module Directory Structure

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

---

## Module Details

### 1. Entry Point & Factory

#### `app.py` (CLI Entry Point)
- **Purpose**: Command-line interface to run the Flask application
- **Lines**: 29
- **Responsibilities**:
  - Parse command-line arguments (host, port, debug)
  - Import and create app via factory
  - Run development server

**Key Functions**:
- `main()`: Parse args and run app

---

#### `factory.py` (Application Factory)
- **Purpose**: Flask application initialization and configuration
- **Pattern**: Application Factory Pattern
- **Responsibilities**:
  - Create and configure Flask app
  - Register view blueprints
  - Set up Jinja2 filters
  - Configure static and template paths

**Key Functions**:
- `create_app() -> Flask`: Main factory function

---

### 2. Data Module (`data/`)

All data management, models, and constants.

#### `data/category_data.py`
- **Purpose**: Solution and category data models with caching
- **Lines**: ~259
- **Responsibilities**:
  - Define Solution and Category dataclasses
  - Implement CategoryManager for data access
  - Scan solution directories and cache results
  - Parse solution metadata
  - Detect available languages per solution

**Key Classes**:
```python
@dataclass
class Solution:
    number: int
    title: str
    slug: str
    filename: str
    category: str
    difficulty: str
    time_complexity: Optional[str]
    space_complexity: Optional[str]
    language: str
    file_path: str
    alternative_languages: List[str]

@dataclass
class Category:
    name: str
    slug: str
    description: str
    color: str
    solution_count: int
    solutions: List[Solution]
    difficulty_counts: Dict[str, int]
    complexity_counts: Dict[str, int]

class CategoryManager:
    """Centralized solution data management with caching."""
    def get_categories() -> List[Category]
    def get_solution(category_slug, solution_slug, language) -> Solution | None
    def read_solution_content(solution: Solution) -> str | None
    def refresh() -> None  # Clear cache and rescan
```

---

#### `data/language_constants.py`
- **Purpose**: Language metadata and configuration
- **Responsibilities**:
  - Define LANGUAGE_MAP for 13+ languages
  - Map file extensions to languages
  - Specify comment styles for markdown extraction
  - Provide Pygments lexer mappings
  - Store language icons and display names

**Key Constants**:
```python
LANGUAGE_MAP = {
    'python': {
        'name': 'Python',
        'extension': '.py',
        'pygments_lexer': 'python',
        'comment_style': 'docstring',  # """..."""
        'icon': '🐍',
        'mime_type': 'text/x-python',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.py$',
    },
    'javascript': {
        'name': 'JavaScript',
        'extension': '.js',
        'pygments_lexer': 'javascript',
        'comment_style': 'jsdoc',  # /** ... */
        'icon': '📜',
        # ...
    },
    # ... 13+ languages total
}

EXTENSION_TO_LANGUAGE = {
    '.py': 'python',
    '.js': 'javascript',
    # ...
}
```

**Usage**: Import when adding language support, validating uploads, or rendering language badges.

---

#### `data/markdown_extraction.py`
- **Purpose**: Universal language-agnostic markdown extraction
- **Responsibilities**:
  - Extract markdown from any supported language
  - Parse metadata (title, difficulty, number)
  - Detect comment block style based on file extension
  - Strip comment markers to get pure markdown
  - Return structured problem data

**Key Functions**:
```python
def extract_markdown_from_code(code: str, file_extension: str) -> str | None:
    """Extract markdown content from code using language-specific comment detection."""

def extract_markdown_from_python_docstring(code: str) -> str | None:
    """Python-specific: Extract from triple-quote docstring."""

def parse_metadata_from_markdown(markdown_content: str) -> dict[str, str]:
    """Parse title, difficulty, number from markdown."""

def parse_complete_problem_data(code: str, file_extension: str) -> ProblemData:
    """Extract all problem data (metadata + markdown content)."""
```

**Supported Comment Styles**:
- Python: `"""..."""` (docstring)
- JavaScript/TypeScript/Java/C++/Go/Rust: `/** ... */` (JSDoc/Javadoc/Doxygen)

---

### 3. Content Module (`content/`)

All content extraction, parsing, and formatting.

#### `content/content_processing.py`
- **Purpose**: Content extraction and processing pipeline
- **Lines**: ~520
- **Functions**: 13
- **Responsibilities**:
  - Extract problem data from code using universal extraction
  - Parse problem descriptions from markdown
  - Parse explanation sections (INTUITION, APPROACH, COMPLEXITY, etc.)
  - Merge and reorganize content
  - Convert markdown to HTML
  - Clean and format content for display

**Key Functions**:
```python
def extract_all_problem_data(code: str, file_extension: str) -> tuple[str, ProblemData]:
    """Main extraction orchestrator. Returns (clean_code, problem_data)."""

def parse_problem_markdown(markdown_content: str) -> str | None:
    """Parse problem description, remove metadata, convert to HTML."""

def parse_explanation_into_sections(content: str) -> dict[str, str]:
    """Parse explanation from <details> tag into section dict."""

def merge_and_reorganize_content(documentation: str | None, explanation: str | None) -> str | None:
    """Merge problem description and explanation, remove duplicates."""

def extract_documentation_sections(markdown_content: str) -> dict[str, str]:
    """Extract individual documentation sections by header."""

def clean_approach_content(content: str) -> str:
    """Clean up HTML formatting issues."""
```

**Processing Flow**:
1. Extract markdown from code (`markdown_extraction.py`)
2. Parse problem description (this module)
3. Parse explanation sections (this module)
4. Merge and clean content (this module)
5. Return ready-to-display HTML

---

#### `content/syntax_highlighting.py`
- **Purpose**: Syntax highlighting with Pygments
- **Lines**: ~40
- **Responsibilities**:
  - Create Pygments HTML formatters
  - Detect theme from cookies/request params
  - Apply syntax highlighting to code
  - Support light and dark themes

**Key Functions**:
```python
def get_syntax_highlighting_style() -> str:
    """Detect theme (light/dark) and return Pygments style name."""

def create_code_formatter() -> HtmlFormatter[str]:
    """Create HTML formatter with appropriate theme."""
```

**Themes**:
- Light: "default" style
- Dark: "monokai" style

---

### 4. Code Generation Module (`code_generation/`)

All code transformation and generation.

#### `code_generation/skeleton_generator.py`
- **Purpose**: Generate practice templates from solutions
- **Responsibilities**:
  - Extract method signatures from solutions
  - Preserve type annotations
  - Add TODO comments for implementation
  - Support 7+ languages (Python, JavaScript, TypeScript, Java, C++, Go, Rust)
  - Include test case templates

**Key Functions**:
```python
def generate_skeleton(code: str, solution: Solution, is_leetcode: bool = False) -> str:
    """Generate skeleton code for practicing."""

def generate_python_skeleton(code: str, solution: Solution) -> str:
    """Python-specific skeleton generation."""

def generate_js_skeleton(code: str, solution: Solution) -> str:
    """JavaScript-specific skeleton generation."""

# ... more language-specific generators
```

**Skeleton Structure**:
- Problem description (preserved)
- Method signatures with type hints (preserved)
- TODO comments for implementation
- Test case template

---

#### `code_generation/leetcode_converter.py`
- **Purpose**: Convert Python code for LeetCode submission
- **Responsibilities**:
  - Convert snake_case to camelCase for method names
  - Extract Solution class from file
  - Preserve docstrings and comments
  - Transform code format for LeetCode compatibility

**Key Functions**:
```python
def convert_to_leetcode_format(code: str) -> str:
    """Convert Python solution to LeetCode format (camelCase)."""

def extract_solution_class(code: str) -> str:
    """Extract just the Solution class from file."""
```

---

### 5. Search Module (`search/`)

All search and solution discovery functionality.

#### `search/search_engine.py`
- **Purpose**: Search query parsing and execution
- **Lines**: ~303
- **Functions**: 8
- **Responsibilities**:
  - Parse search queries to determine mode
  - Execute searches (navigate, name, similar, filter modes)
  - Filter results by criteria
  - Group results by similarity
  - Calculate similarity scores

**Search Modes**:
1. **Navigate**: Direct problem number (e.g., "1", "443")
2. **Name**: Fuzzy text search (e.g., "palindrome")
3. **Similar**: Find related problems (e.g., "1 difficulty=medium")
4. **Filter**: Browse by criteria (e.g., "difficulty=easy category=arrays")

**Key Functions**:
```python
def parse_search_query(query: str) -> tuple[str, dict[str, Any]]:
    """Parse query and determine search mode."""

def execute_search(query: str) -> dict[str, Any]:
    """Execute search and return structured results."""

def group_by_similarity(similar_problems: list[tuple[Solution, float]]) -> dict[str, list[tuple[Solution, float]]]:
    """Group similar problems by similarity tiers (High/Medium/Low)."""

def filter_solutions(solutions: list[Solution], filters: dict[str, str]) -> list[Solution]:
    """Apply difficulty/category/complexity filters."""
```

---

#### `search/solution_finder.py`
- **Purpose**: Solution lookup and metadata enrichment
- **Lines**: ~136
- **Functions**: 8
- **Responsibilities**:
  - Find solutions by category
  - Look up category metadata
  - Enrich solutions with additional data
  - Generate solution file paths
  - Get available alternative languages

**Key Functions**:
```python
def find_solution_category(solution: Solution) -> tuple[str, str] | None:
    """Find category slug and name for a solution."""

def enrich_solutions_with_category(solutions: list[Solution], extra_fields: dict[str, Any] | None = None) -> list[dict[str, Any]]:
    """Add category metadata and extra fields to solutions."""

def get_solution_path(category_slug: str, filename: str, language: str = "python") -> Path:
    """Get filesystem path for a solution file."""

def get_available_languages(category_slug: str, filename: str) -> list[str]:
    """Get list of available languages for a solution."""
```

---

### 6. Views Module (`views/`)

All Flask views using class-based views (MethodView).

#### `views/main_views.py`
- **Purpose**: Main application views
- **Responsibilities**:
  - Home page with category grid
  - Category browsing
  - Virtual categories (difficulty, complexity)
  - Statistics display

**Key Views**:
```python
class HomeView(MethodView):
    """Home page with all categories."""

class CategoryView(MethodView):
    """List solutions in a category."""

class DifficultyView(MethodView):
    """Filter by difficulty (Easy/Medium/Hard)."""

class ComplexityView(MethodView):
    """Filter by time/space complexity."""
```

---

#### `views/solution_views.py`
- **Purpose**: Solution display and file operations
- **Responsibilities**:
  - Display solution with syntax highlighting
  - Format conversion (original, LeetCode)
  - Download handling (skeleton, solution, ZIP)
  - File uploads for alternative languages
  - Language switching

**Key Views**:
```python
class SolutionView(MethodView):
    """Display solution with problem description and code."""

class SolutionLeetCodeView(MethodView):
    """Display LeetCode format version."""

class DownloadSolution(MethodView):
    """Download skeleton/solution/ZIP."""

class UploadSolution(MethodView):
    """Upload alternative language solution."""

class ViewAlternativeSolution(MethodView):
    """Switch to different language version."""
```

---

#### `views/search_views.py`
- **Purpose**: Search interface and results
- **Responsibilities**:
  - Display search interface
  - Execute searches
  - Render search results
  - Handle all search modes

**Key Views**:
```python
class SearchView(MethodView):
    """Search interface and results page."""
```

---

#### `views/api_views.py`
- **Purpose**: JSON API endpoints
- **Responsibilities**:
  - Provide JSON data for categories
  - Provide JSON data for solutions
  - Statistics endpoints
  - Dynamic data loading

**Key Views**:
```python
class APICategoriesView(MethodView):
    """GET /api/categories - List all categories."""

class APICategorySolutionsView(MethodView):
    """GET /api/category/<slug>/solutions - Solutions in category."""

class APIStatsView(MethodView):
    """GET /api/stats/* - Difficulty/complexity statistics."""
```

---

## Module Interactions

### Common Interaction Patterns

#### 1. Solution Display Flow
```
User Request
    ↓
views/solution_views.py (SolutionView)
    ↓
data/category_data.py (CategoryManager.get_solution)
    ↓
content/content_processing.py (extract_all_problem_data)
    ├─ data/markdown_extraction.py (extract_markdown_from_code)
    ├─ content/content_processing.py (parse_problem_markdown)
    └─ content/content_processing.py (parse_explanation_into_sections)
    ↓
code_generation/skeleton_generator.py (generate_skeleton)
    ↓
content/syntax_highlighting.py (highlight)
    ↓
Template Rendering → Response
```

#### 2. Search Flow
```
User Search Query
    ↓
views/search_views.py (SearchView)
    ↓
search/search_engine.py (execute_search)
    ├─ parse_search_query() - Determine mode
    ├─ CategoryManager queries - Get data
    └─ group_by_similarity() - Organize results
    ↓
search/solution_finder.py (enrich_solutions_with_category)
    ↓
Template Rendering → Results Display
```

#### 3. Download Flow
```
User Download Request
    ↓
views/solution_views.py (DownloadSolution)
    ↓
code_generation/skeleton_generator.py (generate_skeleton)
    ↓
code_generation/leetcode_converter.py (convert_to_leetcode_format)
    ↓
Create ZIP (if requested) → File Response
```

---

## Extension Guide

### Adding New Features

When adding a new feature, identify the appropriate task module:

**1. New Data Model**
- Add to: `data/category_data.py`
- Example: Add Tag dataclass

**2. New Content Processor**
- Add to: `content/content_processing.py`
- Example: Extract video links from markdown

**3. New Code Generator**
- Add to: `code_generation/skeleton_generator.py` or create new file
- Example: Generate PDF format

**4. New Search Mode**
- Add to: `search/search_engine.py`
- Example: Tag-based search

**5. New View/Route**
- Add to: `views/` (choose appropriate file or create new)
- Example: Tag browsing view

**6. New Language Support**
1. Add to `data/language_constants.py` (LANGUAGE_MAP)
2. Update `data/markdown_extraction.py` if special comment handling needed
3. Create template in `docs/developer-guide/templates/`
4. Create formatting guide
5. Add example solutions

---

## Testing Strategy

Each module should have corresponding tests:

```
tests/unit/
├── test_category_data.py          # data/category_data.py
├── test_markdown_extraction.py    # data/markdown_extraction.py
├── test_content_processing.py     # content/content_processing.py
├── test_skeleton_generator.py     # code_generation/skeleton_generator.py
├── test_leetcode_converter.py     # code_generation/leetcode_converter.py
├── test_search_engine.py          # search/search_engine.py
├── test_solution_finder.py        # search/solution_finder.py
├── test_views_main.py             # views/main_views.py
├── test_views_solution.py         # views/solution_views.py
├── test_views_search.py           # views/search_views.py
└── test_views_api.py              # views/api_views.py
```

---

## Migration Notes

### From Old Structure (Before 2025-11-07)

**Old (Technical Layers)**:
- `app.py` - Monolithic file with all processing functions (1686 lines)
- `category_data.py` - At root
- `leetcode_converter.py` - At root
- `search_utils.py` - At root
- `solution_utils.py` - At root

**New (Task-Oriented)**:
- `app.py` - CLI entry point only (29 lines)
- `factory.py` - Application factory
- `data/` - All data-related code
- `content/` - All content processing
- `code_generation/` - All code transformation
- `search/` - All search functionality
- `views/` - All Flask views

**Import Path Changes**:
```python
# Old imports
from src.leet_code.category_data import CategoryManager
from src.leet_code.app import extract_problem_description

# New imports
from src.leet_code.data.category_data import CategoryManager
from src.leet_code.content.content_processing import parse_problem_markdown
```

---

## Best Practices

1. **Keep Tasks Separate**: Don't mix data access in content processing
2. **Use Clear Interfaces**: Each module exports a clear public API
3. **Minimize Cross-Module Dependencies**: Views depend on modules, modules don't depend on views
4. **Test by Module**: Each module should be testable independently
5. **Document Module Purpose**: Every module has a clear, single purpose

---

## Related Documentation

- **Architecture Overview**: [docs/developer-guide/09-architecture.md](developer-guide/09-architecture.md)
- **Flask Architecture**: [docs/developer-guide/02-flask-architecture.md](developer-guide/02-flask-architecture.md)
- **Developer Guide**: [docs/developer-guide/README.md](developer-guide/README.md)
- **Markdown Structure**: [docs/markdown-guide/README.md](markdown-guide/README.md)

---

*This document provides a comprehensive reference for the task-oriented module structure implemented on 2025-11-07.*
