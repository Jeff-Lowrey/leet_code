# Migration Notes

[← Previous: Testing Strategy](10-testing-strategy.md) | [🏠 Home](README.md)

---

## From Old Structure (Before 2025-11-07)

### Old (Technical Layers)

```
src/leet_code/
├── app.py                  # Monolithic (1686 lines)
├── category_data.py        # At root
├── leetcode_converter.py   # At root
├── search_utils.py         # At root
└── solution_utils.py       # At root
```

### New (Task-Oriented)

```
src/leet_code/
├── app.py                  # CLI entry (29 lines)
├── factory.py              # Application factory
├── data/                   # All data-related code
├── content/                # All content processing
├── code_generation/        # All code transformation
├── search/                 # All search functionality
└── views/                  # All Flask views
```

---

## Import Path Changes

### Old Imports
```python
from src.leet_code.category_data import CategoryManager
from src.leet_code.app import extract_problem_description
from src.leet_code.search_utils import execute_search
from src.leet_code.solution_utils import find_solution_category
```

### New Imports
```python
from src.leet_code.data.category_data import CategoryManager
from src.leet_code.content.content_processing import parse_problem_markdown
from src.leet_code.search.search_engine import execute_search
from src.leet_code.search.solution_finder import find_solution_category
```

---

## Function Relocations

| Old Location | New Location | Function |
|-------------|-------------|----------|
| app.py | content/content_processing.py | extract_all_problem_data |
| app.py | content/content_processing.py | parse_problem_markdown |
| app.py | content/syntax_highlighting.py | create_code_formatter |
| app.py | code_generation/skeleton_generator.py | generate_skeleton |
| search_utils.py | search/search_engine.py | execute_search |
| solution_utils.py | search/solution_finder.py | find_solution_category |

---

## Migration Checklist

- [ ] Update all import statements
- [ ] Update test patches to new module paths
- [ ] Update documentation references
- [ ] Run full test suite to verify
- [ ] Update IDE/editor configurations

---

[← Previous: Testing Strategy](10-testing-strategy.md) | [🏠 Home](README.md)
