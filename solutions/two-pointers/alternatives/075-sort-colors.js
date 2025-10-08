/**
 * 075. Sort Colors
 * Medium
 *
 * This problem demonstrates key concepts in Two Pointers.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is the Dutch National Flag problem. We can use three pointers to partition
 * the array into three sections: 0s, 1s, and 2s. The key is to maintain invariants
 * where all 0s are before low pointer, all 2s are after high pointer, and we scan
 * with mid pointer.
 *
 * APPROACH:
 * 1. **Initialize three pointers**: low=0, mid=0, high=n-1
 * 2. **Scan with mid pointer**: Process each element
 * 3. **Swap based on value**:
 *    - If nums[mid]=0: swap with low, increment both low and mid
 *    - If nums[mid]=1: just increment mid
 *    - If nums[mid]=2: swap with high, decrement high (don't move mid yet)
 * 4. **Continue until mid > high**
 *
 * WHY THIS WORKS:
 * We maintain three regions: [0...low-1] contains 0s, [low...mid-1] contains 1s,
 * [mid...high] is unprocessed, [high+1...n-1] contains 2s. By swapping appropriately,
 * we partition the array in a single pass.
 *
 * TIME COMPLEXITY: O(n)
 * - Single pass through the array
 * SPACE COMPLEXITY: O(1)
 * - Only using three pointers, sorting in-place
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [2,0,2,1,1,0]
 * Step 1: low=0, mid=0, high=5, nums[0]=2, swap with high, nums=[0,0,2,1,1,2], high=4
 * Step 2: low=0, mid=0, high=4, nums[0]=0, swap with low, low=1, mid=1
 * Step 3: low=1, mid=1, high=4, nums[1]=0, swap with low, low=2, mid=2
 * Step 4: low=2, mid=2, high=4, nums[2]=2, swap with high, nums=[0,0,1,1,2,2], high=3
 * Step 5: low=2, mid=2, high=3, nums[2]=1, mid=3
 * Step 6: low=2, mid=3, high=3, nums[3]=1, mid=4 (mid > high, stop)
 * Output: [0,0,1,1,2,2]
 * ```
 *
 * EDGE CASES:
 * - Empty array: nothing to sort
 * - Single element: already sorted
 * - All same color: already sorted
 * - Already sorted: works efficiently
 */

/**
 * Main solution for Problem 075: Sort Colors
 *
 * @param {number[]} nums - Array with values 0, 1, 2 representing red, white, blue
 * @return {void} - Sorts array in-place, does not return anything
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    // Edge case: empty or single element
    if (!nums || nums.length <= 1) {
        return;
    }

    let low = 0;      // Pointer for next position of 0
    let mid = 0;      // Current element being examined
    let high = nums.length - 1;  // Pointer for next position of 2

    while (mid <= high) {
        if (nums[mid] === 0) {
            // Swap 0 to the front
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            // 1 is in correct position, just move forward
            mid++;
        } else {
            // nums[mid] === 2
            // Swap 2 to the back
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Don't increment mid yet, need to examine swapped element
        }
    }
}

/**
 * Test cases for Problem 075: Sort Colors
 */
function testSolution() {
    console.log('Testing 075. Sort Colors');

    // Test case 1: Example from problem
    const nums1 = [2, 0, 2, 1, 1, 0];
    solve(nums1);
    const expected1 = [0, 0, 1, 1, 2, 2];
    console.assert(nums1.toString() === expected1.toString(),
        `Test 1 failed: expected ${expected1}, got ${nums1}`);
    console.log(`Test 1 passed: sortColors([2,0,2,1,1,0]) = [${nums1}]`);

    // Test case 2: Another example
    const nums2 = [2, 0, 1];
    solve(nums2);
    const expected2 = [0, 1, 2];
    console.assert(nums2.toString() === expected2.toString(),
        `Test 2 failed: expected ${expected2}, got ${nums2}`);
    console.log(`Test 2 passed: sortColors([2,0,1]) = [${nums2}]`);

    // Test case 3: All same color
    const nums3 = [1, 1, 1, 1];
    solve(nums3);
    const expected3 = [1, 1, 1, 1];
    console.assert(nums3.toString() === expected3.toString(),
        `Test 3 failed: expected ${expected3}, got ${nums3}`);
    console.log(`Test 3 passed: sortColors([1,1,1,1]) = [${nums3}]`);

    // Test case 4: Already sorted
    const nums4 = [0, 0, 1, 1, 2, 2];
    solve(nums4);
    const expected4 = [0, 0, 1, 1, 2, 2];
    console.assert(nums4.toString() === expected4.toString(),
        `Test 4 failed: expected ${expected4}, got ${nums4}`);
    console.log(`Test 4 passed: sortColors([0,0,1,1,2,2]) = [${nums4}]`);

    // Test case 5: Reverse sorted
    const nums5 = [2, 2, 1, 1, 0, 0];
    solve(nums5);
    const expected5 = [0, 0, 1, 1, 2, 2];
    console.assert(nums5.toString() === expected5.toString(),
        `Test 5 failed: expected ${expected5}, got ${nums5}`);
    console.log(`Test 5 passed: sortColors([2,2,1,1,0,0]) = [${nums5}]`);

    // Test case 6: Single element
    const nums6 = [0];
    solve(nums6);
    const expected6 = [0];
    console.assert(nums6.toString() === expected6.toString(),
        `Test 6 failed: expected ${expected6}, got ${nums6}`);
    console.log(`Test 6 passed: sortColors([0]) = [${nums6}]`);

    console.log('All test cases passed for 075. Sort Colors!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 075. Sort Colors ===');
    console.log('Category: Two Pointers');
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
 * - This is the classic Dutch National Flag problem by Edsger Dijkstra
 * - The three-way partitioning technique is elegant and efficient
 * - One-pass solution with O(1) space is optimal
 * - The key is understanding why we don't increment mid after swapping with high
 */
