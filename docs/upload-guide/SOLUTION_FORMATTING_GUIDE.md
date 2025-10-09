# LeetCode Solution Formatting Guide - Python

[🏠 Home](README.md)

---

This guide explains the standard format for Python LeetCode solution files in this repository.

## Table of Contents
1. [Template Location](#template-location)
2. [Key Formatting Rules](#key-formatting-rules)
   - 2.1. [Module Docstring Structure](#1-module-docstring-structure)
   - 2.2. [Example Section Format](#2-example-section-format)
   - 2.3. [Solution Explanation Sections](#3-solution-explanation-sections)
   - 2.4. [Code Structure](#4-code-structure)
   - 2.5. [Test Cases](#5-test-cases)
3. [Visual Styling Notes](#visual-styling-notes)
4. [Categories and Colors](#categories-and-colors)
5. [Best Practices](#best-practices)
6. [Migration from Old Format](#migration-from-old-format)
7. [Reference Implementation](#reference-implementation)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use `docs/solutions/templates/SOLUTION_TEMPLATE.py` as the starting point for new solutions.

## Key Formatting Rules
[↑ Back to Table of Contents](#table-of-contents)

### 1. Module Docstring Structure

```python
"""
[Problem Number]. Problem Title
[Difficulty: Easy/Medium/Hard]

[Problem description with markdown formatting]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input]</dd>
<dt>Output:</dt>
<dd>[output]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>...</details>
"""
```

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

**Key points:**
- Use `<dt>` for labels (Input:, Output:, Explanation:)
- Use `<dd>` for values
- NO monospace/code formatting in values
- Labels will display in category color
- Section has subtle background and left border

### 3. Solution Explanation Sections

Include these sections in the `<details>` block:

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

```python
class Solution:
    def mainMethod(self, params) -> return_type:
        """
        Approach: [brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        # Clear comments explaining each section
        pass

    def alternativeMethod(self, params) -> return_type:
        """
        [Alternative approach name]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        pass
```

### 5. Test Cases

```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1 - Basic case
    input1 = [2, 7, 11, 15]
    target1 = 9
    print(f"Input: {input1}, Target: {target1}")
    print(f"Output: {solution.twoSum(input1, target1)}")  # Expected: [0, 1]

    # Test case 2 - Edge case
    # ...
```

## Visual Styling Notes
[↑ Back to Table of Contents](#table-of-contents)

When rendered on the web interface:

1. **"Problem Statement" heading** - Displays in category color
2. **"Example:" label** - Displays in category color (1.1rem, bold)
3. **Example box** - Light background (#f9f9f6), 4px left border in category color
4. **Input:/Output:/Explanation: labels** - Category color, bold (0.95rem)
5. **Example values** - Regular text (no monospace), same font as body
6. **Code blocks** - Monospace font, 2px border, padding, shadow

## Categories and Colors
[↑ Back to Table of Contents](#table-of-contents)

Each category has a distinct color applied to:
- Page title
- Problem Statement heading
- Example label
- Example box border
- Input/Output/Explanation labels

Example colors:
- arrays-hashing: rust (#d47d5e)
- dynamic-programming: teal (#66a8a8)
- graphs: burgundy (#c96680)

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)

1. ✅ Keep INTUITION section brief - the key insight only
2. ✅ Write APPROACH as flowing prose, not numbered lists
3. ✅ Use inline `code` formatting for variable names and keywords
4. ✅ Provide 3+ test cases including edge cases
5. ✅ Include alternative solutions when relevant
6. ✅ Add clear comments to code explaining non-obvious logic
7. ❌ Don't use monospace font in example values
8. ❌ Don't use old code block format for examples
9. ❌ Don't skip required sections (INTUITION, APPROACH, etc.)

## Migration from Old Format
[↑ Back to Table of Contents](#table-of-contents)

If converting from the old code block format:

**Old format:**
```
**Example:**

\```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1]
\```
```

**New format:**
```html
**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
<dt>Explanation:</dt>
<dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
</dl>
```

## Reference Implementation
[↑ Back to Table of Contents](#table-of-contents)

See `docs/solutions/arrays-hashing/001-two-sum.py` for a complete, correctly formatted example.

---

[🏠 Home](README.md)
