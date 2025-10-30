/**
 * 0323. Number Of Connected Components In An Undirected Graph
 *
 * Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
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
 *

This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses array traversal for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * Given input n = 5, edges = [[0,1],[1,2],[3,4]]:
 *
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
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);
    let components = n; // Initially each node is its own component

    const find = (x: number): number => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]); // Path compression
      }
      return parent[x];
    };

    const union = (x: number, y: number): void => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX !== rootY) {
        if (rank[rootX] < rank[rootY]) {
          parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
          parent[rootY] = rootX;
        } else {
          parent[rootY] = rootX;
          rank[rootX]++;
        }
        components--; // Merged two components
      }
    };

    // Process all edges
    for (const [u, v] of edges) {
      union(u, v);
    }

    return components;
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
    const graph: number[][] = Array.from({ length: n }, () => []);

    // Build adjacency list
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    const visited = Array(n).fill(false);
    let components = 0;

    const dfs = (node: number): void => {
      visited[node] = true;
      for (const neighbor of graph[node]) {
        if (!visited[neighbor]) {
          dfs(neighbor);
        }
      }
    };

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        components++;
        dfs(i);
      }
    }

    return components;
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
    const graph: number[][] = Array.from({ length: n }, () => []);

    // Build adjacency list
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }

    const visited = Array(n).fill(false);
    let components = 0;

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        components++;
        const queue: number[] = [i];
        visited[i] = true;

        while (queue.length > 0) {
          const node = queue.shift()!;
          for (const neighbor of graph[node]) {
            if (!visited[neighbor]) {
              visited[neighbor] = true;
              queue.push(neighbor);
            }
          }
        }
      }
    }

    return components;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 323. Number Of Connected Components In An Undirected Graph ===");

  const n = 5;
  const edges = [[0, 1], [1, 2], [3, 4]];
  console.log(`n=${n}, edges=${JSON.stringify(edges)}`);
  console.log("Union-Find:", solution.countComponents(n, edges));
  console.log("DFS:", solution.countComponentsDFS(n, edges));
  console.log("BFS:", solution.countComponentsBFS(n, edges));
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;