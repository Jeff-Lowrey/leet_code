/**
 * 75. Sort Colors
 * Medium
 *
 * Sort Colors (LeetCode #75) Problem: Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. @param {number[]} nums - Array of numbers (0, 1, 2) representing colors @return {void} Do not return anything, modify nums in-place instead.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Sort Colors is to understand the core problem pattern
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
 * Sort Colors (LeetCode #75)
 * 
 * Problem: Given an array nums with n objects colored red, white, or blue, 
 * sort them in-place so that objects of the same color are adjacent, with the 
 * colors in the order red, white, and blue.
 * 
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * 
 * @param {number[]} nums - Array of numbers (0, 1, 2) representing colors
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const sortColors = function(nums) {
    // Edge case: if array is empty or has only one element
    if (!nums || nums.length <= 1) {
        return;
    }

    // Initialize pointers
    let left = 0;          // pointer for 0s (red)
    let current = 0;       // current position
    let right = nums.length - 1;  // pointer for 2s (blue)

    /**
     * Use Dutch National Flag algorithm:
     * - All elements to the left of 'left' are 0s
     * - All elements to the right of 'right' are 2s
     * - Elements between 'left' and 'current' are 1s
     */
    while (current <= right) {
        if (nums[current] === 0) {
            // Swap current element with left pointer
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 2) {
            // Swap current element with right pointer
            [nums[right], nums[current]] = [nums[current], nums[right]];
            right--;
        } else {
            // Element is 1, just move forward
            current++;
        }
    }
};

// Test cases
const testCases = [
    [2, 0, 2, 1, 1, 0],
    [2, 0, 1],
    [0],
    [1],
    [],
    [1, 2, 0, 1, 2, 1, 0]
];

// Run test cases
testCases.forEach((test, index) => {
    const nums = [...test];
    console.log(`Test Case ${index + 1}:`);
    console.log('Before:', nums);
    sortColors(nums);
    console.log('After:', nums);
    console.log('---');
});

// Export the function for potential module usage
module.exports = sortColors;