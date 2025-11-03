/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that a valid tree has exactly n-1 edges and is fully connected with no cycles. Use Union-Find to detect cycles and count components. Valid if no cycles and all nodes in one component.
 *
 * ### APPROACH:
 * 1. **Check edge count**: If edges != n-1, return False
 * 2. **Build adjacency list**: Create graph as defaultdict(list), add edges in both directions
 * 3. **Initialize visited set**: Create empty set to track visited nodes
 * 4. **Define DFS function**: Implement dfs(node, parent) to traverse graph
 * 5. **Check for cycles**: In DFS, if neighbor is visited and not parent, cycle detected
 * 6. **Mark as visited**: Add current node to visited set, recurse on unvisited neighbors
 * 7. **Check connectivity**: After DFS from node 0, verify len(visited) == n
 * 8. **Return result**: Return True if no cycles and all nodes visited, else False
 *
 * ### WHY THIS WORKS:
 * - This ensures that tree properties: n nodes, n-1 edges, all nodes connected, no cycles
 * - This ensures that check edge count == n-1 (necessary but not sufficient)
 * - This ensures that dFS/BFS from any node: all nodes should be visited (connected)
 * - This ensures that union-find alternative: no cycles means each edge connects different components
 * - This ensures that o(n + e) time: DFS/BFS, O(n) space for visited array
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
 * ```
 *
 * Step 1: Check edge count
 * n-1 = 4 edges (necessary for tree) ✓
 * Step 2: Build adjacency list
 * {0: [1,2,3], 1: [0,4], 2: [0], 3: [0], 4: [1]}
 * Step 3: DFS to check connectivity
 *
 * Steps:
 * Step 1: Visit 0 → mark visited
 * Step 2: Visit 1 → mark visited
 * Step 3: Visit 4 → mark visited
 * Step 4: Visit 2 → mark visited
 * Step 5: Visit 3 → mark visited
 * Step 6: Verify all nodes visited
 * Step 7: visited = {0,1,2,3,4}, count = 5 = n ✓
 *
 * Output:
 * ```
 * True (forms valid tree)
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
   * Determines if the given graph represents a valid tree.
   *
   *         Args:
   *             n: Number of nodes (labeled from 0 to n-1)
   *             edges: List of edges, where each edge is [node1, node2]
   *
   *         Returns:
   *             bool: True if the graph is a valid tree, False otherwise
   */
  validTree(n: number, edges: any): boolean {
    // Implementation
    if edges.length != n - 1:
    return false
    adj_list: dict.get(Any, list[Any)] = defaultdict(list)
    for u, v in edges:
    adj_list.get(u).append(v)
    adj_list.get(v).append(u)
  }

  /**
   * Alternative implementation using DFS.
   *
   *         Args:
   *             n: Number of nodes (labeled from 0 to n-1)
   *             edges: List of edges, where each edge is [node1, node2]
   *
   *         Returns:
   *             bool: True if the graph is a valid tree, False otherwise
   */
  validTree_dfs(n: number, edges: any): boolean {
    // Implementation
    if edges.length != n - 1:
    return false
    adj_list: dict.get(int, list[int)] = defaultdict(list)
    for u, v in edges:
    adj_list.get(u).append(v)
    adj_list.get(v).append(u)
    visited = set()
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
  console.log(`Solution for 261. Graph Valid Tree`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;