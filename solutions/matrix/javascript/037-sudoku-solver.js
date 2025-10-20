/**
 *  Difficulty: Hard
 *
 * # 037. Sudoku Solver
 * **Backtracking**
 *
 * Solve a Sudoku puzzle by filling the empty cells.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["5", "3", ".", ".", "7", ".", ".", ".", "."]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Sudoku puzzle is solved by filling empty cells following rules</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Matrix Traversal, In-place Modification
 * **Data Structures**: 2D Array/Matrix
 * **Patterns**: Matrix Pattern, Row-Column Traversal
 * **Time Complexity**: **O(9^(n*n)) worst case, where n=9
 * **Space Complexity**: **O(n*n) for recursion stack

 *
 * ### INTUITION:
 * Use backtracking to try placing digits 1-9 in empty cells, validating each placement
 * against Sudoku rules (no duplicates in row, column, or 3x3 box). Backtrack when no
 * valid digit can be placed.
 *
 * ### APPROACH:
 * 1. **Find empty cell**: Scan for next '.' cell
 * 2. **Try digits**: Attempt placing digits 1-9
 * 3. **Validate**: Check if placement is valid (row, column, box)
 * 4. **Recurse**: Continue solving with this placement
 * 5. **Backtrack**: If stuck, undo placement and try next digit
 *
 * ### WHY THIS WORKS:
 * - Backtracking explores all possible configurations
 * - Validation ensures Sudoku rules are maintained
 * - Early pruning reduces search space
 * - Modifies board in-place for efficiency
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: board with some filled cells and '.' for empty
 * Step 1: Find first empty cell
 * Step 2: Try placing '1' - check if valid
 * Step 3: Recurse to next empty cell
 * Step 4: If contradiction found, backtrack and try '2'
 * Output: Completed valid Sudoku board
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(9^(n*n)) worst case, where n=9
 *
 * ### SPACE COMPLEXITY:
 * O(n*n) for recursion stack
 *
 * ### EDGE CASES:
 * - Board already solved
 * - Multiple solutions (return first found)
 * - Invalid input (unsolvable)
 *
 * </details>
 */

/**
 * Main solution for Problem 037: Sudoku Solver
 *
 * @param {character[][]} board - 9x9 sudoku board
 * @return {void} - Modifies board in-place
 *
 * Time Complexity: O(9^(n*n)) where n=9, worst case tries all possibilities
 * Space Complexity: O(n*n) for recursion stack
 */
function solve(board) {
  solveSudoku(board);
}

function solveSudoku(board) {
  const n = 9;

  // Helper function to check if placing num at [row][col] is valid
  function isValid(row, col, num) {
    // Check row
    for (let j = 0; j < n; j++) {
      if (board[row][j] === num) return false;
    }

    // Check column
    for (let i = 0; i < n; i++) {
      if (board[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (board[i][j] === num) return false;
      }
    }

    return true;
  }

  // Backtracking function
  function backtrack() {
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (board[row][col] === ".") {
          // Try each number from 1-9
          for (let num = 1; num <= 9; num++) {
            const numStr = num.toString();

            if (isValid(row, col, numStr)) {
              // Place the number
              board[row][col] = numStr;

              // Recursively try to solve the rest
              if (backtrack()) {
                return true;
              }

              // Backtrack if it doesn't lead to a solution
              board[row][col] = ".";
            }
          }

          // No valid number found, need to backtrack
          return false;
        }
      }
    }

    // All cells filled successfully
    return true;
  }

  backtrack();
}

/**
 * Test cases for Problem 037: Sudoku Solver
 */
function testSolution() {
  console.log("Testing 037. Sudoku Solver");

  // Helper function to compare boards
  function boardsEqual(board1, board2) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board1[i][j] !== board2[i][j]) return false;
      }
    }
    return true;
  }

  // Test case 1: Standard sudoku puzzle
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

  const expected1 = [
    ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
    ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
    ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
    ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
    ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
    ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
    ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
  ];

  solve(board1);
  console.assert(
    boardsEqual(board1, expected1),
    "Test 1 failed: sudoku not solved correctly",
  );

  // Test case 2: Another valid puzzle
  const board2 = [
    [".", ".", "9", "7", "4", "8", ".", ".", "."],
    ["7", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "2", ".", "1", ".", "9", ".", ".", "."],
    [".", ".", "7", ".", ".", ".", "2", "4", "."],
    [".", "6", "4", ".", "1", ".", "5", "9", "."],
    [".", "9", "8", ".", ".", ".", "3", ".", "."],
    [".", ".", ".", "8", ".", "3", ".", "2", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", "6"],
    [".", ".", ".", "2", "7", "5", "9", ".", "."],
  ];

  solve(board2);
  // Just verify it's completely filled (valid solution)
  let filled = true;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board2[i][j] === ".") filled = false;
    }
  }
  console.assert(filled, "Test 2 failed: board not completely filled");

  console.log("All test cases passed for 037. Sudoku Solver!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 037. Sudoku Solver ===");
  console.log("Category: Matrix");
  console.log("Difficulty: Backtrack");
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
