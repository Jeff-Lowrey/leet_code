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
 *
 * **Step 1:** [description]
 *
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
