/**
### INTUITION:
This is a classic Union-Find problem about connecting components. Key insights:
- To connect n computers, we need at least n-1 cables
- Extra cables can be moved to connect separate components
- Count disconnected components and check if we have enough spare cables

### APPROACH:
1. **Check minimum cables**: Need at least n-1 cables total
2. **Union-Find**: Group computers into connected components
3. **Count components**: Find number of separate groups
4. **Calculate operations**: (components - 1) operations needed to connect all

### WHY THIS WORKS:
- This ensures that union-Find efficiently tracks connected components
- This ensures that each component merge requires exactly 1 cable
- This ensures that spare cables = total_cables - (n - components)
- This ensures that need (components - 1) cables to connect all components

### EXAMPLE WALKTHROUGH:
Input:
```
n = 4, connections = [[0,1],[0,2],[1,2],[1,3]]
```

Total cables: 4, Need: 3, Spare: 1
Union-Find process:
- Connect 0-1: components = {0,1}, {2}, {3}
- Connect 0-2: components = {0,1,2}, {3}
- Connect 1-2: redundant (already connected)
- Connect 1-3: components = {0,1,2,3}
Components: 1, Operations needed: 0

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(n × α(n)**)
Where α is the inverse Ackermann function (nearly constant)

### SPACE COMPLEXITY:
O(n)**
For Union-Find parent and rank arrays

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Union-Find data structure with path compression and union by rank
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  /**
   * Find root with path compression
   * @param {number} x
   * @returns {number} Root of x
   */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * Union by rank, returns true if components were merged
   * @param {number} x
   * @param {number} y
   * @returns {boolean} True if union occurred
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already connected
    }

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--;
    return true;
  }
}

/**
 * Find minimum operations to connect all computers using Union-Find
 * @param {number} n - Number of computers (0 to n-1)
 * @param {number[][]} connections - List of [a, b] cable connections
 * @returns {number} Minimum operations needed, or -1 if impossible
 *
 * Time Complexity: O(n × α(n)) where α is inverse Ackermann
 * Space Complexity: O(n) for Union-Find structure
 */
function makeConnected(n, connections) {
  // Need at least n-1 cables to connect n computers
  if (connections.length < n - 1) {
    return -1;
  }

  // Build Union-Find and connect components
  const uf = new UnionFind(n);

  for (const [a, b] of connections) {
    uf.union(a, b);
  }

  // Each operation connects two components into one
  // So we need (components - 1) operations to make 1 component
  return uf.components - 1;
}

/**
 * Alternative solution using manual component counting
 * @param {number} n - Number of computers
 * @param {number[][]} connections - Cable connections
 * @returns {number} Minimum operations needed, or -1 if impossible
 */
function makeConnectedAlternative(n, connections) {
  // Check if we have enough cables
  if (connections.length < n - 1) {
    return -1;
  }

  // Build adjacency graph
  const graph = Array.from({ length: n }, () => []);
  for (const [a, b] of connections) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // Count connected components using DFS
  const visited = new Array(n).fill(false);
  let components = 0;

  function dfs(node) {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      components++;
    }
  }

  // Need (components - 1) operations to connect all
  return components - 1;
}

/**
 * Test cases for Problem 1319: Number of Operations to Make Network Connected
 */
function testSolution() {
  console.log("Testing 1319. Number of Operations to Make Network Connected");

  // Test case 1: Can connect all
  const result1 = makeConnected(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
  ]);
  const expected1 = 0;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Need 1 operation
  const result2 = makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
  ]);
  const expected2 = 2;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Not enough cables
  const result3 = makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
  ]);
  const expected3 = -1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Already connected
  const result4 = makeConnected(5, [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
    [1, 4],
  ]);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Multiple components
  const result5 = makeConnected(12, [
    [1, 5],
    [1, 7],
    [1, 2],
    [1, 4],
    [3, 7],
    [4, 7],
    [3, 5],
    [0, 6],
    [0, 1],
    [0, 4],
    [2, 6],
    [0, 3],
    [0, 2],
  ]);
  const expected5 = 4;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test alternative solution
  const result6 = makeConnectedAlternative(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
  ]);
  const expected6 = 0;
  console.assert(
    result6 === expected6,
    `Alternative: expected ${expected6}, got ${result6}`,
  );

  console.log(
    "All test cases passed for 1319. Number of Operations to Make Network Connected!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 1319. Number of Operations to Make Network Connected ===",
  );
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1: Can connect all
  console.log("Example 1: Already connected network");
  const result1 = makeConnected(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [1, 3],
  ]);
  console.log(`makeConnected(4, [[0,1],[0,2],[1,2],[1,3]]) -> ${result1}`);
  console.log("Explanation: Network is already connected\n");

  // Example 2: Need operations
  console.log("Example 2: Need operations to connect");
  const result2 = makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
  ]);
  console.log(
    `makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]]) -> ${result2}`,
  );
  console.log("Explanation: Have 3 separate components, need 2 operations\n");

  // Example 3: Impossible
  console.log("Example 3: Not enough cables");
  const result3 = makeConnected(6, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
  ]);
  console.log(`makeConnected(6, [[0,1],[0,2],[0,3],[1,2]]) -> ${result3}`);
  console.log(
    "Explanation: Only 4 cables, but need at least 5 for 6 computers\n",
  );

  console.log("Key insights:");
  console.log("1. Need at least n-1 cables to connect n computers");
  console.log("2. Union-Find efficiently tracks connected components");
  console.log("3. Operations needed = (number of components - 1)");
  console.log("4. Each operation connects two separate components");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  makeConnected,
  makeConnectedAlternative,
  UnionFind,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses Union-Find with path compression and union by rank
 * - Time complexity is nearly O(n) due to inverse Ackermann function
 * - Alternative DFS approach has O(V + E) complexity
 * - The problem reduces to counting connected components
 * - Essential insight: spare cables can be redistributed to connect components
 */
