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
 * Main solution for Problem 027: Remove Element
 *
 * @param {number[]} nums - Array of integers
 * @param {number} val - Value to remove
 * @return {number} - Number of elements not equal to val
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums, val) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Slow pointer tracks position for next valid element
    let slow = 0;

    // Fast pointer scans through array
    for (let fast = 0; fast < nums.length; fast++) {
        // If current element is not the value to remove
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }

    // Return count of elements not equal to val
    return slow;
}

/**
 * Test cases for Problem 027: Remove Element
 */
function testSolution() {
    console.log('Testing 027. Remove Element');

    // Test case 1: Example from problem
    const nums1 = [3, 2, 2, 3];
    const result1 = solve(nums1, 3);
    const expected1 = 2;
    const expectedArray1 = [2, 2];
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.assert(nums1.slice(0, result1).sort().toString() === expectedArray1.sort().toString(),
        `Test 1 failed: array should contain ${expectedArray1}, got ${nums1.slice(0, result1)}`);
    console.log(`Test 1 passed: removeElement([3,2,2,3], 3) = ${result1}, nums = [${nums1.slice(0, result1)}]`);

    // Test case 2: Another example
    const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
    const result2 = solve(nums2, 2);
    const expected2 = 5;
    const expectedArray2 = [0, 1, 3, 0, 4];
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.assert(nums2.slice(0, result2).sort().toString() === expectedArray2.sort().toString(),
        `Test 2 failed: array should contain ${expectedArray2}, got ${nums2.slice(0, result2)}`);
    console.log(`Test 2 passed: removeElement([0,1,2,2,3,0,4,2], 2) = ${result2}, nums = [${nums2.slice(0, result2)}]`);

    // Test case 3: All elements equal to val
    const nums3 = [1, 1, 1, 1];
    const result3 = solve(nums3, 1);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: removeElement([1,1,1,1], 1) = ${result3}`);

    // Test case 4: No elements equal to val
    const nums4 = [1, 2, 3, 4, 5];
    const result4 = solve(nums4, 6);
    const expected4 = 5;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: removeElement([1,2,3,4,5], 6) = ${result4}`);

    // Test case 5: Single element equal to val
    const nums5 = [1];
    const result5 = solve(nums5, 1);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: removeElement([1], 1) = ${result5}`);

    // Test case 6: Single element not equal to val
    const nums6 = [1];
    const result6 = solve(nums6, 2);
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: removeElement([1], 2) = ${result6}`);

    console.log('All test cases passed for 027. Remove Element!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 027. Remove Element ===');
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
 * - Similar to remove duplicates, but filters based on value instead of uniqueness
 * - The order of remaining elements is preserved
 * - The approach is optimal for this in-place modification requirement
 */
