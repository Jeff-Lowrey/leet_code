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
 * Main solution for Problem 172: Factorial Trailing Zeroes
 *
 * @param {number} n - Non-negative integer
 * @return {number} - Number of trailing zeros in n!
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(n) {
    let count = 0;

    // Keep dividing n by 5 and add to count
    while (n >= 5) {
        n = Math.floor(n / 5);
        count += n;
    }

    return count;
}

/**
 * Test cases for Problem 172: Factorial Trailing Zeroes
 */
function testSolution() {
    console.log('Testing 172. Factorial Trailing Zeroes');

    // Test case 1: n = 3 (3! = 6, no trailing zeros)
    const result1 = solve(3);
    const expected1 = 0;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 5 (5! = 120, one trailing zero)
    const result2 = solve(5);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 10 (10! has 2 trailing zeros)
    const result3 = solve(10);
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: n = 25 (25! has 6 trailing zeros)
    const result4 = solve(25);
    const expected4 = 6;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: n = 0
    const result5 = solve(0);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: n = 100
    const result6 = solve(100);
    const expected6 = 24;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: n = 1000
    const result7 = solve(1000);
    const expected7 = 249;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 172. Factorial Trailing Zeroes!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 172. Factorial Trailing Zeroes ===');
    console.log('Category: Math');
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
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
