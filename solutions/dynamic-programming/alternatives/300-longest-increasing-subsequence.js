/**
 * 300. Longest Increasing Subsequence
 * Medium
 *
 * @file DP-300-JS_longest_increasing___javascript_implementation.js @description Implementation of the Longest Increasing Subsequence (LIS) problem using both dynamic programming and binary search approaches.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest Increasing Subsequence is to understand the core problem pattern
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
 * @file DP-300-JS_longest_increasing___javascript_implementation.js
 * @description Implementation of the Longest Increasing Subsequence (LIS) problem
 * using both dynamic programming and binary search approaches.
 */

/**
 * Finds the length of the longest increasing subsequence using dynamic programming
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums - Array of numbers
 * @return {number} Length of the longest increasing subsequence
 */
function lengthOfLIS_DP(nums) {
    if (!nums || nums.length === 0) return 0;
    
    const n = nums.length;
    // dp[i] represents the length of LIS ending at index i
    const dp = new Array(n).fill(1);
    let maxLength = 1;

    // For each position, look back at previous elements
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }

    return maxLength;
}

/**
 * Finds the length of the longest increasing subsequence using binary search
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums - Array of numbers
 * @return {number} Length of the longest increasing subsequence
 */
function lengthOfLIS_BinarySearch(nums) {
    if (!nums || nums.length === 0) return 0;

    const tails = [];
    tails.push(nums[0]);

    for (let i = 1; i < nums.length; i++) {
        // If current number is greater than all tails, append it
        if (nums[i] > tails[tails.length - 1]) {
            tails.push(nums[i]);
        } else {
            // Binary search to find the smallest tail that is >= nums[i]
            let left = 0;
            let right = tails.length - 1;

            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (tails[mid] >= nums[i]) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            tails[left] = nums[i];
        }
    }

    return tails.length;
}

/**
 * Returns the actual longest increasing subsequence
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums - Array of numbers
 * @return {number[]} The longest increasing subsequence
 */
function getLIS(nums) {
    if (!nums || nums.length === 0) return [];
    
    const n = nums.length;
    const dp = new Array(n).fill(1);
    const prev = new Array(n).fill(-1);
    let maxLength = 1;
    let maxIndex = 0;

    // Build dp array and track previous indices
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }

    // Reconstruct the sequence
    const result = [];
    while (maxIndex !== -1) {
        result.unshift(nums[maxIndex]);
        maxIndex = prev[maxIndex];
    }

    return result;
}

// Example usage and tests
function runTests() {
    const testCases = [
        [10, 9, 2, 5, 3, 7, 101, 18],
        [0, 1, 0, 3, 2, 3],
        [7, 7, 7, 7, 7],
        [],
        [1]
    ];

    for (const test of testCases) {
        console.log('\nTest case:', test);
        console.log('DP Solution length:', lengthOfLIS_DP(test));
        console.log('Binary Search Solution length:', lengthOfLIS_BinarySearch(test));
        console.log('Actual subsequence:', getLIS(test));
    }
}

// Run tests if this file is being executed directly
if (require.main === module) {
    runTests();
}

// Export functions for external use
module.exports = {
    lengthOfLIS_DP,
    lengthOfLIS_BinarySearch,
    getLIS
};