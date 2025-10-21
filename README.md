# Leet Code Learning Tool

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
See [docs/user-guide/README.md](docs/user-guide/README.md)

### Upload Guide
Template and formatting standards for contributing solutions.
See [docs/upload-guide/README.md](docs/upload-guide/README.md)

### Supported Languages
With language-agnostic markdown extraction supporting:
- Python (primary - 276 solutions with full metadata)
- JavaScript (complete coverage - 276 solutions)
- TypeScript
- Java
- C++/C
- C#
- Go
- Rust
- Swift
- Kotlin
- Scala

**File Structure:**
```
solutions/
├── arrays-hashing/
│   ├── python/
│   │   └── 0001-two-sum.py  (4-digit padding)
│   └── javascript/
│       └── 001-two-sum.js
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
- **Total Solutions**: 298+ problems across 29 categories
- **Languages Supported**: 13 programming languages
- **Categories**: Arrays, Two Pointers, Stacks, Binary Search, Linked Lists, Trees, Graphs, Dynamic Programming, and more

### Solution Categories
Arrays & Hashing • Two Pointers • Sliding Window • Stacks • Binary Search • Linked Lists • Trees • Tries • Heap/Priority Queue • Backtracking • Graphs • Advanced Graphs • 1-D Dynamic Programming • 2-D Dynamic Programming • Greedy • Intervals • Math & Geometry • Bit Manipulation • and more

## Contributing

### Adding New Solutions
1. Use solution templates in `docs/upload-guide/`
2. Follow naming convention: `{number}-{problem-name}.py`
3. Include problem description in docstring
4. Run tests and linting before committing

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

```
leet_code/
├── README.md                       # This file
├── CHANGELOG.md                    # Version history
├── pyproject.toml                  # PDM configuration
├── pdm.lock                        # Dependency lock file
│
├── src/
│   └── leet_code/                  # Application source
│       ├── app.py                  # Flask application
│       ├── category_data.py        # Solution data management
│       └── leetcode_converter.py   # Snake_case to camelCase converter
│
├── docs/                           # Documentation hub
│   ├── README.md                   # Documentation overview
│   ├── solutions/                  # Problem solutions (298+)
│   │   ├── arrays-hashing/         # Category folders (29 categories)
│   │   │   ├── 001-two-sum.py     # Python solutions
│   │   │   └── alternatives/       # Other language solutions
│   │   ├── two-pointers/
│   │   ├── sliding-window/
│   │   └── ...
│   ├── user-guide/                 # User documentation
│   ├── upload-guide/               # Contributor guide
│   └── developer-guide/            # Developer documentation
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
└── tests/                          # Test suite
    ├── unit/
    └── integration/
```

---

*A comprehensive LeetCode learning platform with multi-language support, automatic format conversion, and modern web interface.*
