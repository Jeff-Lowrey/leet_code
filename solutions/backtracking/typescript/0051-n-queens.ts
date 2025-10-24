/**
 * # Difficulty: Hard
 *
 * # 051. N Queens
 *
 * The n-queens puzzle is the problem of placing n queens on an n×n chessboard
 * such that no two queens attack each other.
 *
 * Given an integer n, return all distinct solutions to the n-queens puzzle.
 * You may return the answer in any order.
 *
 * Each solution contains a distinct board configuration of the n-queens' placement,
 * where 'Q' and '.' both indicate a queen and an empty space, respectively.
 *
 * Example 1:
 * Input: n = 4
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 *
 * Example 2:
 * Input: n = 1
 * Output: [["Q"]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 4</dd>
 * <dt>Output:</dt>
 * <dd>[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]</dd>
 * <dt>Explanation:</dt>
 * <dd>For n=4, one valid queen placement is [(0,1),(1,3),(2,0),(3,2)]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(N!)
 * **Space Complexity**: O(N)
 *
 * ### INTUITION:
 * Place queens one row at a time and backtrack when conflicts arise. Queens attack horizontally, vertically, and diagonally, so we need to ensure no two queens can attack each other.
 *
 * ### APPROACH:
 * 1. **Row by row placement**: Place one queen per row to avoid horizontal conflicts
 * 2. **Column tracking**: Track which columns are occupied to avoid vertical conflicts
 * 3. **Diagonal tracking**: Track both diagonal directions to avoid diagonal conflicts
 * 4. **Backtrack**: When placement impossible, backtrack and try next position
 * 5. **Build solution**: When all queens placed successfully, add board to results
 *
 * ### WHY THIS WORKS:
 * - Placing one queen per row eliminates horizontal conflicts automatically
 * - Column and diagonal tracking prevents vertical and diagonal conflicts
 * - Backtracking explores all valid placements systematically
 * - Early pruning prevents exploring invalid partial solutions
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 4
 * ```

### TIME COMPLEXITY:
 * O(N!)
 * - In worst case, we try every possible placement
 * - First queen has N choices, second has (N-1), etc.
 * - But pruning significantly reduces actual combinations
 *
 * ### SPACE COMPLEXITY:
 * O(N)
 * - Recursion depth is N (one call per row)
 * - Additional space for tracking columns and diagonals
 * - Board representation space
 *
 * ### EDGE CASES:
 * - **n = 1**: Single queen at (0,0), return [["Q"]]
 * - **n = 2 or n = 3**: No solutions exist, return empty list
 * - **n = 4**: Two distinct solutions exist
 * - **Large n values**: Backtracking with pruning handles efficiently
 * - **All positions conflict**: Backtracking exhausts all possibilities, returns empty
 *
 * </details>
 */

class Solution {
  /**
   * Solve N-Queens problem using backtracking with optimized conflict detection.
   *
   * Time Complexity: O(N!)
   * Space Complexity: O(N)
   */
  solveNQueens(n: number): string[][] {
    const solutions: string[][] = [];
    const queens: number[] = []; // queens[i] = column position of queen in row i
    const cols = new Set<number>();
    const diag1 = new Set<number>();
    const diag2 = new Set<number>();

    const solve = (): void => {
      // Base case: all queens placed successfully
      if (queens.length === n) {
        const board: string[] = [];
        for (let row = 0; row < n; row++) {
          const boardRow = Array(n).fill(".");
          boardRow[queens[row]] = "Q";
          board.push(boardRow.join(""));
        }
        solutions.push(board);
        return;
      }

      const row = queens.length;
      for (let col = 0; col < n; col++) {
        // Check for conflicts using O(1) set lookups
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
          continue;
        }

        // Place queen and update conflict tracking
        queens.push(col);
        cols.add(col);
        diag1.add(row - col);
        diag2.add(row + col);

        // Recursively solve for next row
        solve();

        // Backtrack: remove queen and conflict markers
        queens.pop();
        cols.delete(col);
        diag1.delete(row - col);
        diag2.delete(row + col);
      }
    };

    solve();
    return solutions;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.solveNQueens(4);
  console.log(`Test 1: ${result1.length === 2 ? "PASS" : "FAIL"}`);

  const result2 = solution.solveNQueens(1);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([["Q"]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.solveNQueens(2);
  console.log(`Test 3: ${result3.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
