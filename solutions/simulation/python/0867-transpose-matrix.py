"""
# Difficulty: Easy

# 0867. Transpose Matrix

Given a 2D integer array matrix, return the transpose of matrix.

The transpose of a matrix is the matrix flipped over its main diagonal, switching
the matrix's row and column indices.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[1,4,7],[2,5,8],[3,6,9]]

Example 2:
Input: matrix = [[1,2,3],[4,5,6]]
Output: [[1,4],[2,5],[3,6]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 2, 3]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Transpose of [[1,2,3],[4,5,6]] is [[1,4],[2,5],[3,6]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal
**Data Structures**: Hash Map, Array, Matrix
**Patterns**: Iterative Solution
**Time Complexity**: O(m × n)
**Space Complexity**: O(m × n)

### INTUITION:
Transposing a matrix means converting rows to columns and vice versa.
Element at position (i,j) in original matrix moves to position (j,i) in transposed matrix.
For an m×n matrix, transpose is n×m.

### APPROACH:
1. **Create Result Matrix**: Size n×m (swapped dimensions)
2. **Map Elements**: result[j][i] = matrix[i][j]
3. **Iterate**: Process all elements once

**Key Pattern**: Row-column swap
- Original: m rows × n columns
- Transpose: n rows × m columns
- Position mapping: (i,j) → (j,i)

### WHY THIS WORKS:
- Transpose definition: swap rows and columns
- By definition: A^T[j][i] = A[i][j]
- Creating new matrix with swapped dimensions accommodates the transformation
- Each element lands in exactly one position

### EXAMPLE WALKTHROUGH:
Input:
```
[[1, 2, 3]
```

Input:
```
matrix = [[1,2,3],
```

[4,5,6]]
Original: 2×3 (2 rows, 3 cols)
Element positions:

Steps:
Step 1: (0,0):1 → (0,0):1
Step 2: (0,1):2 → (1,0):2
Step 3: (0,2):3 → (2,0):3
Step 4: (1,0):4 → (0,1):4
Step 5: (1,1):5 → (1,1):5
Step 6: (1,2):6 → (2,1):6
Step 7: Result: 3×2 (3 rows, 2 cols)
Step 8: [[1,4],
Step 9: [2,5],
Step 10: [3,6]]

Output:
```
3×2
```

### TIME COMPLEXITY:
O(m × n)
- Must visit every element once

### SPACE COMPLEXITY:
O(m × n)
- Need to create new matrix of same total size (different dimensions)

### EDGE CASES:
- Square matrix (n×n): Transpose is also n×n
- Single row: Becomes single column
- Single column: Becomes single row
- Single cell: Unchanged [[1]] → [[1]]

</details>
"""


class Solution:
    def transpose(self, matrix: list[list[int]]) -> list[list[int]]:
        """
        Return transpose of matrix by swapping rows and columns.

        Args:
            matrix: m × n matrix

        Returns:
            Transposed n × m matrix

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(matrix), len(matrix[0])

        # Create result with swapped dimensions
        result = [[0] * m for _ in range(n)]

        # Map each element to transposed position
        for i in range(m):
            for j in range(n):
                result[j][i] = matrix[i][j]

        return result

    def transposeZip(self, matrix: list[list[int]]) -> list[list[int]]:
        """
        Pythonic approach using zip.

        zip(*matrix) unpacks rows and zips them into columns.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        return [list(row) for row in zip(*matrix, strict=False)]

    def transposeComprehension(self, matrix: list[list[int]]) -> list[list[int]]:
        """
        List comprehension approach.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(matrix), len(matrix[0])
        return [[matrix[i][j] for i in range(m)] for j in range(n)]

    def transposeInPlace(self, matrix: list[list[int]]) -> list[list[int]]:
        """
        In-place transpose for square matrices only.

        Swaps elements across main diagonal.
        Note: This modifies input and only works for square matrices.

        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(matrix)

        # Only works if square
        if n != len(matrix[0]):
            return self.transpose(matrix)

        # Swap elements across diagonal
        for i in range(n):
            for j in range(i + 1, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        return matrix

    def transposeOneLiner(self, matrix: list[list[int]]) -> list[list[int]]:
        """
        Ultra-compact one-liner.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        return list(map(list, zip(*matrix, strict=False)))


def test_solution() -> None:
    """Test cases for Problem 867."""
    solution = Solution()

    # Test case 1: 3×3 square matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected1 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    assert solution.transpose(matrix1) == expected1, "Test case 1 failed"

    # Test case 2: 2×3 rectangular matrix
    matrix2 = [[1, 2, 3], [4, 5, 6]]
    expected2 = [[1, 4], [2, 5], [3, 6]]
    assert solution.transpose(matrix2) == expected2, "Test case 2 failed"

    # Test case 3: Single row
    matrix3 = [[1, 2, 3]]
    expected3 = [[1], [2], [3]]
    assert solution.transpose(matrix3) == expected3, "Test case 3 failed"

    # Test case 4: Single column
    matrix4 = [[1], [2], [3]]
    expected4 = [[1, 2, 3]]
    assert solution.transpose(matrix4) == expected4, "Test case 4 failed"

    # Test case 5: Single cell
    matrix5 = [[5]]
    expected5 = [[5]]
    assert solution.transpose(matrix5) == expected5, "Test case 5 failed"

    # Test case 6: 2×2 square
    matrix6 = [[1, 2], [3, 4]]
    expected6 = [[1, 3], [2, 4]]
    assert solution.transpose(matrix6) == expected6, "Test case 6 failed"

    # Test case 7: 4×2 matrix
    matrix7 = [[1, 2], [3, 4], [5, 6], [7, 8]]
    expected7 = [[1, 3, 5, 7], [2, 4, 6, 8]]
    assert solution.transpose(matrix7) == expected7, "Test case 7 failed"

    # Test zip method
    matrix8 = [[1, 2, 3], [4, 5, 6]]
    expected8 = [[1, 4], [2, 5], [3, 6]]
    assert solution.transposeZip(matrix8) == expected8, "Zip method failed"

    # Test comprehension method
    matrix9 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    expected9 = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    assert solution.transposeComprehension(matrix9) == expected9, "Comprehension method failed"

    # Test one-liner method
    matrix10 = [[1, 2], [3, 4]]
    expected10 = [[1, 3], [2, 4]]
    assert solution.transposeOneLiner(matrix10) == expected10, "One-liner method failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 867. Transpose Matrix ===\n")

    # Example 1: Square matrix
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print("Original matrix (3×3):")
    for row in matrix1:
        print(row)
    result1 = solution.transpose(matrix1)
    print("\nTransposed:")
    for row in result1:
        print(row)
    print()

    # Example 2: Rectangular matrix
    matrix2 = [[1, 2, 3], [4, 5, 6]]
    print("Original matrix (2×3):")
    for row in matrix2:
        print(row)
    result2 = solution.transpose(matrix2)
    print("\nTransposed (3×2):")
    for row in result2:
        print(row)
    print()

    # Example 3: Demonstrate different methods
    matrix3 = [[1, 2], [3, 4], [5, 6]]
    print("Original matrix (3×2):")
    for row in matrix3:
        print(row)

    print("\nMethod 1 (Standard):")
    result3a = solution.transpose(matrix3)
    for row in result3a:
        print(row)

    print("\nMethod 2 (Zip):")
    result3b = solution.transposeZip([[1, 2], [3, 4], [5, 6]])
    for row in result3b:
        print(row)

    print("\nMethod 3 (List Comprehension):")
    result3c = solution.transposeComprehension([[1, 2], [3, 4], [5, 6]])
    for row in result3c:
        print(row)

    print("\nMethod 4 (One-liner):")
    result3d = solution.transposeOneLiner([[1, 2], [3, 4], [5, 6]])
    for row in result3d:
        print(row)

    # Visualize transformation
    print("\n=== Transformation Visualization ===")
    print("Row → Column mapping:")
    print("Row 0: [1,2] → Column 0: [1,3,5]")
    print("                Column 1: [2,4,6]")
    print("Row 1: [3,4]")
    print("Row 2: [5,6]")
