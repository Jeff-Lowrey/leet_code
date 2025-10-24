"""
# 304. Range Sum Query 2d

# Difficulty: Medium

Solve problem #304: Range Sum Query 2d

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>input data here</dd>
<dt>Output:</dt>
<dd>output data here</dd>
<dt>Explanation:</dt>
<dd>Explanation of the solution</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: - Prefix sum (2D)
**Data Structures**: - 2D array
**Patterns**: - Prefix sum
**Time Complexity**: **O(n²)**
**Space Complexity**: **O(n)**
 *
### INTUITION:
The key insight is to solve this problem efficiently.
 *
### APPROACH:
We solve this problem by implementing the required algorithm.
 *
### WHY THIS WORKS:
This approach works because it correctly implements the problem requirements.
 *
### EXAMPLE WALKTHROUGH:
Input:
```
example input
```

Output:
```
example output
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(n)** - Analysis of space complexity
 *
### EDGE CASES:
- Handle empty input
- Handle boundary conditions
 *
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
