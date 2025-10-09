/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
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
