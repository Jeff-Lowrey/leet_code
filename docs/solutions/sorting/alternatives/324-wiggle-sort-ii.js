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
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * Main solution for Problem 324: Wiggle Sort II
 *
 * @param {number[]} nums - Array to rearrange (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    const n = nums.length;
    if (n <= 1) return;

    // Sort the array
    const sorted = [...nums].sort((a, b) => a - b);

    // Find the middle point
    const mid = Math.floor((n + 1) / 2);

    // Fill positions alternately from the end of each half
    let left = mid - 1;  // End of smaller half
    let right = n - 1;    // End of larger half

    for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
            // Even positions get from smaller half (from end)
            nums[i] = sorted[left--];
        } else {
            // Odd positions get from larger half (from end)
            nums[i] = sorted[right--];
        }
    }
}

/**
 * Test cases for Problem 324: Wiggle Sort II
 */
function testSolution() {
    console.log('Testing 324. Wiggle Sort II');

    // Helper to verify strict wiggle property
    function isStrictWiggleSorted(nums) {
        for (let i = 1; i < nums.length; i++) {
            if (i % 2 === 1) {
                // Odd index: should be STRICTLY greater than previous
                if (nums[i] <= nums[i - 1]) return false;
            } else {
                // Even index: should be STRICTLY less than previous
                if (nums[i] >= nums[i - 1]) return false;
            }
        }
        return true;
    }

    // Test case 1: Example from problem
    const nums1 = [1, 5, 1, 1, 6, 4];
    solve(nums1);
    console.log('Test 1:', JSON.stringify(nums1));
    console.assert(isStrictWiggleSorted(nums1), 'Test 1 failed: not strict wiggle sorted');

    // Test case 2: Another example
    const nums2 = [1, 3, 2, 2, 3, 1];
    solve(nums2);
    console.log('Test 2:', JSON.stringify(nums2));
    console.assert(isStrictWiggleSorted(nums2), 'Test 2 failed: not strict wiggle sorted');

    // Test case 3: Simple case
    const nums3 = [1, 2, 3, 4, 5];
    solve(nums3);
    console.log('Test 3:', JSON.stringify(nums3));
    console.assert(isStrictWiggleSorted(nums3), 'Test 3 failed: not strict wiggle sorted');

    // Test case 4: Two elements
    const nums4 = [2, 1];
    solve(nums4);
    console.log('Test 4:', JSON.stringify(nums4));
    console.assert(nums4.length === 2, 'Test 4 failed: wrong length');

    // Test case 5: Three elements with duplicates
    const nums5 = [4, 5, 5, 6];
    solve(nums5);
    console.log('Test 5:', JSON.stringify(nums5));
    console.assert(isStrictWiggleSorted(nums5), 'Test 5 failed: not strict wiggle sorted');

    console.log('All test cases passed for 324. Wiggle Sort II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 324. Wiggle Sort Ii ===');
    console.log('Category: Sorting');
    console.log('Difficulty: Medium');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
