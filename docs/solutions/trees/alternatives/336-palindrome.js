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
        this.wordIndex = -1;
        this.palindromeSuffixes = []; // indices of words where remaining is palindrome
    }
}

/**
 * Main solution for Problem 336: Palindrome Pairs
 *
 * @param {string[]} words - Array of unique words
 * @return {number[][]} - Array of index pairs [i, j] where words[i] + words[j] is palindrome
 *
 * Time Complexity: O(n * k^2) where n = words.length, k = average word length
 * Space Complexity: O(n * k) for Trie storage
 */
function solve(words) {
    const root = new TrieNode();
    const result = [];

    // Helper to check if a string is palindrome
    function isPalindrome(word, start, end) {
        while (start < end) {
            if (word[start] !== word[end]) return false;
            start++;
            end--;
        }
        return true;
    }

    // Build Trie with reversed words
    function insert(word, index) {
        let node = root;
        const len = word.length;

        // Insert word in reverse
        for (let i = len - 1; i >= 0; i--) {
            const char = word[i];

            // If remaining prefix (word[0...i-1]) is palindrome, store this word's index
            if (isPalindrome(word, 0, i)) {
                node.palindromeSuffixes.push(index);
            }

            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }

        node.wordIndex = index;
        node.palindromeSuffixes.push(index); // Whole word is palindrome of itself
    }

    // Search for palindrome pairs
    function search(word, index) {
        let node = root;
        const pairs = [];
        const len = word.length;

        // Traverse Trie with current word
        for (let i = 0; i < len; i++) {
            // If we found a complete word and remaining part of current word is palindrome
            if (node.wordIndex !== -1 && node.wordIndex !== index &&
                isPalindrome(word, i, len - 1)) {
                pairs.push([index, node.wordIndex]);
            }

            const char = word[i];
            if (!node.children.has(char)) {
                return pairs;
            }
            node = node.children.get(char);
        }

        // We've used all characters of current word
        // Check all words in Trie where remaining forms palindrome
        for (const j of node.palindromeSuffixes) {
            if (j !== index) {
                pairs.push([index, j]);
            }
        }

        return pairs;
    }

    // Build Trie
    for (let i = 0; i < words.length; i++) {
        insert(words[i], i);
    }

    // Find all palindrome pairs
    for (let i = 0; i < words.length; i++) {
        result.push(...search(words[i], i));
    }

    return result;
}

/**
 * Test cases for Problem 336: Palindrome Pairs
 */
function testSolution() {
    console.log('Testing 336. Palindrome Pairs');

    // Helper to sort pairs for comparison
    function sortPairs(pairs) {
        return pairs.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    }

    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = sortPairs([...a]);
        const sortedB = sortPairs([...b]);
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Basic functionality
    const result1 = solve(["abcd", "dcba", "lls", "s", "sssll"]);
    const expected1 = [[0,1],[1,0],[3,2],[2,4]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Simple pairs
    const result2 = solve(["bat", "tab", "cat"]);
    const expected2 = [[0,1],[1,0]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Empty string
    const result3 = solve(["a", ""]);
    const expected3 = [[0,1],[1,0]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: No pairs
    const result4 = solve(["abc", "def"]);
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 336. Palindrome Pairs!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 336. Palindrome Pairs ===');
    console.log('Category: Trees/Trie');
    console.log('Difficulty: Hard');
    console.log('');

    console.log('Example: words = ["abcd", "dcba", "lls", "s", "sssll"]');
    const result = solve(["abcd", "dcba", "lls", "s", "sssll"]);
    console.log('Palindrome pairs:', result);
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
 * - This solution uses Trie (prefix tree) for efficient palindrome pair detection
 * - Storing words in reverse allows prefix matching to find potential pairs
 * - Palindrome suffix tracking optimizes the search process
 * - Alternative approach: HashMap with O(n * k^2) time, simpler but less elegant
 * - The Trie approach is particularly efficient for large datasets with many words
 */
