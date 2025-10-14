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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

/**
 * Main solution for Problem 338: Counting Bits
 *
 * @param {number} n - Non-negative integer
 * @return {number[]} - Array where ans[i] is the number of 1's in binary of i
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding output array
 */
function solve(n) {
    const result = new Array(n + 1);
    result[0] = 0;

    // Dynamic programming approach
    // For any number i, the count of 1's is:
    // count[i] = count[i >> 1] + (i & 1)
    // i >> 1 removes the last bit, i & 1 checks if last bit is 1
    for (let i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }

    return result;
}

/**
 * Test cases for Problem 338: Counting
 */
function testSolution() {
    console.log('Testing 338. Counting');

    // Test case 1: Small input
    const result1 = solve(2);
    const expected1 = [0, 1, 1];
    const matches1 = JSON.stringify(result1) === JSON.stringify(expected1);
    console.assert(matches1, `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Medium input
    const result2 = solve(5);
    const expected2 = [0, 1, 1, 2, 1, 2];
    const matches2 = JSON.stringify(result2) === JSON.stringify(expected2);
    console.assert(matches2, `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Zero
    const result3 = solve(0);
    const expected3 = [0];
    const matches3 = JSON.stringify(result3) === JSON.stringify(expected3);
    console.assert(matches3, `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Power of 2
    const result4 = solve(8);
    const expected4 = [0, 1, 1, 2, 1, 2, 2, 3, 1];
    const matches4 = JSON.stringify(result4) === JSON.stringify(expected4);
    console.assert(matches4, `Test 4 failed: expected [${expected4}], got [${result4}]`);

    console.log('All test cases passed for 338. Counting!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 338. Counting ===');
    console.log('Category: Bit Manipulation');
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
 * - This solution focuses on bit manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
