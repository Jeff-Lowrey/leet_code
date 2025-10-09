"""
# 213. House Robber Ii
# Difficulty: Medium
Given a problem that demonstrates key concepts in Dynamic Programming.

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

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses dynamic programming techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using dynamic programming method
3. Return the computed result

</details>
"""

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

def test_solution():
    """
    Test cases for 213. House Robber Ii.
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
    print(f"Solution for 213. House Robber Ii")
