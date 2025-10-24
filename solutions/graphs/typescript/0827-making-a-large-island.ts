/**
 * # Difficulty: Hard
 * 
 * # 827. Making A Large Island
 * 
 * You are given an n x n binary matrix grid. You are allowed to change at most one 0 to a 1.
 * 
 * Return the size of the largest island in grid after applying this operation.
 * 
 * An island is a group of 1's connected 4-directionally (horizontal or vertical). If there is no 0 to change, return the area of the whole grid.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Largest island after flipping one 0 to 1 has area 5</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Greedy Algorithm, Graph Pattern
 * **Time Complexity**: O(N²)
 * **Space Complexity**: O(N²)
 * 
 * ### INTUITION:
 * This problem extends island finding by allowing us to change one 0 to 1 to maximize island size. The key insight is to first identify all existing islands, then for each 0, calculate what the new island size would be if we changed it to 1.
 * 
 * ### APPROACH:
 * 1. **Label islands**: Give each island a unique ID and calculate its size
 * 2. **For each water cell**: Calculate potential island size if flipped to land
 * 3. **Consider merging**: A flipped cell can connect multiple existing islands
 * 4. **Track maximum**: Keep track of the largest possible island size
 * 
 * ### WHY THIS WORKS:
 * - Pre-labeling islands allows O(1) lookup of island sizes
 * - For each 0, we check its 4 neighbors to see which islands it would connect
 * - Sum of connected island sizes + 1 (the flipped cell) gives new island size
 * - Handle edge case where grid is already all 1's
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Grid: [[1,0],[0,1]]
 * ```
 *
 * Step 1 - Label islands:
 * Island 2: [(0,0)] size=1
 * Island 3: [(1,1)] size=1
 * Labeled grid: [[2,0],[0,3]]
 * Step 2 - Try flipping each 0:
 *
 * Steps:
 * Step 1: Flip (0,1): neighbors are [2] → new size = 1 + 1 = 2
 * Step 2: Flip (1,0): neighbors are [2,3] → new size = 1 + 1 + 1 = 3
 * Step 3: Maximum possible island size: 3

### TIME COMPLEXITY:
 * O(N²)
 * Where N is grid dimension - two passes through the grid
 * 
 * ### SPACE COMPLEXITY:
 * O(N²)
 * For island labeling and size storage
 * 
 * ### EDGE CASES:
 * - **All water**: Return 1 (can only change one cell)
 * - **All land**: Return total cells (already one island)
 * - **No water cells**: Cannot change anything, return current max
 * - **Multiple small islands**: Changing water can connect them
 * - **Single island**: Changing water expands it by 1
 * 
 * </details>
 */

class Solution {
  /**
   * Find largest possible island after flipping at most one 0 to 1.
   *
   *         Args:
   *             grid: n x n binary matrix
   *
   *         Returns:
   *             Size of largest possible island
   *
   *         Time Complexity: O(N²)
   *         Space Complexity: O(N²)
   */
  largestIsland(grid: number[][]): number {
    // Implementation
    n = grid.length
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    island_id = 2  # Start from 2 (since 0=water, 1=unlabeled land)
    island_sizes: dict[Any, Any] = {}
    def dfs(r: Any, c: Any, island_id: Any) -> Any:
    """DFS to label island and return its size."""
    if r < 0 or r >= n or c < 0 or c >= n or grid.get(r)[c] != 1:
  }

  /**
   * Alternative approach using Union-Find.
   *
   *         Args:
   *             grid: n x n binary matrix
   *
   *         Returns:
   *             Size of largest possible island
   */
  largestIslandAlternative(grid: number[][]): number {
    // Implementation
    n = grid.length
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    class UnionFind:
    def __init__(self: Any, size: Any) -> null:
    self.parent = list(range(size))
    self.size = [1] * size
    def find(self: Any, x: Any) -> Any:
    if self.parent.get(x) != x:
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
  grid = [[1, 0], [0, 1]]
  console.log(`Max island after one flip: {solution.largestIsland([[row.get(i) for i in range(row.length)] for row in grid])}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;