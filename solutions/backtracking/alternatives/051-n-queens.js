/**
 * 51. N Queens
 * Medium
 *
 * N-Queens Problem Solver This implementation finds all possible solutions to place N queens on an NxN chessboard such that no two queens threaten each other.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving N Queens is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * N-Queens Problem Solver
 * This implementation finds all possible solutions to place N queens on an NxN chessboard
 * such that no two queens threaten each other.
 */

/**
 * @param {number} n - Size of the board (n x n)
 * @return {string[][]} - Array of valid board configurations
 */
function solveNQueens(n) {
    // Store all valid solutions
    const solutions = [];
    
    // Initialize empty board
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    /**
     * Checks if placing a queen at position (row, col) is valid
     * @param {number} row - Current row
     * @param {number} col - Current column
     * @param {string[][]} board - Current board state
     * @returns {boolean} - Whether placement is valid
     */
    function isValid(row, col, board) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check upper left diagonal
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check upper right diagonal
        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        
        return true;
    }
    
    /**
     * Converts board configuration to required string format
     * @param {string[][]} board - Current board state
     * @returns {string[]} - Board configuration as array of strings
     */
    function formatBoard(board) {
        return board.map(row => row.join(''));
    }
    
    /**
     * Recursively places queens on the board using backtracking
     * @param {number} row - Current row to place queen
     */
    function backtrack(row) {
        // If we've placed all queens, we've found a solution
        if (row === n) {
            solutions.push(formatBoard([...board]));
            return;
        }
        
        // Try placing queen in each column of current row
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, board)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';  // Backtrack
            }
        }
    }
    
    // Start the recursive process from first row
    backtrack(0);
    return solutions;
}

/**
 * Example usage and test cases
 */
function runTests() {
    // Test Case 1: n = 4
    console.log("Test Case 1 (n = 4):");
    console.log(solveNQueens(4));
    
    // Test Case 2: n = 1
    console.log("\nTest Case 2 (n = 1):");
    console.log(solveNQueens(1));
    
    // Test Case 3: n = 0
    console.log("\nTest Case 3 (n = 0):");
    console.log(solveNQueens(0));
}

// Export the solution for use in other modules
module.exports = {
    solveNQueens
};

// Uncomment to run tests
// runTests();