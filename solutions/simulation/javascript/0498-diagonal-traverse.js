/**
 * # 0498. Diagonal Traverse
 *
 * Difficulty: Medium
 *
 * Solve the Diagonal Traverse problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>mat = [[1,2,3], [4,5,6], [7,8,9]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,4,7,5,3,6,8,9]</dd>
 * <dt>Explanation:</dt>
 * <dd>Traverse diagonals in zigzag pattern: up-right then down-left alternating</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Simulation, Direction control
 * **Data Structures**: Matrix, Array
 * **Patterns**: Diagonal pattern
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
The key insight is that elements on the same diagonal have the same sum of row + column indices.
Traverse diagonals alternately upward and downward, handling direction changes
and boundaries carefully.

### APPROACH:
The algorithm proceeds as follows:

**Data structures: Matrix (2D array input), Array (result storage)**
1. **Diagonal Identification**: Elements at (i, j) in matrix where i + j = k are on the same diagonal
2. **Direction Alternation**: Even-indexed diagonals go up-right in array, odd-indexed go down-left in array
3. **Boundary Handling**: When hitting matrix edges, change to next diagonal with proper direction
4. **Movement Pattern** in array:
- Going up: row--, col++
- Going down: row++, col--
- Hit boundary: adjust position in array and flip direction

**Key Observations**:
- Total diagonals = m + n - 1
- Diagonal d contains elements where i + j = d
- Direction alternates: up (d even), down (d odd)

### WHY THIS WORKS:
- This ensures that using row + col sum groups elements into diagonals naturally
- This ensures that alternating directions matches the required zigzag pattern
- This ensures that boundary checks ensure we stay within matrix bounds
- This ensures that direction flipping at boundaries creates the diagonal traversal pattern

### EXAMPLE WALKTHROUGH:
Input:
```
mat = [[1,2,3], [4,5,6], [7,8,9]]
```

**Step 1:** Initialize - Start at (0,0), direction = up for mat=[[1,2,3], [4,5,6], [7,8,9]]
- Add element 1, move according to boundary rules

**Step 2:** Process diagonal sum=1 (down direction)
- Add elements: 2, then 4
- Hit boundaries and flip direction

**Step 3:** Process diagonal sum=2 (up direction)
- Add elements: 7, 5, 3 (reverse order due to direction)
- Hit boundaries and flip direction

**Step 4:** Continue pattern for remaining diagonals
- Diagonal sum=3 (down): 6, 8
- Diagonal sum=4 (up): 9

Output:
```
[1,2,4,7,5,3,6,8,9]
```

### TIME COMPLEXITY:
 * O(m × n)
 * - Visit each element exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only use constant extra space (not counting output array)
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

