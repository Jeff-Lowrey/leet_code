/**
 * # Difficulty: Medium
 *
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated
 * according to the following rules:
 *
 *
 *
 *
 *
 * Note:
 * - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
 * - Only the filled cells need to be validated according to the mentioned rules.
 *
 * Example:
 * Input: board =
 * [["5","3",".",".","7",".",".",".","."]
 * ,["6",".",".","1","9","5",".",".","."]
 * ,[".","9","8",".",".",".",".","6","."]
 * ,["8",".",".",".","6",".",".",".","3"]
 * ,["4",".",".","8",".","3",".",".","1"]
 * ,["7",".",".",".","2",".",".",".","6"]
 * ,[".","6",".",".",".",".","2","8","."]
 * ,[".",".",".","4","1","9",".",".","5"]
 * ,[".",".",".",".","8",".",".","7","9"]]
 * Output: true
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["5", "3", ".", ".", "7", ".", ".", ".", "."]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>The 9×9 Sudoku board is valid because each row, column, and 3×3 sub-box contains no duplicate digits 1-9</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(1)
**Space Complexity**: * O(1)

 *
 * ### INTUITION:
 * Use hash sets to track seen digits for each row, column, and 3x3 box.
 * Make a single pass through the board, checking for duplicates in the appropriate sets.
 *
 * ### APPROACH:
 * 1. **Data Structures**: Use sets for each row, column, and box
 * 2. **Single Pass**: Iterate through each cell once
 * 3. **Box Index**: Calculate box index as (row // 3) * 3 + (col // 3)
 * 4. **Check**: For each digit, verify it hasn't been seen in its row, column, or box
 *
 * ### WHY THIS WORKS:
 * Sets provide O(1) lookup, allowing us to efficiently check for duplicates.
 * The box index formula maps each cell to one of 9 boxes (0-8).
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * For cell (0, 0) = "5":
 * - Row 0 set: add "5"
 * - Col 0 set: add "5"
 * - Box 0 set: add "5"
 *
 * For cell (0, 1) = "3":
 * - Row 0 set: add "3" (5 already present)
 * - Col 1 set: add "3"
 * - Box 0 set: add "3" (5 already present)
 *
 * If we encounter "5" again in row 0, col 0, or box 0 → return False
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(1)
 * - Board is fixed size 9x9 = 81 cells
 * - Each cell processed once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - At most 9 sets with 9 elements each
 * - Fixed space regardless of input
 *
 * ### EDGE CASES:
 * - Empty cells (".") should be ignored
 * - All cells filled validly
 * - Single invalid cell makes entire board invalid
 *
 * </details>
 */

/**
 * Main solution for Problem 36: Valid Sudoku
 *
 * @param {character[][]} board - 9x9 sudoku board
 * @return {boolean} - True if valid sudoku configuration
 *
 * Time Complexity: O(1) - always 9x9 board, so O(81) = O(1)
 * Space Complexity: O(1) - fixed size data structures (9 rows, 9 cols, 9 boxes)
 */
function solve(board) {
  // Use sets to track seen numbers in each row, column, and 3x3 box
  const rows = Array(9)
    .fill(0)
    .map(() => new Set());
  const cols = Array(9)
    .fill(0)
    .map(() => new Set());
  const boxes = Array(9)
    .fill(0)
    .map(() => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];

      // Skip empty cells
      if (num === ".") continue;

      // Calculate which 3x3 box this cell belongs to
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // Check if number already exists in row, column, or box
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }

      // Add number to respective sets
      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
}

/**
 * Test cases for Problem 36: Valid Sudoku
 */
function testSolution() {
  console.log("Testing 36. Valid Sudoku");

  // Test case 1: Valid sudoku
  const board1 = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  console.assert(
    solve(board1) === true,
    "Test 1 failed: valid sudoku should return true",
  );

  // Test case 2: Invalid - duplicate in row
  const board2 = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  console.assert(
    solve(board2) === false,
    "Test 2 failed: duplicate in column should return false",
  );

  // Test case 3: Invalid - duplicate in 3x3 box
  const board3 = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "5", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ];
  console.assert(
    solve(board3) === false,
    "Test 3 failed: duplicate in 3x3 box should return false",
  );

  // Test case 4: All empty (valid)
  const board4 = [
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "."],
  ];
  console.assert(
    solve(board4) === true,
    "Test 4 failed: all empty should be valid",
  );

  // Test case 5: Single number in each row/col/box
  const board5 = [
    ["1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "2", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", "3", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", "4", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "5", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", "6", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "7", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "8", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "9"],
  ];
  console.assert(
    solve(board5) === true,
    "Test 5 failed: valid minimal sudoku should return true",
  );

  console.log("All test cases passed for 36. Valid Sudoku!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 36. Valid Sudoku ===");
  console.log("Category: Matrix");
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
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
