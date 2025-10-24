"""
# 885. Spiral Matrix Iii

# Difficulty: Medium

Solve the Spiral Matrix Iii problem as described.

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
**Techniques**: Simulation, Direction control, Spiral traversal
**Data Structures**: Array, List
**Patterns**: Spiral pattern, Direction cycling
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
