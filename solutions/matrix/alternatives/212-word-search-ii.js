/**
 * 212. Word Search II
 * Hard
 *
 * Word Search II - JavaScript Implementation
 * Time Complexity: O(m*n*4^L*W) where m,n are board dimensions, L is max word length, W is number of words
 * Space Complexity: O(W*L) for Trie storage
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is an extension of Word Search I, but instead of searching for one word, we need to find
 * multiple words efficiently. A Trie (prefix tree) is perfect for this as it allows us to search
 * for multiple words simultaneously and prune paths early when no word has a given prefix.
 *
 * ### APPROACH:
 * 1. **Build Trie**: Insert all words into a Trie data structure
 * 2. **DFS with Trie traversal**:
 *    - Start DFS from each cell
 *    - Traverse both the board and Trie simultaneously
 *    - When we reach a word end in Trie, add it to results
 *    - Prune branches when current path can't lead to any word
 * 3. **Optimization**: Remove found words from Trie to avoid duplicates
 *
 * ### WHY THIS WORKS:
 * - Trie allows efficient prefix checking and multiple word search
 * - DFS explores all paths while Trie guides the search
 * - Early pruning improves performance significantly
 * - Removing found words prevents duplicate results
 *
 * ### EXAMPLE WALKTHROUGH:
 * Board: [["o","a","a","n"],
 *         ["e","t","a","e"],
 *         ["i","h","k","r"],
 *         ["i","f","l","v"]]
 * Words: ["oath","pea","eat","rain"]
 *
 * Build Trie with all words, then DFS from each cell:
 * - From (0,0) 'o': o→a→t→h ✓ "oath" found
 * - From (1,1) 't': no valid words start with 't' at this position
 * - From (1,0) 'e': e→a→t ✓ "eat" found
 * - etc.
 *
 * Result: ["oath", "eat"]
 *
 * </details>
 */

/**
 * Trie node for efficient word search
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.word = null; // Store the complete word at end nodes
    }
}

/**
 * Find all words from the word list that exist in the board
 * @param {character[][]} board - m x n board of characters
 * @param {string[]} words - list of words to search for
 * @return {string[]} - all words found in the board
 */
function findWords(board, words) {
    if (!board || board.length === 0 || board[0].length === 0 || !words || words.length === 0) {
        return [];
    }

    // Build Trie
    const root = new TrieNode();
    for (const word of words) {
        let node = root;
        for (const char of word) {
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.word = word;
    }

    const m = board.length;
    const n = board[0].length;
    const result = [];

    /**
     * DFS with Trie traversal
     * @param {number} row - current row
     * @param {number} col - current column
     * @param {TrieNode} parent - current Trie node
     */
    function dfs(row, col, parent) {
        const char = board[row][col];
        const currNode = parent.children[char];

        // Check if we found a word
        if (currNode.word) {
            result.push(currNode.word);
            currNode.word = null; // Avoid duplicates
        }

        // Mark as visited
        board[row][col] = '#';

        // Explore all 4 directions
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n &&
                board[newRow][newCol] in currNode.children) {
                dfs(newRow, newCol, currNode);
            }
        }

        // Backtrack
        board[row][col] = char;

        // Optimization: remove empty nodes
        if (Object.keys(currNode.children).length === 0) {
            delete parent.children[char];
        }
    }

    // Try starting from each cell
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] in root.children) {
                dfs(i, j, root);
            }
        }
    }

    return result;
}

/**
 * Test cases for word search II
 */
function runTests() {
    // Test case 1: Standard case
    const board1 = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]];
    const words1 = ["oath","pea","eat","rain"];
    const result1 = findWords(board1, words1);
    const expected1 = ["oath", "eat"];
    console.assert(result1.sort().join(',') === expected1.sort().join(','),
                   `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: No words found
    const board2 = [["a","b"],["c","d"]];
    const words2 = ["abcb"];
    const result2 = findWords(board2, words2);
    const expected2 = [];
    console.assert(result2.length === expected2.length,
                   `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single character words
    const board3 = [["a","b"],["c","d"]];
    const words3 = ["a","b","c","d","e"];
    const result3 = findWords(board3, words3);
    const expected3 = ["a", "b", "c", "d"];
    console.assert(result3.sort().join(',') === expected3.sort().join(','),
                   `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Overlapping paths
    const board4 = [["a","a"]];
    const words4 = ["aaa"];
    const result4 = findWords(board4, words4);
    const expected4 = [];
    console.assert(result4.length === expected4.length,
                   `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Multiple valid words
    const board5 = [["a","b","c"],["a","e","d"],["a","f","g"]];
    const words5 = ["abcdefg","gfedcbaaa","eaabcdgfa","befa","dgc","ade"];
    const result5 = findWords(board5, words5);
    const expected5 = ["abcdefg","befa","eaabcdgfa","gfedcbaaa"];
    console.assert(result5.sort().join(',') === expected5.sort().join(','),
                   `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = findWords;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}