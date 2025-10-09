/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
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
