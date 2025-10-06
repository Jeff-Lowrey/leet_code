/**
 * 212. Word
 * Medium
 *
 * Word Search II - Find all words in a board of characters Uses Trie data structure for efficient word searching Time Complexity: O(M N 4^L) where M,N are board dimensions and L is max word length Space Complexity: O(K) where K is total length of all words in dictionary
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Word is to understand the core problem pattern
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
 * Word Search II - Find all words in a board of characters
 * Uses Trie data structure for efficient word searching
 * Time Complexity: O(M * N * 4^L) where M,N are board dimensions and L is max word length
 * Space Complexity: O(K) where K is total length of all words in dictionary
 */

// Trie Node class for building the prefix tree
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.word = '';
    }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
const findWords = function(board, words) {
    if (!board || !board.length || !words || !words.length) {
        return [];
    }

    // Build Trie from words
    const root = buildTrie(words);
    const result = new Set();
    const rows = board.length;
    const cols = board[0].length;

    // Search each cell as starting point
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            dfs(board, i, j, root, result);
        }
    }

    return Array.from(result);
};

/**
 * Builds a Trie from array of words
 * @param {string[]} words
 * @return {TrieNode}
 */
function buildTrie(words) {
    const root = new TrieNode();

    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
        node.word = word;
    }

    return root;
}

/**
 * DFS search through the board starting from position (i,j)
 * @param {character[][]} board
 * @param {number} i
 * @param {number} j
 * @param {TrieNode} node
 * @param {Set} result
 */
function dfs(board, i, j, node, result) {
    // Check boundaries and if character exists in current trie node
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || 
        !board[i][j] || !node.children[board[i][j]]) {
        return;
    }

    const char = board[i][j];
    const currentNode = node.children[char];

    // If we found a word, add it to result
    if (currentNode.isEndOfWord) {
        result.add(currentNode.word);
    }

    // Mark cell as visited
    board[i][j] = '#';

    // Search in all four directions
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (const [dx, dy] of directions) {
        dfs(board, i + dx, j + dy, currentNode, result);
    }

    // Restore the cell
    board[i][j] = char;
}

// Example usage:
const board = [
    ['o','a','a','n'],
    ['e','t','a','e'],
    ['i','h','k','r'],
    ['i','f','l','v']
];
const words = ["oath","pea","eat","rain"];

console.log(findWords(board, words)); // Expected output: ["eat","oath"]

// Export for testing
module.exports = {
    findWords,
    TrieNode
};