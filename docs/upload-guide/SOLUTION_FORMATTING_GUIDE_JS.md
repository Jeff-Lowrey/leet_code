# LeetCode Solution Formatting Guide - JavaScript

[← Previous: Python Formatting Guide](SOLUTION_FORMATTING_GUIDE.md) | [🏠 Home](README.md)

---

This guide explains the standard format for JavaScript LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [JavaScript-Specific Conventions](#javascript-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use [`solutions/templates/SOLUTION_TEMPLATE.js`](../../solutions/templates/SOLUTION_TEMPLATE.js) as the starting point for new solutions.

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
- Labels will display in the current theme's accent color
- Section has subtle background and left border styled by theme

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

1. **"Problem Statement" heading** - Styled with theme accent color
2. **"Example:" label** - Displays in theme accent color (1.1rem, bold)
3. **Example box** - Light neutral background with 4px left border in theme accent color
4. **Input:/Output:/Explanation: labels** - Theme accent color, bold (0.95rem)
5. **Example values** - Regular text (no monospace), same font as body (0.95rem)
6. **Code blocks** - Monospace font with theme-appropriate syntax highlighting

## Theme System
[↑ Back to Table of Contents](#table-of-contents)

The application includes an 8-theme system with light/dark mode support that dynamically styles all solution pages:

**Available Themes:**
- **Professional/Minimal**: Soft Neutral, Classic
- **Colorful**: Vibrant, Rainbow
- **Mood-Based**: Moody, Happy
- **Accessibility**: High Contrast
- **Special Effects**: Neon

**Theme & Mode System:**
- **8 distinct themes** each supporting both light and dark modes
- Toggle light/dark mode independently of theme selection (🌙 button)
- Theme picker filters to show only themes matching current mode
- Each theme has carefully designed light and dark variants
- Theme and mode preferences persist via cookies

**Theme Features:**
- Each theme defines primary, secondary, and accent colors
- Syntax highlighting adapts automatically to light/dark mode
- Category cards and solution pages styled consistently
- Seamless switching between modes without losing theme choice

**For Solution Authors:**
- Write solutions without theme-specific styling
- Use semantic HTML (`<dl>`, `<dt>`, `<dd>` for examples)
- Themes automatically apply appropriate colors
- Test your solution in both light and dark modes

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
10. ❌ Don't skip required sections (INTUITION, APPROACH, etc.)

## Reference Implementation
[↑ Back to Table of Contents](#reference-implementation)

See [`solutions/arrays-hashing/alternatives/001-two-sum.js`](../../solutions/arrays-hashing/alternatives/001-two-sum.js) for a complete, correctly formatted example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- Python formatting guide: [SOLUTION_FORMATTING_GUIDE.md](SOLUTION_FORMATTING_GUIDE.md)
- JavaScript template: [`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../../solutions/templates/SOLUTION_TEMPLATE.js)
- Python template: [`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../../solutions/templates/SOLUTION_TEMPLATE.py)
- Upload guide overview: [Upload Guide Home](README.md)
- General formatting guidelines: [05-formatting-guidelines.md](05-formatting-guidelines.md)

---

[← Previous: Python Formatting Guide](SOLUTION_FORMATTING_GUIDE.md) | [🏠 Home](README.md)
