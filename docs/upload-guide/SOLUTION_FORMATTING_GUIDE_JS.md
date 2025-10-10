# LeetCode Solution Formatting Guide - JavaScript

[🏠 Home](README.md)

---

This guide explains the standard format for JavaScript LeetCode solution files in this repository.

## Table of Contents
- [LeetCode Solution Formatting Guide - JavaScript](#leetcode-solution-formatting-guide---javascript)
  - [Table of Contents](#table-of-contents)
  - [Template Location](#template-location)
  - [Key Formatting Rules](#key-formatting-rules)
    - [1. JSDoc Comment Structure](#1-jsdoc-comment-structure)
    - [2. Example Section Format](#2-example-section-format)
    - [3. Solution Explanation Sections](#3-solution-explanation-sections)
    - [4. Code Structure](#4-code-structure)
    - [5. Test Cases](#5-test-cases)
    - [6. Module Exports](#6-module-exports)
  - [Visual Styling Notes](#visual-styling-notes)
  - [JavaScript-Specific Conventions](#javascript-specific-conventions)
    - [Variable Naming](#variable-naming)
    - [Comments](#comments)
    - [Data Structures](#data-structures)
    - [Array Methods](#array-methods)
    - [ES6+ Features](#es6-features)
  - [Best Practices](#best-practices)
  - [Example: Two Sum in JavaScript](#example-two-sum-in-javascript)
  - [File Naming Convention](#file-naming-convention)
  - [Testing Your Solution](#testing-your-solution)
  - [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use `docs/solutions/templates/SOLUTION_TEMPLATE.js` as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#table-of-contents)

### 1. JSDoc Comment Structure

```javascript
/**
 * [Problem Number]. Problem Title
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Problem description with markdown formatting]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input]</dd>
 * <dt>Output:</dt>
 * <dd>[output]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>...</details>
 */
```

**Key points:**
- Use JSDoc block comment (`/** ... */`) at the top of the file
- Include the full problem description and explanation
- Keep the same HTML structure as Python version

### 2. Example Section Format

**Always use the definition list (`<dl>`) format:**

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

**Important:**
- Use `<dt>` for labels (Input:, Output:, Explanation:)
- Use `<dd>` for values
- NO monospace/code formatting in values
- Labels will display in category color
- Section has subtle background and left border

### 3. Solution Explanation Sections

Include these sections in the JSDoc comment:

1. **INTUITION:** (Required)
   - 1-3 sentences
   - The "aha moment" or key insight

2. **APPROACH:** (Required)
   - Flowing prose (not numbered list)
   - Step-by-step explanation
   - Focus on understanding

3. **WHY THIS WORKS:** (Optional)
   - Brief bullet points
   - Correctness explanation

4. **EXAMPLE WALKTHROUGH:** (Required)
   - Show input in code block
   - Step-by-step execution with bold labels
   ```
   **Step 1:** description
   **Step 2:** description
   ```

5. **TIME COMPLEXITY:** (Required)
   - Format: `**O(n)** - explanation`

6. **SPACE COMPLEXITY:** (Required)
   - Format: `**O(n)** - explanation`

7. **EDGE CASES:** (Required)
   - Bullet list with bold labels
   - Format: `- **Case name:** How it's handled`

### 4. Code Structure

```javascript
class Solution {
    /**
     * Main solution method
     * @param {number[]} nums - Array of numbers
     * @param {number} target - Target sum
     * @return {number[]} - Indices of two numbers
     *
     * Approach: [brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    methodName(param1, param2) {
        // Clear comments explaining each section

    }

    /**
     * Alternative solution method
     * @param {number[]} nums - Array of numbers
     * @param {number} target - Target sum
     * @return {number[]} - Indices of two numbers
     *
     * Approach: [Alternative approach name]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    methodNameAlternative(param1, param2) {
        // Alternative implementation

    }
}
```

**JSDoc Type Annotations:**
Use standard JSDoc types:
- `{number}` - Number
- `{string}` - String
- `{boolean}` - Boolean
- `{number[]}` - Array of numbers
- `{Array<number>}` - Alternative array syntax
- `{Object}` - Generic object
- `{Map}` - Map object
- `{Set}` - Set object
- `{null}` - Null value
- `{*}` - Any type

### 5. Test Cases

```javascript
// Test cases
function runTests() {
    const solution = new Solution();

    // Test case 1 - Basic case
    console.log("Test Case 1:");
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    const result1 = solution.twoSum(nums1, target1);
    console.log(`Input: nums = ${JSON.stringify(nums1)}, target = ${target1}`);
    console.log(`Output: ${JSON.stringify(result1)}`);
    console.log(`Expected: [0, 1]`);
    console.log(`Pass: ${JSON.stringify(result1) === JSON.stringify([0, 1])}`);
    console.log();

    // Test case 2
    // ...
}

// Run tests if executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
```

**Test Case Best Practices:**
- Use `console.log()` for output
- Use `JSON.stringify()` for array/object comparison
- Provide clear test case labels
- Include expected output in comments
- Test edge cases

### 6. Module Exports

```javascript
// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}
```

This allows the solution to be imported in other files or test runners.

## Visual Styling Notes
[↑ Back to Table of Contents](#table-of-contents)

When rendered on the web interface:

1. **"Problem Statement" heading** - Displays in category color
2. **"Example:" label** - Displays in category color (1.1rem, bold)
3. **Example box** - Light background (#f9f9f6), 4px left border in category color
4. **Input:/Output:/Explanation: labels** - Category color, bold (0.95rem)
5. **Example values** - Regular text (no monospace), same font as body
6. **Code blocks** - Monospace font, 2px border, padding, shadow

## JavaScript-Specific Conventions
[↑ Back to Table of Contents](#table-of-contents)


### Variable Naming
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants

### Comments
```javascript
// Single-line comments for brief explanations
/* Multi-line comments for longer explanations */
/** JSDoc comments for documentation */
```

### Data Structures
Common JavaScript structures for LeetCode:
- **Arrays:** `const arr = [1, 2, 3]`
- **Maps:** `const map = new Map()` (preferred over objects for hash maps)
- **Sets:** `const set = new Set()`
- **Objects:** `const obj = {}` (for simple key-value pairs)

### Array Methods
Use modern JavaScript array methods:
- `arr.map()`, `arr.filter()`, `arr.reduce()`
- `arr.some()`, `arr.every()`
- `arr.find()`, `arr.findIndex()`

### ES6+ Features
- Arrow functions: `const func = (x) => x * 2`
- Destructuring: `const [a, b] = arr`
- Spread operator: `[...arr]`
- Template literals: `` `Result: ${value}` ``

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)


1. ✅ Use `const` by default, `let` when reassignment is needed
2. ✅ Avoid `var` - use `let` or `const` instead
3. ✅ Use strict equality (`===`, `!==`) instead of loose equality (`==`, `!=`)
4. ✅ Keep INTUITION section brief - the key insight only
5. ✅ Write APPROACH as flowing prose, not numbered lists
6. ✅ Use inline `code` formatting for variable names and keywords
7. ✅ Provide 3+ test cases including edge cases
8. ✅ Include alternative solutions when relevant
9. ✅ Add clear comments to code explaining non-obvious logic
10. ❌ Don't use monospace font in example values
11. ❌ Don't use old code block format for examples
12. ❌ Don't skip required sections (INTUITION, APPROACH, etc.)

## Example: Two Sum in JavaScript
[↑ Back to Table of Contents](#table-of-contents)


```javascript
/**
 * 1. Two Sum
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return indices of the
 * two numbers such that they add up to `target`.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [2,7,11,15], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>[0,1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use a hash map to store numbers we've seen so far, allowing O(1) lookup
 * for complements.
 *
 * ### APPROACH:
 * We iterate through the array once, and for each number we calculate its
 * complement (target - current number). Before storing the current number
 * in our hash map, we check if its complement already exists. If it does,
 * we've found our answer.
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Single pass through array with O(1) Map lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Map stores up to n elements in worst case
 *
 * </details>
 */

class Solution {
    /**
     * Find two numbers that add up to target
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target sum
     * @return {number[]} - Indices of the two numbers
     *
     * Approach: Hash Map for O(n) lookup
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    twoSum(nums, target) {
        // Map to store value -> index mapping
        const seen = new Map();

        for (let i = 0; i < nums.length; i++) {
            const complement = target - nums[i];

            // Check if complement exists in our map
            if (seen.has(complement)) {
                return [seen.get(complement), i];
            }

            // Store current number and its index
            seen.set(nums[i], i);
        }

        return [];
    }
}
```

## File Naming Convention
[↑ Back to Table of Contents](#table-of-contents)


JavaScript solution files should follow the pattern:
```
NNN-problem-name.js
```

Example:
- `001-two-sum.js`
- `217-contains-duplicate.js`
- `003-longest-substring-without-repeating-characters.js`

## Testing Your Solution
[↑ Back to Table of Contents](#table-of-contents)


Run your solution with:
```bash
node docs/solutions/category-name/001-problem-name.js
```

This will execute the `runTests()` function and display results.

## Additional Resources
[↑ Back to Table of Contents](#table-of-contents)

- See Python formatting guide: [SOLUTION_FORMATTING_GUIDE.md](SOLUTION_FORMATTING_GUIDE.md)
- JavaScript template: `docs/solutions/templates/SOLUTION_TEMPLATE.js`
- Python template: `docs/solutions/templates/SOLUTION_TEMPLATE.py`
- Reference Python implementation: `docs/solutions/arrays-hashing/001-two-sum.py`

---

[🏠 Home](README.md)
