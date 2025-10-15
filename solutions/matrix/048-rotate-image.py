"""
# Difficulty:

# 048. Rotate Image
**Transpose + Reverse**

Rotate an n x n 2D matrix 90 degrees clockwise in-place.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 2, 3]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Matrix rotated 90° clockwise</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Rotating 90 degrees clockwise can be achieved by two simple operations:
1. Transpose the matrix (swap rows and columns)
2. Reverse each row

This avoids using extra space for a new matrix.

### APPROACH:
1. **Transpose**: Convert matrix[i][j] to matrix[j][i] for all i, j
2. **Reverse rows**: Reverse each row to complete the 90-degree rotation
3. **In-place**: Both operations modify the matrix directly

### WHY THIS WORKS:
- Transpose flips the matrix along diagonal
- Reversing rows completes the 90-degree clockwise rotation
- Two simple operations replace complex rotation logic
- No additional space needed

### EXAMPLE WALKTHROUGH:
```
Input: [[1,2,3],
        [4,5,6],
        [7,8,9]]

Step 1 (Transpose): [[1,4,7],
                      [2,5,8],
                      [3,6,9]]

Step 2 (Reverse rows): [[7,4,1],
                        [8,5,2],
                        [9,6,3]]

Output: [[7,4,1],
         [8,5,2],
         [9,6,3]]
```

### TIME COMPLEXITY:
O(n^2) where n is matrix dimension

### SPACE COMPLEXITY:
O(1) in-place modification

### EDGE CASES:
- 1x1 matrix (no change needed)
- 2x2 matrix (minimal case)
- Empty matrix (not per problem constraints)

</details>
"""


class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        """
        Rotate n x n matrix 90 degrees clockwise in-place.

        Args:
            matrix: n x n 2D matrix

        Returns:
            None (modifies matrix in-place)

        Time Complexity: O(n^2)
        Space Complexity: O(1)
        """
        n = len(matrix)

        # Step 1: Transpose the matrix
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # Step 2: Reverse each row
        for i in range(n):
            matrix[i].reverse()

    # Alias for consistent interface
    solve = rotate


def test_solution() -> None:
    """
    Test cases for 048. Rotate Image.
    """
    solution = Solution()

    # Test case 1: 3x3 matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected1 = [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    solution.rotate(matrix1)
    assert matrix1 == expected1, f"Test case 1 failed: expected {expected1}, got {matrix1}"
    print("Test case 1 passed: 3x3 matrix")

    # Test case 2: 4x4 matrix
    matrix2 = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
    expected2 = [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
    solution.rotate(matrix2)
    assert matrix2 == expected2, f"Test case 2 failed: expected {expected2}, got {matrix2}"
    print("Test case 2 passed: 4x4 matrix")

    # Test case 3: 1x1 matrix (edge case)
    matrix3 = [[1]]
    expected3 = [[1]]
    solution.rotate(matrix3)
    assert matrix3 == expected3, f"Test case 3 failed: expected {expected3}, got {matrix3}"
    print("Test case 3 passed: 1x1 matrix")

    # Test case 4: 2x2 matrix
    matrix4 = [[1, 2], [3, 4]]
    expected4 = [[3, 1], [4, 2]]
    solution.rotate(matrix4)
    assert matrix4 == expected4, f"Test case 4 failed: expected {expected4}, got {matrix4}"
    print("Test case 4 passed: 2x2 matrix")

    # Test case 5: Matrix with negative numbers
    matrix5 = [[-1, -2], [-3, -4]]
    expected5 = [[-3, -1], [-4, -2]]
    solution.rotate(matrix5)
    assert matrix5 == expected5, f"Test case 5 failed: expected {expected5}, got {matrix5}"
    print("Test case 5 passed: Matrix with negative numbers")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample: Rotating a 3x3 matrix")
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("Before rotation:")
    for row in matrix:
        print(row)
    solution.rotate(matrix)
    print("\nAfter 90-degree clockwise rotation:")
    for row in matrix:
        print(row)
