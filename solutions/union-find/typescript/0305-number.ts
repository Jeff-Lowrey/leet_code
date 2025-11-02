/**
 * 0305. Number of Islands II
 *
 * Difficulty: Medium
 * 
 * You are given an empty 2D binary grid grid of size m x n. The grid represents a map where 0's represent water and 1's represent land. Initially, all the cells of grid are water cells (i.e., all the cells are 0's).
 * 
 * We may perform an add land operation which turns the water at position into a land. You are given an array positions where positions[i] = [ri, ci] is the position (ri, ci) at which we should operate the ith operation.
 * 
 * Return an array of integers answer where answer[i] is the number of islands after turning the cell (ri, ci) into a land.
 * 
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>m = 3, n = 3, positions = [[0,0]]</dd>
 * <dt>Output:</dt>
 * <dd>[1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Number of islands after adding positions: [1]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: **Union-Find** (Disjoint Set Union), **Path Compression**
 * **Data Structures**: **Array** (parent tracking), 2D Grid
 * **Patterns**: Connected Components, Dynamic Connectivity
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Maintain **Union-Find** of islands. For each land operation, union with adjacent land cells (4 directions). Track number of connected components. Component count after each operation is island count.
 *
 * ### APPROACH:
 * **Data structures: **Array** for **Union-Find** parent tracking, 2D Grid for land positions**
 * 1. **Initialize **Union-Find****: Create parent and rank arrays
 * 2. **Initialize count**: Set count = 0 for number of islands
 * 3. **Process positions**: For each position in positions list
 * 4. **Add island**: Mark position as land, increment count
 * 5. **Check neighbors**: Check all 4 adjacent cells
 * 6. **Union with land neighbors**: If neighbor is land and different component, union and decrement count
 * 7. **Record count**: Append current count to result
 * 8. **Return result**: Return result list with island counts
 * 
 * ### WHY THIS WORKS:
 * - **Union-Find** (Disjoint Set Union) efficiently tracks connected components as islands form
 * - Initially count = 0, increment for each land cell added
 * - When land connects to existing islands, union them (decrement count by merges-1)
 * - **Path Compression** technique: During find operations, flatten the tree structure by making nodes point directly to the root, speeding up future queries
 * - Union by rank ensures balanced tree height, preventing degeneration
 * - Path compression + union by rank together ensure near O(1) amortized operations
 * - O(m*n*α(m*n)) time: α is inverse Ackermann (effectively constant)
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * m = 3, n = 3, positions = [[0,0]]
 * ```
 *
 * **Step 1:** Initialize Union-Find
 * - Create parent and rank arrays for 3×3 grid
 *
 * **Step 2:** Initialize count
 * - Set island count = 0
 * - All cells are water (0)
 *
 * **Step 3:** Process positions - iterate through [[0,0]]
 * - Processing position [0,0]
 *
 * **Step 4:** Add island at position [0,0]
 * - Mark cell (0,0) as land
 * - Increment count to 1
 *
 * **Step 5:** Check neighbors of (0,0)
 * - Check 4 adjacent cells: up, down, left, right
 * - All neighbors are water or out of bounds
 *
 * **Step 6:** Union with land neighbors
 * - No land neighbors found
 * - No unions performed, count remains 1
 *
 * **Step 7:** Record count after processing position
 * - Append count=1 to result list
 * - Result so far: [1]
 *
 * **Step 8:** Return result
 * - All positions processed
 * - Final result: [1]
 *
 * Output:
 * ```
 * [1]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Solve Number Islands II problem using **Union-Find** approach
   *
   *         Args:
   *             m: Number of rows in the grid
   *             n: Number of columns in the grid
   *             positions: List of positions where land will be added
   *
   *         Returns:
   *             List of number of islands after each land addition
   */
  numIslands2(m: number, n: number, positions: number[][]): number[] {
    const getKey = (row: number, col: number): number => row * n + col;

    const parent = new Map<number, number>();
    const rank = new Map<number, number>();

    const find = (x: number): number => {
      if (!parent.has(x)) {
        parent.set(x, x);
        rank.set(x, 0);
      }
      if (parent.get(x) !== x) {
        parent.set(x, find(parent.get(x)!));
      }
      return parent.get(x)!;
    };

    const union = (x: number, y: number): boolean => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX === rootY) return false;

      const rankX = rank.get(rootX) || 0;
      const rankY = rank.get(rootY) || 0;

      if (rankX < rankY) {
        parent.set(rootX, rootY);
      } else if (rankX > rankY) {
        parent.set(rootY, rootX);
      } else {
        parent.set(rootY, rootX);
        rank.set(rootX, rankX + 1);
      }
      return true;
    };

    const result: number[] = [];
    const landCells = new Set<number>();
    let count = 0;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    for (const [row, col] of positions) {
      const key = getKey(row, col);

      if (landCells.has(key)) {
        result.push(count);
        continue;
      }

      landCells.add(key);
      parent.set(key, key);
      rank.set(key, 0);
      count++;

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
          const neighborKey = getKey(newRow, newCol);
          if (landCells.has(neighborKey) && union(key, neighborKey)) {
            count--;
          }
        }
      }

      result.push(count);
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 305. Number of Islands II ===");

  const m = 3, n = 3;
  const positions = [[0, 0], [0, 1], [1, 2], [2, 1]];
  const result = solution.numIslands2(m, n, positions);
  console.log(`m=${m}, n=${n}, positions=${JSON.stringify(positions)}`);
  console.log("Island counts after each operation:", result);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;