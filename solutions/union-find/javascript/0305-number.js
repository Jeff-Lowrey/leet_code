/**
### INTUITION:
[This problem requires understanding of union find concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply union find methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages union find principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
Input:
```
m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
```

Step 1: Add islands one by one
[0,0]: 1 island

Steps:
Step 1: [0,1]: merge with [0,0] → 1 island
Step 2: [1,2]: 2 islands
Step 3: [2,1]: 3 islands

Output:
```
[1,1,2,3]
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
    this.count = 0;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--; // Two islands merged into one
    return true;
  }

  addLand() {
    this.count++;
  }

  getCount() {
    return this.count;
  }
}

/**
 * Main solution for Problem 305: Number of Islands II
 *
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @param {number[][]} positions - Array of [row, col] positions to add land
 * @return {number[]} - Number of islands after each addition
 *
 * Time Complexity: O(k * α(m*n))
 * Space Complexity: O(m * n)
 */
function solve(m, n, positions) {
  if (!positions || positions.length === 0) return [];

  const uf = new UnionFind(m * n);
  const grid = Array.from({ length: m }, () => Array(n).fill(0));
  const result = [];
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Helper to convert 2D coordinates to 1D index
  const getIndex = (row, col) => row * n + col;

  for (const [row, col] of positions) {
    // Skip if already land
    if (grid[row][col] === 1) {
      result.push(uf.getCount());
      continue;
    }

    // Mark as land and increment island count
    grid[row][col] = 1;
    uf.addLand();

    // Check all 4 adjacent cells
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      // If adjacent cell is valid and is land, union them
      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        grid[newRow][newCol] === 1
      ) {
        uf.union(getIndex(row, col), getIndex(newRow, newCol));
      }
    }

    result.push(uf.getCount());
  }

  return result;
}

/**
 * Test cases for Problem 305: Number of Islands II
 */
function testSolution() {
  console.log("Testing 305. Number of Islands II");

  // Helper to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Example from LeetCode
  const result1 = solve(3, 3, [
    [0, 0],
    [0, 1],
    [1, 2],
    [2, 1],
  ]);
  const expected1 = [1, 1, 2, 3];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: ${JSON.stringify(result1)}`);

  // Test case 2: All merge into one island
  const result2 = solve(3, 3, [
    [0, 0],
    [0, 1],
    [1, 1],
    [2, 2],
  ]);
  const expected2 = [1, 1, 1, 2];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: ${JSON.stringify(result2)}`);

  // Test case 3: Duplicate positions
  const result3 = solve(2, 2, [
    [0, 0],
    [0, 0],
    [1, 1],
  ]);
  const expected3 = [1, 1, 2];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: ${JSON.stringify(result3)}`);

  // Test case 4: Empty positions
  const result4 = solve(1, 1, []);
  const expected4 = [];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: ${JSON.stringify(result4)}`);

  // Test case 5: Single cell
  const result5 = solve(1, 1, [[0, 0]]);
  const expected5 = [1];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: ${JSON.stringify(result5)}`);

  // Test case 6: Complex merging
  const result6 = solve(3, 3, [
    [0, 1],
    [1, 2],
    [2, 1],
    [1, 0],
    [1, 1],
  ]);
  const expected6 = [1, 2, 3, 4, 1];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: ${JSON.stringify(result6)}`);

  console.log("All test cases passed for 305. Number of Islands II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 305. Number ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
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
 * - This solution focuses on union find concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
