# Testing Language Integration

[← Previous: Formatting Guide Creation](03-formatting-guide-creation.md) | [🏠 Home](README.md) | [Up: Language Support →](../08-language-support/README.md)

---

## Table of Contents

- [Overview](#overview)
- [Testing Checklist](#testing-checklist)
- [Unit Tests](#unit-tests)
- [Integration Tests](#integration-tests)
- [Manual Testing](#manual-testing)
- [Template Validation](#template-validation)
- [Syntax Highlighting Verification](#syntax-highlighting-verification)
- [Upload/Download Workflow](#uploaddownload-workflow)
- [Language-Specific Testing](#language-specific-testing)

## Overview

When adding a new programming language to the LeetCode Learning Tool, comprehensive testing ensures the integration works correctly across all features. This guide covers all testing procedures.

**Testing Scope:**
- Language configuration in `app.py`
- Template validity and format
- Syntax highlighting with Pygments
- File upload and validation
- Solution rendering and display
- Download functionality
- Language switching
- Example solutions

**Testing Levels:**
1. **Unit Tests** - Test individual components
2. **Integration Tests** - Test feature interactions
3. **Manual Tests** - Verify user-facing functionality
4. **Validation Tests** - Ensure format compliance

## Testing Checklist

### Pre-Integration Checklist

Before integrating a new language, verify:

- [ ] Language configuration added to `LANGUAGE_MAP` in `app.py`
- [ ] Language added to `SUPPORTED_LANGUAGES` list
- [ ] File extension mapping added if needed
- [ ] Solution template created in `docs/developer-guide/templates/`
- [ ] Formatting guide created in `docs/upload-guide/05-formatting-guidelines/`
- [ ] At least one example solution created
- [ ] All documentation updated

### Post-Integration Checklist

After integration, test:

- [ ] Unit tests pass for language configuration
- [ ] Integration tests pass for file operations
- [ ] Template compiles/runs without errors
- [ ] Syntax highlighting works correctly
- [ ] File upload accepts valid files
- [ ] File upload rejects invalid files
- [ ] Solution renders correctly in browser
- [ ] HTML sections display properly
- [ ] Collapsible details work
- [ ] Test cases display correctly
- [ ] Download buttons work for all formats
- [ ] Language badge appears
- [ ] Language switching works
- [ ] Example solution executes successfully

## Unit Tests

### Test File Location

**File:** `tests/test_language_support.py`

### Language Configuration Tests

```python
import pytest
import re
from src.leet_code.app import LANGUAGE_MAP, SUPPORTED_LANGUAGES


def test_language_in_map():
    """Verify language exists in LANGUAGE_MAP"""
    assert 'python' in LANGUAGE_MAP
    assert 'javascript' in LANGUAGE_MAP
    assert 'typescript' in LANGUAGE_MAP
    assert 'java' in LANGUAGE_MAP
    assert 'cpp' in LANGUAGE_MAP
    assert 'go' in LANGUAGE_MAP
    assert 'rust' in LANGUAGE_MAP


def test_language_config_structure():
    """Verify each language has required configuration fields"""
    required_fields = ['name', 'extension', 'pygments_lexer', 'mime_type', 'file_pattern']

    for lang_key, lang_config in LANGUAGE_MAP.items():
        for field in required_fields:
            assert field in lang_config, f"{lang_key} missing {field}"


def test_language_in_supported_list():
    """Verify language appears in SUPPORTED_LANGUAGES"""
    for lang_key in LANGUAGE_MAP.keys():
        assert lang_key in SUPPORTED_LANGUAGES, f"{lang_key} not in SUPPORTED_LANGUAGES"


def test_file_pattern_validity():
    """Verify file patterns are valid regex"""
    for lang_key, lang_config in LANGUAGE_MAP.items():
        pattern = lang_config['file_pattern']
        try:
            re.compile(pattern)
        except re.error as e:
            pytest.fail(f"{lang_key} has invalid regex pattern: {e}")


def test_file_pattern_matches_expected():
    """Verify file patterns match expected filenames"""
    test_cases = {
        'python': ('0001-two-sum.py.py', True),
        'javascript': ('0001-two-sum.js.js', True),
        'typescript': ('0001-two-sum.ts.ts', True),
        'java': ('0001-two-sum.java.java', True),
        'cpp': ('0001-two-sum.cpp.cpp', True),
        'go': ('0001-two-sum.go.go', True),
        'rust': ('0001-two-sum.rs.rs', True),
    }

    for lang_key, (filename, should_match) in test_cases.items():
        pattern = LANGUAGE_MAP[lang_key]['file_pattern']
        match = re.match(pattern, filename)
        if should_match:
            assert match is not None, f"{lang_key} pattern should match {filename}"
        else:
            assert match is None, f"{lang_key} pattern should not match {filename}"


def test_file_pattern_rejects_invalid():
    """Verify file patterns reject invalid filenames"""
    invalid_cases = [
        'two-sum.py',           # Missing number
        '1-two-sum.py.py',      # Not 4 digits
        '0001-two-sum.py',      # Single extension
        '0001_two_sum.py.py',   # Underscore instead of hyphen
    ]

    for lang_key, lang_config in LANGUAGE_MAP.items():
        pattern = lang_config['file_pattern']
        for invalid_name in invalid_cases:
            match = re.match(pattern, invalid_name)
            assert match is None, f"{lang_key} pattern incorrectly matched {invalid_name}"
```

### Pygments Lexer Tests

```python
from pygments.lexers import get_lexer_by_name
from pygments.util import ClassNotFound


def test_pygments_lexer_exists():
    """Verify Pygments lexer exists for each language"""
    for lang_key, lang_config in LANGUAGE_MAP.items():
        lexer_name = lang_config['pygments_lexer']
        try:
            lexer = get_lexer_by_name(lexer_name)
            assert lexer is not None, f"Lexer {lexer_name} for {lang_key} is None"
        except ClassNotFound:
            pytest.fail(f"Pygments lexer '{lexer_name}' not found for {lang_key}")


def test_syntax_highlighting():
    """Test that lexers can tokenize sample code"""
    code_samples = {
        'python': 'def hello():\n    print("Hello")',
        'javascript': 'function hello() {\n  console.log("Hello");\n}',
        'typescript': 'function hello(): void {\n  console.log("Hello");\n}',
        'java': 'public class Hello {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}',
        'cpp': '#include <iostream>\nint main() {\n  std::cout << "Hello";\n  return 0;\n}',
        'go': 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello")\n}',
        'rust': 'fn main() {\n  println!("Hello");\n}',
    }

    for lang_key, code in code_samples.items():
        lexer_name = LANGUAGE_MAP[lang_key]['pygments_lexer']
        lexer = get_lexer_by_name(lexer_name)
        tokens = list(lexer.get_tokens(code))
        assert len(tokens) > 0, f"No tokens generated for {lang_key}"
```

### Running Unit Tests

```bash
# Run all unit tests
cd /Volumes/Flower/Documents/git/leet_code
pytest tests/test_language_support.py

# Run specific test
pytest tests/test_language_support.py::test_language_in_map

# Run with verbose output
pytest tests/test_language_support.py -v

# Run with coverage
pytest tests/test_language_support.py --cov=src.leet_code.app
```

## Integration Tests

### File Upload Integration Test

```python
import pytest
from flask import Flask
from werkzeug.datastructures import FileStorage
from io import BytesIO


def test_file_upload_valid_format(app):
    """Test uploading a valid solution file"""
    # Sample Python solution
    content = b'''"""
1. Two Sum
Difficulty: Easy

Given an array of integers nums and an integer target, return indices of the two
numbers such that they add up to target.
"""

class Solution:
    def twoSum(self, nums, target):
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
'''

    file = FileStorage(
        stream=BytesIO(content),
        filename='0001-two-sum.py.py',
        content_type='text/x-python'
    )

    with app.test_client() as client:
        response = client.post(
            '/upload',
            data={'file': file, 'category': 'arrays-hashing'},
            follow_redirects=True
        )
        assert response.status_code == 200


def test_file_upload_invalid_format(app):
    """Test uploading an invalid filename format"""
    content = b'# test content'

    file = FileStorage(
        stream=BytesIO(content),
        filename='two-sum.py',  # Invalid: missing number
        content_type='text/x-python'
    )

    with app.test_client() as client:
        response = client.post(
            '/upload',
            data={'file': file, 'category': 'arrays-hashing'}
        )
        assert response.status_code == 400 or 'error' in response.get_data(as_text=True).lower()


def test_file_upload_wrong_extension(app):
    """Test uploading file with wrong extension"""
    content = b'# test content'

    file = FileStorage(
        stream=BytesIO(content),
        filename='0001-two-sum.txt',  # Invalid: wrong extension
        content_type='text/plain'
    )

    with app.test_client() as client:
        response = client.post(
            '/upload',
            data={'file': file, 'category': 'arrays-hashing'}
        )
        assert response.status_code == 400 or 'error' in response.get_data(as_text=True).lower()
```

### Solution Rendering Integration Test

```python
def test_solution_view_renders(app):
    """Test that solution page renders correctly"""
    with app.test_client() as client:
        response = client.get('/category/arrays-hashing/solution/0001-two-sum')
        assert response.status_code == 200
        assert b'Two Sum' in response.data
        assert b'<details>' in response.data  # Has collapsible section
        assert b'class="example-details"' in response.data  # Has HTML examples


def test_language_switching(app):
    """Test switching between language implementations"""
    with app.test_client() as client:
        # Get Python version
        response_py = client.get('/category/arrays-hashing/solution/0001-two-sum?lang=python')
        assert response_py.status_code == 200

        # Get JavaScript version
        response_js = client.get('/category/arrays-hashing/solution/0001-two-sum?lang=javascript')
        assert response_js.status_code == 200

        # Should be different content
        assert response_py.data != response_js.data


def test_download_functionality(app):
    """Test downloading solution files"""
    with app.test_client() as client:
        # Test skeleton download
        response = client.get('/download/arrays-hashing/0001-two-sum/skeleton')
        assert response.status_code == 200
        assert response.content_type.startswith('text/')

        # Test leetcode format download
        response = client.get('/download/arrays-hashing/0001-two-sum/leetcode')
        assert response.status_code == 200

        # Test zip download
        response = client.get('/download/arrays-hashing/0001-two-sum/zip')
        assert response.status_code == 200
        assert response.content_type == 'application/zip'
```

### Running Integration Tests

```bash
# Run integration tests
pytest tests/test_integration.py

# Run with Flask test client
FLASK_ENV=testing pytest tests/test_integration.py -v
```

## Manual Testing

### Template Validation

**Purpose:** Verify template is valid in target language

**For Python:**
```bash
# Check syntax
python -m py_compile docs/developer-guide/templates/SOLUTION_TEMPLATE.py

# Run with type checking
mypy docs/developer-guide/templates/SOLUTION_TEMPLATE.py
```

**For JavaScript:**
```bash
# Check syntax
node --check docs/developer-guide/templates/SOLUTION_TEMPLATE.js

# Run with ESLint
eslint docs/developer-guide/templates/SOLUTION_TEMPLATE.js
```

**For TypeScript:**
```bash
# Check syntax and types
tsc --noEmit docs/developer-guide/templates/SOLUTION_TEMPLATE.ts

# Run with TSLint/ESLint
eslint docs/developer-guide/templates/SOLUTION_TEMPLATE.ts
```

**For Java:**
```bash
# Compile
javac docs/developer-guide/templates/SOLUTION_TEMPLATE.java

# Run checkstyle
checkstyle docs/developer-guide/templates/SOLUTION_TEMPLATE.java
```

**For C++:**
```bash
# Compile with warnings
g++ -std=c++17 -Wall -Wextra docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp -o test

# Run with clang-tidy
clang-tidy docs/developer-guide/templates/SOLUTION_TEMPLATE.cpp
```

**For Go:**
```bash
# Check syntax
go build docs/developer-guide/templates/SOLUTION_TEMPLATE.go

# Run with vet
go vet docs/developer-guide/templates/SOLUTION_TEMPLATE.go

# Format check
gofmt -d docs/developer-guide/templates/SOLUTION_TEMPLATE.go
```

**For Rust:**
```bash
# Check syntax
rustc --crate-type lib docs/developer-guide/templates/SOLUTION_TEMPLATE.rs

# Run with clippy
cargo clippy -- -D warnings

# Format check
rustfmt --check docs/developer-guide/templates/SOLUTION_TEMPLATE.rs
```

### Example Solution Testing

**Create test file from template:**
```bash
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.py test-solution.py.py
# Edit to implement Two Sum
```

**Run the solution:**
```bash
# Python
python test-solution.py.py

# JavaScript
node test-solution.js.js

# TypeScript
ts-node test-solution.ts.ts

# Java
javac test-solution.java.java && java Solution

# C++
g++ -std=c++17 test-solution.cpp.cpp -o test && ./test

# Go
go run test-solution.go.go

# Rust
rustc test-solution.rs.rs && ./test-solution
```

**Expected output:**
```
Test 1: [0, 1]
Expected: [0, 1]
✓ Pass

Test 2: [1, 2]
Expected: [1, 2]
✓ Pass

Test 3: [0, 1]
Expected: [0, 1]
✓ Pass
```

## Syntax Highlighting Verification

### Manual Browser Test

1. **Start Flask application:**
   ```bash
   cd /Volumes/Flower/Documents/git/leet_code
   python -m src.leet_code.app
   ```

2. **Navigate to solution:**
   - Open browser to `http://127.0.0.1:9501`
   - Navigate to a solution with your new language
   - Verify code has syntax highlighting

3. **Check highlighting elements:**
   - Keywords should be highlighted (e.g., `def`, `class`, `if`)
   - Strings should have distinct color
   - Comments should be styled differently
   - Numbers and operators should be visible
   - Function/method names should be identifiable

### Automated Highlighting Test

```python
from pygments import highlight
from pygments.lexers import get_lexer_by_name
from pygments.formatters import HtmlFormatter


def test_syntax_highlighting_output():
    """Test that syntax highlighting produces HTML"""
    code = '''
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
'''

    lexer = get_lexer_by_name('python')
    formatter = HtmlFormatter()
    result = highlight(code, lexer, formatter)

    # Check HTML was generated
    assert '<div class="highlight">' in result
    assert '<span' in result

    # Check some keywords were highlighted
    assert 'def' in code
    assert 'for' in code
    assert 'if' in code
```

## Upload/Download Workflow

### Upload Testing

**Test valid upload:**
1. Navigate to any solution page
2. Click "Upload Alternative" button
3. Select your language from dropdown
4. Choose a valid solution file
5. Click "Upload"

**Expected result:**
- Success message appears
- File is saved to correct directory
- Solution is viewable immediately
- Language badge appears

**Test invalid upload:**
1. Try uploading file with wrong format (e.g., `two-sum.py`)
2. Click "Upload"

**Expected result:**
- Error message appears
- File is rejected
- Original solution unchanged

### Download Testing

**Test skeleton download:**
1. Navigate to any solution page
2. Click "Download Skeleton" button

**Expected result:**
- File downloads with correct extension
- File contains problem description only
- Solution code is removed
- Test cases are removed

**Test LeetCode format download:**
1. Click "Download LeetCode Format" button

**Expected result:**
- File downloads
- Code is converted to LeetCode format
- Documentation is preserved

**Test ZIP download:**
1. Click "Download All Formats" button

**Expected result:**
- ZIP file downloads
- ZIP contains 3 files: skeleton, leetcode, original
- All files are valid

## Language-Specific Testing

### Python-Specific Tests

```bash
# Type checking
mypy solutions/arrays-hashing/python/0001-two-sum.py.py

# Linting
ruff check solutions/arrays-hashing/python/0001-two-sum.py.py

# Run solution
python solutions/arrays-hashing/python/0001-two-sum.py.py
```

### JavaScript-Specific Tests

```bash
# Syntax check
node --check solutions/arrays-hashing/javascript/0001-two-sum.js.js

# Run solution
node solutions/arrays-hashing/javascript/0001-two-sum.js.js

# ESLint
eslint solutions/arrays-hashing/javascript/0001-two-sum.js.js
```

### TypeScript-Specific Tests

```bash
# Type checking
tsc --noEmit solutions/arrays-hashing/typescript/0001-two-sum.ts.ts

# Run solution
ts-node solutions/arrays-hashing/typescript/0001-two-sum.ts.ts

# ESLint
eslint solutions/arrays-hashing/typescript/0001-two-sum.ts.ts
```

### Java-Specific Tests

```bash
# Compile
javac solutions/arrays-hashing/java/0001-two-sum.java.java

# Run solution
java -cp solutions/arrays-hashing/java Solution

# Checkstyle
checkstyle solutions/arrays-hashing/java/0001-two-sum.java.java
```

### C++-Specific Tests

```bash
# Compile with warnings
g++ -std=c++17 -Wall -Wextra solutions/arrays-hashing/cpp/0001-two-sum.cpp.cpp -o test

# Run solution
./test

# Memory check (if valgrind available)
valgrind ./test
```

### Go-Specific Tests

```bash
# Build
go build solutions/arrays-hashing/go/0001-two-sum.go.go

# Run solution
go run solutions/arrays-hashing/go/0001-two-sum.go.go

# Vet
go vet solutions/arrays-hashing/go/0001-two-sum.go.go

# Format check
gofmt -d solutions/arrays-hashing/go/0001-two-sum.go.go
```

### Rust-Specific Tests

```bash
# Check syntax
rustc --crate-type bin solutions/arrays-hashing/rust/0001-two-sum.rs.rs

# Run solution
./0001-two-sum

# Clippy
rustc -Z no-codegen solutions/arrays-hashing/rust/0001-two-sum.rs.rs

# Format check
rustfmt --check solutions/arrays-hashing/rust/0001-two-sum.rs.rs
```

## Complete Testing Workflow

### New Language Testing Sequence

When adding a new language, follow this sequence:

**Phase 1: Configuration Testing**
1. ✅ Run unit tests for language configuration
2. ✅ Verify Pygments lexer exists and works
3. ✅ Test file pattern matching

**Phase 2: Template Testing**
4. ✅ Validate template syntax in target language
5. ✅ Implement Two Sum in template
6. ✅ Run example solution successfully

**Phase 3: Integration Testing**
7. ✅ Start Flask application
8. ✅ Test file upload with valid file
9. ✅ Test file upload with invalid file
10. ✅ Verify solution renders correctly
11. ✅ Check syntax highlighting works
12. ✅ Test collapsible details block
13. ✅ Verify HTML examples render

**Phase 4: Feature Testing**
14. ✅ Test skeleton download
15. ✅ Test LeetCode format download
16. ✅ Test ZIP download
17. ✅ Test language switching
18. ✅ Verify language badge appears

**Phase 5: Quality Testing**
19. ✅ Run language-specific linters
20. ✅ Check code formatting
21. ✅ Verify documentation completeness
22. ✅ Review formatting guide accuracy

### Regression Testing

After any changes to language support:

```bash
# Run full test suite
pytest tests/ -v

# Test all language templates
for template in docs/developer-guide/templates/SOLUTION_TEMPLATE.*; do
    echo "Testing $template"
    # Run language-specific validation
done

# Test all example solutions
for solution in solutions/arrays-hashing/*/0001-two-sum.*; do
    echo "Testing $solution"
    # Run solution
done
```

## Troubleshooting

### Common Issues

**Issue: Pygments lexer not found**
```
Solution: Install language-specific Pygments package
pip install pygments[language]
```

**Issue: Syntax highlighting doesn't work**
```
Check:
1. Lexer name is correct in LANGUAGE_MAP
2. Pygments version is up to date
3. Code is valid in target language
```

**Issue: File upload rejected**
```
Check:
1. Filename matches pattern exactly
2. File has double extension (e.g., .py.py)
3. Problem number is 4 digits
4. File content is valid
```

**Issue: Template doesn't compile**
```
Check:
1. Template syntax is valid for language
2. All imports/includes are correct
3. Test cases use correct syntax
4. Documentation comments are properly formatted
```

---

[← Previous: Formatting Guide Creation](03-formatting-guide-creation.md) | [🏠 Home](README.md) | [Up: Language Support →](../08-language-support/README.md)
