"""
# 376. Wiggle Subsequence
**Medium**

Given a problem that demonstrates key concepts in Greedy.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of greedy concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply greedy methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages greedy principles
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

The approach uses greedy techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using greedy method
3. Return the computed result

</details>
"""

class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        """
        Find the length of the longest wiggle subsequence.
        
        A sequence [x1, x2, ..., xn] is a wiggle sequence if its differences
        (x2-x1), (x3-x2), ..., (xn-x[n-1]) strictly alternate between positive and negative.
        
        Args:
            nums: List of integers
            
        Returns:
            Length of the longest wiggle subsequence
            
        Example:
            >>> s = Solution()
            >>> s.wiggleMaxLength([1,7,4,9,2,5])
            6
        """
        if not nums:
            return 0
        
        if len(nums) < 2:
            return 1
            
        # Initialize dp arrays for both up and down sequences
        # up[i] represents the length of wiggle subsequence ending at i with a rising difference
        # down[i] represents the length of wiggle subsequence ending at i with a falling difference
        up = [1] * len(nums)
        down = [1] * len(nums)
        
        # Iterate through the array starting from index 1
        for i in range(1, len(nums)):
            if nums[i] > nums[i-1]:
                # If current number is greater, we can extend a down sequence
                up[i] = down[i-1] + 1
                down[i] = down[i-1]
            elif nums[i] < nums[i-1]:
                # If current number is smaller, we can extend an up sequence
                down[i] = up[i-1] + 1
                up[i] = up[i-1]
            else:
                # If numbers are equal, we can't extend either sequence
                up[i] = up[i-1]
                down[i] = down[i-1]
        
        # Return the maximum of the last elements in up and down arrays
        return max(up[-1], down[-1])

def test_solution():
    """
    Test cases for 376. Wiggle Subsequence.
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
    print(f"Solution for 376. Wiggle Subsequence")
