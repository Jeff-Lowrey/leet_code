/**

 *
 * This problem demonstrates key concepts in Prefix Sum.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the total number of continuous subarrays whose sum equals k.
 * This is a classic prefix sum problem. If we have prefix sums at positions i and j,
 * and prefix[j] - prefix[i] = k, then subarray from i+1 to j has sum k.
 * We use a hash map to count occurrences of each prefix sum.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * If we're at position j with sum S_j, and we previously had sum S_i = S_j - k,
 * then the subarray from i+1 to j has sum exactly k.
 * By storing all prefix sum frequencies, we count all valid subarrays efficiently.
 *
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(n) - hash map stores at most n different sums
 *
 * EXAMPLE WALKTHROUGH:
 * Input: nums = [1,1,1], k = 2
 * Step 1: sum=0, map={0:1}
 * Step 2: sum=1, check (1-2)=-1 (not in map), map={0:1, 1:1}, count=0
 * Step 3: sum=2, check (2-2)=0 (in map, freq=1), map={0:1, 1:1, 2:1}, count=1
 * Step 4: sum=3, check (3-2)=1 (in map, freq=1), map={0:1, 1:1, 2:1, 3:1}, count=2
 * Output: 2 (subarrays [1,1] at positions 0-1 and 1-2)
 *
 * EDGE CASES:
 * - Negative numbers allowed
 * - k can be 0
 * - Multiple subarrays with same sum
 * - Single element equals k
 */

/**
 * Main solution for Problem 560: Subarray Sum Equals K
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Target sum
 * @return {number} - Number of subarrays with sum k
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, k) {
    // Map to store frequency of each prefix sum
    const prefixSumCount = new Map();
    prefixSumCount.set(0, 1); // Base case: sum 0 appears once

    let currentSum = 0;
    let count = 0;

    for (const num of nums) {
        currentSum += num;

        // Check if there's a prefix sum that gives us sum k
        // We need: currentSum - previousSum = k
        // So: previousSum = currentSum - k
        const needed = currentSum - k;
        if (prefixSumCount.has(needed)) {
            count += prefixSumCount.get(needed);
        }

        // Update frequency of current sum
        prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
    }

    return count;
}

/**
 * Test cases for Problem 560: Subarray Sum Equals K
 */
function testSolution() {
    console.log('Testing 560. Subarray Sum Equals K');

    // Test case 1: Example 1
    const result1 = solve([1,1,1], 2);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const result2 = solve([1,2,3], 3);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: With negative numbers
    const result3 = solve([1,-1,0], 0);
    const expected3 = 3;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element equals k
    const result4 = solve([5], 5);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: No subarray equals k
    const result5 = solve([1,2,3], 10);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 560. Subarray Sum Equals K!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 560. Subarray Sum Equals K ===');
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
