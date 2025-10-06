/**
 * 211. Word
 * Medium
 *
 * Word Dictionary Implementation This implementation uses a Trie (prefix tree) data structure to efficiently store and search words, including support for wildcard pattern matching.
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
 * Word Dictionary Implementation
 * 
 * This implementation uses a Trie (prefix tree) data structure to efficiently
 * store and search words, including support for wildcard pattern matching.
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

class WordDictionary {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * Adds a word into the data structure.
     * @param {string} word
     * @return {void}
     */
    addWord(word) {
        if (!word) return;
        
        let current = this.root;
        
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
        }
        
        current.isEndOfWord = true;
    }
    
    /**
     * Returns if the word is in the data structure. A word could contain the dot character '.'
     * to represent any letter.
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        return this.searchHelper(word, 0, this.root);
    }
    
    /**
     * Helper method for searching words with wildcards
     * @param {string} word - The word to search for
     * @param {number} index - Current index in the word
     * @param {TrieNode} node - Current node in the trie
     * @return {boolean}
     */
    searchHelper(word, index, node) {
        // Base case: reached the end of the word
        if (index === word.length) {
            return node.isEndOfWord;
        }
        
        const char = word[index];
        
        // Handle wildcard character
        if (char === '.') {
            // Try all possible characters at this position
            for (let [, child] of node.children) {
                if (this.searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        }
        
        // Handle regular character
        if (!node.children.has(char)) {
            return false;
        }
        
        return this.searchHelper(word, index + 1, node.children.get(char));
    }
}

/**
 * Example usage:
 */
function runExample() {
    const wordDictionary = new WordDictionary();
    
    // Add some words
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    
    // Search examples
    console.log(wordDictionary.search("pad")); // false
    console.log(wordDictionary.search("bad")); // true
    console.log(wordDictionary.search(".ad")); // true
    console.log(wordDictionary.search("b..")); // true
}

// Export the class for use in other modules
module.exports = WordDictionary;

// Uncomment to run the example
// runExample();