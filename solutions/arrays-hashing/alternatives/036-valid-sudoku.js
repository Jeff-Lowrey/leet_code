/**
 * 36. Valid Sudoku
 * Medium
 *
 * Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated
 * according to the following rules:
 * 1. Each row must contain the digits 1-9 without repetition.
 * 2. Each column must contain the digits 1-9 without repetition.
 * 3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use hash sets to track numbers in each row, column, and 3x3 box. For each filled cell,
 * check if the number already exists in its row, column, or box.
 *
 * APPROACH:
 * 1. **Initialize tracking**: Create sets for rows, columns, and boxes
 * 2. **Iterate board**: Check each non-empty cell
 * 3. **Validate constraints**: Ensure no duplicates in row, column, or box
 * 4. **Update sets**: Add valid numbers to their respective sets
 *
 * WHY THIS WORKS:
 * - Each number can appear only once per row, column, and box
 * - Sets provide O(1) lookup for duplicate detection
 * - Box index calculation: (row // 3) * 3 + (col // 3)
 * - Single pass through the board is sufficient
 *
 * TIME COMPLEXITY: O(1) - fixed 9x9 board size
 * SPACE COMPLEXITY: O(1) - at most 9 numbers per row/column/box
 *
 * EXAMPLE WALKTHROUGH:
 * Board with duplicate '5' in first row:
 * [["5","3",".",".","7",".",".",".","."],
 *  ["6",".",".","1","9","5",".",".","."],
 *  ...
 * Step 1: Process (0,0) = "5" → add to row[0], col[0], box[0]
 * Step 2: Process (0,1) = "3" → add to row[0], col[1], box[0]
 * Step 3: Process (0,4) = "7" → add to row[0], col[4], box[1]
 * Result: Valid so far...
 *
 * EDGE CASES:
 * - Empty board (all dots): valid
 * - Single number repeated in row/column/box: invalid
 * - Numbers outside 1-9 range: invalid (but not in this problem)
 */

/**
 * Main solution for Problem 36: Valid Sudoku
 *
 * @param {character[][]} board - 9x9 sudoku board
 * @return {boolean} - true if valid, false otherwise
 *
 * Time Complexity: O(1) - fixed 9x9 board
 * Space Complexity: O(1) - fixed size sets
 */
function solve(board) {
    // Initialize sets to track numbers in rows, columns, and boxes
    const rows = Array(9).fill(null).map(() => new Set());
    const cols = Array(9).fill(null).map(() => new Set());
    const boxes = Array(9).fill(null).map(() => new Set());

    // Iterate through each cell in the 9x9 board
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const val = board[i][j];

            // Skip empty cells
            if (val === '.') {
                continue;
            }

            // Calculate box index (0-8) for current cell
            const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

            // Check if number already exists in current row, column, or box
            if (rows[i].has(val) || cols[j].has(val) || boxes[boxIndex].has(val)) {
                return false;
            }

            // Add number to respective sets
            rows[i].add(val);
            cols[j].add(val);
            boxes[boxIndex].add(val);
        }
    }

    return true;
}

/**
 * Test cases for Problem 36: Valid Sudoku
 */
function testSolution() {
    console.log('Testing 36. Valid Sudoku');

    // Test case 1: Valid Sudoku board
    const validBoard = [
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
    const result1 = solve(validBoard);
    console.assert(result1 === true, `Test 1 failed: expected true, got ${result1}`);

    // Test case 2: Invalid Sudoku board (duplicate in row)
    const invalidBoard = [
        ["8","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];
    const result2 = solve(invalidBoard);
    console.assert(result2 === false, `Test 2 failed: expected false, got ${result2}`);

    // Test case 3: Empty board
    const emptyBoard = Array(9).fill(null).map(() => Array(9).fill('.'));
    const result3 = solve(emptyBoard);
    console.assert(result3 === true, `Test 3 failed: expected true, got ${result3}`);

    // Test case 4: Invalid board (duplicate in column)
    const invalidCol = [
        [".",".",".",".","5",".",".","1","."],
        [".","4",".","3",".",".",".",".","."],
        [".",".",".",".",".","3",".",".","1"],
        ["8",".",".",".",".",".",".","2","."],
        [".",".","2",".","7",".",".",".","."],
        [".","1","5",".",".",".",".",".","."],
        [".",".",".",".",".","2",".",".","."],
        [".","2",".","9",".",".",".",".","."],
        [".",".","4",".",".",".",".",".","."]]
    const result4 = solve(invalidCol);
    console.assert(result4 === false, `Test 4 failed: expected false, got ${result4}`);

    console.log('All test cases passed for 36. Valid Sudoku!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 36. Valid Sudoku ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Box index calculation is key: (row // 3) * 3 + (col // 3)
 * - This maps 9x9 grid to 9 boxes numbered 0-8
 * - Sets provide efficient O(1) duplicate detection
 * - Only need to validate filled cells, empty cells are ignored
 */