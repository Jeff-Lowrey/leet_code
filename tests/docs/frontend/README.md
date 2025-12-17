# Frontend Testing

Documentation for testing frontend JavaScript code.

[🏠 Testing Docs](../README.md)

---

## Overview

This section documents tests for frontend JavaScript code including page scripts, utilities, and UI interactions.

## Frontend Test Categories

### Page Scripts
- [Index Routes](index-routes.md) - Home page API route calls
  - Category stats fetching
  - Route format validation

### Other Frontend Code (Not Yet Documented)
- `static/js/main.js` - Core initialization
- `static/js/navigation.js` - Menu and navigation
- `static/js/search.js` - Search functionality
- `static/js/theme.js` - Theme switching
- `static/js/utils.js` - Utility functions
- `static/js/pages/*.js` - Page-specific scripts

## Test Organization

**Location**: `tests/*.test.js`

**Framework**: Vitest with jsdom

**Pattern**: One test file per page/component

## Running Frontend Tests

```bash
# All frontend tests
npm test

# Specific test file
npx vitest tests/test_index_routes.test.js

# With coverage
npm run test:coverage

# Watch mode (auto-rerun on changes)
npm run test:watch

# Interactive UI
npm run test:ui
```

## Test Configuration

**File**: `vitest.config.js` (project root)

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['static/js/**/*.js'],
      lines: 85,
      functions: 85,
      branches: 85,
      statements: 85
    }
  }
});
```

## Common Test Patterns

### Mock Functions
```javascript
import { describe, test, expect, vi } from 'vitest';

test('function is called with correct arguments', () => {
  const mockFn = vi.fn();

  mockFn('arg1', 'arg2');

  expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
  expect(mockFn).toHaveBeenCalledTimes(1);
});
```

### DOM Testing
```javascript
test('DOM element is updated', () => {
  const element = { innerHTML: '' };

  element.innerHTML = '<span>Updated</span>';

  expect(element.innerHTML).toBe('<span>Updated</span>');
});
```

### Event Handling
```javascript
test('event handler is called', () => {
  const handler = vi.fn();
  const event = new Event('click');

  element.addEventListener('click', handler);
  element.dispatchEvent(event);

  expect(handler).toHaveBeenCalled();
});
```

## Testing Tools

### Vitest
Modern, fast JavaScript test framework with Jest-compatible API.

**Docs**: https://vitest.dev/

**Features**:
- Native ESM support
- Fast execution
- Watch mode
- UI mode
- Coverage with V8

### jsdom
JavaScript implementation of web standards for Node.js.

**Docs**: https://github.com/jsdom/jsdom

**Features**:
- DOM simulation
- Window and document objects
- Event handling
- Browser APIs

## Coverage Goals

- **Target**: 85%+ coverage of frontend code
- **Current**: Limited (only Issue #36 tests exist)
- **Priority**: Core page scripts and utilities

## Future Enhancements

### Browser Testing (Planned)
- **Playwright** or **Selenium** for E2E tests
- Real browser automation
- Visual regression testing
- User flow testing

See [Issue #38](https://github.com/Jeff-Lowrey/leet_code/issues/38) for frontend testing expansion plans.

## Related Documentation

- [Frontend Unit Tests](../04-frontend-unit-tests.md)
- [Vitest Configuration](../01-testing-overview.md#frontend-vitest)
- [Writing Tests](../06-writing-tests.md)

---

[🏠 Testing Docs](../README.md)
