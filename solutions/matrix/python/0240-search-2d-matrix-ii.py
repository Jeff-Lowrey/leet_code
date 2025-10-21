"""
# Difficulty: Medium

# 240. Search a 2D Matrix II

Search for a target in an m x n matrix with sorted rows and columns.

Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5</dd>
<dt>Output:</dt>
<dd>True</dd>
<dt>Explanation:</dt>
<dd>Target 5 is found in the 2D sorted matrix at position [1][1]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Binary Search Variant, Elimination Search
**Data Structures**: Matrix, 2D Array
**Patterns**: Search Space Reduction, Staircase Search
**Time Complexity**: O(m + n) - Worst case visit m+n cells
**Space Complexity**: O(1) - Only pointer variables


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

Output: True
```


### TIME COMPLEXITY:
O(m + n) - Worst case visit m+n cells (traverse entire diagonal)


### SPACE COMPLEXITY:
O(1) - Only uses constant space for row/column pointers


### EDGE CASES:
- Empty matrix
- Single row or column
- Target not in matrix
- Target at corners
- Target smaller than all elements
- Target larger than all elements

</details>
"""


def solve(matrix: list[list[int]], target: int) -> bool:
    """
    Main solution for Problem 240: Search a 2D Matrix II

    Args:
        matrix: m x n matrix sorted in ascending order (rows and columns)
        target: Target value to search for

    Returns:
        True if target is found, False otherwise

    Time Complexity: O(m + n) - Worst case eliminate one row or column per iteration
    Space Complexity: O(1) - Constant space for pointers
    """
    if not matrix or not matrix[0]:
        return False

    m = len(matrix)
    n = len(matrix[0])

    # Start from top-right corner
    row = 0
    col = n - 1

    while row < m and col >= 0:
        current = matrix[row][col]

        if current == target:
            return True
        elif current > target:
            # Current value is too large, move left (eliminate column)
            col -= 1
        else:
            # Current value is too small, move down (eliminate row)
            row += 1

    return False


def test_solution() -> None:
    """Test cases for Problem 240: Search a 2D Matrix II"""
    print("Testing 240. Search a 2D Matrix II")

    # Test case 1: Target exists in matrix
    matrix1 = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
    ]
    assert solve(matrix1, 5) is True, "Test 1 failed: 5 should be found"
    assert solve(matrix1, 20) is False, "Test 2 failed: 20 should not be found"

    # Test case 2: Target at corners
    assert solve(matrix1, 1) is True, "Test 3 failed: 1 (top-left) should be found"
    assert solve(matrix1, 30) is True, "Test 4 failed: 30 (bottom-right) should be found"
    assert solve(matrix1, 15) is True, "Test 5 failed: 15 (top-right) should be found"
    assert solve(matrix1, 18) is True, "Test 6 failed: 18 (bottom-left) should be found"

    # Test case 3: Single element matrix
    matrix2 = [[5]]
    assert solve(matrix2, 5) is True, "Test 7 failed: single element match"
    assert solve(matrix2, 1) is False, "Test 8 failed: single element no match"

    # Test case 4: Single row
    matrix3 = [[1, 3, 5, 7, 9]]
    assert solve(matrix3, 3) is True, "Test 9 failed: single row match"
    assert solve(matrix3, 4) is False, "Test 10 failed: single row no match"

    # Test case 5: Single column
    matrix4 = [[2], [4], [6], [8]]
    assert solve(matrix4, 6) is True, "Test 11 failed: single column match"
    assert solve(matrix4, 5) is False, "Test 12 failed: single column no match"

    # Test case 6: Empty matrix
    assert solve([], 1) is False, "Test 13 failed: empty matrix"
    assert solve([[]], 1) is False, "Test 14 failed: empty row"

    # Test case 7: Target smaller than all elements
    assert solve(matrix1, 0) is False, "Test 15 failed: target too small"

    # Test case 8: Target larger than all elements
    assert solve(matrix1, 100) is False, "Test 16 failed: target too large"

    print("All test cases passed for 240. Search a 2D Matrix II!")


def demonstrate_solution() -> None:
    """Example usage and demonstration"""
    print("\n=== Problem 240. Search a 2D Matrix II ===")
    print("Category: Matrix")
    print("Difficulty: Medium")
    print()

    # Example demonstration
    test_solution()


if __name__ == "__main__":
    demonstrate_solution()


"""
Additional Notes:
- Staircase search is the optimal approach for this problem
- Alternative: Binary search on each row (O(m log n))
- Alternative: Divide and conquer (O(n log n) average)
- This solution achieves O(m+n) which is optimal for this constraint
- Can also start from bottom-left corner with same complexity
"""
