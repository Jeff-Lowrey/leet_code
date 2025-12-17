# API Routes Testing

Documentation for testing API endpoint routes.

[🏠 Testing Docs](../README.md)

---

## Overview

This section documents tests for Flask API endpoints that provide JSON data to the frontend and external clients.

## API Route Categories

### Category Statistics
- [Category Stats Routes](category-stats.md) - Difficulty and complexity statistics
  - `/api/category/<category>/stats/difficulty`
  - `/api/category/<category>/stats/complexity`

### Other API Routes (Not Yet Documented)
- `/api/categories` - List all categories
- `/api/category/<category>/solutions` - Solutions in a category
- `/api/search` - Search solutions
- `/api/stats/difficulty` - Global difficulty stats
- `/api/stats/complexity` - Global complexity stats

## Test Organization

**Location**: `tests/unit/test_views_api.py` and related files

**Framework**: pytest with Flask test client

**Pattern**: Each API endpoint has dedicated test class

## Running API Tests

```bash
# All API tests
pytest tests/unit/test_views_api.py -v

# Specific endpoint tests
pytest tests/unit/test_category_stats_routes.py -v

# With coverage
pytest tests/unit/ --cov=src.leet_code.views.api_views
```

## Common Test Patterns

### Success Case
```python
def test_get_success(self, mock_manager, client):
    """Test successful GET request."""
    mock_manager.get_data.return_value = expected_data

    response = client.get("/api/endpoint")

    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert data == expected_data
```

### Not Found Case
```python
def test_get_not_found(self, mock_manager, client):
    """Test 404 when resource doesn't exist."""
    mock_manager.get_data.return_value = None

    response = client.get("/api/endpoint/nonexistent")

    assert response.status_code == 404
```

### Empty Data Case
```python
def test_get_empty(self, mock_manager, client):
    """Test handling of empty results."""
    mock_manager.get_data.return_value = []

    response = client.get("/api/endpoint")

    assert response.status_code == 200
    data = response.get_json()
    assert data == []
```

## Test Fixtures

### Flask App
```python
@pytest.fixture
def app() -> Flask:
    """Create test Flask app."""
    from src.leet_code.factory import create_app
    flask_app = create_app()
    flask_app.config["TESTING"] = True
    return flask_app
```

### Test Client
```python
@pytest.fixture
def client(app: Flask):
    """Create test client."""
    return app.test_client()
```

## Coverage Goals

- **Target**: 85%+ coverage of API views
- **Current**: 68% (see [Test Coverage](../07-test-coverage.md))
- **Priority**: Category stats routes (100% covered)

## Related Documentation

- [Backend Unit Tests](../02-backend-unit-tests.md)
- [API Views Module](../../../docs/developer-guide/module-structure/07-views-module.md)
- [Flask Testing](https://flask.palletsprojects.com/en/3.0.x/testing/)

---

[🏠 Testing Docs](../README.md)
