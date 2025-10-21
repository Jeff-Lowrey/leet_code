# Solution Structure

[← Previous: Template Files](02-template-files.md) | [🏠 Home](README.md) | [Next: Quick Start →](04-quick-start.md)

---

## Table of Contents

- [Required Sections](#required-sections)
- [Module Docstring](#module-docstring)
- [Solution Explanation](#solution-explanation)
- [Solution Class](#solution-class)
- [Test Cases](#test-cases)
- [Main Block](#main-block)
- [Best Practices](#best-practices)

## Required Sections

Every solution must include specific sections for consistency and educational value.

### Overview of Required Sections

All solutions must contain these sections in order:
1. **Module/File Documentation** - Problem header and description
2. **Examples** - HTML definition list format
3. **Solution Explanation** - Collapsible details section containing:
   - **METADATA** - Techniques, data structures, patterns, complexities
   - **INTUITION** - Key insight
   - **APPROACH** - Step-by-step explanation
   - **WHY THIS WORKS** - Correctness explanation
   - **EXAMPLE WALKTHROUGH** - Concrete execution trace
   - **TIME COMPLEXITY** - Big-O time analysis
   - **SPACE COMPLEXITY** - Big-O space analysis
   - **EDGE CASES** - Boundary conditions
4. **Solution Class** - Implementation
5. **Test Cases** - Verification code

## Solution Explanation

### Collapsible Details Section

All solution explanations are wrapped in a collapsible `<details>` section:

```html
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

[All explanation sections go here]

</details>
```

This keeps the page clean and allows users to expand explanations when needed.

### METADATA Section

**Purpose:** Provide structured information about the solution's approach.

**Required First in explanation section** - Always appears immediately after the `<summary>` tag.

**Python Format:**
```python
### METADATA:
**Techniques**: Hash Table Lookup, Single Pass
**Data Structures**: Hash Map, Array
**Patterns**: Complement Search
**Time Complexity**: **O(n)** - Single pass through array with O(1) hash map lookups
**Space Complexity**: **O(n)** - Hash map stores up to n elements in worst case
```

**JavaScript Format:**
```javascript
### METADATA:
**Techniques**: Hash Table Lookup, Single Pass
**Data Structures**: Hash Map, Array
**Patterns**: Complement Search
**Time Complexity**: * **O(n)** - Single pass through array with O(1) hash map lookups
**Space Complexity**: * **O(n)** - Hash map stores up to n elements in worst case
```

**Required Fields:**
- ✅ **Techniques**: Algorithm techniques used (2-3 items)
- ✅ **Data Structures**: Data structures employed (2-3 items)
- ✅ **Patterns**: Design patterns applied (1-2 items)
- ✅ **Time Complexity**: Big-O with detailed explanation
- ✅ **Space Complexity**: Big-O with detailed explanation

**Guidelines:**
- List 2-3 most important techniques
- Name specific data structures used
- Identify algorithmic patterns (Greedy, DP, Two Pointers, etc.)
- Provide context with complexity descriptions, not just notation
- Use consistent formatting with bold labels

### INTUITION Section

**Purpose:** Capture the "aha moment"

**Guidelines:**
- ✅ 1-3 sentences maximum
- ✅ High-level conceptual understanding
- ✅ The key insight that unlocks the solution
- ❌ No implementation details
- ❌ No line-by-line explanation

**Example:**
```markdown
### INTUITION:
The key insight is to use a hash map to store numbers we've seen so far.

For each number, we check if its complement (target - current_number) exists in our hash map.

This allows us to find the pair in a single pass.
```

### APPROACH Section

**Purpose:** Explain the algorithm step-by-step in clear prose.

**Guidelines:**
- ✅ Write in flowing paragraphs (not numbered lists)
- ✅ Explain each major step
- ✅ Connect steps logically
- ✅ Focus on understanding the "why"
- ❌ Don't just describe code line-by-line

### WHY THIS WORKS Section

**Purpose:** Explain correctness of the approach.

**Guidelines:**
- ✅ Brief bullet points
- ✅ Focus on properties that ensure correctness
- ✅ Explain trade-offs made
- ❌ Keep concise

### EXAMPLE WALKTHROUGH Section

**Purpose:** Show concrete execution with specific input.

**Guidelines:**
- ✅ Use actual example from problem
- ✅ Show variable values at each step
- ✅ Use bold labels (**Step 1:**, **Step 2:**)
- ✅ Include input in code block
- ✅ Show final output

### TIME/SPACE COMPLEXITY Sections

**Purpose:** Provide complexity analysis.

**Guidelines:**
- ✅ Use **bold** for Big-O notation
- ✅ Explain reasoning, not just state notation
- ✅ Consider all operations (loops, lookups, etc.)
- ✅ Account for auxiliary space

### EDGE CASES Section

**Purpose:** Document boundary conditions.

**Guidelines:**
- ✅ Use bullet points with bold labels
- ✅ Explain how each case is handled
- ✅ Cover minimum/maximum inputs
- ✅ Cover empty/null cases

## Module/File Documentation

### Problem Header

**Python (Module Docstring):**
```python
"""
[Problem Number]. Problem Title
Difficulty: [Easy/Medium/Hard]

[Complete problem description]
"""
```

**JavaScript (JSDoc Comment):**
```javascript
/**
 * [Problem Number]. Problem Title
 * Difficulty: [Easy/Medium/Hard]
 *
 * [Complete problem description]
 */
```

**Requirements:**
- ✅ LeetCode problem number
- ✅ Exact problem title
- ✅ Difficulty level (Easy/Medium/Hard)
- ✅ Full problem description
- ✅ All constraints

### Problem Description

Include complete information from LeetCode:

**What to Include:**
- Problem statement
- Input format and constraints
- Output format
- Special conditions
- Follow-up questions (if any)

**Markdown Formatting:**
- Use `**bold**` for emphasis
- Use `inline code` for variable names
- Use bullet points for constraints
- Keep original LeetCode wording

## Enhanced Example Display

### HTML Definition List Format

**Required Format:**
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

### Visual Rendering

When displayed on the web interface:
- Light background (#f9f9f6)
- Left border in category color (4px)
- Labels in category color, bold
- Clean, professional appearance

### Multiple Examples

If problem has multiple examples:

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

### Example Formatting Rules

**Do:**
- ✅ Use `<dt>` for labels (Input:, Output:, Explanation:)
- ✅ Use `<dd>` for values
- ✅ Write values in plain text (no code blocks)
- ✅ Include all examples from LeetCode

**Don't:**
- ❌ Use code blocks for examples
- ❌ Use monospace font in `<dd>` values
- ❌ Skip the HTML structure
- ❌ Add extra formatting to values

## Solution Explanation

### Collapsible Details Section

Wrap explanations in details/summary tags:

```html
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

[All explanation sections here]

</details>
```

This allows users to:
- View problem first
- Attempt solving themselves
- Expand to see explanation when ready

### Required Explanation Sections

#### 1. INTUITION (Required)

**Format:**
```markdown
### INTUITION:
[1-3 sentences about the key insight]
```

**Purpose:**
- The "aha moment"
- Key insight that unlocks the solution
- High-level approach

**Example:**
```markdown
### INTUITION:
Use a hash map to store numbers we've seen, allowing O(1) lookup for complements.
```

**Guidelines:**
- Keep it brief (1-3 sentences)
- Focus on the core idea
- Don't explain implementation details

#### 2. APPROACH (Required)

**Format:**
```markdown
### APPROACH:
[Step-by-step explanation in flowing prose]
```

**Purpose:**
- Detailed algorithm explanation
- Step-by-step walkthrough
- How the solution works

**Example:**
```markdown
### APPROACH:
We iterate through the array once, and for each number we calculate its complement (target - current number). Before storing the current number in our hash map, we check if its complement already exists. If it does, we've found our answer and return the indices. Otherwise, we store the current number with its index and continue.
```

**Guidelines:**
- Write in flowing prose (not numbered lists)
- Explain each major step
- Focus on understanding, not line-by-line code explanation
- Connect back to intuition

#### 3. WHY THIS WORKS (Optional)

**Format:**
```markdown
### WHY THIS WORKS:
- [Reason 1]
- [Reason 2]
- [Reason 3]
```

**Purpose:**
- Correctness proof
- Mathematical reasoning
- Algorithm guarantees

**When to Include:**
- Non-obvious algorithms
- Complex proofs
- Greedy choices
- Dynamic programming correctness

#### 4. EXAMPLE WALKTHROUGH (Required)

**Format:**
```markdown
### EXAMPLE WALKTHROUGH:

Input: nums = [2, 7, 11, 15], target = 9

**Step 1:** [Description]
**Step 2:** [Description]
**Step 3:** [Description]
```

**Purpose:**
- Concrete execution trace
- Variable values at each step
- Help visualization

**Example:**
```markdown
### EXAMPLE WALKTHROUGH:

Input: nums = [2, 7, 11, 15], target = 9

**Step 1:** i=0, num=2
  - complement = 9 - 2 = 7
  - 7 not in seen map
  - Store seen[2] = 0

**Step 2:** i=1, num=7
  - complement = 9 - 7 = 2
  - 2 IS in seen map at index 0
  - Return [0, 1] ✓
```

#### 5. TIME COMPLEXITY (Required)

**Format:**
```markdown
### TIME COMPLEXITY:
**O(?)** - [explanation]
```

**Purpose:**
- Algorithm efficiency analysis
- How runtime scales with input

**Example:**
```markdown
### TIME COMPLEXITY:
**O(n)** - Single pass through array with O(1) hash map lookups
```

**Guidelines:**
- Bold the Big-O notation
- Explain why (count operations)
- Consider worst case

#### 6. SPACE COMPLEXITY (Required)

**Format:**
```markdown
### SPACE COMPLEXITY:
**O(?)** - [explanation]
```

**Purpose:**
- Memory usage analysis
- Auxiliary space required

**Example:**
```markdown
### SPACE COMPLEXITY:
**O(n)** - Hash map stores up to n elements in worst case
```

**Guidelines:**
- Bold the Big-O notation
- Explain what uses memory
- Don't count input/output

#### 7. EDGE CASES (Required)

**Format:**
```markdown
### EDGE CASES:
- **Case name:** How it's handled
- **Case name:** How it's handled
```

**Purpose:**
- Boundary conditions
- Special scenarios
- Defensive programming

**Example:**
```markdown
### EDGE CASES:
- **Empty array:** Return empty result immediately
- **No solution:** Return empty array after full iteration
- **Duplicates:** Different indices, so valid pair can exist
- **Negative numbers:** Algorithm works the same
```

## Code Implementation

### Solution Class Structure

**Python:**
```python
class Solution:
    def methodName(self, params) -> return_type:
        """
        Approach: [brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        # Implementation
        pass

    def alternativeMethod(self, params) -> return_type:
        """
        Alternative approach
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        # Alternative implementation
        pass
```

**JavaScript:**
```javascript
class Solution {
    /**
     * @param {type} param
     * @return {type}
     *
     * Approach: [brief description]
     * Time Complexity: O(?)
     * Space Complexity: O(?)
     */
    methodName(param) {
        // Implementation
    }

    /**
     * Alternative approach
     * @param {type} param
     * @return {type}
     */
    alternativeMethod(param) {
        // Alternative implementation
    }
}
```

### Code Requirements

**Python:**
- ✅ Type hints for all parameters and return values
- ✅ Docstring with approach and complexity
- ✅ Clear variable names
- ✅ Comments for complex sections
- ✅ Follow PEP 8 style

**JavaScript:**
- ✅ JSDoc annotations for parameters and returns
- ✅ Modern ES6+ syntax
- ✅ Const/let (no var)
- ✅ Clear variable names
- ✅ Comments for complex logic

## Test Cases

### Test Structure

**Python:**
```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1 - Basic case
    nums1 = [2, 7, 11, 15]
    target1 = 9
    print(f"Input: nums={nums1}, target={target1}")
    print(f"Output: {solution.twoSum(nums1, target1)}")
    print(f"Expected: [0, 1]")
    print()

    # Test case 2 - Edge case
    # ...
```

**JavaScript:**
```javascript
function runTests() {
    const solution = new Solution();

    // Test case 1 - Basic case
    console.log("Test Case 1:");
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    const result1 = solution.twoSum(nums1, target1);
    console.log(`Input: nums=${JSON.stringify(nums1)}, target=${target1}`);
    console.log(`Output: ${JSON.stringify(result1)}`);
    console.log(`Expected: [0, 1]`);
    console.log();

    // Test case 2 - Edge case
    // ...
}
```

### Test Requirements

- ✅ At least 3 test cases
- ✅ Basic functionality test
- ✅ Edge case tests
- ✅ Expected output comments
- ✅ Clear test labels

## Section Checklist

Before submitting, verify all sections:

- [ ] Problem number and title
- [ ] Difficulty level
- [ ] Complete problem description
- [ ] Examples in HTML definition list format
- [ ] INTUITION section
- [ ] APPROACH section
- [ ] EXAMPLE WALKTHROUGH
- [ ] TIME COMPLEXITY analysis
- [ ] SPACE COMPLEXITY analysis
- [ ] EDGE CASES documentation
- [ ] Clean code implementation
- [ ] Test cases (3+)

---

[← Previous: Template Files](02-template-files.md) | [🏠 Home](README.md) | [Next: Quick Start →](04-quick-start.md)
