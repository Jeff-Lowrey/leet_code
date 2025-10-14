/**
 * # Difficulty: Medium
 *
 * # 560. Subarray Sum Equals K
 *
 * Given an array of integers nums and an integer k, return the total number of subarrays whose sum is equal to k.
 *
 * A subarray is a contiguous non-empty sequence of elements within an array.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[([1, 1, 1]</dd>
 * <dt>Output:</dt>
 * <dd>"subarraySum({nums}, {k}) -> {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 2 subarrays with sum equal to k: [1] and [2,-1,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a classic prefix sum problem. The key insight is that if we know the prefix sum up to index i and up to index j (where j > i), then the sum of subarray from i+1 to j is: prefix_sum[j] - prefix_sum[i]. We can use a hashmap to store prefix sums and their frequencies to find subarrays with target sum efficiently.
 *
 * ### APPROACH:
 * 1. **Use prefix sum**: Calculate running sum as we iterate
 * 2. **HashMap tracking**: Store frequency of each prefix sum seen
 * 3. **Target calculation**: For current prefix sum, check if (prefix_sum - k) exists
 * 4. **Count subarrays**: Add frequency of (prefix_sum - k) to result
 * 5. **Update map**: Increment frequency of current prefix sum
 *
 * ### WHY THIS WORKS:
 * - If prefix_sum[j] - prefix_sum[i] = k, then prefix_sum[i] = prefix_sum[j] - k
 * - By storing prefix sum frequencies, we can quickly find how many times (prefix_sum - k) occurred
 * - Each occurrence represents a valid subarray ending at current position
 * - Running prefix sum allows single pass solution
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,1,1], k = 2
 * Index 0: sum=1, need=1-2=-1, count=0, map={0:1, 1:1}
 * Index 1: sum=2, need=2-2=0, count=1, map={0:1, 1:1, 2:1}
 * Index 2: sum=3, need=3-2=1, count=2, map={0:1, 1:1, 2:1, 3:1}
 * Result: 2 subarrays: [1,1] and [1,1]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 * Single pass through the array with O(1) hashmap operations
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * HashMap can store up to n different prefix sums
 *
 * ### EDGE CASES:
 * - Single element equals k
 * - All elements sum to k
 * - No subarrays sum to k
 * - Negative numbers in array
 * - k = 0 (subarrays that sum to zero)
 *
 * </details>
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
