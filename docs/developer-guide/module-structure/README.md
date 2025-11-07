# Module Structure Reference

**Last Updated**: 2025-11-07
**Architecture**: Task-Oriented Module Organization

---

## Table of Contents

1. [Overview](01-overview.md) - Design philosophy and benefits
2. [Directory Structure](02-directory-structure.md) - Complete module organization
3. [Data Module](03-data-module.md) - Models, constants, and extraction
4. [Content Module](04-content-module.md) - Processing and highlighting
5. [Code Generation Module](05-code-generation-module.md) - Skeletons and conversion
6. [Search Module](06-search-module.md) - Query parsing and discovery
7. [Views Module](07-views-module.md) - Flask HTTP handlers
8. [Module Interactions](08-interactions.md) - Data flows and patterns
9. [Extension Guide](09-extension-guide.md) - Adding new features
10. [Testing Strategy](10-testing-strategy.md) - Per-module testing
11. [Migration Notes](11-migration-notes.md) - From old structure

---

## Quick Reference

### Task-Oriented Organization

All code related to a specific functional task is co-located in one module:

- **Need to change search?** → `search/` directory
- **Need to modify content processing?** → `content/` directory
- **Adding language support?** → `data/language_constants.py`
- **New code generator?** → `code_generation/` directory
- **New view/route?** → `views/` directory

### Module Summary

| Module | Purpose | Key Files |
|--------|---------|-----------|
| **data/** | Data models & constants | category_data.py, language_constants.py, markdown_extraction.py |
| **content/** | Content processing | content_processing.py, syntax_highlighting.py |
| **code_generation/** | Code transformation | skeleton_generator.py, leetcode_converter.py |
| **search/** | Search & discovery | search_engine.py, solution_finder.py |
| **views/** | HTTP handlers | main_views.py, solution_views.py, search_views.py, api_views.py |

---

## Getting Started

### For New Developers

1. Start with [01-overview.md](01-overview.md) to understand the design philosophy
2. Review [02-directory-structure.md](02-directory-structure.md) for the complete layout
3. Read the module guides (03-07) for areas you'll work on
4. Check [08-interactions.md](08-interactions.md) to see how modules work together

### For Contributors

1. Identify which module your feature belongs to
2. Read the specific module guide (03-07)
3. Review [09-extension-guide.md](09-extension-guide.md) for adding features
4. Check [10-testing-strategy.md](10-testing-strategy.md) for test requirements

### For Maintainers

1. Understand the complete architecture from all sections
2. Use [11-migration-notes.md](11-migration-notes.md) to help others migrate code
3. Maintain module boundaries and task-oriented organization

---

## Design Philosophy

### Task-Oriented vs. Technical Layers

**We organize by WHAT the code does, not HOW it's built.**

**Traditional Approach (NOT used)**:
```
models/          # All data models
services/        # All business logic
controllers/     # All route handlers
```

**Task-Oriented Approach (USED)**:
```
data/            # Everything for data management
content/         # Everything for content processing
search/          # Everything for search
code_generation/ # Everything for code generation
views/           # Everything for HTTP handling
```

### Benefits

1. **Feature Locality**: All code for a feature in one place
2. **Easier Navigation**: Find code by task, not technical layer
3. **Clearer Boundaries**: Module interfaces are task-based
4. **Reduced Coupling**: Changes in one task rarely affect others
5. **Simpler Mental Model**: Think "what does it do" not "how is it built"

---

## Related Documentation

- **Architecture Overview**: [../09-architecture.md](../09-architecture.md)
- **Flask Architecture**: [../02-flask-architecture.md](../02-flask-architecture.md)
- **Developer Guide**: [../README.md](../README.md)
- **Markdown Structure**: [../../markdown-guide/README.md](../../markdown-guide/README.md)

---

*This guide provides comprehensive documentation for the task-oriented module structure implemented on 2025-11-07.*
