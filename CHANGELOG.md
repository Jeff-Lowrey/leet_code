# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - v1.0 Preparation (Issue #34 Complete)
- **Task-Oriented Module Architecture**: Comprehensive codebase reorganization (#34)
  - Created 5 task-oriented modules: `data/`, `content/`, `code_generation/`, `search/`, `views/`
  - Eliminated 2,000+ lines of monolithic `app.py` through modularization
  - Each module contains all code related to a specific functional task
  - Clear separation of concerns with minimal cross-module dependencies
- **Class-Based Views**: Converted all Flask routes to `MethodView` pattern (#34)
  - Created `BaseView` with common functionality (theme handling, code formatting)
  - Implemented 5 view classes: `MainView`, `SolutionView`, `SearchView`, `ApiView`, `DocsView`
  - Organized HTTP methods within view classes (GET, POST, etc.)
  - Improved testability with class-based structure
- **Flask Application Factory**: Implemented factory pattern for better configuration (#34)
  - Created `factory.py` with `create_app()` function
  - Supports multiple app instances for testing
  - Clean separation of app creation from execution
  - Entry point reduced to 29 lines in `app.py`
- **Comprehensive Documentation**: Complete module structure documentation (#34)
  - Created 11 module-structure guides (overview, directory structure, 5 module docs, interactions, extension guide, testing, migration)
  - Added 10 markdown-guide files explaining solution file structure
  - Reorganized developer guide with cross-references and proper TOC navigation
  - Added Table of Contents to all documentation files following Document Hub format
  - Updated architecture documentation for task-oriented approach
- **CSS Organization**: Extracted inline styles to external files (#34)
  - Created 3 new page-specific CSS files (search-results.css, upload.css, no-solution.css)
  - Moved ~600 lines of inline CSS from templates to static/css/pages/
  - All templates now use clean external stylesheet references
  - Improved maintainability and separation of concerns

### Changed - v1.0 Preparation (Issue #34 Complete)
- **Code Organization**: Migrated from monolithic to modular architecture (#34)
  - `data/category_data.py` - Solution/Category models, CategoryManager (259 lines)
  - `data/language_constants.py` - Language metadata & mappings (150+ lines)
  - `data/markdown_extraction.py` - Universal markdown parser (180+ lines)
  - `content/content_processing.py` - Extraction, parsing, merging (13 functions)
  - `content/syntax_highlighting.py` - Pygments highlighting logic
  - `code_generation/skeleton_generator.py` - Template/skeleton generation
  - `code_generation/leetcode_converter.py` - Snake_case to camelCase conversion
  - `search/search_engine.py` - Query parsing, search execution, filtering
  - `search/solution_finder.py` - Solution lookup, category enrichment
  - `views/*.py` - 5 class-based view modules with route registration
- **Route Registration**: Updated to use `.as_view()` pattern (#34)
  - All routes registered through view classes
  - Centralized route configuration in `views/__init__.py`
  - Blueprint-ready structure for future scaling
- **Import Structure**: Updated all imports for new module organization (#34)
  - Absolute imports from `src.leet_code.{module}`
  - Clear module boundaries with explicit `__all__` exports
  - Reduced circular dependency risks
- **Test Organization**: Updated all tests for class-based views (#34)
  - Created 5 view test modules matching view structure
  - Updated mocks and patches for new module paths
  - Maintained 75%+ test coverage throughout refactoring

### Removed - v1.0 Preparation (Issue #34 Complete)
- **Redundant Documentation Sections**: Removed KEY INSIGHT and ALGORITHM (#34)
  - Removed KEY INSIGHT section (95%+ redundant with INTUITION)
  - Removed ALGORITHM section (redundant with detailed APPROACH sections)
  - Simplified from 11 optional sections to 9
  - Updated APPROACH documentation to emphasize detailed step-by-step content
  - No impact to existing solutions (0 files used these sections)

### Added - v1.0 Preparation (Issue #21 Complete)
- **Category Minimum Threshold**: All 29 categories now have ≥10 problems each (#21)
  - Added 5 new globally unique problems across 5 categories
  - Each problem implemented in Python, JavaScript, and TypeScript (15 solution files total)
  - Total solutions increased from 280 to 298 unique problems
- **New Problem Solutions**: Complete implementations with full documentation (#21)
  - #0201 Bitwise AND of Numbers Range (bit-manipulation) - Common prefix finding algorithm
  - #0241 Different Ways to Add Parentheses (recursion) - Divide and conquer with memoization
  - #0735 Asteroid Collision (simulation) - Stack-based collision detection
  - #0179 Largest Number (sorting) - Custom comparator for optimal ordering
  - #0008 String to Integer (atoi) (strings) - State machine parsing with overflow handling
- **Documentation Standards**: All new solutions include complete required sections (#21)
  - METADATA (Techniques, Data Structures, Patterns, Complexities)
  - INTUITION (Problem understanding and approach overview)
  - APPROACH (Detailed algorithmic explanation)
  - WHY THIS WORKS (Theoretical justification)
  - EXAMPLE WALKTHROUGH (Step-by-step execution with detailed steps)
  - TIME COMPLEXITY (With detailed context)
  - SPACE COMPLEXITY (With detailed context)
  - EDGE CASES (Comprehensive coverage)

### Added - v1.0 Preparation (Issue #16 Complete)
- **Solution Format Standardization**: All 560 solution files now follow two-sum format (#16)
  - Added METADATA section to all solutions (Techniques, Data Structures, Patterns, Complexities)
  - Created 3 missing Python solutions (0136-single.py, 0073-set-matrix-zeros.py, 0240-search-2d-matrix-ii.py)
  - Removed 257 duplicate 3-digit JavaScript files after merge
  - Updated solution templates with METADATA section for future consistency
  - Enhanced complexity descriptions with detailed context (e.g., "O(n) - Single pass through array")
- **Documentation Updates**: Comprehensive solution format documentation (#16)
  - Updated upload-guide with METADATA section requirements
  - Added template documentation with all 5 required METADATA fields
  - Documented section ordering and formatting guidelines
  - Updated developer-guide template system documentation
  - Updated Python formatting reference guide (SOLUTION_FORMATTING_GUIDE.md)
  - Updated JavaScript formatting reference guide (SOLUTION_FORMATTING_GUIDE_JS.md)
- **Automated METADATA Inference**: Pattern detection script for metadata population (#16)
  - Detects techniques from code patterns (hash maps, two pointers, sorting, etc.)
  - Identifies data structures used (arrays, sets, trees, graphs, etc.)
  - Recognizes algorithm patterns (greedy, DP, backtracking, etc.)
  - Enhanced complexity descriptions automatically

### Added - v1.0 Preparation (Issue #18 Complete)
- **Multi-Language Template System**: Complete template infrastructure for 7 programming languages (#18)
  - Created solution templates for Python, JavaScript, TypeScript, Java, C++, Go, and Rust
  - Each template includes problem description, explanation blocks, metadata, code structure, and test cases
  - Templates follow language-specific conventions (docstrings, JSDoc, Javadoc, Doxygen, etc.)
  - Located in `docs/developer-guide/templates/` for contributor access
- **Language-Specific Formatting Guides**: Comprehensive formatting documentation for all 7 languages (#18)
  - Python: `SOLUTION_FORMATTING_GUIDE_PY.md` - Type hints, docstrings, PEP 8 conventions
  - JavaScript: `SOLUTION_FORMATTING_GUIDE_JS.md` - JSDoc, modern syntax, Map/Set usage
  - TypeScript: `SOLUTION_FORMATTING_GUIDE_TS.md` - Type annotations, interfaces, generics
  - Java: `SOLUTION_FORMATTING_GUIDE_JAVA.md` - Javadoc, collections framework, generics
  - C++: `SOLUTION_FORMATTING_GUIDE_CPP.md` - Doxygen, STL containers, modern C++17
  - Go: `SOLUTION_FORMATTING_GUIDE_GO.md` - Go conventions, error handling, goroutines
  - Rust: `SOLUTION_FORMATTING_GUIDE_RS.md` - Ownership, borrowing, Result/Option types
  - Each guide includes complete examples, common patterns, and validation checklists
- **Example Implementations**: Reference solutions demonstrating template usage (#18)
  - Java Two Sum: Complete implementation with HashMap approach (212 lines)
  - C++ Two Sum: STL unordered_map with C++17 features (230 lines)
  - Go Two Sum: Idiomatic Go with built-in map (188 lines)
  - All examples include full test cases and complexity analysis
- **User Guide Enhancements**: Multi-language user documentation (#18)
  - Language Selection Guide: When to use each language, upload workflows, troubleshooting
  - Language Examples Guide: Language-specific features, use cases, side-by-side comparisons
  - Reorganized browsing and study sections into focused subdirectories
- **Developer Guide Enhancements**: Comprehensive contributor documentation (#18)
  - Template Creation Guidelines: Creating language-specific solution templates
  - Adding Language Support: Complete integration guide with Ruby example
  - Formatting Guide Creation: Process for writing language documentation
  - System Architecture: Component interactions, data flow, caching strategy
  - Testing Language Integration: Unit tests, integration tests, validation procedures
  - Contribution Workflow: Branch strategy, PRs, code review, merge criteria
  - Language Support subfolder: Grouped language integration workflow (08-language-support/)

### Changed - v1.0 Preparation (Issue #18 Complete)
- **Documentation Structure**: Reorganized all documentation guides for better navigation (#18)
  - User Guide: Renumbered files (01-08) with unnumbered subdirectories (browsing/, study/)
  - Developer Guide: Created 08-language-support/ subfolder, renumbered to 01-11
  - Upload Guide: Renumbered to 01-05 with 05-formatting-guidelines/ subfolder
  - All subdirectories now use README.md for consistency
  - Updated all internal navigation links throughout documentation
- **Upload Guide**: Enhanced with multi-language support documentation (#18)
  - Added language-specific template sections for all 7 languages
  - Updated formatting guidelines with language comparison tables
  - Reorganized into 05-formatting-guidelines/ subfolder with README

### Added - v1.0 Preparation (Issue #5 Complete)
- **Language-Specific Folder Structure**: Migrated to scalable multi-language organization (#5)
  - New structure: `solutions/<category>/python/` and `solutions/<category>/javascript/`
  - 596 files migrated (556 renames + 40 deletions)
  - Applied consistent 4-digit padding to Python files (0001-0999)
  - Removed 17 duplicate JavaScript files and corrected categorization
- **Language-Agnostic Markdown Extraction**: Unified extraction for 12 languages (#5)
  - New `ProblemData` dataclass with comprehensive structure
  - Supports: Python, JS, TS, Java, C++, C, C#, Swift, Kotlin, Scala, Go, Rust
  - Precompiled regex patterns for performance
  - Reduced `_parse_solution_metadata()` from 75 to 15 lines
- **Solution Card Descriptions**: Problem descriptions now display on all views (#5)
  - Added missing problem title lines to 44 solution files
  - Created reusable `templates/partials/solution_card.html` component
  - Eliminates code duplication across category/difficulty/complexity templates
- **Theme-Based Badge Styling**: Visual hierarchy for problem numbers vs categories (#5)
  - Added `--badge-problem-number` variables to all 18 theme variants
  - Problem badges use theme-appropriate colors (neutral/accent)
  - Category labels remain in bold category colors
  - Removed 87 lines of conflicting category-specific overrides

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
- **All Solution Files**: Standardized to two-sum format with complete METADATA (#16, #21)
  - 298 Python files with complete METADATA and formatting
  - 298 JavaScript files with complete METADATA and formatting
  - 298 TypeScript files with complete METADATA and formatting
  - Consistent HTML `<dl>` tag formatting for examples
  - Proper blank line spacing throughout
  - Enhanced docstrings with detailed explanations
- **Solution Templates**: Updated with METADATA section for future solutions (#16)
  - Python template: `docs/developer-guide/templates/SOLUTION_TEMPLATE.py`
  - JavaScript template: `docs/developer-guide/templates/SOLUTION_TEMPLATE.js`
  - Both templates include all 5 required METADATA fields
- **Solution File Structure**: Reorganized into language-specific folders for scalability (#5)
  - Python solutions: `solutions/<category>/python/0XXX-problem-name.py`
  - JavaScript solutions: `solutions/<category>/javascript/XXX-problem-name.js`
  - Updated `category_data.py` and `app.py` path resolution
  - Renamed `get_alternative_solution_path` → `get_solution_path`
  - Removed "alternative language" terminology
- **CSS Architecture**: Removed legacy monolithic style.css (2587 lines) (#5)
  - Resolved badge color inconsistencies on /complexity and other pages
  - All styling now uses modular main.css with imports
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