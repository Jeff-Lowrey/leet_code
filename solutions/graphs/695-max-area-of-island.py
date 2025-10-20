"""
# Difficulty: Medium

# 695. Max Area Of Island

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The area of an island is the number of cells with a value 1 in the island.

Return the maximum area of an island in grid. If there is no island, return 0.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[0,0,1,0,0,0,0,1,0,0,0,0,0]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Maximum island area is 6 square units</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(M × N)
**Space Complexity**: O(M × N)

### INTUITION:
This is similar to "Number of Islands" but instead of counting islands, we need to find the largest island by area. We use DFS/BFS to explore each island and calculate its area, keeping track of the maximum area found.

### APPROACH:
1. **Iterate through grid**: Check each cell
2. **Find land**: When we find a 1 (land), start exploring the island
3. **DFS/BFS exploration**: Count all connected land cells (area)
4. **Track maximum**: Keep track of the largest area found
5. **Mark visited**: Avoid double-counting cells

### WHY THIS WORKS:
- DFS/BFS explores connected components completely
- Each exploration returns the area of that island
- We track the maximum area across all islands
- In-place marking ensures each cell is counted exactly once

### EXAMPLE WALKTHROUGH:
```
Grid: [[0,0,1,0,0,0,0,1,0,0,0,0,0],
       [0,0,0,0,0,0,0,1,1,1,0,0,0],
       [0,1,1,0,1,0,0,0,0,0,0,0,0],
       [0,1,0,0,1,1,0,0,1,0,1,0,0]]

Islands found:
- (0,2): area = 1
- (0,7), (1,7), (1,8), (1,9): area = 4
- (2,1), (2,2), (3,1): area = 3
- (2,4), (3,4), (3,5): area = 3
- (3,8): area = 1
- (3,10): area = 1

Maximum area = 4
```

### TIME COMPLEXITY:
O(M × N)
We visit each cell at most once

### SPACE COMPLEXITY:
O(M × N)
For recursion stack in worst case

### EDGE CASES:
- **All water**: Return 0 (no islands)
- **Single cell island**: Return 1
- **Entire grid is one island**: Return m * n
- **Multiple islands**: Return area of largest
- **Empty grid**: Return 0

</details>
"""

from collections import deque
from typing import Any


class Solution:
    def maxAreaOfIsland(self, grid: list[list[int]]) -> int:
        """
        Find maximum island area using DFS.

        Args:
            grid: 2D binary grid where 1 = land, 0 = water

        Returns:
            Maximum area of any island

        Time Complexity: O(M × N)
        Space Complexity: O(M × N) for recursion stack
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        max_area = 0

        def dfs(r: Any, c: Any) -> Any:
            """DFS to calculate area of island starting at (r,c)."""
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
                return 0

            grid[r][c] = 0  # Mark as visited

            # Count current cell + all connected cells
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    area = dfs(r, c)
                    max_area = max(max_area, area)

        return max_area

    def maxAreaOfIslandBFS(self, grid: list[list[int]]) -> int:
        """BFS approach to avoid recursion stack issues."""
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        max_area = 0
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    area = 0
                    queue = deque([(r, c)])
                    grid[r][c] = 0

                    while queue:
                        curr_r, curr_c = queue.popleft()
                        area += 1

                        for dr, dc in directions:
                            nr, nc = curr_r + dr, curr_c + dc
                            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                                grid[nr][nc] = 0
                                queue.append((nr, nc))

                    max_area = max(max_area, area)

        return max_area


def test_solution() -> None:
    """Test cases for Problem 695."""
    solution = Solution()

    # Test case 1: Example grid
    grid1 = [
        [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    ]
    result1 = solution.maxAreaOfIslandBFS([row[:] for row in grid1])
    expected1 = 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: No islands
    grid2 = [[0, 0, 0, 0, 0, 0, 0, 0]]
    result2 = solution.maxAreaOfIslandBFS([row[:] for row in grid2])
    expected2 = 0
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single cell
    grid3 = [[1]]
    result3 = solution.maxAreaOfIslandBFS([row[:] for row in grid3])
    expected3 = 1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Multiple islands
    grid4 = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]]
    result4 = solution.maxAreaOfIslandBFS([row[:] for row in grid4])
    expected4 = 4
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Quick example
    solution = Solution()
    grid = [[1, 1, 0], [0, 1, 0], [0, 0, 1]]
    print(f"Grid: {grid}")
    # Use BFS to preserve original grid
    print(f"Max area: {solution.maxAreaOfIslandBFS([row[:] for row in grid])}")
