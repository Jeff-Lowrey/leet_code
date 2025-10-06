"""
73. Set Matrix Zeroes
Medium

Given an m x `n` integer `matrix`, if an element is 0, `set` its entire row and column to 0's.

You must do it in place.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to mark which rows and columns should be zeroed without using extra space.
We can use the first row and first column as markers.

### APPROACH:
1. **Check if first `row/column` have zeros**: Store this information
2. **Use first `row/column` as markers**: Mark which `rows/columns` need to be zeroed
3. **Zero marked `rows/columns`**: Set elements to zero based on markers
4. **Handle first `row/column`**: Zero them if they originally had zeros

### WHY THIS WORKS:
- The first row and column serve as storage for which rows/columns to zero
- We handle the first row/column separately to avoid conflicts
- This achieves O(1) space complexity

### EXAMPLE WALKTHROUGH:
```
Input:           After marking:    After zeroing:
[1,1,1]          [1,0,1]          [1,0,1]
[1,0,1]     ->   [0,0,1]     ->   [0,0,0]
[1,1,1]          [1,0,1]          [1,0,1]
```

### COMPLEXITY:
- Time: O(m*n) - visit each element twice
- Space: O(1) - only using input matrix for storage

</details>
"""

def setZeroes(matrix):
    """
    Set entire rows and columns to 0 if an element is 0.

    Args:
        matrix: List[List[int]] - m x n integer matrix

    Returns:
        None - modifies matrix in-place
    """
    if not matrix or not matrix[0]:
        return

    m, n = len(matrix), len(matrix[0])

    # Check if first row and first column have zeros
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Use first row and column as markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0  # Mark row
                matrix[0][j] = 0  # Mark column

    # Zero out marked rows and columns
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


def test_setZeroes():
    """Test cases for set matrix zeros."""
    # Test case 1: Standard case
    matrix1 = [[1,1,1],[1,0,1],[1,1,1]]
    setZeroes(matrix1)
    expected1 = [[1,0,1],[0,0,0],[1,0,1]]
    assert matrix1 == expected1, f"Test 1 failed: expected {expected1}, got {matrix1}"

    # Test case 2: Multiple zeros
    matrix2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
    setZeroes(matrix2)
    expected2 = [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
    assert matrix2 == expected2, f"Test 2 failed: expected {expected2}, got {matrix2}"

    # Test case 3: All zeros
    matrix3 = [[0,0],[0,0]]
    setZeroes(matrix3)
    expected3 = [[0,0],[0,0]]
    assert matrix3 == expected3, f"Test 3 failed: expected {expected3}, got {matrix3}"

    # Test case 4: No zeros
    matrix4 = [[1,2],[3,4]]
    setZeroes(matrix4)
    expected4 = [[1,2],[3,4]]
    assert matrix4 == expected4, f"Test 4 failed: expected {expected4}, got {matrix4}"

    # Test case 5: Single element matrix with zero
    matrix5 = [[0]]
    setZeroes(matrix5)
    expected5 = [[0]]
    assert matrix5 == expected5, f"Test 5 failed: expected {expected5}, got {matrix5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_setZeroes()