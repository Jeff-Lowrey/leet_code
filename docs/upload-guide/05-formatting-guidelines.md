# Formatting Guidelines

[← Previous: Quick Start](04-quick-start.md) | [🏠 Home](README.md) | [Next: Python Formatting Guide →](SOLUTION_FORMATTING_GUIDE.md)

---

## Table of Contents

- [Documentation Best Practices](#documentation-best-practices)
- [Problem Description](#problem-description)
- [Explanation Writing](#explanation-writing)
- [Code Style](#code-style)
- [Comments and Docstrings](#comments-and-docstrings)
- [Test Cases](#test-cases)
- [Complexity Analysis](#complexity-analysis)
- [Examples and Walkthroughs](#examples-and-walkthroughs)

## Documentation Best Practices

Guidelines for writing clear, effective solution documentation.

## Writing Clear Explanations

### Section Order

All solution explanations must follow this order within the `<details>` block:

1. **METADATA** (Required first)
2. **INTUITION**
3. **APPROACH**
4. **WHY THIS WORKS**
5. **EXAMPLE WALKTHROUGH**
6. **TIME COMPLEXITY**
7. **SPACE COMPLEXITY**
8. **EDGE CASES**

### METADATA Section

**Purpose:** Provide structured, searchable information about the solution.

**Guidelines:**
- ✅ Always first section after `<summary>`
- ✅ Include all 5 required fields
- ✅ Use consistent formatting with bold labels
- ✅ Provide context with complexity descriptions
- ❌ Don't use "TBD" placeholders

**Required Fields:**
```markdown
### METADATA:
**Techniques**: [2-3 algorithm techniques]
**Data Structures**: [2-3 data structures used]
**Patterns**: [1-2 design patterns]
**Time Complexity**: **O(?)** - [detailed explanation]
**Space Complexity**: **O(?)** - [detailed explanation]
```

**Good Example:**
```markdown
### METADATA:
**Techniques**: Hash Table Lookup, Single Pass
**Data Structures**: Hash Map, Array
**Patterns**: Complement Search
**Time Complexity**: **O(n)** - Single pass through array with O(1) hash map lookups
**Space Complexity**: **O(n)** - Hash map stores up to n elements in worst case
```

**Poor Example:**
```markdown
### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)
[Missing explanations and using TBD placeholders]
```

### INTUITION Section

**Purpose:** Capture the "aha moment" that unlocks the solution.

**Guidelines:**
- ✅ Keep it brief (1-3 sentences)
- ✅ Focus on the key insight
- ✅ High-level conceptual understanding
- ✅ No implementation details
- ❌ Don't explain line-by-line
- ❌ Don't include complexity analysis here

**Good Examples:**
```markdown
### INTUITION:
Use a hash map to store seen numbers for O(1) complement lookups.
```

```markdown
### INTUITION:
Two pointers from both ends allow us to find pairs efficiently without nested loops.
```

**Poor Examples:**
```markdown
### INTUITION:
We create a dictionary and loop through the array storing each element...
[Too detailed - this is implementation, not intuition]
```

### APPROACH Section

**Purpose:** Explain the algorithm step-by-step in clear prose.

**Guidelines:**
- ✅ Write in flowing paragraphs (not numbered lists)
- ✅ Explain each major step
- ✅ Connect steps logically
- ✅ Focus on understanding
- ✅ Explain why, not just what
- ❌ Don't just describe code line-by-line
- ❌ Don't use numbered step lists

**Good Example:**
```markdown
### APPROACH:
We iterate through the array once, and for each number we calculate its complement (target - current number). Before storing the current number in our hash map, we check if its complement already exists. If it does, we've found our answer and return the indices. If we complete the iteration without finding a pair, we return an empty array.
```

**Poor Example:**
```markdown
### APPROACH:
1. Create empty hash map
2. Loop through array
3. Calculate complement
4. Check if in map
5. Return if found
[Too mechanical - use prose instead]
```

### EXAMPLE WALKTHROUGH Section

**Purpose:** Show concrete execution with specific input.

**Guidelines:**
- ✅ Use actual example from problem
- ✅ Show variable values at each step
- ✅ Use bold labels (**Step 1:**, **Step 2:**)
- ✅ Show data structure state
- ✅ Indicate when solution found
- ✅ Use code block for input

**Good Example:**
```markdown
### EXAMPLE WALKTHROUGH:

Input: nums = [2, 7, 11, 15], target = 9

**Step 1:** i=0, num=2
  - complement = 9 - 2 = 7
  - 7 not in seen map
  - Store seen[2] = 0
  - seen = {2: 0}

**Step 2:** i=1, num=7
  - complement = 9 - 7 = 2
  - 2 IS in seen map at index 0
  - Return [0, 1] ✓

Result: [0, 1]
```

## Code Quality Standards

### Python Standards

**Type Hints (Required):**
```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    """Type hints for all parameters and return value"""
```

**Imports:**
```python
from typing import List, Optional, Dict, Set, Tuple
```

**Variable Naming:**
```python
# Good
seen = {}
complement = target - num
left, right = 0, len(arr) - 1

# Poor
d = {}
x = target - num
l, r = 0, len(arr) - 1
```

**Comments:**
```python
# Good: Explain why
# Store number with index for O(1) lookup
seen[num] = i

# Poor: Explain what (code already shows)
# Add num to seen
seen[num] = i
```

**Docstrings:**
```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    """
    Approach: Hash map for O(n) lookup
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
```

### JavaScript Standards

**Modern Syntax:**
```javascript
// Use const/let, not var
const seen = new Map();
let complement = target - nums[i];

// Use arrow functions when appropriate
const double = (x) => x * 2;

// Use template literals
console.log(`Result: ${result}`);

// Use destructuring
const [a, b] = arr;
```

**JSDoc Annotations:**
```javascript
/**
 * Find two numbers that sum to target
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers
 *
 * Approach: Hash map approach
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
twoSum(nums, target) {
    // Implementation
}
```

**Data Structures:**
```javascript
// Use Map, not plain objects for hash maps
const seen = new Map();
seen.set(num, i);
if (seen.has(complement)) {
    return [seen.get(complement), i];
}

// Use Set for unique collections
const unique = new Set(nums);
```

## Example Formatting

### HTML Definition List Format

**Required Structure:**
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

**Multiple Examples:**
```html
**Example 1:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
</dl>

**Example 2:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [3,2,4], target = 6</dd>
<dt>Output:</dt>
<dd>[1,2]</dd>
</dl>
```

### Common Formatting Mistakes

**Mistake 1: Using code blocks for examples**
```markdown
# ❌ DON'T DO THIS
**Example:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
```

# ✅ DO THIS
**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
</dl>
```

**Mistake 2: Monospace in example values**
```html
<!-- ❌ DON'T DO THIS -->
<dd>`[0,1]`</dd>

<!-- ✅ DO THIS -->
<dd>[0,1]</dd>
```

**Mistake 3: Missing dt/dd tags**
```html
<!-- ❌ DON'T DO THIS -->
<dl class="example-details">
Input: nums = [2,7,11,15]
Output: [0,1]
</dl>

<!-- ✅ DO THIS -->
<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15]</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
</dl>
```

## Markdown Formatting

### Inline Code

Use backticks for variable names, keywords, and short code:

```markdown
We store the `complement` in our hash map for O(1) lookup.
The `nums` array contains integers, and `target` is the sum we're looking for.
Use the `enumerate()` function to get both index and value.
```

### Code Blocks

Use triple backticks with language identifier:

````markdown
```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```
````

### Lists

**Bullet Lists:**
```markdown
- First item
- Second item
- Third item
```

**Numbered Lists:**
```markdown
1. First step
2. Second step
3. Third step
```

**Nested Lists:**
```markdown
- Main point
  - Sub-point 1
  - Sub-point 2
- Another main point
```

### Bold and Italic

```markdown
**Bold text** for emphasis
*Italic text* for slight emphasis
**Important:** for labels
```

## Consistency Guidelines

### Section Order

Always use this order:
1. Problem description
2. Examples (HTML definition lists)
3. `<details>` tag opening
4. INTUITION
5. APPROACH
6. WHY THIS WORKS (optional)
7. EXAMPLE WALKTHROUGH
8. TIME COMPLEXITY
9. SPACE COMPLEXITY
10. EDGE CASES
11. `</details>` tag closing

### Heading Levels

```markdown
# File/Module Level (title in metadata)

## Major Sections (not in docstring)

### Explanation Sections (in docstring)
### INTUITION:
### APPROACH:
```

### Spacing

```markdown
✅ Good spacing:

### INTUITION:
Use a hash map for O(1) lookups.

### APPROACH:
We iterate through the array...

❌ Poor spacing:

### INTUITION:
Use a hash map for O(1) lookups.
### APPROACH:
We iterate through the array...
```

## Language-Specific Conventions

### Python Conventions

- Use snake_case for variables and functions
- Use PascalCase for classes
- 4-space indentation
- Type hints for all functions
- Docstrings in triple quotes
- List comprehensions when readable
- f-strings for formatting

### JavaScript Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes
- 2 or 4-space indentation (be consistent)
- JSDoc for all functions
- const/let, never var
- Arrow functions for callbacks
- Template literals for strings

## Testing Requirements

### Minimum Test Cases

Include at least 3 test cases:
1. **Basic case**: Normal functionality
2. **Edge case**: Boundary condition
3. **Special case**: Unique scenario

### Test Format

**Python:**
```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1 - Basic
    print(f"Test 1: {solution.method([2, 7], 9)}")  # Expected: [0, 1]

    # Test case 2 - Edge
    print(f"Test 2: {solution.method([3], 6)}")     # Expected: []

    # Test case 3 - Special
    print(f"Test 3: {solution.method([3, 3], 6)}")  # Expected: [0, 1]
```

**JavaScript:**
```javascript
function runTests() {
    const solution = new Solution();

    console.log("Test 1:", solution.method([2, 7], 9));  // Expected: [0, 1]
    console.log("Test 2:", solution.method([3], 6));     // Expected: []
    console.log("Test 3:", solution.method([3, 3], 6));  // Expected: [0, 1]
}
```

## Validation Checklist

Before submitting:

- [ ] Examples use HTML definition list format
- [ ] INTUITION is brief (1-3 sentences)
- [ ] APPROACH is flowing prose (not numbered)
- [ ] EXAMPLE WALKTHROUGH shows execution
- [ ] TIME COMPLEXITY has bold Big-O
- [ ] SPACE COMPLEXITY has bold Big-O
- [ ] EDGE CASES documented
- [ ] Code has type hints/JSDoc
- [ ] 3+ test cases included
- [ ] Code tested and runs
- [ ] Proper indentation
- [ ] No trailing whitespace
- [ ] File ends with newline

---

[← Previous: Quick Start](04-quick-start.md) | [🏠 Home](README.md) | [Next: Python Formatting Guide →](SOLUTION_FORMATTING_GUIDE.md)
