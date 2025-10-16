"""
# Difficulty: Medium

# 198. House Robber

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2,7,9,3,1]</dd>
<dt>Output:</dt>
<dd>12 (maximum money)</dd>
<dt>Explanation:</dt>
<dd>Maximum amount robbed from [1,2,3,1] is 4 by robbing houses 0 and 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
At each house, choose to rob it (take current + best from i-2) or skip it (take best from i-1). dp[i] = max(dp[i-1], nums[i] + dp[i-2]).

### APPROACH:
1. **Handle edge cases**: If empty array return 0, if single house return nums[0]
2. **Initialize variables**: Set prev2 = 0 (two houses back), prev1 = 0 (one house back)
3. **Iterate through houses**: For each house value in nums
4. **Calculate max at current**: temp = max(prev1, prev2 + current_house)
5. **Decide rob or skip**: Either skip current (keep prev1) or rob current (prev2 + current)
6. **Update variables**: Set prev2 = prev1, prev1 = temp for next iteration
7. **Return result**: Return prev1 as maximum money that can be robbed

### WHY THIS WORKS:
- DP recurrence: max(rob current + best from i-2, skip current and take best from i-1)
- Can't rob adjacent houses, so robbing house i means using result from i-2
- Optimal substructure: solution to i depends only on i-1 and i-2
- Space optimization: only need last two values, not entire DP array
- O(n) time single pass, O(1) space with two variables instead of array

### EXAMPLE WALKTHROUGH:
```
Input: nums = [2,7,9,3,1]
Step 1: Build DP table
  dp[0] = 2 (rob house 0)
  dp[1] = max(2, 7) = 7 (rob house 1)
  dp[2] = max(7, 2+9) = 11 (rob houses 0,2)
  dp[3] = max(11, 7+3) = 11 (keep houses 0,2)
  dp[4] = max(11, 11+1) = 12 (rob houses 0,2,4)

Step 2: Optimal solution
  Rob houses at indices 0, 2, 4
  Total: 2 + 9 + 1 = 12

Output: 12 (maximum money)
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
    def rob(self, nums: List[int]) -> int:
        """
        Determines the maximum amount that can be robbed from houses.

        Args:
            nums: List of integers representing money in each house

        Returns:
            Maximum amount that can be robbed without choosing adjacent houses

        Time complexity: O(n) where n is the length of nums
        Space complexity: O(1) as we only use two variables
        """
        # Handle edge cases
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]

        # Initialize variables to track maximum money at each step
        # prev2 represents max money if we ended at i-2 house
        # prev1 represents max money if we ended at i-1 house
        prev2 = nums[0]
        prev1 = max(nums[0], nums[1])

        # Iterate through the houses starting from index 2
        for i in range(2, len(nums)):
            # At each house, we can either:
            # 1. Rob this house and add it to the max money from i-2 houses
            # 2. Skip this house and keep the max money from i-1 houses
            current = max(prev2 + nums[i], prev1)

            # Update our tracking variables for the next iteration
            prev2 = prev1
            prev1 = current

        return prev1


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - rob houses 1 and 3 (7 + 9 = 16) or houses 0, 2, 4 (2 + 9 + 1 = 12)
    result = solution.rob([2, 7, 9, 3, 1])
    expected = 12
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single element
    result = solution.rob([5])
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Two elements - rob the maximum
    result = solution.rob([1, 2])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 198. House Robber")
