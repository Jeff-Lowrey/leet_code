/**
 * 211. Word
 * Medium
 *
 * Word Dictionary Implementation A trie-based dictionary that supports word insertion and search with wildcards
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
 * A trie-based dictionary that supports word insertion and search with wildcards
 */

/**
 * TrieNode class represents a node in the trie data structure
 */
class TrieNode {
    constructor() {
        this.children = new Map(); // Map to store child nodes
        this.isEndOfWord = false;  // Flag to mark end of a word
    }
}

/**
 * WordDictionary class implements the dictionary functionality
 */
class WordDictionary {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        this.root = new TrieNode();
    }
    
    /**
     * Adds a word into the data structure.
     * @param {string} word - The word to be added
     * @return {void}
     */
    addWord(word) {
        if (!word) return;
        
        let current = this.root;
        
        // Traverse the trie and create nodes as needed
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
        }
        
        current.isEndOfWord = true;
    }
    
    /**
     * Returns if the word is in the data structure.
     * A word could contain the dot character '.' to represent any letter.
     * @param {string} word - The word to search for
     * @return {boolean}
     */
    search(word) {
        return this.searchHelper(word, 0, this.root);
    }
    
    /**
     * Helper method for search functionality
     * @param {string} word - The word to search for
     * @param {number} index - Current index in the word
     * @param {TrieNode} node - Current node in the trie
     * @return {boolean}
     */
    searchHelper(word, index, node) {
        // Base case: reached end of word
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

// Example usage:
/*
const wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")); // false
console.log(wordDictionary.search("bad")); // true
console.log(wordDictionary.search(".ad")); // true
console.log(wordDictionary.search("b..")); // true
*/

// Export the class for use in other modules
module.exports = WordDictionary;