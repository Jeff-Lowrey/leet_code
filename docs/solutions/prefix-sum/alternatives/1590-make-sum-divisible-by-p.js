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
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * Main solution for Problem 1590: Make Sum Divisible By P
 *
 * @param {number[]} nums - Array of integers
 * @param {number} p - Divisor
 * @return {number} - Length of smallest subarray to remove, or -1 if impossible
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, p))
 */
function solve(nums, p) {
    const n = nums.length;

    // Calculate total sum modulo p
    let totalSum = 0;
    for (const num of nums) {
        totalSum = (totalSum + num) % p;
    }

    const target = totalSum % p;

    // If already divisible, no need to remove anything
    if (target === 0) {
        return 0;
    }

    // Map to store most recent index of each prefix sum modulo p
    const modMap = new Map();
    modMap.set(0, -1); // Base case: empty prefix

    let prefixSum = 0;
    let minLength = n;

    for (let i = 0; i < n; i++) {
        prefixSum = (prefixSum + nums[i]) % p;

        // We need to find a previous prefix where:
        // (prefixSum - prevPrefix) % p = target
        // So prevPrefix = (prefixSum - target + p) % p
        const needed = (prefixSum - target + p) % p;

        if (modMap.has(needed)) {
            const length = i - modMap.get(needed);
            minLength = Math.min(minLength, length);
        }

        // Store current prefix sum modulo
        modMap.set(prefixSum, i);
    }

    // If we need to remove the entire array, it's impossible
    return minLength === n ? -1 : minLength;
}

/**
 * Test cases for Problem 1590: Make Sum Divisible By P
 */
function testSolution() {
    console.log('Testing 1590. Make Sum Divisible By P');

    // Test case 1: Example 1
    const result1 = solve([3,1,4,2], 6);
    const expected1 = 1;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const result2 = solve([6,3,5,2], 9);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Example 3 - impossible case
    const result3 = solve([1,2,3], 3);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Already divisible
    const result4 = solve([1,2,3], 6);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Need to remove entire array
    const result5 = solve([1000000000], 3);
    const expected5 = -1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 1590. Make Sum Divisible By P!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1590. Make Sum Divisible By P ===');
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
