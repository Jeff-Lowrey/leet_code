# Leet Code Learning Tool


> ** 🛑 Notice **
> This repository is no longer being maintained.

> **⚠️ DISCLAIMER**
>
> This is an educational tool provided for learning purposes only. The code and solutions in this repository are provided "AS IS" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of this software.
>
> This project is not affiliated with, endorsed by, or connected to LeetCode in any way.

## 🚀 Features

### Search & Navigation
- **Smart Search**: Multi-mode search with intelligent query parsing
  - Navigate mode: Direct problem number jump (e.g., "1", "443")
  - Name search: Fuzzy text matching (e.g., "palindrome", "two sum")
  - Similar mode: Find related problems with filters (e.g., "1 difficulty=medium")
  - Filter mode: Browse by criteria (e.g., "difficulty=easy category=arrays")
- **Virtual Categories**: Browse solutions by difficulty (Easy/Medium/Hard) or complexity (O(n), O(log n), etc.)
- **Quick Access Dropdowns**: Direct navigation from category cards
- **Enhanced Category Cards**: Difficulty and complexity badges showing distribution at a glance

### Core Functionality
- **Web Interface**: Flask-based solution browser with syntax highlighting
- **Multi-Language Support**: Upload and view solutions in 13+ programming languages
  - **7 Languages with Complete Templates**: Python, JavaScript, TypeScript, Java, C++, Go, Rust
  - **Comprehensive Formatting Guides**: Language-specific documentation for contributors
  - **Example Implementations**: Reference solutions demonstrating best practices
- **Python to LeetCode Conversion**: Automatic conversion for LeetCode submission format
- **Smart Downloads**: Language-aware download system with skeleton/solution/ZIP options
- **API Support**: JSON endpoints for dynamic content loading

### Solution Management
- **Organized Categories**: Solutions grouped by problem-solving patterns (29 categories)
- **Multi-Language Structure**: Scalable language-specific folder organization
  - Python solutions: `solutions/<category>/python/`
  - JavaScript solutions: `solutions/<category>/javascript/`
  - Easy to add new languages with consistent structure
- **Language Switching**: Toggle between different language implementations
- **Format Options**: View in original format or LeetCode submission format
- **Unified Extraction**: Language-agnostic markdown parsing for 12+ languages
- **Download Formats**:
  - Skeleton (method signatures only)
  - Full solution
  - LeetCode formatted skeleton and solution
  - ZIP bundle with all formats

## 📋 Table of Contents
1. [🚀 Features](#-features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Documentation](#documentation)
6. [API Documentation](#api-documentation)
7. [Progress Tracking](#progress-tracking)
8. [Contributing](#contributing)
9. [License](#license)

## Installation

### Prerequisites
- Python 3.13+

### Quick Start (Recommended)

The easiest way to run the application:

```bash
# Clone the repository
git clone <repository-url>
cd leet_code

# Run the application (creates venv and installs dependencies automatically)
./run.sh
```

The application will be available at `http://127.0.0.1:9501`

**Custom host/port:**
```bash
./run.sh --host 0.0.0.0 --port 8080
```

### Alternative Setup (For Development)

If you prefer using PDM for package management:

```bash
# Install PDM package manager first
pip install pdm

# Install dependencies with PDM
pdm install

# Run the development server
pdm run python -m src.leet_code.app
```

## Usage

### Finding Solutions

**Smart Search** (fastest method):
1. Click the search icon (🔍) in the navbar
2. Enter your query:
   - Problem number: `443` → Jump directly to problem #443
   - Name search: `palindrome` → Find all palindrome problems
   - Similar problems: `1 difficulty=medium` → Find medium problems similar to Two Sum
   - Filter by criteria: `difficulty=easy category=arrays` → Browse easy array problems

**Browse by Category**:
1. Navigate to `http://127.0.0.1:9501`
2. Browse algorithmic pattern categories (Arrays, Two Pointers, etc.)
3. Use quick access dropdowns on category cards
4. Click on any solution to view code with syntax highlighting

**Browse by Difficulty/Complexity**:
- Use the TOC sidebar to browse by Easy/Medium/Hard difficulty
- Or browse by time complexity (O(1), O(n), O(log n), etc.)

### Uploading Alternative Languages
1. Open any solution page
2. Click "Upload Solution"
3. Select programming language
4. Upload your solution file
5. Language badge will appear for switching

### Downloading Solutions
- **Individual Downloads**: Click Skeleton/Solution/LeetCode buttons
- **Language-Specific**: Downloads match currently selected language
- **ZIP Bundle**: Download all formats for current language

### Format Conversion
- **View LeetCode Format**: Converts snake_case to camelCase
- **Automatic Conversion**: Ready for copy-paste to LeetCode
- **Download LeetCode Format**: Get submission-ready code

## Documentation

### User Guide
Comprehensive guide for browsing, downloading, and studying solutions.
- Getting started, browsing strategies, and navigation tools
- Understanding solutions and complexity analysis
- Multi-language selection and comparison
- Study strategies and learning paths

See [docs/user-guide/README.md](docs/user-guide/README.md)

### Upload Guide
Template and formatting standards for contributing solutions in 7 languages.
- Solution templates for Python, JavaScript, TypeScript, Java, C++, Go, Rust
- Language-specific formatting guides with complete examples
- Code quality standards and validation checklists
- Upload workflows and troubleshooting

See [docs/upload-guide/README.md](docs/upload-guide/README.md)

### Developer Guide
Technical documentation for contributors and maintainers.
- Project architecture and component interactions
- Language integration guide (templates, configuration, testing)
- Contribution workflow (branching, PRs, code review)
- Testing procedures and quality standards

See [docs/developer-guide/README.md](docs/developer-guide/README.md)

### Supported Languages

**Languages with Complete Template & Formatting Guide Support (7):**
- **Python** - Type hints, docstrings, PEP 8 conventions (298 solutions with full metadata)
- **JavaScript** - JSDoc, modern ES6+, Map/Set usage (298 solutions)
- **TypeScript** - Type annotations, interfaces, generics (298 solutions)
- **Java** - Javadoc, collections framework, generics
- **C++** - Doxygen comments, STL containers, C++17
- **Go** - Go conventions, error handling, goroutines
- **Rust** - Ownership/borrowing, Result/Option types

Each language includes:
- Solution template in `docs/developer-guide/templates/`
- Comprehensive formatting guide in `docs/upload-guide/05-formatting-guidelines/`
- Example implementations demonstrating best practices

**Additional Languages Supported (via language-agnostic extraction):**
- C, C#, Swift, Kotlin, Scala

**File Structure:**
```
solutions/
├── arrays-hashing/
│   ├── python/
│   │   └── 0001-two-sum.py  (4-digit padding)
│   ├── javascript/
│   │   └── 001-two-sum.js
│   ├── java/
│   │   └── 0001-two-sum.java.java
│   ├── cpp/
│   │   └── 0001-two-sum.cpp.cpp
│   ├── go/
│   │   └── 0001-two-sum.go.go
│   └── rust/
│       └── 0001-two-sum.rs.rs
└── ... (29 categories total)
```

## API Documentation

### Endpoints

#### Search API
```
GET /search?q=<query>
Returns: Search results page with matching solutions

GET /api/search?q=<query>
Returns: JSON search results with mode detection
```

#### Virtual Categories
```
GET /difficulty/easy
GET /difficulty/medium
GET /difficulty/hard
Returns: Solutions filtered by difficulty level

GET /complexity/{pattern}
Returns: Solutions filtered by time complexity (e.g., /complexity/on)
```

#### Stats API
```
GET /api/stats/difficulty
Returns: JSON difficulty breakdown across all solutions

GET /api/stats/complexity
Returns: JSON complexity breakdown across all solutions

GET /api/category/{category}/stats/difficulty
GET /api/category/{category}/stats/complexity
Returns: JSON stats for specific category
```

#### Categories API
```
GET /api/categories
Returns: JSON list of all categories with solution counts
```

#### Solutions API
```
GET /api/category/{category}/solutions
Returns: JSON list of solutions in category
```

#### Solution Views
```
GET /solution/{category}/{filename}
GET /solution/{category}/{filename}/leetcode
GET /solution/{category}/{filename}/view/{language}
```

#### Downloads
```
GET /solution/{category}/{filename}/download/{format}
GET /solution/{category}/{filename}/download/{format}/{language}
Formats: skeleton, solution, leetcode, both
```

#### Upload
```
GET/POST /solution/{category}/{filename}/upload
Upload alternative language solution
```

## Progress Tracking

### Current Statistics
- **Total Solutions**: 298 unique problems across 29 categories (894 total solution files across 3 languages)
- **Languages with Complete Templates**: 7 (Python, JavaScript, TypeScript, Java, C++, Go, Rust)
- **Total Languages Supported**: 13 programming languages
- **Documentation Pages**: 40+ comprehensive guides
- **Categories**: All 29 categories have ≥10 problems each for comprehensive coverage
- **Test Coverage**: 68% overall coverage with 261 tests (211 backend unit + 13 frontend + 37 black box)

### Solution Categories
Arrays & Hashing • Two Pointers • Sliding Window • Stacks • Binary Search • Linked Lists • Trees • Tries • Heap/Priority Queue • Backtracking • Graphs • Advanced Graphs • 1-D Dynamic Programming • 2-D Dynamic Programming • Greedy • Intervals • Math & Geometry • Bit Manipulation • and more

## Contributing

### Adding New Solutions
1. Choose a language template from `docs/developer-guide/templates/`
   - Python, JavaScript, TypeScript, Java, C++, Go, or Rust
2. Follow the language-specific formatting guide in `docs/upload-guide/05-formatting-guidelines/`
3. Use naming convention: `{4-digit-number}-{problem-name}.{ext}.{ext}`
   - Example: `0001-two-sum.py.py` or `0001-two-sum.java.java`
4. Include problem description, explanation, metadata, and test cases
5. Run tests and linting before committing

### Code Quality
```bash
# Type checking
pdm run mypy src/

# Code formatting
pdm run black src/

# Linting
pdm run ruff check src/

# Run tests
pdm run pytest
```

See [docs/upload-guide/README.md](docs/upload-guide/README.md) for detailed guidelines.

## License

MIT License. See [LICENSE](LICENSE) for details.

This project is for educational purposes only.

---

## Appendix: Project Structure

### Task-Oriented Module Organization

The application is organized around **functional tasks** rather than technical layers, making it easy to find all code related to a specific activity in one place.

```
leet_code/
├── README.md                       # This file
├── CHANGELOG.md                    # Version history
├── pyproject.toml                  # PDM configuration
├── pdm.lock                        # Dependency lock file
│
├── src/
│   └── leet_code/                  # Application source (task-oriented structure)
│       │
│       ├── app.py                  # CLI entry point (29 lines)
│       ├── factory.py              # Flask application factory
│       │
│       ├── data/                   # DATA MODELS & CONSTANTS
│       │   ├── category_data.py    # Solution/category models, caching
│       │   ├── language_constants.py  # Language metadata & mappings
│       │   └── markdown_extraction.py # Universal markdown parser
│       │
│       ├── content/                # CONTENT PROCESSING
│       │   ├── content_processing.py  # Extraction, parsing, merging (13 functions)
│       │   └── syntax_highlighting.py # Pygments syntax highlighting
│       │
│       ├── code_generation/        # CODE GENERATION
│       │   ├── skeleton_generator.py  # Template/skeleton generation
│       │   └── leetcode_converter.py  # Snake_case to camelCase conversion
│       │
│       ├── search/                 # SEARCH & DISCOVERY
│       │   ├── search_engine.py    # Query parsing, search execution, filtering
│       │   └── solution_finder.py  # Solution lookup, category enrichment
│       │
│       └── views/                  # FLASK VIEWS (class-based)
│           ├── main_views.py       # Home, categories, virtual categories
│           ├── solution_views.py   # Solution display, downloads, uploads
│           ├── search_views.py     # Search interface
│           └── api_views.py        # JSON API endpoints
│
├── solutions/                      # Problem solutions (298 unique problems, 894 files)
│   ├── arrays-hashing/             # 29 category folders
│   │   ├── python/                # Python solutions
│   │   ├── javascript/            # JavaScript solutions
│   │   ├── typescript/            # TypeScript solutions
│   │   ├── java/                  # Java solutions
│   │   ├── cpp/                   # C++ solutions
│   │   ├── go/                    # Go solutions
│   │   └── rust/                  # Rust solutions
│   ├── two-pointers/
│   ├── sliding-window/
│   └── ...
│
├── docs/                           # Documentation hub
│   ├── README.md                   # Documentation overview
│   ├── markdown-guide/             # Markdown structure guide (10 sections)
│   │   ├── 01-overview.md         # Design principles
│   │   ├── 02-metadata.md         # Title & difficulty
│   │   ├── 03-problem-description.md
│   │   ├── 04-solution-explanation.md
│   │   ├── 05-code-section.md
│   │   ├── 06-language-formatting.md
│   │   ├── 07-processing-flow.md
│   │   ├── 08-best-practices.md
│   │   └── 09-examples.md         # 7 language examples
│   ├── user-guide/                 # User documentation (10 sections)
│   │   ├── browsing/              # Browsing strategies
│   │   └── study/                 # Study methods
│   ├── upload-guide/               # Contributor guide (5 sections)
│   │   └── 05-formatting-guidelines/  # 7 language guides
│   └── developer-guide/            # Developer documentation (11 sections)
│       ├── templates/             # 7 language templates
│       └── 08-language-support/   # Language integration guide
│
├── templates/                      # Flask HTML templates
│   ├── base.html
│   ├── index.html
│   └── solution.html
│
├── static/                         # Static web assets
│   ├── css/
│   └── js/
│
└── tests/                          # Test suite (261 tests total)
    ├── unit/                       # Unit tests (211 tests)
    ├── integration/                # Integration tests (13 tests)
    ├── blackbox/                   # Black box browser automation tests (37 tests)
    └── fixtures/                   # Test fixtures (sample solutions, markdown, categories)
```

### Module Responsibilities

**data/** - Data models and constants
- `category_data.py`: Solution/Category classes, CategoryManager (caching, data loading)
- `language_constants.py`: Language metadata (extensions, names, icons, comment styles)
- `markdown_extraction.py`: Universal language-agnostic markdown extraction from code

**content/** - Content extraction and processing
- `content_processing.py`: Extract problem data, parse explanations, merge content
- `syntax_highlighting.py`: Pygments syntax highlighting with theme support

**code_generation/** - Code transformation
- `skeleton_generator.py`: Generate method signature skeletons for all languages
- `leetcode_converter.py`: Convert Python snake_case to LeetCode camelCase

**search/** - Search and solution discovery
- `search_engine.py`: Parse search queries, execute searches, filter/group results
- `solution_finder.py`: Find solutions, enrich with category metadata, generate paths

**views/** - Flask views (class-based)
- `main_views.py`: Home page, category browsing, virtual categories (difficulty/complexity)
- `solution_views.py`: Solution display, format conversion, downloads, uploads
- `search_views.py`: Search interface, search results
- `api_views.py`: JSON API endpoints (stats, categories, solutions)

For detailed module documentation, see [docs/developer-guide/module-structure/README.md](docs/developer-guide/module-structure/README.md).

---

*A comprehensive LeetCode learning platform with multi-language support, automatic format conversion, and modern web interface.*
