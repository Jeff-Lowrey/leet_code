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
 * **Step 1:** [description]
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
 * Main solution for Problem 035: Search Insert Position
 *
 * @param {number[]} nums - Sorted array of distinct integers
 * @param {number} target - Target value to search for or insert
 * @return {number} - Index of target if found, or insertion position
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
    // Handle edge case: empty array
    if (!nums || nums.length === 0) {
        return 0;
    }

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) {
            // Target found, return its index
            return mid;
        } else if (nums[mid] < target) {
            // Target is in the right half
            left = mid + 1;
        } else {
            // Target is in the left half
            right = mid - 1;
        }
    }

    // Target not found, left is the insertion position
    // This maintains the sorted order of the array
    return left;
}

/**
 * Test cases for Problem 035: Search Insert Position
 */
function testSolution() {
    console.log('Testing 035. Search Insert Position');

    // Test case 1: Target found in array
    const result1 = solve([1,3,5,6], 5);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Target should be inserted in middle
    const result2 = solve([1,3,5,6], 2);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Target should be inserted at end
    const result3 = solve([1,3,5,6], 7);
    const expected3 = 4;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Target should be inserted at beginning
    const result4 = solve([1,3,5,6], 0);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = solve([], 5);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Single element - target found
    const result6 = solve([1], 1);
    const expected6 = 0;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Single element - insert before
    const result7 = solve([1], 0);
    const expected7 = 0;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test case 8: Single element - insert after
    const result8 = solve([1], 2);
    const expected8 = 1;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);

    console.log('All test cases passed for 035. Search Insert Position!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 035. Search Insert Position ===');
    console.log('Category: Binary Search');
    console.log('Difficulty: Easy');
    console.log('');

    console.log('Example 1:');
    console.log('Input: nums = [1,3,5,6], target = 5');
    console.log('Output:', solve([1,3,5,6], 5));
    console.log('Explanation: Target 5 found at index 2');
    console.log('');

    console.log('Example 2:');
    console.log('Input: nums = [1,3,5,6], target = 2');
    console.log('Output:', solve([1,3,5,6], 2));
    console.log('Explanation: Target 2 should be inserted at index 1');
    console.log('');

    console.log('Example 3:');
    console.log('Input: nums = [1,3,5,6], target = 7');
    console.log('Output:', solve([1,3,5,6], 7));
    console.log('Explanation: Target 7 should be inserted at index 4 (end)');
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
 * - The key insight is that when binary search doesn't find the target, the left pointer
 *   naturally ends up at the correct insertion position
 * - This happens because binary search maintains the invariant that all elements to the left
 *   of 'left' are smaller than target, and all elements to the right of 'right' are larger
 * - When the loop terminates, left == right + 1, and left is the insertion position
 * - This elegant property makes the solution very clean and efficient
 * - Works for all edge cases without special handling
 */
