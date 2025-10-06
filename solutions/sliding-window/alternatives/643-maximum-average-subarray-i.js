/**
 * 643. Maximum Average Subarray I
 * Medium
 *
 * Max Average Subarray Implementation This solution finds the maximum average value of a subarray of fixed length k within a given array of numbers using the sliding window technique. Time Complexity: O(n) where n is the length of the input array Space Complexity: O(1) as we only use a few variables
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Maximum Average Subarray I is to understand the core problem pattern
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
 * Max Average Subarray Implementation
 * 
 * This solution finds the maximum average value of a subarray of fixed length k
 * within a given array of numbers using the sliding window technique.
 * 
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(1) as we only use a few variables
 */

/**
 * @param {number[]} nums - Array of numbers
 * @param {number} k - Length of the subarray
 * @return {number} - Maximum average value of any contiguous subarray of length k
 */
function findMaxAverage(nums, k) {
    // Input validation
    if (!nums || nums.length < k || k <= 0) {
        return 0;
    }

    // Initialize the sum of first k elements
    let currentSum = 0;
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }

    // Initialize maxSum with the sum of first window
    let maxSum = currentSum;

    // Slide the window and update maxSum
    for (let i = k; i < nums.length; i++) {
        // Add next element and remove first element of previous window
        currentSum = currentSum + nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, currentSum);
    }

    // Return the maximum average
    return maxSum / k;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        {
            nums: [1, 12, -5, -6, 50, 3],
            k: 4,
            expected: 12.75
        },
        {
            nums: [5],
            k: 1,
            expected: 5.0
        },
        {
            nums: [-1],
            k: 1,
            expected: -1.0
        },
        {
            nums: [4, 0, 4, 3, 3],
            k: 5,
            expected: 2.8
        }
    ];

    testCases.forEach((test, index) => {
        const result = findMaxAverage(test.nums, test.k);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: nums = [${test.nums}], k = ${test.k}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${Math.abs(result - test.expected) < 0.00001 ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    findMaxAverage
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}