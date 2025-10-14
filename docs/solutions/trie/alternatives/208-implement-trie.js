/**
 * # Difficulty: Medium
 *
 * # 208. Implement Trie
 *
 * A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.
 *
 * Implement the Trie class:
 * - Trie() Initializes the trie object.
 * - void insert(String word) Inserts the string word into the trie.
 * - boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
 * - boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>Insert "app":</dd>
 * <dt>Output:</dt>
 * <dd>root → 'a' → 'p' → 'p' (end=True)</dd>
 * <dt>Explanation:</dt>
 * <dd>Trie supports insert, search, and startsWith operations</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * A trie is a tree where each node represents a character and paths from root to nodes represent prefixes or complete words. Each node has children for possible next characters and a flag indicating if it's the end of a word.
 *
 * ### APPROACH:
 * 1. **Node structure**: Each node has a dictionary of children and a boolean end flag
 * 2. **Insert**: Follow/create path for each character, mark end node
 * 3. **Search**: Follow path, return true only if path exists and ends at marked node
 * 4. **StartsWith**: Follow path, return true if path exists regardless of end flag
 *
 * ### WHY THIS WORKS:
 * - Tree structure naturally represents prefix relationships
 * - Each level represents position in word/prefix
 * - End flags distinguish complete words from partial prefixes
 * - Dictionary children allow efficient character lookup
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Insert "app":
 * root → 'a' → 'p' → 'p' (end=True)
 *
 * Insert "apple":
 * root → 'a' → 'p' → 'p' → 'l' → 'e' (end=True)
 *
 * Search "app": root → 'a' → 'p' → 'p' (end=True) → True
 * Search "appl": root → 'a' → 'p' → 'p' → 'l' (end=False) → False
 * StartsWith "app": root → 'a' → 'p' → 'p' (exists) → True
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m)
 * Where m is the length of the word/prefix for all operations
 *
 * ### SPACE COMPLEXITY:
 * O(ALPHABET_SIZE × N × M)
 * Where N is number of words and M is average length
 *
 * ### EDGE CASES:
 * - **Empty string insertion**: Create root-only path with end marker
 * - **Prefix of existing word**: Both word and prefix marked separately
 * - **Word is prefix search**: Only return true if end marker present
 * - **Non-existent prefix**: Search returns false immediately
 * - **Single character words**: Handled like any other word
 *
 * </details>
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
