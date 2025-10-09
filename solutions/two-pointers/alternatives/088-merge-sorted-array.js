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
 * Main solution for Problem 088: Merge Sorted Array
 *
 * @param {number[]} nums1 - First sorted array with extra space at end
 * @param {number} m - Number of elements in nums1
 * @param {number[]} nums2 - Second sorted array
 * @param {number} n - Number of elements in nums2
 * @return {void} - Merges in-place into nums1, does not return anything
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function solve(nums1, m, nums2, n) {
    // Pointers for nums1's elements, nums2's elements, and merge position
    let p1 = m - 1;        // Last element in nums1
    let p2 = n - 1;        // Last element in nums2
    let p = m + n - 1;     // Last position in merged array

    // Merge from right to left
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    // If nums2 still has elements, copy them
    // (if nums1 has remaining elements, they're already in place)
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
}

/**
 * Test cases for Problem 088: Merge Sorted Array
 */
function testSolution() {
    console.log('Testing 088. Merge Sorted Array');

    // Test case 1: Example from problem
    const nums1_1 = [1, 2, 3, 0, 0, 0];
    const nums2_1 = [2, 5, 6];
    solve(nums1_1, 3, nums2_1, 3);
    const expected1 = [1, 2, 2, 3, 5, 6];
    console.assert(nums1_1.toString() === expected1.toString(),
        `Test 1 failed: expected ${expected1}, got ${nums1_1}`);
    console.log(`Test 1 passed: merge([1,2,3,0,0,0], 3, [2,5,6], 3) = [${nums1_1}]`);

    // Test case 2: Another example
    const nums1_2 = [1];
    const nums2_2 = [];
    solve(nums1_2, 1, nums2_2, 0);
    const expected2 = [1];
    console.assert(nums1_2.toString() === expected2.toString(),
        `Test 2 failed: expected ${expected2}, got ${nums1_2}`);
    console.log(`Test 2 passed: merge([1], 1, [], 0) = [${nums1_2}]`);

    // Test case 3: nums1 is initially empty
    const nums1_3 = [0];
    const nums2_3 = [1];
    solve(nums1_3, 0, nums2_3, 1);
    const expected3 = [1];
    console.assert(nums1_3.toString() === expected3.toString(),
        `Test 3 failed: expected ${expected3}, got ${nums1_3}`);
    console.log(`Test 3 passed: merge([0], 0, [1], 1) = [${nums1_3}]`);

    // Test case 4: All nums2 elements smaller
    const nums1_4 = [4, 5, 6, 0, 0, 0];
    const nums2_4 = [1, 2, 3];
    solve(nums1_4, 3, nums2_4, 3);
    const expected4 = [1, 2, 3, 4, 5, 6];
    console.assert(nums1_4.toString() === expected4.toString(),
        `Test 4 failed: expected ${expected4}, got ${nums1_4}`);
    console.log(`Test 4 passed: merge([4,5,6,0,0,0], 3, [1,2,3], 3) = [${nums1_4}]`);

    // Test case 5: All nums2 elements larger
    const nums1_5 = [1, 2, 3, 0, 0, 0];
    const nums2_5 = [4, 5, 6];
    solve(nums1_5, 3, nums2_5, 3);
    const expected5 = [1, 2, 3, 4, 5, 6];
    console.assert(nums1_5.toString() === expected5.toString(),
        `Test 5 failed: expected ${expected5}, got ${nums1_5}`);
    console.log(`Test 5 passed: merge([1,2,3,0,0,0], 3, [4,5,6], 3) = [${nums1_5}]`);

    // Test case 6: Interleaved elements
    const nums1_6 = [1, 3, 5, 0, 0, 0];
    const nums2_6 = [2, 4, 6];
    solve(nums1_6, 3, nums2_6, 3);
    const expected6 = [1, 2, 3, 4, 5, 6];
    console.assert(nums1_6.toString() === expected6.toString(),
        `Test 6 failed: expected ${expected6}, got ${nums1_6}`);
    console.log(`Test 6 passed: merge([1,3,5,0,0,0], 3, [2,4,6], 3) = [${nums1_6}]`);

    console.log('All test cases passed for 088. Merge Sorted Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 088. Merge Sorted Array ===');
    console.log('Category: Two Pointers');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration would go here
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
 * - The key insight is merging from right to left to avoid overwriting
 * - This is a common pattern for in-place array operations
 * - The solution is optimal in both time and space complexity
 * - Pay attention to the edge case where nums2 is empty
 */
