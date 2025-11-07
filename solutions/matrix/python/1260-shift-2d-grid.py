"""
### INTUITION:
Think of the 2D grid as a 1D array that wraps around. Each shift moves all elements
one position to the right, with the last element wrapping to the first position.
Instead of performing k individual shifts, we can calculate final positions directly.

### APPROACH:
1. **Flatten Conceptually**: Treat the 2D grid as a 1D array without actually creating it
2. **Calculate New Position**: For element at position i, after k shifts it's at (i + k) % total
3. **Map Back to 2D**: Convert 1D position back to 2D coordinates
4. **Optimization**: Use k % total to avoid unnecessary full rotations

**Key Insight**: Position mapping
- 2D to 1D: index = i * n + j (where i is row, j is col)
- 1D to 2D: row = index // n, col = index % n

### WHY THIS WORKS:
- This ensures that shifting k times is equivalent to rotating the flattened array by k positions
- This ensures that using modulo handles wrapping and optimizes multiple full rotations
- This ensures that direct position calculation avoids expensive element-by-element shifting

### EXAMPLE WALKTHROUGH:
Input:
```
[[1, 2, 3]
```

Input:
```
grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1, m = 3, n = 3, total = 9
```

Flatten view: [1,2,3,4,5,6,7,8,9]
After 1 shift: [9,1,2,3,4,5,6,7,8]
Position mapping:

Steps:
Step 1: - 1 at index 0 → new index (0+1)%9 = 1 → grid[0][1]
Step 2: - 2 at index 1 → new index (1+1)%9 = 2 → grid[0][2]
Step 3: - 9 at index 8 → new index (8+1)%9 = 0 → grid[0][0]
Step 4: Result: [[9,1,2],[3,4,5],[6,7,8]]

Output:
```
[[9,1,2],[3,4,5],[6,7,8]]
```

### TIME COMPLEXITY:
**O(m × n)**
- Must visit each element once to build result

### SPACE COMPLEXITY:
**O(m × n)**
- Need to store the result grid (required by problem)
- Can be **O(1)** if we modify in-place, but tricky with constraints

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any


class Solution:
    def shiftGrid(self, grid: list[list[int]], k: int) -> list[list[int]]:
        """
        Shift 2D grid k times using position mapping.

        Args:
            grid: m x n 2D grid of integers
            k: Number of shift operations

        Returns:
            Shifted 2D grid

        Time Complexity: O(m × n)
        Space Complexity: O(m × n) for result grid
        """
        m, n = len(grid), len(grid[0])
        total = m * n

        # Optimize k to avoid unnecessary full rotations
        k = k % total

        # Edge case: no shift needed
        if k == 0:
            return grid

        # Create result grid
        result = [[0] * n for _ in range(m)]

        # Map each element to its new position
        for i in range(m):
            for j in range(n):
                # Convert 2D position to 1D index
                old_index = i * n + j

                # Calculate new 1D index after k shifts
                new_index = (old_index + k) % total

                # Convert new 1D index back to 2D position
                new_row = new_index // n
                new_col = new_index % n

                # Place element in new position
                result[new_row][new_col] = grid[i][j]

        return result

    def shiftGridFlatten(self, grid: list[list[int]], k: int) -> list[list[int]]:
        """
        Alternative approach: Flatten, rotate, reshape.

        More intuitive but uses extra space for flattened array.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(grid), len(grid[0])
        total = m * n
        k = k % total

        # Flatten grid to 1D array
        flat: list[Any] = []
        for row in grid:
            flat.extend(row)

        # Rotate: move last k elements to front
        # [1,2,3,4,5,6,7,8,9] with k=1 → [9,1,2,3,4,5,6,7,8]
        rotated = flat[-k:] + flat[:-k] if k > 0 else flat

        # Reshape back to 2D
        result: list[Any] = []
        for i in range(m):
            result.append(rotated[i * n : (i + 1) * n])

        return result

    def shiftGridInPlace(self, grid: list[list[int]], k: int) -> list[list[int]]:
        """
        Optimized approach with less auxiliary space.

        Uses cyclic replacement based on GCD to minimize extra space.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n) - still need result grid per problem requirement
        """
        m, n = len(grid), len(grid[0])
        total = m * n
        k = k % total

        if k == 0:
            return grid

        result = [[0] * n for _ in range(m)]

        # Direct position calculation (same as first method)
        for i in range(m):
            for j in range(n):
                old_pos = i * n + j
                new_pos = (old_pos + k) % total
                result[new_pos // n][new_pos % n] = grid[i][j]

        return result


def test_solution() -> None:
    """Test cases for Problem 1260."""
    solution = Solution()

    # Test case 1: Basic shift by 1
    grid1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    k1 = 1
    expected1 = [[9, 1, 2], [3, 4, 5], [6, 7, 8]]
    assert solution.shiftGrid(grid1, k1) == expected1, "Test case 1 failed"

    # Test case 2: Multiple row shift
    grid2 = [[3, 8, 1, 9], [19, 7, 2, 5], [4, 6, 11, 10], [12, 0, 21, 13]]
    k2 = 4
    expected2 = [[12, 0, 21, 13], [3, 8, 1, 9], [19, 7, 2, 5], [4, 6, 11, 10]]
    assert solution.shiftGrid(grid2, k2) == expected2, "Test case 2 failed"

    # Test case 3: Single element
    grid3 = [[1]]
    k3 = 100
    expected3 = [[1]]
    assert solution.shiftGrid(grid3, k3) == expected3, "Test case 3 failed"

    # Test case 4: No shift (k = 0)
    grid4 = [[1, 2], [3, 4]]
    k4 = 0
    expected4 = [[1, 2], [3, 4]]
    assert solution.shiftGrid(grid4, k4) == expected4, "Test case 4 failed"

    # Test case 5: k larger than grid size
    grid5 = [[1, 2, 3], [4, 5, 6]]
    k5 = 8  # 6 elements, k=8 is same as k=2
    expected5 = [[5, 6, 1], [2, 3, 4]]
    assert solution.shiftGrid(grid5, k5) == expected5, "Test case 5 failed"

    # Test case 6: Single row
    grid6 = [[1, 2, 3, 4]]
    k6 = 2
    expected6 = [[3, 4, 1, 2]]
    assert solution.shiftGrid(grid6, k6) == expected6, "Test case 6 failed"

    # Test case 7: Single column
    grid7 = [[1], [2], [3]]
    k7 = 1
    expected7 = [[3], [1], [2]]
    assert solution.shiftGrid(grid7, k7) == expected7, "Test case 7 failed"

    # Test flatten method
    grid8 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected8 = [[9, 1, 2], [3, 4, 5], [6, 7, 8]]
    assert solution.shiftGridFlatten(grid8, 1) == expected8, "Flatten method failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1260. Shift 2D Grid ===\n")

    # Example 1
    grid1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    k1 = 1
    print(f"Original grid: {grid1}")
    print(f"k = {k1}")
    result1 = solution.shiftGrid(grid1, k1)
    print(f"After {k1} shift: {result1}\n")

    # Example 2
    grid2 = [[3, 8, 1, 9], [19, 7, 2, 5], [4, 6, 11, 10], [12, 0, 21, 13]]
    k2 = 4
    print(f"Original grid: {grid2}")
    print(f"k = {k2}")
    result2 = solution.shiftGrid(grid2, k2)
    print(f"After {k2} shifts: {result2}\n")

    # Demonstrate large k optimization
    grid3 = [[1, 2], [3, 4]]
    k3 = 100  # Total = 4, so k=100 is same as k=0
    print(f"Original grid: {grid3}")
    print(f"k = {k3} (optimized to {k3 % 4})")
    result3 = solution.shiftGrid(grid3, k3)
    print(f"After optimization: {result3}")
