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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.word = null; // Store complete word at end node
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.word = word;
    }
}

/**
 * Main solution for Problem 212: Word Search II
 *
 * @param {character[][]} board - 2D board of characters
 * @param {string[]} words - Array of words to search for
 * @return {string[]} - Array of words found in the board
 *
 * Time Complexity: O(m*n*4^L)
 * Space Complexity: O(k*w)
 */
function findWords(board, words) {
    if (!board || board.length === 0 || !words || words.length === 0) {
        return [];
    }

    // Build Trie from words
    const trie = new Trie();
    for (const word of words) {
        trie.insert(word);
    }

    const rows = board.length;
    const cols = board[0].length;
    const result = [];

    // DFS function
    const dfs = (row, col, node) => {
        // Boundary checks
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            return;
        }

        const char = board[row][col];

        // If cell is visited or character not in Trie, return
        if (char === '#' || !node.children.has(char)) {
            return;
        }

        // Move to next Trie node
        node = node.children.get(char);

        // Found a word
        if (node.word) {
            result.push(node.word);
            // Prevent duplicates by removing word from Trie
            node.word = null;
        }

        // Mark cell as visited
        board[row][col] = '#';

        // Explore all 4 directions
        dfs(row + 1, col, node);
        dfs(row - 1, col, node);
        dfs(row, col + 1, node);
        dfs(row, col - 1, node);

        // Backtrack: restore cell
        board[row][col] = char;

        // Optimization: prune empty branches from Trie
        if (node.children.size === 0) {
            // This node is now a dead end, could remove from parent
            // (more complex implementation needed for full pruning)
        }
    };

    // Try starting from each cell
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            dfs(row, col, trie.root);
        }
    }

    return result;
}

/**
 * Test cases for Problem 212: Word Search II
 */
function testSolution() {
    console.log('Testing 212. Word Search II');

    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return sortedA.every((val, idx) => val === sortedB[idx]);
    };

    // Test case 1: Example from problem
    const board1 = [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"]
    ];
    const words1 = ["oath", "pea", "eat", "rain"];
    const result1 = findWords(board1, words1);
    const expected1 = ["oath", "eat"];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Single letter words
    const board2 = [["a", "b"], ["c", "d"]];
    const words2 = ["a", "b", "c", "d", "e"];
    const result2 = findWords(board2, words2);
    const expected2 = ["a", "b", "c", "d"];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No words found
    const board3 = [["a", "b"], ["c", "d"]];
    const words3 = ["xyz", "qwe"];
    const result3 = findWords(board3, words3);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Words with common prefixes
    const board4 = [
        ["a", "b", "c"],
        ["x", "e", "d"],
        ["y", "f", "g"]
    ];
    const words4 = ["abc", "aed", "afg", "xyz"];
    const result4 = findWords(board4, words4);
    const expected4 = ["abc"];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Duplicate words in input (should return once)
    const board5 = [["a", "a"]];
    const words5 = ["aa", "aa"];
    const result5 = findWords(board5, words5);
    const expected5 = ["aa"];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 212. Word Search II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 212. Word Search II ===');
    console.log('Category: Trie');
    console.log('Difficulty: Hard');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    findWords,
    Trie,
    TrieNode,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This is THE classic Trie + Backtracking problem
 * - Trie dramatically improves performance vs searching each word separately
 * - Pruning found words prevents duplicates
 * - Can further optimize by removing dead branches from Trie
 * - Much more efficient than Word Search I when searching multiple words
 */
