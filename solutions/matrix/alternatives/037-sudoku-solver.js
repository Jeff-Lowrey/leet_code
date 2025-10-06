/**
 * 37. Sudoku Solver
 * Hard
 *
 * Sudoku Solver - JavaScript Implementation
 * Time Complexity: O(9^(n*n)) where n=9 - worst case tries all combinations
 * Space Complexity: O(n*n) - recursion depth for board size
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a classic backtracking problem. We need to try placing digits 1-9 in empty cells
 * and validate if the placement is valid according to Sudoku rules. If we reach a dead end,
 * we backtrack and try the next possibility.
 *
 * ### APPROACH:
 * 1. **Find empty cell**: Look for next '.' in the board
 * 2. **Try digits 1-9**: For each digit, check if placement is valid
 * 3. **Validate placement**: Check row, column, and 3x3 box constraints
 * 4. **Recursive solve**: If valid, place digit and recursively solve remaining
 * 5. **Backtrack**: If no solution found, remove digit and try next
 *
 * ### WHY THIS WORKS:
 * - Backtracking explores all possible valid combinations
 * - Early validation prevents invalid paths from being explored deeply
 * - Systematic approach ensures we find a solution if one exists
 *
 * ### VALIDATION RULES:
 * - **Row**: Digit must not appear elsewhere in same row
 * - **Column**: Digit must not appear elsewhere in same column
 * - **3x3 Box**: Digit must not appear elsewhere in same 3x3 sub-grid
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input board with '.' for empty cells:
 * [["5","3",".",".","7",".",".",".","."],
 *  ["6",".",".","1","9","5",".",".","."],
 *  [".","9","8",".",".",".",".","6","."],
 *  ["8",".",".",".","6",".",".",".","3"],
 *  ["4",".",".","8",".","3",".",".","1"],
 *  ["7",".",".",".","2",".",".",".","6"],
 *  [".","6",".",".",".",".","2","8","."],
 *  [".",".",".","4","1","9",".",".","5"],
 *  [".",".",".",".","8",".",".","7","9"]]
 *
 * Algorithm tries each empty cell systematically, validating each placement.
 *
 * </details>
 */

/**
 * Solve a Sudoku puzzle using backtracking
 * @param {character[][]} board - 9x9 Sudoku board with '.' for empty cells
 * @return {void} - modifies board in-place
 */
function solveSudoku(board) {
    /**
     * Check if placing num at (row, col) is valid
     * @param {character[][]} board - the Sudoku board
     * @param {number} row - target row
     * @param {number} col - target column
     * @param {string} num - digit to place
     * @return {boolean} - true if placement is valid
     */
    function isValid(board, row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) {
                return false;
            }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const boxRow = 3 * Math.floor(row / 3);
        const boxCol = 3 * Math.floor(col / 3);
        for (let i = boxRow; i < boxRow + 3; i++) {
            for (let j = boxCol; j < boxCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Recursive backtracking solver
     * @return {boolean} - true if solved successfully
     */
    function solve() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    // Try digits 1-9
                    for (let num = 1; num <= 9; num++) {
                        const numStr = num.toString();
                        if (isValid(board, i, j, numStr)) {
                            board[i][j] = numStr;

                            // Recursively solve
                            if (solve()) {
                                return true;
                            }

                            // Backtrack
                            board[i][j] = '.';
                        }
                    }

                    // No valid digit found
                    return false;
                }
            }
        }

        // All cells filled successfully
        return true;
    }

    solve();
}

/**
 * Test cases for Sudoku solver
 */
function runTests() {
    // Test case 1: Standard Sudoku
    const board1 = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];

    const expected1 = [
        ["5","3","4","6","7","8","9","1","2"],
        ["6","7","2","1","9","5","3","4","8"],
        ["1","9","8","3","4","2","5","6","7"],
        ["8","5","9","7","6","1","4","2","3"],
        ["4","2","6","8","5","3","7","9","1"],
        ["7","1","3","9","2","4","8","5","6"],
        ["9","6","1","5","3","7","2","8","4"],
        ["2","8","7","4","1","9","6","3","5"],
        ["3","4","5","2","8","6","1","7","9"]
    ];

    solveSudoku(board1);
    console.assert(JSON.stringify(board1) === JSON.stringify(expected1),
                   `Test 1 failed: got ${JSON.stringify(board1)}`);

    // Test case 2: Harder Sudoku
    const board2 = [
        [".",".","9","7","4","8",".",".","."],
        ["7",".",".",".",".",".",".",".","."],
        [".","2",".","1",".","9",".",".","."],
        [".",".","7",".",".",".","2","4","."],
        [".","6","4",".","1",".","5","9","."],
        [".","9","8",".",".",".","3",".","."],
        [".",".",".","8",".","3",".","2","."],
        [".",".",".",".",".",".",".",".","6"],
        [".",".",".","2","7","5","9",".","."]
    ];

    // Just test that it solves without error
    solveSudoku(board2);

    // Validate the solution
    function isSolved(board) {
        // Check all cells are filled
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === '.') {
                    return false;
                }
            }
        }

        // Check rows
        for (let i = 0; i < 9; i++) {
            const rowSet = new Set(board[i]);
            if (rowSet.size !== 9) return false;
        }

        // Check columns
        for (let j = 0; j < 9; j++) {
            const colSet = new Set();
            for (let i = 0; i < 9; i++) {
                colSet.add(board[i][j]);
            }
            if (colSet.size !== 9) return false;
        }

        // Check 3x3 boxes
        for (let boxRow = 0; boxRow < 9; boxRow += 3) {
            for (let boxCol = 0; boxCol < 9; boxCol += 3) {
                const boxSet = new Set();
                for (let i = boxRow; i < boxRow + 3; i++) {
                    for (let j = boxCol; j < boxCol + 3; j++) {
                        boxSet.add(board[i][j]);
                    }
                }
                if (boxSet.size !== 9) return false;
            }
        }

        return true;
    }

    console.assert(isSolved(board2), "Test 2 failed: solution is invalid");

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = solveSudoku;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}