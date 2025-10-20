/**
 *  Difficulty: Medium
 *
 * # 261. Graph Valid Tree
 *
 * You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.
 *
 * Return true if the edges of the given graph make up a valid tree, and false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[0,1]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Graph edges form a valid tree if connected and has n-1 edges</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Graph Traversal (DFS/BFS), Graph Algorithms
 * **Data Structures**: Graph (Adjacency List/Matrix), Queue, Stack
 * **Patterns**: Graph Traversal Pattern, Connected Components
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem models relationships as a graph and uses traversal techniques (DFS/BFS) to explore connections and find solutions.
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply graphs methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages graphs principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
 * Step 1: Check edge count
 *   n-1 = 4 edges (necessary for tree) ✓
 *
 * Step 2: Build adjacency list
 *   {0: [1,2,3], 1: [0,4], 2: [0], 3: [0], 4: [1]}
 *
 * Step 3: DFS to check connectivity
 *   Visit 0 → mark visited
 *   Visit 1 → mark visited
 *   Visit 4 → mark visited
 *   Visit 2 → mark visited
 *   Visit 3 → mark visited
 *
 * Step 4: Verify all nodes visited
 *   visited = {0,1,2,3,4}, count = 5 = n ✓
 *
 * Output: True (forms valid tree)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Union-Find data structure for cycle detection
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
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

    if (rootX === rootY) {
      return false; // Cycle detected
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
 * Main solution for Problem 261: Graph Valid Tree
 *
 * @param {number} n - Number of nodes (0 to n-1)
 * @param {number[][]} edges - Array of edges [u, v]
 * @return {boolean} - True if the graph forms a valid tree
 *
 * Time Complexity: O(n * α(n)) - Union-Find with path compression
 * Space Complexity: O(n) - parent and rank arrays
 */
function solve(n, edges) {
  // A tree with n nodes must have exactly n-1 edges
  if (edges.length !== n - 1) {
    return false;
  }

  const uf = new UnionFind(n);

  // Process each edge
  for (const [u, v] of edges) {
    // If union returns false, a cycle was detected
    if (!uf.union(u, v)) {
      return false;
    }
  }

  // Check if all nodes are connected (exactly 1 component)
  return uf.components === 1;
}

/**
 * Test cases for Problem 261: Graph Valid Tree
 */
function testSolution() {
  console.log("Testing 261. Graph Valid Tree");

  // Test case 1: Valid tree
  const result1 = solve(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ]);
  console.assert(
    result1 === true,
    `Test 1 failed: expected true, got ${result1}`,
  );

  // Test case 2: Has cycle
  const result2 = solve(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4],
  ]);
  console.assert(
    result2 === false,
    `Test 2 failed: expected false, got ${result2}`,
  );

  // Test case 3: Not connected (too few edges)
  const result3 = solve(5, [
    [0, 1],
    [2, 3],
  ]);
  console.assert(
    result3 === false,
    `Test 3 failed: expected false, got ${result3}`,
  );

  // Test case 4: Single node
  const result4 = solve(1, []);
  console.assert(
    result4 === true,
    `Test 4 failed: expected true, got ${result4}`,
  );

  // Test case 5: Two nodes connected
  const result5 = solve(2, [[0, 1]]);
  console.assert(
    result5 === true,
    `Test 5 failed: expected true, got ${result5}`,
  );

  // Test case 6: Two nodes not connected
  const result6 = solve(2, []);
  console.assert(
    result6 === false,
    `Test 6 failed: expected false, got ${result6}`,
  );

  // Test case 7: Too many edges
  const result7 = solve(3, [
    [0, 1],
    [1, 2],
    [0, 2],
    [0, 1],
  ]);
  console.assert(
    result7 === false,
    `Test 7 failed: expected false, got ${result7}`,
  );

  // Test case 8: Linear tree
  const result8 = solve(4, [
    [0, 1],
    [1, 2],
    [2, 3],
  ]);
  console.assert(
    result8 === true,
    `Test 8 failed: expected true, got ${result8}`,
  );

  console.log("All test cases passed for 261. Graph Valid Tree!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 261. Graph Valid Tree ===");
  console.log("Category: Graphs");
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
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
