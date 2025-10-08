"""
# 240. Search a 2D Matrix II
**Staircase Search**

Search for a target in an m x n matrix with sorted rows and columns.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Start from top-right corner (or bottom-left). The position acts as a pivot:
- Values to the left are smaller
- Values below are larger

This creates a staircase search pattern with O(m+n) complexity.

### APPROACH:
1. **Start at top-right**: Position (0, n-1)
2. **Compare with target**:
   - If equal: found, return True
   - If greater: move left (eliminate column)
   - If smaller: move down (eliminate row)
3. **Continue until**: Found or out of bounds

### WHY THIS WORKS:
- Matrix rows and columns are sorted
- Top-right position allows binary-like elimination
- Each step eliminates either a row or column
- No need to search eliminated regions

### TIME COMPLEXITY: O(m + n) - worst case visit m+n cells
### SPACE COMPLEXITY: O(1) - only use constant space

### EXAMPLE WALKTHROUGH:
```
Matrix: [[1,4,7,11,15],
         [2,5,8,12,19],
         [3,6,9,16,22],
         [10,13,14,17,24],
         [18,21,23,26,30]]
Target: 5

Step 1: Start (0,4) = 15 > 5 → move left
Step 2: At (0,3) = 11 > 5 → move left
Step 3: At (0,2) = 7 > 5 → move left
Step 4: At (0,1) = 4 < 5 → move down
Step 5: At (1,1) = 5 = 5 → found!
```

### EDGE CASES:
- Empty matrix
- Single row or column
- Target not in matrix
- Target at corners

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses staircase search from top-right corner.

### Algorithm Steps:
1. Start at top-right corner (0, n-1)
2. Compare current value with target
3. Move left if current > target
4. Move down if current < target
5. Return True if found, False if out of bounds

</details>
"""


class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        """
        Search for target in sorted matrix using staircase search.

        Args:
            matrix: m x n matrix with sorted rows and columns
            target: Value to search for

        Returns:
            True if target found, False otherwise

        Time Complexity: O(m + n)
        Space Complexity: O(1)
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
                # Target must be to the left
                col -= 1
            else:
                # Target must be below
                row += 1

        return False

    # Alias for consistent interface
    solve = searchMatrix


def test_solution():
    """
    Test cases for 240. Search a 2D Matrix II.
    """
    solution = Solution()

    # Test case 1: Target exists in matrix
    matrix1 = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
    assert solution.searchMatrix(matrix1, 5) == True, "Test case 1 failed"
    print("Test case 1 passed: Target exists")

    # Test case 2: Target does not exist
    matrix2 = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
    assert solution.searchMatrix(matrix2, 20) == False, "Test case 2 failed"
    print("Test case 2 passed: Target does not exist")

    # Test case 3: Target at top-left corner
    matrix3 = [[1, 4], [2, 5]]
    assert solution.searchMatrix(matrix3, 1) == True, "Test case 3 failed"
    print("Test case 3 passed: Target at top-left")

    # Test case 4: Target at bottom-right corner
    matrix4 = [[1, 4], [2, 5]]
    assert solution.searchMatrix(matrix4, 5) == True, "Test case 4 failed"
    print("Test case 4 passed: Target at bottom-right")

    # Test case 5: Target at top-right corner
    matrix5 = [[1, 4], [2, 5]]
    assert solution.searchMatrix(matrix5, 4) == True, "Test case 5 failed"
    print("Test case 5 passed: Target at top-right")

    # Test case 6: Target at bottom-left corner
    matrix6 = [[1, 4], [2, 5]]
    assert solution.searchMatrix(matrix6, 2) == True, "Test case 6 failed"
    print("Test case 6 passed: Target at bottom-left")

    # Test case 7: Single element matrix - found
    matrix7 = [[5]]
    assert solution.searchMatrix(matrix7, 5) == True, "Test case 7 failed"
    print("Test case 7 passed: Single element found")

    # Test case 8: Single element matrix - not found
    matrix8 = [[5]]
    assert solution.searchMatrix(matrix8, 1) == False, "Test case 8 failed"
    print("Test case 8 passed: Single element not found")

    # Test case 9: Single row matrix
    matrix9 = [[1, 3, 5, 7, 9]]
    assert solution.searchMatrix(matrix9, 5) == True, "Test case 9 failed"
    assert solution.searchMatrix(matrix9, 6) == False, "Test case 9 failed"
    print("Test case 9 passed: Single row matrix")

    # Test case 10: Single column matrix
    matrix10 = [[1], [3], [5], [7], [9]]
    assert solution.searchMatrix(matrix10, 5) == True, "Test case 10 failed"
    assert solution.searchMatrix(matrix10, 6) == False, "Test case 10 failed"
    print("Test case 10 passed: Single column matrix")

    # Test case 11: Target smaller than all elements
    matrix11 = [[5, 6], [7, 8]]
    assert solution.searchMatrix(matrix11, 1) == False, "Test case 11 failed"
    print("Test case 11 passed: Target smaller than all")

    # Test case 12: Target larger than all elements
    matrix12 = [[5, 6], [7, 8]]
    assert solution.searchMatrix(matrix12, 10) == False, "Test case 12 failed"
    print("Test case 12 passed: Target larger than all")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample: Searching in 2D matrix")
    matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
    print("Matrix:")
    for row in matrix:
        print(row)
    print(f"\nSearch for 5: {solution.searchMatrix(matrix, 5)}")
    print(f"Search for 20: {solution.searchMatrix(matrix, 20)}")
    print(f"Search for 15: {solution.searchMatrix(matrix, 15)}")
