"""### METADATA:

### INTUITION:
The key insight is to solve this problem efficiently.
 *

### APPROACH:
1. **Initialize data structures**: Set up the required data structures for the algorithm
2. **Process input**: Iterate through the input applying the core technique
3. **Track state**: Maintain necessary state information during processing
4. **Return result**: Construct and return the final solution

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

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(n²)** - Analysis of time complexity
 * - [Add explanation of why this complexity]

### SPACE COMPLEXITY:
**O(n)** - Analysis of space complexity
 * - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
