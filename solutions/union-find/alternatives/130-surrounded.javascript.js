I'll help you create a solution for the Surrounded Regions problem in JavaScript. I'll write a complete implementation with comments and proper structure.

```javascript
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
```

This implementation provides a solution to the Surrounded Regions problem with the following features:

1. **Main Function**: `solve(board)` that modifies the board in-place
2. **Helper Function**: `dfs(board, row, col)` for depth-first search
3. **Algorithm Approach**:
   - First marks all 'O's connected to the border as safe ('S')
   - Then converts remaining 'O's to 'X's and restores safe cells
4. **Error Handling**: Checks for null/empty input
5. **Test Cases**: Includes basic test cases
6. **Comments**: Detailed comments explaining the implementation
7. **Module Export**: Exports the solution for testing

The solution uses a two-pass approach:
1. First identifies and marks all 'O's that are connected to the border
2. Then processes the entire board to capture surrounded regions

The time complexity is O(M × N) where M and N are the dimensions of the board, and the space complexity is O(M × N) in the worst case due to recursion stack.