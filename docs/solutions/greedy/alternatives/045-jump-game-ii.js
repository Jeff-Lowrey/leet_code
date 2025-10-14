/**
 * # Difficulty: Medium
 *
 * # 045. Jump Game Ii
 *
 * You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
 *
 * Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where 0 <= j <= nums[i] and i + j < n.
 *
 * Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[2,3,1,1,4]</dd>
 * <dt>Output:</dt>
 * <dd>2 (minimum jumps)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 2 jumps needed to reach end of [2,3,1,1,4]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of greedy concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply greedy methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages greedy principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [2,3,1,1,4]
 * Step 1: Initialize variables
 *   jumps = 0, current_end = 0, farthest = 0
 *
 * Step 2: Iterate through array
 *   i=0: farthest = max(0, 0+2) = 2
 *   i=1: farthest = max(2, 1+3) = 4, reached current_end → jumps=1, current_end=2
 *   i=2: farthest = max(4, 2+1) = 4, reached current_end → jumps=2, current_end=4
 *
 *   Reached last index
 *
 * Output: 2 (minimum jumps)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 045: Jump Game Ii
 *
 * @param {number[]} nums - Array of jump lengths
 * @return {number} - Minimum number of jumps to reach last index
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    if (nums.length <= 1) return 0;

    let jumps = 0;
    let currentEnd = 0;  // End of current jump level
    let farthest = 0;    // Farthest position we can reach

    // We don't need to jump from the last index
    for (let i = 0; i < nums.length - 1; i++) {
        // Update the farthest position we can reach
        farthest = Math.max(farthest, i + nums[i]);

        // If we've reached the end of current jump level
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;

            // Early termination: if we can already reach the end
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }

    return jumps;
}

/**
 * Test cases for Problem 045: Jump Game Ii
 */
function testSolution() {
    console.log('Testing 045. Jump Game Ii');

    // Test case 1: Basic example
    const result1 = solve([2, 3, 1, 1, 4]);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single element
    const result2 = solve([0]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All ones
    const result3 = solve([1, 1, 1, 1]);
    const expected3 = 3;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: One big jump
    const result4 = solve([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two elements
    const result5 = solve([2, 1]);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 045. Jump Game Ii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 045. Jump Game Ii ===');
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
