"""
# Difficulty: Medium

# 0305. Number of Islands II

You are given an empty 2D binary grid grid of size m x n. The grid represents a map where 0's represent water and 1's represent land. Initially, all the cells of grid are water cells (i.e., all the cells are 0's).

We may perform an add land operation which turns the water at position into a land. You are given an array positions where positions[i] = [ri, ci] is the position (ri, ci) at which we should operate the ith operation.

Return an array of integers answer where answer[i] is the number of islands after turning the cell (ri, ci) into a land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[0, 0]</dd>
<dt>Output:</dt>
<dd>"Test 1 Result: {result1}"</dd>
<dt>Explanation:</dt>
<dd>Number of islands after adding positions: [1,1,2,3]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Divide and Conquer
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Maintain Union-Find of islands. For each land operation, union with adjacent land cells (4 directions). Track number of connected components. Component count after each operation is island count.

### APPROACH:
1. **Initialize Union-Find**: Create parent and rank arrays
2. **Initialize count**: Set count = 0 for number of islands
3. **Process positions**: For each position in positions list
4. **Add island**: Mark position as land, increment count
5. **Check neighbors**: Check all 4 adjacent cells
6. **Union with land neighbors**: If neighbor is land and different component, union and decrement count
7. **Record count**: Append current count to result
8. **Return result**: Return result list with island counts

### WHY THIS WORKS:
- Union-find tracks connected components as islands form
- Initially count = 0, increment for each land cell added
- When land connects to existing islands, union them (decrement count by merges-1)
- Path compression + union by rank ensures near O(1) amortized operations
- O(m*n*α(m*n)) time: α is inverse Ackermann (effectively constant)

### EXAMPLE WALKTHROUGH:
Input:
```
m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
```

Step 1: Add islands one by one
[0,0]: 1 island

Steps:
Step 1: [0,1]: merge with [0,0] → 1 island
Step 2: [1,2]: 2 islands
Step 3: [2,1]: 3 islands

Output:
```
[1,1,2,3]
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple


class UnionFind:
    """Union-Find data structure for tracking islands."""

    def __init__(self) -> None:
        self.parent: dict[Any, Any] = {}
        self.count = 0

    def add(self, x: Any) -> None:
        """Add a new element if not already present."""
        if x not in self.parent:
            self.parent[x] = x
            self.count += 1

    def find(self, x: Any) -> Any:
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: Any, y: Any) -> None:
        """Union two sets."""
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y
            self.count -= 1


class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        """
        Solve Number Islands II problem using Union-Find approach

        Args:
            m: Number of rows in the grid
            n: Number of columns in the grid
            positions: List of positions where land will be added

        Returns:
            List of number of islands after each land addition
        """

        def get_key(row: Any, col: Any) -> Any:
            """Convert 2D coordinates to unique key"""
            return row * n + col

        # Initialize Union-Find structure
        uf = UnionFind()
        result: list[Any] = []
        land_cells: set[Any] = set()

        # Directions for checking adjacent cells
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        for row, col in positions:
            # Skip if position is already land
            key = get_key(row, col)
            if key in land_cells:
                result.append(uf.count)
                continue

            # Add new land
            land_cells.add(key)
            uf.add(key)

            # Check all adjacent cells
            for dx, dy in directions:
                new_row, new_col = row + dx, col + dy
                adj_key = get_key(new_row, new_col)

                # If adjacent cell is valid and is land, union the sets
                if 0 <= new_row < m and 0 <= new_col < n and adj_key in land_cells:
                    uf.union(key, adj_key)

            result.append(uf.count)

        return result


# Example usage and test cases
def test_solution() -> None:
    """Test cases for the solution."""
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.numIslands2(3, 3, [[0, 0], [0, 1], [1, 2], [2, 1]])
    expected = [1, 1, 2, 3]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Single island
    result = solution.numIslands2(1, 1, [[0, 0]])
    expected = [1]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Merging islands
    result = solution.numIslands2(3, 3, [[0, 0], [0, 1], [1, 1], [2, 2]])
    expected = [1, 1, 1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Duplicate positions
    result = solution.numIslands2(2, 2, [[0, 0], [0, 0], [1, 1]])
    expected = [1, 1, 2]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("Solution for 305. Number")
