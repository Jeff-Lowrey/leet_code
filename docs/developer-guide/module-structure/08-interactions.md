# Module Interactions

[← Previous: Views Module](07-views-module.md) | [🏠 Home](README.md) | [Next: Extension Guide →](09-extension-guide.md)

---

## Common Interaction Patterns

### 1. Solution Display Flow

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

### 2. Search Flow

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

### 3. Download Flow

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

## Dependency Graph

```
views/
  ├── Depends on: data/, content/, search/, code_generation/
  └── Depended on by: (none)

data/
  ├── Depends on: (standard library only)
  └── Depended on by: content/, search/, views/

content/
  ├── Depends on: data/
  └── Depended on by: views/

code_generation/
  ├── Depends on: data/
  └── Depended on by: views/

search/
  ├── Depends on: data/
  └── Depended on by: views/
```

---

[← Previous: Views Module](07-views-module.md) | [🏠 Home](README.md) | [Next: Extension Guide →](09-extension-guide.md)
