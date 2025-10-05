I'll help you implement a solution for the Partition Equal Subset problem in Python. This solution will determine if an array can be partitioned into two subsets with equal sums.

```python
#!/usr/bin/env python3
"""
Partition Equal Subset Sum (LeetCode 416)
Time Complexity: O(n * sum)
Space Complexity: O(sum)
"""

from typing import List


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
        memo = {}
        
        def can_partition_helper(index: int, current_sum: int) -> bool:
            # Base cases
            if current_sum == target:
                return True
            if current_sum > target or index >= len(nums):
                return False
            
            # Check memo
            key = (index, current_sum)
            if key in memo:
                return memo[key]
            
            # Try including or excluding current number
            result = (can_partition_helper(index + 1, current_sum + nums[index]) or 
                     can_partition_helper(index + 1, current_sum))
            
            memo[key] = result
            return result
        
        return can_partition_helper(0, 0)


def test_partition_equal_subset():
    """Test cases for partition equal subset problem."""
    solution = Solution()
    
    # Test cases
    test_cases = [
        ([1, 5, 11, 5], True),
        ([1, 2, 3, 5], False),
        ([2, 2, 1, 1], True),
        ([1], False),
        ([1, 2, 5], False)
    ]
    
    for nums, expected in test_cases:
        result = solution.canPartition(nums)
        assert result == expected, f"Failed for input {nums}. Expected {expected}, got {result}"
        
        # Test recursive solution as well
        result_recursive = solution.canPartition_recursive(nums)
        assert result_recursive == expected, f"Recursive solution failed for input {nums}"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_partition_equal_subset()
```

This implementation includes:

1. A dynamic programming solution (`canPartition`) that uses O(sum) space complexity
2. An alternative recursive solution with memoization (`canPartition_recursive`)
3. Comprehensive test cases
4. Type hints and documentation
5. Proper error handling and edge cases
6. Clean code structure following Python conventions

The main solution uses a bottom-up dynamic programming approach where we maintain a dp array that keeps track of which sums are possible to achieve. The alternative recursive solution is included for educational purposes and to show a different approach to solving the same problem.

The code includes test cases to verify the implementation works correctly for various scenarios. You can run this file directly to execute the tests.

To use this solution, you would typically call:

```python
solution = Solution()
result = solution.canPartition([1, 5, 11, 5])  # Returns True
```

The code handles edge cases like:
- Empty arrays
- Single element arrays
- Arrays with odd sums (which can't be partitioned equally)
- Arrays where equal partition is impossible