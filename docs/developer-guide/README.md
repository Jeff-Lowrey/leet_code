# Developer Guide

Welcome to the LeetCode Learning Tool Developer Guide. This guide provides comprehensive documentation for developers contributing to and maintaining this project.

## Table of Contents

1. [Overview](01-overview.md) - Project structure, architecture overview, and key components
2. [Flask Architecture](02-flask-architecture.md) - Flask application structure, routing, and template system
3. [Data Management](03-data-management.md) - Category and solution data management with `category_data.py`
4. [Template System](04-template-system.md) - Solution templates and skeleton generation
5. [Static Files](05-static-files.md) - CSS, JavaScript, and static asset organization
6. [Adding Features](06-adding-features.md) - Guidelines for implementing new functionality
7. [Testing Procedures](07-testing-procedures.md) - Quality checks, testing, and deployment

## Quick Links
[↑ Back to Table of Contents](#table-of-contents)

### Essential Files
- **Flask Application**: [`src/leet_code/app.py`](../../src/leet_code/app.py) - Main web interface
- **Category Manager**: [`src/leet_code/category_data.py`](../../src/leet_code/category_data.py) - Data management
- **Project Config**: [`pyproject.toml`](../../pyproject.toml) - PDM configuration and dependencies
- **Solution Templates**:
  - Python: [`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../solutions/templates/SOLUTION_TEMPLATE.py)
  - JavaScript: [`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../solutions/templates/SOLUTION_TEMPLATE.js)

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
- **Languages**: Python (primary), JavaScript (alternative)
- **Categories**: Arrays, Dynamic Programming, Graphs, Trees, and more
- **Documentation**: Comprehensive guides for users and developers

## Getting Help
[↑ Back to Table of Contents](#table-of-contents)

- Review the section guides linked above
- Check existing solutions for examples
- Refer to [User Guide](../user-guide/README.md) for end-user features
- Consult [Upload Guide](../upload-guide/README.md) for solution formatting

---

**Navigation**: For detailed information on each topic, click the section links in the Table of Contents above.
