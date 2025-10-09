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
 * House Robber - find maximum money that can be robbed without robbing adjacent houses
 *
 * @param {number[]} nums - Array representing money in each house
 * @return {number} - Maximum money that can be robbed
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function rob(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Use two variables to track the maximum money robbed
    // prev2: maximum money up to i-2 houses
    // prev1: maximum money up to i-1 houses
    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        // Current max = max(rob current + prev2, skip current and take prev1)
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Alternative DP solution with explicit array (for educational purposes)
 *
 * @param {number[]} nums - Array representing money in each house
 * @return {number} - Maximum money that can be robbed
 */
function robWithArray(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    const dp = new Array(nums.length);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
    }

    return dp[nums.length - 1];
}

function solve(nums) {
    return rob(nums);
}

/**
 * Test cases for Problem 198: House Robber
 */
function testSolution() {
    console.log('Testing 198. House Robber');

    // Test case 1: Basic functionality - [2,7,9,3,1]
    const result1 = rob([2,7,9,3,1]);
    const expected1 = 12;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Simple case - [2,1,1,2]
    const result2 = rob([2,1,1,2]);
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single house
    const result3 = rob([5]);
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two houses
    const result4 = rob([1,2]);
    const expected4 = 2;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Empty array
    const result5 = rob([]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: All same values
    const result6 = rob([2,2,2,2]);
    const expected6 = 4;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 198. House Robber!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 198. House Robber ===');
    console.log('Category: Dynamic Programming');
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
    rob,
    robWithArray,
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
