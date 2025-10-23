/**
 * # Difficulty: Medium
 *
 * # 802. Find Eventual Safe States
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Build reverse graph (who reaches who). Use Kahn's algorithm. Nodes with out-degree 0 are safe (reach terminal). Process in reverse topological order to find all safe nodes.
 *
 * ### APPROACH:
 * 1. **Build graph**: Create adjacency list from graph edges
 * 2. **Track colors**: Use colors array: 0 = unvisited, 1 = visiting, 2 = visited
 * 3. **Define DFS**: Implement dfs(node) to detect cycles
 * 4. **Check visiting**: If colors[node] == 1, cycle detected, return False
 * 5. **Check visited**: If colors[node] == 2, already safe, return True
 * 6. **Mark visiting**: Set colors[node] = 1, explore all neighbors
 * 7. **Mark visited**: If all neighbors safe, set colors[node] = 2
 * 8. **Find safe nodes**: Return nodes where dfs(node) returns True
 *
 * ### WHY THIS WORKS:
 * - Reverse graph, find nodes from which all paths lead to terminals
 * - Color nodes: 0=unvisited, 1=visiting, 2=safe
 * - DFS: if all neighbors are safe, current node is safe
 * - If reaches cycle (visiting node), not safe
 * - O(V + E) time: DFS visits each node/edge once, O(V) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
 * Step 1: Find nodes with cycles
 *   0→1→2→3→0 (cycle)
 *
 * Step 2: Find terminal nodes
 *   Nodes: 5,6
 *
 * Step 3: Check which nodes reach only terminal
 *   Check each node's reachability
 *
 * Output: [2,4,5,6] (safe nodes)
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

class Solution {
  /**
   * Find all safe nodes using DFS with cycle detection.
   *
   * Time Complexity: O(V + E)
   * Space Complexity: O(V)
   */
  eventualSafeNodes(graph: number[][]): number[] {
    const n = graph.length;
    const visited: Set<number> = new Set();
    const safe: Set<number> = new Set();

    const isSafe = (node: number, cycle: Set<number>): boolean => {
      if (safe.has(node)) {
        return true;
      }

      if (cycle.has(node)) {
        return false;
      }

      if (visited.has(node) && !safe.has(node)) {
        return false;
      }

      cycle.add(node);
      visited.add(node);

      for (const neighbor of graph[node]) {
        if (!isSafe(neighbor, cycle)) {
          return false;
        }
      }

      cycle.delete(node);
      safe.add(node);
      return true;
    };

    for (let node = 0; node < n; node++) {
      if (!visited.has(node)) {
        isSafe(node, new Set());
      }
    }

    return Array.from(safe).sort((a, b) => a - b);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.eventualSafeNodes([[1, 2], [2, 3], [5], [0], [5], [], []]);
  const expected1 = [2, 4, 5, 6];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.eventualSafeNodes([[1], [2], [3], []]);
  const expected2 = [0, 1, 2, 3];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
