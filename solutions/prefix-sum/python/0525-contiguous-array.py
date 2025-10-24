"""
# 0525. Contiguous Array

# Difficulty: Medium

Given a binary array nums, return the maximum length of a contiguous subarray
with an equal number of 0 and 1.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [0,1]</dd>
<dt>Output:</dt>
<dd>2</dd>
<dt>Explanation:</dt>
<dd>The longest contiguous subarray with equal 0s and 1s has length 2: [0,1] or [1,0]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(n) - Additional hash map storage

### INTUITION:
Transform the problem: treat 0 as -1. Finding equal 0s and 1s is equivalent to
finding a subarray with sum 0. Use prefix sum with hash map to track when we've
seen each sum value before.

### APPROACH:
1. **Transform**: Replace 0 with -1 in counting (not modifying array)
2. **Prefix Sum**: Calculate cumulative count (treating 0 as -1)
3. **Hash Map**: Store (sum → earliest_index) pairs
4. **Check**: If same sum seen before, subarray between has sum 0 (equal 0s and 1s)

### WHY THIS WORKS:
If we treat 0 as -1, then a subarray with equal 0s and 1s will have sum 0.
Using prefix sums: if prefix[i] == prefix[j], then sum(nums[i+1:j+1]) == 0.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [0, 1, 0]
```

Transform to: [-1, 1, -1]
Prefix sums: [-1, 0, -1]
Index -1: sum 0 (initialize)
Index 0: sum -1, store {0: -1, -1: 0}
Index 1: sum 0, seen at index -1, length = 1 - (-1) = 2
Index 2: sum -1, seen at index 0, length = 2 - 0 = 2
Maximum length = 2

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(n)

### EDGE CASES:
- All 0s or all 1s: No equal subarray (return 0)
- Already balanced: Entire array is valid
- Empty array: Return 0
- Single element: Cannot have equal 0s and 1s

</details>
"""

import re


class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        """
        Approach: Prefix sum with hash map (treat 0 as -1)
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Hash map: count -> earliest index
        # Initialize with count 0 at index -1
        count_map = {0: -1}
        max_length = 0
        count = 0

        for i, num in enumerate(nums):
            # Treat 0 as -1, 1 as +1
            count += 1 if num == 1 else -1

            if count in count_map:
                # Calculate length of subarray
                max_length = max(max_length, i - count_map[count])
            else:
                # Store earliest occurrence of this count
                count_map[count] = i

        return max_length

    def findMaxLengthBruteForce(self, nums: list[int]) -> int:
        """
        Approach: Brute force checking all subarrays
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        max_length = 0
        n = len(nums)

        for i in range(n):
            zeros = 0
            ones = 0
            for j in range(i, n):
                if nums[j] == 0:
                    zeros += 1
                else:
                    ones += 1

                if zeros == ones:
                    max_length = max(max_length, j - i + 1)

        return max_length


def test_solution() -> None:
    """Test cases for Problem 525."""
    solution = Solution()

    # Test case 1: Basic case
    assert solution.findMaxLength([0, 1]) == 2
    print("Test case 1 passed: Basic [0, 1]")

    # Test case 2: Longer array
    assert solution.findMaxLength([0, 1, 0]) == 2
    print("Test case 2 passed: [0, 1, 0]")

    # Test case 3: All zeros
    assert solution.findMaxLength([0, 0, 0]) == 0
    print("Test case 3 passed: All zeros")

    # Test case 4: All ones
    assert solution.findMaxLength([1, 1, 1]) == 0
    print("Test case 4 passed: All ones")

    # Test case 5: Already balanced
    assert solution.findMaxLength([0, 1, 1, 0]) == 4
    print("Test case 5 passed: Already balanced")

    # Test case 6: Complex case
    assert solution.findMaxLength([0, 1, 0, 1, 1, 0, 0]) == 6
    print("Test case 6 passed: Complex array")

    # Test case 7: Single element
    assert solution.findMaxLength([0]) == 0
    print("Test case 7 passed: Single element")

    # Test case 8: Two equal parts
    assert solution.findMaxLength([0, 0, 1, 1]) == 4
    print("Test case 8 passed: Two equal parts")

    # Test case 9: Alternating
    assert solution.findMaxLength([0, 1, 0, 1, 0, 1]) == 6
    print("Test case 9 passed: Alternating pattern")

    # Test case 10: Unbalanced at ends
    assert solution.findMaxLength([1, 1, 0, 0, 1, 1]) == 4
    print("Test case 10 passed: Unbalanced at ends")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
