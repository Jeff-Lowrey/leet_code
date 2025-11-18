# Testing Overview

[🏠 Testing Docs Home](README.md) | [Next: Backend Unit Tests →](02-backend-unit-tests.md)

---

## Introduction

The LeetCode Learning Tool uses a comprehensive test suite to ensure code quality, prevent regressions, and maintain reliability across all features.

## Test Organization

### Directory Structure

```
tests/
├── docs/                    # Testing documentation
├── unit/                    # Backend unit tests (isolated component testing)
├── integration/             # Backend integration tests (multi-component)
├── *.test.js               # Frontend unit tests (Vitest)
└── fixtures/               # Test data and utilities (future)
```

### Test Types

**Unit Tests**:
- Test individual functions, classes, or modules in isolation
- Fast execution (<1ms per test)
- Use mocks/stubs for dependencies
- Located in `tests/unit/`

**Integration Tests**:
- Test multiple components working together
- Test actual workflows and data flow
- May use test database or filesystem
- Located in `tests/integration/`

**Frontend Tests**:
- Test JavaScript code and UI logic
- DOM simulation with jsdom
- Route validation and API calls
- Located in `tests/*.test.js`

## Testing Frameworks

### Backend: pytest

**Why pytest?**
- Powerful fixture system
- Rich plugin ecosystem
- Clear assertion messages
- Excellent Flask integration

**Configuration**: `pyproject.toml`

```toml
[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
```

### Frontend: Vitest

**Why Vitest?**
- Modern, fast, and lightweight
- Jest-compatible API
- Native ESM support
- Better DX than Jest

**Configuration**: `vitest.config.js`

**Added in**: Issue #36 (November 2025)

## Running Tests

### Backend Tests

```bash
# All backend tests
pytest tests/

# Specific file
pytest tests/unit/test_category_stats_routes.py

# Specific test class
pytest tests/unit/test_category_stats_routes.py::TestAPICategoryDifficultyStatsRoute

# Specific test function
pytest tests/unit/test_category_stats_routes.py::TestAPICategoryDifficultyStatsRoute::test_get_success

# With verbose output
pytest tests/ -v

# With coverage
pytest tests/ --cov=src.leet_code

# With coverage report
pytest tests/ --cov=src.leet_code --cov-report=term-missing
```

### Frontend Tests

```bash
# All frontend tests
npm test

# With coverage
npm run test:coverage

# Watch mode (auto-rerun on changes)
npm run test:watch

# Interactive UI
npm run test:ui

# Specific test file
npx vitest tests/test_index_routes.test.js
```

### All Tests

```bash
# Run both backend and frontend
pytest tests/ && npm test
```

## Test Statistics

### Current Coverage (as of Issue #36)

**Overall**: 68%

**Backend Tests**:
- Total: 211 tests
- Passing: 203 tests
- Failing: 8 tests (search view issues)
- Pass rate: 96%

**Frontend Tests**:
- Total: 13 tests
- Passing: 13 tests
- Pass rate: 100%

**Combined**:
- Total: 224 tests
- Passing: 216 tests
- Pass rate: 96%

### Coverage by Module

| Module | Coverage | Status |
|--------|----------|--------|
| `leetcode_converter.py` | 94% | ✅ Excellent |
| `markdown_extraction.py` | 96% | ✅ Excellent |
| `main_views.py` | 99% | ✅ Excellent |
| `solution_views.py` | 92% | ✅ Excellent |
| `search_engine.py` | 81% | ✅ Good |
| `docs_views.py` | 84% | ✅ Good |
| `category_data.py` | 76% | ✅ Good |
| `api_views.py` | 68% | ⚠️ Moderate |
| `solution_finder.py` | 67% | ⚠️ Moderate |
| `skeleton_generator.py` | 38% | ❌ Low |
| `content_processing.py` | 12% | ❌ Low |
| `syntax_highlighting.py` | 0% | ❌ None |
| `generate_docs.py` | 0% | ❌ None |

### Coverage Goals

**Target**: 85% overall coverage

See [Issue #38](https://github.com/Jeff-Lowrey/leet_code/issues/38) for coverage improvement plan.

## Test File Naming Conventions

### Backend (pytest)

**Pattern**: `test_<module_name>.py`

Examples:
- `test_category_data.py` - Tests for `category_data.py`
- `test_views_api.py` - Tests for `api_views.py`
- `test_search_engine.py` - Tests for `search_engine.py`

### Frontend (Vitest)

**Pattern**: `<feature>.test.js`

Examples:
- `test_index_routes.test.js` - Tests for `static/js/pages/index.js`

## Test Class/Function Naming

### Backend (pytest)

**Classes**: `Test<FeatureName>`
```python
class TestAPICategoryDifficultyStatsRoute:
    """Test /api/category/<category>/stats/difficulty endpoint."""
```

**Functions**: `test_<what_it_tests>`
```python
def test_get_difficulty_stats_success(self, mock_manager, client):
    """Test successful GET request for category difficulty stats."""
```

### Frontend (Vitest)

**Describe blocks**: Feature or component name
```javascript
describe('Index Page Category Stats API Routes', () => {
```

**Test functions**: `should <expected behavior>`
```javascript
test('should call correct API route for difficulty stats', () => {
```

## Continuous Testing

### Watch Mode

**Backend**:
```bash
pytest tests/ --watch  # Requires pytest-watch
```

**Frontend**:
```bash
npm run test:watch
```

### Pre-commit Hooks

Tests can be run automatically before commits using git hooks (future enhancement).

## Common Test Patterns

### Arrange-Act-Assert (AAA)

```python
def test_example():
    # Arrange - Set up test data and mocks
    mock_data = {"key": "value"}

    # Act - Execute the code under test
    result = function_under_test(mock_data)

    # Assert - Verify the expected outcome
    assert result == expected_value
```

### Fixtures (pytest)

```python
@pytest.fixture
def mock_category():
    """Create mock category for testing."""
    return Category(
        slug="test-category",
        name="Test Category",
        solutions=[]
    )

def test_with_fixture(mock_category):
    # Use the fixture
    assert mock_category.slug == "test-category"
```

### Mocking (Vitest)

```javascript
import { describe, test, expect, vi } from 'vitest';

test('mocked function', () => {
    const mockFn = vi.fn();
    mockFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
});
```

## Test Isolation

Each test should be independent and not rely on:
- Order of execution
- State from other tests
- External services (unless integration test)
- Filesystem state (unless necessary)

Use fixtures, mocks, and setup/teardown to ensure isolation.

## Next Steps

- [Backend Unit Tests →](02-backend-unit-tests.md)
- [Frontend Unit Tests →](04-frontend-unit-tests.md)
- [Writing Effective Tests →](06-writing-tests.md)

---

[🏠 Testing Docs Home](README.md) | [Next: Backend Unit Tests →](02-backend-unit-tests.md)
