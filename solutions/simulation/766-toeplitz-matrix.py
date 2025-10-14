"""
# Difficulty: Easy

# 766. Toeplitz Matrix

Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.

A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.

Example 1:
Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
Output: true
Explanation:
In the above grid, the diagonals are:
"[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
In each diagonal all elements are the same, so the answer is True.

Example 2:
Input: matrix = [[1,2],[2,2]]
Output: false
Explanation:
The diagonal "[1, 2]" has different elements.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 2, 3, 4]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Matrix [[1,2,3,4],[5,1,2,3],[9,5,1,2]] is Toeplitz (each diagonal has equal elements)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
In a Toeplitz matrix, each diagonal going from top-left to bottom-right contains
identical elements. A key observation: element at (i,j) should equal element at (i+1,j+1).
We can check this property for all valid positions.

### APPROACH:
1. **Simple Check**: For each cell (i,j), compare with (i+1,j+1)
2. **Skip Last Row and Column**: They have no cells to compare with
3. **Early Exit**: Return false as soon as mismatch found
4. **Return True**: If all checks pass

**Key Insight**: Diagonal property
- All elements on same diagonal have property: row - col = constant
- Simpler: matrix[i][j] == matrix[i+1][j+1] for all valid (i,j)

### WHY THIS WORKS:
- If (i,j) == (i+1,j+1) for all cells, then entire diagonals match
- Transitive property: if a==b and b==c, then a==c
- Checking adjacent cells on diagonal ensures entire diagonal is same

### EXAMPLE WALKTHROUGH:
```
matrix = [[1,2,3,4],
          [5,1,2,3],
          [9,5,1,2]]

Check (0,0)==(1,1): 1==1 ✓
Check (0,1)==(1,2): 2==2 ✓
Check (0,2)==(1,3): 3==3 ✓
Check (1,0)==(2,1): 5==5 ✓
Check (1,1)==(2,2): 1==1 ✓
Check (1,2)==(2,3): 2==2 ✓

All checks pass → True
```

### TIME COMPLEXITY:
O(m × n)
- Check each cell once (except last row and column)

### SPACE COMPLEXITY:
O(1)
- Only use constant extra space

### EDGE CASES:
- Single row: Always Toeplitz
- Single column: Always Toeplitz
- Single cell: Always Toeplitz
- 2×2 matrix: Check only (0,0) vs (1,1)

</details>
"""

class Solution:
    def isToeplitzMatrix(self, matrix: list[list[int]]) -> bool:
        """
        Check if matrix is Toeplitz by comparing adjacent diagonal elements.

        Args:
            matrix: m × n matrix

        Returns:
            True if Toeplitz, False otherwise

        Time Complexity: O(m × n)
        Space Complexity: O(1)
        """
        m, n = len(matrix), len(matrix[0])

        # Check each cell with its diagonal neighbor
        for i in range(m - 1):
            for j in range(n - 1):
                if matrix[i][j] != matrix[i + 1][j + 1]:
                    return False

        return True

    def isToeplitzMatrixGrouping(self, matrix: list[list[int]]) -> bool:
        """
        Alternative approach using diagonal grouping.

        Elements on same diagonal have same (row - col) value.

        Time Complexity: O(m × n)
        Space Complexity: O(m + n) for storing diagonal representatives
        """
        m, n = len(matrix), len(matrix[0])
        diagonals = {}

        for i in range(m):
            for j in range(n):
                # Diagonal key: row - col
                diagonal_key = i - j

                if diagonal_key not in diagonals:
                    # First element on this diagonal
                    diagonals[diagonal_key] = matrix[i][j]
                else:
                    # Check if matches first element
                    if diagonals[diagonal_key] != matrix[i][j]:
                        return False

        return True

    def isToeplitzMatrixOneLine(self, matrix: list[list[int]]) -> bool:
        """
        Pythonic one-liner approach.

        Time Complexity: O(m × n)
        Space Complexity: O(1)
        """
        return all(
            matrix[i][j] == matrix[i + 1][j + 1] for i in range(len(matrix) - 1) for j in range(len(matrix[0]) - 1)
        )

    def isToeplitzMatrixStream(self, matrix: list[list[int]]) -> bool:
        """
        Follow-up: What if matrix is stored on disk and memory is limited?

        Solution: Process two rows at a time.

        Time Complexity: O(m × n)
        Space Complexity: O(n) - only need to store previous row
        """
        if not matrix or not matrix[0]:
            return True

        prev_row = matrix[0]

        for curr_row in matrix[1:]:
            # Compare curr_row[1:] with prev_row[:-1]
            if curr_row[1:] != prev_row[:-1]:
                return False
            prev_row = curr_row

        return True

    def isToeplitzMatrixFollowUp(self, matrix: list[list[int]]) -> bool:
        """
        Follow-up optimized version for streaming.

        Only need to check if row[1:] matches previous_row[:-1].

        Time Complexity: O(m × n)
        Space Complexity: O(n)
        """
        for i in range(1, len(matrix)):
            # Current row (excluding first element) should match
            # previous row (excluding last element)
            for j in range(1, len(matrix[0])):
                if matrix[i][j] != matrix[i - 1][j - 1]:
                    return False
        return True

def test_solution():
    """Test cases for Problem 766."""
    solution = Solution()

    # Test case 1: Valid Toeplitz matrix
    matrix1 = [[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]
    assert solution.isToeplitzMatrix(matrix1), "Test case 1 failed"

    # Test case 2: Invalid Toeplitz matrix
    matrix2 = [[1, 2], [2, 2]]
    assert not solution.isToeplitzMatrix(matrix2), "Test case 2 failed"

    # Test case 3: Single row
    matrix3 = [[1, 2, 3, 4]]
    assert solution.isToeplitzMatrix(matrix3), "Test case 3 failed"

    # Test case 4: Single column
    matrix4 = [[1], [2], [3]]
    assert solution.isToeplitzMatrix(matrix4), "Test case 4 failed"

    # Test case 5: Single cell
    matrix5 = [[5]]
    assert solution.isToeplitzMatrix(matrix5), "Test case 5 failed"

    # Test case 6: 2×2 valid
    matrix6 = [[1, 2], [3, 1]]
    assert solution.isToeplitzMatrix(matrix6), "Test case 6 failed"

    # Test case 7: All same values
    matrix7 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    assert solution.isToeplitzMatrix(matrix7), "Test case 7 failed"

    # Test case 8: Large valid matrix
    matrix8 = [[18, 66], [22, 18], [21, 22], [67, 21]]
    assert solution.isToeplitzMatrix(matrix8), "Test case 8 failed"

    # Test grouping method
    matrix9 = [[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]
    assert solution.isToeplitzMatrixGrouping(matrix9), "Grouping method failed"

    # Test one-liner method
    matrix10 = [[1, 2], [2, 2]]
    assert not solution.isToeplitzMatrixOneLine(matrix10), "One-liner method failed"

    # Test stream method
    matrix11 = [[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]
    assert solution.isToeplitzMatrixStream(matrix11), "Stream method failed"

    # Test follow-up method
    matrix12 = [[1, 2], [2, 2]]
    assert not solution.isToeplitzMatrixFollowUp(matrix12), "Follow-up method failed"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 766. Toeplitz Matrix ===\n")

    # Example 1: Valid Toeplitz
    matrix1 = [[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]
    print("Matrix 1:")
    for row in matrix1:
        print(row)
    result1 = solution.isToeplitzMatrix(matrix1)
    print(f"Is Toeplitz: {result1}")
    print("\nDiagonals:")
    print("[9]")
    print("[5, 5]")
    print("[1, 1, 1]")
    print("[2, 2, 2]")
    print("[3, 3]")
    print("[4]")
    print()

    # Example 2: Invalid Toeplitz
    matrix2 = [[1, 2], [2, 2]]
    print("Matrix 2:")
    for row in matrix2:
        print(row)
    result2 = solution.isToeplitzMatrix(matrix2)
    print(f"Is Toeplitz: {result2}")
    print("Diagonal [1, 2] has different elements")
    print()

    # Example 3: Demonstrate diagonal grouping
    matrix3 = [[1, 2, 3], [4, 1, 2], [5, 4, 1]]
    print("Matrix 3:")
    for row in matrix3:
        print(row)
    result3 = solution.isToeplitzMatrix(matrix3)
    print(f"Is Toeplitz: {result3}")
    print("\nDiagonal grouping (row-col):")
    print("d=-2: [5]")
    print("d=-1: [4, 4]")
    print("d=0:  [1, 1, 1]")
    print("d=1:  [2, 2]")
    print("d=2:  [3]")
