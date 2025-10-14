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
 * Main solution for Problem 523: Continuous Subarray Sum
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Divisor
 * @return {boolean} - True if valid subarray exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(min(n, k))
 */
function solve(nums, k) {
    if (nums.length < 2) {
        return false;
    }

    // Map to store first occurrence of each remainder
    const remainderMap = new Map();
    remainderMap.set(0, -1); // Base case: remainder 0 before array starts

    let prefixSum = 0;

    for (let i = 0; i < nums.length; i++) {
        prefixSum += nums[i];

        // Calculate remainder (handle negative with + k)
        const remainder = ((prefixSum % k) + k) % k;

        if (remainderMap.has(remainder)) {
            // Check if subarray length is at least 2
            if (i - remainderMap.get(remainder) >= 2) {
                return true;
            }
        } else {
            // Store first occurrence of this remainder
            remainderMap.set(remainder, i);
        }
    }

    return false;
}

/**
 * Test cases for Problem 523: Continuous Subarray Sum
 */
function testSolution() {
    console.log('Testing 523. Continuous Subarray Sum');

    // Test case 1: Example 1
    const result1 = solve([23,2,4,6,7], 6);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const result2 = solve([23,2,6,4,7], 6);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Example 3 - false case
    const result3 = solve([23,2,6,4,7], 13);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two zeros (sum is 0, which is multiple of any k)
    const result4 = solve([0,0], 1);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single element (must be at least 2 elements)
    const result5 = solve([5], 5);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 523. Continuous Subarray Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 523. Continuous Subarray Sum ===');
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
