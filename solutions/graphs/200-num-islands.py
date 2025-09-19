"""
200. Number of Islands
Medium

Given an m x n 2D binary grid grid which represents a map of '1's (land) and
'0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands
horizontally or vertically. You may assume all four edges of the grid are all
surrounded by water.

Example:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Think of this as finding connected components in a graph. Each '1' is a node,
and adjacent '1's are connected. We need to count how many separate groups
of connected '1's exist.

### APPROACH (DFS):
1. Iterate through every cell in the grid
2. When we find a '1' (unvisited land):
   - Increment island counter
   - Start DFS to mark all connected land as visited
3. DFS explores all 4 directions and marks visited cells as '0'
4. This ensures each island is counted exactly once

### WHY DFS WORKS:
- DFS exhaustively explores all connected land from a starting point
- By marking visited cells as '0', we prevent recounting
- Each DFS call represents one complete island

### VISUALIZATION:
```
Original:    After finding first '1':    After DFS:
["1","1","0"]    ["1","1","0"]           ["0","0","0"]
["1","0","1"]    ["1","0","1"]           ["0","0","1"]
                  ^start here             islands=1
```

### ALTERNATIVE APPROACHES:
- **BFS**: Use queue instead of recursion stack
- **Union-Find**: Connect adjacent lands and count components
- All have similar time complexity but different space usage patterns

</details>
"""

from collections import deque


class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        """
        Approach: DFS (Depth-First Search)
        Time Complexity: O(m * n)
        Space Complexity: O(m * n) worst case for recursion stack
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0

        def dfs(r, c):
            # Check bounds and if it's water or visited
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
                return

            # Mark as visited by changing to '0'
            grid[r][c] = '0'

            # Explore all 4 directions
            dfs(r + 1, c)  # down
            dfs(r - 1, c)  # up
            dfs(r, c + 1)  # right
            dfs(r, c - 1)  # left

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    islands += 1
                    dfs(r, c)

        return islands

    def numIslandsBFS(self, grid: list[list[str]]) -> int:
        """
        Approach: BFS (Breadth-First Search)
        Time Complexity: O(m * n)
        Space Complexity: O(min(m, n)) for queue
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0

        def bfs(r, c):
            queue = deque([(r, c)])
            grid[r][c] = '0'  # Mark as visited

            while queue:
                row, col = queue.popleft()

                # Check all 4 directions
                for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                    nr, nc = row + dr, col + dc

                    if (0 <= nr < rows and 0 <= nc < cols and
                            grid[nr][nc] == '1'):
                        grid[nr][nc] = '0'
                        queue.append((nr, nc))

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    islands += 1
                    bfs(r, c)

        return islands

    def numIslandsUnionFind(self, grid: list[list[str]]) -> int:
        """
        Approach: Union Find
        Time Complexity: O(m * n * α(m*n)) where α is inverse Ackermann
        Space Complexity: O(m * n)
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])

        class UnionFind:
            def __init__(self, n):
                self.parent = list(range(n))
                self.rank = [0] * n
                self.count = 0

            def find(self, x):
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]

            def union(self, x, y):
                px, py = self.find(x), self.find(y)
                if px == py:
                    return

                if self.rank[px] < self.rank[py]:
                    self.parent[px] = py
                elif self.rank[px] > self.rank[py]:
                    self.parent[py] = px
                else:
                    self.parent[py] = px
                    self.rank[px] += 1

                self.count -= 1

        # Count initial islands
        uf = UnionFind(rows * cols)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    uf.count += 1

        # Union adjacent lands
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    # Check right and down neighbors
                    if c + 1 < cols and grid[r][c + 1] == '1':
                        uf.union(r * cols + c, r * cols + c + 1)
                    if r + 1 < rows and grid[r + 1][c] == '1':
                        uf.union(r * cols + c, (r + 1) * cols + c)

        return uf.count


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    grid1 = [
        ["1", "1", "1", "1", "0"],
        ["1", "1", "0", "1", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "0", "0", "0"]
    ]
    # Create a copy since DFS modifies the grid
    import copy
    grid1_copy = copy.deepcopy(grid1)

    print("Input grid:")
    for row in grid1:
        print(row)
    print(f"Output: {solution.numIslands(grid1_copy)}")  # 1

    # Test case 2
    grid2 = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"]
    ]
    grid2_copy = copy.deepcopy(grid2)

    print("\nInput grid:")
    for row in grid2:
        print(row)
    print(f"Output: {solution.numIslands(grid2_copy)}")  # 3
