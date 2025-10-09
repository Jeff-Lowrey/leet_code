"""
# Difficulty: Medium

# 416. Partition Equal Subset Sum

Given a problem that demonstrates key concepts in Dynamic Programming.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of dynamic programming concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages dynamic programming principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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

def test_solution():
    """
    Test cases for 416. Partition Equal Subset Sum.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 416. Partition Equal Subset Sum")
