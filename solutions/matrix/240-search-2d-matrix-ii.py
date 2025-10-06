"""
240. Search a 2D Matrix II
Medium

Write an efficient algorithm that searches for a value target in an m x n integer matrix.
This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Unlike the previous matrix search problem, this matrix is only sorted row-wise and column-wise,
but rows don't have the property where first element > last element of previous row.
We can use the sorted properties to eliminate entire rows/columns efficiently.

### APPROACH:
1. **Start from top-right corner** (or bottom-left): This gives us optimal elimination
2. **Compare with target**:
   - If current > target: move left (eliminate current column)
   - If current < target: move down (eliminate current row)
   - If current == target: found it!
3. **Continue until out of bounds or found**

### WHY THIS WORKS:
- Starting from top-right: all elements left are smaller, all elements down are larger
- This allows us to eliminate entire rows/columns in each step
- Time complexity becomes O(m+n) instead of O(m*n)

### EXAMPLE WALKTHROUGH:
```
Matrix: [[1,4,7,11,15],
         [2,5,8,12,19],
         [3,6,9,16,22],
         [10,13,14,17,24],
         [18,21,23,26,30]]
Target: 5

Start at (0,4): 15 > 5, move left
At (0,3): 11 > 5, move left
At (0,2): 7 > 5, move left
At (0,1): 4 < 5, move down
At (1,1): 5 == 5, found!
```

### COMPLEXITY:
- Time: O(m+n) - visit at most m+n cells
- Space: O(1) - only using two pointers

</details>
"""

def searchMatrix(matrix, target):
    """
    Search for target in a sorted 2D matrix (row and column sorted).

    Args:
        matrix: List[List[int]] - m x n matrix with row/column sorted properties
        target: int - target value to search for

    Returns:
        bool - True if target is found, False otherwise
    """
    if not matrix or not matrix[0]:
        return False

    m, n = len(matrix), len(matrix[0])

    # Start from top-right corner
    row, col = 0, n - 1

    while row < m and col >= 0:
        current = matrix[row][col]

        if current == target:
            return True
        elif current > target:
            # Current is too large, move left
            col -= 1
        else:
            # Current is too small, move down
            row += 1

    return False


def test_searchMatrix():
    """Test cases for search 2D matrix II."""
    # Test case 1: Target found
    matrix1 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
    assert searchMatrix(matrix1, 5) == True, "Test 1a failed"
    assert searchMatrix(matrix1, 11) == True, "Test 1b failed"
    assert searchMatrix(matrix1, 30) == True, "Test 1c failed"
    assert searchMatrix(matrix1, 1) == True, "Test 1d failed"

    # Test case 2: Target not found
    matrix2 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]
    assert searchMatrix(matrix2, 20) == False, "Test 2a failed"
    assert searchMatrix(matrix2, 0) == False, "Test 2b failed"
    assert searchMatrix(matrix2, 100) == False, "Test 2c failed"

    # Test case 3: Single element matrix
    matrix3 = [[5]]
    assert searchMatrix(matrix3, 5) == True, "Test 3a failed"
    assert searchMatrix(matrix3, 6) == False, "Test 3b failed"

    # Test case 4: Single row matrix
    matrix4 = [[1,3,5]]
    assert searchMatrix(matrix4, 3) == True, "Test 4a failed"
    assert searchMatrix(matrix4, 4) == False, "Test 4b failed"

    # Test case 5: Single column matrix
    matrix5 = [[1],[3],[5]]
    assert searchMatrix(matrix5, 3) == True, "Test 5a failed"
    assert searchMatrix(matrix5, 4) == False, "Test 5b failed"

    # Test case 6: Empty matrix
    assert searchMatrix([], 1) == False, "Test 6a failed"
    assert searchMatrix([[]], 1) == False, "Test 6b failed"

    # Test case 7: Duplicates
    matrix7 = [[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7]]
    assert searchMatrix(matrix7, 3) == True, "Test 7a failed"
    assert searchMatrix(matrix7, 8) == False, "Test 7b failed"

    # Test case 8: Larger matrix with edge cases
    matrix8 = [[-5]]
    assert searchMatrix(matrix8, -5) == True, "Test 8a failed"
    assert searchMatrix(matrix8, -10) == False, "Test 8b failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_searchMatrix()