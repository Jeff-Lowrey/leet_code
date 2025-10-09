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
 * Main solution for Problem 070: Climbing Stairs
 *
 * @param {number} n - Number of steps to reach the top
 * @return {number} - Number of distinct ways to climb to the top
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(n) {
    if (n <= 2) {
        return n;
    }

    let prev2 = 1;  // ways to reach step i-2
    let prev1 = 2;  // ways to reach step i-1

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Test cases for Problem 070: Climbing Stairs
 */
function testSolution() {
    console.log('Testing 070. Climbing Stairs');

    // Test case 1: n = 2
    const result1 = solve(2);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 3
    const result2 = solve(3);
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 5
    const result3 = solve(5);
    const expected3 = 8;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 070. Climbing Stairs!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 070. Climbing Stairs ===');
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
