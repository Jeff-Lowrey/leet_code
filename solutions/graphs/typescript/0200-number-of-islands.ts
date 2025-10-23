/**
 * # Difficulty: Medium
 * 
 * # 200. Number Of Islands
 * 
 * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>There is 1 island (all connected 1's in top-left)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(M × N)
 * **Space Complexity**: O(M × N)
 * 
 * ### INTUITION:
 * This is a classic graph traversal problem where we need to find connected components. Each island is a connected component of '1's (land). We can use DFS or BFS to explore each island completely when we encounter it, then count how many separate islands we find.
 * 
 * ### APPROACH:
 * 1. **Iterate through grid**: Check each cell in the grid
 * 2. **Find land**: When we find a '1' (land), it's part of an island
 * 3. **Explore island**: Use DFS/BFS to mark all connected land as visited
 * 4. **Count islands**: Each time we start a new DFS/BFS, we found a new island
 * 5. **Mark visited**: Change '1' to '0' or use separate visited array
 * 
 * ### WHY THIS WORKS:
 * - DFS/BFS explores all connected components (islands) completely
 * - Once we've explored an island, we mark it as visited to avoid double-counting
 * - Each DFS/BFS start represents discovering a new island
 * - 4-directional connectivity defines what constitutes an island
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Grid: [["1","1","1","1","0"],
 *        ["1","1","0","1","0"],
 *        ["1","1","0","0","0"],
 *        ["0","0","0","0","0"]]
 * 
 * Process:
 * - Start at (0,0): DFS explores entire connected land mass
 * - Mark all connected '1's as visited: (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), (2,0), (2,1)
 * - Continue scanning: (1,3) is unvisited land → start new DFS
 * - DFS from (1,3) only marks (1,3) as it's isolated
 * - Total islands found: 2
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(M × N)
 * Where M and N are grid dimensions - we visit each cell at most once
 * 
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For recursion stack in worst case (entire grid is one island) or visited array
 * 
 * ### EDGE CASES:
 * - Empty grid
 * - All water ('0's)
 * - All land ('1's) - single island
 * - Single cell grid
 * - Grid with no islands
 * 
 * </details>
 */

class Solution {
  /**
   * Count islands using DFS approach with in-place modification.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands (connected components of land)
   *
   *         Time Complexity: O(M × N) where M, N are grid dimensions
   *         Space Complexity: O(M × N) for recursion stack in worst case
   */
  numIslands(grid: string[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    islands = 0
    def dfs(r: Any, c: Any) -> Any:
    """DFS to mark all connected land as visited."""
    if r < 0 or r >= rows or c < 0 or c >= cols or grid.get(r)[c] == "0":
  }

  /**
   * Count islands using BFS approach to avoid recursion stack overflow.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N)
   *         Space Complexity: O(min(M, N)) for queue in worst case
   */
  numIslandsBFS(grid: string[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    islands = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
    if grid.get(r)[c] == "1":
  }

  /**
   * Count islands using separate visited array (preserves original grid).
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N)
   *         Space Complexity: O(M × N) for visited array + recursion stack
   */
  numIslandsWithVisited(grid: string[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    visited = [[false] * cols for _ in range(rows)]
    islands = 0
    def dfs(r: Any, c: Any) -> Any:
    if r < 0 or r >= rows or c < 0 or c >= cols or visited.get(r)[c] or grid.get(r)[c] == "0":
    return
  }

  /**
   * Count islands using Union-Find data structure.
   *
   *         Args:
   *             grid: 2D grid of '1' (land) and '0' (water)
   *
   *         Returns:
   *             Number of islands
   *
   *         Time Complexity: O(M × N × α(M × N)) where α is inverse Ackermann
   *         Space Complexity: O(M × N) for Union-Find structure
   */
  numIslandsUnionFind(grid: string[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    class UnionFind:
    def __init__(self: Any, n: Any) -> null:
    self.parent = list(range(n))
    self.rank = [0] * n
    self.count = 0
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Quick example
  solution = Solution()
  grid = [["1", "1", "0"], ["0", "1", "0"], ["0", "0", "1"]]
  console.log(`Grid: {grid}`)
  console.log(`Islands: {solution.numIslandsWithVisited([row.get(:) for row in grid])}`)  # Preserve original
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;