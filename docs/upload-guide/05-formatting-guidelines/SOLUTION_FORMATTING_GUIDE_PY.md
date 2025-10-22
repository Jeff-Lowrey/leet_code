# LeetCode Solution Formatting Guide - Python

[← Previous: Formatting Guidelines](05-formatting-guidelines.md) | [🏠 Home](../README.md) | [Next: JavaScript Formatting Guide →](SOLUTION_FORMATTING_GUIDE_JS.md)

---

This guide explains the standard format for Python LeetCode solution files in this repository.

## Table of Contents

- [Template Location](#template-location)
- [Key Formatting Rules](#key-formatting-rules)
- [Visual Styling Notes](#visual-styling-notes)
- [Theme System](#theme-system)
- [Python-Specific Conventions](#python-specific-conventions)
- [Best Practices](#best-practices)
- [Reference Implementation](#reference-implementation)
- [Additional Resources](#additional-resources)

## Template Location
[↑ Back to Table of Contents](#table-of-contents)

Use [`solutions/templates/SOLUTION_TEMPLATE.py`](../../solutions/templates/SOLUTION_TEMPLATE.py) as the starting point for new solutions.

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
- Labels will display in the current theme's accent color
- Section has subtle background and left border styled by theme

### 3. Solution Explanation Sections

Include these sections in the `<details>` block **in this exact order**:

1. **METADATA:** (Required - Always First)
   - Structured information about the solution
   - Five required fields with bold labels:
   ```markdown
   ### METADATA:
   **Techniques**: [2-3 algorithm techniques, e.g., Hash Table Lookup, Single Pass]
   **Data Structures**: [2-3 data structures, e.g., Hash Map, Array]
   **Patterns**: [1-2 design patterns, e.g., Complement Search]
   **Time Complexity**: **O(?)** - [detailed explanation with context]
   **Space Complexity**: **O(?)** - [detailed explanation with context]
   ```
   - Provide context with complexity descriptions, not just notation
   - No "TBD" placeholders allowed

2. **INTUITION:** (Required)
   - 1-3 sentences
   - The "aha moment" or key insight

3. **APPROACH:** (Required)
   - Flowing prose (not numbered list)
   - Step-by-step explanation
   - Focus on understanding

4. **WHY THIS WORKS:** (Optional but Recommended)
   - Brief bullet points
   - Correctness explanation

5. **EXAMPLE WALKTHROUGH:** (Required)
   - Show input in code block
   - Step-by-step execution with bold labels
   ```
   **Step 1:** description
   **Step 2:** description
   ```

6. **TIME COMPLEXITY:** (Required)
   - Format: `**O(n)** - explanation`

7. **SPACE COMPLEXITY:** (Required)
   - Format: `**O(n)** - explanation`

8. **EDGE CASES:** (Required)
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

## Python-Specific Conventions
[↑ Back to Table of Contents](#table-of-contents)

### Variable Naming
- Use snake_case for variables and functions
- Use PascalCase for classes
- Use UPPER_SNAKE_CASE for constants

### Type Hints
Always include type hints for function parameters and return values:
```python
from typing import List, Optional, Dict, Set, Tuple

def twoSum(self, nums: List[int], target: int) -> List[int]:
    pass
```

### Comments and Docstrings
```python
# Single-line comments for brief explanations

"""
Module-level docstrings at the top of the file
"""

def method(self, param: int) -> int:
    """
    Method docstrings with approach and complexity
    """
    pass
```

### Data Structures
Common Python structures for LeetCode:
- **Lists:** `nums = [1, 2, 3]`
- **Dictionaries:** `seen = {}` or `seen = dict()` (hash maps)
- **Sets:** `unique = set()` or `unique = {1, 2, 3}`
- **Tuples:** `pair = (1, 2)` (immutable sequences)

### Built-in Functions
Leverage Python's built-in functions:
- `enumerate()` - Get index and value: `for i, num in enumerate(nums)`
- `zip()` - Combine iterables: `for a, b in zip(list1, list2)`
- `sorted()` - Return sorted list: `sorted_nums = sorted(nums)`
- `sum()`, `min()`, `max()` - Aggregate functions
- `all()`, `any()` - Boolean aggregation

### List Comprehensions
Use comprehensions for concise, readable code:
```python
# List comprehension
squares = [x**2 for x in nums]

# Dictionary comprehension
num_to_index = {num: i for i, num in enumerate(nums)}

# Set comprehension
unique_values = {x for x in nums if x > 0}
```

### Python 3 Features
- F-strings for formatting: `f"Result: {result}"`
- Unpacking: `a, b = arr[0], arr[1]` or `first, *rest = arr`
- Walrus operator: `while (n := len(stack)) > 0:`
- `//` for integer division: `mid = (left + right) // 2`

## Best Practices
[↑ Back to Table of Contents](#table-of-contents)

1. ✅ Keep INTUITION section brief - the key insight only
2. ✅ Write APPROACH as flowing prose, not numbered lists
3. ✅ Use inline `code` formatting for variable names and keywords
4. ✅ Provide 3+ test cases including edge cases
5. ✅ Include alternative solutions when relevant
6. ✅ Add clear comments to code explaining non-obvious logic
7. ❌ Don't skip required sections (INTUITION, APPROACH, etc.)

## Reference Implementation
[↑ Back to Table of Contents](#table-of-contents)

See [`docs/solutions/arrays-hashing/001-two-sum.py`](../../solutions/arrays-hashing/001-two-sum.py) for a complete, correctly formatted example.

## Additional Resources
[↑ Back to Table of Contents](#additional-resources)

- JavaScript formatting guide: [SOLUTION_FORMATTING_GUIDE_JS.md](SOLUTION_FORMATTING_GUIDE_JS.md)
- Python template: [`docs/solutions/templates/SOLUTION_TEMPLATE.py`](../../solutions/templates/SOLUTION_TEMPLATE.py)
- JavaScript template: [`docs/solutions/templates/SOLUTION_TEMPLATE.js`](../../solutions/templates/SOLUTION_TEMPLATE.js)
- Upload guide overview: [Upload Guide Home](../README.md)
- General formatting guidelines: [05-formatting-guidelines.md](05-formatting-guidelines.md)

---

[← Previous: Formatting Guidelines](05-formatting-guidelines.md) | [🏠 Home](../README.md) | [Next: JavaScript Formatting Guide →](SOLUTION_FORMATTING_GUIDE_JS.md)
