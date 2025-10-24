/**
 * # 133. Clone Graph
 * 
 * # Difficulty: Medium
 * 
 * Given a reference of a node in a connected undirected graph, return a deep copy
 * (clone) of the graph.
 * 
 * Each `node` in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>adjList = [[2,4],[1,3],[2,4],[1,3]]</dd>
 * <dt>Output:</dt>
 * <dd>[[2,4],[1,3],[2,4],[1,3]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Graph node is cloned with all connections preserved</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(V + E) - visit each node and edge once
 * **Space Complexity**: O(V) - hash map and recursion stack
 * 
 * ### INTUITION:
 * To clone a graph, we need to create new nodes and preserve the neighbor relationships.
 * The key challenge is handling `cycles - we` need to avoid infinite loops.
 * 
 * ### APPROACH:
 * 1. **Handle empty graph**: Return None immediately if input node is None
 * 2. **Initialize hash map**: Create a dictionary to map original nodes to their clones and track visited nodes
 * 3. **Start DFS traversal**: Begin recursive depth-first search from the given node
 * 4. **Check if already cloned**: If current node is already in the hash map, return its clone (prevents infinite loops)
 * 5. **Clone current node**: Create a new node with the same value and add the mapping to hash map
 * 6. **Clone neighbors recursively**: For each neighbor of current node, recursively call DFS to get cloned neighbor
 * 7. **Build neighbor connections**: Append each cloned neighbor to the current clone's neighbor list, preserving graph structure
 * 
 * ### WHY THIS WORKS:
 * By using a hash map to track visited nodes, we ensure each node is cloned exactly once, preventing infinite loops in the presence of cycles. The DFS/BFS traversal guarantees we visit every reachable node, and by cloning neighbors recursively, we preserve the exact structure and relationships of the original graph. The hash map serves both as a visited tracker and a lookup for already-cloned nodes.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * adjList = [[2,4],[1,3],[2,4],[1,3]]
 * ```
 *
 * Step 1: Start BFS from node 1
 * Create clone of node 1
 * visited = {1: Node(1)}
 * Step 2: Process neighbors of node 1 (nodes 2 and 4)
 * Clone node 2, add to visited
 * Clone node 4, add to visited
 * Connect node 1 to nodes 2 and 4
 * Step 3: Process node 2 neighbors (nodes 1 and 3)
 * Node 1 already cloned
 * Clone node 3, connect to node 2
 * Step 4: Process remaining nodes
 * Build all connections maintaining graph structure
 *
 * Output:
 * ```
 * Cloned graph with same structure
 * ```

### TIME COMPLEXITY:
 * O(V + E) - visit each node and edge once
 * 
 * ### SPACE COMPLEXITY:
 * O(V) - hash map and recursion stack
 * 
 * ### EDGE CASES:
 * - **Null/empty graph**: Return None immediately
 * - **Single node with no neighbors**: Clone node with empty neighbor list
 * - **Graph with cycles**: Visited map prevents infinite loops
 * - **Fully connected graph**: All nodes are neighbors of each other
 * - **Self-loops**: Node points to itself, handled by visited check
 * 
 * </details>
 */

class Solution {
  /**
   * Approach: DFS with hash map
   *         Time Complexity: O(V + E)
   *         Space Complexity: O(V)
   */
  cloneGraph(node: any): any {
    // Implementation
    if not node:
    return null  # type: ignore
    visited: dict[Any, Any] = {}
    def dfs(node: Any) -> Any:
    if (visited.has(node)) {
    return visited.get(node)
  }

  /**
   * Approach: BFS with hash map
   *         Time Complexity: O(V + E)
   *         Space Complexity: O(V)
   */
  cloneGraphBFS(node: any): any {
    // Implementation
    if not node:
    return null  # type: ignore
    visited = {node: Node(node.val)}
    queue = deque([node])
    while queue:
    current = queue.popleft()
    for neighbor in current.neighbors:
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Pacific Atlantic Water Flow
  solution_water = SolutionWaterFlow()
  console.log("Pacific Atlantic Water Flow:")
  heights = [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]
  result = solution_water.pacificAtlantic(heights)
  console.log("Heights matrix:")
  for row in heights:
  console.log(row)
  console.log(`Cells reaching both oceans: result\n`)
  # Test Word Search
  solution_word = SolutionWordSearch()
  console.log("Word Search:")
  board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
  words = ["ABCCED", "SEE", "ABCB"]
  for word in words:
  found: bool = solution_word.exist(board, word)
  console.log(`Word: '{word}' -> Found: {found}`)
  console.log("\n" + "=" * 50 + "\n")
  # Test Number of Components
  solution_comp = SolutionComponents()
  console.log("Number of Connected Components:")
  test_cases = [(5, [[0, 1], [1, 2], [3, 4]]), (5, [[0, 1], [1, 2], [2, 3], [3, 4]]), (4, [[0, 1], [2, 3]])]
  for n, edges in test_cases:
  num_components: int = solution_comp.countComponents(n, edges)
  console.log(`n=n, edges={edges}`)
  console.log(`Components: {num_components}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;