# Extension Guide

[← Previous: Module Interactions](08-interactions.md) | [🏠 Home](README.md) | [Next: Testing Strategy →](10-testing-strategy.md)

---

## Adding New Features

Identify the appropriate task module for your feature:

### 1. New Data Model

**Add to**: `data/category_data.py`

**Example**: Add Tag dataclass

```python
@dataclass
class Tag:
    name: str
    slug: str
    solution_count: int
```

### 2. New Content Processor

**Add to**: `content/content_processing.py`

**Example**: Extract video links from markdown

```python
def extract_video_links(markdown_content: str) -> list[str]:
    """Extract video tutorial links from markdown."""
    pattern = r'\[.*?\]\((https://.*?youtube.*?)\)'
    return re.findall(pattern, markdown_content)
```

### 3. New Code Generator

**Add to**: `code_generation/skeleton_generator.py` or create new file

**Example**: Generate PDF format

```python
def generate_pdf_format(solution: Solution) -> bytes:
    """Convert solution to PDF."""
    # Implementation
    pass
```

### 4. New Search Mode

**Add to**: `search/search_engine.py`

**Example**: Tag-based search

```python
def parse_tag_search(query: str) -> dict[str, Any]:
    """Parse tag-based search query."""
    # Implementation
    pass

# Update execute_search()
def execute_search(query: str) -> dict[str, Any]:
    if mode == "tag":
        return handle_tag_search(query)
```

### 5. New View/Route

**Add to**: `views/` (choose appropriate file or create new)

**Example**: Tag browsing view

```python
# In views/main_views.py or new views/tag_views.py
class TagView(MethodView):
    def get(self, tag_name):
        """Display solutions for a tag."""
        # Implementation
        pass

# Register in factory.py
app.add_url_rule('/tags/<tag_name>', view_func=TagView.as_view('tag_view'))
```

### 6. New Language Support

1. Add to `data/language_constants.py` (LANGUAGE_MAP)
2. Update `data/markdown_extraction.py` if special comment handling needed
3. Create template in `docs/developer-guide/templates/`
4. Create formatting guide in `docs/upload-guide/05-formatting-guidelines/`
5. Add example solutions

---

## Extension Decision Tree

```
New Feature
    │
    ├─ Data model/constant? → data/
    ├─ Content processing? → content/
    ├─ Code transformation? → code_generation/
    ├─ Search/discovery? → search/
    └─ HTTP handling? → views/
```

---

[← Previous: Module Interactions](08-interactions.md) | [🏠 Home](README.md) | [Next: Testing Strategy →](10-testing-strategy.md)
