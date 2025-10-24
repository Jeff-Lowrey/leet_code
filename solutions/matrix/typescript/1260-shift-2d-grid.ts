/**
 * # Difficulty: Easy
 *
 * # 1260. Shift 2D Grid
 *
 * Given a 2D grid of size m x n and an integer k. You need to shift the grid k times.
 *
 * In one shift operation:
 * - Element at grid[i][j] moves to grid[i][j + 1].
 * - Element at grid[i][n - 1] moves to grid[i + 1][0].
 * - Element at grid[m - 1][n - 1] moves to grid[0][0].
 *
 * Return the 2D grid after applying shift operation k times.
 *
 * Example 1:
 * Input: grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1
 * Output: [[9,1,2],[3,4,5],[6,7,8]]
 *
 * Example 2:
 * Input: grid = [[3,8,1,9],[19,7,2,5],[4,6,11,10],[12,0,21,13]], k = 4
 * Output: [[12,0,21,13],[3,8,1,9],[19,7,2,5],[4,6,11,10]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>2D grid [[1,2,3],[4,5,6],[7,8,9]] shifted k=1 becomes [[9,1,2],[3,4,5],[6,7,8]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Matrix
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(m × n)
 *
 * ### INTUITION:
 * Think of the 2D grid as a 1D array that wraps around. Each shift moves all elements
 * one position to the right, with the last element wrapping to the first position.
 * Instead of performing k individual shifts, we can calculate final positions directly.
 *
 * ### APPROACH:
 * 1. **Flatten Conceptually**: Treat the 2D grid as a 1D array without actually creating it
 * 2. **Calculate New Position**: For element at position i, after k shifts it's at (i + k) % total
 * 3. **Map Back to 2D**: Convert 1D position back to 2D coordinates
 * 4. **Optimization**: Use k % total to avoid unnecessary full rotations
 *
 * **Key Insight**: Position mapping
 * - 2D to 1D: index = i * n + j (where i is row, j is col)
 * - 1D to 2D: row = index // n, col = index % n
 *
 * ### WHY THIS WORKS:
 * - Shifting k times is equivalent to rotating the flattened array by k positions
 * - Using modulo handles wrapping and optimizes multiple full rotations
 * - Direct position calculation avoids expensive element-by-element shifting
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * grid = [[1,2,3],[4,5,6],[7,8,9]], k = 1, m = 3, n = 3, total = 9
 * ```
 *
 * Flatten view: [1,2,3,4,5,6,7,8,9]
 * After 1 shift: [9,1,2,3,4,5,6,7,8]
 * Position mapping:
 *
 * Steps:
 * Step 1: - 1 at index 0 → new index (0+1)%9 = 1 → grid[0][1]
 * Step 2: - 2 at index 1 → new index (1+1)%9 = 2 → grid[0][2]
 * Step 3: - 9 at index 8 → new index (8+1)%9 = 0 → grid[0][0]
 * Step 4: Result: [[9,1,2],[3,4,5],[6,7,8]]
 * 
 * Output:
 * ```
 * [[9,1,2],[3,4,5],[6,7,8]]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Must visit each element once to build result
 *
 * ### SPACE COMPLEXITY:
 * O(m × n)
 * - Need to store the result grid (required by problem)
 * - Can be O(1) if we modify in-place, but tricky with constraints
 *
 * ### EDGE CASES:
 * - k = 0: No shift needed
 * - k >= m*n: Use k % (m*n) to optimize
 * - Single row or column: Still works with formula
 * - k is multiple of total: Grid unchanged
 *
 * </details>
 */

class Solution {
  shiftGrid(grid: number[][], k: number): number[][] {
    const m = grid.length;
    const n = grid[0].length;
    const total = m * n;

    k = k % total;

    if (k === 0) {
      return grid;
    }

    const result: number[][] = Array(m)
      .fill(0)
      .map(() => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const oldIndex = i * n + j;
        const newIndex = (oldIndex + k) % total;
        const newRow = Math.floor(newIndex / n);
        const newCol = newIndex % n;
        result[newRow][newCol] = grid[i][j];
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

  const result1 = solution.shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1
  );
  console.log(
    `Test 1: ${
      JSON.stringify(result1) ===
      JSON.stringify([
        [9, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  const result2 = solution.shiftGrid(
    [
      [3, 8, 1, 9],
      [19, 7, 2, 5],
      [4, 6, 11, 10],
      [12, 0, 21, 13],
    ],
    4
  );
  console.log(
    `Test 2: ${
      JSON.stringify(result2) ===
      JSON.stringify([
        [12, 0, 21, 13],
        [3, 8, 1, 9],
        [19, 7, 2, 5],
        [4, 6, 11, 10],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
