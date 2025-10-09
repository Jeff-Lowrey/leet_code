# Leet Code Learning Tool

> **⚠️ DISCLAIMER**
>
> This is an educational tool provided for learning purposes only. The code and solutions in this repository are provided "AS IS" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of this software.
>
> This project is not affiliated with, endorsed by, or connected to LeetCode in any way.

## 🚀 Features

### Core Functionality
- **Web Interface**: Flask-based solution browser with syntax highlighting
- **Multi-Language Support**: Upload and view solutions in 13+ programming languages
- **Python to LeetCode Conversion**: Automatic conversion for LeetCode submission format
- **Smart Downloads**: Language-aware download system with skeleton/solution/ZIP options
- **Quick Navigation**: Dropdown menus on category cards for direct solution access
- **API Support**: JSON endpoints for dynamic content loading

### Solution Management
- **Organized Categories**: Solutions grouped by problem-solving patterns
- **Alternative Languages**: Upload solutions in Java, C++, JavaScript, Go, Rust, etc.
- **Language Switching**: Toggle between different language implementations
- **Format Options**: View in original format or LeetCode submission format
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
- PDM package manager

### Setup
```bash
# Clone the repository
git clone <repository-url>
cd leet_code

# Install dependencies with PDM
pdm install

# Run the development server
pdm run python -m src.leet_code.app
```

The application will be available at `http://localhost:5000`

## Usage

### Viewing Solutions
1. Navigate to `http://localhost:5000`
2. Browse categories or use quick access dropdowns
3. Click on any solution to view code with syntax highlighting

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

## Project Structure

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
│   │   │       ├── 001-two-sum.java.java
│   │   │       └── 001-two-sum.cpp.cpp
│   │   ├── two-pointers/
│   │   ├── sliding-window/
│   │   ├── stacks/
│   │   ├── binary-search/
│   │   ├── linked-lists/
│   │   └── ...
│   ├── user-guide/                 # User documentation
│   │   └── README.md               # Browsing, downloading, studying
│   └── upload-guide/               # Contributor guide
│       ├── README.md               # Upload and formatting standards
│       ├── SOLUTION_TEMPLATE.py    # Python solution template
│       └── SOLUTION_TEMPLATE.js    # JavaScript solution template
│
├── templates/                      # Flask HTML templates
│   ├── base.html
│   ├── index.html
│   ├── solution.html
│   └── upload_solution.html
│
├── static/                         # Static web assets
│   ├── css/
│   │   └── style.css               # Application styles
│   └── js/                         # JavaScript (if any)
│
└── tests/                          # Test suite
    ├── unit/
    └── integration/
```

## Documentation

### User Guide
Comprehensive guide for browsing, downloading, and studying solutions.
See [docs/user-guide/README.md](docs/user-guide/README.md)

### Upload Guide
Template and formatting standards for contributing solutions.
See [docs/upload-guide/README.md](docs/upload-guide/README.md)

### Supported Languages
- Python (default)
- Java
- C++/C
- JavaScript/TypeScript
- Go
- Rust
- C#
- Swift
- Kotlin
- Ruby
- PHP
- Scala

## API Documentation

### Endpoints

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

This project is for educational purposes only.

---

*A comprehensive LeetCode learning platform with multi-language support, automatic format conversion, and modern web interface.*
