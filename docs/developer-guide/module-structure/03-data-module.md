# Data Module

[← Previous: Directory Structure](02-directory-structure.md) | [🏠 Home](README.md) | [Next: Content Module →](04-content-module.md)

---

## Overview

The `data/` module handles all data management, models, and constants. It provides the foundation for the entire application's data access layer.

**Purpose**: Centralized data models, language configuration, and universal markdown extraction.

## Module Structure

```
data/
├── __init__.py
├── category_data.py        # Solution/Category models, CategoryManager
├── language_constants.py  # Language metadata & mappings  
└── markdown_extraction.py # Universal markdown parser
```

---

## `category_data.py`

**Purpose**: Solution and category data models with caching

**Lines**: ~259

### Responsibilities

- Define Solution and Category dataclasses
- Implement CategoryManager for data access
- Scan solution directories and cache results
- Parse solution metadata
- Detect available languages per solution

### Key Classes

#### Solution Dataclass
```python
@dataclass
class Solution:
    number: int                    # Problem number
    title: str                     # Problem title
    slug: str                      # URL-friendly slug
    filename: str                  # Base filename
    category: str                  # Category name
    difficulty: str                # Easy/Medium/Hard
    time_complexity: Optional[str] # O(n), O(log n), etc.
    space_complexity: Optional[str]
    language: str                  # python, javascript, etc.
    file_path: str                 # Full path to file
    alternative_languages: List[str] # Other available languages
```

#### Category Dataclass
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

#### CategoryManager Class
```python
class CategoryManager:
    """Centralized solution data management with caching."""
    
    def get_categories() -> List[Category]:
        """Get all categories with solutions."""
    
    def get_solution(category_slug: str, solution_slug: str, language: str = "python") -> Solution | None:
        """Get specific solution."""
    
    def read_solution_content(solution: Solution) -> str | None:
        """Read solution file content."""
    
    def refresh() -> None:
        """Clear cache and rescan directories."""
```

### Usage Example

```python
from src.leet_code.data.category_data import category_manager, Solution

# Get all categories
categories = category_manager.get_categories()

# Get specific solution
solution = category_manager.get_solution("arrays-hashing", "0001-two-sum")

# Read solution content
code = category_manager.read_solution_content(solution)
```

---

## `language_constants.py`

**Purpose**: Language metadata and configuration

**Lines**: ~150

### Responsibilities

- Define LANGUAGE_MAP for 13+ languages
- Map file extensions to languages
- Specify comment styles for markdown extraction
- Provide Pygments lexer mappings
- Store language icons and display names

### Key Constants

#### LANGUAGE_MAP
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
        'mime_type': 'text/javascript',
        'file_pattern': r'^[0-9]{4}-[\w-]+\.js\.js$',
    },
    # ... 13+ languages total
}
```

#### EXTENSION_TO_LANGUAGE
```python
EXTENSION_TO_LANGUAGE = {
    '.py': 'python',
    '.js': 'javascript',
    '.ts': 'typescript',
    '.java': 'java',
    '.cpp': 'cpp',
    '.go': 'go',
    '.rs': 'rust',
    # ... more extensions
}
```

### Usage

Import when:
- Adding language support
- Validating file uploads
- Rendering language badges
- Detecting file types

```python
from src.leet_code.data.language_constants import LANGUAGE_MAP, EXTENSION_TO_LANGUAGE

# Get language from extension
language = EXTENSION_TO_LANGUAGE.get('.py')  # 'python'

# Get language metadata
metadata = LANGUAGE_MAP['python']
lexer = metadata['pygments_lexer']
icon = metadata['icon']
```

---

## `markdown_extraction.py`

**Purpose**: Universal language-agnostic markdown extraction

**Lines**: ~200

### Responsibilities

- Extract markdown from any supported language
- Parse metadata (title, difficulty, number)
- Detect comment block style based on file extension
- Strip comment markers to get pure markdown
- Return structured problem data

### Key Functions

#### extract_markdown_from_code
```python
def extract_markdown_from_code(code: str, file_extension: str) -> str | None:
    """
    Extract markdown content from code using language-specific comment detection.
    
    Args:
        code: Source code containing markdown in comments
        file_extension: File extension (.py, .js, etc.)
    
    Returns:
        Pure markdown content or None if extraction fails
    """
```

#### extract_markdown_from_python_docstring
```python
def extract_markdown_from_python_docstring(code: str) -> str | None:
    """
    Python-specific: Extract from triple-quote docstring.
    
    Extracts content from module-level """...""" docstring.
    """
```

#### parse_metadata_from_markdown
```python
def parse_metadata_from_markdown(markdown_content: str) -> dict[str, str]:
    """
    Parse title, difficulty, number from markdown.
    
    Returns dict with 'number', 'title', 'difficulty' keys.
    """
```

#### parse_complete_problem_data
```python
def parse_complete_problem_data(code: str, file_extension: str) -> ProblemData:
    """
    Extract all problem data (metadata + markdown content).
    
    Returns ProblemData object with complete information.
    """
```

### Supported Comment Styles

- **Python**: `"""..."""` (docstring)
- **JavaScript/TypeScript**: `/** ... */` (JSDoc)
- **Java**: `/** ... */` (Javadoc)
- **C++**: `/** ... */` (Doxygen)
- **Go**: `/** ... */`
- **Rust**: `/** ... */`

### Usage Example

```python
from src.leet_code.data.markdown_extraction import extract_markdown_from_code, parse_metadata_from_markdown

# Extract markdown from code
code = Path("solution.py").read_text()
markdown = extract_markdown_from_code(code, ".py")

# Parse metadata
metadata = parse_metadata_from_markdown(markdown)
print(metadata['number'])     # "1"
print(metadata['title'])      # "Two Sum"
print(metadata['difficulty']) # "Easy"
```

---

## Module Dependencies

### Depends On
- Python standard library only
- No internal module dependencies

### Depended On By
- `content/content_processing.py` - Uses markdown extraction
- `views/solution_views.py` - Uses CategoryManager
- `search/search_engine.py` - Uses CategoryManager
- All modules that need language metadata

---

## Testing

**Test File**: `tests/unit/test_category_data.py`, `test_markdown_extraction.py`

**Key Test Areas**:
- CategoryManager caching behavior
- Solution/Category dataclass validation
- Markdown extraction from all languages
- Metadata parsing accuracy
- Language constant mappings

---

[← Previous: Directory Structure](02-directory-structure.md) | [🏠 Home](README.md) | [Next: Content Module →](04-content-module.md)
