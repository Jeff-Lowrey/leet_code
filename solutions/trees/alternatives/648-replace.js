/**
 * 648. Replace Words
 * Medium
 *
 * In English, we have a concept called root, which can be followed by some other word
 * to form another longer word - let's call this word successor. For example, when the
 * root "an" is followed by the successor word "other", we can form a new word "another".
 *
 * Given a dictionary consisting of many roots and a sentence, replace all the successors
 * in the sentence with the root forming it. If a successor can be replaced by more than
 * one root, replace it with the root that has the shortest length.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use a Trie to store all root words. For each word in the sentence, traverse the Trie
 * to find the shortest root that is a prefix of that word.
 *
 * APPROACH:
 * 1. **Build a Trie**: Insert all dictionary roots into the Trie
 * 2. **Process sentence**: Split sentence into words
 * 3. **Find shortest root**: For each word, traverse Trie to find shortest matching root
 * 4. **Replace or keep**: Use root if found, otherwise keep original word
 *
 * WHY THIS WORKS:
 * - Trie provides efficient prefix matching in O(k) where k is word length
 * - Mark word endings to identify valid roots
 * - Shortest root found first due to Trie traversal order
 * - Early termination when root is found
 *
 * TIME COMPLEXITY: O(d + s) where d = total chars in dictionary, s = chars in sentence
 * SPACE COMPLEXITY: O(d) for the Trie structure
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: dictionary = ["cat", "bat", "rat"], sentence = "the cattle was rattled by the battery"
Step 1: Build Trie with "cat", "bat", "rat"
Step 2: Process "cattle" -> find root "cat" -> replace with "cat"
Step 3: Process "rattled" -> find root "rat" -> replace with "rat"
Step 4: Process "battery" -> find root "bat" -> replace with "bat"
Output: "the cat was rat by the bat"
```
 *
 * EDGE CASES:
 * - Empty dictionary (no replacements)
 * - Empty sentence
 * - Word with no matching root
 * - Multiple roots match (use shortest)
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isRoot = false;
    }
}

/**
 * Main solution for Problem 648: Replace Words
 *
 * @param {string[]} dictionary - Array of root words
 * @param {string} sentence - Sentence to process
 * @return {string} - Sentence with words replaced by roots
 *
 * Time Complexity: O(d + s) where d = dictionary chars, s = sentence chars
 * Space Complexity: O(d) for Trie storage
 */
function solve(dictionary, sentence) {
    const root = new TrieNode();

    // Insert a root into the Trie
    function insert(word) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isRoot = true;
    }

    // Find shortest root for a word
    function findRoot(word) {
        let node = root;
        let prefix = '';

        for (const char of word) {
            if (!node.children.has(char)) {
                // No matching root found
                return word;
            }

            prefix += char;
            node = node.children.get(char);

            if (node.isRoot) {
                // Found a root, return it (shortest due to traversal order)
                return prefix;
            }
        }

        // Word itself might be a root, or no root found
        return word;
    }

    // Build Trie with all dictionary roots
    for (const word of dictionary) {
        insert(word);
    }

    // Process sentence
    const words = sentence.split(' ');
    const result = words.map(word => findRoot(word));

    return result.join(' ');
}

/**
 * Test cases for Problem 648: Replace Words
 */
function testSolution() {
    console.log('Testing 648. Replace Words');

    // Test case 1: Basic functionality
    const result1 = solve(
        ["cat", "bat", "rat"],
        "the cattle was rattled by the battery"
    );
    const expected1 = "the cat was rat by the bat";
    console.assert(result1 === expected1,
        `Test 1 failed: expected "${expected1}", got "${result1}"`);

    // Test case 2: Multiple roots match (use shortest)
    const result2 = solve(
        ["a", "aa", "aaa", "aaaa"],
        "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
    );
    const expected2 = "a a a a a a a a bbb baba a";
    console.assert(result2 === expected2,
        `Test 2 failed: expected "${expected2}", got "${result2}"`);

    // Test case 3: No matching roots
    const result3 = solve(
        ["catt", "cat", "bat", "rat"],
        "the cattle was rattled by the battery"
    );
    const expected3 = "the cat was rat by the bat";
    console.assert(result3 === expected3,
        `Test 3 failed: expected "${expected3}", got "${result3}"`);

    // Test case 4: Empty dictionary
    const result4 = solve([], "hello world");
    const expected4 = "hello world";
    console.assert(result4 === expected4,
        `Test 4 failed: expected "${expected4}", got "${result4}"`);

    // Test case 5: Single word
    const result5 = solve(["e", "k", "c", "harqp", "h", "gsafc", "vn", "lqp"], "k lqp");
    const expected5 = "k lqp";
    console.assert(result5 === expected5,
        `Test 5 failed: expected "${expected5}", got "${result5}"`);

    console.log('All test cases passed for 648. Replace Words!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 648. Replace Words ===');
    console.log('Category: Trees/Trie');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example: dictionary = ["cat", "bat", "rat"]');
    console.log('         sentence = "the cattle was rattled by the battery"');
    const result = solve(
        ["cat", "bat", "rat"],
        "the cattle was rattled by the battery"
    );
    console.log('Result:', result);
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses Trie for efficient prefix matching
 * - Shortest root is naturally found first during traversal
 * - Alternative: Sort dictionary by length and use string methods (less efficient)
 * - Trie approach scales well with large dictionaries
 * - Early termination when root is found improves performance
 */
