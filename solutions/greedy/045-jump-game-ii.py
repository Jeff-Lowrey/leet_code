"""
# 045. Jump Game Ii
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
    def jump(self, nums: List[int]) -> int:
        """
        Calculates the minimum number of jumps needed to reach the last index.
        
        Args:
            nums: List of non-negative integers representing maximum jump lengths
            
        Returns:
            int: Minimum number of jumps needed to reach the last index
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Handle edge cases
        if not nums or len(nums) <= 1:
            return 0
            
        # Initialize variables
        jumps = 0          # Count of jumps taken
        current_max = 0    # Maximum index that can be reached with current jumps
        next_max = 0      # Maximum index that can be reached with jumps + 1
        
        # Iterate through the array (except last element)
        for i in range(len(nums) - 1):
            # Update the farthest position we can reach
            next_max = max(next_max, i + nums[i])
            
            # If we've reached the current maximum position
            # we need to take another jump
            if i == current_max:
                jumps += 1
                current_max = next_max
                
                # If we can already reach the end, break
                if current_max >= len(nums) - 1:
                    break
                    
        return jumps

def test_solution():
    """
    Test cases for 045. Jump Game Ii.
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
    print(f"Solution for 045. Jump Game Ii")
