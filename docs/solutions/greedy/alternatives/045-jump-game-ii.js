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
