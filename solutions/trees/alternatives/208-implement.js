/**
 * 208. Implement
 * Medium
 *
 * Trie (Prefix Tree) Implementation A Trie is a tree-like data structure used for efficient retrieval of keys in a dataset of strings. Each node in the Trie represents a character, and paths from root to leaf represent complete words.
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
 * A Trie is a tree-like data structure used for efficient retrieval of keys in a dataset of strings.
 * Each node in the Trie represents a character, and paths from root to leaf represent complete words.
 */

class TrieNode {
    constructor() {
        // Initialize a map to store child nodes (characters)
        this.children = new Map();
        // Flag to mark if this node represents the end of a word
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        // Initialize the root node
        this.root = new TrieNode();
    }

    /**
     * Inserts a word into the trie.
     * @param {string} word - The word to insert
     * @return {void}
     */
    insert(word) {
        if (!word) return;

        let current = this.root;
        
        // Traverse through each character in the word
        for (let char of word) {
            // If character doesn't exist in current node's children, create new node
            if (!current.children.has(char)) {
                current.children.set(char, new TrieNode());
            }
            // Move to the next node
            current = current.children.get(char);
        }
        
        // Mark the last node as end of word
        current.isEndOfWord = true;
    }

    /**
     * Returns true if the word is in the trie.
     * @param {string} word - The word to search for
     * @return {boolean}
     */
    search(word) {
        if (!word) return false;

        let current = this.root;
        
        // Traverse through each character in the word
        for (let char of word) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        // Return true only if we've reached the end of a word
        return current.isEndOfWord;
    }

    /**
     * Returns true if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix - The prefix to search for
     * @return {boolean}
     */
    startsWith(prefix) {
        if (!prefix) return false;

        let current = this.root;
        
        // Traverse through each character in the prefix
        for (let char of prefix) {
            if (!current.children.has(char)) {
                return false;
            }
            current = current.children.get(char);
        }
        
        // If we've made it through all characters, prefix exists
        return true;
    }
}

// Example usage:
/*
const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));   // returns true
console.log(trie.search("app"));     // returns false
console.log(trie.startsWith("app")); // returns true
trie.insert("app");
console.log(trie.search("app"));     // returns true
*/

// Export the Trie class for use in other modules
module.exports = Trie;