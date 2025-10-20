# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - v1.0 Preparation (Phase 1 Complete)
- **Smart Search System**: Multi-mode intelligent search with query parsing (#17)
  - Navigate mode: Direct problem number jump (e.g., "1", "443")
  - Name search mode: Fuzzy text matching (e.g., "palindrome", "two sum")
  - Similar mode: Find related problems with filters (e.g., "1 difficulty=medium")
  - Filter mode: Browse by criteria (e.g., "difficulty=easy category=arrays")
  - Tag-based similarity calculation using problem metadata
  - Search routes: `/search` (HTML) and `/api/search` (JSON)
  - Comprehensive unit tests (36 tests for parser, execution, routes)
- **Virtual Difficulty Categories**: Dynamic views aggregating solutions by difficulty (#17)
  - Routes: `/difficulty/easy`, `/difficulty/medium`, `/difficulty/hard`
  - TOC integration with problem counts
  - Origin category displayed for each solution
- **Virtual Complexity Categories**: Dynamic views aggregating solutions by complexity (#17)
  - Routes: `/complexity/{pattern}` for common patterns (O(1), O(n), O(log n), etc.)
  - TOC integration with complexity counts
  - Complexity parsing from solution docstrings
- **Enhanced Category Cards**: Difficulty and complexity badges (#17)
  - Difficulty badges: Color-coded breakdown (🟢 Easy | 🟡 Medium | 🔴 Hard)
  - Complexity badges: Top 3 patterns + "Other" count (e.g., "O(n): 15 | O(n²): 8")
  - API endpoints: `/api/stats/category/<slug>/difficulty` and `/complexity`
  - Dynamic badge loading with JavaScript
- **METADATA Sections**: Added to all 298+ solution files for tag extraction (#17)
- **Problem Tags System**: Extracted tags for similarity matching (`data/problem_tags.json`) (#17)
- **JavaScript Quality Tools**: ESLint, Prettier configuration for code quality (#17)
- **Justfile**: Common development tasks automation (#17)
- **Modularized Frontend**: Organized CSS/JS structure (base, components, layout, themes, utils) (#17)
- **Comprehensive Documentation**: Smart Search user guide with examples and best practices (#17)
- **README Updates**: Complete feature documentation for v1.0 capabilities (#17)

### Changed
- **Navigation Layout**: Refactored with flexbox for responsive search integration (#17)
- **CSS Structure**: Modularized into base, components, layout, themes, and utils (#17)
- **JavaScript Structure**: Modularized into search, toc, theme, view-by, and utils (#17)
- **Minimum Viewport**: Enforced 768px minimum width (tablet+ devices) (#17)
- **Language Constants**: Extracted to dedicated module for better organization (#17)
- **App Exports**: Added `__all__` list for explicit test imports (#17)

### Fixed
- **Test Type Hints**: Added return type annotations to all test methods (#17)
- **Import Organization**: Applied consistent import sorting across codebase (#17)
- **Code Formatting**: Applied Ruff auto-fixes and Prettier formatting (#17)

## [Unreleased] - Legacy

### Added
- MIT License

## [0.1.0] - 2025-10-14

### Added
- **Unified Overview Pages**: Difficulty and complexity pages showing all levels in collapsible sections (#13)
- **Context-Aware TOC Navigation**: Dynamic table of contents that adapts to current page type (#13)
- **Navigation Dropdowns**: View By menu (Category/Difficulty/Complexity) and Docs menu (#13)
- **Documentation Sub-Pages**: Support for nested documentation pages with proper routing (#13)
- **Comprehensive Guide TOC**: Full documentation structure visible in sidebar with all 22 pages (#13)
- **18-Theme System**: Complete theme implementation with light/dark variants (#3)
- **Theme Picker**: Interactive dropdown with color preview for all themes (#3)
- **Blue Theme**: Distinctive card design with blue top strip (#3)
- **Documentation Guides**: User Guide, Developer Guide, and Upload Guide with full TOC navigation (#2)
- **Contributing Guidelines**: Comprehensive guide for contributors (#2)
- **Solution Templates**: Standardized formats for Python and JavaScript solutions (#2)
- New documentation structure with `docs/user-guide/`, `docs/developer-guide/`, and `docs/upload-guide/` folders

### Changed
- **Difficulty/Complexity Routes**: From individual filter pages to unified overview pages with collapsible sections (#13)
- **Solution Badges**: Updated to link to unified overview pages with hash anchors (#13)
- **TOC Icon**: Replaced hamburger menu with document outline SVG icon (#13)
- **Navigation Links**: Converted Categories/Docs to dropdown menus (#13)
- **Documentation Cards**: Enhanced with descriptions and theme colors (#13)
- **Theme System**: Simplified Classic theme to blue and white design (#3)
- **Chaos Theme**: Renamed from "Idiot" theme (#3)
- **Documentation Structure**: Restructured into audience-specific guides with TOC navigation (#2)
- **Repository Organization**: Moved solution files to repository root (#11)
- Moved solution templates to `docs/upload-guide/`
- Moved formatting guides to `docs/` root
- Updated `category_data.py` to reference `solutions/` directory

### Fixed
- **LeetCode Format View**: Added missing difficulty and complexity metadata (#13)
- **Documentation Links**: Fixed relative markdown links with regex replacement (#13)
- **Double-Prefixed URLs**: Prevented duplicate /docs/ prefixes in JavaScript (#13)
- **TOC Display**: Added specialized builder for /docs overview page (#13)
- **Type Checking**: Fixed mypy errors in app.py (#3)
- **Theme Picker**: Improved functionality, visibility, and defaults (#3)
- **Classic Theme**: Fixed card styling and padding issues (#3)

## [2.1.0] - 2025-10-09

### Added
- Disclaimer notices for educational use and warranty
- Language-aware download system
- Quick access dropdowns on category cards for direct solution navigation
- Type hints throughout the codebase for better IDE support
- Development type stubs for Markdown and Pygments
- AST manipulation support with astor library
- Difficulty and complexity badge system with navigation
- Solution templates and formatting guides for Python and JavaScript
- Comprehensive solution implementations across all 29+ categories
- JavaScript solutions for all major algorithm categories (298+ solutions)
- Python solutions for segment trees, simulation, string manipulation, and more
- Edge cases and detailed explanations to solutions

### Changed
- Download buttons now respect currently selected language
- ZIP downloads include language-specific files only
- Standardized code formatting with consistent quote style
- Enhanced .gitignore with comprehensive Python patterns
- Made test coverage optional for development runs
- Applied comprehensive template standardization across all solution categories
- Refactored language system to use standard file extensions
- Enhanced dark mode theme with improved colors and component styling
- Improved solution code section typography and default collapsed state
- Rebranded from "LeetCode Application" to "Leet Code Learning Tool"
- Environment variable for Flask SECRET_KEY for better security
- Enhanced markdown formatting and content organization

### Fixed
- JavaScript explanation sections not rendering in HTML
- JavaScript problem description formatting
- Paragraph breaks in JavaScript solution formatting
- MyPy union-attr errors and type checking issues
- Blank line preservation in problem descriptions
- Language suffix display in alternative solution titles
- Skeleton generation template literal syntax errors
- Minor formatting inconsistencies across all modules
- Import organization and structure
- Failing tests and linting issues

## [2.0.0] - 2025-09-19

### Added
- Web interface with Flask for browsing solutions
- Multi-language support for 13+ programming languages
- Upload functionality for alternative language solutions
- Snake_case to camelCase conversion for Python LeetCode submissions
- Language switching between different implementations
- Download options: Skeleton, Solution, LeetCode format, ZIP bundle
- PDM package manager configuration
- Code quality tools: ruff, black, isort, mypy
- Pytest with 75% coverage requirement
- API endpoints for categories and solutions
- Syntax highlighting for all supported languages
- Quick navigation dropdowns on category cards

### Changed
- Converted from static repository to full web application
- Restructured project to support multiple languages
- Updated documentation to reflect new features

## [1.0.0] - 2025-09-16

### Added
- Initial LeetCode solutions repository setup
- 50+ solutions across 15+ problem categories
- Python solutions with complexity analysis
- Organized by problem-solving patterns
- Documentation for each solution
- Study roadmap and pattern guide
- Categories: Arrays, Two Pointers, Trees, Graphs, Dynamic Programming, etc.

---

*This changelog consolidates all version history from the LeetCode solutions platform.*