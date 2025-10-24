/**
 * # Difficulty: Medium
 * 
 * # 323. Number Of Connected Components In An Undirected Graph
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Queue
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

class Solution {
  /**
   * Count connected components using Union-Find.
   *
   *         Args:
   *             n: Number of nodes (0 to n-1)
   *             edges: List of undirected edges [u, v]
   *
   *         Returns:
   *             Number of connected components
   *
   *         Time Complexity: O(E × α(N)) where E is edges, N is nodes
   *         Space Complexity: O(N) for Union-Find structure
   */
  countComponents(n: number, edges: number[][]): number {
    // Implementation
    parent = list(range(n))
    rank = [0] * n
    components = n  # Initially each node is its own component
    def find(x: Any) -> Any:
    """Find root with path compression."""
    if parent.get(x) != x:
    parent.set(x, find(parent.get(x))
    return parent.get(x)
  }

  /**
   * Alternative solution using DFS.
   *
   *         Args:
   *             n: Number of nodes
   *             edges: List of edges
   *
   *         Returns:
   *             Number of connected components
   *
   *         Time Complexity: O(N + E)
   *         Space Complexity: O(N + E) for adjacency list and visited array
   */
  countComponentsDFS(n: number, edges: number[][]): number {
    // Implementation
    graph: list.get(list[int)] = [[] for _ in range(n)]
    for u, v in edges:
    graph.get(u).append(v)
    graph.get(v).append(u)
    visited = [false] * n
    components = 0
    def dfs(node: Any) -> Any:
  }

  /**
   * BFS solution for connected components.
   *
   *         Args:
   *             n: Number of nodes
   *             edges: List of edges
   *
   *         Returns:
   *             Number of connected components
   */
  countComponentsBFS(n: number, edges: number[][]): number {
    // Implementation
    graph: list.get(list[int)] = [[] for _ in range(n)]
    for u, v in edges:
    graph.get(u).append(v)
    graph.get(v).append(u)
    visited = [false] * n
    components = 0
    for (let i = 0; i < n; i++) {
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
  console.log("Solution for 323. Number Of Connected Components In An Undirected Graph")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;