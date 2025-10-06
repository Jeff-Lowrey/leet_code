/**
 * 416. Partition Equal Subset Sum
 * Medium
 *
 * Partition Equal Subset Sum LeetCode 416: https://leetcode.com/problems/partition-equal-subset-sum/ @param {number[]} nums - Array of positive integers @return {boolean} - Returns true if array can be partitioned into two equal sum subsets
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Partition Equal Subset Sum is to understand the core problem pattern
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
 * Partition Equal Subset Sum
 * LeetCode 416: https://leetcode.com/problems/partition-equal-subset-sum/
 * 
 * @param {number[]} nums - Array of positive integers
 * @return {boolean} - Returns true if array can be partitioned into two equal sum subsets
 */
function canPartition(nums) {
    // Calculate total sum of array
    const totalSum = nums.reduce((sum, num) => sum + num, 0);
    
    // If sum is odd, we cannot partition into equal subsets
    if (totalSum % 2 !== 0) return false;
    
    const targetSum = totalSum / 2;
    
    // Edge cases
    if (nums.length < 2) return false;
    if (nums.length === 2) return nums[0] === nums[1];
    
    // Create DP array to store possible sums
    // dp[i] represents if sum i can be achieved using array elements
    const dp = new Array(targetSum + 1).fill(false);
    dp[0] = true; // Empty subset has sum 0
    
    // Process each number in the array
    for (const num of nums) {
        // Check from targetSum down to num
        for (let sum = targetSum; sum >= num; sum--) {
            // If we can achieve sum-num, we can achieve sum by adding current number
            dp[sum] = dp[sum] || dp[sum - num];
        }
        
        // Early exit if we found our target sum
        if (dp[targetSum]) return true;
    }
    
    return dp[targetSum];
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [1, 5, 11, 5],
            expected: true,
            description: "Basic case with possible partition"
        },
        {
            input: [1, 2, 3, 5],
            expected: false,
            description: "Case where partition is not possible"
        },
        {
            input: [2, 2, 2, 2],
            expected: true,
            description: "Even numbers with equal values"
        },
        {
            input: [1],
            expected: false,
            description: "Single element array"
        },
        {
            input: [100, 100],
            expected: true,
            description: "Two equal elements"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = canPartition(testCase.input);
        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
    });
}

// Export the function for use in other modules
module.exports = {
    canPartition
};

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}