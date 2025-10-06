/**
 * 36. Valid Sudoku
 * Medium
 *
 * Valid Sudoku Implementation This solution determines if a 9x9 Sudoku board is valid by checking three rules: 1. Each row must contain digits 1-9 without repetition 2. Each column must contain digits 1-9 without repetition 3. Each 3x3 sub-box must contain digits 1-9 without repetition Time Complexity: O(1) since board size is fixed at 9x9 Space Complexity: O(1) since we use fixed-size sets
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Valid Sudoku is to understand the core problem pattern
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
 * Valid Sudoku Implementation
 * 
 * This solution determines if a 9x9 Sudoku board is valid by checking three rules:
 * 1. Each row must contain digits 1-9 without repetition
 * 2. Each column must contain digits 1-9 without repetition
 * 3. Each 3x3 sub-box must contain digits 1-9 without repetition
 * 
 * Time Complexity: O(1) since board size is fixed at 9x9
 * Space Complexity: O(1) since we use fixed-size sets
 */

/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function(board) {
    // Early validation
    if (!board || board.length !== 9 || board[0].length !== 9) {
        return false;
    }

    // Initialize sets to track numbers in rows, columns, and boxes
    const rows = Array(9).fill().map(() => new Set());
    const cols = Array(9).fill().map(() => new Set());
    const boxes = Array(9).fill().map(() => new Set());

    // Iterate through each cell in the board
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const currentValue = board[row][col];
            
            // Skip empty cells
            if (currentValue === '.') {
                continue;
            }

            // Validate the current value is a digit between 1-9
            if (!/^[1-9]$/.test(currentValue)) {
                return false;
            }

            // Calculate which 3x3 box we're in (0-8)
            const boxIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);

            // Check if number already exists in row, column, or box
            if (rows[row].has(currentValue) || 
                cols[col].has(currentValue) || 
                boxes[boxIndex].has(currentValue)) {
                return false;
            }

            // Add number to respective sets
            rows[row].add(currentValue);
            cols[col].add(currentValue);
            boxes[boxIndex].add(currentValue);
        }
    }

    // If we've made it here, the board is valid
    return true;
};

/**
 * Test cases
 */
const testCases = [
    // Valid Sudoku board
    [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ],
    // Invalid Sudoku board
    [
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]
];

// Run test cases
testCases.forEach((board, index) => {
    console.log(`Test Case ${index + 1}: ${isValidSudoku(board)}`);
});

// Export the function for external use
module.exports = isValidSudoku;