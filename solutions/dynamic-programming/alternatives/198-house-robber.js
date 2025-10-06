/**
 * 198. House Robber
 * Medium
 *
 * House Robber (LeetCode 198) Problem: Given an array of non-negative integers representing the amount of money in each house, determine the maximum amount of money you can rob without robbing adjacent houses. @param {number[]} nums - Array of non-negative integers representing money in each house @return {number} - Maximum amount that can be robbed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving House Robber is to understand the core problem pattern
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
 * House Robber (LeetCode 198)
 * 
 * Problem: Given an array of non-negative integers representing the amount of money 
 * in each house, determine the maximum amount of money you can rob without robbing 
 * adjacent houses.
 * 
 * @param {number[]} nums - Array of non-negative integers representing money in each house
 * @return {number} - Maximum amount that can be robbed
 */

const rob = function(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Initialize dynamic programming array
    // dp[i] represents the maximum amount that can be robbed up to house i
    let dp = new Array(nums.length);
    
    // Base cases
    dp[0] = nums[0];                          // First house
    dp[1] = Math.max(nums[0], nums[1]);       // Max of first two houses
    
    // Iterate through remaining houses
    for (let i = 2; i < nums.length; i++) {
        // At each house, we can either:
        // 1. Rob this house and add it to the max amount from two houses back
        // 2. Skip this house and keep the max amount from the previous house
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }
    
    // Return maximum amount possible
    return dp[nums.length - 1];
};

/**
 * Space-optimized version of the solution
 * Uses only two variables instead of an array
 */
const robOptimized = function(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);
    
    let twoBack = nums[0];              // Max money if we rob up to two houses back
    let oneBack = Math.max(nums[0], nums[1]);  // Max money if we rob up to previous house
    let current = oneBack;              // Current maximum
    
    for (let i = 2; i < nums.length; i++) {
        current = Math.max(oneBack, twoBack + nums[i]);
        twoBack = oneBack;
        oneBack = current;
    }
    
    return current;
};

// Test cases
const testCases = [
    [1, 2, 3, 1],           // Expected: 4
    [2, 7, 9, 3, 1],        // Expected: 12
    [1],                     // Expected: 1
    [],                      // Expected: 0
    [2, 1],                 // Expected: 2
];

// Run test cases
console.log("Testing regular solution:");
testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`, rob(test));
});

console.log("\nTesting optimized solution:");
testCases.forEach((test, index) => {
    console.log(`Test ${index + 1}:`, robOptimized(test));
});

// Export both solutions
module.exports = {
    rob,
    robOptimized
};