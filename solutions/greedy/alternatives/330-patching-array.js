/**

 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Track the range [1, miss) that we can form. If next number in array is <= miss,
 * we can extend our range. Otherwise, we need to patch with 'miss' to double our range.
 * The greedy choice is always to add 'miss' when we can't extend the range.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - If we can form [1, miss), adding 'miss' lets us form [1, 2*miss)
 * - Greedy choice: always patch with 'miss' to maximally extend our range
 * - Using existing numbers when possible minimizes patches needed
 * - The algorithm guarantees optimal solution by always making locally best choice
 *
 * TIME COMPLEXITY: O(m + log n) where m is array length, n is target
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * nums = [1, 3], n = 6
 * miss=1, patches=0
 *
 * nums[0]=1 <= miss=1:
 *   Can form [1,2), miss=1+1=2
 *
 * nums[1]=3 > miss=2:
 *   Need to patch with 2, patches=1
 *   Can form [1,4), miss=2+2=4
 *
 * nums[1]=3 <= miss=4:
 *   Can form [1,7), miss=4+3=7
 *
 * miss=7 > n=6, done
 * Result: 1 patch
 * ```
 *
 * EDGE CASES:
 * - Empty array: Need to patch [1, 2, 4, 8, ...] until reaching n
 * - Array already covers range: 0 patches
 * - Large n: Logarithmic patches due to doubling strategy
 */

/**
 * Main solution for Problem 330: Patching Array
 *
 * @param {number[]} nums - Sorted array of positive integers
 * @param {number} n - Target range to cover [1, n]
 * @return {number} - Minimum number of patches needed
 *
 * Time Complexity: O(m + log n)
 * Space Complexity: O(1)
 */
function solve(nums, n) {
    let patches = 0;
    let miss = 1; // Smallest number we can't form yet
    let i = 0;

    while (miss <= n) {
        if (i < nums.length && nums[i] <= miss) {
            // We can use nums[i] to extend our range
            miss += nums[i];
            i++;
        } else {
            // We need to patch with 'miss'
            miss += miss;
            patches++;
        }
    }

    return patches;
}

/**
 * Test cases for Problem 330: Patching Array
 */
function testSolution() {
    console.log('Testing 330. Patching Array');

    // Test case 1: Example from problem
    const result1 = solve([1, 3], 6);
    const expected1 = 1;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve([1, 5, 10], 20);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Empty array
    const result3 = solve([], 7);
    const expected3 = 3; // Need [1, 2, 4]
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Already covers range
    const result4 = solve([1, 2, 2], 5);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Large n
    const result5 = solve([1, 2, 31, 33], 2147483647);
    const expected5 = 28;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 330. Patching Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 330. Patching Array ===');
    console.log('Category: Greedy');
    console.log('Difficulty: Hard');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
