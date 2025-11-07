# Processing Flow

## Overview

This document explains how the application extracts, parses, and renders markdown content from solution files.

## Pipeline Overview

```
Solution File
     ↓
[1. Load File]
     ↓
[2. Extract Markdown] ← Language-specific comment extraction
     ↓
[3. Parse Metadata] ← Title, difficulty, number
     ↓
[4. Parse Problem] ← Description HTML
     ↓
[5. Parse Explanation] ← Section dictionary
     ↓
[6. Extract Code] ← Clean code without markdown
     ↓
[7. Merge Content] ← Organized for display
     ↓
[8. Render Page] ← Syntax-highlighted display
```

## Step-by-Step Process

### 1. Load File
```python
# Read solution file from disk
code = Path("solutions/arrays-hashing/python/0001-two-sum.py").read_text()
```

### 2. Extract Markdown
```python
# From data/markdown_extraction.py
markdown_content = extract_markdown_from_code(code, ".py")
```

**What it does**:
- Detects language based on file extension
- Extracts content from comment block (docstring for Python, /** */ for others)
- Strips comment markers
- Returns pure markdown text

### 3. Parse Metadata
```python
# From data/markdown_extraction.py
metadata = parse_metadata_from_markdown(markdown_content)
# Returns: {"number": "1", "title": "Two Sum", "difficulty": "Easy"}
```

**What it does**:
- Extracts problem number from title
- Gets problem name
- Parses difficulty level
- Validates required fields

### 4. Parse Problem Description
```python
# From content/content_processing.py
problem_html = parse_problem_markdown(markdown_content)
```

**What it does**:
- Splits content at `<details>` tag
- Removes difficulty line
- Strips problem number from title
- Converts markdown to HTML
- Returns formatted problem description

### 5. Parse Explanation
```python
# From content/content_processing.py
explanation_sections = parse_explanation_into_sections(explanation_content)
```

**What it does**:
- Extracts content from `<details>` tag
- Identifies section headers (`### INTUITION:`, etc.)
- Parses each section separately
- Converts markdown to HTML
- Returns dict: `{"intuition": "<html>", "approach": "<html>", ...}`

### 6. Extract Clean Code
```python
# From content/content_processing.py
clean_code, problem_data = extract_all_problem_data(code, ".py")
```

**What it does**:
- Removes markdown comment block
- Preserves solution code only
- Maintains proper formatting
- Returns code ready for display/download

### 7. Merge and Organize Content
```python
# From content/content_processing.py
organized_content = merge_and_reorganize_content(problem_html, explanation_sections)
```

**What it does**:
- Combines problem description and explanation
- Removes duplicate content
- Groups related sections
- Creates logical flow for display

### 8. Render Solution Page
- Display problem description
- Show collapsible explanation sections
- Render syntax-highlighted code
- Provide download options
- Enable language switching

## Module Responsibilities

### data/markdown_extraction.py
**Purpose**: Language-agnostic markdown extraction

**Key Functions**:
- `extract_markdown_from_code()` - Universal extraction
- `extract_markdown_from_python_docstring()` - Python-specific
- `parse_metadata_from_markdown()` - Metadata parsing
- `parse_complete_problem_data()` - Full data structure

### content/content_processing.py
**Purpose**: Content processing and organization

**Key Functions**:
- `extract_all_problem_data()` - Main extraction orchestrator
- `parse_problem_markdown()` - Problem description parsing
- `parse_explanation_into_sections()` - Explanation section parsing
- `merge_and_reorganize_content()` - Content merging
- `extract_documentation_sections()` - Documentation extraction
- `clean_approach_content()` - HTML cleanup

### data/category_data.py
**Purpose**: Solution data management

**Key Classes**:
- `Solution` - Solution data model
- `Category` - Category data model
- `CategoryManager` - Solution database and caching

### search/solution_finder.py
**Purpose**: Solution lookup and enrichment

**Key Functions**:
- `find_solution_category()` - Category lookup
- `enrich_solutions_with_category()` - Add category metadata

## Data Flow Example

### Input File
```python
"""
# 1. Two Sum
Difficulty: Easy

Given an array...

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use hash map...

### COMPLEXITY:
- **Time**: O(n)
- **Space**: O(n)

</details>
"""

class Solution:
    def twoSum(self, nums, target):
        seen = {}
        # ... implementation
```

### Extracted Data
```python
{
    "metadata": {
        "number": "1",
        "title": "Two Sum",
        "difficulty": "Easy"
    },
    "problem_html": "<p>Given an array...</p>",
    "explanation": {
        "intuition": "<p>Use hash map...</p>",
        "complexity": "<ul><li><strong>Time</strong>: O(n)</li>...</ul>"
    },
    "clean_code": "class Solution:\n    def twoSum..."
}
```

### Rendered Page
```html
<h1>Two Sum <span class="badge easy">Easy</span></h1>
<div class="problem-description">
    <p>Given an array...</p>
</div>
<details>
    <summary>🔍 SOLUTION EXPLANATION</summary>
    <div class="intuition">
        <h3>Intuition</h3>
        <p>Use hash map...</p>
    </div>
    <div class="complexity">
        <h3>Complexity</h3>
        <ul>...</ul>
    </div>
</details>
<pre><code class="language-python">...</code></pre>
```

## Caching

### CategoryManager Caching
- Solutions loaded once at startup
- Cached in memory for fast access
- Refresh available for updates
- Tag data cached per solution

### Template Rendering
- Jinja2 template caching
- Static assets cached by browser
- Syntax highlighting styles generated once

## Error Handling

### Invalid Markdown
- Missing metadata → Use filename as fallback
- No difficulty → Default to "Medium"
- Malformed sections → Skip and continue
- Invalid HTML → Return raw markdown

### Missing Files
- File not found → 404 error page
- Category not found → Redirect to home
- Language not available → Fall back to Python

## Performance Optimization

1. **Lazy Loading**: Extract markdown only when needed
2. **Caching**: Store parsed results for repeated access
3. **Batch Processing**: Load all solutions at startup
4. **Efficient Parsing**: Single-pass regex extraction

## Related Sections

- **Overview** → [01-overview.md](01-overview.md)
- **Module Structure** → [../MODULE_STRUCTURE.md](../MODULE_STRUCTURE.md)
- **Developer Guide** → [../developer-guide/README.md](../developer-guide/README.md)
