# Quick Start

[← Previous: Solution Structure](03-solution-structure.md) | [🏠 Home](README.md) | [Next: Formatting Guidelines →](05-formatting-guidelines/05-formatting-guidelines.md)

---

## Table of Contents

- [Creating Solutions](#creating-solutions)
- [Python Solutions](#python-solutions)
- [JavaScript Solutions](#javascript-solutions)
- [Alternative Language Solutions](#alternative-language-solutions)
- [Testing Your Solution](#testing-your-solution)
- [Common Mistakes](#common-mistakes)
- [Troubleshooting](#troubleshooting)

## Creating Solutions

Step-by-step guides for creating Python and JavaScript solutions.

## Creating Python Solutions

### Step 1: Copy the Template

```bash
# Navigate to correct category
cd docs/solutions/arrays-hashing

# Copy template
cp ../templates/SOLUTION_TEMPLATE.py 001-two-sum.py
```

### Step 2: Fill in Problem Information

Open `001-two-sum.py` and update the module docstring:

```python
"""
1. Two Sum
Difficulty: Easy

Given an array of integers `nums` and an integer `target`, return indices of the
two numbers such that they add up to `target`.

You may assume that each input would have exactly one solution, and you may not
use the same element twice.

You can return the answer in any order.
"""
```

### Step 3: Add Example Cases

Use HTML definition list format:

```python
"""
**Example 1:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2,7,11,15], target = 9</dd>
<dt>Output:</dt>
<dd>[0,1]</dd>
<dt>Explanation:</dt>
<dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
</dl>

**Example 2:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [3,2,4], target = 6</dd>
<dt>Output:</dt>
<dd>[1,2]</dd>
</dl>
"""
```

### Step 4: Write Solution Explanation

Add explanation sections in the `<details>` block:

```python
"""
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use a hash map to store numbers we've seen, allowing O(1) lookup for complements.

### APPROACH:
We iterate through the array once, and for each number we calculate its complement
(target - current number). Before storing the current number in our hash map, we
check if its complement already exists. If it does, we've found our answer.

### EXAMPLE WALKTHROUGH:

Input: nums = [2, 7, 11, 15], target = 9

**Step 1:** i=0, num=2
  - complement = 9 - 2 = 7
  - 7 not in seen
  - Store seen[2] = 0

**Step 2:** i=1, num=7
  - complement = 9 - 7 = 2
  - 2 IS in seen at index 0
  - Return [0, 1] ✓

### TIME COMPLEXITY:
**O(n)** - Single pass through array with O(1) hash map lookups

### SPACE COMPLEXITY:
**O(n)** - Hash map stores up to n elements in worst case

### EDGE CASES:
- **Empty array:** Return empty result
- **No solution exists:** Return empty array (though problem guarantees solution)
- **Duplicate values:** Use different indices, valid

</details>
"""
```

### Step 5: Implement the Solution

```python
from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Approach: Hash map for O(n) lookup
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Store seen numbers with their indices
        seen = {}

        for i, num in enumerate(nums):
            # Calculate what number we need
            complement = target - num

            # Check if we've seen the complement
            if complement in seen:
                return [seen[complement], i]

            # Store current number and index
            seen[num] = i

        # No solution found
        return []
```

### Step 6: Add Test Cases

```python
if __name__ == "__main__":
    solution = Solution()

    # Test case 1 - Basic case
    nums1 = [2, 7, 11, 15]
    target1 = 9
    print(f"Test 1: nums={nums1}, target={target1}")
    print(f"Output: {solution.twoSum(nums1, target1)}")
    print(f"Expected: [0, 1]\n")

    # Test case 2 - Different indices
    nums2 = [3, 2, 4]
    target2 = 6
    print(f"Test 2: nums={nums2}, target={target2}")
    print(f"Output: {solution.twoSum(nums2, target2)}")
    print(f"Expected: [1, 2]\n")

    # Test case 3 - Duplicates
    nums3 = [3, 3]
    target3 = 6
    print(f"Test 3: nums={nums3}, target={target3}")
    print(f"Output: {solution.twoSum(nums3, target3)}")
    print(f"Expected: [0, 1]\n")
```

### Step 7: Test Your Solution

```bash
python docs/solutions/arrays-hashing/001-two-sum.py
```

Expected output:
```
Test 1: nums=[2, 7, 11, 15], target=9
Output: [0, 1]
Expected: [0, 1]

Test 2: nums=[3, 2, 4], target=6
Output: [1, 2]
Expected: [1, 2]

Test 3: nums=[3, 3], target=6
Output: [0, 1]
Expected: [0, 1]
```

## Creating JavaScript Solutions

### Step 1: Copy the Template

```bash
# Navigate to alternatives folder
cd docs/solutions/arrays-hashing/alternatives

# Copy template
cp ../../templates/SOLUTION_TEMPLATE.js 001-two-sum.js.js
```

### Step 2: Fill JSDoc Comment

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
 */
```

### Step 3: Add Solution Explanation

```javascript
/**
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use a Map to store seen numbers for O(1) complement lookups.
 *
 * ### APPROACH:
 * Iterate through array, calculating complement for each number. Check if
 * complement exists in our Map before storing current number.
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Single pass with O(1) Map operations
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Map stores up to n elements
 *
 * </details>
 */
```

### Step 4: Implement Solution

```javascript
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

            // Check if complement exists
            if (seen.has(complement)) {
                return [seen.get(complement), i];
            }

            // Store current number and index
            seen.set(nums[i], i);
        }

        return [];
    }
}
```

### Step 5: Add Test Cases

```javascript
// Test cases
function runTests() {
    const solution = new Solution();

    // Test case 1
    console.log("Test Case 1:");
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    const result1 = solution.twoSum(nums1, target1);
    console.log(`Input: nums=${JSON.stringify(nums1)}, target=${target1}`);
    console.log(`Output: ${JSON.stringify(result1)}`);
    console.log(`Expected: [0, 1]\n`);

    // Test case 2
    console.log("Test Case 2:");
    const nums2 = [3, 2, 4];
    const target2 = 6;
    const result2 = solution.twoSum(nums2, target2);
    console.log(`Input: nums=${JSON.stringify(nums2)}, target=${target2}`);
    console.log(`Output: ${JSON.stringify(result2)}`);
    console.log(`Expected: [1, 2]\n`);
}

if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}
```

### Step 6: Test Your Solution

```bash
node docs/solutions/arrays-hashing/javascript/001-two-sum.js.js
```

## Using the Web Interface

### Upload Process

**Step 1: Navigate to Solution**
- Browse to the problem in its category
- Click on the solution page

**Step 2: Click Upload**
- Find the "Upload Solution" button
- Click to open upload form

**Step 3: Select Language**
- Choose programming language from dropdown
- Supported: Java, C++, JavaScript, Go, Rust, etc.

**Step 4: Choose File**
- Click "Choose File" button
- Select your solution file
- File must follow naming convention

**Step 5: Upload**
- Click "Upload" button
- System validates file
- Language badge appears if successful

### File Requirements

**Naming Convention:**
```
NNN-problem-name.{ext}.{ext}
```

**Examples:**
- `001-two-sum.java.java`
- `001-two-sum.cpp.cpp`
- `217-contains-duplicate.go.go`

**Validation:**
- File name must match problem
- Extension must match selected language
- File must be valid code

## Common Workflows

### Workflow 1: New Python Solution

```bash
# 1. Copy template
cp docs/solutions/templates/SOLUTION_TEMPLATE.py docs/solutions/arrays-hashing/001-two-sum.py

# 2. Edit file (fill in all sections)
vim docs/solutions/arrays-hashing/001-two-sum.py

# 3. Test
python docs/solutions/arrays-hashing/001-two-sum.py

# 4. Verify formatting
# Check examples use <dl> format
# Check all required sections present
```

### Workflow 2: JavaScript Alternative

```bash
# 1. Ensure alternatives folder exists
mkdir -p docs/solutions/arrays-hashing/alternatives

# 2. Copy template
cp docs/solutions/templates/SOLUTION_TEMPLATE.js docs/solutions/arrays-hashing/javascript/001-two-sum.js.js

# 3. Edit file
vim docs/solutions/arrays-hashing/javascript/001-two-sum.js.js

# 4. Test
node docs/solutions/arrays-hashing/javascript/001-two-sum.js.js
```

### Workflow 3: Web Upload

```
1. Start the application: ./run.sh
2. Navigate: http://127.0.0.1:9501
3. Browse to category
4. Click solution
5. Click "Upload Solution"
6. Select language
7. Choose file
8. Upload
9. Verify badge appears
```

## Quick Reference

### Python Checklist
- [ ] Copied SOLUTION_TEMPLATE.py
- [ ] Updated problem number, title, difficulty
- [ ] Added problem description
- [ ] Formatted examples with `<dl>`
- [ ] Wrote all explanation sections
- [ ] Implemented solution with type hints
- [ ] Added 3+ test cases
- [ ] Tested execution

### JavaScript Checklist
- [ ] Copied SOLUTION_TEMPLATE.js
- [ ] Updated JSDoc comment
- [ ] Formatted examples with `<dl>`
- [ ] Wrote all explanation sections
- [ ] Implemented solution with JSDoc
- [ ] Added test cases
- [ ] Added module exports
- [ ] Tested execution

---

[← Previous: Solution Structure](03-solution-structure.md) | [🏠 Home](README.md) | [Next: Formatting Guidelines →](05-formatting-guidelines/05-formatting-guidelines.md)
