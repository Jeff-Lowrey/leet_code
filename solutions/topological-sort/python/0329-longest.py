"""
# Difficulty: Medium

# 329. Longest Increasing Path in a Matrix

Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>matrix = [[9,9,4],[6,6,8],[2,1,1]]</dd>
<dt>Output:</dt>
<dd>4 (longest increasing path)</dd>
<dt>Explanation:</dt>
<dd>Longest increasing path in matrix is 4</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
**Data Structures**: Hash Map, Array, Tree
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build graph of dependencies. Start DFS from each cell. Use memoization to store longest path from each cell. Result is max of all starting points. DFS explores increasing values only.

### APPROACH:
1. **Initialize memoization**: Create memo = {} to cache results
2. **Define DFS function**: Implement dfs(i, j) to find longest path from cell (i,j)
3. **Check memo**: If (i,j) in memo, return memo[(i,j)]
4. **Explore neighbors**: For each of 4 directions, check if can move (increasing value)
5. **Recursive call**: If valid, max_path = max(max_path, 1 + dfs(ni, nj))
6. **Memoize result**: memo[(i,j)] = max_path
7. **Try all cells**: For each cell, call dfs and track maximum
8. **Return result**: Return global maximum path length

### WHY THIS WORKS:
- DFS with memoization: longest path from each cell
- Only move to adjacent cells with greater values (DAG ensures no cycles)
- Memo[i][j] caches longest path starting at (i,j)
- Try all 4 directions, take max + 1
- O(m*n) time: each cell computed once, O(m*n) space for memo

### EXAMPLE WALKTHROUGH:
Input:
```
matrix = [[9,9,4],[6,6,8],[2,1,1]]
```

Step 1: DFS with memoization

Steps:
Step 1: Start from 9: can go to 6 → 2 → 1, length=4
Step 2: Try all cells
Step 3: Best path: 9→6→2→1

Output:
```
4 (longest increasing path)
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

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def longestIncreasingPath(self, matrix: List[List[int]]) -> int:
        """
        Find the longest increasing path in a matrix where you can move in four directions
        (up, down, left, right).

        Args:
            matrix: 2D list of integers representing the matrix

        Returns:
            int: Length of the longest increasing path
        """
        if not matrix or not matrix[0]:
            return 0

        rows, cols = len(matrix), len(matrix[0])
        # Cache to store computed results for each cell
        memo: dict[Any, Any] = {}

        def dfs(row: int, col: int, prev_val: int) -> int:
            """
            Depth-first search helper function to explore paths.

            Args:
                row: Current row position
                col: Current column position
                prev_val: Value of the previous cell

            Returns:
                int: Length of the longest path starting from current position
            """
            # Check boundaries and if current value is less than previous
            if row < 0 or row >= rows or col < 0 or col >= cols or matrix[row][col] <= prev_val:
                return 0

            # If result is cached, return it
            if (row, col) in memo:
                return int(memo[(row, col)])

            current = matrix[row][col]

            # Explore all four directions
            up = dfs(row - 1, col, current)
            down = dfs(row + 1, col, current)
            left = dfs(row, col - 1, current)
            right = dfs(row, col + 1, current)

            # Store the maximum path length starting from current cell
            memo[(row, col)] = 1 + max(up, down, left, right)
            return int(memo[(row, col)])

        # Try starting from each cell and find the maximum path length
        max_path = 0
        for i in range(rows):
            for j in range(cols):
                max_path = max(max_path, dfs(i, j, float("-inf")))  # type: ignore

        return max_path


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: All same values
    result = solution.longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single row
    result = solution.longestIncreasingPath([[1, 2, 3, 4]])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty input
    result = solution.longestIncreasingPath([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single element
    result = solution.longestIncreasingPath([[5]])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 329. Longest")
