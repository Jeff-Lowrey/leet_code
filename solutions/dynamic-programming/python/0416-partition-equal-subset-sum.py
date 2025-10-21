"""
# Difficulty: Medium

# 416. Partition Equal Subset Sum

Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,5,11,5]</dd>
<dt>Output:</dt>
<dd>True (can partition into equal subsets)</dd>
<dt>Explanation:</dt>
<dd>Array [1,5,11,5] can be partitioned into [1,5,5] and [11] with equal sum 11</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Dynamic Programming
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
This is 0/1 knapsack with target = sum/2. Check if sum is odd (impossible to partition). Use DP to find if any subset sums to target. dp[i][j] = can we sum to j using first i elements.

### APPROACH:
1. **Calculate total sum**: Compute total_sum = sum(nums)
2. **Check feasibility**: If total_sum is odd, return False (cannot split into equal halves)
3. **Define target**: Set target = total_sum // 2 (need subset summing to this)
4. **Initialize DP set**: Create dp = {0} to track all possible subset sums
5. **Iterate through numbers**: For each num in nums
6. **Update possible sums**: For each sum in current dp, add (sum + num) to new_dp
7. **Check for target**: If target in dp, return True; otherwise continue
8. **Return result**: After processing all numbers, return target in dp

### WHY THIS WORKS:
- Partition problem: find subset with sum = total_sum // 2
- 0/1 knapsack DP: dp[i][j] = can we make sum j using first i elements
- Transition: dp[i][j] = dp[i-1][j] (exclude) or dp[i-1][j-nums[i]] (include)
- Space optimization: 1D DP array, iterate backwards to avoid overwriting
- O(n * sum) time, O(sum) space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,5,11,5]
Step 1: Calculate target
  sum = 22, target = 11

Step 2: DP subset sum
  dp[0] = True
  Process 1: dp[1] = True
  Process 5: dp[5] = True, dp[6] = True
  Process 11: dp[11] = True, dp[16] = True, dp[12] = True
  Process 5: dp[11] already True

Step 3: Verify partition
  Subset 1: [1, 5, 5] = 11
  Subset 2: [11] = 11

Output: True (can partition into equal subsets)
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

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        """
        Determines if the input array can be partitioned into two subsets with equal sums.

        Args:
            nums: List of positive integers

        Returns:
            bool: True if the array can be partitioned into two equal sum subsets, False otherwise

        Example:
            Input: nums = [1,5,11,5]
            Output: true
            Explanation: The array can be partitioned as [1, 5, 5] and [11]
        """
        # Calculate total sum
        total_sum = sum(nums)

        # If total sum is odd, we cannot partition into equal subsets
        if total_sum % 2 != 0:
            return False

        target = total_sum // 2

        # Edge case: empty array or single element
        if len(nums) <= 1:
            return False

        # Initialize dp array
        # dp[i] represents if sum i can be achieved using the numbers
        dp = [False] * (target + 1)
        dp[0] = True  # Empty subset sums to 0

        # Process each number
        for num in nums:
            # Check from target down to num
            for j in range(target, num - 1, -1):
                # If we can achieve j-num, we can achieve j by adding num
                dp[j] = dp[j] or dp[j - num]

        return dp[target]

    def canPartition_recursive(self, nums: List[int]) -> bool:
        """
        Alternative recursive solution with memoization (less efficient but easier to understand).

        Args:
            nums: List of positive integers

        Returns:
            bool: True if the array can be partitioned into two equal sum subsets, False otherwise
        """
        total_sum = sum(nums)

        if total_sum % 2 != 0:
            return False

        target = total_sum // 2
        memo: dict[Any, Any] = {}

        def can_partition_helper(index: int, current_sum: int) -> bool:
            # Base cases
            if current_sum == target:
                return True
            if current_sum > target or index >= len(nums):
                return False

            # Check memo
            key = (index, current_sum)
            if key in memo:
                return memo[key]  # type: ignore

            # Try including or excluding current number
            result = can_partition_helper(index + 1, current_sum + nums[index]) or can_partition_helper(
                index + 1, current_sum
            )

            memo[key] = result
            return result

        return can_partition_helper(0, 0)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - [1,5,11,5] can be partitioned into [1,5,5] and [11]
    result = solution.canPartition([1, 5, 11, 5])
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Cannot be partitioned
    result = solution.canPartition([1, 2, 3, 5])
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element - cannot partition
    result = solution.canPartition([1])
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 416. Partition Equal Subset Sum")
