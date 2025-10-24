"""
# 498. Diagonal Traverse

# Difficulty: Medium

Solve the Diagonal Traverse problem as described.

**Example:**
 *
<dl class="example-details">
<dt>Input:</dt>
<dd>```</dd>
<dt>Output:</dt>
<dd>```</dd>
<dt>Explanation:</dt>
<dd>Processing input produces the expected output</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
### METADATA:
**Techniques**: Simulation, Direction control, Diagonal traversal
**Data Structures**: Matrix, Array
**Patterns**: Diagonal pattern, Boundary handling
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
        print(f"   = result, expected = expected")
