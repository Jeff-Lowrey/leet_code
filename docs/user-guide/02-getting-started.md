# Getting Started

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Browsing Solutions →](browsing/README.md)

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
- **Git** - For cloning the repository
- **Web Browser** - Chrome, Firefox, Safari, or Edge

## Installation Steps

### Quick Start (Recommended)

The easiest way to get started:

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd leet_code
```

#### 2. Run the Application

```bash
./run.sh
```

The script will automatically:
- Create a virtual environment
- Install all required dependencies (Flask, Markdown, Pygments)
- Start the development server

You should see output similar to:
```
Starting Learning Web App for Leet Code problems...
Installing dependencies...
Starting server at http://127.0.0.1:9501
 * Running on http://127.0.0.1:9501
 * Press CTRL+C to quit
```

#### 3. Access the Web Interface

Open your web browser and navigate to:

```
http://127.0.0.1:9501
```

You should see the main page with category cards displaying all available algorithm categories.

#### Custom Host/Port

To run on a different host or port:

```bash
./run.sh --host 0.0.0.0 --port 8080
```

### Alternative Setup (For Development)

If you prefer using PDM for development:

```bash
# Install PDM if you don't have it
pip install pdm

# Install project dependencies
pdm install

# Run the development server
pdm run python -m src.leet_code.app
```

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

If port 9501 is already in use:
```bash
# Use a different port with run.sh
./run.sh --port 9502
```

Then access at `http://127.0.0.1:9502`

### Permission Denied for run.sh

If you get a permission error:
```bash
# Make the script executable
chmod +x run.sh

# Then run it
./run.sh
```

### Python Version Issues

Ensure you're using Python 3.13+:
```bash
python --version  # Should show Python 3.13.x or higher
python3 --version  # Try this if python command doesn't work
```

### PDM Not Found (Development Setup Only)

If you're using the PDM method and PDM is not installed:
```bash
# Install PDM globally
pip install pdm

# Or use pipx
pipx install pdm
```

## Next Steps

Now that you have the application running:

1. **Browse Solutions**: Explore the various categories
2. **Study Code**: View detailed solutions with explanations
3. **Download Options**: Try downloading skeletons and solutions
4. **Upload Alternatives**: Contribute solutions in other languages

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Browsing Solutions →](browsing/README.md)
