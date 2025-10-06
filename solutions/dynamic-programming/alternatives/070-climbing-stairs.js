/**
 * 70. Climbing Stairs
 * Medium
 *
 * Climbing Stairs - Dynamic Programming Solution Problem: You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. Calculate how many distinct ways you can climb to the top. @param {number} n - The number of stairs to climb @return {number} - The number of distinct ways to climb the stairs
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Climbing Stairs is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Climbing Stairs - Dynamic Programming Solution
 * 
 * Problem: You are climbing a staircase. It takes n steps to reach the top.
 * Each time you can either climb 1 or 2 steps.
 * Calculate how many distinct ways you can climb to the top.
 * 
 * @param {number} n - The number of stairs to climb
 * @return {number} - The number of distinct ways to climb the stairs
 */

const climbStairs = function(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;

    // Initialize dynamic programming array
    // dp[i] represents the number of ways to climb i stairs
    let dp = new Array(n + 1);
    
    // Base cases
    dp[1] = 1; // One way to climb 1 stair
    dp[2] = 2; // Two ways to climb 2 stairs (1+1 or 2)
    
    // Fill the dp array using the recurrence relation
    // dp[i] = dp[i-1] + dp[i-2]
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    // Return the final result
    return dp[n];
};

/**
 * Alternative space-optimized solution using only two variables
 * @param {number} n - The number of stairs to climb
 * @return {number} - The number of distinct ways to climb the stairs
 */
const climbStairsOptimized = function(n) {
    // Handle edge cases
    if (n <= 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;
    
    // Initialize variables for the last two steps
    let oneStepBefore = 2;
    let twoStepsBefore = 1;
    let allWays = 0;
    
    // Calculate ways for remaining steps
    for (let i = 3; i <= n; i++) {
        allWays = oneStepBefore + twoStepsBefore;
        twoStepsBefore = oneStepBefore;
        oneStepBefore = allWays;
    }
    
    return allWays;
};

// Test cases
function runTests() {
    const testCases = [
        { input: 2, expected: 2 },
        { input: 3, expected: 3 },
        { input: 4, expected: 5 },
        { input: 5, expected: 8 },
        { input: 1, expected: 1 },
        { input: 0, expected: 0 }
    ];

    testCases.forEach((test, index) => {
        const result = climbStairs(test.input);
        const resultOptimized = climbStairsOptimized(test.input);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: n = ${test.input}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Regular Solution Output: ${result}`);
        console.log(`Optimized Solution Output: ${resultOptimized}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the functions for use in other modules
module.exports = {
    climbStairs,
    climbStairsOptimized
};

// Uncomment the following line to run tests
// runTests();