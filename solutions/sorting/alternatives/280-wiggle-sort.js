/**

 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Rearrange the array such that nums[0] <= nums[1] >= nums[2] <= nums[3]...
 * We can achieve this with a one-pass greedy approach by swapping elements
 * when they don't satisfy the wiggle property at their position.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * By ensuring each element satisfies the wiggle property relative to its
 * predecessor, we create the desired pattern. Swapping when needed is sufficient
 * because we only need to satisfy the local wiggle condition, not global ordering.
 *
 * TIME COMPLEXITY: O(n) - single pass through the array
 * SPACE COMPLEXITY: O(1) - in-place modification
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [3,5,2,1,6,4]
 * Step 1: i=1 (odd): nums[1]=5 >= nums[0]=3 ✓ no swap
 * Step 2: i=2 (even): nums[2]=2 <= nums[1]=5 ✓ no swap
 * Step 3: i=3 (odd): nums[3]=1 >= nums[2]=2 ✗ swap → [3,5,2,2,6,4] wait, recalculate
 * Actually: i=3 (odd): nums[3]=1 < nums[2]=2, swap → [3,5,1,2,6,4]
 * Step 4: i=4 (even): nums[4]=6 <= nums[3]=2 ✗ swap → [3,5,1,6,2,4]
 * Step 5: i=5 (odd): nums[5]=4 >= nums[4]=2 ✓ no swap
 * Output: [3,5,1,6,2,4] (satisfies wiggle sort)
 *
 * EDGE CASES:
 * - Empty or single element: no changes needed
 * - Two elements: already wiggle sorted
 * - Duplicate values: can be part of valid wiggle sequence
 */

/**
 * Main solution for Problem 280: Wiggle Sort
 *
 * @param {number[]} nums - Array to rearrange (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    for (let i = 1; i < nums.length; i++) {
        // For odd indices, nums[i] should be >= nums[i-1]
        // For even indices, nums[i] should be <= nums[i-1]
        const shouldBeGreater = i % 2 === 1;

        if (shouldBeGreater) {
            // Odd index: nums[i] should be >= nums[i-1]
            if (nums[i] < nums[i - 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        } else {
            // Even index: nums[i] should be <= nums[i-1]
            if (nums[i] > nums[i - 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        }
    }
}

/**
 * Test cases for Problem 280: Wiggle Sort
 */
function testSolution() {
    console.log('Testing 280. Wiggle Sort');

    // Helper to verify wiggle property
    function isWiggleSorted(nums) {
        for (let i = 1; i < nums.length; i++) {
            if (i % 2 === 1) {
                // Odd index: should be >= previous
                if (nums[i] < nums[i - 1]) return false;
            } else {
                // Even index: should be <= previous
                if (nums[i] > nums[i - 1]) return false;
            }
        }
        return true;
    }

    // Test case 1: Example from problem
    const nums1 = [3, 5, 2, 1, 6, 4];
    solve(nums1);
    console.log('Test 1:', JSON.stringify(nums1));
    console.assert(isWiggleSorted(nums1), 'Test 1 failed: not wiggle sorted');

    // Test case 2: Another example
    const nums2 = [1, 2, 3, 4, 5];
    solve(nums2);
    console.log('Test 2:', JSON.stringify(nums2));
    console.assert(isWiggleSorted(nums2), 'Test 2 failed: not wiggle sorted');

    // Test case 3: Already wiggle sorted
    const nums3 = [1, 3, 2, 4, 3];
    solve(nums3);
    console.log('Test 3:', JSON.stringify(nums3));
    console.assert(isWiggleSorted(nums3), 'Test 3 failed: not wiggle sorted');

    // Test case 4: Two elements
    const nums4 = [2, 1];
    solve(nums4);
    console.assert(isWiggleSorted(nums4), 'Test 4 failed: not wiggle sorted');

    // Test case 5: Duplicates
    const nums5 = [1, 1, 1, 1, 1];
    solve(nums5);
    console.assert(isWiggleSorted(nums5), 'Test 5 failed: not wiggle sorted');

    console.log('All test cases passed for 280. Wiggle Sort!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 280. Wiggle Sort ===');
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
