/**

 *
 * This problem demonstrates key concepts in Prefix Sum.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count the number of non-empty subarrays whose sum is divisible by k.
 * Key insight: if two prefix sums have the same remainder when divided by k,
 * the subarray between them has sum divisible by k.
 * Mathematical property: (a - b) % k = 0 if and only if a % k = b % k.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * If prefix[j] % k = prefix[i] % k, then (prefix[j] - prefix[i]) % k = 0.
 * This means subarray from i+1 to j has sum divisible by k.
 * For each remainder, if it appeared n times, we can form n new subarrays
 * ending at current position.
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(k) - hash map stores at most k different remainders
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [4,5,0,-2,-3,1], k = 5
 * Step 1: Prefix sums: [4, 9, 9, 7, 4, 5]
 * Step 2: Remainders (mod 5): [4, 4, 4, 2, 4, 0]
 * Step 3: Count pairs with same remainder:
 *   - Remainder 4 appears 4 times -> C(4,2) = 6 pairs
 *   - Remainder 0 appears 1 time -> 1 subarray
 * Output: 7
 *
 * EDGE CASES:
 * - Negative numbers: use (sum % k + k) % k for positive remainder
 * - k = 1: all subarrays are valid
 * - Single element divisible by k
 */

/**
 * Main solution for Problem 974: Subarray Sums Divisible By K
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Divisor
 * @return {number} - Number of subarrays with sum divisible by k
 *
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
function solve(nums, k) {
    // Map to store frequency of each remainder
    const remainderCount = new Map();
    remainderCount.set(0, 1); // Base case: remainder 0 appears once

    let prefixSum = 0;
    let count = 0;

    for (const num of nums) {
        prefixSum += num;

        // Calculate remainder (handle negative with + k)
        let remainder = prefixSum % k;
        if (remainder < 0) {
            remainder += k;
        }

        // If this remainder was seen before, all those positions
        // can form valid subarrays ending at current position
        if (remainderCount.has(remainder)) {
            count += remainderCount.get(remainder);
        }

        // Update frequency of current remainder
        remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
    }

    return count;
}

/**
 * Test cases for Problem 974: Subarray Sums Divisible By K
 */
function testSolution() {
    console.log('Testing 974. Subarray Sums Divisible By K');

    // Test case 1: Example 1
    const result1 = solve([4,5,0,-2,-3,1], 5);
    const expected1 = 7;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Simple case
    const result2 = solve([5], 5);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: With negative numbers
    const result3 = solve([-1,2,9], 2);
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All elements divisible by k
    const result4 = solve([3,6,9], 3);
    const expected4 = 6;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: k = 1 (all subarrays valid)
    const result5 = solve([1,2,3], 1);
    const expected5 = 6;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 974. Subarray Sums Divisible By K!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 974. Subarray Sums Divisible By K ===');
    console.log('Category: Prefix Sum');
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
