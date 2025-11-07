# Testing Strategy

[← Previous: Extension Guide](09-extension-guide.md) | [🏠 Home](README.md) | [Next: Migration Notes →](11-migration-notes.md)

---

## Per-Module Testing

Each module should have corresponding unit tests:

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

## Module Testing Guidelines

### Data Module Tests

**Test**: `test_category_data.py`, `test_markdown_extraction.py`

- CategoryManager caching behavior
- Solution/Category dataclass validation
- Markdown extraction from all languages
- Metadata parsing accuracy
- Language constant mappings

### Content Module Tests

**Test**: `test_content_processing.py`

- Problem description parsing
- Explanation section extraction
- Content merging logic
- Syntax highlighting theme detection

### Code Generation Module Tests

**Test**: `test_skeleton_generator.py`, `test_leetcode_converter.py`

- Skeleton generation for all languages
- Type annotation preservation
- Snake_case to camelCase conversion
- Solution class extraction

### Search Module Tests

**Test**: `test_search_engine.py`, `test_solution_finder.py`

- Search mode detection
- Query parsing accuracy
- Similarity calculations
- Filter application
- Solution enrichment

### Views Module Tests

**Test**: `test_views_*.py`

- Route handling
- Template rendering
- File uploads/downloads
- API endpoint responses

---

## Integration Tests

Test module interactions:

```
tests/integration/
├── test_solution_display_flow.py  # Full solution display pipeline
├── test_search_flow.py            # Complete search workflow
└── test_download_flow.py          # Download generation process
```

---

[← Previous: Extension Guide](09-extension-guide.md) | [🏠 Home](README.md) | [Next: Migration Notes →](11-migration-notes.md)
