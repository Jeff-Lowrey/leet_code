/**
 * # Difficulty: Medium
 *
 * # 153. Find Minimum In Rotated Sorted Array
 *
 * Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:
 *
 * - [4,5,6,7,0,1,2] if it was rotated 4 times.
 * - [0,1,2,4,5,6,7] if it was rotated 7 times.
 *
 * Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].
 *
 * Given the sorted rotated array nums of unique elements, return the minimum element of this array.
 *
 * You must write an algorithm that runs in O(log n) time.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[4,5,6,7,0,1,2]</dd>
 * <dt>Output:</dt>
 * <dd>0 (minimum element)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum element 1 is found in rotated array [3,4,5,1,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply binary search methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages binary search principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [4,5,6,7,0,1,2]
 * Step 1: Check if array is rotated
 *   nums[0]=4 > nums[-1]=2 → Array is rotated
 *
 * Step 2: Binary search for minimum
 *   left = 0, right = 6
 *   mid = 3: nums[3]=7 > nums[6]=2
 *   → Minimum is in right half, left = 3
 *
 *   left = 3, right = 6
 *   mid = 4: nums[4]=0 < nums[6]=2
 *   → Minimum could be at mid or left, right = 4
 *
 *   left = 3, right = 4
 *   right - left = 1 → return min(nums[3], nums[4]) = min(7, 0) = 0
 *
 * Output: 0 (minimum element)
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
