/**
 * # Difficulty: Medium
 * 
 * # 695. Max Area Of Island
 * 
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
 * 
 * The area of an island is the number of cells with a value 1 in the island.
 * 
 * Return the maximum area of an island in grid. If there is no island, return 0.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]</dd>
 * <dt>Output:</dt>
 * <dd>6</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum area of an island is 6 square units</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
 * **Data Structures**: Array, Stack, Queue
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(M × N)
 * **Space Complexity**: O(M × N)
 * 
 * ### INTUITION:
 * This is similar to "Number of Islands" but instead of counting islands, we need to find the largest island by area. We use DFS/BFS to explore each island and calculate its area, keeping track of the maximum area found.
 * 
 * ### APPROACH:
 * 1. **Iterate through grid**: Check each cell
 * 2. **Find land**: When we find a 1 (land), start exploring the island
 * 3. **DFS/BFS exploration**: Count all connected land cells (area)
 * 4. **Track maximum**: Keep track of the largest area found
 * 5. **Mark visited**: Avoid double-counting cells
 * 
 * ### WHY THIS WORKS:
 * - DFS/BFS explores connected components completely
 * - Each exploration returns the area of that island
 * - We track the maximum area across all islands
 * - In-place marking ensures each cell is counted exactly once
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Grid: [[0,0,1,0,0,0,0,1,0,0,0,0,0],
 * ```
 *
 * [0,0,0,0,0,0,0,1,1,1,0,0,0],
 * [0,1,1,0,1,0,0,0,0,0,0,0,0],
 * [0,1,0,0,1,1,0,0,1,0,1,0,0]]
 * Islands found:
 * - (0,2): area = 1
 * - (0,7), (1,7), (1,8), (1,9): area = 4
 * - (2,1), (2,2), (3,1): area = 3
 * - (2,4), (3,4), (3,5): area = 3
 * - (3,8): area = 1
 * - (3,10): area = 1
 * Maximum area = 4

### TIME COMPLEXITY:
 * O(M × N)
 * We visit each cell at most once
 * 
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For recursion stack in worst case
 * 
 * ### EDGE CASES:
 * - **All water**: Return 0 (no islands)
 * - **Single cell island**: Return 1
 * - **Entire grid is one island**: Return m * n
 * - **Multiple islands**: Return area of largest
 * - **Empty grid**: Return 0
 * 
 * </details>
 */

class Solution {
  /**
   * Find maximum island area using DFS.
   *
   *         Args:
   *             grid: 2D binary grid where 1 = land, 0 = water
   *
   *         Returns:
   *             Maximum area of any island
   *
   *         Time Complexity: O(M × N)
   *         Space Complexity: O(M × N) for recursion stack
   */
  maxAreaOfIsland(grid: number[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    max_area = 0
    def dfs(r: Any, c: Any) -> Any:
    """DFS to calculate area of island starting at (r,c)."""
    if r < 0 or r >= rows or c < 0 or c >= cols or grid.get(r)[c] == 0:
    return 0
  }

  /**
   * BFS approach to avoid recursion stack issues.
   */
  maxAreaOfIslandBFS(grid: number[][]): number {
    // Implementation
    if not grid or not grid.get(0):
    return 0
    rows, cols = grid.length, grid.get(0).length
    max_area = 0
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
    if grid.get(r)[c] == 1:
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
  grid = [[1, 1, 0], [0, 1, 0], [0, 0, 1]]
  console.log(`Grid: {grid}`)
  # Use BFS to preserve original grid
  console.log(`Max area: {solution.maxAreaOfIslandBFS([row.get(:) for row in grid])}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;