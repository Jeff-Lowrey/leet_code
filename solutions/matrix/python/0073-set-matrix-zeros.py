"""
# Difficulty: Medium

# 073. Set Matrix Zeroes

Given an m x n matrix, if an element is 0, set its entire row and column to 0 in-place.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 1, 1], [1, 0, 1], [1, 1, 1]]</dd>
<dt>Output:</dt>
<dd>[[1, 0, 1], [0, 0, 0], [1, 0, 1]]</dd>
<dt>Explanation:</dt>
<dd>Matrix with zeros: element at [1][1] is 0, so row 1 and column 1 become all zeros</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: In-Place Modification, State Tracking
**Data Structures**: Matrix, Array
**Patterns**: Space Optimization, Two-Pass Algorithm
**Time Complexity**: O(m × n) - Two passes through matrix
**Space Complexity**: O(1) - Uses first row/column as markers


### INTUITION:
Use the first row and first column as marker arrays to track which rows/columns should be zeroed.
Need separate flags for first row/column since they overlap at [0][0].


### APPROACH:
1. **Track first row/column**: Check if they initially contain zeros
2. **Mark using first row/column**: Use matrix[i][0] and matrix[0][j] as markers
3. **Zero based on markers**: Set cells to zero based on markers in first row/column
4. **Handle first row/column**: Zero them separately if needed based on flags


### WHY THIS WORKS:
- First row/column serve as marker arrays (no extra space needed)
- Original zero positions are preserved in markers
- In-place modification requires no extra O(m+n) space
- Process order prevents overwriting needed markers


### EXAMPLE WALKTHROUGH:
```
Input: [[1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]]

Step 1: Check first row/col
  - firstRowHasZero = False
  - firstColHasZero = False

Step 2: Mark using first row/col
  - Found 0 at [1][1]
  - Set matrix[1][0] = 0 (mark row 1)
  - Set matrix[0][1] = 0 (mark column 1)

Step 3: Zero based on markers
  - matrix[1][1] = 0 (row 1 marked, col 1 marked)
  - matrix[0][1] = 0 (col 1 marked)
  - matrix[2][1] = 0 (col 1 marked)
  - matrix[1][0] = 0 (row 1 marked)
  - matrix[1][2] = 0 (row 1 marked)

Output: [[1, 0, 1],
         [0, 0, 0],
         [1, 0, 1]]
```


### TIME COMPLEXITY:
O(m × n) - Two passes through matrix


### SPACE COMPLEXITY:
O(1) - Only uses two boolean flags for first row/column


### EDGE CASES:
- First row/column contains zeros
- Single row or column matrix
- All zeros or no zeros
- 1×1 matrix

</details>
"""


def solve(matrix: list[list[int]]) -> None:
    """
    Main solution for Problem 073: Set Matrix Zeroes

    Args:
        matrix: m x n matrix to modify in-place

    Returns:
        None - Modifies matrix in-place

    Time Complexity: O(m × n) - Two passes through matrix
    Space Complexity: O(1) - Uses first row/column as markers
    """
    if not matrix or not matrix[0]:
        return

    m = len(matrix)
    n = len(matrix[0])
    first_row_has_zero = False
    first_col_has_zero = False

    # Check if first row has any zeros
    for j in range(n):
        if matrix[0][j] == 0:
            first_row_has_zero = True
            break

    # Check if first column has any zeros
    for i in range(m):
        if matrix[i][0] == 0:
            first_col_has_zero = True
            break

    # Use first row and column as markers
    # If matrix[i][j] is 0, mark matrix[i][0] and matrix[0][j] as 0
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Set zeros based on markers (skip first row and column)
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row
    if first_row_has_zero:
        for j in range(n):
            matrix[0][j] = 0

    # Handle first column
    if first_col_has_zero:
        for i in range(m):
            matrix[i][0] = 0


def test_solution() -> None:
    """Test cases for Problem 073: Set Matrix Zeroes"""
    print("Testing 073. Set Matrix Zeroes")

    # Helper function to compare matrices
    def matrices_equal(mat1: list[list[int]], mat2: list[list[int]]) -> bool:
        if len(mat1) != len(mat2):
            return False
        for i in range(len(mat1)):
            if len(mat1[i]) != len(mat2[i]):
                return False
            for j in range(len(mat1[i])):
                if mat1[i][j] != mat2[i][j]:
                    return False
        return True

    # Test case 1: Standard case
    matrix1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    expected1 = [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
    solve(matrix1)
    assert matrices_equal(matrix1, expected1), "Test 1 failed"

    # Test case 2: Multiple zeros
    matrix2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    expected2 = [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
    solve(matrix2)
    assert matrices_equal(matrix2, expected2), "Test 2 failed"

    # Test case 3: First row has zero
    matrix3 = [[0, 1], [1, 1]]
    expected3 = [[0, 0], [0, 1]]
    solve(matrix3)
    assert matrices_equal(matrix3, expected3), "Test 3 failed"

    # Test case 4: First column has zero
    matrix4 = [[1, 1, 1], [0, 1, 1]]
    expected4 = [[0, 1, 1], [0, 0, 0]]
    solve(matrix4)
    assert matrices_equal(matrix4, expected4), "Test 4 failed"

    # Test case 5: All zeros
    matrix5 = [[0, 0], [0, 0]]
    expected5 = [[0, 0], [0, 0]]
    solve(matrix5)
    assert matrices_equal(matrix5, expected5), "Test 5 failed"

    # Test case 6: No zeros
    matrix6 = [[1, 2], [3, 4]]
    expected6 = [[1, 2], [3, 4]]
    solve(matrix6)
    assert matrices_equal(matrix6, expected6), "Test 6 failed"

    # Test case 7: Single element - zero
    matrix7 = [[0]]
    expected7 = [[0]]
    solve(matrix7)
    assert matrices_equal(matrix7, expected7), "Test 7 failed"

    # Test case 8: Single element - non-zero
    matrix8 = [[1]]
    expected8 = [[1]]
    solve(matrix8)
    assert matrices_equal(matrix8, expected8), "Test 8 failed"

    print("All test cases passed for 073. Set Matrix Zeroes!")


def demonstrate_solution() -> None:
    """Example usage and demonstration"""
    print("\n=== Problem 073. Set Matrix Zeroes ===")
    print("Category: Matrix")
    print("Difficulty: Medium")
    print()

    # Example demonstration
    test_solution()


if __name__ == "__main__":
    demonstrate_solution()


"""
Additional Notes:
- In-place modification requires careful state tracking
- Using first row/column as markers avoids O(m+n) space
- Order of operations is critical to avoid overwriting markers
- Alternative O(m+n) space solution uses separate marker arrays
"""
