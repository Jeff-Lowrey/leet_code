/**
 * 213. House Robber Ii
 * Medium
 *
 * House Robber II - LeetCode 213 Problem: Given a list of non-negative integers representing the amount of money at each house, determine the maximum amount of money you can rob tonight. The houses are arranged in a circle, meaning the first and last houses are adjacent. You cannot rob adjacent houses. @param {number[]} nums - Array of non-negative integers representing money in each house @return {number} - Maximum amount that can be robbed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving House Robber Ii is to understand the core problem pattern
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
 * House Robber II - LeetCode 213
 * 
 * Problem: Given a list of non-negative integers representing the amount of money
 * at each house, determine the maximum amount of money you can rob tonight.
 * The houses are arranged in a circle, meaning the first and last houses are adjacent.
 * You cannot rob adjacent houses.
 * 
 * @param {number[]} nums - Array of non-negative integers representing money in each house
 * @return {number} - Maximum amount that can be robbed
 */

/**
 * Helper function to calculate maximum amount that can be robbed from a linear array
 * @param {number[]} nums - Array of house values
 * @param {number} start - Starting index
 * @param {number} end - Ending index
 * @return {number} - Maximum amount that can be robbed
 */
function robLinear(nums, start, end) {
    // Handle edge cases
    if (end - start <= 0) return 0;
    if (end - start === 1) return nums[start];

    // Initialize dp array
    let dp = new Array(end).fill(0);
    dp[start] = nums[start];
    dp[start + 1] = Math.max(nums[start], nums[start + 1]);

    // Fill dp array
    for (let i = start + 2; i < end; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }

    return dp[end - 1];
}

/**
 * Main function to solve House Robber II problem
 * @param {number[]} nums - Array of house values
 * @return {number} - Maximum amount that can be robbed
 */
function rob(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Since houses are in circle, we need to consider two cases:
    // 1. Rob houses from index 0 to n-2 (excluding last house)
    // 2. Rob houses from index 1 to n-1 (excluding first house)
    // Take maximum of these two cases
    const robExcludingLast = robLinear(nums, 0, nums.length - 1);
    const robExcludingFirst = robLinear(nums, 1, nums.length);

    return Math.max(robExcludingLast, robExcludingFirst);
}

// Export the function for testing or usage in other files
module.exports = rob;

// Test cases
const testCases = [
    [2, 3, 2],           // Expected output: 3
    [1, 2, 3, 1],        // Expected output: 4
    [1, 2, 3],          // Expected output: 3
    [],                  // Expected output: 0
    [1],                // Expected output: 1
    [1, 2]              // Expected output: 2
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test case ${index + 1}:`);
    console.log(`Input: [${test}]`);
    console.log(`Output: ${rob(test)}`);
    console.log('---');
});