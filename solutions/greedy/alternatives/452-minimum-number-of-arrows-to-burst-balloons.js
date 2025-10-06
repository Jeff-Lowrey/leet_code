/**
 * 452. Minimum Number Of Arrows To Burst Balloons
 * Medium
 *
 * Burst Balloons - Dynamic Programming Solution Problem: Given n balloons, each balloon i is associated with a number nums[i]. You are asked to burst all the balloons. If you burst balloon i you will get nums[left] nums[i] nums[right] coins. Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent. Find the maximum coins you can collect by bursting the balloons wisely. @param {number[]} nums - Array of numbers representing balloons @return {number} - Maximum coins that can be collected
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Minimum Number Of Arrows To Burst Balloons is to understand the core problem pattern
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
 * Burst Balloons - Dynamic Programming Solution
 * 
 * Problem: Given n balloons, each balloon i is associated with a number nums[i].
 * You are asked to burst all the balloons. If you burst balloon i you will get 
 * nums[left] * nums[i] * nums[right] coins. Here left and right are adjacent indices of i.
 * After the burst, the left and right then becomes adjacent.
 * Find the maximum coins you can collect by bursting the balloons wisely.
 * 
 * @param {number[]} nums - Array of numbers representing balloons
 * @return {number} - Maximum coins that can be collected
 */

const maxCoins = function(nums) {
    // Edge cases
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    // Add 1s to both ends of the array
    const balloons = [1, ...nums, 1];
    const n = balloons.length;
    
    // Create DP table
    // dp[i][j] represents the maximum coins that can be obtained 
    // by bursting balloons between index i and j (exclusive)
    const dp = Array(n).fill(0).map(() => Array(n).fill(0));
    
    // Length of subarray
    for (let len = 2; len < n; len++) {
        // Start index of subarray
        for (let left = 0; left < n - len; left++) {
            // End index of subarray
            const right = left + len;
            
            // Try each balloon as the last one to burst
            for (let i = left + 1; i < right; i++) {
                // Calculate coins for current configuration
                const coins = balloons[left] * balloons[i] * balloons[right] + 
                            dp[left][i] + dp[i][right];
                            
                // Update maximum coins if current is larger
                dp[left][right] = Math.max(dp[left][right], coins);
            }
        }
    }
    
    // Return maximum coins possible
    return dp[0][n-1];
};

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [3,1,5,8],
            expected: 167,
            description: "Test Case 1: Regular array"
        },
        {
            input: [1,5],
            expected: 5,
            description: "Test Case 2: Two balloons"
        },
        {
            input: [7],
            expected: 7,
            description: "Test Case 3: Single balloon"
        },
        {
            input: [],
            expected: 0,
            description: "Test Case 4: Empty array"
        }
    ];

    testCases.forEach((test, index) => {
        const result = maxCoins(test.input);
        console.log(`${test.description}:`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = maxCoins;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}