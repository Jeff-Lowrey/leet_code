"""
# Difficulty: Medium

# 240. Search a 2D Matrix II

Write an efficient algorithm that searches for a value target in an m x n integer matrix.
This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>Target 5 is found in the 2D matrix at position (1,1)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array, Tree, Matrix
**Patterns**: Two Pointers Pattern, Binary Search Pattern
**Time Complexity**: O(m + n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Start from top-right (or bottom-left) corner. From top-right, we can eliminate either the current row (if target < current) or current column (if target > current). This is like a binary search tree where we can navigate efficiently.

### APPROACH:
1. **Start from top-right corner** (row=0, col=n-1)
2. **Compare target with current element**:
   - If equal: return True
   - If target < current: move left (eliminate column)
   - If target > current: move down (eliminate row)
3. **Continue** until found or out of bounds

### WHY THIS WORKS:
- From top-right: all elements below are larger, all elements left are smaller
- Each comparison eliminates an entire row or column
- Similar to searching in a BST where current node's left < node < right

### EXAMPLE WALKTHROUGH:
Input:
```
Matrix:
```

[1,  4,  7,  11, 15]
[2,  5,  8,  12, 19]
[3,  6,  9,  16, 22]
[10, 13, 14, 17, 24]
[18, 21, 23, 26, 30]
Search for 5:
Start at (0,4)=15: 5<15, go left
At (0,3)=11: 5<11, go left
At (0,2)=7: 5<7, go left
At (0,1)=4: 5>4, go down
At (1,1)=5: Found! Return True

### TIME COMPLEXITY:
O(m + n)
At most m+n steps (eliminate one row or column per step)

### SPACE COMPLEXITY:
O(1)
Only using constant extra space for pointers

### EDGE CASES:
- Empty matrix
- Single element
- Target not in matrix
- Target at corners
- All elements same

</details>
"""


class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        """
        Search for target in sorted 2D matrix.

        Args:
            matrix: 2D matrix sorted by rows and columns
            target: Target value to search for

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
                # Target is smaller, eliminate this column (move left)
                col -= 1
            else:
                # Target is larger, eliminate this row (move down)
                row += 1

        return False

    def searchMatrixBottomLeft(self, matrix: list[list[int]], target: int) -> bool:
        """
        Alternative approach starting from bottom-left corner.

        Args:
            matrix: 2D matrix sorted by rows and columns
            target: Target value to search for

        Returns:
            True if target found, False otherwise

        Time Complexity: O(m + n)
        Space Complexity: O(1)
        """
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])

        # Start from bottom-left corner
        row, col = m - 1, 0

        while row >= 0 and col < n:
            current = matrix[row][col]

            if current == target:
                return True
            elif current > target:
                # Target is smaller, eliminate this row (move up)
                row -= 1
            else:
                # Target is larger, eliminate this column (move right)
                col += 1

        return False

    def searchMatrixBinarySearch(self, matrix: list[list[int]], target: int) -> bool:
        """
        Brute force approach using binary search on each row.

        Args:
            matrix: 2D matrix sorted by rows and columns
            target: Target value to search for

        Returns:
            True if target found, False otherwise

        Time Complexity: O(m log n)
        Space Complexity: O(1)
        """
        if not matrix or not matrix[0]:
            return False

        def binary_search(row: list[int], target: int) -> bool:
            left, right = 0, len(row) - 1
            while left <= right:
                mid = (left + right) // 2
                if row[mid] == target:
                    return True
                elif row[mid] < target:
                    left = mid + 1
                else:
                    right = mid - 1
            return False

        for row in matrix:
            if binary_search(row, target):
                return True

        return False


def test_solution() -> None:
    """Test cases for Problem 240."""
    solution = Solution()

    # Test case 1: Basic example
    matrix1 = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]
    assert solution.searchMatrix(matrix1, 5) is True
    assert solution.searchMatrix(matrix1, 20) is False
    print("Test case 1 passed")

    # Test case 2: Single element
    assert solution.searchMatrix([[5]], 5) is True
    assert solution.searchMatrix([[5]], 1) is False
    print("Test case 2 passed")

    # Test case 3: Single row
    assert solution.searchMatrix([[1, 3, 5, 7]], 3) is True
    assert solution.searchMatrix([[1, 3, 5, 7]], 6) is False
    print("Test case 3 passed")

    # Test case 4: Single column
    assert solution.searchMatrix([[1], [3], [5], [7]], 3) is True
    assert solution.searchMatrix([[1], [3], [5], [7]], 6) is False
    print("Test case 4 passed")

    # Test case 5: Target at corners
    matrix5 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert solution.searchMatrix(matrix5, 1) is True  # Top-left
    assert solution.searchMatrix(matrix5, 3) is True  # Top-right
    assert solution.searchMatrix(matrix5, 7) is True  # Bottom-left
    assert solution.searchMatrix(matrix5, 9) is True  # Bottom-right
    print("Test case 5 passed")

    # Test case 6: Empty matrix
    assert solution.searchMatrix([], 5) is False
    assert solution.searchMatrix([[]], 5) is False
    print("Test case 6 passed")

    # Test bottom-left approach
    assert solution.searchMatrixBottomLeft(matrix1, 5) is True
    assert solution.searchMatrixBottomLeft(matrix1, 20) is False
    print("Test case 7 passed: Bottom-left approach")

    # Test binary search approach
    assert solution.searchMatrixBinarySearch(matrix1, 5) is True
    assert solution.searchMatrixBinarySearch(matrix1, 20) is False
    print("Test case 8 passed: Binary search approach")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\n=== 240. Search a 2D Matrix II ===")

    matrix = [[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]]

    print("\nMatrix:")
    for row in matrix:
        print(row)

    targets = [5, 20, 1, 30, 10]
    print("\nSearch results:")
    for target in targets:
        result = solution.searchMatrix(matrix, target)
        print(f"searchMatrix(matrix, {target}) -> {result}")
