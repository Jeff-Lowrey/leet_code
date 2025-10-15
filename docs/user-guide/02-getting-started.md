# Getting Started

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Browsing Solutions →](03-browsing-solutions.md)

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Steps](#installation-steps)
- [First-Time Navigation](#first-time-navigation)
- [Verifying Installation](#verifying-installation)
- [Common Setup Issues](#common-setup-issues)
- [Next Steps](#next-steps)

## Prerequisites

Before installing the Leet Code Learning Tool, ensure you have:

- **Python 3.13 or higher** - [Download Python](https://www.python.org/downloads/)
- **PDM (Python Development Master)** - Modern Python package manager
- **Git** - For cloning the repository
- **Web Browser** - Chrome, Firefox, Safari, or Edge

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd leet_code
```

### 2. Install Dependencies

The project uses PDM for dependency management:

```bash
# Install PDM if you don't have it
pip install pdm

# Install project dependencies
pdm install
```

This will:
- Create a virtual environment
- Install all required packages
- Set up the development environment

### 3. Run the Development Server

Start the Flask application:

```bash
pdm run python -m src.leet_code.app
```

You should see output similar to:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

### 4. Access the Web Interface

Open your web browser and navigate to:

```
http://localhost:5000
```

You should see the main page with category cards displaying all available algorithm categories.

## First-Time Navigation

### Home Page Overview

When you first access the application, you'll see:

1. **Header**: Application title and navigation
2. **Category Grid**: Visual cards for each algorithmic category
3. **Quick Access Dropdowns**: Fast navigation to specific solutions
4. **Solution Counts**: Number of solutions available in each category

### Categories Available

The home page displays 29+ algorithmic categories, including:

- **Arrays & Hashing** - Fundamental array operations
- **Two Pointers** - Efficient array traversal techniques
- **Sliding Window** - Subarray and substring problems
- **Stacks** - Stack-based problem solving
- **Binary Search** - Efficient search algorithms
- **Linked Lists** - Pointer manipulation
- **Trees & Tries** - Tree traversal and structure
- **Dynamic Programming** - Optimization problems
- **Graphs** - Graph traversal and algorithms
- **And 20+ more categories**

### Quick Navigation Tips

1. **Browse by Category**: Click any category card to view all solutions in that category
2. **Quick Access Dropdown**: Use the dropdown on each card to jump directly to a specific problem
3. **Search**: Use browser search (Ctrl/Cmd+F) to find specific problems on the home page

## Verifying Installation

To verify everything is working correctly:

1. **Home Page Loads**: Category cards appear with solution counts
2. **Navigation Works**: Clicking a category shows the solutions list
3. **Solution Display**: Clicking a solution shows syntax-highlighted code
4. **No Errors**: Check the terminal for any error messages

## Common Setup Issues

### Port Already in Use

If port 5000 is already in use:
```bash
# Use a different port
pdm run python -m src.leet_code.app --port 5001
```

Then access at `http://localhost:5001`

### PDM Not Found

If PDM is not installed:
```bash
# Install PDM globally
pip install pdm

# Or use pipx
pipx install pdm
```

### Python Version Issues

Ensure you're using Python 3.13+:
```bash
python --version  # Should show Python 3.13.x or higher
```

## Next Steps

Now that you have the application running:

1. **Browse Solutions**: Explore the various categories
2. **Study Code**: View detailed solutions with explanations
3. **Download Options**: Try downloading skeletons and solutions
4. **Upload Alternatives**: Contribute solutions in other languages

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Browsing Solutions →](03-browsing-solutions.md)
