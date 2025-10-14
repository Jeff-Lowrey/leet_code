/**
 * # Difficulty: Medium
 *
 * # 643. Maximum Average Subarray I
 *
 * You are given an integer array nums consisting of n elements, and an integer k.
 *
 * Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10^-5 will be accepted.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,12,-5,-6,50,3], k = 4</dd>
 * <dt>Output:</dt>
 * <dd>12.75 (maximum average)</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum average of subarray of length k=4 is 12.75</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply sliding window methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages sliding window principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,12,-5,-6,50,3], k = 4
 * Step 1: Calculate first window sum
 *   sum = 1+12+(-5)+(-6) = 2, avg = 0.5
 *
 * Step 2: Slide window
 *   sum = 2-1+50 = 51, avg = 12.75
 *   sum = 51-12+3 = 42, avg = 10.5
 *
 * Output: 12.75 (maximum average)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
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
