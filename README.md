# LeetCode Solutions Platform

> **⚠️ DISCLAIMER**
>
> This is an educational tool provided for learning purposes only. The code and solutions in this repository are provided "AS IS" without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of this software.
>
> This project is not affiliated with, endorsed by, or connected to LeetCode in any way.

## 🚀 Features

### Core Functionality
- **Web Interface**: Flask-based solution browser with syntax highlighting
- **Multi-Language Support**: Upload and view solutions in 13+ programming languages
- **Python to LeetCode conversion **: Automatic conversion for LeetCode submission format
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
  - LeetCode formatted skelton and solution
  - ZIP bundle with all formats

## 📋 Table of Contents
1. [Features](#-features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Project Structure](#project-structure)
5. [Features in Detail](#features-in-detail)
6. [Development](#development)
7. [API Documentation](#api-documentation)
8. [Progress Tracking](#progress-tracking)
9. [Contributing](#contributing)
10. [License](#license)

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
pdm run python -m flask run
```

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
├── README.md                    # This file
├── pyproject.toml              # PDM configuration
├── pdm.lock                    # Lock file for dependencies
├── app.py                      # Flask application
├── category_data.py            # Solution data management
├── leetcode_converter.py       # Snake_case to camelCase converter
├── generate_docs.py            # Documentation generator
│
├── solutions/                  # Problem solutions
│   ├── arrays-hashing/         # Category folders
│   │   ├── 001-two-sum.py     # Python solutions
│   │   └── alternatives/      # Other language solutions
│   │       ├── 001-two-sum.java.java
│   │       └── 001-two-sum.cpp.cpp
│   ├── two-pointers/
│   ├── sliding-window/
│   └── ...
│
├── docs/                       # Problem documentation
│   ├── arrays-hashing/
│   └── ...
│
├── templates/                  # HTML templates
│   ├── base.html
│   ├── index.html
│   ├── solution.html
│   └── upload_solution.html
│
└── static/                     # Static assets
    ├── css/
    │   └── style.css
    └── js/
```

## Features in Detail

### Multi-Language Support
Supported languages:
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

### Download System
Each download is language-aware:
- **Python**: `.py` files with optional LeetCode format
- **Other Languages**: Native file extensions (.java, .cpp, etc.)
- **ZIP Format**: Contains skeleton, solution, and LeetCode skeleton and solution
  - Python code is converted to LeetCode format.


### Quick Access Dropdowns
- Shows first 10 solutions per category
- Direct navigation without intermediate pages
- "View all" link for categories with 10+ solutions

## Development

### Adding New Solutions
1. Create solution file in appropriate category folder
2. Follow naming convention: `{number}-{problem-name}.py`
3. Include problem description in docstring
4. Run tests and linting before committing

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
- **Total Solutions**: 50+ problems across 15+ categories
- **Languages Supported**: 13 programming languages
- **Categories**: Arrays, Two Pointers, Trees, Graphs, DP, and more

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting
4. Submit a pull request

## License

This project is for educational purposes.

---

*A comprehensive LeetCode solutions platform with multi-language support, automatic format conversion, and modern development tools.*
