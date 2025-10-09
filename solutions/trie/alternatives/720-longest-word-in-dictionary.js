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
 *
 * **Step 1:** [description]
 *
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

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEndOfWord = false;
        this.word = null; // Store the actual word at end nodes
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
        node.isEndOfWord = true;
        node.word = word;
    }

    /**
     * Find longest word where all prefixes are also words
     * Using DFS from root
     */
    findLongestWord() {
        let longest = '';

        const dfs = (node) => {
            // Only continue if current node is a word (or root)
            if (node !== this.root && !node.isEndOfWord) {
                return;
            }

            // Update longest if current word is longer
            // or same length but lexicographically smaller
            if (node.word) {
                if (node.word.length > longest.length ||
                    (node.word.length === longest.length && node.word < longest)) {
                    longest = node.word;
                }
            }

            // Explore children in sorted order for lexicographic preference
            const sortedKeys = Array.from(node.children.keys()).sort();
            for (const char of sortedKeys) {
                dfs(node.children.get(char));
            }
        };

        dfs(this.root);
        return longest;
    }

    /**
     * Check if all prefixes of word exist as complete words
     */
    hasAllPrefixes(word) {
        let node = this.root;
        for (let i = 0; i < word.length - 1; i++) {
            const char = word[i];
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
            if (!node.isEndOfWord) {
                return false;
            }
        }
        return true;
    }
}

/**
 * Main solution for Problem 720: Longest Word in Dictionary
 *
 * @param {string[]} words - Array of words
 * @return {string} - Longest word that can be built one character at a time
 *
 * Time Complexity: O(n*m)
 * Space Complexity: O(n*m)
 */
function longestWord(words) {
    const trie = new Trie();

    // Insert all words
    for (const word of words) {
        trie.insert(word);
    }

    // Find longest word using DFS
    return trie.findLongestWord();
}

/**
 * Alternative solution: check each word individually
 */
function longestWordAlternative(words) {
    const trie = new Trie();

    // Insert all words
    for (const word of words) {
        trie.insert(word);
    }

    let longest = '';

    // Check each word
    for (const word of words) {
        if (trie.hasAllPrefixes(word)) {
            if (word.length > longest.length ||
                (word.length === longest.length && word < longest)) {
                longest = word;
            }
        }
    }

    return longest;
}

/**
 * Simple solution using Set (no Trie needed for this problem)
 */
function longestWordSimple(words) {
    const wordSet = new Set(words);
    let longest = '';

    for (const word of words) {
        // Check if all prefixes exist
        let valid = true;
        for (let i = 1; i < word.length; i++) {
            if (!wordSet.has(word.substring(0, i))) {
                valid = false;
                break;
            }
        }

        if (valid) {
            if (word.length > longest.length ||
                (word.length === longest.length && word < longest)) {
                longest = word;
            }
        }
    }

    return longest;
}

/**
 * Test cases for Problem 720: Longest Word in Dictionary
 */
function testSolution() {
    console.log('Testing 720. Longest Word in Dictionary');

    // Test case 1: Example from problem
    const result1 = longestWord(["w", "wo", "wor", "worl", "world"]);
    const expected1 = "world";
    console.assert(result1 === expected1,
        `Test 1 failed: expected "${expected1}", got "${result1}"`);

    // Test case 2: Multiple valid words, choose lexicographically smallest
    const result2 = longestWord(["a", "banana", "app", "appl", "ap", "apply", "apple"]);
    const expected2 = "apple";
    console.assert(result2 === expected2,
        `Test 2 failed: expected "${expected2}", got "${result2}"`);

    // Test case 3: No valid word can be built
    const result3 = longestWord(["abc", "bc", "ab", "qwe"]);
    const expected3 = "";
    console.assert(result3 === expected3,
        `Test 3 failed: expected "${expected3}", got "${result3}"`);

    // Test case 4: Single character words building up
    const result4 = longestWord(["a", "b", "c", "ab", "abc"]);
    const expected4 = "abc";
    console.assert(result4 === expected4,
        `Test 4 failed: expected "${expected4}", got "${result4}"`);

    // Test case 5: Alternative solution
    const result5 = longestWordAlternative(["w", "wo", "wor", "worl", "world"]);
    console.assert(result5 === expected1,
        `Test 5 (alternative) failed: expected "${expected1}", got "${result5}"`);

    // Test case 6: Simple solution
    const result6 = longestWordSimple(["w", "wo", "wor", "worl", "world"]);
    console.assert(result6 === expected1,
        `Test 6 (simple) failed: expected "${expected1}", got "${result6}"`);

    // Test case 7: Lexicographic ordering with same length
    const result7 = longestWord(["a", "ab", "abc", "x", "xy", "xyz"]);
    const expected7 = "abc";
    console.assert(result7 === expected7,
        `Test 7 failed: expected "${expected7}", got "${result7}"`);

    console.log('All test cases passed for 720. Longest Word in Dictionary!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 720. Longest Word in Dictionary ===');
    console.log('Category: Trie');
    console.log('Difficulty: Easy');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    longestWord,
    longestWordAlternative,
    longestWordSimple,
    Trie,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Trie solution demonstrates the data structure but Set solution is simpler
 * - DFS approach ensures we find longest path efficiently
 * - Lexicographic ordering handled by sorting children keys
 * - Problem can be solved with or without Trie, but Trie provides good learning
 */
