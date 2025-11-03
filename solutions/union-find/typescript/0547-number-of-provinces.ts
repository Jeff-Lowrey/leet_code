/**
# 0547. Problem
 * 
 * # Difficulty: Medium
 * # 0547. Number of Provinces
 * 
 * There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
 * 
 * A province is a group of directly or indirectly connected cities and no other cities outside of the group.
 * 
 * You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
 * 
 * Return the total number of provinces.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>isConnected = [[1,1,0],[1,1,0],[0,0,1]]</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 2 provinces: students 0 and 1 are connected, student 2 is separate</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Stack
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n² × α(n))
 * **Space Complexity**: O(n) - Additional set storage
 * 
 * ### INTUITION:
 * This is a classic connected components problem. We need to find how many separate groups of cities exist. Cities in the same group are either directly or indirectly connected. Union-Find is perfect for this as it efficiently manages and counts connected components.
 * 
 * ### APPROACH:
 * 1. **Union-Find Structure**: Create a union-find data structure for n cities
 * 2. **Process Connections**: For each connection in the matrix, union the two cities
 * 3. **Count Components**: Count the number of unique root parents (components)
 * 4. **Alternative DFS**: Can also use DFS to mark visited cities in each component
 * 
 * ### WHY THIS WORKS:
- This ensures that union-Find automatically groups connected cities into components
- This ensures that each connected component represents one province
- This ensures that after processing all connections, count unique roots to get province count
- This ensures that dFS alternative marks all cities in a component as visited



This solution uses hash table lookup for efficient implementation.

This solution uses hash map storage for efficient implementation.

This solution uses array traversal for efficient implementation.

### EXAMPLE WALKTHROUGH:
 * Given input isConnected = [[1,1,0],:
 *
 * Input:
 * ```
 * isConnected = [[1,1,0],
 * ```
 *
 * [1,1,0],
 * [0,0,1]]
 * Cities: 0, 1, 2
 * Connections: 0-1 (direct), 2 (isolated)
 * Union-Find process:
 * 1. Initialize: parent = [0,1,2], each city is its own component
 *
 * Steps:
 * Step 1: Process (0,1): union(0,1) → parent = [1,1,2]
 * Step 2: Process (1,0): already connected, skip
 * Step 3: Process (2,2): self-connection, skip
 * Step 4: Count unique roots: 1 (for cities 0,1) and 2 (for city 2)
 * Step 5: Result: 2 provinces
 * 
 * Output:
 * ```
 * 2 provinces
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n² × α(n))
 * Where α is the inverse Ackermann function (nearly constant)
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional set storage
 * For the Union-Find parent and rank arrays
 * 
 * ### EDGE CASES:
 * - **Single city**: Return 1 (one province)
 * - **All cities connected**: Return 1 (all form single province)
 * - **All cities isolated**: Return n (each city is its own province)
 * - **Empty matrix**: Return 0 (no cities)
 * - **Two separate groups**: Union-find counts distinct components correctly
 * 
 * </details>
 */

class Solution {
  /**
   * Find number of provinces using Union-Find.
   *
   *         Args:
   *             isConnected: n x n adjacency matrix where isConnected[i][j] = 1
   *                         means city i and city j are directly connected
   *
   *         Returns:
   *             Number of provinces (connected components)
   *
   *         Time Complexity: O(n² × α(n)) where α is inverse Ackermann
   *         Space Complexity: O(n) for Union-Find structure
   */
  findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = Array(n).fill(0);
    let components = n;

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
        components--;
      }
    };

    // Process all connections
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {  // Only check upper triangle (symmetric matrix)
        if (isConnected[i][j] === 1) {
          union(i, j);
        }
      }
    }

    return components;
  }

  /**
   * Alternative DFS solution.
   *
   *         Args:
   *             isConnected: Adjacency matrix
   *
   *         Returns:
   *             Number of provinces
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(n) for visited array and recursion stack
   */
  findCircleNumDFS(isConnected: number[][]): number {
    const n = isConnected.length;
    const visited = Array(n).fill(false);
    let provinces = 0;

    const dfs = (city: number): void => {
      visited[city] = true;
      for (let neighbor = 0; neighbor < n; neighbor++) {
        if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
          dfs(neighbor);
        }
      }
    };

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        provinces++;
        dfs(i);
      }
    }

    return provinces;
  }

  /**
   * Alternative BFS solution.
   *
   *         Args:
   *             isConnected: Adjacency matrix
   *
   *         Returns:
   *             Number of provinces
   */
  findCircleNumBFS(isConnected: number[][]): number {
    const n = isConnected.length;
    const visited = Array(n).fill(false);
    let provinces = 0;

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        provinces++;
        const queue: number[] = [i];
        visited[i] = true;

        while (queue.length > 0) {
          const city = queue.shift()!;
          for (let neighbor = 0; neighbor < n; neighbor++) {
            if (isConnected[city][neighbor] === 1 && !visited[neighbor]) {
              visited[neighbor] = true;
              queue.push(neighbor);
            }
          }
        }
      }
    }

    return provinces;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 547. Number of Provinces ===");

  // Example 1: Two provinces
  const isConnected1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]];
  const result1 = solution.findCircleNum(isConnected1);
  console.log(`findCircleNum(${JSON.stringify(isConnected1)}) -> ${result1}`);
  console.log("Explanation: Cities 0 and 1 form one province, city 2 forms another\n");

  // Example 2: Three isolated cities
  const isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const result2 = solution.findCircleNum(isConnected2);
  console.log(`findCircleNum(${JSON.stringify(isConnected2)}) -> ${result2}`);
  console.log("Explanation: Each city is its own province\n");

  // Example 3: All connected
  const isConnected3 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
  const result3 = solution.findCircleNum(isConnected3);
  console.log(`findCircleNum(${JSON.stringify(isConnected3)}) -> ${result3}`);
  console.log("Explanation: All cities form one big province\n");

  // Compare different approaches
  console.log("Algorithm comparison:");
  const approaches: [string, (arr: number[][]) => number][] = [
    ["Union-Find", (arr) => solution.findCircleNum(arr)],
    ["DFS", (arr) => solution.findCircleNumDFS(arr)],
    ["BFS", (arr) => solution.findCircleNumBFS(arr)],
  ];

  for (const [name, method] of approaches) {
    const result = method(isConnected1);
    console.log(`${name}: ${result}`);
  }

  console.log("\nKey insights:");
  console.log("1. Connected components problem - find separate groups");
  console.log("2. Union-Find efficiently manages component membership");
  console.log("3. DFS/BFS can mark all cities in a component as visited");
  console.log("4. Matrix is symmetric (undirected graph)");
  console.log("5. Count unique components to get number of provinces");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;