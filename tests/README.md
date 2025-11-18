# Test Suite

This directory contains the complete test suite for the LeetCode Learning Tool.

## Quick Start

### Run All Tests

```bash
# Backend tests
pytest tests/

# Frontend tests
npm test

# Both
pytest tests/ && npm test
```

### Run With Coverage

```bash
# Backend
pytest tests/ --cov=src.leet_code --cov-report=term-missing

# Frontend
npm run test:coverage
```

## Test Organization

- **`unit/`** - Backend unit tests (pytest)
- **`integration/`** - Backend integration tests (pytest)
- **`*.test.js`** - Frontend tests (Vitest)
- **`docs/`** - Complete testing documentation

## Documentation

📚 **[Complete Testing Documentation →](docs/README.md)**

### Quick Links

- [Testing Overview](docs/01-testing-overview.md) - Start here
- [Backend Unit Tests](docs/02-backend-unit-tests.md)
- [Frontend Unit Tests](docs/04-frontend-unit-tests.md)
- [Writing Effective Tests](docs/06-writing-tests.md)
- [Test Coverage](docs/07-test-coverage.md)

## Test Statistics

- **Total Tests**: 224 (211 backend + 13 frontend)
- **Overall Coverage**: 68%
- **Pass Rate**: 96%

**Goal**: 85% coverage (see [Issue #38](https://github.com/Jeff-Lowrey/leet_code/issues/38))

## Contributing

When adding new features or fixing bugs:

1. Write tests first (TDD)
2. Aim for 85%+ coverage
3. Follow existing test patterns
4. Test edge cases and errors
5. Keep tests fast and isolated

See [Writing Effective Tests](docs/06-writing-tests.md) for guidelines.

---

[📚 Full Testing Documentation](docs/README.md) | [🏠 Main Documentation](../docs/README.md)
