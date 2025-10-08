/**
 * 643. Maximum Average Subarray I
 * Easy
 *
 * This problem demonstrates key concepts in Sliding Window.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the contiguous subarray of length k with the maximum average.
 * Use a fixed-size sliding window to track the sum efficiently.
 *
 * APPROACH:
 * 1. **Analyze the problem**: Find max average of k consecutive elements
 * 2. **Choose the right technique**: Fixed-size sliding window with sum tracking
 * 3. **Implement efficiently**: Calculate first window sum, then slide and update
 * 4. **Handle edge cases**: k equals array length, single element, all negatives
 *
 * WHY THIS WORKS:
 * - Average of k elements = sum / k
 * - To maximize average, we need to maximize sum
 * - Fixed window of size k slides through array
 * - For each slide: subtract left element, add right element
 * - Track maximum sum found, convert to average at end
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(1) - only using a few variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Step 1: Window [1,12,-5,-6], sum=2, maxSum=2
 * Step 2: Window [12,-5,-6,50], sum=51, maxSum=51
 * Step 3: Window [-5,-6,50,3], sum=42, maxSum=51
 * Output: 51/4 = 12.75
 * ```
 *
 * EDGE CASES:
 * - k equals array length: return average of entire array
 * - All negative numbers: still find maximum average
 * - Single element (k=1): return that element
 * - All elements same: return that value
 */

/**
 * Main solution for Problem 643: Maximum Average Subarray I
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Length of subarray
 * @return {number} - Maximum average of any k-length subarray
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums, k) {
    if (!nums || nums.length === 0 || k <= 0) return 0;
    if (k > nums.length) k = nums.length;

    // Calculate sum of first window
    let windowSum = 0;
    for (let i = 0; i < k; i++) {
        windowSum += nums[i];
    }

    let maxSum = windowSum;

    // Slide the window
    for (let i = k; i < nums.length; i++) {
        // Remove leftmost element, add rightmost element
        windowSum = windowSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, windowSum);
    }

    return maxSum / k;
}

/**
 * Test cases for Problem 643: Maximum Average Subarray I
 */
function testSolution() {
    console.log('Testing 643. Maximum Average Subarray I');

    // Helper function to compare floats
    const floatsEqual = (a, b, epsilon = 0.00001) => Math.abs(a - b) < epsilon;

    // Test case 1: Basic example
    const result1 = solve([1, 12, -5, -6, 50, 3], 4);
    const expected1 = 12.75;
    console.assert(floatsEqual(result1, expected1), `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: nums=[1,12,-5,-6,50,3], k=4 -> ${result1}`);

    // Test case 2: k equals array length
    const result2 = solve([5], 1);
    const expected2 = 5;
    console.assert(floatsEqual(result2, expected2), `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: nums=[5], k=1 -> ${result2}`);

    // Test case 3: All same elements
    const result3 = solve([5, 5, 5, 5], 2);
    const expected3 = 5;
    console.assert(floatsEqual(result3, expected3), `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: nums=[5,5,5,5], k=2 -> ${result3}`);

    // Test case 4: Negative numbers
    const result4 = solve([-1, -2, -3, -4], 2);
    const expected4 = -1.5;
    console.assert(floatsEqual(result4, expected4), `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: nums=[-1,-2,-3,-4], k=2 -> ${result4}`);

    // Test case 5: Window size 1
    const result5 = solve([1, 2, 3, 4, 5], 1);
    const expected5 = 5;
    console.assert(floatsEqual(result5, expected5), `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: nums=[1,2,3,4,5], k=1 -> ${result5}`);

    // Test case 6: k equals array length
    const result6 = solve([1, 2, 3, 4], 4);
    const expected6 = 2.5;
    console.assert(floatsEqual(result6, expected6), `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: nums=[1,2,3,4], k=4 -> ${result6}`);

    // Test case 7: Maximum at the beginning
    const result7 = solve([10, 1, 1, 1], 2);
    const expected7 = 5.5;
    console.assert(floatsEqual(result7, expected7), `Test 7 failed: expected ${expected7}, got ${result7}`);
    console.log(`Test 7 passed: nums=[10,1,1,1], k=2 -> ${result7}`);

    // Test case 8: Maximum at the end
    const result8 = solve([1, 1, 1, 10], 2);
    const expected8 = 5.5;
    console.assert(floatsEqual(result8, expected8), `Test 8 failed: expected ${expected8}, got ${result8}`);
    console.log(`Test 8 passed: nums=[1,1,1,10], k=2 -> ${result8}`);

    console.log('All test cases passed for 643. Maximum Average Subarray I!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 643. Maximum Average Subarray I ===');
    console.log('Category: Sliding Window');
    console.log('Difficulty: Easy');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 * - Fixed-size sliding window is perfect for this type of problem
 */
