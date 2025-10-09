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

/**
 * Main solution for Problem 139: Word Break
 *
 * @param {string} s - The input string
 * @param {string[]} wordDict - Dictionary of valid words
 * @return {boolean} - True if string can be segmented using dictionary words
 *
 * Time Complexity: O(n^2 * m) where n is string length, m is max word length
 * Space Complexity: O(n)
 */
function solve(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill(false);
    dp[0] = true;  // Empty string can always be segmented

    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            // If dp[j] is true and substring from j to i is in dictionary
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
}

/**
 * Test cases for Problem 139: Word Break
 */
function testSolution() {
    console.log('Testing 139. Word Break');

    // Test case 1: Can be segmented
    const result1 = solve('leetcode', ['leet', 'code']);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Can be segmented with reuse
    const result2 = solve('applepenapple', ['apple', 'pen']);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Cannot be segmented
    const result3 = solve('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 139. Word Break!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 139. Word Break ===');
    console.log('Category: Dynamic Programming');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
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
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
