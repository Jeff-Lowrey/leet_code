/**
 * 33. Search In Rotated Sorted Array
 * Medium
 *
 * Search in Rotated Sorted Array Time Complexity: O(log n) Space Complexity: O(1) @param {number[]} nums - The rotated sorted array @param {number} target - The target value to find @return {number} - Index of target if found, -1 otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Search In Rotated Sorted Array is to understand the core problem pattern
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
 * Search in Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * 
 * @param {number[]} nums - The rotated sorted array
 * @param {number} target - The target value to find
 * @return {number} - Index of target if found, -1 otherwise
 */
function search(nums, target) {
    // Handle edge cases
    if (!nums || nums.length === 0) return -1;
    if (nums.length === 1) return nums[0] === target ? 0 : -1;

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // If we found the target, return its index
        if (nums[mid] === target) {
            return mid;
        }

        // Check if the left half is sorted
        if (nums[left] <= nums[mid]) {
            // Check if target is in the left half
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            // Check if target is in the right half
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            nums: [4, 5, 6, 7, 0, 1, 2],
            target: 0,
            expected: 4
        },
        {
            nums: [4, 5, 6, 7, 0, 1, 2],
            target: 3,
            expected: -1
        },
        {
            nums: [1],
            target: 0,
            expected: -1
        },
        {
            nums: [],
            target: 5,
            expected: -1
        },
        {
            nums: [3, 1],
            target: 1,
            expected: 1
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const { nums, target, expected } = testCases[i];
        const result = search(nums, target);
        console.log(`Test case ${i + 1}:`);
        console.log(`Input array: [${nums}]`);
        console.log(`Target: ${target}`);
        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Export the function for use in other modules
module.exports = search;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}