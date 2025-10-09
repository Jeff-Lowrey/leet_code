/**

 *
 * Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.
 * If target is not found in the array, return [-1, -1].
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * To find the first and last position, we need to perform two separate binary searches:
 * one to find the leftmost (first) occurrence and another to find the rightmost (last) occurrence.
 * This maintains O(log n) complexity as required.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Two binary searches maintain O(log n) time complexity
 * - We modify the search condition to continue searching even after finding the target
 * - For leftmost: when nums[mid] == target, continue searching left half
 * - For rightmost: when nums[mid] == target, continue searching right half
 *
 * TIME COMPLEXITY: O(log n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [5,7,7,8,8,10], target = 8
 * Step 1: Find leftmost 8 -> binary search finds index 3
 * Step 2: Find rightmost 8 -> binary search finds index 4
 * Output: [3, 4]
 * ```
 *
 * EDGE CASES:
 * - Empty array: return [-1, -1]
 * - Target not found: return [-1, -1]
 * - Single occurrence: return [index, index]
 * - Target at boundaries: handle first/last positions
 */

/**
 * Main solution for Problem 034: Find First And Last Position Of Element In Sorted Array
 *
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value to find range for
 * @return {number[]} - [start, end] indices or [-1, -1] if not found
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
    // Handle edge case: empty array
    if (!nums || nums.length === 0) {
        return [-1, -1];
    }

    /**
     * Helper function to find leftmost or rightmost occurrence of target
     * @param {boolean} findLeft - true for leftmost, false for rightmost
     * @return {number} - index of occurrence or -1 if not found
     */
    function binarySearch(findLeft) {
        let left = 0;
        let right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                result = mid;
                if (findLeft) {
                    // Continue searching in left half for first occurrence
                    right = mid - 1;
                } else {
                    // Continue searching in right half for last occurrence
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

    // Find the leftmost occurrence
    const leftmost = binarySearch(true);

    // If target not found, return [-1, -1]
    if (leftmost === -1) {
        return [-1, -1];
    }

    // Find the rightmost occurrence
    const rightmost = binarySearch(false);

    return [leftmost, rightmost];
}

/**
 * Test cases for Problem 034: Find First And Last Position Of Element In Sorted Array
 */
function testSolution() {
    console.log('Testing 034. Find First And Last Position Of Element In Sorted Array');

    // Helper function to compare arrays
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    // Test case 1: Multiple occurrences
    const result1 = solve([5,7,7,8,8,10], 8);
    const expected1 = [3, 4];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Target not found
    const result2 = solve([5,7,7,8,8,10], 6);
    const expected2 = [-1, -1];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Empty array
    const result3 = solve([], 0);
    const expected3 = [-1, -1];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Single element found
    const result4 = solve([1], 1);
    const expected4 = [0, 0];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single element not found
    const result5 = solve([1], 2);
    const expected5 = [-1, -1];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test case 6: All elements are the same
    const result6 = solve([2,2,2,2,2], 2);
    const expected6 = [0, 4];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);

    // Test case 7: Target at beginning
    const result7 = solve([1,1,2,3,4], 1);
    const expected7 = [0, 1];
    console.assert(arraysEqual(result7, expected7), `Test 7 failed: expected [${expected7}], got [${result7}]`);

    // Test case 8: Target at end
    const result8 = solve([1,2,3,4,4], 4);
    const expected8 = [3, 4];
    console.assert(arraysEqual(result8, expected8), `Test 8 failed: expected [${expected8}], got [${result8}]`);

    console.log('All test cases passed for 034. Find First And Last Position Of Element In Sorted Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 034. Find First And Last Position Of Element In Sorted Array ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example 1:');
    console.log('Input: nums = [5,7,7,8,8,10], target = 8');
    console.log('Output:', solve([5,7,7,8,8,10], 8));
    console.log('');

    console.log('Example 2:');
    console.log('Input: nums = [5,7,7,8,8,10], target = 6');
    console.log('Output:', solve([5,7,7,8,8,10], 6));
    console.log('');

    console.log('Example 3:');
    console.log('Input: nums = [], target = 0');
    console.log('Output:', solve([], 0));
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
 * - The key insight is to perform two separate binary searches for leftmost and rightmost positions
 * - When target is found, we don't stop - we continue searching in the appropriate direction
 * - For leftmost search: when nums[mid] == target, search left half (right = mid - 1)
 * - For rightmost search: when nums[mid] == target, search right half (left = mid + 1)
 * - This maintains O(log n) complexity as required by the problem
 * - The approach handles all edge cases including empty arrays and single elements
 */
