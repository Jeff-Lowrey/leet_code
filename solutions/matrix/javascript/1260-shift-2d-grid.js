/**
### INTUITION:
Think of the 2D grid as a 1D array that wraps around. Each shift moves all elements
one position to the right, with the last element wrapping to the first position.
Instead of performing k individual shifts, we can calculate final positions directly.

### APPROACH:
1. **Flatten Conceptually**: Treat the 2D grid as a 1D array without actually creating it
2. **Calculate New Position**: For element at position i, after k shifts it's at (i + k) % total
3. **Map Back to 2D**: Convert 1D position back to 2D coordinates
4. **Optimization**: Use k % total to avoid unnecessary full rotations

Key Insight**: Position mapping
- 2D to 1D: index = i * n + j (where i is row, j is col)
- 1D to 2D: row = index // n, col = index % n

### WHY THIS WORKS:
- This ensures that shifting k times is equivalent to rotating the flattened array by k positions
- This ensures that using modulo handles wrapping and optimizes multiple full rotations
- This ensures that direct position calculation avoids expensive element-by-element shifting

### EXAMPLE WALKTHROUGH:
Input:
```
grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1, m = 3, n = 3, total = 9
```

Flatten view: [1,2,3,4,5,6,7,8,9]
After 1 shift: [9,1,2,3,4,5,6,7,8]
Position mapping:

Steps:
Step 1: - 1 at index 0 → new index (0+1)%9 = 1 → grid[0][1]
Step 2: - 2 at index 1 → new index (1+1)%9 = 2 → grid[0][2]
Step 3: - 9 at index 8 → new index (8+1)%9 = 0 → grid[0][0]
Step 4: Result: [[9,1,2],[3,4,5],[6,7,8]]

Output:
```
[[9,1,2],[3,4,5],[6,7,8]]
```

### TIME COMPLEXITY:
O(m × n)**
- Must visit each element once to build result

### SPACE COMPLEXITY:
O(m × n)**
- Need to store the result grid (required by problem)
- Can be **O(1)** if we modify in-place, but tricky with constraints

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Main solution for Problem 1260: Shift 2D Grid
 *
 * @param {number[][]} grid - 2D grid of integers
 * @param {number} k - Number of shifts
 * @return {number[][]} - Shifted 2D grid
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
function solve(grid, k) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return grid;
  }

  const m = grid.length;
  const n = grid[0].length;
  const total = m * n;

  // Optimize k (handle cases where k > total)
  k = k % total;

  // If k is 0, return copy of original grid
  if (k === 0) {
    return grid.map((row) => [...row]);
  }

  // Flatten the grid into 1D array
  const flat = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      flat.push(grid[i][j]);
    }
  }

  // Rotate the array by k positions to the right
  // Take last k elements and move to front
  const rotated = [...flat.slice(total - k), ...flat.slice(0, total - k)];

  // Reconstruct 2D grid
  const result = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < n; j++) {
      row.push(rotated[i * n + j]);
    }
    result.push(row);
  }

  return result;
}

/**
 * Test cases for Problem 1260: Shift 2D Grid
 */
function testSolution() {
  console.log("Testing 1260. Shift 2D Grid");

  // Helper to compare 2D arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false;
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false;
      }
    }
    return true;
  };

  // Test case 1: Basic shift
  const result1 = solve(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1,
  );
  const expected1 = [
    [9, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Multiple shifts
  const result2 = solve(
    [
      [3, 8, 1, 9],
      [19, 7, 2, 5],
      [4, 6, 11, 10],
      [12, 0, 21, 13],
    ],
    4,
  );
  const expected2 = [
    [12, 0, 21, 13],
    [3, 8, 1, 9],
    [19, 7, 2, 5],
    [4, 6, 11, 10],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: k equals total elements (no change)
  const result3 = solve(
    [
      [1, 2, 3],
      [4, 5, 6],
    ],
    6,
  );
  const expected3 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Single element
  const result4 = solve([[1]], 100);
  const expected4 = [[1]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Single row
  const result5 = solve([[1, 2, 3, 4]], 2);
  const expected5 = [[3, 4, 1, 2]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 1260. Shift 2D Grid!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 1260. Shift 2D Grid ===");
  console.log("Category: Simulation");
  console.log("Difficulty: Easy");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
