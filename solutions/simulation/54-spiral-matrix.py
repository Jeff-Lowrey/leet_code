"""
# 54. Spiral Matrix
**Medium**

Given an m x n matrix, return all elements of the matrix in spiral order.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Process the matrix layer by layer, moving in a spiral pattern: right → down → left → up.
Use boundaries to track which parts of the matrix have been visited, shrinking the
boundaries after completing each direction.

### APPROACH:
1. **Maintain Four Boundaries**: top, bottom, left, right
2. **Traverse in Order**:
   - Right: from left to right along top row
   - Down: from top to bottom along right column
   - Left: from right to left along bottom row
   - Up: from bottom to top along left column
3. **Shrink Boundaries**: After each direction, adjust the corresponding boundary
4. **Termination**: Stop when boundaries cross

**Key Pattern**: Layer-by-layer spiral traversal
- Outer layer → Inner layers
- Each complete spiral reduces the working area

### WHY THIS WORKS:
- Boundaries ensure we don't revisit cells
- Moving in a fixed pattern (right→down→left→up) creates the spiral
- Shrinking boundaries after each direction naturally moves inward
- Crossing boundaries indicates all cells have been visited

### TIME COMPLEXITY: O(m × n)
- Visit each element exactly once

### SPACE COMPLEXITY: O(1)
- Only use constant extra space (not counting output array)

### EXAMPLE WALKTHROUGH:
```
matrix = [[1,2,3],
          [4,5,6],
          [7,8,9]]

Initial: top=0, bottom=2, left=0, right=2

Step 1 - Right (top row): [1,2,3]
  top becomes 1

Step 2 - Down (right column): [6,9]
  right becomes 1

Step 3 - Left (bottom row): [8,7]
  bottom becomes 1

Step 4 - Up (left column): [4]
  left becomes 1

Step 5 - Right (middle): [5]
  top > bottom, stop

Result: [1,2,3,6,9,8,7,4,5]
```

### EDGE CASES:
- Single element: [[1]] → [1]
- Single row: [[1,2,3]] → [1,2,3]
- Single column: [[1],[2],[3]] → [1,2,3]
- Empty matrix: [] → []

### ALTERNATIVE APPROACHES:
1. **Direction Vector**: Use direction array and change direction when hitting boundary/visited cell
2. **Visited Matrix**: Mark visited cells in separate boolean matrix
3. **Recursive**: Process outer layer, recurse on inner matrix

</details>
"""



class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        """
        Return elements in spiral order using boundary tracking.

        Args:
            matrix: m x n matrix

        Returns:
            List of elements in spiral order

        Time Complexity: O(m × n)
        Space Complexity: O(1) excluding output
        """
        if not matrix or not matrix[0]:
            return []

        m, n = len(matrix), len(matrix[0])
        result = []

        # Define boundaries
        top, bottom = 0, m - 1
        left, right = 0, n - 1

        while top <= bottom and left <= right:
            # Move right along top row
            for col in range(left, right + 1):
                result.append(matrix[top][col])
            top += 1

            # Move down along right column
            for row in range(top, bottom + 1):
                result.append(matrix[row][right])
            right -= 1

            # Move left along bottom row (if there's a row remaining)
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    result.append(matrix[bottom][col])
                bottom -= 1

            # Move up along left column (if there's a column remaining)
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    result.append(matrix[row][left])
                left += 1

        return result

    def spiralOrderDirection(self, matrix: list[list[int]]) -> list[int]:
        """
        Alternative approach using direction vectors.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n) for visited matrix
        """
        if not matrix or not matrix[0]:
            return []

        m, n = len(matrix), len(matrix[0])
        result = []
        visited = [[False] * n for _ in range(m)]

        # Direction vectors: right, down, left, up
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        current_dir = 0

        row, col = 0, 0

        for _ in range(m * n):
            result.append(matrix[row][col])
            visited[row][col] = True

            # Calculate next position
            next_row = row + directions[current_dir][0]
            next_col = col + directions[current_dir][1]

            # Check if need to change direction
            if next_row < 0 or next_row >= m or next_col < 0 or next_col >= n or visited[next_row][next_col]:
                # Change direction (turn right in spiral)
                current_dir = (current_dir + 1) % 4
                next_row = row + directions[current_dir][0]
                next_col = col + directions[current_dir][1]

            row, col = next_row, next_col

        return result

    def spiralOrderRecursive(self, matrix: list[list[int]]) -> list[int]:
        """
        Recursive approach processing layers.

        Time Complexity: O(m × n)
        Space Complexity: O(min(m, n)) for recursion depth
        """
        if not matrix or not matrix[0]:
            return []

        def spiral_helper(top, bottom, left, right):
            if top > bottom or left > right:
                return []

            result = []

            # Top row
            for col in range(left, right + 1):
                result.append(matrix[top][col])

            # Right column
            for row in range(top + 1, bottom + 1):
                result.append(matrix[row][right])

            # Bottom row (if exists)
            if top < bottom:
                for col in range(right - 1, left - 1, -1):
                    result.append(matrix[bottom][col])

            # Left column (if exists)
            if left < right:
                for row in range(bottom - 1, top, -1):
                    result.append(matrix[row][left])

            # Recurse on inner layer
            result.extend(spiral_helper(top + 1, bottom - 1, left + 1, right - 1))

            return result

        m, n = len(matrix), len(matrix[0])
        return spiral_helper(0, m - 1, 0, n - 1)


def test_solution():
    """Test cases for Problem 54."""
    solution = Solution()

    # Test case 1: 3x3 matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected1 = [1, 2, 3, 6, 9, 8, 7, 4, 5]
    assert solution.spiralOrder(matrix1) == expected1, "Test case 1 failed"

    # Test case 2: 3x4 matrix
    matrix2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    expected2 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    assert solution.spiralOrder(matrix2) == expected2, "Test case 2 failed"

    # Test case 3: Single element
    matrix3 = [[1]]
    expected3 = [1]
    assert solution.spiralOrder(matrix3) == expected3, "Test case 3 failed"

    # Test case 4: Single row
    matrix4 = [[1, 2, 3, 4, 5]]
    expected4 = [1, 2, 3, 4, 5]
    assert solution.spiralOrder(matrix4) == expected4, "Test case 4 failed"

    # Test case 5: Single column
    matrix5 = [[1], [2], [3], [4]]
    expected5 = [1, 2, 3, 4]
    assert solution.spiralOrder(matrix5) == expected5, "Test case 5 failed"

    # Test case 6: 2x2 matrix
    matrix6 = [[1, 2], [3, 4]]
    expected6 = [1, 2, 4, 3]
    assert solution.spiralOrder(matrix6) == expected6, "Test case 6 failed"

    # Test case 7: 4x3 matrix (more rows than columns)
    matrix7 = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
    expected7 = [1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]
    assert solution.spiralOrder(matrix7) == expected7, "Test case 7 failed"

    # Test direction method
    matrix8 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected8 = [1, 2, 3, 6, 9, 8, 7, 4, 5]
    assert solution.spiralOrderDirection(matrix8) == expected8, "Direction method failed"

    # Test recursive method
    matrix9 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    expected9 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
    assert solution.spiralOrderRecursive(matrix9) == expected9, "Recursive method failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 54. Spiral Matrix ===\n")

    # Example 1: 3x3 matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("Matrix:")
    for row in matrix1:
        print(row)
    result1 = solution.spiralOrder(matrix1)
    print(f"Spiral order: {result1}\n")

    # Example 2: 3x4 matrix
    matrix2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    print("Matrix:")
    for row in matrix2:
        print(row)
    result2 = solution.spiralOrder(matrix2)
    print(f"Spiral order: {result2}\n")

    # Example 3: Visualize the spiral path
    matrix3 = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
    print("Matrix:")
    for row in matrix3:
        print(row)
    result3 = solution.spiralOrder(matrix3)
    print(f"Spiral order: {result3}")
    print("\nPath visualization:")
    print("→→→→→  (right: 1-5)")
    print("    ↓  (down: 10,15,20)")
    print("←←←←   (left: 19-16)")
    print("↑      (up: 11,6)")
    print("→→→    (right: 7-9)")
    print("  ↓    (down: 14)")
    print("←←     (left: 13,12)")
    print("↑      (up: 17)")
    print("→      (right: 18)")
