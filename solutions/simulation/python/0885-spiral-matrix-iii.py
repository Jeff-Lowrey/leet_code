"""
# 885. Spiral Matrix Iii

LeetCode Problem 885: Spiral Matrix III
Difficulty: Medium
Category: Simulation

Problem Description:
You start at the cell (rStart, cStart) of an rows x cols grid facing east. The northwest corner
is at the first row and column, and the southeast corner is at the last row and column.

You will walk in a clockwise spiral shape to visit every position in this grid. Whenever you
move outside the grid's boundary, continue your walk outside (but may return later). Eventually,
you reach all rows * cols spaces of the grid.

Return an array of coordinates representing the positions of the grid in order visited.

Example 1:
Input: rows = 1, cols = 4, rStart = 0, cStart = 0
Output: [[0,0],[0,1],[0,2],[0,3]]

Example 2:
Input: rows = 5, cols = 6, rStart = 1, cStart = 4
Output: [[1,4],[1,5],[2,5],[2,4],[2,3],[1,3],[0,3],[0,4],[0,5],[3,5],[3,4],[3,3],[3,2],[2,2],[1,2],[0,2],[4,5],[4,4],[4,3],[4,2],[4,1],[3,1],[2,1],[1,1],[0,1],[4,0],[3,0],[2,0],[1,0],[0,0]]

Constraints:
- 1 <= rows, cols <= 100
- 0 <= rStart < rows
- 0 <= cStart < cols

METADATA:
Techniques: Simulation, Direction control, Spiral traversal
Data Structures: Array, List
Patterns: Spiral pattern, Direction cycling
Time Complexity: O(max(rows, cols)^2)
Space Complexity: O(rows * cols)
"""

from typing import List


def spiralMatrixIII(rows: int, cols: int, rStart: int, cStart: int) -> List[List[int]]:
    """Generate spiral traversal coordinates."""
    # Directions: East, South, West, North
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    result = []
    r, c = rStart, cStart
    direction = 0
    steps = 1

    result.append([r, c])

    while len(result) < rows * cols:
        # Move in current direction twice (except first time)
        for _ in range(2):
            for _ in range(steps):
                r += directions[direction][0]
                c += directions[direction][1]
                if 0 <= r < rows and 0 <= c < cols:
                    result.append([r, c])
            direction = (direction + 1) % 4
            if len(result) >= rows * cols:
                break
        steps += 1

    return result


if __name__ == "__main__":
    test_cases = [
        (1, 4, 0, 0, 4),
        (5, 6, 1, 4, 30),
    ]

    print("Testing spiralMatrixIII:")
    for rows, cols, rStart, cStart, expected_len in test_cases:
        result = spiralMatrixIII(rows, cols, rStart, cStart)
        status = "✓" if len(result) == expected_len else "✗"
        print(f"{status} spiralMatrixIII({rows}, {cols}, {rStart}, {cStart}) returned {len(result)} coordinates, expected {expected_len}")
