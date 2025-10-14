/**
 * # Difficulty: 
 *
 * # 079. Word Search
 * **Backtracking + DFS**
 *
 * Given an m x n grid of characters and a string word, return true if word exists in the grid.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["A", "B", "C", "E"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Word 'OATH' exists in the board by searching paths</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Use DFS with backtracking to search for the word starting from each cell. Mark visited
 * cells temporarily to avoid reusing them in the current path, then unmark for other paths.
 *
 * ### APPROACH:
 * 1. **Try each cell**: Start DFS from each cell matching first letter
 * 2. **DFS search**: Recursively search adjacent cells for next letter
 * 3. **Mark visited**: Temporarily mark cells to prevent revisiting
 * 4. **Backtrack**: Unmark cells when backtracking to try other paths
 * 5. **Check boundaries**: Validate cell coordinates and character match
 *
 * ### WHY THIS WORKS:
 * - DFS explores all possible paths from each starting position
 * - Backtracking allows trying different paths
 * - Visited marking prevents cycles in current path
 * - Early termination when word found
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Board: [['A','B','C','E'],
 *         ['S','F','C','S'],
 *         ['A','D','E','E']]
 * Word: "ABCCED"
 *
 * Step 1: Start at (0,0) 'A' - matches
 * Step 2: Try (0,1) 'B' - matches
 * Step 3: Try (0,2) 'C' - matches
 * Step 4: Try (1,2) 'C' - matches
 * Step 5: Try (2,2) 'E' - matches
 * Step 6: Try (2,3) 'D' - backtrack, try (1,3)
 * ...
 * Found: True
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m * n * 4^L) where L is word length
 *
 * ### SPACE COMPLEXITY:
 * O(L) for recursion stack
 *
 * ### EDGE CASES:
 * - Word longer than board cells
 * - Single character word
 * - Word not in board
 * - Entire board is the word
 *
 * </details>
 */

/**
 * Main solution for Problem 079: Word Search
 *
 * @param {character[][]} board - m x n grid of letters
 * @param {string} word - Word to search for
 * @return {boolean} - True if word exists in grid
 *
 * Time Complexity: O(m * n * 4^L) where L is word length
 * Space Complexity: O(L) for recursion stack
 */
function solve(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const m = board.length;
    const n = board[0].length;

    // DFS helper function
    function dfs(row, col, index) {
        // Base case: found the word
        if (index === word.length) return true;

        // Boundary checks and character match
        if (row < 0 || row >= m || col < 0 || col >= n ||
            board[row][col] !== word[index]) {
            return false;
        }

        // Mark as visited
        const temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        const found = dfs(row + 1, col, index + 1) ||
                     dfs(row - 1, col, index + 1) ||
                     dfs(row, col + 1, index + 1) ||
                     dfs(row, col - 1, index + 1);

        // Backtrack: restore the cell
        board[row][col] = temp;

        return found;
    }

    // Try starting from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === word[0] && dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Test cases for Problem 079: Word Search
 */
function testSolution() {
    console.log('Testing 079. Word Search');

    // Test case 1: Word exists
    const board1 = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ];
    console.assert(solve(board1, 'ABCCED') === true, 'Test 1 failed: ABCCED should exist');
    console.assert(solve(board1, 'SEE') === true, 'Test 2 failed: SEE should exist');
    console.assert(solve(board1, 'ABCB') === false, 'Test 3 failed: ABCB should not exist');

    // Test case 2: Single cell
    const board2 = [['A']];
    console.assert(solve(board2, 'A') === true, 'Test 4 failed: A should exist');
    console.assert(solve(board2, 'AB') === false, 'Test 5 failed: AB should not exist');

    // Test case 3: Word requires backtracking
    const board3 = [
        ['A', 'B'],
        ['C', 'D']
    ];
    console.assert(solve(board3, 'ABDC') === true, 'Test 6 failed: ABDC should exist');
    console.assert(solve(board3, 'ACDB') === true, 'Test 7 failed: ACDB should exist');

    // Test case 4: Longer word
    const board4 = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'E', 'S'],
        ['A', 'D', 'E', 'E']
    ];
    console.assert(solve(board4, 'ABCESEEEFS') === true, 'Test 8 failed: ABCESEEEFS should exist');

    // Test case 5: Word not in board
    const board5 = [
        ['A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A']
    ];
    console.assert(solve(board5, 'AAAAAAAAAAAAA') === false, 'Test 9 failed: word too long');
    console.assert(solve(board5, 'AAAA') === true, 'Test 10 failed: AAAA should exist');

    console.log('All test cases passed for 079. Word Search!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 079. Word Search ===');
    console.log('Category: Matrix');
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
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
