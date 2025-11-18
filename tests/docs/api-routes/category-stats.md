# API Routes: Category Stats Testing

Documentation for testing category statistics API endpoints.

[🏠 Testing Docs](../README.md) | [📂 API Routes](README.md)

---

## Overview

Tests for category statistics API endpoints that provide difficulty and complexity data for solution categories.

**Issue**: [#36 - Fix frontend API route mismatch](https://github.com/Jeff-Lowrey/leet_code/issues/36)

## Endpoints Tested

### 1. Category Difficulty Stats
**Endpoint**: `/api/category/<category>/stats/difficulty`

**Purpose**: Returns difficulty distribution (Easy, Medium, Hard) for solutions in a category

**Response Format**:
```json
{
  "easy": 5,
  "medium": 8,
  "hard": 3
}
```

### 2. Category Complexity Stats
**Endpoint**: `/api/category/<category>/stats/complexity`

**Purpose**: Returns time complexity distribution for solutions in a category

**Response Format**:
```json
{
  "O(n)": 12,
  "O(log n)": 4,
  "O(n^2)": 2
}
```

## Backend Tests

### Test File
**Location**: `tests/unit/test_category_stats_routes.py`

**Framework**: pytest

**Total Tests**: 12 (100% passing)

### Test Classes

#### TestAPICategoryDifficultyStatsRoute (5 tests)

**1. Success Case**
```python
def test_get_difficulty_stats_success(self, mock_manager, client, mock_category):
    """Test successful GET request for category difficulty stats."""
```
- Tests valid category returns correct difficulty counts
- Verifies response is JSON
- Checks data structure

**2. Not Found Case**
```python
def test_get_difficulty_stats_category_not_found(self, mock_manager, client):
    """Test difficulty stats API when category doesn't exist."""
```
- Tests non-existent category returns 404
- Verifies error response format

**3. Empty Category**
```python
def test_get_difficulty_stats_empty_category(self, mock_manager, client):
    """Test difficulty stats with category containing no solutions."""
```
- Tests category with no solutions
- Verifies zero counts returned

**4. Special Characters**
```python
def test_get_difficulty_stats_special_chars_in_slug(self, mock_manager, client, mock_category):
    """Test difficulty stats with special characters in category slug."""
```
- Tests slugs with hyphens and underscores
- Verifies correct handling

**5. Case Sensitivity**
```python
def test_get_difficulty_stats_case_sensitivity(self, mock_manager, client, mock_category):
    """Test difficulty stats with different case in category slug."""
```
- Tests slug case handling
- Verifies manager receives slug as-is

#### TestAPICategoryComplexityStatsRoute (5 tests)

**1. Success Case**
```python
def test_get_complexity_stats_success(self, mock_manager, client, mock_category):
    """Test successful GET request for category complexity stats."""
```
- Tests valid category returns complexity counts
- Verifies response structure

**2. Not Found Case**
```python
def test_get_complexity_stats_category_not_found(self, mock_manager, client):
    """Test complexity stats API when category doesn't exist."""
```
- Tests 404 for non-existent category

**3. Empty Category**
```python
def test_get_complexity_stats_empty_category(self, mock_manager, client):
    """Test complexity stats with category containing no solutions."""
```
- Tests empty category handling

**4. Various Patterns**
```python
def test_get_complexity_stats_various_patterns(self, mock_manager, client):
    """Test complexity stats with various complexity patterns."""
```
- Tests O(1), O(n), O(n log n), O(n^2)
- Verifies multiple complexity types

**5. Unknown Complexity**
```python
def test_get_complexity_stats_unknown_complexity(self, mock_manager, client):
    """Test complexity stats with unknown complexity values."""
```
- Tests None and empty string values
- Verifies graceful handling

#### TestRouteIntegration (2 tests)

**1. Both Routes Same Category**
```python
def test_both_routes_same_category(self, mock_manager, client, mock_category):
    """Test both difficulty and complexity routes for same category."""
```
- Tests both endpoints return valid data
- Verifies consistency

**2. Old Routes Return 404**
```python
def test_route_path_validation(self, mock_manager, client):
    """Test that old route paths no longer work."""
```
- Verifies `/api/stats/category/<cat>/difficulty` returns 404
- Verifies `/api/stats/category/<cat>/complexity` returns 404
- Confirms migration complete

## Running Backend Tests

```bash
# All category stats tests
pytest tests/unit/test_category_stats_routes.py -v

# Specific test class
pytest tests/unit/test_category_stats_routes.py::TestAPICategoryDifficultyStatsRoute -v

# Specific test
pytest tests/unit/test_category_stats_routes.py::TestAPICategoryDifficultyStatsRoute::test_get_success -v

# With coverage
pytest tests/unit/test_category_stats_routes.py --cov=src.leet_code.views.api_views --cov-report=term-missing
```

## Test Fixtures

### mock_category
```python
@pytest.fixture
def mock_category() -> Category:
    """Create mock category with varied solutions."""
    return Category(
        slug="arrays-hashing",
        name="Arrays & Hashing",
        description="Array problems",
        solutions=[
            Solution("001-two-sum.py", "Two Sum", "1", "", "Easy", "O(n)", "O(n)"),
            Solution("002-add-two.py", "Add Two", "2", "", "Easy", "O(n)", "O(1)"),
            Solution("003-longest.py", "Longest", "3", "", "Medium", "O(n)", "O(n)"),
            Solution("004-median.py", "Median", "4", "", "Hard", "O(log n)", "O(1)"),
        ],
    )
```

### app & client
```python
@pytest.fixture
def app() -> Flask:
    """Create test Flask app."""
    from src.leet_code.factory import create_app
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    return flask_app

@pytest.fixture
def client(app: Flask) -> Any:
    """Create test client."""
    return app.test_client()
```

## Coverage

**Target**: 85%+ of route handling logic

**Achieved**: 100% of category stats routes

**Lines Covered**:
- `src/leet_code/views/api_views.py:190-207` (APICategoryDifficultyStatsView)
- `src/leet_code/views/api_views.py:213-229` (APICategoryComplexityStatsView)

## Bug Discovery

These tests discovered a backend bug during creation:

**Bug**: Parameter name mismatch
- Routes defined `<category>` parameter
- Views expected `category_slug` parameter
- Caused `TypeError` when endpoints called

**Fix**: Changed view parameters from `category_slug` to `category` to match routes

## Related Documentation

- [Frontend Route Tests](../frontend/index-routes.md)
- [API Views Module](../../docs/developer-guide/module-structure/07-views-module.md)
- [Issue #36](https://github.com/Jeff-Lowrey/leet_code/issues/36)

---

[🏠 Testing Docs](../README.md) | [📂 API Routes](README.md)
