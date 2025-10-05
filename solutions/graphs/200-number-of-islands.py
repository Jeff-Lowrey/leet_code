I'll help you create a solution for the Number of Islands problem. I'll write a complete Python implementation that meets all the requirements.

```python
#!/usr/bin/env python3
"""
Number of Islands - Python Implementation

This module provides a solution to the Number of Islands problem where we need to
count the number of islands in a 2D grid. An island is surrounded by water and is
formed by connecting adjacent lands horizontally or vertically.

Example:
Input: grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
]
Output: 3
"""

from typing import List


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        """
        Calculate the number of islands in the given grid.
        
        Args:
            grid: 2D grid where '1' represents land and '0' represents water
            
        Returns:
            int: Number of islands in the grid
        """
        if not grid:
            return 0
        
        rows = len(grid)
        cols = len(grid[0])
        islands = 0
        
        def dfs(row: int, col: int) -> None:
            """
            Depth-first search to mark all connected land cells as visited.
            
            Args:
                row: Current row index
                col: Current column index
            """
            # Check boundary conditions and if current cell is land
            if (row < 0 or row >= rows or 
                col < 0 or col >= cols or 
                grid[row][col] != "1"):
                return
            
            # Mark current cell as visited by changing it to '0'
            grid[row][col] = "0"
            
            # Recursively check all adjacent cells
            dfs(row + 1, col)  # Down
            dfs(row - 1, col)  # Up
            dfs(row, col + 1)  # Right
            dfs(row, col - 1)  # Left
        
        # Iterate through each cell in the grid
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == "1":
                    islands += 1
                    dfs(i, j)  # Mark all connected land cells
        
        return islands


def test_solution():
    """
    Test cases for the Number of Islands solution.
    """
    solution = Solution()
    
    # Test case 1
    grid1 = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"]
    ]
    assert solution.numIslands(grid1) == 3, "Test case 1 failed"
    
    # Test case 2
    grid2 = [
        ["1", "1", "1"],
        ["0", "1", "0"],
        ["1", "1", "1"]
    ]
    assert solution.numIslands(grid2) == 1, "Test case 2 failed"
    
    # Test case 3 - Empty grid
    grid3 = []
    assert solution.numIslands(grid3) == 0, "Test case 3 failed"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
```

This implementation includes:

1. A complete solution to the Number of Islands problem using depth-first search (DFS)
2. Proper type hints and documentation
3. Clear comments explaining the implementation
4. Test cases to verify the solution
5. Proper error handling and edge cases
6. Following Python best practices and PEP 8 conventions

The solution uses a DFS approach to mark all connected land cells as visited when an island is found. The main algorithm:
1. Iterates through each cell in the grid
2. When it finds a land cell ('1'), it:
   - Increments the island count
   - Uses DFS to mark all connected land cells as visited
3. Returns the total number of islands found

The code includes test cases to verify the implementation works correctly for various scenarios, including edge cases like empty grids.