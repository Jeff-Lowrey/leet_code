"""
# Difficulty: Medium

# 0062. Unique Paths

There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>m = 3, n = 2 (3 rows, 2 columns)</dd>
<dt>Output:</dt>
<dd>3 (number of unique paths)</dd>
<dt>Explanation:</dt>
<dd>Number of paths in 3×7 grid is 28</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
**Data Structures**: Hash Set, Array, Tree
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Paths to cell (i,j) = paths to (i-1,j) + paths to (i,j-1). Build bottom-up from top-left. Base case: first row and column each have only 1 path.

### APPROACH:
1. **Initialize DP table**: Create 2D array dp[m][n] where dp[i][j] = number of paths to cell (i,j)
2. **Set base cases**: Fill first row and first column with 1 (only one way to reach each)
3. **Apply recurrence relation**: For each cell dp[i][j] = dp[i-1][j] + dp[i][j-1]
4. **Build bottom-up**: Iterate through rows and columns, computing paths from top-left
5. **Sum incoming paths**: Each cell's count equals sum of paths from cell above and cell to left
6. **Continue to bottom-right**: Fill entire table until reaching dp[m-1][n-1]
7. **Return result**: Return dp[m-1][n-1] as total unique paths to bottom-right corner

### WHY THIS WORKS:
- DP: paths to (i,j) = paths to (i-1,j) + paths to (i,j-1)
- Base case: dp[0][j] = dp[i][0] = 1 (only one path along edges)
- Space optimization: only need previous row, not entire 2D array
- Combinatorics alternative: C(m+n-2, m-1) paths total
- O(m*n) time, O(n) space with optimized 1D DP

### EXAMPLE WALKTHROUGH:
Input:
```
m = 3, n = 2 (3 rows, 2 columns)
```

Step 1: Create DP table
dp[i][j] = number of paths to reach cell (i,j)
dp = [[1, 1],
[1, 2],
[1, 3]]
Step 2: Fill table using dp[i][j] = dp[i-1][j] + dp[i][j-1]
dp[0][0] = 1 (starting point)
dp[0][1] = 1 (can only go right)
dp[1][0] = 1 (can only go down)
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2
dp[2][0] = 1
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3

Output:
```
3 (number of unique paths)
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
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]

        # Return the bottom-right cell value
        return dp[m - 1][n - 1]

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
                dp[j] += dp[j - 1]

        return dp[n - 1]


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem (3 rows, 2 columns)
    result = solution.uniquePaths(3, 2)
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: 1x1 grid
    result = solution.uniquePaths(1, 1)
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 062. Unique Paths")
