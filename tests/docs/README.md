# Testing Documentation

Complete testing documentation for the LeetCode Learning Tool test suite.

## Documentation Overview

This documentation provides comprehensive guidance for understanding, writing, running, and maintaining tests for the LeetCode Learning Tool.

## Table of Contents

### Quick Start
1. [Testing Overview](01-testing-overview.md) - Introduction to the test suite
   - Test organization and structure
   - Testing frameworks (pytest, Vitest)
   - Running tests
   - Coverage requirements

### Backend Testing
2. [Backend Unit Tests](02-backend-unit-tests.md) - Python/Flask unit testing
   - pytest framework and fixtures
   - Testing Flask views and routes
   - Mocking and patching
   - Coverage reporting

3. [Backend Integration Tests](03-backend-integration-tests.md) - End-to-end backend testing
   - Flask test client usage
   - Database and filesystem testing
   - Multi-component integration
   - Workflow testing

### Frontend Testing
4. [Frontend Unit Tests](04-frontend-unit-tests.md) - JavaScript/Vitest unit testing
   - Vitest framework and configuration
   - DOM simulation with jsdom
   - Mocking functions and modules
   - Route and component testing

5. [Frontend Integration Tests](05-frontend-integration-tests.md) - Browser-based testing
   - Playwright/Selenium setup (future)
   - User flow testing
   - Visual regression testing
   - Accessibility testing

### Testing Guides
6. [Writing Effective Tests](06-writing-tests.md) - Best practices and guidelines
   - Test structure and naming
   - AAA pattern (Arrange, Act, Assert)
   - Test isolation and independence
   - Edge cases and error handling

7. [Test Coverage](07-test-coverage.md) - Coverage analysis and improvement
   - Coverage goals and thresholds
   - Identifying untested code
   - Coverage reporting tools
   - Improving coverage

8. [Continuous Integration](08-continuous-integration.md) - Automated testing
   - CI/CD pipeline setup
   - GitHub Actions workflow
   - Pre-commit hooks
   - Automated test runs

### Feature-Based Testing Documentation
9. [API Routes Testing](api-routes/README.md) - API endpoint testing documentation
   - [Category Stats Routes](api-routes/category-stats.md) - Difficulty and complexity endpoints (Issue #36)

10. [Frontend Testing](frontend/README.md) - Frontend JavaScript testing documentation
    - [Index Routes](frontend/index-routes.md) - Home page route calls (Issue #36)

### Reference
11. [Testing Tools Reference](10-testing-tools.md) - Complete tool documentation
    - pytest configuration
    - Vitest configuration
    - Coverage tools
    - Helper utilities

12. [Troubleshooting](11-troubleshooting.md) - Common issues and solutions
    - Test failures and debugging
    - Import and path issues
    - Mock problems
    - Performance issues

## Quick Links

### Testing Frameworks
- **[pytest Documentation](https://docs.pytest.org/)** - Python testing framework
- **[Vitest Documentation](https://vitest.dev/)** - Modern JavaScript testing framework
- **[pytest-cov](https://pytest-cov.readthedocs.io/)** - Coverage for pytest
- **[jsdom](https://github.com/jsdom/jsdom)** - JavaScript DOM simulation

### Project Testing Resources
- **[Test Directory Structure](01-testing-overview.md#directory-structure)** - Organization of test files
- **[Running All Tests](01-testing-overview.md#running-tests)** - Quick reference for test execution
- **[Coverage Reports](07-test-coverage.md)** - How to generate and interpret coverage

### Key Configuration Files
- **`pyproject.toml`** - pytest configuration (project root)
- **`vitest.config.js`** - Vitest configuration (project root)
- **`.coveragerc`** - Coverage configuration (if exists)

## Test Suite Statistics

Current test coverage and statistics:

- **Total Tests**: 224 (211 backend + 13 frontend)
- **Overall Coverage**: 68%
- **Pass Rate**: 96% (216 passing, 8 failing)
- **Backend Framework**: pytest
- **Frontend Framework**: Vitest (added in Issue #36)

### Coverage by Module

**High Coverage (90%+)**:
- `leetcode_converter.py` - 94%
- `markdown_extraction.py` - 96%
- `main_views.py` - 99%
- `solution_views.py` - 92%

**Needs Improvement (<50%)**:
- `skeleton_generator.py` - 38%
- `content_processing.py` - 12%
- `syntax_highlighting.py` - 0%
- `generate_docs.py` - 0%

See [Test Coverage](07-test-coverage.md) for detailed breakdown and improvement plans.

## Test Organization

### Directory Structure

```
tests/
├── docs/                    # Testing documentation (you are here)
│   ├── README.md           # This file - testing documentation hub
│   ├── 01-testing-overview.md
│   ├── 02-backend-unit-tests.md
│   ├── 03-backend-integration-tests.md
│   ├── 04-frontend-unit-tests.md
│   └── ... (additional guides)
├── unit/                   # Backend unit tests
│   ├── test_app_helpers.py
│   ├── test_category_data.py
│   ├── test_category_stats_routes.py  # Issue #36
│   ├── test_leetcode_converter.py
│   ├── test_search_*.py
│   ├── test_views_*.py
│   └── test_simple_coverage.py
├── integration/            # Backend integration tests
│   ├── test_error_conditions.py
│   ├── test_flask_routes.py
│   └── test_upload_download.py
├── test_index_routes.test.js  # Frontend Vitest tests (Issue #36)
├── test_dummy.py           # Placeholder test
└── test_smoke.py           # Basic smoke tests
```

## Running Tests

### Quick Commands

**Backend Tests**:
```bash
# All backend tests
pytest tests/

# Specific test file
pytest tests/unit/test_category_stats_routes.py -v

# With coverage
pytest tests/ --cov=src.leet_code --cov-report=term-missing

# Specific test class or function
pytest tests/unit/test_category_stats_routes.py::TestAPICategoryDifficultyStatsRoute -v
```

**Frontend Tests**:
```bash
# All frontend tests
npm test

# With coverage
npm run test:coverage

# Watch mode (auto-rerun on changes)
npm run test:watch

# Interactive UI
npm run test:ui
```

**All Tests**:
```bash
# Run both backend and frontend
pytest tests/ && npm test
```

## Contributing to Tests

When adding new features or fixing bugs:

1. **Write tests first** (Test-Driven Development)
2. **Follow existing patterns** in similar test files
3. **Aim for 85%+ coverage** of new code
4. **Test edge cases** and error conditions
5. **Keep tests fast** (unit tests should be <1ms each)
6. **Use descriptive names** for test functions
7. **Document complex test scenarios**

See [Writing Effective Tests](06-writing-tests.md) for detailed guidelines.

## Related Documentation

- **[Developer Guide Testing Procedures](../../docs/developer-guide/07-testing-procedures.md)** - Comprehensive testing guide for developers
- **[Issue #38 - Test Coverage Improvement](https://github.com/Jeff-Lowrey/leet_code/issues/38)** - Plan to increase coverage to 85%
- **[Issue #36 - API Route Tests](issue-36-tests.md)** - Example of issue-specific test documentation

## Getting Help

If you encounter issues with tests:

1. Check [Troubleshooting Guide](11-troubleshooting.md)
2. Review [pytest documentation](https://docs.pytest.org/)
3. Review [Vitest documentation](https://vitest.dev/)
4. Search existing test files for similar patterns
5. Ask in project discussions or issues

---

[🏠 Back to Main Documentation](../../docs/README.md) | [📖 Developer Guide](../../docs/developer-guide/README.md) | [🧪 Testing Overview →](01-testing-overview.md)
