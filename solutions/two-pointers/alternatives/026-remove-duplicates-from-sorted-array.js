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
 * Main solution for Problem 026: Remove Duplicates From Sorted Array
 *
 * @param {number[]} nums - Sorted array of integers
 * @return {number} - Number of unique elements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Slow pointer tracks position for next unique element
    let slow = 0;

    // Fast pointer scans through array
    for (let fast = 1; fast < nums.length; fast++) {
        // Found a new unique element
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }

    // Return count of unique elements (slow is 0-indexed, so add 1)
    return slow + 1;
}

/**
 * Test cases for Problem 026: Remove Duplicates From Sorted Array
 */
function testSolution() {
    console.log('Testing 026. Remove Duplicates From Sorted Array');

    // Test case 1: Example from problem
    const nums1 = [1, 1, 2];
    const result1 = solve(nums1);
    const expected1 = 2;
    const expectedArray1 = [1, 2];
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.assert(nums1.slice(0, result1).toString() === expectedArray1.toString(),
        `Test 1 failed: array should be ${expectedArray1}, got ${nums1.slice(0, result1)}`);
    console.log(`Test 1 passed: removeDuplicates([1,1,2]) = ${result1}, nums = [${nums1.slice(0, result1)}]`);

    // Test case 2: Multiple duplicates
    const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const result2 = solve(nums2);
    const expected2 = 5;
    const expectedArray2 = [0, 1, 2, 3, 4];
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.assert(nums2.slice(0, result2).toString() === expectedArray2.toString(),
        `Test 2 failed: array should be ${expectedArray2}, got ${nums2.slice(0, result2)}`);
    console.log(`Test 2 passed: removeDuplicates([0,0,1,1,1,2,2,3,3,4]) = ${result2}, nums = [${nums2.slice(0, result2)}]`);

    // Test case 3: All same elements
    const nums3 = [1, 1, 1, 1];
    const result3 = solve(nums3);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: removeDuplicates([1,1,1,1]) = ${result3}`);

    // Test case 4: No duplicates
    const nums4 = [1, 2, 3, 4, 5];
    const result4 = solve(nums4);
    const expected4 = 5;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: removeDuplicates([1,2,3,4,5]) = ${result4}`);

    // Test case 5: Single element
    const nums5 = [1];
    const result5 = solve(nums5);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: removeDuplicates([1]) = ${result5}`);

    console.log('All test cases passed for 026. Remove Duplicates From Sorted Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 026. Remove Duplicates From Sorted Array ===');
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
 * - This solution focuses on two pointers concepts
 * - The slow-fast pointer pattern is a common technique for in-place array modifications
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
