"""
# Difficulty: Medium

# 417. Pacific Atlantic Water Flow

There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[0,4]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>Cells where water can flow to both oceans: [[0,4],[1,3],[1,4],[2,2]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
Use DFS/BFS from all Pacific border cells and separately from all Atlantic border cells. Cells reachable from both oceans are in the answer. Water flows from high to low or equal.

### APPROACH:
1. **Initialize result sets**: Create pacific_reachable and atlantic_reachable sets
2. **DFS from pacific edges**: Run DFS from top row and left column, mark pacific-reachable cells
3. **DFS from atlantic edges**: Run DFS from bottom row and right column, mark atlantic-reachable cells
4. **Define DFS function**: Implement dfs(row, col, reachable, prev_height) that explores increasing heights
5. **Check boundaries**: In DFS, verify cell is in bounds and height >= prev_height
6. **Mark reachable**: Add current cell to reachable set, recurse on 4 neighbors
7. **Find intersection**: Compute pacific_reachable & atlantic_reachable
8. **Return result**: Return list of cells reachable from both oceans

### WHY THIS WORKS:
- DFS from ocean borders inward (reverse flow direction)
- Water flows to ocean if can reach cells that flow to ocean
- Find cells reachable from pacific border and atlantic border separately
- Intersection of both sets is answer
- O(m*n) time: DFS from borders visits each cell at most twice, O(m*n) space

### EXAMPLE WALKTHROUGH:
```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Step 1: DFS from Pacific border (top, left)
  pacific = {(0,0),(0,1),...,(4,0)}

Step 2: DFS from Atlantic border (bottom, right)
  atlantic = {(4,4),(4,3),...,(0,4)}

Step 3: Find intersection
  Both oceans reachable from:
  (0,4): height=5 → can flow both ways
  (1,3): height=4 → can flow both ways
  (1,4): height=4 → can flow both ways
  (2,2): height=5 → can flow both ways
  (3,0): height=6 → can flow both ways
  (3,1): height=7 → can flow both ways
  (4,0): height=5 → can flow both ways

Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
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
from collections import deque


class Solution:
    """
    Solution for the Pacific Atlantic Water Flow problem.

    Problem: Given an m x n matrix of heights, determine which cells can flow to both
    the Pacific and Atlantic oceans. Water can only flow from a cell to adjacent cells
    with equal or lower height.

    Pacific Ocean touches the left and top edges.
    Atlantic Ocean touches the right and bottom edges.
    """

    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:
        if not heights or not heights[0]:
            return []

        m, n = len(heights), len(heights[0])

        # Initialize sets to track cells that can reach each ocean
        pacific: set[Any] = set()
        atlantic: set[Any] = set()

        def dfs(row: int, col: int, visited: set, prev_height: int) -> None:
            """
            Depth-first search to find cells that can reach each ocean.

            Args:
                row: Current row position
                col: Current column position
                visited: Set of visited coordinates
                prev_height: Height of the previous cell
            """
            # Check if current position is out of bounds or already visited
            if row < 0 or col < 0 or row >= m or col >= n or (row, col) in visited or heights[row][col] < prev_height:
                return

            # Add current position to visited set
            visited.add((row, col))

            # Explore all four directions (up, down, left, right)
            directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            for dx, dy in directions:
                dfs(row + dx, col + dy, visited, heights[row][col])

        # Process cells adjacent to Pacific Ocean (top and left edges)
        for i in range(m):
            dfs(i, 0, pacific, heights[i][0])
        for j in range(n):
            dfs(0, j, pacific, heights[0][j])

        # Process cells adjacent to Atlantic Ocean (bottom and right edges)
        for i in range(m):
            dfs(i, n - 1, atlantic, heights[i][n - 1])
        for j in range(n):
            dfs(m - 1, j, atlantic, heights[m - 1][j])

        # Find intersection of cells that can reach both oceans
        return list(pacific & atlantic)

    def pacificAtlanticBFS(self, heights: List[List[int]]) -> List[List[int]]:
        """
        Alternative implementation using BFS approach.
        """
        if not heights or not heights[0]:
            return []

        m, n = len(heights), len(heights[0])

        def bfs(starts: List[tuple]) -> set:
            """
            Breadth-first search helper function.

            Args:
                starts: List of starting coordinates
            Returns:
                Set of coordinates that can reach the ocean
            """
            queue = deque(starts)
            visited = set(starts)

            while queue:
                row, col = queue.popleft()

                # Check all four adjacent cells
                for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                    new_row, new_col = row + dx, col + dy

                    if (
                        0 <= new_row < m
                        and 0 <= new_col < n
                        and (new_row, new_col) not in visited
                        and heights[new_row][new_col] >= heights[row][col]
                    ):
                        queue.append((new_row, new_col))
                        visited.add((new_row, new_col))

            return visited

        # Initialize starting points for both oceans
        pacific_starts = [(0, j) for j in range(n)] + [(i, 0) for i in range(1, m)]
        atlantic_starts = [(m - 1, j) for j in range(n)] + [(i, n - 1) for i in range(m - 1)]

        # Find cells that can reach each ocean
        pacific = bfs(pacific_starts)
        atlantic = bfs(atlantic_starts)

        # Return intersection of both sets
        return list(pacific & atlantic)


# Example usage and testing
def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.pacificAtlantic(
        [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
    )
    expected = [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]
    # Sort both for comparison since order doesn't matter
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 2: Single row
    result = solution.pacificAtlantic([[1, 2, 3]])
    expected = [[0, 0], [0, 1], [0, 2]]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    # Test case 3: Single cell
    result = solution.pacificAtlantic([[1]])
    expected = [[0, 0]]
    assert sorted(result) == sorted(expected), f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 417. Pacific Atlantic Water Flow")
