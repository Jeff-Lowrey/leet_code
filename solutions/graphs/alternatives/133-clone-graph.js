/**
 * # Difficulty: Medium
 *
 * Given a reference of a node in a connected undirected graph, return a deep copy
 * (clone) of the graph.
 *
 * Each `node` in the graph contains a value (int) and a list (List[Node]) of its neighbors.
 *
 * Example:
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Output: [[2,4],[1,3],[2,4],[1,3]]
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
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
 * ```
 * Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
 * Step 1: Start BFS from node 1
 *   Create clone of node 1
 *   visited = {1: Node(1)}
 *
 * Step 2: Process neighbors of node 1 (nodes 2 and 4)
 *   Clone node 2, add to visited
 *   Clone node 4, add to visited
 *   Connect node 1 to nodes 2 and 4
 *
 * Step 3: Process node 2 neighbors (nodes 1 and 3)
 *   Node 1 already cloned
 *   Clone node 3, connect to node 2
 *
 * Step 4: Process remaining nodes
 *   Build all connections maintaining graph structure
 *
 * Output: Cloned graph with same structure
 * ```
 *
 * ### TIME COMPLEXITY:
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

// Definition for a Node
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

/**
 * Main solution for Problem 133: Clone Graph
 *
 * @param {Node} node - The node representing the graph to clone
 * @return {Node} - The cloned graph starting node
 *
 * Time Complexity: O(V + E) - visit each node and edge once
 * Space Complexity: O(V) - hash map and recursion stack
 */
function solve(node) {
  if (!node) return null;

  const visited = new Map();

  function dfs(node) {
    // If already cloned, return the clone
    if (visited.has(node.val)) {
      return visited.get(node.val);
    }

    // Create clone of current node
    const clone = new Node(node.val);
    visited.set(node.val, clone);

    // Clone all neighbors recursively
    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}

/**
 * Test cases for Problem 133: Clone Graph
 */
function testSolution() {
  console.log("Testing 133. Clone Graph");

  // Helper function to compare graphs
  function compareGraphs(original, cloned, visited = new Set()) {
    if (!original && !cloned) return true;
    if (!original || !cloned) return false;
    if (original.val !== cloned.val) return false;
    if (original === cloned) return false; // Should be different objects

    if (visited.has(original.val)) return true;
    visited.add(original.val);

    if (original.neighbors.length !== cloned.neighbors.length) return false;

    for (let i = 0; i < original.neighbors.length; i++) {
      if (!compareGraphs(original.neighbors[i], cloned.neighbors[i], visited)) {
        return false;
      }
    }
    return true;
  }

  // Test case 1: Empty graph
  const result1 = solve(null);
  console.assert(
    result1 === null,
    `Test 1 failed: expected null, got ${result1}`,
  );

  // Test case 2: Single node
  const node2 = new Node(1);
  const result2 = solve(node2);
  console.assert(
    result2.val === 1 && result2.neighbors.length === 0,
    `Test 2 failed: single node clone incorrect`,
  );

  // Test case 3: Two connected nodes
  const node3a = new Node(1);
  const node3b = new Node(2);
  node3a.neighbors = [node3b];
  node3b.neighbors = [node3a];
  const result3 = solve(node3a);
  console.assert(
    compareGraphs(node3a, result3),
    `Test 3 failed: two node graph clone incorrect`,
  );

  // Test case 4: Four node graph (cycle)
  const node4a = new Node(1);
  const node4b = new Node(2);
  const node4c = new Node(3);
  const node4d = new Node(4);
  node4a.neighbors = [node4b, node4d];
  node4b.neighbors = [node4a, node4c];
  node4c.neighbors = [node4b, node4d];
  node4d.neighbors = [node4a, node4c];
  const result4 = solve(node4a);
  console.assert(
    compareGraphs(node4a, result4),
    `Test 4 failed: four node graph clone incorrect`,
  );

  // Test case 5: Self-loop
  const node5 = new Node(1);
  node5.neighbors = [node5];
  const result5 = solve(node5);
  console.assert(
    result5.val === 1 && result5.neighbors[0] === result5,
    `Test 5 failed: self-loop clone incorrect`,
  );

  // Test case 6: Complex graph with multiple paths
  const node6a = new Node(1);
  const node6b = new Node(2);
  const node6c = new Node(3);
  node6a.neighbors = [node6b, node6c];
  node6b.neighbors = [node6a, node6c];
  node6c.neighbors = [node6a, node6b];
  const result6 = solve(node6a);
  console.assert(
    compareGraphs(node6a, result6),
    `Test 6 failed: triangle graph clone incorrect`,
  );

  console.log("All test cases passed for 133. Clone Graph!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 133. Clone Graph ===");
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
  Node,
};

/**
 * Additional Notes:
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
