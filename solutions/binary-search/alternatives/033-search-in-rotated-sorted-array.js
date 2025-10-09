/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 033: Search In Rotated Sorted Array
 *
 * @param {number[]} nums - Rotated sorted array with distinct values
 * @param {number} target - Target value to search for
 * @return {number} - Index of target if found, -1 otherwise
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
    // Handle edge case: empty array
    if (!nums || nums.length === 0) {
        return -1;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Found the target
        if (nums[mid] === target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) {
                // Target is in the sorted left half
                right = mid - 1;
            } else {
                // Target is in the right half
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) {
                // Target is in the sorted right half
                left = mid + 1;
            } else {
                // Target is in the left half
                right = mid - 1;
            }
        }
    }

    // Target not found
    return -1;
}

/**
 * Test cases for Problem 033: Search In Rotated Sorted Array
 */
function testSolution() {
    console.log('Testing 033. Search In Rotated Sorted Array');

    // Test case 1: Target found in rotated array
    const result1 = solve([4,5,6,7,0,1,2], 0);
    const expected1 = 4;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Target not found
    const result2 = solve([4,5,6,7,0,1,2], 3);
    const expected2 = -1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element found
    const result3 = solve([1], 1);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element not found
    const result4 = solve([1], 0);
    const expected4 = -1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Array not rotated
    const result5 = solve([1,2,3,4,5], 3);
    const expected5 = 2;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Target at beginning of rotated part
    const result6 = solve([4,5,6,7,0,1,2], 4);
    const expected6 = 0;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Target in right half
    const result7 = solve([4,5,6,7,0,1,2], 1);
    const expected7 = 5;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 033. Search In Rotated Sorted Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 033. Search In Rotated Sorted Array ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Example 1:');
    console.log('Input: nums = [4,5,6,7,0,1,2], target = 0');
    console.log('Output:', solve([4,5,6,7,0,1,2], 0));
    console.log('');

    console.log('Example 2:');
    console.log('Input: nums = [4,5,6,7,0,1,2], target = 3');
    console.log('Output:', solve([4,5,6,7,0,1,2], 3));
    console.log('');

    console.log('Example 3:');
    console.log('Input: nums = [1], target = 0');
    console.log('Output:', solve([1], 0));
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
 * - The key insight is that at least one half of a rotated sorted array is always properly sorted
 * - We determine which half is sorted by comparing nums[left] with nums[mid]
 * - The condition nums[left] <= nums[mid] indicates the left half is sorted
 * - Always use inclusive comparisons when checking if target is in the sorted half
 * - This approach maintains O(log n) time complexity despite the rotation
 */
