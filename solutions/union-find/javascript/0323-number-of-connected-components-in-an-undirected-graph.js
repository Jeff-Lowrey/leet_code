/**
 * # Difficulty: Medium
 *
 * # 0323. Number Of Connected Components In An Undirected Graph
 *
 *
 * You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.
 *
 * Return the number of connected components in the graph.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Input: n = 5, edges = [[0,1],[1,2],[3,4]]</dd>
 * <dt>Output:</dt>
 * <dd>See walkthrough</dd>
 * <dt>Explanation:</dt>
 * <dd>Number of connected components in undirected graph is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Tree, Graph
 * **Patterns**: Hash Table Pattern, Divide and Conquer
 * **Time Complexity**: O(E × α(N))
 * **Space Complexity**: O(N)

 *
 * ### INTUITION:
 * This is a classic Union-Find problem for counting connected components. Each connected component is a set of nodes that can reach each other through edges. Union-Find efficiently groups nodes into components and counts distinct groups.
 *
 * ### APPROACH:
 * 1. **Initialize Union-Find**: Each node starts as its own component
 * 2. **Process edges**: Union connected nodes, reducing component count
 * 3. **Count components**: Count number of distinct parent nodes
 *
 * ### WHY THIS WORKS:
 * - Union-Find maintains disjoint sets (connected components)
 * - Each union operation merges two components into one
 * - Final count of root nodes = number of connected components
 * - Path compression and union by rank ensure efficient operations
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 5, edges = [[0,1],[1,2],[3,4]]
 * ```
 *
 * Steps:
 * Step 1: Initial: {0}, {1}, {2}, {3}, {4} → 5 components
 * Step 2: Union(0,1): {0,1}, {2}, {3}, {4} → 4 components
 * Step 3: Union(1,2): {0,1,2}, {3}, {4} → 3 components
 * Step 4: Union(3,4): {0,1,2}, {3,4} → 2 components
 * Step 5: Result: 2 connected components
 * 
 * Output:
 * ```
 * 2 connected components
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(E × α(N))
 * Where E is edges, N is nodes, α is inverse Ackermann (nearly constant)
 *
 * ### SPACE COMPLEXITY:
 * O(N)
 * For parent and rank arrays
 *
 * ### EDGE CASES:
 * - No edges: n isolated components
 * - Fully connected: 1 component
 * - Self-loops: don't change component count
 * - Single node: 1 component
 *
 * </details>
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
    this.count = n; // Initially n components
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

    if (rootX === rootY) return false; // Already in same component

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--; // Merged two components into one
    return true;
  }

  getCount() {
    return this.count;
  }
}

/**
 * Main solution for Problem 323: Number Of Connected Components In An Undirected Graph
 *
 * @param {number} n - Number of nodes (labeled 0 to n-1)
 * @param {number[][]} edges - Array of edges [u, v]
 * @return {number} - Number of connected components
 *
 * Time Complexity: O(E * α(n))
 * Space Complexity: O(n)
 */
function solve(n, edges) {
  if (n === 0) return 0;

  const uf = new UnionFind(n);

  // Process each edge
  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.getCount();
}

/**
 * Test cases for Problem 323: Number Of Connected Components In An Undirected Graph
 */
function testSolution() {
  console.log(
    "Testing 323. Number Of Connected Components In An Undirected Graph",
  );

  // Test case 1: Example from LeetCode
  const result1 = solve(5, [
    [0, 1],
    [1, 2],
    [3, 4],
  ]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: ${result1} components`);

  // Test case 2: All disconnected
  const result2 = solve(4, []);
  const expected2 = 4;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: ${result2} components`);

  // Test case 3: All connected
  const result3 = solve(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
  ]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: ${result3} component`);

  // Test case 4: Single node
  const result4 = solve(1, []);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: ${result4} component`);

  // Test case 5: Multiple components
  const result5 = solve(6, [
    [0, 1],
    [2, 3],
    [4, 5],
  ]);
  const expected5 = 3;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: ${result5} components`);

  // Test case 6: Cycle in component
  const result6 = solve(4, [
    [0, 1],
    [1, 2],
    [2, 0],
  ]);
  const expected6 = 2;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: ${result6} components`);

  console.log(
    "All test cases passed for 323. Number Of Connected Components In An Undirected Graph!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 323. Number Of Connected Components In An Undirected Graph ===",
  );
  console.log("Category: Union Find");
  console.log("Difficulty: Documentation");
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
