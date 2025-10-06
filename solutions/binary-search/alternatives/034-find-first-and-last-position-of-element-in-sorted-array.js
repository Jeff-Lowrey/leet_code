/**
 * 34. Find First And Last Position Of Element In Sorted Array
 * Medium
 *
 * Find Range - JavaScript Implementation This solution finds the first and last position of a target number in a sorted array Time Complexity: O(log n) - uses binary search Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find First And Last Position Of Element In Sorted Array is to understand the core problem pattern
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
 * Find Range - JavaScript Implementation
 * This solution finds the first and last position of a target number in a sorted array
 * Time Complexity: O(log n) - uses binary search
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums - Sorted array of numbers
 * @param {number} target - Target number to find
 * @return {number[]} - Array containing first and last position of target
 */
function findRange(nums, target) {
    // Handle empty array case
    if (!nums || nums.length === 0) {
        return [-1, -1];
    }

    // Find leftmost position
    const leftIndex = findPosition(nums, target, true);
    
    // If target not found, return [-1, -1]
    if (leftIndex === -1) {
        return [-1, -1];
    }
    
    // Find rightmost position
    const rightIndex = findPosition(nums, target, false);
    
    return [leftIndex, rightIndex];
}

/**
 * Helper function to find leftmost or rightmost position of target
 * @param {number[]} nums - Sorted array of numbers
 * @param {number} target - Target number to find
 * @param {boolean} leftmost - If true, find leftmost position; if false, find rightmost
 * @return {number} - Index of target position
 */
function findPosition(nums, target, leftmost) {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            result = mid;
            if (leftmost) {
                // Continue searching left half for leftmost position
                right = mid - 1;
            } else {
                // Continue searching right half for rightmost position
                left = mid + 1;
            }
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Export the function for use in other modules
module.exports = findRange;

// Example usage and test cases
if (require.main === module) {
    // Test cases
    const testCases = [
        {
            nums: [5, 7, 7, 8, 8, 10],
            target: 8,
            expected: [3, 4]
        },
        {
            nums: [5, 7, 7, 8, 8, 10],
            target: 6,
            expected: [-1, -1]
        },
        {
            nums: [],
            target: 0,
            expected: [-1, -1]
        },
        {
            nums: [1],
            target: 1,
            expected: [0, 0]
        },
        {
            nums: [1, 1, 1, 1, 1],
            target: 1,
            expected: [0, 4]
        }
    ];

    // Run test cases
    testCases.forEach((test, index) => {
        const result = findRange(test.nums, test.target);
        console.log(`Test case ${index + 1}:`);
        console.log(`Input array: [${test.nums}]`);
        console.log(`Target: ${test.target}`);
        console.log(`Expected: [${test.expected}]`);
        console.log(`Result: [${result}]`);
        console.log(`Status: ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}