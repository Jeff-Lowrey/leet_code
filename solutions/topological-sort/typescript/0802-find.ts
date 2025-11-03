/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that build reverse graph (who reaches who). Use Kahn's algorithm. Nodes with out-degree 0 are safe (reach terminal). Process in reverse topological order to find all safe nodes.
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
 * - This ensures that reverse graph, find nodes from which all paths lead to terminals
 * - This ensures that color nodes: 0=unvisited, 1=visiting, 2=safe
 * - This ensures that dFS: if all neighbors are safe, current node is safe
 * - This ensures that if reaches cycle (visiting node), not safe
 * - This ensures that o(V + E) time: DFS visits each node/edge once, O(V) space
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
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass with **O(1)** hash lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
