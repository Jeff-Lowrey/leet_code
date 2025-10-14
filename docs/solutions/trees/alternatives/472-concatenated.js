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
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Empty tree:** Handle root == null
 * - **Single node:** Tree with only root
 * - **Unbalanced tree:** Handle skewed trees
 * - **Leaf nodes:** Special handling for nodes without children
 * - **Height differences:** Check for deep vs shallow subtrees
 *
 * </details>
 */

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isWord = false;
    }
}

/**
 * Main solution for Problem 472: Concatenated Words
 *
 * @param {string[]} words - Array of unique words
 * @return {string[]} - Array of concatenated words
 *
 * Time Complexity: O(n * L^2) where n = words.length, L = average word length
 * Space Complexity: O(n * L) for Trie and memoization
 */
function solve(words) {
    if (words.length === 0) return [];

    const root = new TrieNode();
    const result = [];

    // Insert word into Trie
    function insert(word) {
        let node = root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isWord = true;
    }

    // Check if word can be formed by concatenating other words
    function canForm(word) {
        const n = word.length;
        const memo = new Map();

        function dfs(start, wordCount) {
            // Successfully split into at least 2 words
            if (start === n) {
                return wordCount >= 2;
            }

            const key = `${start}-${wordCount}`;
            if (memo.has(key)) {
                return memo.get(key);
            }

            let node = root;
            for (let i = start; i < n; i++) {
                const char = word[i];
                if (!node.children.has(char)) {
                    memo.set(key, false);
                    return false;
                }

                node = node.children.get(char);

                // Found a valid word, try to continue from next position
                if (node.isWord) {
                    if (dfs(i + 1, wordCount + 1)) {
                        memo.set(key, true);
                        return true;
                    }
                }
            }

            memo.set(key, false);
            return false;
        }

        return dfs(0, 0);
    }

    // Sort by length to build Trie incrementally
    words.sort((a, b) => a.length - b.length);

    for (const word of words) {
        if (word.length > 0 && canForm(word)) {
            result.push(word);
        }
        // Add word to Trie after checking (so it can be used for longer words)
        insert(word);
    }

    return result;
}

/**
 * Test cases for Problem 472: Concatenated Words
 */
function testSolution() {
    console.log('Testing 472. Concatenated Words');

    function arraysEqualUnordered(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Basic functionality
    const result1 = solve(["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"]);
    const expected1 = ["catsdogcats", "dogcatsdog", "ratcatdogcat"];
    console.assert(arraysEqualUnordered(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: No concatenated words
    const result2 = solve(["cat", "dog", "rat"]);
    const expected2 = [];
    console.assert(arraysEqualUnordered(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Multiple concatenations
    const result3 = solve(["cat", "dog", "catdog"]);
    const expected3 = ["catdog"];
    console.assert(arraysEqualUnordered(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Longer concatenations
    const result4 = solve(["a", "b", "ab", "abc"]);
    const expected4 = ["ab"];
    console.assert(arraysEqualUnordered(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 472. Concatenated Words!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 472. Concatenated Words ===');
    console.log('Category: Trees/Trie');
    console.log('Difficulty: Hard');
    console.log('');

    console.log('Example: ["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "rat", "ratcatdogcat"]');
    const result = solve(["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "rat", "ratcatdogcat"]);
    console.log('Concatenated words:', result);
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
 * - This solution combines Trie with DFS and memoization
 * - Sorting by length ensures we build the dictionary incrementally
 * - Memoization is critical for performance on long words
 * - Alternative: Use HashSet with DP (simpler but less efficient for prefix matching)
 * - Must track word count to ensure at least 2 words are used
 */
