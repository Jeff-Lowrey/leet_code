# Template System

[← Previous: Data Management](03-data-management.md) | [🏠 Home](README.md) | [Next: Static Files →](05-static-files.md)

---

## Overview

The template system provides standardized solution formats and generates skeleton code for practice. It supports both Python and JavaScript with consistent structure across all solutions.

## Solution Templates

### Python Template

**Location**: [`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../solutions/templates/SOLUTION_TEMPLATE.py)

**Structure**:
```python
"""
# Difficulty: [Easy/Medium/Hard]

[Problem description with markdown formatting]
"""

from typing import Any

class Solution:
    def methodName(self, param1: Any, param2: Any) -> Any:
        """
        Approach: [Brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)

        Args:
            param1: [description and type]
            param2: [description and type]

        Returns:
            [description and type]
        """
        # Implementation with clear comments
        pass

# Test cases
if __name__ == "__main__":
    solution = Solution()
    # Test cases here
```

**Key Features**:
- Type annotations with `typing.Any`
- Comprehensive docstrings
- Test case template
- Passes `mypy --strict`
- Passes `ruff check` and `ruff format`

### JavaScript Template

**Location**: [`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../solutions/templates/SOLUTION_TEMPLATE.js)

**Structure**:
```javascript
/**
 * # Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description with markdown formatting]
 */

class Solution {
    /**
     * Main solution method
     * @param {type} param1 - Description
     * @param {type} param2 - Description
     * @return {type} - Description
     */
    methodName(param1, param2) {
        // Implementation with clear comments

    }
}

// Test cases
function runTests() {
    const solution = new Solution();
    // Test cases here
}
```

**Key Features**:
- JSDoc annotations
- Test function template
- Passes `node --check`
- Clean execution without errors

## Skeleton Generation

### Python Skeleton Generation

**Function**: `generate_skeleton(code: str, solution: Any, is_leetcode: bool = False) -> str`

**Location**: `app.py:1141`

**Process**:
1. Parse code with `ast` module
2. Extract Solution class structure
3. Extract method signatures with type annotations
4. Generate comprehensive docstring templates
5. Add TODO comments for implementation
6. Include helper class definitions (ListNode, TreeNode)
7. Add test case template (if not LeetCode format)

**Example Output**:
```python
"""
1. Two Sum
Category: Arrays & Hashing

Problem Skeleton - Practice Template

Time Complexity: O(?)
Space Complexity: O(?)
"""

from typing import Any

class Solution:
    def twoSum(self, nums: Any, target: Any) -> Any:
        """
        twoSum - TODO: Add method description

        Algorithm approach:
        1. TODO: Describe step 1
        2. TODO: Describe step 2
        3. TODO: Describe step 3

        Args:
            TODO: Describe parameters

        Returns:
            TODO: Describe return value

        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        # TODO: Handle edge cases
        # if not input or len(input) == 0:
        #     return default_value

        # TODO: Initialize variables
        # variable = initial_value

        # TODO: Main algorithm implementation
        # for/while loop or recursive logic here

        # TODO: Return result
        pass


def test_solution():
    """Test cases for the solution."""
    solution = Solution()

    # TODO: Add test cases
    print("All tests passed!")


if __name__ == "__main__":
    test_solution()
```

**Helper Classes**:
```python
# Automatically included if detected in original code

# ListNode
if "ListNode" in code:
    """
    # Definition for singly-linked list.
    # class ListNode:
    #     def __init__(self, val=0, next=None):
    #         self.val = val
    #         self.next = next
    """

# TreeNode
if "TreeNode" in code:
    """
    # Definition for a binary tree node.
    # class TreeNode:
    #     def __init__(self, val=0, left=None, right=None):
    #         self.val = val
    #         self.left = left
    #         self.right = right
    """
```

### JavaScript Skeleton Generation

**Function**: `generate_js_skeleton(code: str, solution: Any) -> str`

**Location**: `app.py:515`

**Process**:
1. Extract function and class patterns with regex
2. Generate JSDoc templates
3. Add TODO comments
4. Include helper structures (ListNode, TreeNode)
5. Create test function template
6. Add module exports

**Example Output**:
```javascript
/**
 * 1. Two Sum
 * Category: Arrays & Hashing
 *
 * JavaScript Practice Template
 *
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */

class Solution {
    /**
     * twoSum - TODO: Add method description
     *
     * Algorithm approach:
     * 1. TODO: Describe step 1
     * 2. TODO: Describe step 2
     * 3. TODO: Describe step 3
     *
     * @param {...any} args - TODO: Describe parameters
     * @return {any} - TODO: Describe return value
     *
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    twoSum(nums, target) {
        // TODO: Handle edge cases
        // if (!input || input.length === 0) {
        //     return defaultValue;
        // }

        // TODO: Initialize variables
        // let variable = initialValue;

        // TODO: Main algorithm implementation
        // for/while loop or recursive logic here

        // TODO: Return result
        return null;
    }
}

/**
 * Test cases for the solution
 */
function testSolution() {
    console.log('Testing solution...');

    // TODO: Add test cases
    console.log('All tests passed!');
}

// Run tests if this file is executed directly
if (require.main === module) {
    testSolution();
}

// Export for use in other modules
module.exports = {
    testSolution
};
```

## LeetCode Format Conversion

### Python LeetCode Conversion

**Function**: `convert_to_leetcode_format(code: str) -> str`

**Location**: `leetcode_converter.py`

**Converts**:
- `snake_case` → `camelCase` for method names
- Preserves type annotations
- Maintains docstrings
- Keeps test cases for local testing

**Example**:
```python
# Original (snake_case)
def two_sum(self, nums: list[int], target: int) -> list[int]:
    pass

# Converted (camelCase)
def twoSum(self, nums: list[int], target: int) -> list[int]:
    pass
```

**Extract Solution Class**:
```python
def extract_solution_class(code: str) -> str:
    """Extract only the Solution class for clean submission."""
```

Removes:
- Test cases
- Helper functions outside Solution class
- Extra whitespace

Returns only the Solution class for direct LeetCode submission.

## Download Formats

### Available Formats

| Format | Description | Files Included |
|--------|-------------|----------------|
| `skeleton` | Practice template | `{number}_{name}_skeleton.py` |
| `solution` | Full solution | `{number}_{name}_solution.py` |
| `leetcode` | LeetCode format | `{number}_{name}_leetcode.py` |
| `both` | ZIP bundle | All above files |

### ZIP Bundle Contents

When downloading with `format=both`:

**For Python**:
```
{number}_{name}_python.zip
├── {number}_{name}_skeleton.py          # Practice template
├── {number}_{name}_solution.py          # Full solution (snake_case)
├── {number}_{name}_leetcode.py          # LeetCode format (camelCase)
└── {number}_{name}_leetcode_skeleton.py # LeetCode skeleton
```

**For JavaScript**:
```
{number}_{name}_javascript.zip
├── {number}_{name}_skeleton.js          # Practice template
└── {number}_{name}_solution.js          # Full solution
```

### Download Implementation

```python
@app.route("/solution/<category>/<filename>/download/<format>")
@app.route("/solution/<category>/<filename>/download/<format>/<language>")
def download_solution(category: str, filename: str, format: str, language: str = "Python"):
    """Download solution in specified format and language."""

    if format == "both":
        # Create ZIP file
        import io
        import zipfile

        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            # Add skeleton
            skeleton_content = generate_skeleton(solution_code, solution)
            zip_file.writestr(f"{base_name}_skeleton{file_ext}", skeleton_content)

            # Add full solution
            zip_file.writestr(f"{base_name}_solution{file_ext}", solution_code)

            # Add LeetCode format (Python only)
            if language == "Python":
                leetcode_code = convert_to_leetcode_format(solution_code)
                leetcode_content = extract_solution_class(leetcode_code)
                zip_file.writestr(f"{base_name}_leetcode.py", leetcode_content)

        return Response(zip_buffer.getvalue(), mimetype="application/zip", ...)
```

## Quality Checks

### Template Requirements

**Python Templates**:
- ✅ Pass `python -m py_compile` (syntax check)
- ✅ Pass `mypy --strict` (type checking)
- ✅ Pass `ruff check` (linting)
- ✅ Pass `ruff format` (formatting)
- ✅ Execute without errors

**JavaScript Templates**:
- ✅ Pass `node --check` (syntax check)
- ✅ Execute without errors
- ✅ Valid JSDoc annotations

### Generated Skeletons

All generated skeletons must pass the same quality checks as templates:

```bash
# Python
pdm run mypy --strict generated_skeleton.py
pdm run ruff check generated_skeleton.py
python generated_skeleton.py

# JavaScript
node --check generated_skeleton.js
node generated_skeleton.js
```

## Extending the Template System

### Adding a New Language

1. **Create template file**:
   ```bash
   touch docs/solutions/templates/SOLUTION_TEMPLATE.{ext}
   ```

2. **Add skeleton generator**:
   ```python
   def generate_{language}_skeleton(code: str, solution: Any) -> str:
       # Parse code structure
       # Generate template
       # Return skeleton
   ```

3. **Add file extension mapping**:
   ```python
   def get_file_extension(language: str) -> str:
       extensions = {
           # ... existing ...
           "NewLanguage": ".ext"
       }
   ```

4. **Add lexer for highlighting**:
   ```python
   def get_lexer_for_language(language: str):
       lexers = {
           # ... existing ...
           "NewLanguage": NewLanguageLexer()
       }
   ```

5. **Update download logic**:
   ```python
   # Handle new language in download_solution()
   ```

### Customizing Templates

**Modify Skeleton Structure**:
```python
# In generate_skeleton() or generate_js_skeleton()

# Add custom sections
skeleton_lines.extend([
    "# CUSTOM SECTION",
    "# Your custom content here",
    ""
])

# Modify docstring format
skeleton_lines.extend([
    '    """',
    f'    Custom format: {custom_info}',
    '    """'
])
```

**Add Helper Functions**:
```python
# In generate_skeleton()

# Add helper function template
skeleton_lines.extend([
    "def helper_function(param):",
    '    """Helper function for..."""',
    "    pass",
    ""
])
```

---

[← Previous: Data Management](03-data-management.md) | [🏠 Home](README.md) | [Next: Static Files →](05-static-files.md)
