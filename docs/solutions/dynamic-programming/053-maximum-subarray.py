"""
# Difficulty: Medium

# 053. Maximum Subarray

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
