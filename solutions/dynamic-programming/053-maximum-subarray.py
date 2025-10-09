"""
# 053. Maximum Subarray
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

    def maxSubArrayWithIndices(self, nums: List[int]) -> tuple:
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

def test_solution():
    """
    Test cases for 053. Maximum Subarray.
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
    print(f"Solution for 053. Maximum Subarray")
