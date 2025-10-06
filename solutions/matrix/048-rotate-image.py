"""
48. Rotate Image
Medium

Given an n x n 2D `matrix` representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image `in-place`, which means you have to modify the input 2D `matrix` directly.
DO NOT allocate another 2D `matrix` and do the rotation.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To rotate a matrix 90 degrees clockwise `in-place`, we can use a two-step approach:
1. Transpose the matrix (swap rows and columns)
2. Reverse each row

### APPROACH:
1. **Transpose**: Convert matrix[i][j] to matrix[j][i]
2. **Reverse rows**: Reverse each row to complete the clockwise rotation

### WHY THIS WORKS:
- Transposing flips the matrix along its diagonal
- Reversing rows completes the 90-degree clockwise rotation
- This achieves the rotation without using extra space

### EXAMPLE WALKTHROUGH:
```
Original:    Transpose:   Reverse rows:
[1,2,3]      [1,4,7]      [7,4,1]
[4,5,6]  ->  [2,5,8]  ->  [8,5,2]
[7,8,9]      [3,6,9]      [9,6,3]
```

### COMPLEXITY:
- Time: O(n²) - visit each element twice
- Space: O(1) - in-place rotation

</details>
"""

def rotate(matrix):
    """
    Rotate the image by 90 degrees (clockwise) in-place.

    Args:
        matrix: List[List[int]] - n x n 2D matrix representing the image

    Returns:
        None - modifies matrix in-place
    """
    n = len(matrix)

    # Step 1: Transpose the matrix (swap rows and columns)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Step 2: Reverse each row
    for i in range(n):
        matrix[i].reverse()


def test_rotate():
    """Test cases for rotate image."""
    # Test case 1: 3x3 matrix
    matrix1 = [[1,2,3],[4,5,6],[7,8,9]]
    rotate(matrix1)
    expected1 = [[7,4,1],[8,5,2],[9,6,3]]
    assert matrix1 == expected1, f"Test 1 failed: expected {expected1}, got {matrix1}"

    # Test case 2: 4x4 matrix
    matrix2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
    rotate(matrix2)
    expected2 = [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
    assert matrix2 == expected2, f"Test 2 failed: expected {expected2}, got {matrix2}"

    # Test case 3: 1x1 matrix
    matrix3 = [[1]]
    rotate(matrix3)
    expected3 = [[1]]
    assert matrix3 == expected3, f"Test 3 failed: expected {expected3}, got {matrix3}"

    # Test case 4: 2x2 matrix
    matrix4 = [[1,2],[3,4]]
    rotate(matrix4)
    expected4 = [[3,1],[4,2]]
    assert matrix4 == expected4, f"Test 4 failed: expected {expected4}, got {matrix4}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_rotate()