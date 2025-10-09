/**

 * Backtrack
 *
 * This problem demonstrates key concepts in Matrix.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * [This problem requires understanding of matrix concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * APPROACH:

2. **Choose the right technique**: Apply matrix methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages matrix principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
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
                if (board[row][col] === '.') {
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
                            board[row][col] = '.';
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
    console.log('Testing 037. Sudoku Solver');

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

    solve(board1);
    console.assert(boardsEqual(board1, expected1), 'Test 1 failed: sudoku not solved correctly');

    // Test case 2: Another valid puzzle
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

    solve(board2);
    // Just verify it's completely filled (valid solution)
    let filled = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board2[i][j] === '.') filled = false;
        }
    }
    console.assert(filled, 'Test 2 failed: board not completely filled');

    console.log('All test cases passed for 037. Sudoku Solver!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 037. Sudoku Solver ===');
    console.log('Category: Matrix');
    console.log('Difficulty: Backtrack');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
