"""
# Difficulty: Medium

# 0694. Number Of Distinct Islands

You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.

Return the number of distinct islands.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>There is 1 distinct island shape (both islands have the same 2x2 rectangular shape)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(M × N)
**Space Complexity**: O(M × N)

### INTUITION:
The key insight is that this problem extends "Number of Islands" by requiring us to identify distinct island shapes. Two islands are the same if one can be translated to match the other (same relative positions). We need to normalize each island's shape to a canonical form for comparison.

### APPROACH:
1. **Find each island**: Use DFS/BFS to explore islands
2. **Record relative positions**: For each island, record all cell positions relative to starting point
3. **Normalize shape**: Convert to canonical form (e.g., relative to top-left corner)
4. **Use set for uniqueness**: Store normalized shapes in set to count distinct shapes

### WHY THIS WORKS:
- Relative positioning captures island shape independent of location
- Normalization ensures identical shapes have identical representations
- Set automatically handles duplicates
- Translation invariance achieved by using relative coordinates

### EXAMPLE WALKTHROUGH:
Input:
```
Grid: [[1,1,0,0,0],
```

[1,1,0,0,0],
[0,0,0,1,1],
[0,0,0,1,1]]
Island 1: cells (0,0), (0,1), (1,0), (1,1)
Relative to (0,0): (0,0), (0,1), (1,0), (1,1)
Normalized: [(0,0), (0,1), (1,0), (1,1)]
Island 2: cells (2,3), (2,4), (3,3), (3,4)
Relative to (2,3): (0,0), (0,1), (1,0), (1,1)
Normalized: [(0,0), (0,1), (1,0), (1,1)]

Steps:
Step 1: Same normalized form → 1 distinct island

Output:
```
1 distinct island
```

### TIME COMPLEXITY:
O(M × N)
We visit each cell once during DFS/BFS

### SPACE COMPLEXITY:
O(M × N)
For storing island shapes and recursion stack

### EDGE CASES:
- **All water**: Return 0 (no islands)
- **All same shaped islands**: Return 1 (one distinct shape)
- **Every island unique**: Return number of islands
- **Rotations considered same**: Normalize shape representation
- **Single island**: Return 1

</details>
"""

from typing import Any


class Solution:
    def numDistinctIslands(self, grid: list[list[int]]) -> int:
        """
        Count distinct islands using coordinate normalization.

        Args:
            grid: 2D binary grid

        Returns:
            Number of distinct island shapes

        Time Complexity: O(M × N)
        Space Complexity: O(M × N)
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        distinct_islands: set[Any] = set()

        def dfs(r: Any, c: Any, island_cells: Any) -> Any:
            """DFS to collect all cells of current island."""
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
                return

            grid[r][c] = 0  # Mark visited
            island_cells.append((r, c))

            # Explore 4 directions
            dfs(r + 1, c, island_cells)
            dfs(r - 1, c, island_cells)
            dfs(r, c + 1, island_cells)
            dfs(r, c - 1, island_cells)

        def normalize_island(cells: Any) -> Any:
            """Normalize island shape by making coordinates relative to top-left corner."""
            if not cells:
                return tuple()

            # Find top-left corner (minimum row, then minimum col)
            min_r = min(r for r, c in cells)
            min_c = min(c for r, c in cells if r == min_r)

            # Make all coordinates relative to top-left
            normalized: list[Any] = []
            for r, c in cells:
                normalized.append((r - min_r, c - min_c))

            # Sort for consistent representation
            normalized.sort()
            return tuple(normalized)

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    island_cells: list[Any] = []
                    dfs(r, c, island_cells)

                    if island_cells:
                        normalized_shape = normalize_island(island_cells)
                        distinct_islands.add(normalized_shape)

        return len(distinct_islands)

    def numDistinctIslandsPath(self, grid: list[list[int]]) -> int:
        """
        Alternative approach using DFS path encoding.

        Args:
            grid: 2D binary grid

        Returns:
            Number of distinct islands

        Time Complexity: O(M × N)
        Space Complexity: O(M × N)
        """
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        distinct_islands = set()

        def dfs(r: Any, c: Any, direction: Any) -> Any:
            """DFS that encodes path as string."""
            if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == 0:
                return ""

            grid[r][c] = 0  # Mark visited

            # Encode current step and recursive calls
            path = direction
            path += dfs(r + 1, c, "D")  # Down
            path += dfs(r - 1, c, "U")  # Up
            path += dfs(r, c + 1, "R")  # Right
            path += dfs(r, c - 1, "L")  # Left
            path += "B"  # Backtrack marker

            return path

        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == 1:
                    island_path = dfs(r, c, "S")  # Start
                    if island_path:
                        distinct_islands.add(island_path)

        return len(distinct_islands)


def test_solution() -> None:
    """Test cases for Problem 694."""
    solution = Solution()

    # Test case 1: Same shape islands
    grid1 = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]]
    result1 = solution.numDistinctIslandsPath([row[:] for row in grid1])
    expected1 = 1
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Different shape islands
    grid2 = [[1, 1, 0, 1, 1], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1]]
    result2 = solution.numDistinctIslandsPath([row[:] for row in grid2])
    expected2 = 3
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: No islands
    grid3 = [[0, 0, 0], [0, 0, 0]]
    result3 = solution.numDistinctIslands([row[:] for row in grid3])
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Quick example
    solution = Solution()
    grid = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]]
    print(f"Grid has {solution.numDistinctIslands([row[:] for row in grid])} distinct island shapes")
