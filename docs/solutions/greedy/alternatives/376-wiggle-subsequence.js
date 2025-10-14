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
