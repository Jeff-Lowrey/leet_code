"""
# Difficulty: Medium

# 053. Maximum Subarray

Given an integer array nums, find the subarray with the largest sum, and return its sum.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[-2, 1, -3, 4, -1, 2, 1, -5, 4]</dd>
<dt>Output:</dt>
<dd>6 (subarray [4, -1, 2, 1])</dd>
<dt>Explanation:</dt>
<dd>Maximum subarray sum of [-2,1,-3,4,-1,2,1,-5,4] is 6 from [4,-1,2,1]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
Use Kadane's algorithm: track the maximum sum ending at current position. At each step, either extend the previous subarray or start fresh. Keep global maximum throughout.

### APPROACH:
1. **Initialize variables**: Set current_sum = max_sum = nums[0]
2. **Iterate from second element**: Loop through nums starting at index 1
3. **Apply Kadane's algorithm**: For each num, compute current_sum = max(num, current_sum + num)
4. **Decide extend or restart**: Choose between extending previous subarray or starting fresh at current element
5. **Update maximum**: Set max_sum = max(max_sum, current_sum) after each iteration
6. **Continue through array**: Process all elements maintaining running maximum
7. **Return result**: Return max_sum as the maximum subarray sum

### WHY THIS WORKS:
- Kadane's algorithm exploits optimal substructure: max subarray ending at i either extends from i-1 or starts fresh at i
- Decision max(num, current_sum + num) determines whether previous sum helps or hurts
- Negative current_sum means starting fresh is better than extending
- Global max tracking ensures we never lose the best answer seen so far
- O(1) space optimization: no need to store entire DP array, just track current and max

### EXAMPLE WALKTHROUGH:
```
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Step 1: Initialize
  current_sum = -2, max_sum = -2

Step 2: num=1
  current_sum = max(1, -2+1) = max(1, -1) = 1
  max_sum = max(-2, 1) = 1

Step 3: num=-3
  current_sum = max(-3, 1-3) = max(-3, -2) = -2
  max_sum = 1

Step 4: num=4
  current_sum = max(4, -2+4) = max(4, 2) = 4
  max_sum = max(1, 4) = 4

Step 5: num=-1
  current_sum = max(-1, 4-1) = 3
  max_sum = 4

Step 6: num=2
  current_sum = max(2, 3+2) = 5
  max_sum = max(4, 5) = 5

Step 7: num=1
  current_sum = max(1, 5+1) = 6
  max_sum = max(5, 6) = 6

Step 8: num=-5
  current_sum = max(-5, 6-5) = 1
  max_sum = 6

Step 9: num=4
  current_sum = max(4, 1+4) = 5
  max_sum = 6

Output: 6 (subarray [4, -1, 2, 1])
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

from typing import List, Optional, Dict, Tuple, Any


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        """
        Find the contiguous subarray with the largest sum.

        Args:
            nums: List of integers

        Returns:
            int: The sum of the maximum subarray

        Time complexity: O(n)
        Space complexity: O(1)
        """
        if not nums:
            return 0

        # Initialize variables for current sum and maximum sum
        current_sum = max_sum = nums[0]

        # Iterate through the array starting from second element
        for num in nums[1:]:
            # At each step, we either start a new subarray (num)
            # or continue the previous subarray (current_sum + num)
            current_sum = max(num, current_sum + num)
            # Update the maximum sum if current sum is larger
            max_sum = max(max_sum, current_sum)

        return max_sum

    def maxSubArrayWithIndices(self, nums: List[int]) -> tuple[Any, ...]:
        """
        Find the contiguous subarray with the largest sum and return its indices.

        Args:
            nums: List of integers

        Returns:
            tuple: (max_sum, start_index, end_index)

        Time complexity: O(n)
        Space complexity: O(1)
        """
        if not nums:
            return (0, -1, -1)

        current_sum = max_sum = nums[0]
        start = end = max_start = 0

        for i in range(1, len(nums)):
            if nums[i] > current_sum + nums[i]:
                current_sum = nums[i]
                start = i
            else:
                current_sum = current_sum + nums[i]

            if current_sum > max_sum:
                max_sum = current_sum
                max_start = start
                end = i

        return (max_sum, max_start, end)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.maxSubArray([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.maxSubArray([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 053. Maximum Subarray")
