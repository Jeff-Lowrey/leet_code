# Template Creation Guidelines

[← Previous: Testing Procedures](07-testing-procedures.md) | [🏠 Home](README.md) | [Next: Adding Language Support →](09-adding-languages.md)

---

## Table of Contents

- [Overview](#overview)
- [Template Structure Requirements](#template-structure-requirements)
- [Language-Specific Conventions](#language-specific-conventions)
- [Documentation Format](#documentation-format)
- [Creating a New Template](#creating-a-new-template)
- [Testing Templates](#testing-templates)
- [Best Practices](#best-practices)

## Overview

Solution templates provide consistent structure across all solutions in the codebase. Each language has a specific template that contributors use as a starting point.

**Template Purposes:**
- Ensure consistent documentation format
- Provide standardized code structure
- Include all required metadata sections
- Guide contributors through solution creation
- Enable automated parsing and rendering

**Current Templates:**
- `SOLUTION_TEMPLATE.py` - Python solutions
- `SOLUTION_TEMPLATE.js` - JavaScript solutions
- `SOLUTION_TEMPLATE.ts` - TypeScript solutions
- `SOLUTION_TEMPLATE.java` - Java solutions
- `SOLUTION_TEMPLATE.cpp` - C++ solutions
- `SOLUTION_TEMPLATE.go` - Go solutions
- `SOLUTION_TEMPLATE.rs` - Rust solutions

**Location:** `docs/developer-guide/templates/`

## Template Structure Requirements

### Required Sections

Every template must include these sections in order:

1. **Problem Header**
   - Problem number and title
   - Difficulty level
   - Problem description
   - Example cases with HTML formatting

2. **Solution Explanation** (in `<details>` block)
   - METADATA section
   - INTUITION section
   - APPROACH section
   - WHY THIS WORKS section
   - EXAMPLE WALKTHROUGH section
   - TIME COMPLEXITY section
   - SPACE COMPLEXITY section
   - EDGE CASES section

3. **Solution Implementation**
   - Imports/includes
   - Class or function definition
   - Method implementation with comments
   - Complexity annotations

4. **Test Cases**
   - Minimum 3 test cases
   - Expected output documented
   - Edge cases covered

### Header Format

**Python/JavaScript/TypeScript:**
```python
"""
N. Problem Title
Difficulty: Easy|Medium|Hard

[Problem description here...]

**Example 1:**

<dl class="example-details">
<dt>Input:</dt>
<dd>input here</dd>
<dt>Output:</dt>
<dd>output here</dd>
<dt>Explanation:</dt>
<dd>explanation here</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

[explanation sections...]

</details>
"""
```

**Java/C++:**
```java
/**
 * N. Problem Title
 * Difficulty: Easy|Medium|Hard
 *
 * [Problem description here...]
 *
 * **Example 1:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>input here</dd>
 * <dt>Output:</dt>
 * <dd>output here</dd>
 * <dt>Explanation:</dt>
 * <dd>explanation here</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * [explanation sections...]
 *
 * </details>
 */
```

**Go:**
```go
/**
 * N. Problem Title
 * Difficulty: Easy|Medium|Hard
 *
 * [Same format as Java/C++]
 */
```

**Rust:**
```rust
//! N. Problem Title
//! Difficulty: Easy|Medium|Hard
//!
//! [Problem description here...]
//!
//! **Example 1:**
//!
//! <dl class="example-details">
//! <dt>Input:</dt>
//! <dd>input here</dd>
//! </dl>
```

### Metadata Section Format

Required in all templates:

```markdown
### METADATA:
**Techniques**: [List of algorithmic techniques used]
**Data Structures**: [Data structures employed]
**Patterns**: [Design patterns applied]
**Time Complexity**: **O(?)** - [Brief explanation]
**Space Complexity**: **O(?)** - [Brief explanation]
```

### Example Cases Format

All examples must use HTML definition list format for proper rendering:

```html
<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
<dt>Explanation:</dt>
<dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
</dl>
```

**Why HTML format:**
- Ensures consistent rendering across all pages
- Enables custom CSS styling
- Better semantic structure
- Proper indentation and spacing

## Language-Specific Conventions

### Python Templates

**Comment Style:** Triple-quoted docstrings
```python
"""
Module-level docstring with problem description
"""

class Solution:
    def method(self, param: Type) -> ReturnType:
        """
        Method-level docstring with approach description

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        pass
```

**Type Hints:** Required for all parameters and return types
```python
from typing import List, Dict, Optional

def twoSum(self, nums: List[int], target: int) -> List[int]:
```

**Test Block:**
```python
if __name__ == "__main__":
    solution = Solution()
    # Test cases here
```

### JavaScript Templates

**Comment Style:** JSDoc format
```javascript
/**
 * JSDoc comment for problem description
 */

class Solution {
    /**
     * Method description
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target sum
     * @return {number[]} - Indices array
     *
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    twoSum(nums, target) {
        // Implementation
    }
}
```

**Module Exports:**
```javascript
// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}

// Test runner
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
```

### TypeScript Templates

**Type Definitions:**
```typescript
interface TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

class Solution {
    twoSum(nums: number[], target: number): number[] {
        // Implementation with full type safety
    }
}
```

### Java Templates

**Class Structure:**
```java
import java.util.*;

class Solution {
    /**
     * Javadoc comment
     *
     * @param nums Array of integers
     * @param target Target sum
     * @return Indices of two numbers
     *
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    public int[] twoSum(int[] nums, int target) {
        // Implementation
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        // Test cases
    }
}
```

### C++ Templates

**Header and Namespace:**
```cpp
#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

class Solution {
public:
    /**
     * Doxygen-style comment
     *
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    vector<int> twoSum(vector<int>& nums, int target) {
        // Implementation
    }
};

int main() {
    Solution solution;
    // Test cases
    return 0;
}
```

### Go Templates

**Package and Function:**
```go
package main

import "fmt"

/**
 * Function documentation
 */
func twoSum(nums []int, target int) []int {
    // Implementation
}

func main() {
    // Test cases
}
```

### Rust Templates

**Module Structure:**
```rust
//! Module-level documentation

/// Function documentation
pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
    // Implementation
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_two_sum() {
        // Test cases
    }
}
```

## Creating a New Template

### Step 1: Research Language Conventions

1. **Study official style guides:**
   - Python: PEP 8
   - JavaScript: Airbnb Style Guide
   - Java: Google Java Style
   - C++: Google C++ Style
   - Go: Effective Go
   - Rust: Rust Style Guide

2. **Review documentation standards:**
   - Python: PEP 257 (docstrings)
   - JavaScript/TypeScript: JSDoc/TSDoc
   - Java: Javadoc
   - C++: Doxygen
   - Go: godoc
   - Rust: rustdoc

### Step 2: Create Template File

**Filename:** `SOLUTION_TEMPLATE.<ext>`

**Location:** `docs/developer-guide/templates/`

**Content Structure:**
```
1. File-level documentation comment
2. Required imports/includes
3. Class or function template
4. Method template with full documentation
5. Test case template
6. Module exports (if applicable)
```

### Step 3: Document All Required Sections

Include placeholders for:
- `[PROBLEM_NUMBER]` - Problem number
- `[PROBLEM_TITLE]` - Problem title
- `[DIFFICULTY]` - Easy, Medium, or Hard
- `[PROBLEM_DESCRIPTION]` - Full description
- `[EXAMPLE_CASES]` - At least 2 examples
- `[TECHNIQUE]` - Algorithm technique
- `[DATA_STRUCTURES]` - Data structures used
- `[TIME_COMPLEXITY]` - Big O notation
- `[SPACE_COMPLEXITY]` - Big O notation

### Step 4: Add Language-Specific Features

**For compiled languages (Java, C++, Rust):**
- Include compilation instructions in comments
- Add necessary imports/includes
- Specify language version if needed

**For interpreted languages (Python, JavaScript, Go):**
- Include shebang if applicable
- Add module system boilerplate
- Document execution command

### Step 5: Create Example Solution

Using the template, create a complete example solution (e.g., Two Sum) to verify:
- All sections render correctly
- Code executes successfully
- HTML formatting displays properly
- Documentation is clear and complete

## Testing Templates

### Validation Checklist

- [ ] Problem header renders correctly
- [ ] HTML `<dl>` tags display properly
- [ ] `<details>` block expands/collapses
- [ ] All metadata sections present
- [ ] Code syntax highlights correctly
- [ ] Test cases execute successfully
- [ ] Complexity annotations accurate
- [ ] Navigation links work

### Test Process

1. **Create test solution:**
   ```bash
   cp docs/developer-guide/templates/SOLUTION_TEMPLATE.<ext> test-solution.<ext>
   ```

2. **Fill with sample problem (Two Sum)**

3. **Test execution:**
   - Run code and verify output
   - Check for compilation errors
   - Verify imports/includes work

4. **Test rendering:**
   - Start Flask application
   - Navigate to test solution
   - Verify HTML rendering
   - Check syntax highlighting
   - Test collapsible sections

5. **Validate format:**
   - Run through upload workflow
   - Verify file validation passes
   - Check language detection works

## Best Practices

### Documentation

1. **Be Consistent:**
   - Use same section headings across all templates
   - Maintain consistent formatting
   - Follow language-specific comment styles

2. **Be Complete:**
   - Include all required sections
   - Don't skip metadata
   - Provide comprehensive examples

3. **Be Clear:**
   - Use descriptive placeholders
   - Include helpful comments
   - Explain complexity clearly

### Code Structure

1. **Follow Language Idioms:**
   - Use language-specific naming conventions
   - Apply standard design patterns
   - Leverage language features appropriately

2. **Keep it Simple:**
   - Template should be easy to understand
   - Avoid overly complex examples
   - Focus on structure, not algorithms

3. **Make it Testable:**
   - Include runnable test cases
   - Provide expected outputs
   - Cover edge cases

### Maintenance

1. **Version Control:**
   - Track template changes
   - Document breaking changes
   - Maintain backward compatibility when possible

2. **Regular Updates:**
   - Update for language version changes
   - Incorporate community feedback
   - Fix reported issues promptly

3. **Documentation:**
   - Keep formatting guide in sync
   - Update examples when template changes
   - Maintain changelog

---

[← Previous: Testing Procedures](07-testing-procedures.md) | [🏠 Home](README.md) | [Next: Adding Language Support →](09-adding-languages.md)
