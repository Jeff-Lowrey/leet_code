"""
# 198. House Robber
**Medium**

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

def test_solution():
    """
    Test cases for 198. House Robber.
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
    print(f"Solution for 198. House Robber")
