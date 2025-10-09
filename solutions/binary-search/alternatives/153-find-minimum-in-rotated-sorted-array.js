/**

 *
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
 * Given the sorted rotated array nums of unique values, return the minimum element of this array.
 * You must write an algorithm that runs in O(log n) time.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * In a rotated sorted array, the minimum element is at the rotation point.
 * We can use binary search to find this point by comparing the middle element with the rightmost element.
 * If mid > right, minimum is in right half; otherwise, it's in left half (including mid).
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - The array has a rotation point where the minimum element is located
 * - Comparing nums[mid] with nums[right] tells us which half contains the minimum
 * - If nums[mid] > nums[right], the array is rotated and minimum is in right half
 * - Otherwise, the minimum is in the left half (including mid)
 *
 * TIME COMPLEXITY: O(log n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [3,4,5,1,2]
 * Step 1: left=0, right=4, mid=2, nums[2]=5 > nums[4]=2, search right half
 * Step 2: left=3, right=4, mid=3, nums[3]=1 <= nums[4]=2, search left half
 * Step 3: left=3, right=3, loop ends, return nums[3]=1
 * Output: 1
 * ```
 *
 * EDGE CASES:
 * - Array not rotated: minimum is first element
 * - Single element: return that element
 * - Rotation at any position: algorithm handles all cases
 */

/**
 * Main solution for Problem 153: Find Minimum In Rotated Sorted Array
 *
 * @param {number[]} nums - Rotated sorted array with unique values
 * @return {number} - Minimum element in the array
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Handle edge case: single element
    if (nums.length === 1) {
        return nums[0];
    }

    let left = 0;
    let right = nums.length - 1;

    // If array is not rotated, first element is minimum
    if (nums[left] < nums[right]) {
        return nums[left];
    }

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // If mid element is greater than rightmost element,
        // minimum element is in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Minimum element is in the left half (including mid)
            right = mid;
        }
    }

    // When left == right, we found the minimum element
    return nums[left];
}

/**
 * Test cases for Problem 153: Find Minimum In Rotated Sorted Array
 */
function testSolution() {
    console.log('Testing 153. Find Minimum In Rotated Sorted Array');

    // Test case 1: Rotated array
    const result1 = solve([3,4,5,1,2]);
    const expected1 = 1;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Different rotation
    const result2 = solve([4,5,6,7,0,1,2]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([11]);
    const expected3 = 11;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two elements rotated
    const result4 = solve([2,1]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two elements not rotated
    const result5 = solve([1,2]);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Array not rotated
    const result6 = solve([1,2,3,4,5]);
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Minimum at end
    const result7 = solve([2,3,4,5,1]);
    const expected7 = 1;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 153. Find Minimum In Rotated Sorted Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 153. Find Minimum In Rotated Sorted Array ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example 1:');
    console.log('Input: nums = [3,4,5,1,2]');
    console.log('Output:', solve([3,4,5,1,2]));
    console.log('');

    console.log('Example 2:');
    console.log('Input: nums = [4,5,6,7,0,1,2]');
    console.log('Output:', solve([4,5,6,7,0,1,2]));
    console.log('');

    console.log('Example 3:');
    console.log('Input: nums = [11]');
    console.log('Output:', solve([11]));
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
 * - The key insight is comparing nums[mid] with nums[right] (not nums[left])
 * - Use left < right (not <=) as the loop condition
 * - When nums[mid] > nums[right], minimum is definitely in right half
 * - When nums[mid] <= nums[right], minimum could be mid or in left half
 * - This handles both rotated and non-rotated arrays correctly
 * - The algorithm terminates when left == right, pointing to the minimum
 */
