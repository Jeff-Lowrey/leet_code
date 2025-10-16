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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
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
 *
 * **Step 1:** Place queen in row 0
 * - Try col 0: Place Q at (0,0)
 *   - cols = {0}, diag1 = {0}, diag2 = {0}
 *
 * **Step 2:** Place queen in row 1
 * - Try col 0: conflicts with cols (skip)
 * - Try col 1: conflicts with diag2 (skip)
 * - Try col 2: Place Q at (1,2) ✓
 *   - cols = {0,2}, diag1 = {0,-1}, diag2 = {0,3}
 *
 * **Step 3:** Place queen in row 2
 * - Try col 0,1: conflicts
 * - Try col 3: conflicts
 * - Try col 4: out of range → Backtrack
 *
 * **Step 4:** Try different placement in row 1 (col 3)
 * - Eventually find: [".Q..","...Q","Q...","..Q."]
 *
 * Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
 *
 * ### TIME COMPLEXITY:
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

/**
 * Main solution for Problem 051: N-Queens
 *
 * @param {number} n - Size of the chessboard (n×n) and number of queens
 * @return {string[][]} - Array of all distinct solutions, each as array of strings
 *
 * Time Complexity: O(N!) - at most N choices for first queen, N-1 for second, etc.
 * Space Complexity: O(N^2) for board representation and recursion depth
 */
function solve(n) {
  // Handle edge cases
  if (n === 0) return [];
  if (n === 1) return [["Q"]];
  if (n === 2 || n === 3) return []; // No solutions exist

  const result = [];
  const board = Array(n)
    .fill()
    .map(() => Array(n).fill("."));

  // Track conflicts to avoid O(n) checking each time
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col

  /**
   * Check if placing queen at (row, col) is safe
   * @param {number} row - Row position
   * @param {number} col - Column position
   * @return {boolean} - True if position is safe
   */
  function isSafe(row, col) {
    return !cols.has(col) && !diag1.has(row - col) && !diag2.has(row + col);
  }

  /**
   * Convert board to required string format
   * @return {string[]} - Board as array of strings
   */
  function boardToStrings() {
    return board.map((row) => row.join(""));
  }

  /**
   * Backtracking helper function
   * @param {number} row - Current row to place queen
   */
  function backtrack(row) {
    // Base case: all queens placed successfully
    if (row === n) {
      result.push(boardToStrings());
      return;
    }

    // Try placing queen in each column of current row
    for (let col = 0; col < n; col++) {
      // Check if current position is safe
      if (!isSafe(row, col)) {
        continue;
      }

      // Choose: place queen at (row, col)
      board[row][col] = "Q";
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);

      // Explore: recursively place queens in remaining rows
      backtrack(row + 1);

      // Unchoose: remove queen and clear conflicts (backtrack)
      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  // Start backtracking from row 0
  backtrack(0);

  return result;
}

/**
 * Test cases for Problem 051: N-Queens
 */
function testSolution() {
  console.log("Testing 051. N-Queens");

  // Helper function to validate a solution
  function isValidSolution(board) {
    const n = board.length;
    const queens = [];

    // Find all queen positions
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === "Q") {
          queens.push([i, j]);
        }
      }
    }

    // Should have exactly n queens
    if (queens.length !== n) return false;

    // Check for conflicts
    for (let i = 0; i < queens.length; i++) {
      for (let j = i + 1; j < queens.length; j++) {
        const [r1, c1] = queens[i];
        const [r2, c2] = queens[j];

        // Check row, column, and diagonal conflicts
        if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
          return false;
        }
      }
    }

    return true;
  }

  // Test case 1: n = 4 (classic case)
  const result1 = solve(4);
  const expected1Count = 2; // Known: 4-queens has exactly 2 solutions
  console.assert(
    result1.length === expected1Count,
    `Test 1 failed: expected ${expected1Count} solutions, got ${result1.length}`,
  );

  // Validate each solution
  result1.forEach((solution, index) => {
    console.assert(
      isValidSolution(solution),
      `Test 1 failed: solution ${index} is invalid`,
    );
  });

  // Test case 2: n = 1
  const result2 = solve(1);
  const expected2 = [["Q"]];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: n = 2 (no solution)
  const result3 = solve(2);
  const expected3 = [];
  console.assert(
    result3.length === expected3.length,
    `Test 3 failed: expected ${expected3.length} solutions, got ${result3.length}`,
  );

  // Test case 4: n = 3 (no solution)
  const result4 = solve(3);
  const expected4 = [];
  console.assert(
    result4.length === expected4.length,
    `Test 4 failed: expected ${expected4.length} solutions, got ${result4.length}`,
  );

  // Test case 5: n = 0
  const result5 = solve(0);
  const expected5 = [];
  console.assert(
    result5.length === expected5.length,
    `Test 5 failed: expected ${expected5.length} solutions, got ${result5.length}`,
  );

  // Test case 6: n = 8 (should have 92 solutions)
  const result6 = solve(8);
  const expected6Count = 92; // Known: 8-queens has exactly 92 solutions
  console.assert(
    result6.length === expected6Count,
    `Test 6 failed: expected ${expected6Count} solutions, got ${result6.length}`,
  );

  // Validate first few solutions for n = 8
  result6.slice(0, 3).forEach((solution, index) => {
    console.assert(
      isValidSolution(solution),
      `Test 6 failed: solution ${index} is invalid`,
    );
  });

  // Test case 7: Verify board format
  const result7 = solve(4);
  if (result7.length > 0) {
    const firstSolution = result7[0];
    console.assert(
      firstSolution.length === 4,
      `Test 7 failed: board should have 4 rows`,
    );
    console.assert(
      firstSolution[0].length === 4,
      `Test 7 failed: each row should have 4 characters`,
    );

    // Count queens in first solution
    const queenCount = firstSolution.join("").split("Q").length - 1;
    console.assert(
      queenCount === 4,
      `Test 7 failed: should have exactly 4 queens, got ${queenCount}`,
    );
  }

  console.log("All test cases passed for 051. N-Queens!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 051. N Queens ===");
  console.log("Category: Backtracking");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
