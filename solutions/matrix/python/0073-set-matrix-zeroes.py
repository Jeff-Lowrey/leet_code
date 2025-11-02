"""
# Difficulty: Medium

# 0073. Set Matrix Zeroes

Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 1, 1]]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Matrix with zeros: [[1,1,1],[1,0,1],[1,1,1]] becomes [[1,0,1],[0,0,0],[1,0,1]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Set, Array, Matrix
**Patterns**: Iterative Solution
**Time Complexity**: O(m × n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Cannot modify matrix while iterating as it affects future decisions. Need to mark which rows/columns to zero without extra space. Use first row and first column as markers!

### APPROACH:
1. **Use first row/column as markers**: First row tracks column zeros, first column tracks row zeros
2. **Handle first row/column separately**: Use separate flags since they overlap
3. **Mark zeros**: Iterate matrix, set markers in first row/column when zero found
4. **Apply zeros**: Use markers to set zeros (skip first row/column initially)
5. **Handle first row/column**: Apply zeros based on flags

### WHY THIS WORKS:
- First row/column serve as O(1) space markers
- By processing them last, we don't lose information
- Separate flags handle the overlap at matrix[0][0]

### EXAMPLE WALKTHROUGH:
Input:
```
[[1, 1, 1]
```

Input:
```
[1, 1, 1]
```

[1, 0, 1]
[1, 1, 1]
Step 1 - Mark:
first_row = False, first_col = False
After marking: matrix[1][0] = 0, matrix[0][1] = 0
Step 2 - Apply based on markers:

Steps:
Step 1: Column 1 has marker -> zero column 1
Step 2: Row 1 has marker -> zero row 1

Output:
```
[1, 0, 1]
[0, 0, 0]
[1, 0, 1]
```

### TIME COMPLEXITY:
O(m × n)
Two passes through the matrix

### SPACE COMPLEXITY:
O(1)
Only using two boolean flags

### EDGE CASES:
- Single element
- First row/column contains zeros
- All zeros
- No zeros
- Single row or single column

</details>
"""

from typing import Any


class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        """
        Set entire rows and columns to zero if element is zero (in-place).

        Args:
            matrix: m x n matrix to modify in-place

        Returns:
            None (modifies matrix in-place)

        Time Complexity: O(m × n)
        Space Complexity: O(1)
        """
        if not matrix or not matrix[0]:
            return

        m, n = len(matrix), len(matrix[0])

        # Flags to track if first row/column should be zeroed
        first_row_zero = False
        first_col_zero = False

        # Check if first row contains zero
        for j in range(n):
            if matrix[0][j] == 0:
                first_row_zero = True
                break

        # Check if first column contains zero
        for i in range(m):
            if matrix[i][0] == 0:
                first_col_zero = True
                break

        # Use first row and column as markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0  # Mark row
                    matrix[0][j] = 0  # Mark column

        # Set zeros based on markers (skip first row/column for now)
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        # Handle first row
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0

        # Handle first column
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0

    def setZeroesExtraSpace(self, matrix: list[list[int]]) -> None:
        """
        Alternative approach using O(m+n) extra space.

        Args:
            matrix: m x n matrix to modify in-place

        Time Complexity: O(m × n)
        Space Complexity: O(m + n)
        """
        if not matrix or not matrix[0]:
            return

        m, n = len(matrix), len(matrix[0])

        # Track which rows and columns need to be zeroed
        zero_rows: set[Any] = set()
        zero_cols: set[Any] = set()

        # Find all zeros
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    zero_rows.add(i)
                    zero_cols.add(j)

        # Set rows to zero
        for i in zero_rows:
            for j in range(n):
                matrix[i][j] = 0

        # Set columns to zero
        for j in zero_cols:
            for i in range(m):
                matrix[i][j] = 0

    def setZeroesCompact(self, matrix: list[list[int]]) -> None:
        """
        More compact implementation of O(1) space solution.

        Args:
            matrix: m x n matrix to modify in-place

        Time Complexity: O(m × n)
        Space Complexity: O(1)
        """
        if not matrix:
            return

        m, n = len(matrix), len(matrix[0])
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))

        # Use first row/column as markers
        for i in range(m):
            for j in range(n):
                if matrix[i][j] == 0:
                    matrix[0][j] = 0
                    if j != 0:
                        matrix[i][0] = 0

        # Set zeros (skip first column initially)
        for i in range(1, m):
            for j in range(1, n):
                if matrix[0][j] == 0 or matrix[i][0] == 0:
                    matrix[i][j] = 0

        # Handle first row
        if matrix[0][0] == 0:
            for j in range(n):
                matrix[0][j] = 0

        # Handle first column
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0


def test_solution() -> None:
    """Test cases for Problem 73."""
    solution = Solution()

    # Test case 1: Basic example
    matrix1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    solution.setZeroes(matrix1)
    expected1 = [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
    assert matrix1 == expected1, f"Expected {expected1}, got {matrix1}"
    print("Test case 1 passed")

    # Test case 2: Multiple zeros
    matrix2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    solution.setZeroes(matrix2)
    expected2 = [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
    assert matrix2 == expected2, f"Expected {expected2}, got {matrix2}"
    print("Test case 2 passed")

    # Test case 3: Single element (zero)
    matrix3 = [[0]]
    solution.setZeroes(matrix3)
    assert matrix3 == [[0]]
    print("Test case 3 passed")

    # Test case 4: Single element (non-zero)
    matrix4 = [[1]]
    solution.setZeroes(matrix4)
    assert matrix4 == [[1]]
    print("Test case 4 passed")

    # Test case 5: Single row
    matrix5 = [[1, 0, 3]]
    solution.setZeroes(matrix5)
    assert matrix5 == [[0, 0, 0]]
    print("Test case 5 passed")

    # Test case 6: Single column
    matrix6 = [[1], [0], [3]]
    solution.setZeroes(matrix6)
    assert matrix6 == [[0], [0], [0]]
    print("Test case 6 passed")

    # Test case 7: No zeros
    matrix7 = [[1, 2, 3], [4, 5, 6]]
    solution.setZeroes(matrix7)
    assert matrix7 == [[1, 2, 3], [4, 5, 6]]
    print("Test case 7 passed")

    # Test case 8: All zeros
    matrix8 = [[0, 0], [0, 0]]
    solution.setZeroes(matrix8)
    assert matrix8 == [[0, 0], [0, 0]]
    print("Test case 8 passed")

    # Test case 9: First row zero
    matrix9 = [[0, 1], [1, 1]]
    solution.setZeroes(matrix9)
    assert matrix9 == [[0, 0], [0, 1]]
    print("Test case 9 passed")

    # Test case 10: First column zero
    matrix10 = [[1, 1], [0, 1]]
    solution.setZeroes(matrix10)
    assert matrix10 == [[1, 1], [0, 0]]
    print("Test case 10 passed")

    # Test extra space solution
    matrix11 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    solution.setZeroesExtraSpace(matrix11)
    assert matrix11 == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
    print("Test case 11 passed: Extra space solution")

    # Test compact solution
    matrix12 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    solution.setZeroesCompact(matrix12)
    assert matrix12 == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
    print("Test case 12 passed: Compact solution")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 73. Set Matrix Zeroes ===")

    matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    print("\nOriginal matrix:")
    for row in matrix:
        print(row)

    solution.setZeroes(matrix)
    print("\nAfter setZeroes:")
    for row in matrix:
        print(row)

    matrix2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    print("\n\nOriginal matrix:")
    for row in matrix2:
        print(row)

    solution.setZeroes(matrix2)
    print("\nAfter setZeroes:")
    for row in matrix2:
        print(row)
