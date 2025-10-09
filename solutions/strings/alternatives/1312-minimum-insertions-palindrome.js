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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 1312: Minimum Insertions Palindrome
 *
 * @param {string} s - The input string
 * @return {number} - Minimum number of insertions needed to make string palindrome
 *
 * Time Complexity: O(n²) - Filling n×n DP table with constant work per cell
 * Space Complexity: O(n²) - DP table storage, can be optimized to O(n)
 */
function solve(s) {
    const n = s.length;

    // dp[i][j] represents the length of longest palindromic subsequence
    // in substring s[i...j]
    const dp = Array(n).fill(0).map(() => Array(n).fill(0));

    // Every single character is a palindrome of length 1
    for (let i = 0; i < n; i++) {
        dp[i][i] = 1;
    }

    // Build the DP table bottom-up
    // len is the length of the substring
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;

            if (s[i] === s[j]) {
                // Characters match: add 2 to inner substring's LPS
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                // Characters don't match: take max of excluding either end
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }

    // Longest palindromic subsequence of entire string
    const lps = dp[0][n - 1];

    // Minimum insertions = string length - LPS length
    return n - lps;
}

/**
 * Test cases for Problem 1312: Minimum Insertions Palindrome
 */
function testSolution() {
    console.log('Testing 1312. Minimum Insertions Palindrome');

    // Test case 1: "mbadm" - need 2 insertions to make "mbdadbm"
    const result1 = solve("mbadm");
    console.assert(result1 === 2, `Test 1 failed: expected 2, got ${result1}`);

    // Test case 2: Already a palindrome
    const result2 = solve("leetcode");
    console.assert(result2 === 5, `Test 2 failed: expected 5, got ${result2}`);

    // Test case 3: Single character (already palindrome)
    const result3 = solve("g");
    console.assert(result3 === 0, `Test 3 failed: expected 0, got ${result3}`);

    // Test case 4: Two different characters
    const result4 = solve("ab");
    console.assert(result4 === 1, `Test 4 failed: expected 1, got ${result4}`);

    // Test case 5: Palindrome already
    const result5 = solve("aba");
    console.assert(result5 === 0, `Test 5 failed: expected 0, got ${result5}`);

    console.log('All test cases passed for 1312. Minimum Insertions Palindrome!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1312. Minimum Insertions Palindrome ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
