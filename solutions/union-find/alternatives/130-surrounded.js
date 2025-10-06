/**
 * 130. Surrounded
 * Medium
 *
 * Surrounded Regions - LeetCode 130 Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region. @param {character[][]} board @return {void} Do not return anything, modify board in-place instead.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Surrounded is to understand the core problem pattern
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
 * Surrounded Regions - LeetCode 130
 * 
 * Given an m x n matrix board containing 'X' and 'O', capture all regions 
 * that are 4-directionally surrounded by 'X'.
 * A region is captured by flipping all 'O's into 'X's in that surrounded region.
 * 
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */

const solve = function(board) {
    if (!board || board.length === 0) return;
    
    const rows = board.length;
    const cols = board[0].length;
    
    // First pass: Mark 'O's connected to border as safe ('S')
    // Check first and last row
    for (let col = 0; col < cols; col++) {
        dfs(board, 0, col);
        dfs(board, rows - 1, col);
    }
    
    // Check first and last column
    for (let row = 0; row < rows; row++) {
        dfs(board, row, 0);
        dfs(board, row, cols - 1);
    }
    
    // Second pass: Process the entire board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === 'O') {
                // If 'O' wasn't marked as safe, it's surrounded
                board[row][col] = 'X';
            } else if (board[row][col] === 'S') {
                // Restore safe cells back to 'O'
                board[row][col] = 'O';
            }
        }
    }
};

/**
 * Depth-first search to mark connected 'O's as safe
 * @param {character[][]} board - The game board
 * @param {number} row - Current row
 * @param {number} col - Current column
 */
function dfs(board, row, col) {
    // Check boundaries and if current cell is 'O'
    if (row < 0 || row >= board.length || 
        col < 0 || col >= board[0].length || 
        board[row][col] !== 'O') {
        return;
    }
    
    // Mark current cell as safe
    board[row][col] = 'S';
    
    // Check all four directions
    dfs(board, row + 1, col); // Down
    dfs(board, row - 1, col); // Up
    dfs(board, row, col + 1); // Right
    dfs(board, row, col - 1); // Left
}

/**
 * Test cases
 */
function runTests() {
    // Test Case 1
    const board1 = [
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X']
    ];
    console.log("Test Case 1 - Before:", JSON.stringify(board1));
    solve(board1);
    console.log("Test Case 1 - After:", JSON.stringify(board1));

    // Test Case 2
    const board2 = [['X']];
    console.log("Test Case 2 - Before:", JSON.stringify(board2));
    solve(board2);
    console.log("Test Case 2 - After:", JSON.stringify(board2));
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

// Export for testing
module.exports = {
    solve
};