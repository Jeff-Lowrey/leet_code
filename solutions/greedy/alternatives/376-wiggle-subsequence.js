/**

 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count the peaks and valleys in the sequence. Each direction change represents
 * a valid element in the wiggle subsequence. Greedy choice: include every peak
 * and valley to maximize length.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Every peak/valley is essential for maximum wiggle subsequence
 * - Greedy choice: include all direction changes
 * - Removing any peak/valley would reduce the length
 * - The first element is always included, then count direction changes
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * nums = [1,7,4,9,2,5]
 * i=0: start, length=1
 * i=1: diff=6>0, prevDiff=0, direction change → length=2, prevDiff=6
 * i=2: diff=-3<0, prevDiff=6>0, direction change → length=3, prevDiff=-3
 * i=3: diff=5>0, prevDiff=-3<0, direction change → length=4, prevDiff=5
 * i=4: diff=-7<0, prevDiff=5>0, direction change → length=5, prevDiff=-7
 * i=5: diff=3>0, prevDiff=-7<0, direction change → length=6, prevDiff=3
 * Result: 6
 * ```
 *
 * EDGE CASES:
 * - Single element: Length 1
 * - All equal: Length 1
 * - Strictly increasing/decreasing: Length 2
 * - Consecutive duplicates: Skip duplicates, count only direction changes
 */

/**
 * Main solution for Problem 376: Wiggle Subsequence
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Length of longest wiggle subsequence
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    if (nums.length < 2) return nums.length;

    let prevDiff = 0;
    let length = 1;

    for (let i = 1; i < nums.length; i++) {
        const diff = nums[i] - nums[i - 1];

        // Check for direction change (or first non-zero difference)
        if ((diff > 0 && prevDiff <= 0) || (diff < 0 && prevDiff >= 0)) {
            length++;
            prevDiff = diff;
        }
    }

    return length;
}

/**
 * Test cases for Problem 376: Wiggle Subsequence
 */
function testSolution() {
    console.log('Testing 376. Wiggle Subsequence');

    // Test case 1: Example from problem
    const result1 = solve([1, 7, 4, 9, 2, 5]);
    const expected1 = 6;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve([1, 17, 5, 10, 13, 15, 10, 5, 16, 8]);
    const expected2 = 7;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Strictly increasing
    const result3 = solve([1, 2, 3, 4, 5]);
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: With duplicates
    const result4 = solve([1, 1, 7, 4, 9, 2, 5]);
    const expected4 = 6;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single element
    const result5 = solve([1]);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 376. Wiggle Subsequence!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 376. Wiggle Subsequence ===');
    console.log('Category: Greedy');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
