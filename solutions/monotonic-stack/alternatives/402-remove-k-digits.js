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
 * Main solution for Problem 402: Remove K Digits
 *
 * @param {string} num - Number as string
 * @param {number} k - Number of digits to remove
 * @return {string} - Smallest possible number
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(num, k) {
    if (k >= num.length) return "0";

    const stack = [];

    for (const digit of num) {
        // Remove larger digits while we can
        while (stack.length > 0 && stack[stack.length - 1] > digit && k > 0) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }

    // If k > 0, remove from end (largest remaining digits)
    while (k > 0) {
        stack.pop();
        k--;
    }

    // Build result and remove leading zeros
    let result = stack.join('');

    // Remove leading zeros
    let i = 0;
    while (i < result.length && result[i] === '0') {
        i++;
    }
    result = result.substring(i);

    // Handle empty result
    return result.length === 0 ? "0" : result;
}

/**
 * Test cases for Problem 402: Remove K Digits
 */
function testSolution() {
    console.log('Testing 402. Remove K Digits');

    // Test case 1: Example from problem
    const result1 = solve("1432219", 3);
    const expected1 = "1219";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve("10200", 1);
    const expected2 = "200";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Remove all digits
    const result3 = solve("10", 2);
    const expected3 = "0";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All same digits
    const result4 = solve("1111", 2);
    const expected4 = "11";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Increasing digits
    const result5 = solve("123456", 3);
    const expected5 = "123";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Leading zeros
    const result6 = solve("10001", 4);
    const expected6 = "0";
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 402. Remove K Digits!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 402. Remove K Digits ===');
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
