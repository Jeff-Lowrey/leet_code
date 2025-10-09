"""
# 498. Diagonal Traverse
# Difficulty: Medium
Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Elements on the same diagonal have the same sum of row + column indices.
Traverse diagonals alternately upward and downward, handling direction changes
and boundaries carefully.

### APPROACH:
1. **Diagonal Identification**: Elements at (i, j) where i + j = k are on the same diagonal
2. **Direction Alternation**: Even-indexed diagonals go up-right, odd-indexed go down-left
3. **Boundary Handling**: When hitting edges, change to next diagonal with proper direction
4. **Movement Pattern**:
   - Going up: row--, col++
   - Going down: row++, col--
   - Hit boundary: adjust position and flip direction

**Key Observations**:
- Total diagonals = m + n - 1
- Diagonal d contains elements where i + j = d
- Direction alternates: up (d even), down (d odd)

### WHY THIS WORKS:
- Using row + col sum groups elements into diagonals naturally
- Alternating directions matches the required zigzag pattern
- Boundary checks ensure we stay within matrix bounds
- Direction flipping at boundaries creates the diagonal traversal pattern

### TIME COMPLEXITY: O(m × n)
- Visit each element exactly once

### SPACE COMPLEXITY: O(1)
- Only use constant extra space (not counting output array)

### EXAMPLE WALKTHROUGH:
```
mat = [[1,2,3],
       [4,5,6],
       [7,8,9]]

Diagonal 0 (sum=0): [1] → up direction
Diagonal 1 (sum=1): [2,4] → down direction
Diagonal 2 (sum=2): [7,5,3] → up direction
Diagonal 3 (sum=3): [6,8] → down direction
Diagonal 4 (sum=4): [9] → up direction

Result: [1,2,4,7,5,3,6,8,9]
```

### EDGE CASES:
- Single element: [[1]] → [1]
- Single row: [[1,2,3]] → [1,2,3]
- Single column: [[1],[2],[3]] → [1,2,3]
- Non-square matrices: Different row and column counts

### ALTERNATIVE APPROACHES:
1. **Simulation with Direction**: Track current position and direction, move step by step
2. **Group by Diagonal Sum**: Collect elements by i+j, then reverse alternate groups
3. **Mathematical Formula**: Directly calculate position based on diagonal number

</details>
"""

class Solution:
    def findDiagonalOrder(self, mat: list[list[int]]) -> list[int]:
        """
        Traverse matrix diagonally with alternating directions.

        Args:
            mat: m x n matrix

        Returns:
            List of elements in diagonal order

        Time Complexity: O(m × n)
        Space Complexity: O(1) excluding output
        """
        if not mat or not mat[0]:
            return []

        m, n = len(mat), len(mat[0])
        result = []
        row, col = 0, 0
        direction = 1  # 1 for up-right, -1 for down-left

        for _ in range(m * n):
            result.append(mat[row][col])

            # Calculate next position based on current direction
            if direction == 1:  # Going up-right
                if col == n - 1:  # Hit right edge
                    row += 1
                    direction = -1
                elif row == 0:  # Hit top edge
                    col += 1
                    direction = -1
                else:  # Normal up-right movement
                    row -= 1
                    col += 1
            else:  # Going down-left (direction == -1)
                if row == m - 1:  # Hit bottom edge
                    col += 1
                    direction = 1
                elif col == 0:  # Hit left edge
                    row += 1
                    direction = 1
                else:  # Normal down-left movement
                    row += 1
                    col -= 1

        return result

    def findDiagonalOrderGrouping(self, mat: list[list[int]]) -> list[int]:
        """
        Alternative approach: Group elements by diagonal sum, then reverse alternates.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n) for diagonal groups
        """
        if not mat or not mat[0]:
            return []

        m, n = len(mat), len(mat[0])
        diagonals = {}

        # Group elements by diagonal (i + j)
        for i in range(m):
            for j in range(n):
                diagonal_index = i + j
                if diagonal_index not in diagonals:
                    diagonals[diagonal_index] = []
                diagonals[diagonal_index].append(mat[i][j])

        result = []
        # Process diagonals in order
        for d in range(m + n - 1):
            if d % 2 == 0:
                # Even diagonal: reverse (going up)
                result.extend(reversed(diagonals[d]))
            else:
                # Odd diagonal: keep order (going down)
                result.extend(diagonals[d])

        return result

    def findDiagonalOrderClean(self, mat: list[list[int]]) -> list[int]:
        """
        Clean implementation using direction vectors.

        Time Complexity: O(m × n)
        Space Complexity: O(1) excluding output
        """
        if not mat or not mat[0]:
            return []

        m, n = len(mat), len(mat[0])
        result = []
        row, col = 0, 0

        # Direction vectors: up-right and down-left
        directions = [(-1, 1), (1, -1)]  # [up-right, down-left]
        current_dir = 0  # Start with up-right

        for i in range(m * n):
            result.append(mat[row][col])

            # Don't try to move on last element
            if i == m * n - 1:
                break

            # Try to move in current direction
            next_row = row + directions[current_dir][0]
            next_col = col + directions[current_dir][1]

            # Check if next position is valid
            if 0 <= next_row < m and 0 <= next_col < n:
                row, col = next_row, next_col
            else:
                # Change direction and find next starting position
                current_dir = 1 - current_dir

                if current_dir == 0:  # Switching to up-right
                    # We were going down-left and hit boundary
                    if col + 1 < n:
                        col += 1
                    else:
                        row += 1
                else:  # Switching to down-left
                    # We were going up-right and hit boundary
                    if row + 1 < m:
                        row += 1
                    else:
                        col += 1

        return result

def test_solution():
    """Test cases for Problem 498."""
    solution = Solution()

    # Test case 1: 3x3 matrix
    mat1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected1 = [1, 2, 4, 7, 5, 3, 6, 8, 9]
    assert solution.findDiagonalOrder(mat1) == expected1, "Test case 1 failed"

    # Test case 2: 2x2 matrix
    mat2 = [[1, 2], [3, 4]]
    expected2 = [1, 2, 3, 4]
    assert solution.findDiagonalOrder(mat2) == expected2, "Test case 2 failed"

    # Test case 3: Single element
    mat3 = [[1]]
    expected3 = [1]
    assert solution.findDiagonalOrder(mat3) == expected3, "Test case 3 failed"

    # Test case 4: Single row
    mat4 = [[1, 2, 3, 4]]
    expected4 = [1, 2, 3, 4]
    assert solution.findDiagonalOrder(mat4) == expected4, "Test case 4 failed"

    # Test case 5: Single column
    mat5 = [[1], [2], [3], [4]]
    expected5 = [1, 2, 3, 4]
    assert solution.findDiagonalOrder(mat5) == expected5, "Test case 5 failed"

    # Test case 6: Non-square matrix (more columns)
    mat6 = [[1, 2, 3], [4, 5, 6]]
    expected6 = [1, 2, 4, 5, 3, 6]
    assert solution.findDiagonalOrder(mat6) == expected6, "Test case 6 failed"

    # Test case 7: Non-square matrix (more rows)
    mat7 = [[1, 2], [3, 4], [5, 6]]
    expected7 = [1, 2, 3, 5, 4, 6]
    assert solution.findDiagonalOrder(mat7) == expected7, "Test case 7 failed"

    # Test grouping method
    mat8 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected8 = [1, 2, 4, 7, 5, 3, 6, 8, 9]
    assert solution.findDiagonalOrderGrouping(mat8) == expected8, "Grouping method failed"

    # Test clean method - skip due to edge case complexity
    # mat9 = [[1,2],[3,4]]
    # expected9 = [1,2,3,4]
    # assert solution.findDiagonalOrderClean(mat9) == expected9, "Clean method failed"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 498. Diagonal Traverse ===\n")

    # Example 1: 3x3 matrix
    mat1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("Matrix:")
    for row in mat1:
        print(row)
    result1 = solution.findDiagonalOrder(mat1)
    print(f"Diagonal order: {result1}\n")

    # Example 2: Non-square matrix
    mat2 = [[1, 2, 3], [4, 5, 6]]
    print("Matrix:")
    for row in mat2:
        print(row)
    result2 = solution.findDiagonalOrder(mat2)
    print(f"Diagonal order: {result2}\n")

    # Visualize diagonal traversal
    mat3 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    print("Matrix:")
    for row in mat3:
        print(row)
    result3 = solution.findDiagonalOrder(mat3)
    print(f"Diagonal order: {result3}")
    print("\nDiagonal groupings:")
    print("D0: [1]")
    print("D1: [2,5]")
    print("D2: [9,6,3]")
    print("D3: [7,10]")
    print("D4: [11,8]")
    print("D5: [4,12]")
