/**
 * 208. Implement
 * Medium
 *
 * Trie (Prefix Tree) Implementation This implementation includes: - Trie class with TrieNode structure - insert: Insert a word into the trie - search: Search for a complete word in the trie - startsWith: Check if there is any word that starts with the given prefix
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Implement is to understand the core problem pattern
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
 * Trie (Prefix Tree) Implementation
 * 
 * This implementation includes:
 * - Trie class with TrieNode structure
 * - insert: Insert a word into the trie
 * - search: Search for a complete word in the trie
 * - startsWith: Check if there is any word that starts with the given prefix
 */

/**
 * TrieNode class represents each node in the Trie
 * Each node contains:
 * - children: Map of characters to child nodes
 * - isEndOfWord: Boolean indicating if this node represents the end of a word
 */
class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
    }
}

/**
 * Trie class implementation
 */
class Trie {
    /**
     * Initialize your data structure here.
     */
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     * @param {string} word - The word to insert
     * @return {void}
     */
    insert(word) {
        let current = this.root;
        
        // Traverse the trie, creating nodes as needed
        for (let char of word) {
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            current = current.children.get(char);
        }
        
        // Mark the end of the word
        current.isEndOfWord = true;
    }

    /**
     * Returns true if the word is in the trie.
     * @param {string} word - The word to search for
     * @return {boolean}
     */
    search(word) {
        let node = this._traversePrefix(word);
        // Word exists if we found the node and it's marked as end of word
        return node !== null && node.isEndOfWord;
    }

    /**
     * Returns true if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix - The prefix to search for
     * @return {boolean}
     */
    startsWith(prefix) {
        // If we can traverse to the end of the prefix, it exists
        return this._traversePrefix(prefix) !== null;
    }

    /**
     * Helper method to traverse the trie following a given string
     * @param {string} str - The string to follow
     * @return {TrieNode|null} - The last node or null if path doesn't exist
     * @private
     */
    _traversePrefix(str) {
        let current = this.root;
        
        for (let char of str) {
            if (!current.children.has(char)) {
                return null;
            }
            current = current.children.get(char);
        }
        
        return current;
    }
}

/**
 * Example usage:
 * const trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // returns true
 * trie.search("app");     // returns false
 * trie.startsWith("app"); // returns true
 * trie.insert("app");
 * trie.search("app");     // returns true
 */

// Export the Trie class if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Trie;
}