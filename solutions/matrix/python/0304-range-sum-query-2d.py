"""
### INTUITION:
The key insight is to preprocess the matrix into a 2D prefix sum array. This allows us to
answer range sum queries in O(1) time. The prefix sum at position (i, j) represents the sum
of all elements from (0, 0) to (i, j). Using inclusion-exclusion principle, we can calculate
any rectangular sum in constant time.

### APPROACH:
**Data structures: 2D array (prefix sum matrix), Matrix**
1. Create a 2D prefix sum matrix during preprocessing where prefix[i][j] = sum of all elements from (0,0) to (i-1,j-1)
2. To avoid index out of bounds, make prefix matrix (m+1) x (n+1) with padding
3. Build prefix sum using dynamic programming: prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]
4. For range query (r1,c1) to (r2,c2), use preprocessing results for O(1) lookup:
   sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]

### WHY THIS WORKS:
The 2D prefix sum uses the inclusion-exclusion principle:
- prefix[r2+1][c2+1] includes everything from (0,0) to (r2,c2)
- Subtract prefix[r1][c2+1] to remove rows above r1
- Subtract prefix[r2+1][c1] to remove columns left of c1
- Add back prefix[r1][c1] because it was subtracted twice

### EXAMPLE WALKTHROUGH:
**Input:** matrix = [[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]
Operations: ["NumMatrix", "sumRegion(2,1,4,3)", "sumRegion(1,1,2,2)", "sumRegion(1,2,2,4)"]

**Step 1:** Create prefix sum matrix with padding
- Build (m+1) x (n+1) matrix where prefix[i][j] = sum from (0,0) to (i-1,j-1)
- Prefix sum matrix:
[[0,  0,  0,  0,  0,  0],
 [0,  3,  3,  4,  8, 10],
 [0,  8, 14, 18, 24, 27],
 [0,  9, 17, 21, 28, 36],
 [0, 13, 22, 26, 34, 49],
 [0, 14, 23, 30, 38, 58]]

**Step 2:** For each cell, apply formula: prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]

**Step 3:** Query sumRegion(2, 1, 4, 3)
- Apply inclusion-exclusion: sum = prefix[5][4] - prefix[2][4] - prefix[5][1] + prefix[2][1]
- Calculation: 38 - 24 - 14 + 8 = 8 ✓

**Step 4:** Repeat for remaining queries
- sumRegion(1, 1, 2, 2) = 11
- sumRegion(1, 2, 2, 4) = 12

**Result:** [null, 8, 11, 12]

### TIME COMPLEXITY:
**Constructor: O(m * n)** where m, n are matrix dimensions - must compute all prefix sums
**sumRegion: O(1)** - simple arithmetic using precomputed values

### SPACE COMPLEXITY:
**O(m * n)** - store prefix sum matrix of same dimensions as input

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from typing import List


class NumMatrix:
    """Class for 2D range sum queries using prefix sum technique."""

    def __init__(self, matrix: List[List[int]]):
        """
        Initialize the NumMatrix with prefix sum preprocessing.

        Args:
            matrix: 2D list of integers
        """
        if not matrix or not matrix[0]:
            self.prefix = [[]]
            return

        m, n = len(matrix), len(matrix[0])
        # Create prefix sum matrix with padding (m+1) x (n+1)
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]

        # Build prefix sum matrix
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                self.prefix[i][j] = (
                    matrix[i - 1][j - 1]
                    + self.prefix[i - 1][j]
                    + self.prefix[i][j - 1]
                    - self.prefix[i - 1][j - 1]
                )

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        """
        Calculate sum of rectangle from (row1, col1) to (row2, col2).

        Args:
            row1: Upper row index
            col1: Left column index
            row2: Lower row index
            col2: Right column index

        Returns:
            Sum of elements in the specified rectangle
        """
        # Apply inclusion-exclusion principle
        return (
            self.prefix[row2 + 1][col2 + 1]
            - self.prefix[row1][col2 + 1]
            - self.prefix[row2 + 1][col1]
            + self.prefix[row1][col1]
        )


if __name__ == "__main__":
    # Test case 1
    matrix = [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
    ]

    numMatrix = NumMatrix(matrix)

    test_cases = [
        ((2, 1, 4, 3), 8),
        ((1, 1, 2, 2), 11),
        ((1, 2, 2, 4), 12),
        ((0, 0, 4, 4), 58),
        ((0, 0, 0, 0), 3)
    ]

    print("Testing NumMatrix.sumRegion:")
    for (row1, col1, row2, col2), expected in test_cases:
        result = numMatrix.sumRegion(row1, col1, row2, col2)
        status = "✓" if result == expected else "✗"
        print(f"{status} sumRegion({row1}, {col1}, {row2}, {col2}) = {result}, expected = {expected}")

    # Test case 2: Single element matrix
    matrix2 = [[5]]
    numMatrix2 = NumMatrix(matrix2)
    result = numMatrix2.sumRegion(0, 0, 0, 0)
    print(f"\nSingle element test: sumRegion(0, 0, 0, 0) = {result}, expected = 5, {'✓' if result == 5 else '✗'}")
