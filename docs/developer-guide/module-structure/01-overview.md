# Overview

[🏠 Home](README.md) | [Next: Directory Structure →](02-directory-structure.md)

---

## Table of Contents

- [Design Philosophy](#design-philosophy)
- [Task-Oriented vs. Technical Layers](#task-oriented-vs-technical-layers)
- [Benefits](#benefits)
- [Core Principles](#core-principles)
- [Example: Search Feature](#example-search-feature)
- [Module Hierarchy](#module-hierarchy)

## Design Philosophy

The LeetCode Learning Tool follows a **task-oriented module architecture** where all code related to a specific functional task is co-located in one module. This makes it easy to find, understand, and modify code by organizing around what the code does rather than technical implementation details.

## Task-Oriented vs. Technical Layers

### Traditional Layered Approach (NOT used)

```
models/          # All data models
services/        # All business logic
controllers/     # All route handlers
utils/           # All utilities
```

**Problems with this approach:**
- Code for one feature scattered across multiple directories
- Hard to find all related code
- Changes require modifying multiple layers
- Unclear module boundaries

### Task-Oriented Approach (USED)

```
data/            # Everything related to data management
content/         # Everything related to content processing
search/          # Everything related to search functionality
code_generation/ # Everything related to code generation
views/           # Everything related to HTTP handling
```

**Advantages:**
- All code for a feature in one place
- Easy to locate functionality
- Changes contained to single module
- Clear task-based boundaries

## Benefits

### 1. Feature Locality
All code for a feature is in one place. Want to change search? Everything is in `search/`.

### 2. Easier Navigation
Think in terms of tasks:
- "I need to change search" → `search/` directory
- "I need to modify content processing" → `content/` directory
- "I'm adding language support" → `data/language_constants.py`

### 3. Clearer Boundaries
Module interfaces are task-based, not technical:
- Data module: Manages all data access
- Search module: Handles all search operations
- Content module: Processes all content

### 4. Reduced Coupling
Changes in one task module rarely affect others:
- Changing search logic doesn't affect content processing
- Adding new data models doesn't affect views
- Updating syntax highlighting doesn't affect search

### 5. Simpler Mental Model
Think in terms of "what does it do" not "how is it built":
- **What**: Search for solutions → **Where**: `search/`
- **What**: Generate skeleton → **Where**: `code_generation/`
- **What**: Extract markdown → **Where**: `data/markdown_extraction.py`

## Core Principles

### 1. One Module, One Task
Each module has a single, clear purpose:
- `data/` = Data management
- `content/` = Content processing
- `search/` = Search and discovery
- `code_generation/` = Code transformation
- `views/` = HTTP handling

### 2. Co-location
Related code lives together:
- All search logic in `search/`
- All content processors in `content/`
- All code generators in `code_generation/`

### 3. Clear Interfaces
Modules expose clean, task-oriented APIs:
- `execute_search(query)` - not `parse_and_filter_and_group()`
- `extract_all_problem_data(code)` - not `extract_docstring_and_parse_and_clean()`

### 4. Minimal Dependencies
Modules depend on each other only when necessary:
- Views depend on all modules (orchestration)
- Modules don't depend on views
- Peer modules minimize cross-dependencies

## Example: Search Feature

### Traditional Approach
```
models/solution.py          # Solution model
services/search_service.py  # Search logic
controllers/search.py       # HTTP handler
utils/similarity.py         # Similarity calculation
```

### Task-Oriented Approach
```
search/
├── search_engine.py        # ALL search logic
└── solution_finder.py      # ALL solution lookup

views/
└── search_views.py         # HTTP handler only
```

**Result**: Everything search-related is in `search/`. No hunting across directories.

## Module Hierarchy

```
Entry Points
├── app.py          # CLI entry
└── factory.py      # App factory

Task Modules (Independent)
├── data/           # Data management
├── content/        # Content processing
├── code_generation/# Code transformation
└── search/         # Search & discovery

Orchestration
└── views/          # HTTP handlers (depend on task modules)
```

---

[🏠 Home](README.md) | [Next: Directory Structure →](02-directory-structure.md)
