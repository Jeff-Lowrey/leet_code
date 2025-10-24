/**
 * # Difficulty: Medium
 *
 * # 684. Redundant Connection
 *
 * In this problem, a tree is an undirected graph that is connected and has no cycles.
 *
 * You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
 *
 * Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Redundant edge [2,3] can be removed to make tree</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: * O(n × α(n))
 * **Space Complexity**: * O(n) - Additional hash map storage

 *
 * ### INTUITION:
 * This is a classic Union-Find cycle detection problem. In a tree with n nodes, there should be exactly n-1 edges. When we add one extra edge, it creates a cycle. We need to find the edge that completes this cycle.
 *
 * ### APPROACH:
 * 1. **Use Union-Find**: Track connected components as we process edges
 * 2. **Cycle detection**: If two nodes are already connected and we try to add an edge between them, that edge creates a cycle
 * 3. **Return last occurrence**: The problem asks for the edge that occurs last in input if multiple answers exist
 *
 * ### WHY THIS WORKS:
 * - Union-Find efficiently tracks connected components
 * - When we encounter an edge between two nodes already in the same component, that edge creates a cycle
 * - The first such edge we encounter (processing left to right) is the redundant one
 * - This edge can be removed while keeping the graph connected
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * edges = [[1,2],[1,3],[2,3]]
 * ```
 *
 * Steps:
 * Step 1: Process edge [1,2]: 1 and 2 not connected → union them
 * Step 2: Process edge [1,3]: 1 and 3 not connected → union them
 * Step 3: Process edge [2,3]: 2 and 3 are already connected through 1 → redundant!
 * Step 4: Return [2,3]

### TIME COMPLEXITY:
 * O(n × α(n))
 * Where α is the inverse Ackermann function (nearly constant for practical purposes)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For the Union-Find parent array
 *
 * ### EDGE CASES:
 * - **Simple triangle**: Return last edge that completes the cycle
 * - **Large cycle**: Union-find detects first edge connecting already-connected nodes
 * - **Multiple possible answers**: Return edge that occurs last in input
 * - **Linear chain with one extra**: The extra edge creates the cycle
 * - **Self-loop edge**: Detected immediately by union-find
 *
 * </details>
 */

/**
 * Union-Find data structure with path compression and union by rank
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n + 1 }, (_, i) => i); // 1-indexed
    this.rank = new Array(n + 1).fill(0);
  }

  /**
   * Find root with path compression
   * @param {number} x
   * @returns {number} Root of x
   */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  /**
   * Union by rank. Returns true if union occurred, false if already connected
   * @param {number} x
   * @param {number} y
   * @returns {boolean} True if union occurred, False if already connected
   */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) {
      return false; // Already connected - would create cycle
    }

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
 * Find redundant edge using Union-Find cycle detection
 * @param {number[][]} edges - List of edges [u, v] representing undirected graph
 * @returns {number[]} The redundant edge that creates a cycle
 *
 * Time Complexity: O(n × α(n)) where α is inverse Ackermann
 * Space Complexity: O(n) for Union-Find structure
 */
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new UnionFind(n);

  for (const edge of edges) {
    const [u, v] = edge;

    // If nodes are already connected, this edge creates a cycle
    if (!uf.union(u, v)) {
      return edge;
    }
  }

  return []; // Should never reach here if input is valid
}

/**
 * Alternative DFS solution for comparison
 * @param {number[][]} edges - List of edges
 * @returns {number[]} The redundant edge
 */
function findRedundantConnectionDFS(edges) {
  const graph = new Map();

  /**
   * Check if path exists between source and target using DFS
   * @param {number} source
   * @param {number} target
   * @param {Set} visited
   * @returns {boolean}
   */
  function hasPath(source, target, visited) {
    if (source === target) {
      return true;
    }

    visited.add(source);

    for (const neighbor of graph.get(source) || []) {
      if (!visited.has(neighbor)) {
        if (hasPath(neighbor, target, visited)) {
          return true;
        }
      }
    }

    return false;
  }

  for (const edge of edges) {
    const [u, v] = edge;

    // Check if u and v are already connected
    if (graph.has(u) && graph.has(v) && hasPath(u, v, new Set())) {
      return edge;
    }

    // Add edge to graph
    if (!graph.has(u)) {
      graph.set(u, []);
    }
    if (!graph.has(v)) {
      graph.set(v, []);
    }

    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  return [];
}

/**
 * Test cases for Problem 684: Redundant Connection
 */
function testSolution() {
  console.log("Testing 684. Redundant Connection");

  // Test case 1: Simple triangle
  const edges1 = [
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const result1 = findRedundantConnection(edges1);
  const expected1 = [2, 3]; // Last edge that creates cycle
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Larger cycle
  const edges2 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ];
  const result2 = findRedundantConnection(edges2);
  const expected2 = [1, 4]; // Edge that completes cycle 1-2-3-4-1
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Linear then cycle
  const edges3 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [2, 5],
    [5, 4],
  ];
  const result3 = findRedundantConnection(edges3);
  const expected3 = [5, 4]; // Creates cycle through 2-3-4-5-2
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Simple cycle at end
  const edges4 = [
    [1, 2],
    [2, 3],
    [1, 3],
  ];
  const result4 = findRedundantConnection(edges4);
  const expected4 = [1, 3]; // Last edge creates triangle
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Complex graph
  const edges5 = [
    [2, 7],
    [7, 8],
    [3, 6],
    [2, 3],
    [6, 7],
    [2, 8],
    [1, 8],
  ];
  const result5 = findRedundantConnection(edges5);
  console.log(`Complex graph result: ${JSON.stringify(result5)}`);

  // Test DFS approach
  const result6 = findRedundantConnectionDFS(edges1);
  console.assert(
    JSON.stringify(result6) === JSON.stringify(expected1),
    `DFS test failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 684. Redundant Connection!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 684. Redundant Connection ===");
  console.log("Category: Union Find");
  console.log("Difficulty: Medium");
  console.log("");

  // Example 1
  console.log("Example 1: Simple triangle");
  const edges1 = [
    [1, 2],
    [1, 3],
    [2, 3],
  ];
  const result1 = findRedundantConnection(edges1);
  console.log(
    `findRedundantConnection(${JSON.stringify(edges1)}) -> ${JSON.stringify(result1)}`,
  );
  console.log("Explanation: Forms triangle, [2,3] is the last edge\n");

  // Example 2
  console.log("Example 2: Larger cycle");
  const edges2 = [
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 4],
    [1, 5],
  ];
  const result2 = findRedundantConnection(edges2);
  console.log(
    `findRedundantConnection(${JSON.stringify(edges2)}) -> ${JSON.stringify(result2)}`,
  );
  console.log("Explanation: [1,4] completes cycle 1→2→3→4→1\n");

  // Example 3: Alternative approach
  console.log("Example 3: Using DFS approach");
  const result3 = findRedundantConnectionDFS(edges1);
  console.log(
    `findRedundantConnectionDFS(${JSON.stringify(edges1)}) -> ${JSON.stringify(result3)}`,
  );
  console.log("Explanation: DFS detects existing path before adding edge\n");

  console.log("Key insights:");
  console.log("1. Tree with n nodes needs exactly n-1 edges");
  console.log("2. Extra edge creates exactly one cycle");
  console.log("3. Union-Find detects when nodes are already connected");
  console.log("4. First cycle-creating edge is the redundant one");
  console.log(
    '5. Process edges in order for correct "last occurrence" behavior',
  );

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  findRedundantConnection,
  findRedundantConnectionDFS,
  UnionFind,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution uses Union-Find with path compression and union by rank
 * - Time complexity is nearly O(n) due to inverse Ackermann function
 * - Alternative DFS approach has O(V + E) complexity per edge check
 * - The problem reduces to detecting the first cycle-creating edge
 * - Essential insight: in a tree, any extra edge creates exactly one cycle
 */
