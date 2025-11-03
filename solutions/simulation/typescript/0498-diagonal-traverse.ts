/**
 * # 0498. Diagonal Traverse
 *
 * # Difficulty: Medium
 *
 * Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.
 *
 * Example 1:
 * Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,4,7,5,3,6,8,9]
 *
 * Example 2:
 * Input: mat = [[1,2],[3,4]]
 * Output: [1,2,3,4]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3], [4, 5, 6], [7, 8, 9]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,4,7,5,3,6,8,9]</dd>
 * <dt>Explanation:</dt>
 * <dd>Diagonal traversal of [[1,2,3],[4,5,6],[7,8,9]] is [1,2,4,7,5,3,6,8,9]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Simulation, Direction control, Diagonal traversal
 * **Data Structures**: Matrix, Array
 * **Patterns**: Diagonal pattern, Zigzag traversal
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that elements on the same diagonal have the same sum of row + column indices.
Traverse diagonals alternately upward and downward, handling direction changes
and boundaries carefully.

### APPROACH:
The algorithm proceeds as follows:

**Data structures: Matrix (2D array input), Array (result storage)**
1. **Diagonal Identification**: Elements at (i, j) where i + j = k are on the same diagonal, tracked in array
2. **Direction Alternation**: Even-indexed diagonals go up-right, odd-indexed go down-left
3. **Boundary Handling**: When hitting matrix edges, change to next diagonal with proper direction
4. **Movement Pattern**:
- Going up: row--, col++ (move in matrix)
- Going down: row++, col-- (move in matrix)
- Hit boundary: adjust position and flip direction

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
mat = [[1,2,3], [4,5,6], [7,8,9]] (3x3 matrix)
```

**Step 1:** Diagonal 0 (sum=0)
- Elements where row+col=0: [1]
- Direction: up, Result: [1]

**Step 2:** Diagonal 1 (sum=1)
- Elements where row+col=1: [2,4]
- Direction: down, Result: [1,2,4]

**Step 3:** Diagonal 2 (sum=2)
- Elements where row+col=2: [7,5,3]
- Direction: up, Result: [1,2,4,7,5,3]

**Step 4:** Diagonal 3 (sum=3)
- Elements where row+col=3: [6,8]
- Direction: down, Result: [1,2,4,7,5,3,6,8]

**Step 5:** Diagonal 4 (sum=4)
- Elements where row+col=4: [9]
- Direction: up, Result: [1,2,4,7,5,3,6,8,9]

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

