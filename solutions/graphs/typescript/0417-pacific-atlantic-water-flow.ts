/**
 * # Difficulty: Medium
 *
 * # 417. Pacific Atlantic Water Flow
 *
 * Difficulty: Medium
 *
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
 *
 * The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
 *
 * The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
 *
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]</dd>
 * <dt>Output:</dt>
 * <dd>[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Cells where water can flow to both oceans: [[0,4],[1,3],[1,4],[2,2]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use DFS/BFS from all Pacific border cells and separately from all Atlantic border cells. Cells reachable from both oceans are in the answer. Water flows from high to low or equal.
 *
 * ### APPROACH:
 * 1. **Initialize result sets**: Create pacific_reachable and atlantic_reachable sets
 * 2. **DFS from pacific edges**: Run DFS from top row and left column, mark pacific-reachable cells
 * 3. **DFS from atlantic edges**: Run DFS from bottom row and right column, mark atlantic-reachable cells
 * 4. **Define DFS function**: Implement dfs(row, col, reachable, prev_height) that explores increasing heights
 * 5. **Check boundaries**: In DFS, verify cell is in bounds and height >= prev_height
 * 6. **Mark reachable**: Add current cell to reachable set, recurse on 4 neighbors
 * 7. **Find intersection**: Compute pacific_reachable & atlantic_reachable
 * 8. **Return result**: Return list of cells reachable from both oceans
 *
 * ### WHY THIS WORKS:
 * - DFS from ocean borders inward (reverse flow direction)
 * - Water flows to ocean if can reach cells that flow to ocean
 * - Find cells reachable from pacific border and atlantic border separately
 * - Intersection of both sets is answer
 * - O(m*n) time: DFS from borders visits each cell at most twice, O(m*n) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * ```
 *
 * Step 1: DFS from Pacific border (top, left)
 * pacific = {(0,0),(0,1),...,(4,0)}
 * Step 2: DFS from Atlantic border (bottom, right)
 * atlantic = {(4,4),(4,3),...,(0,4)}
 * Step 3: Find intersection
 * Both oceans reachable from:
 *
 * Steps:
 * Step 1: (0,4): height=5 → can flow both ways
 * Step 2: (1,3): height=4 → can flow both ways
 * Step 3: (1,4): height=4 → can flow both ways
 * Step 4: (2,2): height=5 → can flow both ways
 * Step 5: (3,0): height=6 → can flow both ways
 * Step 6: (3,1): height=7 → can flow both ways
 * Step 7: (4,0): height=5 → can flow both ways
 *
 * Output:
 * ```
 * [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Find cells that can reach both oceans using DFS.
   *
   * Time Complexity: O(m × n)
   * Space Complexity: O(m × n)
   */
  pacificAtlantic(heights: number[][]): number[][] {
    if (!heights || !heights[0]) {
      return [];
    }

    const m = heights.length;
    const n = heights[0].length;

    const pacific: Set<string> = new Set();
    const atlantic: Set<string> = new Set();

    const dfs = (row: number, col: number, visited: Set<string>, prevHeight: number): void => {
      const key = `${row},${col}`;

      if (
        row < 0 ||
        col < 0 ||
        row >= m ||
        col >= n ||
        visited.has(key) ||
        heights[row][col] < prevHeight
      ) {
        return;
      }

      visited.add(key);

      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (const [dx, dy] of directions) {
        dfs(row + dx, col + dy, visited, heights[row][col]);
      }
    };

    for (let i = 0; i < m; i++) {
      dfs(i, 0, pacific, heights[i][0]);
      dfs(i, n - 1, atlantic, heights[i][n - 1]);
    }

    for (let j = 0; j < n; j++) {
      dfs(0, j, pacific, heights[0][j]);
      dfs(m - 1, j, atlantic, heights[m - 1][j]);
    }

    const result: number[][] = [];
    for (const key of pacific) {
      if (atlantic.has(key)) {
        const [row, col] = key.split(",").map(Number);
        result.push([row, col]);
      }
    }

    return result;
  }

  /**
   * Alternative BFS implementation.
   *
   * Time Complexity: O(m × n)
   * Space Complexity: O(m × n)
   */
  pacificAtlanticBFS(heights: number[][]): number[][] {
    if (!heights || !heights[0]) {
      return [];
    }

    const m = heights.length;
    const n = heights[0].length;

    const bfs = (starts: [number, number][]): Set<string> => {
      const queue: [number, number][] = [...starts];
      const visited: Set<string> = new Set(starts.map(([r, c]) => `${r},${c}`));

      while (queue.length > 0) {
        const [row, col] = queue.shift()!;

        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const newRow = row + dx;
          const newCol = col + dy;
          const key = `${newRow},${newCol}`;

          if (
            newRow >= 0 &&
            newRow < m &&
            newCol >= 0 &&
            newCol < n &&
            !visited.has(key) &&
            heights[newRow][newCol] >= heights[row][col]
          ) {
            queue.push([newRow, newCol]);
            visited.add(key);
          }
        }
      }

      return visited;
    };

    const pacificStarts: [number, number][] = [];
    const atlanticStarts: [number, number][] = [];

    for (let j = 0; j < n; j++) {
      pacificStarts.push([0, j]);
      atlanticStarts.push([m - 1, j]);
    }

    for (let i = 1; i < m; i++) {
      pacificStarts.push([i, 0]);
    }

    for (let i = 0; i < m - 1; i++) {
      atlanticStarts.push([i, n - 1]);
    }

    const pacific = bfs(pacificStarts);
    const atlantic = bfs(atlanticStarts);

    const result: number[][] = [];
    for (const key of pacific) {
      if (atlantic.has(key)) {
        const [row, col] = key.split(",").map(Number);
        result.push([row, col]);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result = solution.pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4]
  ]);
  const expected = [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]];
  const sortedResult = result.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const sortedExpected = expected.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  console.log(`Test 1: ${JSON.stringify(sortedResult) === JSON.stringify(sortedExpected) ? "PASS" : "FAIL"}`);

  const result2 = solution.pacificAtlantic([[1]]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[0, 0]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
