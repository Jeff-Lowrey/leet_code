/**
 * 79. Word Search
 * Medium
 *
 * Word Search - JavaScript Implementation
 * Time Complexity: O(m*n*4^L) where m,n are board dimensions and L is word length
 * Space Complexity: O(L) - recursion depth for word length
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * We need to find a path in the grid that spells out the target word. This is a classic backtracking
 * problem where we explore all possible paths from each starting position.
 *
 * ### APPROACH:
 * 1. **Try each cell as starting point**: For each cell, start DFS if it matches first character
 * 2. **DFS with backtracking**:
 *    - Mark current cell as visited (modify in-place)
 *    - Try all 4 directions (up, down, left, right)
 *    - If we reach the end of word, return true
 *    - Backtrack by unmarking the cell
 * 3. **Base cases**:
 *    - If we've matched entire word, return true
 *    - If out of bounds or character doesn't match, return false
 *
 * ### WHY THIS WORKS:
 * - DFS explores all possible paths from each starting position
 * - Backtracking ensures we don't reuse cells in the same path
 * - In-place modification avoids extra space for visited tracking
 *
 * ### EXAMPLE WALKTHROUGH:
 * Board: [["A","B","C","E"],
 *         ["S","F","C","S"],
 *         ["A","D","E","E"]]
 * Word: "ABCCED"
 *
 * Start at (0,0) 'A':
 * A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1) ✓
 *
 * Path found: A→B→C→C→E→D matches "ABCCED"
 *
 * </details>
 */

/**
 * Check if word exists in the board using DFS with backtracking
 * @param {character[][]} board - m x n grid of characters
 * @param {string} word - target word to search for
 * @return {boolean} - true if word exists in board, false otherwise
 */
function exist(board, word) {
    if (!board || board.length === 0 || board[0].length === 0 || !word) {
        return false;
    }

    const m = board.length;
    const n = board[0].length;

    /**
     * DFS helper function with backtracking
     * @param {number} row - current row
     * @param {number} col - current column
     * @param {number} index - current index in word
     * @return {boolean} - true if word can be formed from this position
     */
    function dfs(row, col, index) {
        // Base case: found the entire word
        if (index === word.length) {
            return true;
        }

        // Check bounds and character match
        if (row < 0 || row >= m || col < 0 || col >= n ||
            board[row][col] !== word[index]) {
            return false;
        }

        // Mark current cell as visited
        const temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of directions) {
            if (dfs(row + dr, col + dc, index + 1)) {
                board[row][col] = temp; // Restore before returning
                return true;
            }
        }

        // Backtrack: restore original character
        board[row][col] = temp;
        return false;
    }

    // Try starting from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Test cases for word search
 */
function runTests() {
    // Test case 1: Word exists
    const board1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
    console.assert(exist(board1, "ABCCED") === true, "Test 1a failed");

    const board1b = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
    console.assert(exist(board1b, "SEE") === true, "Test 1b failed");

    const board1c = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
    console.assert(exist(board1c, "ABCB") === false, "Test 1c failed");

    // Test case 2: Single character
    const board2 = [["A"]];
    console.assert(exist(board2, "A") === true, "Test 2a failed");

    const board2b = [["A"]];
    console.assert(exist(board2b, "AB") === false, "Test 2b failed");

    // Test case 3: Word doesn't exist
    const board3 = [["A","B"],["C","D"]];
    console.assert(exist(board3, "ACDB") === true, "Test 3a failed");

    const board3b = [["A","B"],["C","D"]];
    console.assert(exist(board3b, "ACDBX") === false, "Test 3b failed");

    // Test case 4: Complex path
    const board4 = [["C","A","A"],["A","A","A"],["B","C","D"]];
    console.assert(exist(board4, "AAB") === true, "Test 4a failed");

    // Test case 5: Backtracking required
    const board5 = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]];
    console.assert(exist(board5, "ABCESEEEFS") === true, "Test 5 failed");

    // Test case 6: Long word
    const board6 = [["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]];
    console.assert(exist(board6, "aaaaaaaaaaaaa") === false, "Test 6 failed");

    // Test case 7: Edge case - empty word
    const board7 = [["A"]];
    console.assert(exist(board7, "") === false, "Test 7 failed");

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = exist;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}