/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that build graph of dependencies. Start DFS from each cell. Use memoization to store longest path from each cell. Result is max of all starting points. DFS explores increasing values only.
 *
 * ### APPROACH:
 * 1. **Initialize memoization**: Create memo = {} to cache results
 * 2. **Define DFS function**: Implement dfs(i, j) to find longest path from cell (i,j)
 * 3. **Check memo**: If (i,j) in memo, return memo[(i,j)]
 * 4. **Explore neighbors**: For each of 4 directions, check if can move (increasing value)
 * 5. **Recursive call**: If valid, max_path = max(max_path, 1 + dfs(ni, nj))
 * 6. **Memoize result**: memo[(i,j)] = max_path
 * 7. **Try all cells**: For each cell, call dfs and track maximum
 * 8. **Return result**: Return global maximum path length
 *
 * ### WHY THIS WORKS:
 * - DFS with memoization: longest path from each cell
 * - Only move to adjacent cells with greater values (DAG ensures no cycles)
 * - Memo[i][j] caches longest path starting at (i,j)
 * - Try all 4 directions, take max + 1
 * - O(m*n) time: each cell computed once, O(m*n) space for memo
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [[9,9,4],[6,6,8],[2,1,1]]
 * ```
 *
 * Step 1: DFS with memoization
 *
 * Steps:
 * Step 1: Start from 9: can go to 6 → 2 → 1, length=4
 * Step 2: Try all cells
 * Step 3: Best path: 9→6→2→1
 *
 * Output:
 * ```
 * 4 (longest increasing path)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  /**
   * Find longest increasing path using DFS with memoization.
   *
   * Time Complexity: O(m × n)
   * Space Complexity: O(m × n)
   */
  longestIncreasingPath(matrix: number[][]): number {
    if (!matrix || !matrix[0]) {
      return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo: Map<string, number> = new Map();

    const dfs = (row: number, col: number, prevVal: number): number => {
      if (row < 0 || row >= rows || col < 0 || col >= cols || matrix[row][col] <= prevVal) {
        return 0;
      }

      const key = `${row},${col}`;
      if (memo.has(key)) {
        return memo.get(key)!;
      }

      const current = matrix[row][col];

      const up = dfs(row - 1, col, current);
      const down = dfs(row + 1, col, current);
      const left = dfs(row, col - 1, current);
      const right = dfs(row, col + 1, current);

      const result = 1 + Math.max(up, down, left, right);
      memo.set(key, result);
      return result;
    };

    let maxPath = 0;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        maxPath = Math.max(maxPath, dfs(i, j, -Infinity));
      }
    }

    return maxPath;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.longestIncreasingPath([[9, 9, 4], [6, 6, 8], [2, 1, 1]]);
  console.log(`Test 1: ${result1 === 4 ? "PASS" : "FAIL"}`);

  const result2 = solution.longestIncreasingPath([[3, 4, 5], [3, 2, 6], [2, 2, 1]]);
  console.log(`Test 2: ${result2 === 4 ? "PASS" : "FAIL"}`);

  const result3 = solution.longestIncreasingPath([[1]]);
  console.log(`Test 3: ${result3 === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
