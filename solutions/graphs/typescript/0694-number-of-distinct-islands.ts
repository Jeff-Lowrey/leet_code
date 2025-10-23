/**
 * # Difficulty: Medium
 *
 * # 694. Number Of Distinct Islands
 *
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
 *
 * An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
 *
 * Return the number of distinct islands.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>grid = [[1,1,0,0,0],[1,1,0,0,0],[0,0,0,1,1],[0,0,0,1,1]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>There is 1 distinct island shape (both islands have the same 2x2 rectangular shape)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(M × N)
 * **Space Complexity**: O(M × N)
 *
 * ### INTUITION:
 * This problem extends "Number of Islands" by requiring us to identify distinct island shapes. Two islands are the same if one can be translated to match the other (same relative positions). We need to normalize each island's shape to a canonical form for comparison.
 *
 * ### APPROACH:
 * 1. **Find each island**: Use DFS/BFS to explore islands
 * 2. **Record relative positions**: For each island, record all cell positions relative to starting point
 * 3. **Normalize shape**: Convert to canonical form (e.g., relative to top-left corner)
 * 4. **Use set for uniqueness**: Store normalized shapes in set to count distinct shapes
 *
 * ### WHY THIS WORKS:
 * - Relative positioning captures island shape independent of location
 * - Normalization ensures identical shapes have identical representations
 * - Set automatically handles duplicates
 * - Translation invariance achieved by using relative coordinates
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Grid: [[1,1,0,0,0],
 *        [1,1,0,0,0],
 *        [0,0,0,1,1],
 *        [0,0,0,1,1]]
 *
 * Island 1: cells (0,0), (0,1), (1,0), (1,1)
 * Relative to (0,0): (0,0), (0,1), (1,0), (1,1)
 * Normalized: [(0,0), (0,1), (1,0), (1,1)]
 *
 * Island 2: cells (2,3), (2,4), (3,3), (3,4)
 * Relative to (2,3): (0,0), (0,1), (1,0), (1,1)
 * Normalized: [(0,0), (0,1), (1,0), (1,1)]
 *
 * Same normalized form → 1 distinct island
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(M × N)
 * We visit each cell once during DFS/BFS
 *
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For storing island shapes and recursion stack
 *
 * ### EDGE CASES:
 * - **All water**: Return 0 (no islands)
 * - **All same shaped islands**: Return 1 (one distinct shape)
 * - **Every island unique**: Return number of islands
 * - **Rotations considered same**: Normalize shape representation
 * - **Single island**: Return 1
 *
 * </details>
 */

class Solution {
  /**
   * Count distinct islands using coordinate normalization.
   *
   * Time Complexity: O(M × N)
   * Space Complexity: O(M × N)
   */
  numDistinctIslands(grid: number[][]): number {
    if (!grid || !grid[0]) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const distinctIslands: Set<string> = new Set();

    const dfs = (r: number, c: number, islandCells: [number, number][]): void => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
        return;
      }

      grid[r][c] = 0;
      islandCells.push([r, c]);

      dfs(r + 1, c, islandCells);
      dfs(r - 1, c, islandCells);
      dfs(r, c + 1, islandCells);
      dfs(r, c - 1, islandCells);
    };

    const normalizeIsland = (cells: [number, number][]): string => {
      if (cells.length === 0) {
        return "";
      }

      const minR = Math.min(...cells.map(([r, c]) => r));
      const minC = Math.min(...cells.filter(([r, c]) => r === minR).map(([r, c]) => c));

      const normalized = cells.map(([r, c]) => [r - minR, c - minC]);
      normalized.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

      return JSON.stringify(normalized);
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          const islandCells: [number, number][] = [];
          dfs(r, c, islandCells);

          if (islandCells.length > 0) {
            const normalizedShape = normalizeIsland(islandCells);
            distinctIslands.add(normalizedShape);
          }
        }
      }
    }

    return distinctIslands.size;
  }

  /**
   * Alternative approach using DFS path encoding.
   *
   * Time Complexity: O(M × N)
   * Space Complexity: O(M × N)
   */
  numDistinctIslandsPath(grid: number[][]): number {
    if (!grid || !grid[0]) {
      return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const distinctIslands: Set<string> = new Set();

    const dfs = (r: number, c: number, direction: string): string => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
        return "";
      }

      grid[r][c] = 0;

      let path = direction;
      path += dfs(r + 1, c, "D");
      path += dfs(r - 1, c, "U");
      path += dfs(r, c + 1, "R");
      path += dfs(r, c - 1, "L");
      path += "B";

      return path;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          const islandPath = dfs(r, c, "S");
          if (islandPath) {
            distinctIslands.add(islandPath);
          }
        }
      }
    }

    return distinctIslands.size;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const grid1 = [[1, 1, 0, 0, 0], [1, 1, 0, 0, 0], [0, 0, 0, 1, 1], [0, 0, 0, 1, 1]];
  const result1 = solution.numDistinctIslandsPath(JSON.parse(JSON.stringify(grid1)));
  console.log(`Test 1: ${result1 === 1 ? "PASS" : "FAIL"}`);

  const grid2 = [[1, 1, 0, 1, 1], [1, 0, 0, 0, 0], [0, 0, 0, 0, 1]];
  const result2 = solution.numDistinctIslandsPath(JSON.parse(JSON.stringify(grid2)));
  console.log(`Test 2: ${result2 === 3 ? "PASS" : "FAIL"}`);

  const grid3 = [[0, 0, 0], [0, 0, 0]];
  const result3 = solution.numDistinctIslands(JSON.parse(JSON.stringify(grid3)));
  console.log(`Test 3: ${result3 === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
