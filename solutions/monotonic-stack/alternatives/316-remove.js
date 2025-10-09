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
 * Main solution for Problem 316: Remove Duplicate Letters
 *
 * @param {string} s - Input string
 * @return {string} - Smallest lexicographical string with no duplicates
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is number of unique characters
 */
function solve(s) {
    if (!s || s.length === 0) return "";

    // Count frequency of each character
    const count = {};
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    const stack = [];
    const used = new Set();

    for (const char of s) {
        // Decrement count for current character
        count[char]--;

        // If already in result, skip
        if (used.has(char)) {
            continue;
        }

        // Remove characters that are larger and appear later
        while (stack.length > 0 &&
               stack[stack.length - 1] > char &&
               count[stack[stack.length - 1]] > 0) {
            const removed = stack.pop();
            used.delete(removed);
        }

        // Add current character
        stack.push(char);
        used.add(char);
    }

    return stack.join('');
}

/**
 * Test cases for Problem 316: Remove Duplicate Letters
 */
function testSolution() {
    console.log('Testing 316. Remove Duplicate Letters');

    // Test case 1: Example from problem
    const result1 = solve("bcabc");
    const expected1 = "abc";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve("cbacdcbc");
    const expected2 = "acdb";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single character repeated
    const result3 = solve("aaaa");
    const expected3 = "a";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: No duplicates
    const result4 = solve("abc");
    const expected4 = "abc";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Reverse order with duplicates
    const result5 = solve("edcba");
    const expected5 = "edcba";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Complex case
    const result6 = solve("abacb");
    const expected6 = "abc";
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 316. Remove Duplicate Letters!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 316. Remove ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
