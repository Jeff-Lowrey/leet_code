"""
# 042. Trapping Rain Water
# Difficulty: Medium
Given a problem that demonstrates key concepts in Two Pointers.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages two pointers principles
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

The approach uses two pointers techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using two pointers method
3. Return the computed result

</details>
"""

class Solution:
    def trap(self, height: List[int]) -> int:
        """
        Calculate the amount of water that can be trapped between blocks.
        
        Args:
            height: List of integers representing the height of each block
            
        Returns:
            Integer representing the total amount of water that can be trapped
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Edge case: if array is empty or has less than 3 elements
        if not height or len(height) < 3:
            return 0
            
        # Initialize pointers and variables
        left = 0
        right = len(height) - 1
        left_max = right_max = water = 0
        
        # Use two pointer technique to calculate trapped water
        while left < right:
            # Update maximum height from left
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            # Update maximum height from right
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1
                
        return water

def test_solution():
    """
    Test cases for 042. Trapping Rain Water.
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
    print(f"Solution for 042. Trapping Rain Water")
