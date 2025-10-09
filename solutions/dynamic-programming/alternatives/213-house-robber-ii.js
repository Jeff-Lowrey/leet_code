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
 * Main solution for Problem 213: House Robber II
 *
 * @param {number[]} nums - Array of house values
 * @return {number} - Maximum amount that can be robbed
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    if (!nums || nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return Math.max(nums[0], nums[1]);

    // Helper function to solve linear house robber problem
    function robLinear(houses) {
        let prev2 = 0; // max money up to i-2
        let prev1 = 0; // max money up to i-1

        for (const house of houses) {
            const current = Math.max(prev1, prev2 + house);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    // Scenario 1: Rob first house, can't rob last house
    const robFirst = robLinear(nums.slice(0, -1));

    // Scenario 2: Don't rob first house, can rob last house
    const robLast = robLinear(nums.slice(1));

    return Math.max(robFirst, robLast);
}

/**
 * Test cases for Problem 213: House Robber II
 */
function testSolution() {
    console.log('Testing 213. House Robber II');

    // Test case 1: Basic circular case
    const result1 = solve([2, 3, 2]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Larger circular case
    const result2 = solve([1, 2, 3, 1]);
    const expected2 = 4; // Rob houses 2 and 3
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single house
    const result3 = solve([1]);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two houses
    const result4 = solve([1, 2]);
    const expected4 = 2;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All same values
    const result5 = solve([5, 5, 5, 5]);
    const expected5 = 10; // Rob every other house
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Empty array
    const result6 = solve([]);
    const expected6 = 0;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 213. House Robber II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 213. House Robber Ii ===');
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
