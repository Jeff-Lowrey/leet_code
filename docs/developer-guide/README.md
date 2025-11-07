# Developer Guide

Welcome to the LeetCode Learning Tool Developer Guide. This guide provides comprehensive documentation for developers contributing to and maintaining this project.

## Table of Contents

1. [Overview](01-overview.md) - Project structure, architecture overview, and key components
2. [Flask Architecture](02-flask-architecture.md) - Flask application structure, routing, and template system
3. [Data Management](03-data-management.md) - Category and solution data management (legacy reference)
4. [Template System](04-template-system.md) - Jinja2 templates and frontend components
5. [Static Files](05-static-files.md) - CSS, JavaScript, and static asset organization
6. [Adding Features](06-adding-features.md) - Guidelines for implementing new functionality
7. [Testing Procedures](07-testing-procedures.md) - Quality checks, testing, and deployment
8. [Language Support](08-language-support/README.md) - Complete guide to adding new programming languages
   - [Template Creation](08-language-support/01-template-creation.md) - Creating language-specific templates
   - [Adding Languages](08-language-support/02-adding-languages.md) - Integration procedures and configuration
   - [Formatting Guides](08-language-support/03-formatting-guide-creation.md) - Writing language documentation
   - [Testing Languages](08-language-support/04-testing-languages.md) - Testing procedures for language integration
9. [Architecture](09-architecture.md) - System architecture, component interactions, and data flow
10. [Contribution Workflow](11-contribution-workflow.md) - Branch strategy, PRs, and contribution guidelines
11. [Module Structure](module-structure/README.md) - **Task-oriented code organization** (current architecture)
    - [Overview](module-structure/01-overview.md) - Design philosophy
    - [Directory Structure](module-structure/02-directory-structure.md) - Complete module layout
    - [Data Module](module-structure/03-data-module.md) - Data models, constants, extraction
    - [Content Module](module-structure/04-content-module.md) - Processing and highlighting
    - [Code Generation Module](module-structure/05-code-generation-module.md) - Skeletons and conversion
    - [Search Module](module-structure/06-search-module.md) - Query parsing and discovery
    - [Views Module](module-structure/07-views-module.md) - Flask HTTP handlers
    - [Module Interactions](module-structure/08-interactions.md) - Data flows and patterns
    - [Extension Guide](module-structure/09-extension-guide.md) - Adding new features
    - [Testing Strategy](module-structure/10-testing-strategy.md) - Per-module testing
    - [Migration Notes](module-structure/11-migration-notes.md) - From old structure

## Quick Links
[↑ Back to Table of Contents](#table-of-contents)

### Essential Files
- **Flask Application**: [`src/leet_code/app.py`](../../src/leet_code/app.py) - Main web interface
- **Category Manager**: [`src/leet_code/category_data.py`](../../src/leet_code/category_data.py) - Data management
- **Project Config**: [`pyproject.toml`](../../pyproject.toml) - PDM configuration and dependencies
- **Solution Templates**: [`docs/developer-guide/templates/`](templates/) - All 7 language templates

## Technology Stack
[↑ Back to Table of Contents](#table-of-contents)

- **Backend**: Flask 3.0+ (Python 3.13)
- **Template Engine**: Jinja2
- **Markdown Processing**: Python-Markdown with extensions
- **Syntax Highlighting**: Pygments
- **Package Manager**: PDM (Python Development Master)
- **Quality Tools**: mypy, ruff, pytest, bandit

## Development Environment
[↑ Back to Table of Contents](#table-of-contents)

### Prerequisites
- Python 3.13
- PDM package manager
- Git

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd leet_code

# Install dependencies with PDM
pdm install

# Activate virtual environment
source .venv/bin/activate  # Linux/macOS
# or
.venv\Scripts\activate  # Windows

# Run development server
pdm run python -m src.leet_code.app

# Access at http://127.0.0.1:9501
```

## Project Statistics
[↑ Back to Table of Contents](#table-of-contents)

- **Solutions**: 298+ problems across 29 categories
- **Languages**: 7 supported (Python, JavaScript, TypeScript, Java, C++, Go, Rust)
- **Categories**: Arrays, Dynamic Programming, Graphs, Trees, and more
- **Documentation**: Comprehensive guides for users, contributors, and developers

## Getting Help
[↑ Back to Table of Contents](#table-of-contents)

- Review the section guides linked above
- Check existing solutions for examples
- Refer to [User Guide](../user-guide/README.md) for end-user features
- Consult [Upload Guide](../upload-guide/README.md) for solution formatting

---

**Navigation**: For detailed information on each topic, click the section links in the Table of Contents above.
