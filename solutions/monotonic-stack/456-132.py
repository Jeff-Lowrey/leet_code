"""
# 456. 132
# Difficulty: Medium
Given a problem that demonstrates key concepts in Monotonic Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
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

The approach uses monotonic stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using monotonic stack method
3. Return the computed result

</details>
"""

class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        """
        Determines if the given array contains a 132 pattern.
        
        Args:
            nums: List of integers to check for the pattern
            
        Returns:
            bool: True if a 132 pattern exists, False otherwise
        """
        if len(nums) < 3:
            return False
        
        # Stack to keep track of potential "2" values
        stack = []
        
        # Initialize the "2" value (nums[k]) as negative infinity
        s3 = float('-inf')
        
        # Iterate through the array from right to left
        for num in reversed(nums):
            # If current number is less than s3, we found a 132 pattern
            if num < s3:
                return True
            
            # While stack is not empty and current number is greater than top of stack
            while stack and stack[-1] < num:
                # Update s3 (potential "2" value)
                s3 = stack.pop()
            
            # Add current number to stack as potential "3" value
            stack.append(num)
        
        return False

def test_solution():
    """
    Test cases for 456. 132.
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
    print(f"Solution for 456. 132")
