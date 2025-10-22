# Understanding Solutions

[← Previous: Code Viewing](04-code-viewing.md) | [🏠 Home](README.md) | [Next: Study Strategies →](study/README.md)

---

## Table of Contents

- [Solution Components](#solution-components)
- [Problem Statement](#problem-statement)
- [Solution Explanation](#solution-explanation)
- [Complexity Analysis](#complexity-analysis)
- [Edge Cases](#edge-cases)
- [Learning from Solutions](#learning-from-solutions)
- [Common Patterns](#common-patterns)
- [Advanced Topics](#advanced-topics)

## Solution Components

Each solution is structured to maximize learning and understanding.

## Problem Statement

### Reading the Problem

Every solution begins with a complete problem description:

**Components:**
1. **Problem Number & Title**: LeetCode reference (e.g., "1. Two Sum")
2. **Difficulty Level**: Easy, Medium, or Hard
3. **Problem Description**: Full explanation of what to solve
4. **Constraints**: Input limits and restrictions
5. **Example Cases**: Sample inputs and expected outputs

### Understanding Requirements

Key questions to answer:

- **What is the input?** Data types, formats, ranges
- **What is the output?** Expected return type and format
- **What are the constraints?** Size limits, edge cases
- **What's the core problem?** Pattern recognition

### Example Cases

Examples show expected behavior:

**Example Format:**

**Input:** `nums = [2,7,11,15], target = 9`

**Output:** `[0,1]`

**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1]

**What to Learn:**
- **Input format**: How data is structured
- **Expected output**: What result looks like
- **Edge cases**: Boundary conditions
- **Test cases**: Validate your understanding

## Solution Explanation

### Intuition Section

The "aha moment" - the key insight that unlocks the solution:

**Purpose:**
- Understand the core idea
- Recognize the pattern
- See the approach at a high level

**Example:**
> "Use a hash map to store numbers we've seen, allowing O(1) lookup for complements."

**What to Focus On:**
- The main data structure used
- The key algorithmic insight
- Why this approach works
- The pattern being applied

### Approach Section

Step-by-step explanation of the algorithm:

**Structure:**
- Flowing prose (not numbered lists)
- Sequential logic flow
- Explains each major step
- Connects to intuition

**Example:**
> "We iterate through the array once, and for each number we calculate its complement (target - current number). Before storing the current number in our hash map, we check if its complement already exists. If it does, we've found our answer."

**What to Learn:**
- Algorithm flow
- Data structure usage
- Loop structure
- Conditional logic
- Why each step is necessary

### Why This Works (Optional)

Correctness explanation:

**Covers:**
- Why algorithm produces correct results
- Proof of correctness
- Mathematical reasoning
- Logical guarantees

**Example:**
- Hash map ensures we check all previous numbers
- Single pass guarantees we find earliest pair
- Return as soon as found ensures optimal result

### Example Walkthrough

Detailed execution trace with specific input:

**Format:**
```
Input: nums = [2, 7, 11, 15], target = 9

**Step 1:** i=0, num=2
  - complement = 9 - 2 = 7
  - 7 not in seen
  - Store: seen[2] = 0

**Step 2:** i=1, num=7
  - complement = 9 - 7 = 2
  - 2 IS in seen at index 0
  - Return [0, 1] ✓
```

**What to Learn:**
- Variable values at each step
- Data structure state changes
- Decision points and why
- When algorithm terminates
- How result is produced

## Complexity Analysis

### Time Complexity

Measures how runtime scales with input size:

**Format:** **O(n)** - explanation

**Common Complexities:**
- **O(1)**: Constant - same time regardless of input size
- **O(log n)**: Logarithmic - binary search, tree operations
- **O(n)**: Linear - single pass through data
- **O(n log n)**: Linearithmic - efficient sorting
- **O(n²)**: Quadratic - nested loops over data
- **O(2ⁿ)**: Exponential - recursive branching

**Understanding:**
- Counts significant operations
- Ignores constants and lower terms
- Worst-case scenario
- How it scales with input growth

**Example Analysis:**
```
Time Complexity: O(n)
- One loop through n elements
- Each iteration: O(1) hash map operations
- Total: O(n) × O(1) = O(n)
```

### Space Complexity

Measures extra memory used by algorithm:

**Format:** **O(n)** - explanation

**Common Complexities:**
- **O(1)**: Constant extra space (few variables)
- **O(log n)**: Logarithmic (recursion stack for binary search)
- **O(n)**: Linear (hash map, array of size n)
- **O(n²)**: Quadratic (2D array of size n×n)

**Understanding:**
- Counts auxiliary data structures
- Input/output don't count
- Recursion stack counts
- Temporary variables count

**Example Analysis:**
```
Space Complexity: O(n)
- Hash map stores up to n elements
- A few variables: O(1)
- Total: O(n) + O(1) = O(n)
```

## Edge Cases

Critical boundary conditions to handle:

**Common Edge Cases:**

**Empty Input:**
- **Case:** `nums = [], target = 0`
- **Handling:** Return empty array, handle gracefully

**Single Element:**
- **Case:** `nums = [5], target = 10`
- **Handling:** Cannot form pair, return empty

**No Solution:**
- **Case:** `nums = [1, 2, 3], target = 10`
- **Handling:** Return empty array or null

**Duplicates:**
- **Case:** `nums = [3, 3], target = 6`
- **Handling:** Different indices, valid pair

**Negative Numbers:**
- **Case:** `nums = [-1, -2, -3], target = -5`
- **Handling:** Works same as positive

**Large Values:**
- **Case:** Numbers near max int
- **Handling:** Check for overflow

**What to Learn:**
- Identify edge cases
- How solution handles them
- Testing strategy
- Defensive programming

## Code Implementation

### Code Structure

**Class Definition:**
```python
class Solution:
    def methodName(self, params) -> return_type:
```

**Method Docstring:**
```python
"""
Approach: [brief description]
Time Complexity: O(?)
Space Complexity: O(?)
"""
```

**Implementation:**
- Variable initialization
- Main algorithm logic
- Return statement

### Understanding Code

**Read systematically:**

1. **Method Signature**: Parameters and return type
2. **Docstring**: Approach and complexity
3. **Initialization**: Setup variables
4. **Main Logic**: Core algorithm
5. **Edge Cases**: Special handling
6. **Return**: Final result

**Example:**
```python
def twoSum(self, nums: List[int], target: int) -> List[int]:
    # 1. Setup: Create hash map
    seen = {}

    # 2. Main loop: Check each number
    for i, num in enumerate(nums):
        # 3. Calculate complement
        complement = target - num

        # 4. Check if complement exists
        if complement in seen:
            # 5. Found! Return indices
            return [seen[complement], i]

        # 6. Store current number
        seen[num] = i

    # 7. No solution found
    return []
```

### Comments and Documentation

**Types of Comments:**

**Section Comments:**
```python
# Step 1: Initialize data structures
# Step 2: Process input array
```

**Inline Comments:**
```python
seen[num] = i  # Store number with its index
```

**Docstrings:**
```python
"""
Approach: Hash map for O(n) lookup
Time: O(n), Space: O(n)
"""
```

**What to Focus On:**
- Why, not what (code shows what)
- Complex logic explanation
- Non-obvious choices
- Edge case handling

## Alternative Solutions

Many problems include multiple approaches:

### Comparing Approaches

**Solution 1: Hash Map**
- Time: O(n)
- Space: O(n)
- Best overall

**Solution 2: Brute Force**
- Time: O(n²)
- Space: O(1)
- Simple but slow

**Solution 3: Two Pointers**
- Time: O(n log n)
- Space: O(1)
- Requires sorting

**What to Learn:**
- Trade-offs between approaches
- When to use each
- Interview considerations
- Optimization opportunities

## Learning Strategies

### First Reading

1. **Read Problem**: Understand requirements
2. **Read Examples**: See expected behavior
3. **Read Intuition**: Get the key insight
4. **Skim Approach**: High-level understanding
5. **Glance at Code**: See structure

### Deep Study

1. **Study Approach**: Line by line
2. **Trace Example**: Follow execution
3. **Analyze Code**: Understand each line
4. **Study Complexity**: Why O(n)?
5. **Check Edge Cases**: How handled?
6. **Compare Alternatives**: Why this way?

### Active Learning

1. **Hide Solution**: Try solving first
2. **Read Intuition**: Get hint
3. **Implement**: Code your solution
4. **Compare**: Check against reference
5. **Understand Differences**: Learn why

### Pattern Recognition

1. **Identify Category**: What pattern?
2. **Core Technique**: Hash map? Two pointers?
3. **Similar Problems**: What else uses this?
4. **Generalize**: When to apply pattern?

---

[← Previous: Code Viewing](04-code-viewing.md) | [🏠 Home](README.md) | [Next: Study Strategies →](study/README.md)
