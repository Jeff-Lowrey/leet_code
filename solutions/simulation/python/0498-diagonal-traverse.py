"""
LeetCode Problem 498: Diagonal Traverse
Difficulty: Medium
Category: Simulation

Problem Description:
Given an m x n matrix mat, return an array of all elements in diagonal order.

Example 1:
Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]

Example 2:
Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]

Constraints:
- m == mat.length
- n == mat[i].length
- 1 <= m, n <= 10^4
- 1 <= m * n <= 10^4
- -10^5 <= mat[i][j] <= 10^5

METADATA:
Techniques: Simulation, Direction control, Diagonal traversal
Data Structures: Matrix, Array
Patterns: Diagonal pattern, Boundary handling
Time Complexity: O(m * n)
Space Complexity: O(1) excluding output
"""

from typing import List


def findDiagonalOrder(mat: List[List[int]]) -> List[int]:
    """Traverse matrix diagonally."""
    if not mat or not mat[0]:
        return []

    m, n = len(mat), len(mat[0])
    result = []
    row, col = 0, 0
    going_up = True

    for _ in range(m * n):
        result.append(mat[row][col])

        if going_up:
            if col == n - 1:  # Hit right edge
                row += 1
                going_up = False
            elif row == 0:  # Hit top edge
                col += 1
                going_up = False
            else:  # Continue diagonally up
                row -= 1
                col += 1
        else:  # going_down
            if row == m - 1:  # Hit bottom edge
                col += 1
                going_up = True
            elif col == 0:  # Hit left edge
                row += 1
                going_up = True
            else:  # Continue diagonally down
                row += 1
                col -= 1

    return result


if __name__ == "__main__":
    test_cases = [
        ([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 4, 7, 5, 3, 6, 8, 9]),
        ([[1, 2], [3, 4]], [1, 2, 3, 4]),
        ([[1]], [1]),
    ]

    print("Testing findDiagonalOrder:")
    for mat, expected in test_cases:
        result = findDiagonalOrder(mat)
        status = "✓" if result == expected else "✗"
        print(f"{status} findDiagonalOrder({mat})")
        print(f"   = {result}, expected = {expected}")
