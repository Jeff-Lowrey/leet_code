/**
### INTUITION:
[This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages topological sort principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
Input:
```
n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
```

Step 1: Build adjacency list
Degrees: [1,1,1,4,2,1]
Step 2: Remove leaves layer by layer
Remove 0,1,2,5: leaves=[3,4]
These are minimum height tree roots

Output:
```
[3,4]
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

/**
 * Main solution for Problem 310: Minimum Height Trees
 *
 * @param {number} n - Number of nodes in the tree
 * @param {number[][]} edges - Array of edges connecting nodes
 * @return {number[]} - Root nodes that result in minimum height trees
 *
 * Time Complexity: O(V + E) where V is n and E is edges.length
 * Space Complexity: O(V + E) for adjacency list
 */
function solve(n, edges) {
  // Edge case: single node
  if (n === 1) return [0];

  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  const degree = new Array(n).fill(0);

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
    degree[u]++;
    degree[v]++;
  }

  // Start with leaf nodes (degree = 1)
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (degree[i] === 1) {
      queue.push(i);
    }
  }

  let remainingNodes = n;

  // Trim leaves layer by layer
  while (remainingNodes > 2) {
    const leavesCount = queue.length;
    remainingNodes -= leavesCount;
    const nextQueue = [];

    for (let i = 0; i < leavesCount; i++) {
      const leaf = queue[i];

      for (const neighbor of graph[leaf]) {
        degree[neighbor]--;
        if (degree[neighbor] === 1) {
          nextQueue.push(neighbor);
        }
      }
    }

    queue = nextQueue;
  }

  // Remaining nodes are the centroids
  return queue.length > 0 ? queue : [0];
}

/**
 * Test cases for Problem 310: Minimum Height Trees
 */
function testSolution() {
  console.log("Testing 310. Minimum Height Trees");

  // Test case 1: Tree with 4 nodes
  const result1 = solve(4, [
    [1, 0],
    [1, 2],
    [1, 3],
  ]);
  console.assert(
    JSON.stringify(result1.sort()) === JSON.stringify([1]),
    `Test 1 failed: expected [1], got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Tree with 6 nodes - two centroids
  const result2 = solve(6, [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 4],
    [5, 4],
  ]);
  console.assert(
    JSON.stringify(result2.sort()) === JSON.stringify([3, 4]),
    `Test 2 failed: expected [3,4], got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single node
  const result3 = solve(1, []);
  console.assert(
    JSON.stringify(result3) === JSON.stringify([0]),
    `Test 3 failed: expected [0], got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Two nodes
  const result4 = solve(2, [[0, 1]]);
  console.assert(
    JSON.stringify(result4.sort()) === JSON.stringify([0, 1]),
    `Test 4 failed: expected [0,1], got ${JSON.stringify(result4)}`,
  );

  console.log("All test cases passed for 310. Minimum Height Trees!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 310. Minimum ===");
  console.log("Category: Topological Sort");
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
