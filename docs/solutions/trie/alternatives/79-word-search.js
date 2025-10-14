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
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 79: Word Search
 *
 * @param {character[][]} board - 2D board of characters
 * @param {string} word - Word to search for
 * @return {boolean} - True if word exists in board
 *
 * Time Complexity: O(m*n*4^L)
 * Space Complexity: O(L)
 */
function exist(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const rows = board.length;
    const cols = board[0].length;

    // DFS helper function
    const dfs = (row, col, index) => {
        // Found the complete word
        if (index === word.length) return true;

        // Boundary checks and character match
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }

        // Mark cell as visited by temporarily changing it
        const temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        const found = dfs(row + 1, col, index + 1) ||  // down
                     dfs(row - 1, col, index + 1) ||  // up
                     dfs(row, col + 1, index + 1) ||  // right
                     dfs(row, col - 1, index + 1);    // left

        // Backtrack: restore the cell
        board[row][col] = temp;

        return found;
    };

    // Try starting from each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (dfs(row, col, 0)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Alternative solution using visited set instead of modifying board
 */
function existWithSet(board, word) {
    if (!board || board.length === 0 || !word) return false;

    const rows = board.length;
    const cols = board[0].length;

    const dfs = (row, col, index, visited) => {
        if (index === word.length) return true;

        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            return false;
        }

        const key = `${row},${col}`;
        if (visited.has(key) || board[row][col] !== word[index]) {
            return false;
        }

        visited.add(key);

        const found = dfs(row + 1, col, index + 1, visited) ||
                     dfs(row - 1, col, index + 1, visited) ||
                     dfs(row, col + 1, index + 1, visited) ||
                     dfs(row, col - 1, index + 1, visited);

        visited.delete(key);

        return found;
    };

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (dfs(row, col, 0, new Set())) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Test cases for Problem 79: Word Search
 */
function testSolution() {
    console.log('Testing 79. Word Search');

    // Test case 1: Word exists
    const board1 = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ];
    const result1 = exist(board1, "ABCCED");
    console.assert(result1 === true, 'Test 1 failed: "ABCCED" should be found');

    // Test case 2: Word exists with different path
    const board2 = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ];
    const result2 = exist(board2, "SEE");
    console.assert(result2 === true, 'Test 2 failed: "SEE" should be found');

    // Test case 3: Word does not exist
    const board3 = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ];
    const result3 = exist(board3, "ABCB");
    console.assert(result3 === false, 'Test 3 failed: "ABCB" should not be found');

    // Test case 4: Single cell
    const board4 = [["A"]];
    const result4a = exist(board4, "A");
    const result4b = exist(board4, "B");
    console.assert(result4a === true, 'Test 4a failed: "A" should be found');
    console.assert(result4b === false, 'Test 4b failed: "B" should not be found');

    // Test case 5: Word requires zigzag path
    const board5 = [
        ["C", "A", "A"],
        ["A", "A", "A"],
        ["B", "C", "D"]
    ];
    const result5 = exist(board5, "AAB");
    console.assert(result5 === true, 'Test 5 failed: "AAB" should be found');

    // Test case 6: Alternative solution with Set
    const board6 = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"]
    ];
    const result6 = existWithSet(board6, "ABCCED");
    console.assert(result6 === true, 'Test 6 (with Set) failed: "ABCCED" should be found');

    console.log('All test cases passed for 79. Word Search!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 79. Word Search ===');
    console.log('Category: Trie / Backtracking');
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
    exist,
    existWithSet,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This problem is typically solved with backtracking, not Trie
 * - Trie would be useful for Word Search II (multiple words)
 * - Modifying board temporarily is more space-efficient than using Set
 * - Can optimize by checking if word has characters not in board before starting
 */
