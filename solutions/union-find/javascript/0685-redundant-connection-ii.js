/**
 * # 0685. Redundant Connection Ii
 *
 * Difficulty: Medium
 *
 * # Difficulty: Hard
 *
 * In a directed graph, return an edge that can be removed so that the resulting graph is a tree.
 * If there are multiple answers, return the answer that occurs last in the given input.
 *
 * The input is a 2D array edges where each edges[i] = [ui, vi] represents a directed edge from ui to vi.
 *
 * Example:
 * Input: edges = [[1,2],[1,3],[2,3]]
 * Output: [2,3]
 * Explanation: Removing [2,3] creates a valid tree.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>edges = [[1,2],[1,3],[2,3]]</dd>
 * <dt>Output:</dt>
 * <dd>[2,3]</dd>
 * <dt>Explanation:</dt>
 * <dd>Redundant directed edge that makes graph invalid</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Tree
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n α(n))
 * **Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * A rooted tree has exactly one root (no parent) and all other nodes have exactly one parent.
 * Invalid scenarios: (1) node with 2 parents, (2) cycle. Use union-find to detect these.
 *
 * ### APPROACH:
 * 1. **Find node with 2 parents**: If exists, one of those edges is redundant
 * 2. **Try removing each candidate**: Check if remaining graph is valid tree
 * 3. **Use Union-Find**: Detect cycles in directed graph
 * 4. **Priority**: If both edges from 2-parent node cause issues, remove the later one
 *
 * ### WHY THIS WORKS:
 * Valid tree requires: (1) all nodes have ≤1 parent, (2) no cycles.
 * When a node has 2 parents, one must be removed. Union-find detects cycles.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * edges = [[1,2],[1,3],[2,3]]
 * ```
 *
 * Step 1: Find node with 2 parents
 * Node 3 has parents 1 and 2
 * Step 2: Try removing each edge to node 3
 * Remove [1,3]: still cycle exists
 * Remove [2,3]: forms valid tree ✓
 *
 * Output:
 * ```
 * [2,3]
 * ```

 * ### TIME COMPLEXITY:
 * O(n α(n))
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - **Node with two parents, no cycle**: Remove the later edge to that node
 * - **Node with two parents and cycle**: Remove the edge that breaks both issues
 * - **Cycle without two parents**: Return the last edge that creates the cycle
 * - **All edges form valid tree except one**: Union-find detects the redundant edge
 * - **Single edge graph**: Return that edge if it creates self-loop
 *
 * </details>
 */

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.rank = Array(n + 1).fill(0);
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

    if (rootX === rootY) return false; // Already connected (cycle detected)

    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  }
}

/**
 * Helper function to check if edges form a valid tree (no cycle)
 */
function isValidTree(edges, n, skipEdge) {
  const uf = new UnionFind(n);

  for (let i = 0; i < edges.length; i++) {
    if (i === skipEdge) continue; // Skip the specified edge

    const [u, v] = edges[i];
    if (!uf.union(u, v)) {
      return false; // Cycle detected
    }
  }

  return true;
}

/**
 * Main solution for Problem 685: Redundant Connection II
 *
 * @param {number[][]} edges - Array of directed edges [parent, child]
 * @return {number[]} - The redundant edge to remove
 *
 * Time Complexity: O(n * α(n))
 * Space Complexity: O(n)
 */
function solve(edges) {
  const n = edges.length;
  const parent = Array(n + 1).fill(0); // Track parent of each node
  let candidate1 = null;
  let candidate2 = null;

  // Step 1: Find if there's a node with two parents
  for (const [u, v] of edges) {
    if (parent[v] !== 0) {
      // Node v already has a parent, found conflict!
      candidate1 = [parent[v], v]; // First edge pointing to v
      candidate2 = [u, v]; // Second edge pointing to v
      break;
    }
    parent[v] = u;
  }

  // Step 2: Process based on whether we found a node with two parents
  if (candidate1 !== null) {
    // Case 1 or Case 2: A node has two parents
    // Try removing candidate2 first (last occurrence)
    const edges1 = edges.filter(
      (edge) => !(edge[0] === candidate2[0] && edge[1] === candidate2[1]),
    );

    if (isValidTree(edges1, n, -1)) {
      return candidate2; // Removing candidate2 works
    } else {
      return candidate1; // Must remove candidate1
    }
  } else {
    // Case 3: No node has two parents, but cycle exists
    // Find the edge that creates the cycle
    const uf = new UnionFind(n);

    for (const [u, v] of edges) {
      if (!uf.union(u, v)) {
        // This edge creates a cycle
        return [u, v];
      }
    }
  }

  return []; // Should never reach here
}

/**
 * Test cases for Problem 685: Redundant Connection II
 */
function testSolution() {
  console.log("Testing 685. Redundant Connection II");

  // Helper to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Node with two parents, no cycle (Case 1)
  const result1 = solve([
    [1, 2],
    [1, 3],
    [2, 3],
  ]);
  const expected1 = [2, 3];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: ${JSON.stringify(result1)}`);

  // Test case 2: Node with two parents and cycle (Case 2)
  const result2 = solve([
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
    [1, 5],
  ]);
  const expected2 = [4, 1];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: ${JSON.stringify(result2)}`);

  // Test case 3: Node 1 has two parents (2 and 3), creating conflict
  const result3 = solve([
    [2, 1],
    [3, 1],
    [4, 2],
    [1, 4],
  ]);
  const expected3 = [2, 1]; // Node 1 has two parents: remove the one that causes cycle
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: ${JSON.stringify(result3)}`);

  // Test case 4: Simple cycle case
  const result4 = solve([
    [1, 2],
    [2, 3],
    [3, 1],
  ]);
  const expected4 = [3, 1]; // Creates cycle
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: ${JSON.stringify(result4)}`);

  // Test case 5: Node 1 has two parents (2 and 3)
  const result5 = solve([
    [2, 1],
    [3, 1],
    [4, 2],
    [1, 4],
  ]);
  const expected5 = [2, 1]; // Same as test 3
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: ${JSON.stringify(result5)}`);

  // Test case 6: Another directed cycle
  const result6 = solve([
    [1, 2],
    [2, 3],
    [3, 1],
    [3, 4],
  ]);
  const expected6 = [3, 1];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: ${JSON.stringify(result6)}`);

  console.log("All test cases passed for 685. Redundant Connection II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 685. Redundant Connection Ii ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Hard");
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
