/**

 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is the classic Fibonacci problem in `disguise! To` reach step `n`, you can
either come from step (`n-1`) by taking 1 step, or from step (`n-2`) by taking 2 steps.
So: ways(n) = ways(`n-1`) + ways(`n-2`)
 *
 * APPROACH:

2. For any step n: ways(n) = ways(`n-1`) + ways(`n-2`)
3. Use `bottom-up` DP to avoid redundant calculations
 *
 * WHY THIS WORKS:
 * - Each step can only be reached from the previous step or two steps back
 * - This creates a recurrence relation: f(n) = f(n-1) + f(n-2)
 * - We build the solution iteratively to avoid repeated calculations
 * - Space optimized by only keeping track of last two values
 *
 * TIME COMPLEXITY: O(n) - single pass through all steps
 * SPACE COMPLEXITY: O(1) - only storing two previous values
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * n = 4
 * Step 1: prev2=1, prev1=2 (base cases)
 * Step 2: i=3, current=1+2=3, prev2=2, prev1=3
 * Step 3: i=4, current=2+3=5, prev2=3, prev1=5
 * Result: 5 ways to reach step 4
 * ```
 *
 * EDGE CASES:
 * - n=1: Only one way (1 step)
 * - n=2: Two ways (1+1 or 2)
 * - Large n: Handle efficiently with iterative approach
 * - n=0: Would be 1 way (stay put), but not in problem constraints
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
