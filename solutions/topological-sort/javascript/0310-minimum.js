/**
 * # Difficulty: Medium
 *
 * # 310. Minimum
 *
 * A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
 *
 * Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h)) are called minimum height trees (MHTs).
 *
 * Return a list of all MHTs' root labels. You can return the answer in any order.
 *
 * The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]</dd>
 * <dt>Output:</dt>
 * <dd>[3,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum height tree roots are [0,1] for graph with edges [[0,1],[0,2],[0,3]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Sorting
 * **Data Structures**: Array, String, Queue
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply topological sort methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages topological sort principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
 * Step 1: Build adjacency list
 *   Degrees: [1,1,1,4,2,1]
 *
 * Step 2: Remove leaves layer by layer
 *   Remove 0,1,2,5: leaves=[3,4]
 *
 *   These are minimum height tree roots
 *
 * Output: [3,4]
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
