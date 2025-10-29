"""
# 0498. Diagonal Traverse

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
Elements on the same diagonal have the same sum of row + column indices.
Traverse diagonals alternately upward and downward, handling direction changes
and boundaries carefully.

### APPROACH:
1. **Diagonal Identification**: Elements at (i, j) where i + j = k are on the same diagonal
2. **Direction Alternation**: Even-indexed diagonals go up-right, odd-indexed go down-left
3. **Boundary Handling**: When hitting edges, change to next diagonal with proper direction
4. **Movement Pattern**:
   - Going up: row--, col++
   - Going down: row++, col--
   - Hit boundary: adjust position and flip direction

**Key Observations**:
- Total diagonals = m + n - 1
- Diagonal d contains elements where i + j = d
- Direction alternates: up (d even), down (d odd)

### WHY THIS WORKS:
- Using row + col sum groups elements into diagonals naturally
- Alternating directions matches the required zigzag pattern
- Boundary checks ensure we stay within matrix bounds
- Direction flipping at boundaries creates the diagonal traversal pattern

This solution uses simulation for efficient implementation.
### EXAMPLE WALKTHROUGH:
```
mat = [[1,2,3],
       [4,5,6],
       [7,8,9]]

Diagonal 0 (sum=0): [1] → up direction
Diagonal 1 (sum=1): [2,4] → down direction
Diagonal 2 (sum=2): [7,5,3] → up direction
Diagonal 3 (sum=3): [6,8] → down direction
Diagonal 4 (sum=4): [9] → up direction

Result: [1,2,4,7,5,3,6,8,9]
```

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 *
### SPACE COMPLEXITY:
**O(n)** - Analysis of space complexity
 *
### EDGE CASES:
- Single element: [[1]] → [1]
- Single row: [[1,2,3]] → [1,2,3]
- Single column: [[1],[2],[3]] → [1,2,3]
- Non-square matrices: Different row and column counts


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
