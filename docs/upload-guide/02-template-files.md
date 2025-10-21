# Template Files

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Solution Structure →](03-solution-structure.md)

---

## Table of Contents

- [Available Templates](#available-templates)
- [Python Solution Template](#python-solution-template)
- [JavaScript Solution Template](#javascript-solution-template)
- [Template Components](#template-components)
- [Using Templates](#using-templates)
- [Template Customization](#template-customization)
- [Template Validation](#template-validation)

## Available Templates

The platform provides standardized templates for creating well-formatted solution files.

## Python Template

### Location

[`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../solutions/templates/SOLUTION_TEMPLATE.py)

### Template Contents

The Python template includes:

**1. Module Docstring**
```python
"""
[Problem Number]. Problem Title
Difficulty: [Easy/Medium/Hard]

[Full problem description]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[1-3 sentences about the key insight]

### APPROACH:
[Step-by-step explanation in flowing prose]

### TIME COMPLEXITY:
**O(?)** - [explanation]

### SPACE COMPLEXITY:
**O(?)** - [explanation]

### EDGE CASES:
- **Case 1:** [description]
- **Case 2:** [description]

</details>
"""
```

**2. Solution Class**
```python
from typing import List

class Solution:
    def methodName(self, params) -> return_type:
        """
        Approach: [brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        pass
```

**3. Test Cases**
```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    # Test case 2
```

### Using the Python Template

**Step 1: Copy Template**
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.py docs/solutions/{category}/NNN-problem-name.py
```

**Step 2: Fill Problem Details**
- Replace `[Problem Number]` with LeetCode number
- Replace `Problem Title` with actual title
- Set difficulty level
- Add complete problem description

**Step 3: Add Examples**
- Use HTML definition list format
- Include all example cases from LeetCode
- Format input, output, and explanation

**Step 4: Write Solution Explanation**
- INTUITION: The "aha moment"
- APPROACH: Step-by-step walkthrough
- TIME COMPLEXITY: Big-O analysis
- SPACE COMPLEXITY: Memory analysis
- EDGE CASES: Boundary conditions

**Step 5: Implement Solution**
- Add proper type hints
- Write clean, commented code
- Include alternative approaches if relevant

**Step 6: Add Test Cases**
- At least 3 test cases
- Include edge cases
- Verify output

### Python Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE.md`](SOLUTION_FORMATTING_GUIDE.md)

## JavaScript Template

### Location

[`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../solutions/templates/SOLUTION_TEMPLATE.js)

### Template Contents

The JavaScript template includes:

**1. JSDoc Comment**
```javascript
/**
 * [Problem Number]. Problem Title
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Full problem description]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [Key insight]
 *
 * ### APPROACH:
 * [Step-by-step explanation]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * </details>
 */
```

**2. Solution Class**
```javascript
class Solution {
    /**
     * @param {type} param - description
     * @return {type} - description
     *
     * Approach: [brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    methodName(param) {
        // Implementation
    }
}
```

**3. Test Cases**
```javascript
// Test cases
function runTests() {
    const solution = new Solution();

    // Test case 1
    console.log("Test Case 1:");
    // ...
}

if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
```

**4. Module Exports**
```javascript
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}
```

### Using the JavaScript Template

**Step 1: Copy Template**
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.js docs/solutions/{category}/javascript/NNN-problem-name.js.js
```

**Step 2: Fill JSDoc Comment**
- Complete problem description
- Add all examples
- Write solution explanation sections

**Step 3: Add JSDoc Type Annotations**
- `@param {type}` for each parameter
- `@return {type}` for return value
- Use proper JSDoc types

**Step 4: Implement Solution**
- Use modern JavaScript (ES6+)
- Clear variable names
- Inline comments for complex logic

**Step 5: Write Test Cases**
- Use `console.log()` for output
- `JSON.stringify()` for comparison
- Clear test case labels

### JavaScript Formatting Reference

See detailed guide: [`SOLUTION_FORMATTING_GUIDE_JS.md`](SOLUTION_FORMATTING_GUIDE_JS.md)

## Other Language Templates

### Creating Templates for Other Languages

While Python and JavaScript have official templates, you can create solutions in other languages following similar patterns:

**Supported Languages:**
- Java
- C++/C
- TypeScript
- Go
- Rust
- C#
- Swift
- Kotlin
- Ruby
- PHP
- Scala

### General Template Structure

**For All Languages:**

1. **Problem Documentation**
   - Problem number and title
   - Difficulty level
   - Complete description
   - Examples in HTML definition list format

2. **Solution Explanation**
   - Intuition section
   - Approach description
   - Complexity analysis
   - Edge cases

3. **Implementation**
   - Clean, well-commented code
   - Language-specific best practices
   - Proper type annotations

4. **Test Cases**
   - Multiple test cases
   - Edge case coverage
   - Verification output

### File Naming for Other Languages

```
docs/solutions/{category}/javascript/NNN-problem-name.{ext}.{ext}
```

**Examples:**
- `001-two-sum.java.java`
- `001-two-sum.cpp.cpp`
- `001-two-sum.go.go`
- `001-two-sum.rs.rs`

## Template Best Practices

### Documentation

- ✅ Complete all required sections
- ✅ Write clear, concise explanations
- ✅ Use proper markdown formatting
- ✅ Include code examples in explanations
- ✅ Document edge cases thoroughly

### Code Quality

- ✅ Follow language conventions
- ✅ Use meaningful variable names
- ✅ Add comments for complex logic
- ✅ Keep functions focused
- ✅ Test thoroughly

### Formatting

- ✅ Use HTML definition lists for examples
- ✅ Proper indentation (4 spaces or language standard)
- ✅ Consistent spacing
- ✅ No trailing whitespace
- ✅ File ends with newline

## Quick Template Commands

### Copy Python Template
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.py docs/solutions/arrays-hashing/001-two-sum.py
```

### Copy JavaScript Template
```bash
cp docs/solutions/templates/SOLUTION_TEMPLATE.js docs/solutions/arrays-hashing/javascript/001-two-sum.js.js
```

### Verify Template Structure
```bash
# Python
python docs/solutions/{category}/NNN-problem-name.py

# JavaScript
node docs/solutions/{category}/javascript/NNN-problem-name.js.js
```

## Template Customization

### When to Modify Templates

Templates can be customized for:
- Solution in another language approaches
- Multiple solution methods
- Language-specific features
- Advanced explanations

### What Must Remain

Always keep:
- HTML definition list for examples
- Required explanation sections
- Complexity analysis
- Test cases

## Next Steps

Now that you understand the templates, learn about the required solution structure.

---

[← Previous: Overview](01-overview.md) | [🏠 Home](README.md) | [Next: Solution Structure →](03-solution-structure.md)
