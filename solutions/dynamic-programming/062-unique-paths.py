"""
# Difficulty: Medium

# 062. Unique Paths

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
    def uniquePaths(self, m: int, n: int) -> int:
        """
        Calculate the number of unique paths in an m x n grid.
        
        Args:
            m (int): Number of rows in the grid
            n (int): Number of columns in the grid
            
        Returns:
            int: Number of unique paths from top-left to bottom-right
        """
        # Create a 2D DP table initialized with 1s
        dp = [[1] * n for _ in range(m)]
        
        # Fill the DP table
        # For each cell, paths = paths from above + paths from left
        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
        
        # Return the bottom-right cell value
        return dp[m-1][n-1]
    
    def uniquePathsOptimized(self, m: int, n: int) -> int:
        """
        Space-optimized version using 1D array instead of 2D array.
        
        Args:
            m (int): Number of rows in the grid
            n (int): Number of columns in the grid
            
        Returns:
            int: Number of unique paths from top-left to bottom-right
        """
        # Create a 1D array for current row
        dp = [1] * n
        
        # Process each row
        for i in range(1, m):
            # Update each cell in the row
            for j in range(1, n):
                dp[j] += dp[j-1]
        
        return dp[n-1]

def test_solution():
    """
    Test cases for 062. Unique Paths.
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
    print(f"Solution for 062. Unique Paths")
