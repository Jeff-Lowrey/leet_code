/**

 *
 * Design a data structure that is initialized with a list of different words.
 * Provided a string, you should determine if you can change exactly one character
 * in this string to match any word in the data structure.
 *
 * Implement the MagicDictionary class:
 * - MagicDictionary() Initializes the object.
 * - void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings.
 * - bool search(String searchWord) Returns true if you can change exactly one character in
 *   searchWord to match any string in the data structure, otherwise returns false.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use a Trie to store dictionary words. For searching, traverse the Trie while allowing
 * exactly one character mismatch. Track whether we've used our "one change" allowance.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Trie provides efficient structure for prefix-based searching
 * - DFS explores all possible paths with one character change
 * - Tracking mismatch count ensures exactly one change is required
 * - Must end at a valid word boundary (isWord = true)
 *
 * TIME COMPLEXITY:
 * - buildDict: O(n * k) where n = words, k = average length
 * - search: O(26 * k) = O(k) where k = search word length
 * SPACE COMPLEXITY: O(n * k) for the Trie structure
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: buildDict(["hello", "leetcode"])
       search("hello") -> false (no change needed)
       search("hhllo") -> true (h->e makes "hello")
       search("hell") -> false (different length)
       search("leetcoded") -> false (different length)
Step 1: Build Trie with "hello" and "leetcode"
Step 2: Search "hhllo" -> try all paths with one mismatch
Step 3: Path h-h(mismatch)-l-l-o matches "hello" with exactly one change
Output: true
```
 *
 * EDGE CASES:
 * - Empty dictionary
 * - Word that matches exactly (should return false)
 * - Word with different length (should return false)
 * - Word requiring more than one change
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

class MagicDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Build the dictionary with given words
     * @param {string[]} dictionary - Array of words
     */
    buildDict(dictionary) {
        this.root = new TrieNode(); // Reset

        for (const word of dictionary) {
            let node = this.root;
            for (const char of word) {
                if (!node.children.has(char)) {
                    node.children.set(char, new TrieNode());
                }
                node = node.children.get(char);
            }
            node.isWord = true;
        }
    }

    /**
     * Search for a word with exactly one character change
     * @param {string} searchWord - Word to search for
     * @return {boolean} - True if word can be formed with exactly one change
     */
    search(searchWord) {
        function dfs(node, index, usedChange) {
            // Reached end of search word
            if (index === searchWord.length) {
                // Must be a valid word AND must have used exactly one change
                return node.isWord && usedChange;
            }

            const char = searchWord[index];

            // Try all possible characters at this position
            for (const [trieChar, childNode] of node.children) {
                if (trieChar === char) {
                    // Character matches, continue without using change
                    if (dfs(childNode, index + 1, usedChange)) {
                        return true;
                    }
                } else {
                    // Character differs
                    if (!usedChange) {
                        // Use our one change allowance
                        if (dfs(childNode, index + 1, true)) {
                            return true;
                        }
                    }
                    // If already used change, can't take this path
                }
            }

            return false;
        }

        return dfs(this.root, 0, false);
    }
}

/**
 * Factory function for creating MagicDictionary instances
 * This is the main solve function for testing
 *
 * @return {MagicDictionary} - New MagicDictionary instance
 */
function solve() {
    return new MagicDictionary();
}

/**
 * Test cases for Problem 676: Implement Magic Dictionary
 */
function testSolution() {
    console.log('Testing 676. Implement Magic Dictionary');

    // Test case 1: Basic functionality
    const dict1 = new MagicDictionary();
    dict1.buildDict(["hello", "leetcode"]);

    const result1a = dict1.search("hello");
    console.assert(result1a === false,
        `Test 1a failed: expected false (exact match), got ${result1a}`);

    const result1b = dict1.search("hhllo");
    console.assert(result1b === true,
        `Test 1b failed: expected true (one char diff), got ${result1b}`);

    const result1c = dict1.search("hell");
    console.assert(result1c === false,
        `Test 1c failed: expected false (different length), got ${result1c}`);

    const result1d = dict1.search("leetcoded");
    console.assert(result1d === false,
        `Test 1d failed: expected false (different length), got ${result1d}`);

    // Test case 2: One character difference
    const dict2 = new MagicDictionary();
    dict2.buildDict(["hello", "hallo", "leetcode"]);

    const result2a = dict2.search("hello");
    console.assert(result2a === true,
        `Test 2a failed: expected true ("hello" -> "hallo"), got ${result2a}`);

    const result2b = dict2.search("hhllo");
    console.assert(result2b === true,
        `Test 2b failed: expected true (one char diff), got ${result2b}`);

    const result2c = dict2.search("hell");
    console.assert(result2c === false,
        `Test 2c failed: expected false (different length), got ${result2c}`);

    // Test case 3: Single character words
    const dict3 = new MagicDictionary();
    dict3.buildDict(["a", "b"]);

    const result3a = dict3.search("a");
    console.assert(result3a === true,
        `Test 3a failed: expected true ("a" -> "b"), got ${result3a}`);

    const result3b = dict3.search("c");
    console.assert(result3b === true,
        `Test 3b failed: expected true ("c" can become "a" or "b"), got ${result3b}`);

    const result3c = dict3.search("ab");
    console.assert(result3c === false,
        `Test 3c failed: expected false (different length), got ${result3c}`);

    // Test case 4: Multiple words same length
    const dict4 = new MagicDictionary();
    dict4.buildDict(["abc", "abd", "xyz"]);

    const result4a = dict4.search("abc");
    console.assert(result4a === true,
        `Test 4a failed: expected true ("abc" -> "abd"), got ${result4a}`);

    const result4b = dict4.search("aaa");
    console.assert(result4b === false,
        `Test 4b failed: expected false (two chars diff), got ${result4b}`);

    console.log('All test cases passed for 676. Implement Magic Dictionary!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 676. Implement Magic Dictionary ===');
    console.log('Category: Trees/Trie');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example:');
    const magicDict = new MagicDictionary();
    magicDict.buildDict(["hello", "leetcode"]);

    console.log('Dictionary: ["hello", "leetcode"]');
    console.log('search("hello"):', magicDict.search("hello"), '(exact match, no change)');
    console.log('search("hhllo"):', magicDict.search("hhllo"), '(one char different)');
    console.log('search("hell"):', magicDict.search("hell"), '(different length)');
    console.log('search("leetcoded"):', magicDict.search("leetcoded"), '(different length)');
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
    MagicDictionary,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses Trie with DFS for flexible one-character matching
 * - DFS explores all paths while tracking whether we've used our one change
 * - Must use exactly one change (not zero, not two or more)
 * - Alternative: Store words by length in HashMap, compare each (less efficient)
 * - Trie approach scales well with large dictionaries and frequent searches
 */
