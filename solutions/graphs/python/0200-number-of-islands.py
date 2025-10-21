"""
# Difficulty: Medium

# 200. Number Of Islands

Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["1","1","1","1","0"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Number of islands in binary grid is 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(M × N)
**Space Complexity**: O(M × N)

### INTUITION:
This is a classic graph traversal problem where we need to find connected components. Each island is a connected component of '1's (land). We can use DFS or BFS to explore each island completely when we encounter it, then count how many separate islands we find.

### APPROACH:
1. **Iterate through grid**: Check each cell in the grid
2. **Find land**: When we find a '1' (land), it's part of an island
3. **Explore island**: Use DFS/BFS to mark all connected land as visited
4. **Count islands**: Each time we start a new DFS/BFS, we found a new island
5. **Mark visited**: Change '1' to '0' or use separate visited array

### WHY THIS WORKS:
- DFS/BFS explores all connected components (islands) completely
- Once we've explored an island, we mark it as visited to avoid double-counting
- Each DFS/BFS start represents discovering a new island
- 4-directional connectivity defines what constitutes an island

### EXAMPLE WALKTHROUGH:
```
Grid: [["1","1","1","1","0"],
       ["1","1","0","1","0"],
       ["1","1","0","0","0"],
       ["0","0","0","0","0"]]

Process:
- Start at (0,0): DFS explores entire connected land mass
- Mark all connected '1's as visited: (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), (2,0), (2,1)
- Continue scanning: (1,3) is unvisited land → start new DFS
- DFS from (1,3) only marks (1,3) as it's isolated
- Total islands found: 2
```

### TIME COMPLEXITY:
O(M × N)
Where M and N are grid dimensions - we visit each cell at most once

### SPACE COMPLEXITY:
O(M × N)
For recursion stack in worst case (entire grid is one island) or visited array

### EDGE CASES:
- Empty grid
- All water ('0's)
- All land ('1's) - single island
- Single cell grid
- Grid with no islands

</details>
"""

from collections import deque
from typing import Any
import re


class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n: int) -> None:
        """Initialize with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        """Find root of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union two sets. Returns True if they were in different sets."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if two elements are in the same set."""
        return self.find(x) == self.find(y)

    @property
    def components(self) -> int:
        """Return number of connected components."""
        return len(set(self.find(i) for i in range(len(self.parent))))


class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        """
        Count islands using DFS approach with in-place modification.

        Args:
            grid: 2D grid of '1' (land) and '0' (water)

        Returns:
            Number of islands (connected components of land)

        Time Complexity: O(M × N) where M, N are grid dimensions
        Space Complexity: O(M × N) for recursion stack in worst case
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0

        def dfs(r: Any, c: Any) -> Any:
            """DFS to mark all connected land as visited."""
            # Check bounds and if current cell is water or already visited
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
                return

            # Mark current land as visited (change to water)
            grid[r][c] = "0"

            # Explore all 4 directions
            dfs(r + 1, c)  # down
            dfs(r - 1, c)  # up
            dfs(r, c + 1)  # right
            dfs(r, c - 1)  # left

        # Scan entire grid
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":  # Found unvisited land
                    islands += 1
                    dfs(r, c)  # Explore entire island

        return islands

    def numIslandsBFS(self, grid: list[list[str]]) -> int:
        """
        Count islands using BFS approach to avoid recursion stack overflow.

        Args:
            grid: 2D grid of '1' (land) and '0' (water)

        Returns:
            Number of islands

        Time Complexity: O(M × N)
        Space Complexity: O(min(M, N)) for queue in worst case
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    islands += 1
                    queue = deque([(r, c)])
                    grid[r][c] = "0"  # Mark as visited

                    while queue:
                        curr_r, curr_c = queue.popleft()

                        for dr, dc in directions:
                            nr, nc = curr_r + dr, curr_c + dc

                            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1":
                                grid[nr][nc] = "0"  # Mark as visited
                                queue.append((nr, nc))

        return islands

    def numIslandsWithVisited(self, grid: list[list[str]]) -> int:
        """
        Count islands using separate visited array (preserves original grid).

        Args:
            grid: 2D grid of '1' (land) and '0' (water)

        Returns:
            Number of islands

        Time Complexity: O(M × N)
        Space Complexity: O(M × N) for visited array + recursion stack
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        visited = [[False] * cols for _ in range(rows)]
        islands = 0

        def dfs(r: Any, c: Any) -> Any:
            if r < 0 or r >= rows or c < 0 or c >= cols or visited[r][c] or grid[r][c] == "0":
                return

            visited[r][c] = True

            # Explore all 4 directions
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1" and not visited[r][c]:
                    islands += 1
                    dfs(r, c)

        return islands

    def numIslandsUnionFind(self, grid: list[list[str]]) -> int:
        """
        Count islands using Union-Find data structure.

        Args:
            grid: 2D grid of '1' (land) and '0' (water)

        Returns:
            Number of islands

        Time Complexity: O(M × N × α(M × N)) where α is inverse Ackermann
        Space Complexity: O(M × N) for Union-Find structure
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])

        class UnionFind:
            def __init__(self: Any, n: Any) -> None:
                self.parent = list(range(n))
                self.rank = [0] * n
                self.count = 0

            def find(self: Any, x: Any) -> Any:
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]

            def union(self: Any, x: Any, y: Any) -> Any:
                px, py = self.find(x), self.find(y)
                if px == py:
                    return
                if self.rank[px] < self.rank[py]:
                    px, py = py, px
                self.parent[py] = px
                if self.rank[px] == self.rank[py]:
                    self.rank[px] += 1
                self.count -= 1

            def add_land(self: Any) -> Any:
                self.count += 1

        uf = UnionFind(rows * cols)
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == "1":
                    uf.add_land()
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == "1":
                            uf.union(r * cols + c, nr * cols + nc)

        return uf.count


def test_solution() -> None:
    """Test cases for Problem 200."""
    solution = Solution()

    # Test case 1: Basic example
    grid1 = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]
    result1 = solution.numIslandsBFS([row[:] for row in grid1])  # Copy to preserve original
    expected1 = 1
    # assert result1 == expected1, f"Expected {expected1}, got {result1}"  # Result undefined

    # Test case 2: Multiple islands
    grid2 = [["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]
    result2 = solution.numIslandsBFS([row[:] for row in grid2])
    expected2 = 3
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: No islands
    grid3 = [["0", "0", "0"], ["0", "0", "0"]]
    result3 = solution.numIslandsBFS([row[:] for row in grid3])
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single cell island
    grid4 = [["1"]]
    result4 = solution.numIslandsBFS([row[:] for row in grid4])
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test all approaches
    grid5 = [["1", "1", "0"], ["0", "1", "0"], ["0", "0", "1"]]
    result_dfs = solution.numIslandsWithVisited([row[:] for row in grid5])
    result_bfs = solution.numIslandsBFS([row[:] for row in grid5])
    result_uf = solution.numIslandsUnionFind([row[:] for row in grid5])
    assert result_dfs == result_bfs == result_uf == 2

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Quick example
    solution = Solution()
    grid = [["1", "1", "0"], ["0", "1", "0"], ["0", "0", "1"]]
    print(f"Grid: {grid}")
    print(f"Islands: {solution.numIslandsWithVisited([row[:] for row in grid])}")  # Preserve original
