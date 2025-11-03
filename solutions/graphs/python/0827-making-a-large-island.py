"""
### INTUITION:
This problem extends island finding by allowing us to change one 0 to 1 to maximize island size. The key insight is to first identify all existing islands, then for each 0, calculate what the new island size would be if we changed it to 1.

### APPROACH:
1. **Label islands**: Give each island a unique ID and calculate its size
2. **For each water cell**: Calculate potential island size if flipped to land
3. **Consider merging**: A flipped cell can connect multiple existing islands
4. **Track maximum**: Keep track of the largest possible island size

### WHY THIS WORKS:
- This ensures that pre-labeling islands allows O(1) lookup of island sizes
- This ensures that for each 0, we check its 4 neighbors to see which islands it would connect
- This ensures that sum of connected island sizes + 1 (the flipped cell) gives new island size
- This ensures that handle edge case where grid is already all 1's

### EXAMPLE WALKTHROUGH:
Input:
```
Grid: [[1,0],[0,1]]
```

Step 1 - Label islands:
Island 2: [(0,0)] size=1
Island 3: [(1,1)] size=1
Labeled grid: [[2,0],[0,3]]
Step 2 - Try flipping each 0:

Steps:
Step 1: Flip (0,1): neighbors are [2] → new size = 1 + 1 = 2
Step 2: Flip (1,0): neighbors are [2,3] → new size = 1 + 1 + 1 = 3
Step 3: Maximum possible island size: 3

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
**O(N²)**
Where N is grid dimension - two passes through the grid

### SPACE COMPLEXITY:
**O(N²)**
For island labeling and size storage

### EDGE CASES:
- **All water**: Return 1 (can only change one cell)
- **All land**: Return total cells (already one island)
- **No water cells**: Cannot change anything, return current max
- **Multiple small islands**: Changing water can connect them
- **Single island**: Changing water expands it by 1

</details>

"""

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
    def largestIsland(self, grid: list[list[int]]) -> int:
        """
        Find largest possible island after flipping at most one 0 to 1.

        Args:
            grid: n x n binary matrix

        Returns:
            Size of largest possible island

        Time Complexity: O(N²)
        Space Complexity: O(N²)
        """
        n = len(grid)
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        # Step 1: Label each island with unique ID and calculate sizes
        island_id = 2  # Start from 2 (since 0=water, 1=unlabeled land)
        island_sizes: dict[Any, Any] = {}

        def dfs(r: Any, c: Any, island_id: Any) -> Any:
            """DFS to label island and return its size."""
            if r < 0 or r >= n or c < 0 or c >= n or grid[r][c] != 1:
                return 0

            grid[r][c] = island_id  # Label with island ID
            size = 1

            for dr, dc in directions:
                size += dfs(r + dr, c + dc, island_id)

            return size

        # Label all islands and record their sizes
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:  # Unlabeled land
                    size = dfs(r, c, island_id)
                    island_sizes[island_id] = size
                    island_id += 1

        # If no islands found, flipping one 0 gives size 1
        if not island_sizes:
            return 1

        # If entire grid is land, return total size
        if len(island_sizes) == 1 and sum(island_sizes.values()) == n * n:
            return n * n

        # Step 2: Try flipping each 0 and calculate resulting island size
        max_island_size = max(island_sizes.values())  # Current max

        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:  # Water cell
                    # Find neighboring islands
                    neighboring_islands: set[Any] = set()
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                            neighboring_islands.add(grid[nr][nc])

                    # Calculate new island size if we flip this cell
                    new_size = 1  # The flipped cell itself
                    for island_id in neighboring_islands:
                        new_size += island_sizes[island_id]

                    max_island_size = max(max_island_size, new_size)

        return max_island_size

    def largestIslandAlternative(self, grid: list[list[int]]) -> int:
        """
        Alternative approach using Union-Find.

        Args:
            grid: n x n binary matrix

        Returns:
            Size of largest possible island
        """
        n = len(grid)
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

        class UnionFind:
            def __init__(self: Any, size: Any) -> None:
                self.parent = list(range(size))
                self.size = [1] * size

            def find(self: Any, x: Any) -> Any:
                if self.parent[x] != x:
                    self.parent[x] = self.find(self.parent[x])
                return self.parent[x]

            def union(self: Any, x: Any, y: Any) -> Any:
                px, py = self.find(x), self.find(y)
                if px == py:
                    return

                if self.size[px] < self.size[py]:
                    px, py = py, px

                self.parent[py] = px
                self.size[px] += self.size[py]

            def get_size(self: Any, x: Any) -> Any:
                return self.size[self.find(x)]

        def coord_to_index(r: Any, c: Any) -> Any:
            return r * n + c

        # Initialize Union-Find for all cells
        uf = UnionFind(n * n)

        # Connect all existing land cells
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                            uf.union(coord_to_index(r, c), coord_to_index(nr, nc))

        # Find current maximum island size
        max_size = 0
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    max_size = max(max_size, uf.get_size(coord_to_index(r, c)))

        # Try flipping each water cell
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    neighboring_components: set[Any] = set()
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                            neighboring_components.add(uf.find(coord_to_index(nr, nc)))

                    new_size = 1  # The flipped cell
                    for component in neighboring_components:
                        new_size += uf.size[component]

                    max_size = max(max_size, new_size)

        return max_size if max_size > 0 else 1


def test_solution() -> None:
    """Test cases for Problem 827."""
    solution = Solution()

    # Test case 1: Can connect islands
    grid1 = [[1, 0], [0, 1]]
    result1 = solution.largestIslandAlternative([[row[i] for i in range(len(row))] for row in grid1])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: All water
    grid2 = [[0, 0], [0, 0]]
    result2 = solution.largestIsland([[row[i] for i in range(len(row))] for row in grid2])
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All land
    grid3 = [[1, 1], [1, 1]]
    result3 = solution.largestIsland([[row[i] for i in range(len(row))] for row in grid3])
    expected3 = 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Quick example
    solution = Solution()
    grid = [[1, 0], [0, 1]]
    print(f"Max island after one flip: {solution.largestIsland([[row[i] for i in range(len(row))] for row in grid])}")
