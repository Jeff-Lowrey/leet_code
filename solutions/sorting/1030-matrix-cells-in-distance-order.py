"""
# Difficulty: Easy

# 1030. Matrix Cells In Distance Order

You are given four integers row, col, rCenter, and cCenter. There exists a rows x cols matrix
and you are on the cell with the coordinates (rCenter, cCenter).

Return the coordinates of all cells in the matrix, sorted by their distance from (rCenter, cCenter)
from the smallest distance to the largest distance. You may return the answer in any order that
satisfies this condition.

The distance between two cells (r1, c1) and (r2, c2) is |r1 - r2| + |c1 - c2|.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to sort all matrix coordinates by their Manhattan distance from a given center point.
The key insight is to generate all coordinates and use Python's built-in sorting with a custom key.

### APPROACH:
1. **Generate all coordinates**: Create all (r, c) pairs for the matrix
2. **Define distance function**: Manhattan distance |r - rCenter| + |c - cCenter|
3. **Sort by distance**: Use sorted() with lambda key function
4. **Return sorted list**: All coordinates ordered by distance

### WHY THIS WORKS:
- Manhattan distance measures the grid distance between two points
- Python's stable sort maintains relative order for equal distances
- Custom key function allows sorting by computed distance
- List comprehension efficiently generates all coordinates

### EXAMPLE WALKTHROUGH:
```
Input: rows = 2, cols = 3, rCenter = 1, cCenter = 2
Matrix coordinates:
(0,0) (0,1) (0,2)
(1,0) (1,1) (1,2)  <- rCenter=1, cCenter=2

Distances from (1,2):
(0,0): |0-1| + |0-2| = 1+2 = 3
(0,1): |0-1| + |1-2| = 1+1 = 2
(0,2): |0-1| + |2-2| = 1+0 = 1
(1,0): |1-1| + |0-2| = 0+2 = 2
(1,1): |1-1| + |1-2| = 0+1 = 1
(1,2): |1-1| + |2-2| = 0+0 = 0

Sorted by distance:
Distance 0: (1,2)
Distance 1: (0,2), (1,1)
Distance 2: (0,1), (1,0)
Distance 3: (0,0)

Output: [[1,2],[0,2],[1,1],[0,1],[1,0],[0,0]]
```

### TIME COMPLEXITY:
O(R*C * log(R*C))
- Generating coordinates: O(R*C)
- Sorting: O(R*C * log(R*C))
- Total: O(R*C * log(R*C))

### SPACE COMPLEXITY:
O(R*C)
For storing all coordinates in the result

### EDGE CASES:
- Single cell matrix (1x1)
- Center at corner vs center of matrix
- Large matrices (up to 100x100)

</details>
"""

class Solution:
    def allCellsDistOrder(self, rows: int, cols: int, rCenter: int, cCenter: int) -> list[list[int]]:
        """
        Return all matrix cells sorted by Manhattan distance from center.

        Args:
            rows: Number of rows in matrix
            cols: Number of columns in matrix
            rCenter: Row coordinate of center
            cCenter: Column coordinate of center

        Returns:
            List of [row, col] coordinates sorted by distance from center

        Time Complexity: O(R*C * log(R*C)) for sorting
        Space Complexity: O(R*C) for result list
        """
        # Generate all coordinates and sort by Manhattan distance
        return sorted(
            [[r, c] for r in range(rows) for c in range(cols)],
            key=lambda coord: abs(coord[0] - rCenter) + abs(coord[1] - cCenter),
        )

    def allCellsDistOrderBFS(self, rows: int, cols: int, rCenter: int, cCenter: int) -> list[list[int]]:
        """
        BFS approach for O(R*C) time complexity.

        Args:
            rows: Number of rows in matrix
            cols: Number of columns in matrix
            rCenter: Row coordinate of center
            cCenter: Column coordinate of center

        Returns:
            List of [row, col] coordinates sorted by distance from center

        Time Complexity: O(R*C) - BFS visits each cell once
        Space Complexity: O(R*C) for result and visited set
        """
        from collections import deque

        result = []
        visited = set()
        queue = deque([(rCenter, cCenter)])
        visited.add((rCenter, cCenter))

        while queue:
            r, c = queue.popleft()
            result.append([r, c])

            # Check all 4 directions
            for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in visited:
                    visited.add((nr, nc))
                    queue.append((nr, nc))

        return result

    def allCellsDistOrderBucket(self, rows: int, cols: int, rCenter: int, cCenter: int) -> list[list[int]]:
        """
        Bucket sort approach for O(R*C) time complexity.

        Groups coordinates by their distance value.

        Time Complexity: O(R*C)
        Space Complexity: O(R*C)
        """
        max_dist = max(rCenter, rows - 1 - rCenter) + max(cCenter, cols - 1 - cCenter)
        buckets = [[] for _ in range(max_dist + 1)]

        # Place each coordinate in its distance bucket
        for r in range(rows):
            for c in range(cols):
                dist = abs(r - rCenter) + abs(c - cCenter)
                buckets[dist].append([r, c])

        # Flatten buckets to get sorted result
        result = []
        for bucket in buckets:
            result.extend(bucket)

        return result

def test_solution():
    """Test cases for Problem 1030."""
    solution = Solution()

    # Test case 1: Small matrix
    result1 = solution.allCellsDistOrder(1, 2, 0, 0)
    expected1 = [[0, 0], [0, 1]]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: 2x3 matrix with center at (1,2)
    result2 = solution.allCellsDistOrder(2, 3, 1, 2)
    # Check first element (should be center with distance 0)
    assert result2[0] == [1, 2], f"Center should be first, got {result2[0]}"
    # Check that it's sorted by distance
    for i in range(len(result2) - 1):
        dist1 = abs(result2[i][0] - 1) + abs(result2[i][1] - 2)
        dist2 = abs(result2[i + 1][0] - 1) + abs(result2[i + 1][1] - 2)
        assert dist1 <= dist2, f"Not sorted by distance at index {i}"

    # Test case 3: Single cell
    result3 = solution.allCellsDistOrder(1, 1, 0, 0)
    expected3 = [[0, 0]]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: 3x3 matrix with center in middle
    result4 = solution.allCellsDistOrder(3, 3, 1, 1)
    assert result4[0] == [1, 1], f"Center should be first, got {result4[0]}"
    assert len(result4) == 9, f"Should have 9 cells, got {len(result4)}"

    # Test BFS solution
    result5 = solution.allCellsDistOrderBFS(2, 3, 1, 2)
    assert result5[0] == [1, 2], f"Center should be first, got {result5[0]}"
    assert len(result5) == 6, f"Should have 6 cells, got {len(result5)}"

    # Test bucket sort solution
    result6 = solution.allCellsDistOrderBucket(2, 3, 1, 2)
    assert result6[0] == [1, 2], f"Center should be first, got {result6[0]}"
    assert len(result6) == 6, f"Should have 6 cells, got {len(result6)}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1030. Matrix Cells In Distance Order ===")
    print(f"allCellsDistOrder(1, 2, 0, 0) -> {solution.allCellsDistOrder(1, 2, 0, 0)}")
    print(f"allCellsDistOrder(2, 3, 1, 2) -> {solution.allCellsDistOrder(2, 3, 1, 2)}")
    print(f"allCellsDistOrder(3, 3, 1, 1) -> {solution.allCellsDistOrder(3, 3, 1, 1)}")
