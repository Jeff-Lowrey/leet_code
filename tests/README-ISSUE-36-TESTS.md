# Test Suite for Issue #36 - API Route Fix

This directory contains unit tests for the API route changes made in issue #36.

## Test Files

### Backend Tests (Python/Flask)
**File**: `test_category_stats_routes.py`

Tests Flask API endpoints:
- `/api/category/<category>/stats/difficulty`
- `/api/category/<category>/stats/complexity`

**Run Backend Tests**:
```bash
cd /Volumes/Flower/Documents/git/leet_code
pytest .claude_functions/test_category_stats_routes.py -v
pytest .claude_functions/test_category_stats_routes.py -v --cov=src.leet_code.views.api_views --cov-report=term-missing
```

### Frontend Tests (JavaScript/Vitest)
**File**: `test_index_routes.test.js`

Tests frontend API route calls in `static/js/pages/index.js`:
- Route format validation
- Old vs new route verification
- Error handling

**Setup Frontend Tests** (first time only):
```bash
npm install
```

**Run Frontend Tests**:
```bash
# Run all tests once
npm test

# Run with coverage report
npm run test:coverage

# Run in watch mode (auto-rerun on file changes)
npm run test:watch

# Run with interactive UI
npm run test:ui
```

## Test Configuration

### Backend (Python)
- Framework: pytest
- Configuration: `pyproject.toml` (project root)
- Coverage: pytest-cov

### Frontend (JavaScript)
- Framework: Vitest (modern, Vite-based test runner)
- Configuration: `vitest.config.js` (project root)
- Environment: jsdom (simulates browser DOM)
- Coverage: V8 (built into Vitest)

## Coverage Goals

Both test suites target **85%+ coverage** of route handling logic:
- Backend: View classes and route handlers
- Frontend: Route construction and API calls

## Test Structure

### Backend Tests
- `TestAPICategoryDifficultyStatsRoute` (6 tests)
- `TestAPICategoryComplexityStatsRoute` (6 tests)
- `TestRouteIntegration` (2 tests)
- **Total: 14 tests**

### Frontend Tests
- Difficulty Stats Route (4 tests)
- Complexity Stats Route (3 tests)
- Route Integration (2 tests)
- Error Handling (2 tests)
- Route Format Validation (2 tests)
- **Total: 13 tests**

## What's Being Tested

### Backend
✓ Successful requests with valid categories
✓ 404 errors for non-existent categories
✓ Empty category handling
✓ Various complexity patterns
✓ Unknown/null complexity values
✓ Old routes return 404 (migration verification)

### Frontend
✓ Correct new route format usage
✓ Old route format NOT used
✓ Multiple category slugs
✓ Special characters in slugs
✓ Error callbacks present
✓ Route structure validation
✓ Consistent route construction

## Issue #36 Summary

**Problem**: Frontend used old API routes after backend refactor
**Root Cause**: Backend changed from `/api/stats/category/<cat>/*` to `/api/category/<cat>/stats/*`
**Fix**: Updated `static/js/pages/index.js` lines 14 and 36 to use new routes
**Tests**: Verify fix works and prevent regression
