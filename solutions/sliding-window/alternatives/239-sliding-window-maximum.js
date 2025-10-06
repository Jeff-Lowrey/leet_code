/**
 * 239. Sliding Window Maximum
 * Medium
 *
 * Max Sliding Window - JavaScript Implementation LeetCode 239: https://leetcode.com/problems/sliding-window-maximum/ Problem: Given an array of integers nums and a sliding window of size k that moves from the left of the array to the right, return an array containing the maximum element in each window position.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Sliding Window Maximum is to understand the core problem pattern
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
 * Max Sliding Window - JavaScript Implementation
 * LeetCode 239: https://leetcode.com/problems/sliding-window-maximum/
 * 
 * Problem: Given an array of integers nums and a sliding window of size k that moves
 * from the left of the array to the right, return an array containing the maximum
 * element in each window position.
 */

/**
 * @param {number[]} nums - Input array of integers
 * @param {number} k - Size of the sliding window
 * @return {number[]} - Array containing maximum elements for each window
 */
function maxSlidingWindow(nums, k) {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) return [];
    if (k === 1) return nums;
    if (k >= nums.length) return [Math.max(...nums)];

    const result = [];
    const deque = []; // Store indices of potential maximum values

    // Process first k elements (first window)
    for (let i = 0; i < k; i++) {
        // Remove smaller elements from back
        while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
            deque.pop();
        }
        deque.push(i);
    }

    // Add maximum of first window to result
    result.push(nums[deque[0]]);

    // Process rest of the elements
    for (let i = k; i < nums.length; i++) {
        // Remove elements outside current window
        while (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove smaller elements from back
        while (deque.length > 0 && nums[i] >= nums[deque[deque.length - 1]]) {
            deque.pop();
        }

        // Add current element
        deque.push(i);

        // Add maximum of current window to result
        result.push(nums[deque[0]]);
    }

    return result;
}

/**
 * Helper function to test the implementation
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 */
function testMaxSlidingWindow(nums, k) {
    console.log(`Input array: [${nums}]`);
    console.log(`Window size: ${k}`);
    console.log(`Output: [${maxSlidingWindow(nums, k)}]`);
    console.log('---');
}

// Test cases
function runTests() {
    testMaxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
    testMaxSlidingWindow([1], 1);
    testMaxSlidingWindow([1, -1], 1);
    testMaxSlidingWindow([1, 2, 3, 4, 5], 5);
    testMaxSlidingWindow([], 0);
}

// Export the function for use in other modules
module.exports = {
    maxSlidingWindow,
    runTests
};

// Uncomment the following line to run tests
// runTests();