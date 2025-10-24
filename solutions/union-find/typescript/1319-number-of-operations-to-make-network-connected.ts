/**
 * # Difficulty: Medium
 * 
 * # 1319. Number Of Operations To Make Network Connected
 * 
 * You are given n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] connects computers ai and bi.
 * 
 * Any computer can reach any other computer directly or indirectly through the network.
 * 
 * You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.
 * 
 * Return the minimum number of times you need to do this to make all the computers connected. If it is not possible, return -1.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 4, connections = [[0,1],[0,2],[1,2],[1,3]]</dd>
 * <dt>Output:</dt>
 * <dd>Total cables: 4, Need: 3, Spare: 1</dd>
 * <dt>Explanation:</dt>
 * <dd>Operations to make network connected is 1</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Hash Table Pattern, Divide and Conquer
 * **Time Complexity**: O(n × α(n))
 * **Space Complexity**: O(n) - Additional set storage
 * 
 * ### INTUITION:
 * This is a classic Union-Find problem about connecting components. Key insights:
 * - To connect n computers, we need at least n-1 cables
 * - Extra cables can be moved to connect separate components
 * - Count disconnected components and check if we have enough spare cables
 * 
 * ### APPROACH:
 * 1. **Check minimum cables**: Need at least n-1 cables total
 * 2. **Union-Find**: Group computers into connected components
 * 3. **Count components**: Find number of separate groups
 * 4. **Calculate operations**: (components - 1) operations needed to connect all
 * 
 * ### WHY THIS WORKS:
 * - Union-Find efficiently tracks connected components
 * - Each component merge requires exactly 1 cable
 * - Spare cables = total_cables - (n - components)
 * - Need (components - 1) cables to connect all components
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 4, connections = [[0,1],[0,2],[1,2],[1,3]]
 * ```
 *
 * Total cables: 4, Need: 3, Spare: 1
 * Union-Find process:
 * - Connect 0-1: components = {0,1}, {2}, {3}
 * - Connect 0-2: components = {0,1,2}, {3}
 * - Connect 1-2: redundant (already connected)
 * - Connect 1-3: components = {0,1,2,3}
 * Components: 1, Operations needed: 0

### TIME COMPLEXITY:
 * O(n × α(n))
 * Where α is the inverse Ackermann function (nearly constant)
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * For Union-Find parent and rank arrays
 * 
 * ### EDGE CASES:
 * - Not enough cables: return -1
 * - Already connected: return 0
 * - Multiple components with spare cables
 * 
 * </details>
 */

class Solution {
  /**
   * Find minimum operations to connect all computers using Union-Find.
   *
   *         Args:
   *             n: Number of computers (0 to n-1)
   *             connections: List of [a, b] cable connections
   *
   *         Returns:
   *             Minimum operations needed, or -1 if impossible
   *
   *         Time Complexity: O(n × α(n)) where α is inverse Ackermann
   *         Space Complexity: O(n) for Union-Find structure
   */
  makeConnected(n: number, connections: number[][]): number {
    // Implementation
    if connections.length < n - 1:
    return -1
    uf = UnionFind(n)
    for a, b in connections:
    uf.union(a, b)
  }

  /**
   * Alternative solution using manual component counting.
   *
   *         Args:
   *             n: Number of computers
   *             connections: Cable connections
   *
   *         Returns:
   *             Minimum operations needed, or -1 if impossible
   */
  makeConnectedAlternative(n: number, connections: number[][]): number {
    // Implementation
    if connections.length < n - 1:
    return -1
    graph: list.get(list[int)] = [[] for _ in range(n)]
    for a, b in connections:
    graph.get(a).append(b)
    graph.get(b).append(a)
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log("=== 1319. Number Of Operations To Make Network Connected ===")
  console.log(
  f"makeConnected(4, [[0,1],[0,2],[1,2],[1,3]]) -> {solution.makeConnected(4, [[0, 1], [0, 2], [1, 2], [1, 3]])}"
  )
  console.log(
  f"makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]]) -> {solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3]])}"
  )
  console.log(
  f"makeConnected(6, [[0,1],[0,2],[0,3],[1,2]]) -> {solution.makeConnected(6, [[0, 1], [0, 2], [0, 3], [1, 2]])}"
  )
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;