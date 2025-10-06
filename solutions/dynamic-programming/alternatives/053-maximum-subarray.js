/**
 * 53. Maximum Subarray
 * Medium
 *
 * Max Subarray - JavaScript Implementation Problem: Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. Time Complexity: O(n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Maximum Subarray is to understand the core problem pattern
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
 * Max Subarray - JavaScript Implementation
 * 
 * Problem: Given an integer array nums, find the contiguous subarray 
 * (containing at least one number) which has the largest sum and return its sum.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums - Array of integers
 * @return {number} - Maximum subarray sum
 */
function maxSubArray(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return 0;
    }
    
    if (nums.length === 1) {
        return nums[0];
    }

    // Initialize variables
    let maxSum = nums[0];        // Keeps track of the maximum sum found so far
    let currentSum = nums[0];    // Keeps track of the current running sum

    // Iterate through the array starting from the second element
    for (let i = 1; i < nums.length; i++) {
        // For each position, decide whether to:
        // 1. Start a new subarray from current position (nums[i])
        // 2. Extend the existing subarray (currentSum + nums[i])
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // Update maxSum if currentSum is greater
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

/**
 * Test cases
 */
const testCases = [
    [-2, 1, -3, 4, -1, 2, 1, -5, 4],  // Expected: 6
    [1],                               // Expected: 1
    [5, 4, -1, 7, 8],                 // Expected: 23
    [-1],                             // Expected: -1
    [-2, -1],                         // Expected: -1
];

/**
 * Run test cases
 */
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = maxSubArray(testCase);
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: [${testCase.join(', ')}]`);
        console.log(`Output: ${result}`);
        console.log('---');
    });
}

// Execute tests
runTests();

// Export the function for potential use in other modules
module.exports = maxSubArray;