"""
# Difficulty: Medium

# 0213. House Robber Ii

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2,3,2]</dd>
<dt>Output:</dt>
<dd>3 (maximum money, rob middle house)</dd>
<dt>Explanation:</dt>
<dd>Maximum amount robbed in circular arrangement [2,3,2] is 3 (cannot rob houses 0 and 2)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, Tree
**Patterns**: Greedy Algorithm, Dynamic Programming
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is that houses are circular - can't rob both first and last. Run House Robber I twice: once on houses[0:n-1] and once on houses[1:n]. Take the maximum of both results.

### APPROACH:
1. **Handle single house**: If len(nums) == 1, return nums[0]
2. **Define helper function**: Create rob_linear(houses) to solve linear house robber problem
3. **Case 1 - rob first**: Call rob_linear(nums[:-1]) to rob houses 0 to n-2 (exclude last)
4. **Case 2 - rob last**: Call rob_linear(nums[1:]) to rob houses 1 to n-1 (exclude first)
5. **Compare both cases**: Take maximum of the two results
6. **Return maximum**: Return max(case1, case2) as the maximum money that can be robbed

### WHY THIS WORKS:
- This ensures that circular: robbing house 0 means can't rob house n-1 and vice versa
- This ensures that run house robber I twice: once on [0..n-2], once on [1..n-1]
- This ensures that take maximum of two results
- This ensures that handles circular constraint by excluding one of the boundary houses
- This ensures that o(n) time: two passes of O(n) each, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2,3,2]
```

Step 1: Handle circular array

Steps:
Step 1: Case 1: Rob houses [0:n-1] → [2,3] → max = 3
Step 2: Case 2: Rob houses [1:n] → [3,2] → max = 3
Step 3: Case 1 detail
Step 4: dp[0] = 2
Step 5: dp[1] = max(2, 3) = 3
Step 6: Case 2 detail
Step 7: dp[0] = 3
Step 8: dp[1] = max(3, 2) = 3

Output:
```
3 (maximum money, rob middle house)
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


class Solution:
    def rob(self, nums: List[int]) -> int:
        """
        Determines the maximum amount that can be robbed from houses arranged in a circle.

        Args:
            nums: List of non-negative integers representing money in each house

        Returns:
            Maximum amount that can be robbed without taking adjacent houses
        """
        # Handle edge cases
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        if len(nums) == 2:
            return max(nums[0], nums[1])

        # Since houses are in circle, we can't rob both first and last house
        # So we calculate two scenarios:
        # 1. Rob houses from index 0 to n-2 (excluding last house)
        # 2. Rob houses from index 1 to n-1 (excluding first house)
        return max(self._rob_linear(nums[:-1]), self._rob_linear(nums[1:]))

    def _rob_linear(self, nums: List[int]) -> int:
        """
        Helper method to solve the linear house robber problem.

        Args:
            nums: List of non-negative integers representing money in each house

        Returns:
            Maximum amount that can be robbed without taking adjacent houses
        """
        # Initialize variables to keep track of maximum money
        # rob1 represents the max money if we rob house i-2
        # rob2 represents the max money if we rob house i-1
        rob1, rob2 = 0, 0

        # For each house, we can either rob it or not
        for num in nums:
            # temp stores the current maximum
            temp = max(rob1 + num, rob2)
            rob1 = rob2
            rob2 = temp

        return rob2


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - houses in circle [2,3,2], can't rob first and last
    result = solution.rob([2, 3, 2])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single element
    result = solution.rob([5])
    expected = 5
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Larger example
    result = solution.rob([1, 2, 3, 1])
    expected = 4
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 213. House Robber Ii")
