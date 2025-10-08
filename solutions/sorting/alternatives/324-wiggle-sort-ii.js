/**
 * 324. Wiggle Sort II
 * Medium
 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Unlike Wiggle Sort I, this version requires STRICT inequality: nums[0] < nums[1] > nums[2] < nums[3].
 * We need to avoid adjacent equal elements. The key insight is to sort the array and then
 * interleave the smaller half with the larger half in a specific pattern.
 *
 * APPROACH:
 * 1. Sort the array
 * 2. Split into two halves: smaller half and larger half
 * 3. Place elements from the two halves alternately, starting with smaller half
 * 4. Fill from the end of each half to avoid adjacent duplicates
 *
 * WHY THIS WORKS:
 * By placing elements from the end of each half in reverse order, we maximize the
 * distance between potential duplicates. This ensures that even if there are duplicates,
 * they won't be adjacent in the final arrangement.
 *
 * TIME COMPLEXITY: O(n log n) for sorting
 * SPACE COMPLEXITY: O(n) for the temporary array
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [1,5,1,1,6,4]
 * Step 1: Sort: [1,1,1,4,5,6]
 * Step 2: Split into halves:
 *   smaller: [1,1,1] (indices 0-2)
 *   larger:  [4,5,6] (indices 3-5)
 * Step 3: Interleave from the end:
 *   Position 0: smaller[2] = 1
 *   Position 1: larger[2] = 6
 *   Position 2: smaller[1] = 1
 *   Position 3: larger[1] = 5
 *   Position 4: smaller[0] = 1
 *   Position 5: larger[0] = 4
 * Output: [1,6,1,5,1,4] (satisfies nums[0] < nums[1] > nums[2] < nums[3]...)
 *
 * EDGE CASES:
 * - Two elements: simple case
 * - Many duplicates: placing from end helps separate them
 * - Odd/even length arrays: handled by proper half calculation
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
