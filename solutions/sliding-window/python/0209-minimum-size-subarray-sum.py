"""
# Difficulty: Medium

# 0209. Minimum Size Subarray Sum

Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>target = 7, nums = [2,3,1,2,4,3]</dd>
<dt>Output:</dt>
<dd>2 (minimum length)</dd>
<dt>Explanation:</dt>
<dd>The minimal length subarray with sum ≥ 7 is [4,3] with length 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Sliding Window
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Complement Search, Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is that use sliding window. Expand window until sum >= target. Then shrink from left while sum >= target. Track minimum length. This achieves O(n) time with single pass.

### APPROACH:
1. **Initialize variables**: Set left = 0, min_len = float('inf'), current_sum = 0
2. **Expand with right pointer**: For right in range(len(nums))
3. **Add to window**: current_sum += nums[right]
4. **Contract while valid**: While current_sum >= target
5. **Update minimum**: min_len = min(min_len, right - left + 1)
6. **Shrink window**: current_sum -= nums[left], left += 1
7. **Continue scanning**: Process all elements
8. **Return result**: Return min_len if found, else 0

### WHY THIS WORKS:
- This ensures that sliding window expands right until sum >= target, then contracts left
- This ensures that greedy contraction: shrink window while maintaining sum >= target
- This ensures that each element added once (right++) and removed once (left++)
- This ensures that track minimum window size satisfying sum condition
- This ensures that o(n) time: two pointers scan array once, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
target = 7, nums = [2,3,1,2,4,3]
```

Step 1: Expand window
[2,3,1,2] sum=8 ≥ 7
Step 2: Contract
[3,1,2] sum=6 < 7
Expand: [3,1,2,4] sum=10 ≥ 7
Contract: [1,2,4] sum=7 ≥ 7
Contract: [2,4] sum=6 < 7
Expand: [2,4,3] sum=9 ≥ 7
Contract: [4,3] sum=7 ≥ 7, length=2

Output:
```
2 (minimum length)
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from typing import List, Optional, Dict, Tuple
import sys


class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        """
        Find the minimum length of a contiguous subarray whose sum is greater than
        or equal to the target.

        Args:
            target: The target sum we're looking for
            nums: List of positive integers

        Returns:
            int: Minimum length of subarray that sums to >= target, or 0 if no such subarray exists
        """
        if not nums:
            return 0

        n = len(nums)
        min_length = sys.maxsize
        current_sum = 0
        left = 0

        # Sliding window approach
        for right in range(n):
            # Add the current number to our running sum
            current_sum += nums[right]

            # While our sum is >= target, try to minimize the window
            while current_sum >= target:
                # Update minimum length if current window is smaller
                min_length = min(min_length, right - left + 1)

                # Remove leftmost element and shrink window
                current_sum -= nums[left]
                left += 1

        # Return 0 if we never found a valid subarray
        return min_length if min_length != sys.maxsize else 0


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.minSubArrayLen(7, [2, 3, 1, 2, 4, 3])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty array
    result = solution.minSubArrayLen(7, [])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 209. Minimum Size Subarray Sum")
