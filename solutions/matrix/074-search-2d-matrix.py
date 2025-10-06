"""
74. Search a 2D Matrix
Medium

You are given an m x `n` integer `matrix` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer `target`, return true if `target` is in `matrix` or false otherwise.

You must write a solution in O(log(`m` * n)) time complexity.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Since the matrix is sorted both `row-wise` and the first element of each row is greater than
the last element of the previous row, we can treat the entire `matrix` as a single sorted array.
We can use binary search to find the target efficiently.

### APPROACH:
1. **Treat `matrix` as 1D array**: Map 2D indices to 1D and vice versa
2. **Binary search**: Use standard binary search on the "flattened" matrix
3. **Index conversion**:
   - 1D index `i` maps to matrix[i // n][i % n]
   - Where n is the number of columns

### WHY THIS WORKS:
- The matrix properties guarantee it's equivalent to a sorted 1D array
- Binary search gives us O(log(m*n)) time complexity
- Index mapping allows us to work with 2D matrix using 1D logic

### EXAMPLE WALKTHROUGH:
```
Matrix: [[1,4,7,11,15],
         [2,5,8,12,19],
         [3,6,9,16,22],
         [10,13,14,17,24],
         [18,21,23,26,30]]

As 1D: [1,4,7,11,15,2,5,8,12,19,3,6,9,16,22,10,13,14,17,24,18,21,23,26,30]
Wait, this is wrong! The matrix should be `row-sorted` AND each row starts > `previous` row ends.

Correct example:
Matrix: [[1,3,5,7],
         [10,11,16,20],
         [23,30,34,60]]

As 1D: [1,3,5,7,10,11,16,20,23,30,34,60] - fully sorted!
Target 11: Binary search finds it at index 5 → matrix[1][1]
```

### COMPLEXITY:
- Time: O(log(m*n)) - binary search on m*n elements
- Space: O(1) - only using pointers

</details>
"""

def searchMatrix(matrix, target):
    """
    Search for target in a sorted 2D matrix.

    Args:
        matrix: List[List[int]] - m x n matrix with sorted properties
        target: int - target value to search for

    Returns:
        bool - True if target is found, False otherwise
    """
    if not matrix or not matrix[0]:
        return False

    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2

        # Convert 1D index to 2D coordinates
        row = mid // n
        col = mid % n
        mid_val = matrix[row][col]

        if mid_val == target:
            return True
        elif mid_val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False


def test_searchMatrix():
    """Test cases for search 2D matrix."""
    # Test case 1: Target found
    matrix1 = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    assert searchMatrix(matrix1, 3) == True, "Test 1a failed"
    assert searchMatrix(matrix1, 11) == True, "Test 1b failed"
    assert searchMatrix(matrix1, 60) == True, "Test 1c failed"

    # Test case 2: Target not found
    matrix2 = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
    assert searchMatrix(matrix2, 13) == False, "Test 2a failed"
    assert searchMatrix(matrix2, 0) == False, "Test 2b failed"
    assert searchMatrix(matrix2, 100) == False, "Test 2c failed"

    # Test case 3: Single element matrix
    matrix3 = [[1]]
    assert searchMatrix(matrix3, 1) == True, "Test 3a failed"
    assert searchMatrix(matrix3, 2) == False, "Test 3b failed"

    # Test case 4: Single row matrix
    matrix4 = [[1,3,5,7,9]]
    assert searchMatrix(matrix4, 5) == True, "Test 4a failed"
    assert searchMatrix(matrix4, 6) == False, "Test 4b failed"

    # Test case 5: Single column matrix
    matrix5 = [[1],[3],[5]]
    assert searchMatrix(matrix5, 3) == True, "Test 5a failed"
    assert searchMatrix(matrix5, 4) == False, "Test 5b failed"

    # Test case 6: Empty matrix
    assert searchMatrix([], 1) == False, "Test 6 failed"
    assert searchMatrix([[]], 1) == False, "Test 6b failed"

    # Test case 7: Larger matrix
    matrix7 = [
        [1,4,7,11],
        [15,20,25,30],
        [35,40,45,50],
        [55,60,65,70]
    ]
    assert searchMatrix(matrix7, 25) == True, "Test 7a failed"
    assert searchMatrix(matrix7, 14) == False, "Test 7b failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_searchMatrix()