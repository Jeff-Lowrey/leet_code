I'll help you implement the Number of Islands solution using Union-Find approach in Python. Here's the complete implementation:

```python
from typing import List

class UnionFind:
    """
    UnionFind (Disjoint Set) data structure implementation
    for solving the Number of Islands problem
    """
    def __init__(self, grid: List[List[str]]):
        self.rows = len(grid)
        self.cols = len(grid[0]) if self.rows else 0
        # Initialize parent array with unique IDs for each cell
        self.parent = [-1] * (self.rows * self.cols)
        self.rank = [0] * (self.rows * self.cols)
        self.count = 0  # Count of distinct islands
        
        # Initialize UnionFind structure based on grid
        for i in range(self.rows):
            for j in range(self.cols):
                if grid[i][j] == "1":
                    self.parent[i * self.cols + j] = i * self.cols + j
                    self.count += 1

    def find(self, x: int) -> int:
        """Find the parent of element x with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> None:
        """Union two elements x and y by rank"""
        px, py = self.find(x), self.find(y)
        if px != py:
            if self.rank[px] < self.rank[py]:
                px, py = py, px
            self.parent[py] = px
            if self.rank[px] == self.rank[py]:
                self.rank[px] += 1
            self.count -= 1


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        """
        Calculate the number of islands in the grid using Union-Find approach
        
        Args:
            grid: 2D grid where "1" represents land and "0" represents water
            
        Returns:
            int: Number of distinct islands
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        uf = UnionFind(grid)
        
        # Directions for adjacent cells (right and down only, as we scan left-to-right, top-to-bottom)
        directions = [(0, 1), (1, 0)]
        
        # Iterate through each cell in the grid
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == "1":
                    # Check adjacent cells (right and down)
                    for di, dj in directions:
                        ni, nj = i + di, j + dj
                        # If adjacent cell is valid and is land, union the cells
                        if (0 <= ni < rows and 
                            0 <= nj < cols and 
                            grid[ni][nj] == "1"):
                            uf.union(i * cols + j, ni * cols + nj)
        
        return uf.count


def test_solution():
    """Test cases for the numIslands implementation"""
    solution = Solution()
    
    # Test case 1
    grid1 = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ]
    assert solution.numIslands(grid1) == 1
    
    # Test case 2
    grid2 = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ]
    assert solution.numIslands(grid2) == 3
    
    # Test case 3 - empty grid
    grid3 = []
    assert solution.numIslands(grid3) == 0
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
```

This implementation provides a solution to the Number of Islands problem using the Union-Find (Disjoint Set) data structure. Here's a breakdown of the key components:

1. `UnionFind` class:
   - Implements the Union-Find data structure with path compression and union by rank
   - Maintains count of distinct islands
   - Provides methods for finding parents and unioning elements

2. `Solution` class:
   - Contains the main `numIslands` method that solves the problem
   - Uses UnionFind to track connected land cells
   - Scans the grid and unions adjacent land cells

3. Test cases:
   - Includes multiple test cases to verify the implementation
   - Covers different scenarios including normal cases and edge cases

The solution efficiently handles the following requirements:
- Clean, well-structured code with proper comments
- Appropriate type hints and imports
- Edge case handling (empty grid, single row/column)
- Follows Python conventions and best practices
- Complete, runnable implementation with test cases

The time complexity is O(m*n) where m and n are the dimensions of the grid, and the space complexity is O(m*n) for the UnionFind data structure.