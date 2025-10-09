/**

 *
 * This problem demonstrates key concepts in Trie.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * An autocomplete system needs to suggest top sentences based on historical searches.
 * Trie structure combined with frequency tracking allows efficient prefix matching
 * and ranking by popularity (hot degree).
 *
 * APPROACH:



 *    - If '#', save current sentence to Trie and reset
 *    - Otherwise, find all sentences with current prefix
 *    - Sort by: frequency (desc), then lexicographically (asc)
 *    - Return top 3 results

 *
 * WHY THIS WORKS:
 * - Trie enables O(p) prefix matching where p is prefix length
 * - Storing frequencies allows ranking by popularity
 * - DFS collects all matching sentences efficiently
 *
 * TIME COMPLEXITY:
 *   Constructor: O(k*l) where k = sentences count, l = average length
 *   Input: O(p + n*log(n)) where p = prefix length, n = matching sentences
 * SPACE COMPLEXITY: O(k*l) for Trie storage
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * sentences = ["i love you", "island", "iroman"], times = [5,3,2]
 * User types 'i':
 *   Find all sentences starting with "i"
 *   Sort by frequency: ["i love you"(5), "island"(3), "iroman"(2)]
 *   Return top 3: ["i love you", "island", "iroman"]
 * User types ' ':
 *   Current prefix "i "
 *   Only "i love you" matches
 *   Return ["i love you"]
 * User types '#':
 *   Save "i " as new sentence with frequency 1
 * ```
 *
 * EDGE CASES:
 * - Less than 3 matching sentences
 * - Multiple sentences with same frequency (sort lexicographically)
 * - New sentences not in initial data
 * - Empty initial sentences
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.sentences = new Map(); // sentence -> frequency
    }
}

class AutocompleteSystem {
    /**
     * @param {string[]} sentences
     * @param {number[]} times
     */
    constructor(sentences, times) {
        this.root = new TrieNode();
        this.currentPrefix = '';

        // Build initial Trie
        for (let i = 0; i < sentences.length; i++) {
            this.addSentence(sentences[i], times[i]);
        }
    }

    /**
     * Add sentence to Trie with frequency
     */
    addSentence(sentence, frequency) {
        let node = this.root;

        // For each prefix of the sentence, store the complete sentence
        for (let i = 0; i < sentence.length; i++) {
            const char = sentence[i];

            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);

            // Add/update sentence frequency at this prefix
            const currentFreq = node.sentences.get(sentence) || 0;
            node.sentences.set(sentence, currentFreq + frequency);
        }
    }

    /**
     * Get top 3 sentences for current prefix
     */
    getTop3(node) {
        if (!node) return [];

        // Get all sentences with their frequencies
        const sentenceList = Array.from(node.sentences.entries());

        // Sort by frequency (desc), then lexicographically (asc)
        sentenceList.sort((a, b) => {
            if (a[1] !== b[1]) {
                return b[1] - a[1]; // Higher frequency first
            }
            return a[0].localeCompare(b[0]); // Lexicographic order
        });

        // Return top 3 sentences (without frequencies)
        return sentenceList.slice(0, 3).map(item => item[0]);
    }

    /**
     * Process input character
     * @param {character} c
     * @return {string[]}
     */
    input(c) {
        if (c === '#') {
            // Save current sentence
            if (this.currentPrefix) {
                this.addSentence(this.currentPrefix, 1);
            }
            this.currentPrefix = '';
            return [];
        }

        // Add character to current prefix
        this.currentPrefix += c;

        // Navigate to current prefix in Trie
        let node = this.root;
        for (const char of this.currentPrefix) {
            if (!node.children.has(char)) {
                return []; // No matching sentences
            }
            node = node.children.get(char);
        }

        // Return top 3 sentences
        return this.getTop3(node);
    }
}

/**
 * Alternative implementation with sentence collection at end nodes only
 */
class AutocompleteSystemAlt {
    constructor(sentences, times) {
        this.root = new TrieNode();
        this.currentPrefix = '';
        this.sentenceFreq = new Map();

        for (let i = 0; i < sentences.length; i++) {
            this.sentenceFreq.set(sentences[i], times[i]);
            this.insertSentence(sentences[i]);
        }
    }

    insertSentence(sentence) {
        let node = this.root;
        for (const char of sentence) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.sentence = sentence;
    }

    collectSentences(node, sentences) {
        if (node.sentence) {
            sentences.push(node.sentence);
        }
        for (const child of node.children.values()) {
            this.collectSentences(child, sentences);
        }
    }

    input(c) {
        if (c === '#') {
            if (this.currentPrefix) {
                const freq = this.sentenceFreq.get(this.currentPrefix) || 0;
                this.sentenceFreq.set(this.currentPrefix, freq + 1);
                this.insertSentence(this.currentPrefix);
            }
            this.currentPrefix = '';
            return [];
        }

        this.currentPrefix += c;

        let node = this.root;
        for (const char of this.currentPrefix) {
            if (!node.children.has(char)) {
                return [];
            }
            node = node.children.get(char);
        }

        const sentences = [];
        this.collectSentences(node, sentences);

        // Sort and return top 3
        sentences.sort((a, b) => {
            const freqA = this.sentenceFreq.get(a) || 0;
            const freqB = this.sentenceFreq.get(b) || 0;
            if (freqA !== freqB) {
                return freqB - freqA;
            }
            return a.localeCompare(b);
        });

        return sentences.slice(0, 3);
    }
}

/**
 * Test cases for Problem 642: Design Search Autocomplete System
 */
function testSolution() {
    console.log('Testing 642. Design Search Autocomplete System');

    const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    // Test case 1: Basic functionality
    const ac1 = new AutocompleteSystem(
        ["i love you", "island", "iroman", "i love leetcode"],
        [5, 3, 2, 2]
    );

    let result = ac1.input('i');
    console.assert(arraysEqual(result, ["i love you", "island", "i love leetcode"]),
        `Test 1a failed: expected ["i love you","island","i love leetcode"], got ${JSON.stringify(result)}`);

    result = ac1.input(' ');
    console.assert(arraysEqual(result, ["i love you", "i love leetcode"]),
        `Test 1b failed: expected ["i love you","i love leetcode"], got ${JSON.stringify(result)}`);

    result = ac1.input('a');
    console.assert(arraysEqual(result, []),
        `Test 1c failed: expected [], got ${JSON.stringify(result)}`);

    result = ac1.input('#');
    console.assert(arraysEqual(result, []),
        `Test 1d failed: expected [], got ${JSON.stringify(result)}`);

    // Test case 2: New sentence added
    const ac2 = new AutocompleteSystem(["i love you"], [5]);
    ac2.input('i');
    ac2.input(' ');
    ac2.input('a');
    ac2.input('#');

    result = ac2.input('i');
    result = ac2.input(' ');
    result = ac2.input('a');
    console.assert(arraysEqual(result, ["i a"]),
        `Test 2 failed: expected ["i a"], got ${JSON.stringify(result)}`);

    // Test case 3: Lexicographic ordering with same frequency
    const ac3 = new AutocompleteSystem(["abc", "abd", "abe"], [1, 1, 1]);
    result = ac3.input('a');
    result = ac3.input('b');
    console.assert(arraysEqual(result, ["abc", "abd", "abe"]),
        `Test 3 failed: expected ["abc","abd","abe"], got ${JSON.stringify(result)}`);

    // Test case 4: Less than 3 results
    const ac4 = new AutocompleteSystem(["hello"], [10]);
    result = ac4.input('h');
    console.assert(arraysEqual(result, ["hello"]),
        `Test 4 failed: expected ["hello"], got ${JSON.stringify(result)}`);

    console.log('All test cases passed for 642. Design Search Autocomplete System!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 642. Design Search Autocomplete System ===');
    console.log('Category: Trie / Design');
    console.log('Difficulty: Hard');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    AutocompleteSystem,
    AutocompleteSystemAlt,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Storing sentences at each prefix node trades space for time
 * - Alternative: Store only at leaf nodes and DFS collect (saves space)
 * - Consider using min-heap for top-k instead of full sort
 * - Real systems might cache results for common prefixes
 * - Could optimize by limiting stored sentences per node
 */
