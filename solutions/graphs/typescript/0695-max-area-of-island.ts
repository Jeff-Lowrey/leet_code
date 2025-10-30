/**
 * 0695. Max Area Of Island
 *
 * Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
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

 * ### TIME COMPLEXITY:
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
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;

    const dfs = (r: number, c: number): number => {
      // Base case: out of bounds or water
      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
        return 0;
      }

      // Mark as visited by setting to 0
      grid[r][c] = 0;

      // Calculate area: current cell + all connected cells
      let area = 1;
      area += dfs(r + 1, c); // Down
      area += dfs(r - 1, c); // Up
      area += dfs(r, c + 1); // Right
      area += dfs(r, c - 1); // Left

      return area;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          maxArea = Math.max(maxArea, dfs(r, c));
        }
      }
    }

    return maxArea;
  }

  /**
   * BFS approach to avoid recursion stack issues.
   */
  maxAreaOfIslandBFS(grid: number[][]): number {
    if (!grid || grid.length === 0) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          // BFS to calculate area
          let area = 0;
          const queue: [number, number][] = [[r, c]];
          grid[r][c] = 0; // Mark as visited

          while (queue.length > 0) {
            const [row, col] = queue.shift()!;
            area++;

            for (const [dr, dc] of directions) {
              const newR = row + dr;
              const newC = col + dc;

              if (newR >= 0 && newR < rows && newC >= 0 && newC < cols && grid[newR][newC] === 1) {
                queue.push([newR, newC]);
                grid[newR][newC] = 0; // Mark as visited
              }
            }
          }

          maxArea = Math.max(maxArea, area);
        }
      }
    }

    return maxArea;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Quick example
  const grid = [
    [1, 1, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  console.log("Grid:", JSON.stringify(grid));

  // Deep copy for BFS (doesn't modify original)
  const gridCopy = grid.map((row) => [...row]);
  console.log("Max area:", solution.maxAreaOfIslandBFS(gridCopy));

  // Test with larger grid
  const largerGrid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  ];

  const largerGridCopy = largerGrid.map((row) => [...row]);
  console.log("\nLarger grid max area:", solution.maxAreaOfIslandBFS(largerGridCopy));
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;