# Quality checks for Python and JavaScript code

# Show available commands
default:
    @just --list

# Run all quality checks (Python + JavaScript)
quality: python-quality js-quality
    @echo "✓ All quality checks passed!"

# Auto-fix all issues (Python + JavaScript)
quality-fix: python-quality-fix js-quality-fix
    @echo "✓ All issues auto-fixed!"

# ============================================
# Python Quality Checks
# ============================================

# Run all Python quality checks
python-quality: python-type python-lint python-format-check python-security
    @echo "✓ Python quality checks passed!"

# Auto-fix Python issues
python-quality-fix: python-lint-fix python-format-fix
    @echo "✓ Python issues auto-fixed!"

# Type checking with mypy
python-type:
    @echo "Running mypy..."
    python -m mypy src/

# Linting with ruff
python-lint:
    @echo "Running ruff check..."
    python -m ruff check src/ tests/

# Auto-fix linting issues
python-lint-fix:
    @echo "Running ruff check --fix..."
    python -m ruff check --fix src/ tests/

# Check code formatting
python-format-check:
    @echo "Checking formatting..."
    python -m ruff format --check src/ tests/

# Auto-format code
python-format-fix:
    @echo "Formatting code..."
    python -m ruff format src/ tests/

# Security scan with bandit
python-security:
    @echo "Running bandit security scan..."
    python -m bandit -r src/ -ll

# ============================================
# JavaScript Quality Checks
# ============================================

# Run all JavaScript quality checks
js-quality: js-deps js-lint js-format-check js-security
    @echo "✓ JavaScript quality checks passed!"

# Auto-fix JavaScript issues
js-quality-fix: js-deps js-lint-fix js-format-fix js-security-fix
    @echo "✓ JavaScript issues auto-fixed!"

# Install JavaScript dependencies
js-deps:
    @if [ ! -d "node_modules" ]; then \
        echo "Installing JavaScript dependencies..."; \
        npm install; \
    fi

# Linting with ESLint
js-lint: js-deps
    @echo "Running ESLint..."
    npm run lint

# Auto-fix linting issues
js-lint-fix: js-deps
    @echo "Running ESLint --fix..."
    npm run lint:fix

# Check code formatting
js-format-check: js-deps
    @echo "Checking Prettier formatting..."
    npm run format

# Auto-format code
js-format-fix: js-deps
    @echo "Running Prettier..."
    npm run format:fix

# Security scan
js-security: js-deps
    @echo "Running npm audit and ESLint security..."
    npm run security

# Auto-fix security issues
js-security-fix: js-deps
    @echo "Running npm audit fix..."
    npm run security:fix

# ============================================
# Testing
# ============================================

# Run Python tests
test:
    @echo "Running pytest..."
    python -m pytest tests/ -v

# Run Python tests with coverage
test-coverage:
    @echo "Running pytest with coverage..."
    python -m pytest tests/ --cov=src/leet_code --cov-report=term-missing

# ============================================
# Data Processing
# ============================================

# Extract tags from all solution files
extract-tags:
    @echo "Extracting tags from solution files..."
    python scripts/extract_tags.py --verbose

# Force re-extract tags (ignore existing cache)
extract-tags-force:
    @echo "Force extracting tags from solution files..."
    python scripts/extract_tags.py --verbose --force

# Show tag cache statistics
tag-stats:
    @echo "Tag cache statistics..."
    python scripts/extract_tags.py --verbose

# ============================================
# Combined Commands
# ============================================

# Run everything: quality checks + tests
ci: quality test
    @echo "✓ All CI checks passed!"

# Clean build artifacts
clean:
    @echo "Cleaning build artifacts..."
    rm -rf __pycache__ .pytest_cache .mypy_cache .ruff_cache
    find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
    find . -type f -name "*.pyc" -delete
    @echo "✓ Cleaned!"

# Clean tag cache
clean-tags:
    @echo "Cleaning tag cache..."
    rm -f data/problem_tags.json
    @echo "✓ Tag cache removed!"
