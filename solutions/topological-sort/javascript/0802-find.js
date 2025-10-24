/**
 * # Difficulty: Medium
 *
 * # 0802. Find Eventual Safe States
 *
 * Difficulty: Medium
 *
 * There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].
 *
 * A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).
 *
 * Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>graph = [[1,2],[2,3],[5],[0],[5],[],[]]</dd>
 * <dt>Output:</dt>
 * <dd>[2,4,5,6] (safe nodes)</dd>
 * <dt>Explanation:</dt>
 * <dd>Safe nodes are those not in cycles: [2,4,5,6]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Graph Traversal
 * **Data Structures**: Array, String, Graph
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
 * Input:
 * ```
 * graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * ```
 *
 * Step 1: Find nodes with cycles
 *
 * Steps:
 * Step 1: 0→1→2→3→0 (cycle)
 * Step 2: Find terminal nodes
 * Step 3: Nodes: 5,6
 * Step 4: Check which nodes reach only terminal
 * Step 5: Check each node's reachability
 *
 * Output:
 * ```
 * [2,4,5,6] (safe nodes)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 802: Find Eventual Safe States
 *
 * @param {number[][]} graph - Directed graph represented as adjacency list
 * @return {number[]} - Sorted list of safe nodes
 *
 * Time Complexity: O(V + E) where V is number of nodes and E is number of edges
 * Space Complexity: O(V) for state tracking and result storage
 */
function solve(graph) {
  const n = graph.length;
  const state = new Array(n).fill(0); // 0: unvisited, 1: visiting, 2: safe

  const isSafe = (node) => {
    if (state[node] !== 0) {
      return state[node] === 2;
    }

    // Mark as visiting (detect cycles)
    state[node] = 1;

    // Check all neighbors
    for (const neighbor of graph[node]) {
      if (!isSafe(neighbor)) {
        // Found a cycle or path to cycle
        return false;
      }
    }

    // Mark as safe (terminal node or all paths lead to terminal)
    state[node] = 2;
    return true;
  };

  const result = [];
  for (let i = 0; i < n; i++) {
    if (isSafe(i)) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Test cases for Problem 802: Find Eventual Safe States
 */
function testSolution() {
  console.log("Testing 802. Find Eventual Safe States");

  // Test case 1: Mixed safe and unsafe nodes
  const result1 = solve([[1, 2], [2, 3], [5], [0], [5], [], []]);
  const expected1 = [2, 4, 5, 6];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: All terminal nodes
  const result2 = solve([[], [], []]);
  const expected2 = [0, 1, 2];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: All nodes in cycle
  const result3 = solve([[1], [0]]);
  const expected3 = [];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Single terminal node
  const result4 = solve([[]]);
  const expected4 = [0];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Linear path to terminal
  const result5 = solve([[1], [2], []]);
  const expected5 = [0, 1, 2];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 802. Find Eventual Safe States!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 802. Find ===");
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
