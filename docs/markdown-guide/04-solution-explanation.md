# Solution Explanation Section

## Table of Contents

- [Overview](#overview)
- [Format](#format)
- [Required Sections](#required-sections)
- [Optional Sections](#optional-sections)
- [Details Tag](#details-tag)
- [Section Order](#section-order)
- [Best Practices](#best-practices)
- [Common Mistakes](#common-mistakes)
- [Processing](#processing)
- [Related Sections](#related-sections)

## Overview

The solution explanation provides a detailed walkthrough of the approach, algorithm, complexity analysis, and insights. It is wrapped in a `<details>` tag for progressive disclosure.

## Format

```markdown
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Brief insight explaining the core idea

### APPROACH:
Step-by-step explanation of the solution strategy

### ALGORITHM:
1. Detailed algorithmic steps
2. With numbered list

### COMPLEXITY:
- **Time Complexity**: O(n) - explanation
- **Space Complexity**: O(n) - explanation

</details>
```

## Required Sections

### 1. INTUITION

**Purpose**: High-level "aha moment" or key insight

**Format**: `### INTUITION:`

**Content**: 1-3 sentences explaining the core idea

**Example**:
```markdown
### INTUITION:
Instead of checking all pairs (O(n²)), use a hash map to store seen numbers
and look up complements in O(1) time.
```

---

### 2. APPROACH

**Purpose**: Strategic explanation of solution method

**Format**: `### APPROACH:`

**Content**: Paragraph or bullets describing overall strategy

**Example**:
```markdown
### APPROACH:
As we iterate through the array, for each number we:
1. Calculate what number would complete the pair (complement = target - current)
2. Check if we've seen that complement before
3. If yes, return the indices; if no, store current number
```

---

### 3. ALGORITHM

**Purpose**: Step-by-step implementation details

**Format**: `### ALGORITHM:`

**Content**: Numbered list of algorithmic steps

**Example**:
```markdown
### ALGORITHM:
1. Initialize empty hash map `seen = {}`
2. For each index `i` and number `num` in array:
   a. Calculate `complement = target - num`
   b. If `complement` exists in `seen`:
      - Return `[seen[complement], i]`
   c. Store current number: `seen[num] = i`
3. Return empty array
```

---

### 4. COMPLEXITY

**Purpose**: Big-O analysis

**Format**: `### COMPLEXITY:` or `### TIME & SPACE COMPLEXITY:`

**Content**: Must include both time and space

**Example**:
```markdown
### COMPLEXITY:
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(n) - hash map stores up to n elements
```

**Always Explain**:
```markdown
### COMPLEXITY:
- **Time Complexity**: O(n log n)
  - Sorting: O(n log n)
  - Binary search: O(log n) per query
  - Total: O(n log n)
- **Space Complexity**: O(1)
  - In-place modifications
  - No auxiliary data structures
```

---

## Optional Sections

### WHY THIS WORKS
```markdown
### WHY THIS WORKS:
When we find a complement in the hash map, we know:
- We've seen that number before (it's in the map)
- Current number + complement = target (by definition)
- The indices are different (we store before checking)
```

### EXAMPLE WALKTHROUGH
```markdown
### EXAMPLE WALKTHROUGH:
```
nums = [2, 7, 11, 15], target = 9

i=0, num=2: complement=7, seen={}, add 2: seen={2:0}
i=1, num=7: complement=2, found in seen! return [0,1]
```
```

### EDGE CASES
```markdown
### EDGE CASES:
- Exactly 2 elements: Works (minimum constraint)
- Negative numbers: Works (complement calculation handles signs)
- Zero target: Works (e.g., [-1, 1] with target 0)
- Duplicate values: Works (we don't reuse same index)
```

### KEY INSIGHT
```markdown
### KEY INSIGHT:
Hash map allows O(1) complement lookup, transforming O(n²) brute force
into O(n) single-pass solution.
```

### OPTIMIZATIONS
```markdown
### OPTIMIZATIONS:
- Could use sorted array + two pointers for O(1) space if indices not required
- Could early exit when target < 0 and all nums > 0
```

### ALTERNATIVES
```markdown
### ALTERNATIVES:
1. **Brute Force**: Check all pairs - O(n²) time, O(1) space
2. **Sort + Binary Search**: For each number, binary search complement - O(n log n) time
3. **Two Pointers**: Sort array, use two pointers - O(n log n) time, but loses original indices
```

---

## Details Tag

### Purpose
Creates collapsible section to reduce initial visual clutter

### Format
```markdown
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

[All explanation sections here]

</details>
```

### Rules
- Must wrap entire explanation
- Summary should be exactly: `<summary><b>🔍 SOLUTION EXPLANATION</b></summary>`
- Place immediately after problem description
- Close tag must be on its own line

---

## Section Order

Recommended order for clarity:

1. **INTUITION** - The "aha" moment
2. **APPROACH** - High-level strategy
3. **ALGORITHM** - Detailed steps
4. **WHY THIS WORKS** (optional) - Correctness proof
5. **EXAMPLE WALKTHROUGH** (optional) - Concrete trace
6. **COMPLEXITY** - Time and space analysis
7. **EDGE CASES** (optional) - Special handling
8. **OPTIMIZATIONS** (optional) - Improvements
9. **ALTERNATIVES** (optional) - Other solutions

---

## Best Practices

### 1. Start with Intuition
Give readers the key insight before diving into details.

### 2. Be Progressive
Move from high-level understanding to implementation details.

### 3. Explain Complexity
Don't just state O(n) - explain why it's O(n).

### 4. Use Examples
Concrete walkthroughs help understanding more than abstract explanations.

### 5. Consider Edge Cases
Show you've thought about boundary conditions.

### 6. Write for Learners
Assume the reader is seeing this approach for the first time.

---

## Common Mistakes

### 1. Missing Complexity Explanation
❌ **Wrong**: `Time: O(n), Space: O(n)`
✅ **Correct**:
```markdown
- **Time Complexity**: O(n) - single pass through array
- **Space Complexity**: O(n) - hash map stores up to n elements
```

### 2. Skipping Intuition
❌ **Wrong**: Jump straight to algorithm steps
✅ **Correct**: Start with high-level insight

### 3. No Concrete Examples
❌ **Wrong**: Only abstract explanation
✅ **Correct**: Include walkthrough with actual values

### 4. Incomplete Complexity
❌ **Wrong**: Only mention time complexity
✅ **Correct**: Include both time and space

---

## Processing

### Extraction
```python
# From content/content_processing.py
clean_code, explanation_sections = parse_docstring_explanation(code)
sections = parse_explanation_into_sections(explanation_content)
```

### Result
Dictionary mapping section names to HTML content:
```python
{
    "intuition": "<p>Use hash map...</p>",
    "approach": "<p>As we iterate...</p>",
    "algorithm": "<ol><li>Initialize...</li></ol>",
    "complexity": "<ul><li><strong>Time...</strong></li></ul>"
}
```

---

## Related Sections

- **Problem Description** → [03-problem-description.md](03-problem-description.md)
- **Code Section** → [05-code-section.md](05-code-section.md)
- **Complete Examples** → [09-examples.md](09-examples.md)
