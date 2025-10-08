"""
# 073. Set Matrix Zeroes
**In-Place Marking**

Given an m x n matrix, if an element is 0, set its entire row and column to 0 in-place.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use the first row and first column as markers to track which rows/columns should be zeroed.
Need separate flags for first row/column since they overlap at [0][0].

### APPROACH:
1. **Check first row/col**: Track if they contain zeros initially
2. **Mark using first row/col**: Use matrix[i][0] and matrix[0][j] as markers
3. **Zero based on markers**: Set cells to zero based on markers
4. **Handle first row/col**: Zero them separately if needed

### WHY THIS WORKS:
- First row/column serve as marker arrays
- Original zero positions are preserved in markers
- In-place modification requires no extra space
- Process order prevents overwriting needed markers

### TIME COMPLEXITY: O(m * n) - scan matrix twice
### SPACE COMPLEXITY: O(1) - only use constant extra space

### EXAMPLE WALKTHROUGH:
```
Input: [[1,1,1],
        [1,0,1],
        [1,1,1]]

Step 1: Mark - matrix[1][0] = 0, matrix[0][1] = 0
Step 2: Zero based on markers
Step 3: Result [[1,0,1],
                [0,0,0],
                [1,0,1]]
```

### EDGE CASES:
- First row/column contains zeros
- Single row or column matrix
- All zeros or no zeros
- 1x1 matrix

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses first row/column as marker arrays for O(1) space.

### Algorithm Steps:
1. Check if first row/column should be zeroed
2. Use first row/column to mark zero positions
3. Zero cells based on markers
4. Handle first row/column separately

</details>
"""


class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        """
        Set entire row and column to zero for each zero element.

        Args:
            matrix: m x n matrix

        Returns:
            None (modifies matrix in-place)

        Time Complexity: O(m * n)
        Space Complexity: O(1)
        """
        if not matrix:
            return

        m, n = len(matrix), len(matrix[0])

        # Check if first row and first column need to be zeroed
        first_row_zero = any(matrix[0][j] == 0 for j in range(n))
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))

        # Use first row and column as markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        # Zero out cells based on markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        # Zero out first row if needed
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0

        # Zero out first column if needed
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0

    # Alias for consistent interface
    solve = setZeroes


def test_solution():
    """
    Test cases for 073. Set Matrix Zeroes.
    """
    solution = Solution()

    # Test case 1: Basic 3x3 with one zero
    matrix1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    expected1 = [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
    solution.setZeroes(matrix1)
    assert matrix1 == expected1, f"Test case 1 failed: expected {expected1}, got {matrix1}"
    print("Test case 1 passed: 3x3 with one zero")

    # Test case 2: Multiple zeros
    matrix2 = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    expected2 = [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]
    solution.setZeroes(matrix2)
    assert matrix2 == expected2, f"Test case 2 failed: expected {expected2}, got {matrix2}"
    print("Test case 2 passed: Multiple zeros")

    # Test case 3: Zero in first row
    matrix3 = [[0, 1], [2, 3]]
    expected3 = [[0, 0], [0, 3]]
    solution.setZeroes(matrix3)
    assert matrix3 == expected3, f"Test case 3 failed: expected {expected3}, got {matrix3}"
    print("Test case 3 passed: Zero in first row")

    # Test case 4: Zero in first column
    matrix4 = [[1, 2], [0, 3]]
    expected4 = [[0, 2], [0, 0]]  # First column gets zeroed, so top-left becomes 0
    solution.setZeroes(matrix4)
    assert matrix4 == expected4, f"Test case 4 failed: expected {expected4}, got {matrix4}"
    print("Test case 4 passed: Zero in first column")

    # Test case 5: All zeros
    matrix5 = [[0, 0], [0, 0]]
    expected5 = [[0, 0], [0, 0]]
    solution.setZeroes(matrix5)
    assert matrix5 == expected5, f"Test case 5 failed: expected {expected5}, got {matrix5}"
    print("Test case 5 passed: All zeros")

    # Test case 6: No zeros
    matrix6 = [[1, 2, 3], [4, 5, 6]]
    expected6 = [[1, 2, 3], [4, 5, 6]]
    solution.setZeroes(matrix6)
    assert matrix6 == expected6, f"Test case 6 failed: expected {expected6}, got {matrix6}"
    print("Test case 6 passed: No zeros")

    # Test case 7: Single element zero
    matrix7 = [[0]]
    expected7 = [[0]]
    solution.setZeroes(matrix7)
    assert matrix7 == expected7, f"Test case 7 failed: expected {expected7}, got {matrix7}"
    print("Test case 7 passed: Single element zero")

    # Test case 8: Single row with zero
    matrix8 = [[1, 0, 3]]
    expected8 = [[0, 0, 0]]
    solution.setZeroes(matrix8)
    assert matrix8 == expected8, f"Test case 8 failed: expected {expected8}, got {matrix8}"
    print("Test case 8 passed: Single row with zero")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample: Setting matrix zeroes")
    matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    print("Before:")
    for row in matrix:
        print(row)
    solution.setZeroes(matrix)
    print("\nAfter:")
    for row in matrix:
        print(row)
