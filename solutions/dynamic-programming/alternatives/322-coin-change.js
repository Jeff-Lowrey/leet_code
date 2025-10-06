/**
 * 322. Coin Change
 * Medium
 *
 * Coin Change - Dynamic Programming Solution LeetCode 322: https://leetcode.com/problems/coin-change/ Problem: Given an array of coins and a target amount, return the fewest number of coins needed to make up that amount. Return -1 if the amount cannot be made up by any combination of the coins. @param {number[]} coins - Array of coin denominations @param {number} amount - Target amount to make @return {number} - Minimum number of coins needed, or -1 if impossible
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Coin Change is to understand the core problem pattern
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
 * Coin Change - Dynamic Programming Solution
 * LeetCode 322: https://leetcode.com/problems/coin-change/
 * 
 * Problem: Given an array of coins and a target amount, return the fewest number
 * of coins needed to make up that amount. Return -1 if the amount cannot be made
 * up by any combination of the coins.
 * 
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount to make
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 */

const coinChange = function(coins, amount) {
    // Edge cases
    if (amount === 0) return 0;
    if (!coins || coins.length === 0) return -1;
    
    // Create DP array initialized with amount + 1 (impossible value)
    // dp[i] represents the minimum coins needed to make amount i
    const dp = new Array(amount + 1).fill(amount + 1);
    
    // Base case: 0 amount needs 0 coins
    dp[0] = 0;
    
    // For each amount from 1 to target amount
    for (let currentAmount = 1; currentAmount <= amount; currentAmount++) {
        // Try each coin
        for (const coin of coins) {
            // If the coin value is less than or equal to current amount
            if (coin <= currentAmount) {
                // Take minimum of current solution and solution after using this coin
                dp[currentAmount] = Math.min(
                    dp[currentAmount],
                    dp[currentAmount - coin] + 1
                );
            }
        }
    }
    
    // If no solution found, dp[amount] will still be amount + 1
    return dp[amount] === amount + 1 ? -1 : dp[amount];
};

/**
 * Helper function to test the solution
 * @param {number[]} coins - Array of coin denominations
 * @param {number} amount - Target amount
 * @param {number} expected - Expected result
 */
function testCoinChange(coins, amount, expected) {
    const result = coinChange(coins, amount);
    console.log(`Input: coins = [${coins}], amount = ${amount}`);
    console.log(`Expected: ${expected}, Got: ${result}`);
    console.log(`Test ${result === expected ? 'PASSED' : 'FAILED'}\n`);
}

// Test cases
function runTests() {
    testCoinChange([1, 2, 5], 11, 3);           // Should return 3 (5 + 5 + 1)
    testCoinChange([2], 3, -1);                 // Should return -1 (impossible)
    testCoinChange([1], 0, 0);                  // Should return 0
    testCoinChange([1], 1, 1);                  // Should return 1
    testCoinChange([1, 2, 5, 10], 27, 4);       // Should return 4 (10 + 10 + 5 + 2)
}

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}

// Export for use in other files
module.exports = {
    coinChange
};