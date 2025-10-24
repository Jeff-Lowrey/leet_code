/**
 * # Difficulty: Medium
 * 
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
 * - Union-Find automatically groups connected cities into components
 * - Each connected component represents one province
 * - After processing all connections, count unique roots to get province count
 * - DFS alternative marks all cities in a component as visited
 * 
 * ### EXAMPLE WALKTHROUGH:
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
    // Implementation
    n = isConnected.length
    uf = UnionFind(n)
    for (let i = 0; i < n; i++) {
    for (let j = 0; j < i + 1, n; j++) {  # Only check upper triangle (symmetric matrix)
    if isConnected.get(i)[j] == 1:
    uf.union(i, j)
    return uf.components
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
    // Implementation
    n = isConnected.length
    visited = [false] * n
    provinces = 0
    def dfs(city: int) -> null:
    """Mark all cities in current province as visited."""
    visited.set(city, true
    for (let neighbor = 0; neighbor < n; neighbor++) {
    if isConnected.get(city)[neighbor] == 1 and not visited.get(neighbor):
    dfs(neighbor)
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
    // Implementation
    n = isConnected.length
    visited = [false] * n
    provinces = 0
    for (let i = 0; i < n; i++) {
    if not visited.get(i):
    queue = deque([i])
    visited.set(i, true
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
  console.log("=== 547. Number of Provinces ===")
  # Example 1: Two provinces
  isConnected1 = [[1, 1, 0], [1, 1, 0], [0, 0, 1]]
  result1 = solution.findCircleNum(isConnected1)
  console.log(`findCircleNum({isConnected1}) -> {result1}`)
  console.log("Explanation: Cities 0 and 1 form one province, city 2 forms another\n")
  # Example 2: Three isolated cities
  isConnected2 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
  result2 = solution.findCircleNum(isConnected2)
  console.log(`findCircleNum({isConnected2}) -> {result2}`)
  console.log("Explanation: Each city is its own province\n")
  # Example 3: All connected
  isConnected3 = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
  result3 = solution.findCircleNum(isConnected3)
  console.log(`findCircleNum({isConnected3}) -> {result3}`)
  console.log("Explanation: All cities form one big province\n")
  # Compare different approaches
  console.log("Algorithm comparison:")
  approaches = [
  ("Union-Find", solution.findCircleNum),
  ("DFS", solution.findCircleNumDFS),
  ("BFS", solution.findCircleNumBFS),
  ]
  for name, method in approaches:
  result = method(isConnected1)
  console.log(`{name}: result`)
  console.log("\nKey insights:")
  console.log("1. Connected components problem - find separate groups")
  console.log("2. Union-Find efficiently manages component membership")
  console.log("3. DFS/BFS can mark all cities in a component as visited")
  console.log("4. Matrix is symmetric (undirected graph)")
  console.log("5. Count unique components to get number of provinces")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;