"""
### INTUITION:
To rotate a matrix 90° clockwise in-place, we can use two key insights:
1. Transpose the matrix (swap rows and columns)
2. Reverse each row

Alternatively, we can directly manipulate elements in concentric rings.

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

**Method 1: Transpose + Reverse**
1. **Transpose**: Convert matrix[i][j] to matrix[j][i]
2. **Reverse rows**: Reverse each row to complete 90° rotation

**Method 2: Ring-by-Ring Rotation**
1. **Process rings**: Handle outer ring, then inner rings
2. **Four-way swap**: Rotate 4 elements at once in each ring
3. **Move inward**: Process successively inner rings

### WHY THIS WORKS:
- Transpose swaps coordinates: (i,j) → (j,i)
- Row reversal completes the 90° clockwise rotation
- Ring rotation directly places elements in final positions
- Both maintain O(1) space complexity

### EXAMPLE WALKTHROUGH:
Input:
```
Original:     Transpose:    Reverse Rows:
```

1 2 3         1 4 7         7 4 1

Steps:
Step 1: 4 5 6    →    2 5 8    →    8 5 2
Step 2: 7 8 9         3 6 9         9 6 3
Step 3: Result: 90° clockwise rotation

Output:
```
90° clockwise rotation
```

### TIME COMPLEXITY:
**O(n²)**
Must touch every element in the n×n matrix

### SPACE COMPLEXITY:
**O(1)**
In-place rotation without extra matrix

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


class Solution:
    def rotate(self, matrix: list[list[int]]) -> None:
        """
        Rotate matrix 90 degrees clockwise in-place using transpose + reverse.

        Args:
            matrix: n×n 2D matrix to rotate

        Time Complexity: O(n²) - process each element once
        Space Complexity: O(1) - in-place modification
        """
        n = len(matrix)

        # Step 1: Transpose the matrix (swap matrix[i][j] with matrix[j][i])
        for i in range(n):
            for j in range(i + 1, n):  # Only process upper triangle to avoid double swap
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # Step 2: Reverse each row
        for i in range(n):
            matrix[i].reverse()

    def rotateRings(self, matrix: list[list[int]]) -> None:
        """
        Alternative solution using ring-by-ring rotation.

        Args:
            matrix: n×n 2D matrix to rotate

        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(matrix)

        # Process each ring from outside to inside
        for ring in range(n // 2):
            # For each position in the current ring
            for i in range(ring, n - ring - 1):
                # Save top element
                temp = matrix[ring][i]

                # Move left to top
                matrix[ring][i] = matrix[n - 1 - i][ring]

                # Move bottom to left
                matrix[n - 1 - i][ring] = matrix[n - 1 - ring][n - 1 - i]

                # Move right to bottom
                matrix[n - 1 - ring][n - 1 - i] = matrix[i][n - 1 - ring]

                # Move top (temp) to right
                matrix[i][n - 1 - ring] = temp

    def rotateManual(self, matrix: list[list[int]]) -> None:
        """
        Manual implementation without using built-in reverse.

        Args:
            matrix: n×n 2D matrix to rotate
        """
        n = len(matrix)

        # Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # Reverse each row manually
        for i in range(n):
            left, right = 0, n - 1
            while left < right:
                matrix[i][left], matrix[i][right] = matrix[i][right], matrix[i][left]
                left += 1
                right -= 1

    def rotateCounterClockwise(self, matrix: list[list[int]]) -> None:
        """
        Bonus: Rotate 90 degrees counter-clockwise.

        Args:
            matrix: n×n 2D matrix to rotate
        """
        n = len(matrix)

        # For counter-clockwise: reverse rows first, then transpose
        # Step 1: Reverse each row
        for i in range(n):
            matrix[i].reverse()

        # Step 2: Transpose
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]


def print_matrix(matrix):
    """Helper function to print matrix nicely."""
    for row in matrix:
        print(" ".join(f"{num:2}" for num in row))
    print()


def test_solution() -> None:
    """Test cases for Problem 48."""
    solution = Solution()

    # Test case 1: 3x3 matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected1 = [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    solution.rotate(matrix1)
    assert matrix1 == expected1, f"Expected {expected1}, got {matrix1}"

    # Test case 2: 4x4 matrix
    matrix2 = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
    expected2 = [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
    solution.rotate(matrix2)
    assert matrix2 == expected2, f"Expected {expected2}, got {matrix2}"

    # Test case 3: 1x1 matrix
    matrix3 = [[1]]
    expected3 = [[1]]
    solution.rotate(matrix3)
    assert matrix3 == expected3, f"Expected {expected3}, got {matrix3}"

    # Test case 4: 2x2 matrix
    matrix4 = [[1, 2], [3, 4]]
    expected4 = [[3, 1], [4, 2]]
    solution.rotate(matrix4)
    assert matrix4 == expected4, f"Expected {expected4}, got {matrix4}"

    # Test ring rotation method
    matrix5 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected5 = [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
    solution.rotateRings(matrix5)
    assert matrix5 == expected5, f"Expected {expected5}, got {matrix5}"

    # Test manual method
    matrix6 = [[1, 2], [3, 4]]
    expected6 = [[3, 1], [4, 2]]
    solution.rotateManual(matrix6)
    assert matrix6 == expected6, f"Expected {expected6}, got {matrix6}"

    # Test counter-clockwise rotation
    matrix7 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected7 = [[3, 6, 9], [2, 5, 8], [1, 4, 7]]
    solution.rotateCounterClockwise(matrix7)
    assert matrix7 == expected7, f"Expected {expected7}, got {matrix7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 48. Rotate Image ===")

    # Demonstrate rotation
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("Original matrix:")
    print_matrix(matrix)

    solution.rotate(matrix)
    print("After 90° clockwise rotation:")
    print_matrix(matrix)

    # Show 4x4 example
    matrix_4x4 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    print("Original 4x4 matrix:")
    print_matrix(matrix_4x4)

    solution.rotateRings(matrix_4x4)
    print("After rotation (using ring method):")
    print_matrix(matrix_4x4)
