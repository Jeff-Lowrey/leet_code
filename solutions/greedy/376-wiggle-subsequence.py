"""
# Difficulty: Medium

# 376. Wiggle Subsequence

A wiggle sequence is a sequence where the differences between successive numbers strictly alternate between positive and negative. The first difference (if one exists) may be either positive or negative. A sequence with one element and a sequence with two non-equal elements are trivially wiggle sequences.

Given an integer array nums, return the length of the longest wiggle subsequence of nums.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,7,4,9,2,5]</dd>
<dt>Output:</dt>
<dd>6 (longest wiggle sequence length)</dd>
<dt>Explanation:</dt>
<dd>Longest wiggle subsequence in [1,7,4,9,2,5] has length 6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A wiggle occurs when direction changes (up->down or down->up). Greedily count direction changes by tracking previous difference sign. Skip equal consecutive numbers.

### APPROACH:
1. **Handle edge cases**: If len(nums) < 2, return len(nums)
2. **Initialize variables**: Set up = 1, down = 1
3. **Iterate from second element**: For i in range(1, len(nums))
4. **Check increasing**: If nums[i] > nums[i-1], up = down + 1
5. **Check decreasing**: If nums[i] < nums[i-1], down = up + 1
6. **Continue processing**: Update up and down for each element
7. **Return result**: Return max(up, down)

### WHY THIS WORKS:
- Track up/down lengths: up[i] = longest wiggle ending with up, down[i] ending with down
- If nums[i] > nums[i-1]: up = down + 1 (extend down sequence with up)
- If nums[i] < nums[i-1]: down = up + 1 (extend up sequence with down)
- Greedy works: always extend appropriate sequence
- O(n) time, O(1) space with two variables

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,7,4,9,2,5]
Step 1: Track direction changes
  up = 1, down = 1

Step 2: Process each adjacent pair
  1→7: increasing, up = down + 1 = 2
  7→4: decreasing, down = up + 1 = 3
  4→9: increasing, up = down + 1 = 4
  9→2: decreasing, down = up + 1 = 5
  2→5: increasing, up = down + 1 = 6

Output: 6 (longest wiggle sequence length)
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        """
        Find the length of the longest wiggle subsequence.

        A sequence [x1, x2, ..., xn] is a wiggle sequence if its differences
        (x2-x1), (x3-x2), ..., (xn-x[n-1]) strictly alternate between positive and negative.

        Args:
            nums: List of integers

        Returns:
            Length of the longest wiggle subsequence

        Example:
            >>> s = Solution()
            >>> s.wiggleMaxLength([1,7,4,9,2,5])
            6
        """
        if not nums:
            return 0

        if len(nums) < 2:
            return 1

        # Initialize dp arrays for both up and down sequences
        # up[i] represents the length of wiggle subsequence ending at i with a rising difference
        # down[i] represents the length of wiggle subsequence ending at i with a falling difference
        up = [1] * len(nums)
        down = [1] * len(nums)

        # Iterate through the array starting from index 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i - 1]:
                # If current number is greater, we can extend a down sequence
                up[i] = down[i - 1] + 1
                down[i] = down[i - 1]
            elif nums[i] < nums[i - 1]:
                # If current number is smaller, we can extend an up sequence
                down[i] = up[i - 1] + 1
                up[i] = up[i - 1]
            else:
                # If numbers are equal, we can't extend either sequence
                up[i] = up[i - 1]
                down[i] = down[i - 1]

        # Return the maximum of the last elements in up and down arrays
        return max(up[-1], down[-1])


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.wiggleMaxLength([1, 2, 3])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.wiggleMaxLength([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.wiggleMaxLength([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 376. Wiggle Subsequence")
