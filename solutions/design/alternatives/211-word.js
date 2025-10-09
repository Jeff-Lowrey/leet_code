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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Trie Node for storing word characters
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * WordDictionary class supporting add and search operations with wildcards
 */
class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Adds a word to the data structure
     * @param {string} word - Word to add
     * Time Complexity: O(L) where L is word length
     */
    addWord(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEndOfWord = true;
    }

    /**
     * Searches for a word (may contain wildcards '.')
     * @param {string} word - Word to search (can contain '.')
     * @return {boolean} - True if word exists
     * Time Complexity: O(L) best case, O(26^L) worst case with wildcards
     */
    search(word) {
        return this._searchHelper(word, 0, this.root);
    }

    /**
     * Helper function for DFS search with wildcards
     * @param {string} word - Word to search
     * @param {number} index - Current character index
     * @param {TrieNode} node - Current trie node
     * @return {boolean}
     */
    _searchHelper(word, index, node) {
        // Base case: reached end of word
        if (index === word.length) {
            return node.isEndOfWord;
        }

        const char = word[index];

        if (char === '.') {
            // Wildcard: try all possible children
            for (const childNode of node.children.values()) {
                if (this._searchHelper(word, index + 1, childNode)) {
                    return true;
                }
            }
            return false;
        } else {
            // Regular character: follow specific path
            if (!node.children.has(char)) {
                return false;
            }
            return this._searchHelper(word, index + 1, node.children.get(char));
        }
    }
}

/**
 * Factory function for creating WordDictionary instances
 * @return {WordDictionary}
 */
function solve() {
    return new WordDictionary();
}

/**
 * Test cases for Problem 211: Design Add and Search Words Data Structure
 */
function testSolution() {
    console.log('Testing 211. Design Add and Search Words Data Structure');

    // Test case 1: Basic functionality with wildcards
    const dict1 = new WordDictionary();
    dict1.addWord("bad");
    dict1.addWord("dad");
    dict1.addWord("mad");
    console.assert(dict1.search("pad") === false, 'Test 1a failed');
    console.assert(dict1.search("bad") === true, 'Test 1b failed');
    console.assert(dict1.search(".ad") === true, 'Test 1c failed');
    console.assert(dict1.search("b..") === true, 'Test 1d failed');
    console.assert(dict1.search("...") === true, 'Test 1e failed');
    console.assert(dict1.search("....") === false, 'Test 1f failed');

    // Test case 2: Single character words
    const dict2 = new WordDictionary();
    dict2.addWord("a");
    dict2.addWord("b");
    console.assert(dict2.search("a") === true, 'Test 2a failed');
    console.assert(dict2.search(".") === true, 'Test 2b failed');
    console.assert(dict2.search("c") === false, 'Test 2c failed');

    // Test case 3: No matches
    const dict3 = new WordDictionary();
    dict3.addWord("hello");
    console.assert(dict3.search("world") === false, 'Test 3a failed');
    console.assert(dict3.search("hel") === false, 'Test 3b failed (prefix)');
    console.assert(dict3.search("hello") === true, 'Test 3c failed');

    // Test case 4: Complex wildcards
    const dict4 = new WordDictionary();
    dict4.addWord("at");
    dict4.addWord("and");
    dict4.addWord("an");
    dict4.addWord("add");
    console.assert(dict4.search("a") === false, 'Test 4a failed');
    console.assert(dict4.search(".at") === false, 'Test 4b failed');
    dict4.addWord("bat");
    console.assert(dict4.search(".at") === true, 'Test 4c failed');
    console.assert(dict4.search("an.") === true, 'Test 4d failed');
    console.assert(dict4.search("a.d.") === false, 'Test 4e failed');
    console.assert(dict4.search("b.") === false, 'Test 4f failed');
    console.assert(dict4.search("a.d") === true, 'Test 4g failed');
    console.assert(dict4.search(".") === false, 'Test 4h failed');

    console.log('All test cases passed for 211. Design Add and Search Words Data Structure!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 211. Design Add and Search Words Data Structure ===');
    console.log('Category: Design');
    console.log('Difficulty: Medium');
    console.log('');

    // Example: Create dictionary and search with wildcards
    const dict = new WordDictionary();
    console.log('Operations:');
    console.log('addWord("bad")');
    dict.addWord("bad");
    console.log('addWord("dad")');
    dict.addWord("dad");
    console.log('addWord("mad")');
    dict.addWord("mad");

    console.log('\nSearches:');
    console.log(`search("pad"): ${dict.search("pad")} (expected: false)`);
    console.log(`search("bad"): ${dict.search("bad")} (expected: true)`);
    console.log(`search(".ad"): ${dict.search(".ad")} (expected: true)`);
    console.log(`search("b.."): ${dict.search("b..")} (expected: true)`);
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    TrieNode,
    WordDictionary,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Trie structure provides efficient prefix-based operations
 * - Wildcard support requires DFS but maintains good average-case performance
 * - Memory efficient for storing many words with common prefixes
 * - Can be extended to support other wildcard patterns or regex
 * - The approach is commonly used in autocomplete and spell-check systems
 */
