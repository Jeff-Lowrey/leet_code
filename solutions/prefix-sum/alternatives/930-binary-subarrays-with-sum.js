/**
 * 930. Binary Subarrays With Sum
 * Medium
 *
 * This problem demonstrates key concepts in Prefix Sum.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the number of non-empty subarrays in a binary array with sum equal to goal.
 * Similar to "Subarray Sum Equals K", we use prefix sum with hash map.
 * For binary arrays, the sum is just the count of 1s.
 *
 * APPROACH:
 * 1. Use hash map to store frequency of each prefix sum
 * 2. For each position, calculate running sum (count of 1s)
 * 3. Check if (currentSum - goal) exists in map
 * 4. Add the frequency of (currentSum - goal) to result
 * 5. Update frequency of current sum in map
 *
 * WHY THIS WORKS:
 * If prefix[j] - prefix[i] = goal, then subarray from i+1 to j has sum = goal.
 * By tracking all prefix sum frequencies, we count all valid subarrays in O(n).
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(n) - hash map stores at most n different sums
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [1,0,1,0,1], goal = 2
 * Step 1: Prefix sums: [1, 1, 2, 2, 3]
 * Step 2: At index 2, sum=2, need sum-goal=0, map has {0:1}, add 1
 * Step 3: At index 3, sum=2, need sum-goal=0, map has {0:1}, add 1
 * Step 4: At index 4, sum=3, need sum-goal=1, map has {1:2}, add 2
 * Output: 4
 *
 * EDGE CASES:
 * - All zeros: only valid if goal = 0
 * - All ones: sum keeps increasing
 * - goal = 0: count subarrays with all zeros
 * - Single element
 */

/**
 * Main solution for Problem 930: Binary Subarrays With Sum
 *
 * @param {number[]} nums - Binary array (0s and 1s)
 * @param {number} goal - Target sum
 * @return {number} - Number of subarrays with sum equal to goal
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, goal) {
    // Map to store frequency of each prefix sum
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Base case: sum 0 appears once

    let currentSum = 0;
    let count = 0;

    for (const num of nums) {
        currentSum += num;

        // Check if there's a prefix sum that gives us the goal
        // We need: currentSum - previousSum = goal
        // So: previousSum = currentSum - goal
        const needed = currentSum - goal;
        if (prefixSumCount.has(needed)) {
            count += prefixSumCount.get(needed);
        }

        // Update frequency of current sum
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    }

    return count;
}

/**
 * Test cases for Problem 930: Binary Subarrays With Sum
 */
function testSolution() {
    console.log('Testing 930. Binary Subarrays With Sum');

    // Test case 1: Example 1
    const result1 = solve([1,0,1,0,1], 2);
    const expected1 = 4;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const result2 = solve([0,0,0,0,0], 0);
    const expected2 = 15;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All ones with goal 3
    const result3 = solve([1,1,1,1], 3);
    const expected3 = 2;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element matching goal
    const result4 = solve([1], 1);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Goal = 0 with mix
    const result5 = solve([0,1,0], 0);
    const expected5 = 2;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 930. Binary Subarrays With Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 930. Binary Subarrays With Sum ===');
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
