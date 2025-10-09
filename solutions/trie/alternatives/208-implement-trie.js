/**

 *
 * This problem demonstrates key concepts in Trie.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A Trie (prefix tree) is a tree-based data structure for storing strings efficiently.
 * Each node represents a character, and paths from root to nodes form words.
 * This allows for O(m) search, insert, and prefix matching where m is the key length.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Each character maps to exactly one child node per level
 * - isEndOfWord distinguishes complete words from prefixes
 * - Map-based children allow O(1) character lookup
 *
 * TIME COMPLEXITY: O(m) for all operations where m is word/prefix length
 * SPACE COMPLEXITY: O(n*m) where n is number of words, m is average word length
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Trie trie = new Trie();
 * trie.insert("apple");  // root -> a -> p -> p -> l -> e (isEnd=true)
 * trie.search("apple");  // returns true (found path, isEnd=true)
 * trie.search("app");    // returns false (found path, but isEnd=false)
 * trie.startsWith("app"); // returns true (found path)
 * ```
 *
 * EDGE CASES:
 * - Empty string handling
 * - Single character words
 * - Words that are prefixes of other words
 */

/**
 * TrieNode represents a single node in the Trie
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * Trie (Prefix Tree) implementation
 */
class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie
     * @param {string} word
     * @return {void}
     */
    insert(word) {
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
     * Returns if the word is in the trie
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;

        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }

        return node.isEndOfWord;
    }

    /**
     * Returns if there is any word in the trie that starts with the given prefix
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;

        for (const char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }

        return true;
    }
}

/**
 * Test cases for Problem 208: Implement Trie
 */
function testSolution() {
    console.log('Testing 208. Implement Trie');

    // Test case 1: Basic operations
    const trie1 = new Trie();
    trie1.insert("apple");
    console.assert(trie1.search("apple") === true, 'Test 1a failed: should find "apple"');
    console.assert(trie1.search("app") === false, 'Test 1b failed: "app" is not a complete word');
    console.assert(trie1.startsWith("app") === true, 'Test 1c failed: should find prefix "app"');
    trie1.insert("app");
    console.assert(trie1.search("app") === true, 'Test 1d failed: should find "app" after insertion');

    // Test case 2: Multiple words with common prefixes
    const trie2 = new Trie();
    trie2.insert("car");
    trie2.insert("card");
    trie2.insert("care");
    trie2.insert("careful");
    console.assert(trie2.search("car") === true, 'Test 2a failed');
    console.assert(trie2.search("card") === true, 'Test 2b failed');
    console.assert(trie2.search("care") === true, 'Test 2c failed');
    console.assert(trie2.search("careful") === true, 'Test 2d failed');
    console.assert(trie2.search("ca") === false, 'Test 2e failed');
    console.assert(trie2.startsWith("car") === true, 'Test 2f failed');

    // Test case 3: Single character words
    const trie3 = new Trie();
    trie3.insert("a");
    trie3.insert("ab");
    console.assert(trie3.search("a") === true, 'Test 3a failed');
    console.assert(trie3.search("ab") === true, 'Test 3b failed');
    console.assert(trie3.search("abc") === false, 'Test 3c failed');
    console.assert(trie3.startsWith("a") === true, 'Test 3d failed');

    console.log('All test cases passed for 208. Implement Trie!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 208. Implement Trie ===');
    console.log('Category: Trie');
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
    Trie,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This is the fundamental Trie implementation
 * - Can be extended with delete operation, auto-complete, etc.
 * - Map provides better performance than object for character storage
 * - Consider using arrays for fixed character sets (e.g., lowercase a-z)
 */
