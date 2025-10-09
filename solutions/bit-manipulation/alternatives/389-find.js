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
 * Main solution for Problem 389: Find the Difference
 *
 * @param {string} s - Original string
 * @param {string} t - Shuffled string with one extra character
 * @return {string} - The added character
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s, t) {
    // XOR all characters from both strings
    // Characters appearing in both will cancel out
    // Only the extra character remains
    let result = 0;

    // XOR all characters in s
    for (const char of s) {
        result ^= char.charCodeAt(0);
    }

    // XOR all characters in t
    for (const char of t) {
        result ^= char.charCodeAt(0);
    }

    // Convert back to character
    return String.fromCharCode(result);
}

/**
 * Test cases for Problem 389: Find
 */
function testSolution() {
    console.log('Testing 389. Find');

    // Test case 1: Basic case
    const result1 = solve("abcd", "abcde");
    const expected1 = "e";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Empty original string
    const result2 = solve("", "y");
    const expected2 = "y";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Different position
    const result3 = solve("a", "aa");
    const expected3 = "a";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Multiple same characters
    const result4 = solve("aabbcc", "aabbccd");
    const expected4 = "d";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Long string
    const result5 = solve("abcdefghijklm", "abcdefghijklmn");
    const expected5 = "n";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 389. Find!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 389. Find ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
