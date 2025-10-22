# Testing Procedures

[← Previous: Adding Features](06-adding-features.md) | [🏠 Home](README.md) | [Next: Language Support →](08-language-support/README.md)

---

## Table of Contents

- [Overview](#overview)
- [Testing Environment Setup](#testing-environment-setup)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [Type Checking](#type-checking)
- [Code Linting](#code-linting)
- [Security Testing](#security-testing)
- [Manual Testing](#manual-testing)
- [Continuous Integration](#continuous-integration)

## Overview

Quality assurance is critical for maintaining a reliable codebase. This guide covers all testing procedures, from development to deployment.

## Development Environment Setup

### Prerequisites

```bash
# Install PDM if not already installed
curl -sSL https://pdm.fming.dev/install-pdm.py | python3 -

# Or with pip
pip install --user pdm
```

### Initial Setup

```bash
# Navigate to project directory
cd /path/to/leet_code

# Install all dependencies (including dev dependencies)
pdm install

# Verify installation
pdm list
```

### Virtual Environment

PDM automatically creates and manages a virtual environment:

```bash
# Activate virtual environment (optional - PDM runs commands in venv automatically)
source .venv/bin/activate  # Linux/macOS
# or
.venv\Scripts\activate     # Windows

# Check Python version
python --version  # Should be 3.13.x

# Deactivate when done
deactivate
```

### Environment Activation

**For this session**:
```bash
# PDM manages the venv automatically, but to activate manually:
source $(pdm venv activate)

# Or find the venv path and activate
pdm info  # Shows venv location
source /path/to/.venv/bin/activate
```

## Quality Checks

### 1. Syntax Checking

#### Python Syntax Check

```bash
# Check single file
python -m py_compile src/leet_code/app.py

# Check all Python files
find src -name "*.py" -exec python -m py_compile {} \;

# Or use PDM
pdm run python -m py_compile src/leet_code/app.py
```

**What it checks**:
- Syntax errors
- Import errors
- Basic structural issues

**Exit codes**:
- `0`: Success (no errors)
- `1`: Syntax error found

#### JavaScript Syntax Check

```bash
# Check single file
node --check static/js/main.js

# Check all JavaScript files
find docs/solutions -name "*.js" -exec node --check {} \;
```

**What it checks**:
- Syntax errors
- Parse errors
- Basic structural issues

### 2. Type Checking

**Configuration**: [`pyproject.toml:35-51`](../../pyproject.toml)

```toml
[tool.mypy]
python_version = "3.13"
strict = true
warn_return_any = true
warn_unused_configs = true
```

#### Run Type Checking

```bash
# Check entire src/ directory
pdm run mypy src/

# Check specific file
pdm run mypy src/leet_code/app.py

# Check with strict mode (recommended)
pdm run mypy --strict src/
```

**What it checks**:
- Type annotation correctness
- Type compatibility
- Missing type hints
- Any type usage
- Optional type handling

**Common Issues**:

```python
# ❌ Missing return type
def get_data(id):
    return data

# ✅ With type annotation
def get_data(id: str) -> dict[str, Any]:
    return data

# ❌ Implicit Any
def process(items):
    return [x * 2 for x in items]

# ✅ Explicit types
def process(items: list[int]) -> list[int]:
    return [x * 2 for x in items]
```

### 3. Linting

**Configuration**: [`pyproject.toml:56-58`](../../pyproject.toml)

```toml
[tool.ruff.lint]
select = ["E", "F", "I", "N", "UP", "B", "C4", "SIM"]
ignore = ["E501", "N802", "N803"]
```

#### Run Linting

```bash
# Lint entire src/ directory
pdm run ruff check src/

# Lint with auto-fix
pdm run lint  # Defined in pyproject.toml
# Or
pdm run ruff check src/ --fix

# Check without fixing
pdm run lint-check
```

**What it checks**:
- Code style (PEP 8)
- Unused imports
- Undefined names
- Simplification opportunities
- Best practice violations

**Rule Categories**:
- `E`: Pycodestyle errors
- `F`: Pyflakes (logical errors)
- `I`: Import sorting
- `N`: Naming conventions
- `UP`: Modern Python upgrades
- `B`: Bugbear (common bugs)
- `C4`: Comprehensions
- `SIM`: Simplification

### 4. Code Formatting

```bash
# Format entire project
pdm run format  # Defined in pyproject.toml
# Or
pdm run ruff format src/ tests/

# Check formatting without changes
pdm run format-check
# Or
pdm run ruff format --check src/ tests/
```

**What it fixes**:
- Indentation (spaces vs tabs)
- Line length (120 chars max)
- Quote style (double quotes)
- Trailing whitespace
- Blank lines

**Format Rules** ([`pyproject.toml:29-33`](../../pyproject.toml)):
```toml
[tool.ruff.format]
quote-style = "double"
indent-style = "space"
line-ending = "auto"
```

### 5. Security Scanning

```bash
# Run bandit security scanner
pdm run bandit -r src/

# With specific confidence level
pdm run bandit -r src/ -ll  # Low severity or higher

# Generate report
pdm run bandit -r src/ -f json -o security-report.json
```

**What it checks**:
- SQL injection vulnerabilities
- Command injection risks
- Hard-coded credentials
- Use of unsafe functions
- Weak cryptography

**Note**: Security scanning is excluded for solution files (educational code).

## Running the Application

### Development Server

```bash
# Default (localhost:9501)
pdm run python -m src.leet_code.app

# Custom host and port
pdm run python -m src.leet_code.app --host 0.0.0.0 --port 8080

# Disable debug mode
pdm run python -m src.leet_code.app --debug false
```

### Flask Development Commands

```bash
# Using PDM script
pdm run flask

# Set Flask app environment variable
export FLASK_APP=src.leet_code.app
export FLASK_ENV=development

# Run Flask directly
flask run

# Run on specific port
flask run --port 8080
```

### Testing the Web Interface

**Manual Testing Checklist**:

1. **Homepage** (`/`)
   - [ ] Category grid displays correctly
   - [ ] Statistics are accurate
   - [ ] Navigation links work

2. **Category View** (`/category/arrays-hashing`)
   - [ ] Solutions list correctly
   - [ ] Difficulty badges show
   - [ ] Complexity data displays

3. **Solution View** (`/solution/arrays-hashing/001-two-sum`)
   - [ ] Problem description renders
   - [ ] Code highlighting works
   - [ ] Skeleton code generates
   - [ ] Download buttons work

4. **Downloads** (`/solution/.../download/both`)
   - [ ] ZIP file downloads
   - [ ] Contains all expected files
   - [ ] Files have correct content

5. **Alternative Languages** (`/solution/.../view/JavaScript`)
   - [ ] JavaScript solutions display
   - [ ] Syntax highlighting correct
   - [ ] Download works

## Automated Testing

### Unit Tests

**Create test file**: `tests/test_category_data.py`

```python
import pytest
from pathlib import Path
from src.leet_code.category_data import CategoryManager, Category, Solution

@pytest.fixture
def manager():
    """Create CategoryManager instance."""
    return CategoryManager()

def test_get_categories(manager):
    """Test getting all categories."""
    categories = manager.get_categories()
    assert len(categories) > 0
    assert all(isinstance(cat, Category) for cat in categories)

def test_get_category(manager):
    """Test getting specific category."""
    category = manager.get_category("arrays-hashing")
    assert category is not None
    assert category.slug == "arrays-hashing"
    assert category.name == "Arrays Hashing"

def test_get_solution(manager):
    """Test getting specific solution."""
    solution = manager.get_solution("arrays-hashing", "001-two-sum.py")
    assert solution is not None
    assert solution.filename == "001-two-sum.py"
    assert solution.number == "001"
    assert solution.name == "Two Sum"

def test_read_solution_content(manager):
    """Test reading solution file."""
    content = manager.read_solution_content("arrays-hashing", "001-two-sum.py")
    assert content is not None
    assert "class Solution" in content

def test_get_statistics(manager):
    """Test statistics calculation."""
    stats = manager.get_statistics()
    assert "total_categories" in stats
    assert "total_solutions" in stats
    assert stats["total_categories"] > 0
    assert stats["total_solutions"] > 0
```

### Run Tests

```bash
# Run all tests
pdm run test
# Or
pdm run pytest

# Run specific test file
pdm run pytest tests/test_category_data.py

# Run specific test function
pdm run pytest tests/test_category_data.py::test_get_categories

# Run with coverage
pdm run pytest --cov=src --cov-report=html

# View coverage report
open htmlcov/index.html  # macOS
xdg-open htmlcov/index.html  # Linux
```

### Integration Tests

**Test Flask routes**:

```python
# tests/test_routes.py
import pytest
from src.leet_code.app import app

@pytest.fixture
def client():
    """Create test client."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index(client):
    """Test homepage."""
    rv = client.get('/')
    assert rv.status_code == 200
    assert b'LeetCode Learning Tool' in rv.data

def test_category_view(client):
    """Test category page."""
    rv = client.get('/category/arrays-hashing')
    assert rv.status_code == 200
    assert b'Arrays' in rv.data

def test_solution_view(client):
    """Test solution page."""
    rv = client.get('/solution/arrays-hashing/001-two-sum')
    assert rv.status_code == 200
    assert b'Two Sum' in rv.data

def test_404(client):
    """Test 404 page."""
    rv = client.get('/nonexistent')
    assert rv.status_code == 404
```

## Complete Quality Check Workflow

### Pre-Commit Checklist

Run all checks before committing:

```bash
# 1. Syntax check
python -m py_compile src/leet_code/*.py

# 2. Type check
pdm run typecheck

# 3. Lint
pdm run lint-check

# 4. Format check
pdm run format-check

# 5. Run tests
pdm run test

# 6. Security scan
pdm run bandit -r src/
```

### Automated Script

**Create `check_quality.sh`**:

```bash
#!/bin/bash

echo "=== Running Quality Checks ==="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track failures
FAILED=0

# Type checking
echo -e "\n${GREEN}Running type checks...${NC}"
if pdm run mypy src/; then
    echo "✓ Type checks passed"
else
    echo -e "${RED}✗ Type checks failed${NC}"
    FAILED=1
fi

# Linting
echo -e "\n${GREEN}Running linter...${NC}"
if pdm run ruff check src/; then
    echo "✓ Linting passed"
else
    echo -e "${RED}✗ Linting failed${NC}"
    FAILED=1
fi

# Formatting
echo -e "\n${GREEN}Checking formatting...${NC}"
if pdm run ruff format --check src/ tests/; then
    echo "✓ Formatting check passed"
else
    echo -e "${RED}✗ Formatting check failed${NC}"
    FAILED=1
fi

# Tests
echo -e "\n${GREEN}Running tests...${NC}"
if pdm run pytest; then
    echo "✓ Tests passed"
else
    echo -e "${RED}✗ Tests failed${NC}"
    FAILED=1
fi

# Summary
echo -e "\n=== Summary ==="
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All checks passed!${NC}"
    exit 0
else
    echo -e "${RED}Some checks failed!${NC}"
    exit 1
fi
```

**Usage**:
```bash
chmod +x check_quality.sh
./check_quality.sh
```

## Continuous Integration

### GitHub Actions Example

**`.github/workflows/ci.yml`**:

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.13'

    - name: Install PDM
      run: pip install pdm

    - name: Install dependencies
      run: pdm install

    - name: Type checking
      run: pdm run mypy src/

    - name: Linting
      run: pdm run ruff check src/

    - name: Formatting
      run: pdm run ruff format --check src/ tests/

    - name: Run tests
      run: pdm run pytest --cov=src

    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## Deployment Testing

### Pre-Deployment Checklist

- [ ] All quality checks pass
- [ ] Tests pass
- [ ] Documentation updated
- [ ] Dependencies up to date
- [ ] Environment variables configured
- [ ] Database migrations applied (if any)
- [ ] Backup created

### Production Testing

```bash
# 1. Pull latest code
git pull origin main

# 2. Install production dependencies only
pdm install --prod

# 3. Run application
pdm run python -m src.leet_code.app --debug false

# 4. Test key features
curl http://localhost:9501/
curl http://localhost:9501/category/arrays-hashing
curl http://localhost:9501/api/categories

# 5. Check logs for errors
tail -f /var/log/leet-code/error.log
```

## Troubleshooting

### Common Issues

**Issue**: `ModuleNotFoundError: No module named 'flask'`

**Solution**:
```bash
# Ensure dependencies are installed
pdm install

# Verify Flask is in venv
pdm run pip list | grep Flask
```

---

**Issue**: `mypy` finds type errors in solution files

**Solution**:
```bash
# Solution files are excluded from type checking
# Only check src/ directory
pdm run mypy src/

# Not docs/solutions/
```

---

**Issue**: Tests fail with import errors

**Solution**:
```bash
# Ensure PYTHONPATH includes project root
export PYTHONPATH="${PYTHONPATH}:$(pwd)"

# Or run with PDM
pdm run pytest
```

---

**Issue**: Flask app doesn't start

**Solution**:
```bash
# Check for syntax errors
python -m py_compile src/leet_code/app.py

# Check for import errors
python -c "from src.leet_code.app import app"

# Check port availability
lsof -i :9501

# Try different port
pdm run python -m src.leet_code.app --port 8080
```

## Performance Testing

### Load Testing with Apache Bench

```bash
# Install Apache Bench
sudo apt-get install apache2-utils  # Linux
brew install httpd  # macOS

# Test homepage
ab -n 100 -c 10 http://localhost:9501/

# Test solution view
ab -n 100 -c 10 http://localhost:9501/solution/arrays-hashing/001-two-sum
```

**Metrics to monitor**:
- Requests per second
- Time per request
- Transfer rate
- Failed requests

### Profiling

```bash
# Profile Python code
pdm run python -m cProfile -o profile.stats -m src.leet_code.app

# View results
pdm run python -c "import pstats; p = pstats.Stats('profile.stats'); p.sort_stats('cumulative'); p.print_stats(20)"
```

## Summary

**Essential commands**:

```bash
# Setup
pdm install

# Quality checks
pdm run typecheck          # Type checking
pdm run lint              # Linting with auto-fix
pdm run lint-check        # Linting without fix
pdm run format            # Format code
pdm run format-check      # Check formatting
pdm run test              # Run tests

# Run application
pdm run python -m src.leet_code.app
```

**Before every commit**:
1. Run `pdm run typecheck`
2. Run `pdm run lint`
3. Run `pdm run format`
4. Run `pdm run test`
5. Test manually in browser

---

[← Previous: Adding Features](06-adding-features.md) | [🏠 Home](README.md) | [Next: Language Support →](08-language-support/README.md)
