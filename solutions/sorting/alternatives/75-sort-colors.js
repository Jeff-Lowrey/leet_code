/**

 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Sort an array containing only 0s, 1s, and 2s (representing red, white, and blue).
 * The classic Dutch National Flag problem. We use three pointers to partition the
 * array into three sections: all 0s, all 1s, and all 2s.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * The left pointer tracks where the next 0 should go, and the right pointer tracks
 * where the next 2 should go. By swapping elements to their correct regions and
 * maintaining these invariants, we sort the array in a single pass.
 *
 * TIME COMPLEXITY: O(n) - single pass through the array
 * SPACE COMPLEXITY: O(1) - in-place sorting with only a few pointers
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [2,0,2,1,1,0]
 * Initial: left=0, current=0, right=5
 * Step 1: nums[0]=2, swap with nums[5], nums=[0,0,2,1,1,2], right=4
 * Step 2: nums[0]=0, swap with nums[0] (no change), left=1, current=1
 * Step 3: nums[1]=0, swap with nums[1] (no change), left=2, current=2
 * Step 4: nums[2]=2, swap with nums[4], nums=[0,0,1,1,2,2], right=3
 * Step 5: nums[2]=1, current=3
 * Step 6: nums[3]=1, current=4
 * Step 7: current > right, done
 * Output: [0,0,1,1,2,2]
 *
 * EDGE CASES:
 * - All same color: already sorted
 * - Already sorted: no swaps needed
 * - Reverse sorted: maximum swaps
 */

/**
 * Main solution for Problem 75: Sort Colors
 *
 * @param {number[]} nums - Array of 0s, 1s, and 2s (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    let left = 0;           // Pointer for next position of 0
    let current = 0;        // Current position being examined
    let right = nums.length - 1;  // Pointer for next position of 2

    while (current <= right) {
        if (nums[current] === 0) {
            // Swap with left and move both pointers
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 1) {
            // 1 is in the correct section, just move current
            current++;
        } else {  // nums[current] === 2
            // Swap with right, move right left
            // Don't move current because we need to examine the swapped element
            [nums[current], nums[right]] = [nums[right], nums[current]];
            right--;
        }
    }
}

/**
 * Test cases for Problem 75: Sort Colors
 */
function testSolution() {
    console.log('Testing 75. Sort Colors');

    // Test case 1: Example from problem
    const nums1 = [2, 0, 2, 1, 1, 0];
    solve(nums1);
    const expected1 = [0, 0, 1, 1, 2, 2];
    console.assert(JSON.stringify(nums1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(nums1)}`);

    // Test case 2: Another example
    const nums2 = [2, 0, 1];
    solve(nums2);
    const expected2 = [0, 1, 2];
    console.assert(JSON.stringify(nums2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(nums2)}`);

    // Test case 3: Already sorted
    const nums3 = [0, 1, 2];
    solve(nums3);
    const expected3 = [0, 1, 2];
    console.assert(JSON.stringify(nums3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(nums3)}`);

    // Test case 4: All same color
    const nums4 = [1, 1, 1, 1];
    solve(nums4);
    const expected4 = [1, 1, 1, 1];
    console.assert(JSON.stringify(nums4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(nums4)}`);

    // Test case 5: Reverse sorted
    const nums5 = [2, 2, 1, 1, 0, 0];
    solve(nums5);
    const expected5 = [0, 0, 1, 1, 2, 2];
    console.assert(JSON.stringify(nums5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(nums5)}`);

    console.log('All test cases passed for 75. Sort Colors!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 75. Sort Colors ===');
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
