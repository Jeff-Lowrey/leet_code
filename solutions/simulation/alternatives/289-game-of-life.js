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
 * Main solution for Problem 289: Game Of Life
 *
 * @param {number[][]} board - 2D grid representing game state
 * @return {void} - Modifies board in-place
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1)
 */
function solve(board) {
    if (!board || board.length === 0 || board[0].length === 0) {
        return;
    }

    const m = board.length;
    const n = board[0].length;

    // State encoding:
    // 0: dead -> dead
    // 1: live -> live
    // 2: live -> dead (dying)
    // 3: dead -> live (born)

    // Helper function to count live neighbors
    const countLiveNeighbors = (row, col) => {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        let count = 0;
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
                // Count as live if originally live (1 or 2)
                if (board[newRow][newCol] === 1 || board[newRow][newCol] === 2) {
                    count++;
                }
            }
        }

        return count;
    };

    // First pass: mark transitions using encoding
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const liveNeighbors = countLiveNeighbors(i, j);

            if (board[i][j] === 1) {
                // Live cell
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    board[i][j] = 2; // Will die
                }
                // else stays 1 (survives)
            } else {
                // Dead cell
                if (liveNeighbors === 3) {
                    board[i][j] = 3; // Will become alive
                }
                // else stays 0 (stays dead)
            }
        }
    }

    // Second pass: finalize states
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 2) {
                board[i][j] = 0; // Died
            } else if (board[i][j] === 3) {
                board[i][j] = 1; // Born
            }
        }
    }
}

/**
 * Test cases for Problem 289: Game Of Life
 */
function testSolution() {
    console.log('Testing 289. Game Of Life');

    // Helper to compare 2D arrays
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].length !== b[i].length) return false;
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };

    // Test case 1: Basic example
    const board1 = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
    solve(board1);
    const expected1 = [[0,0,0],[1,0,1],[0,1,1],[0,1,0]];
    console.assert(arraysEqual(board1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(board1)}`);

    // Test case 2: All dead cells
    const board2 = [[0,0],[0,0]];
    solve(board2);
    const expected2 = [[0,0],[0,0]];
    console.assert(arraysEqual(board2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(board2)}`);

    // Test case 3: Stable configuration (block)
    const board3 = [[1,1],[1,1]];
    solve(board3);
    const expected3 = [[1,1],[1,1]];
    console.assert(arraysEqual(board3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(board3)}`);

    // Test case 4: Blinker (oscillator)
    const board4 = [[0,0,0],[1,1,1],[0,0,0]];
    solve(board4);
    const expected4 = [[0,1,0],[0,1,0],[0,1,0]];
    console.assert(arraysEqual(board4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(board4)}`);

    // Test case 5: Single cell (dies)
    const board5 = [[1]];
    solve(board5);
    const expected5 = [[0]];
    console.assert(arraysEqual(board5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(board5)}`);

    console.log('All test cases passed for 289. Game Of Life!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 289. Game Of Life ===');
    console.log('Category: Simulation');
    console.log('Difficulty: Medium');
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
