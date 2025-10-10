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
 * Main solution for Problem 506: Relative Ranks
 *
 * @param {number[]} score - Array of athlete scores
 * @return {string[]} - Array of ranks in original order
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(score) {
    const n = score.length;
    const result = new Array(n);

    // Create pairs of [score, originalIndex]
    const pairs = score.map((s, i) => [s, i]);

    // Sort by score in descending order
    pairs.sort((a, b) => b[0] - a[0]);

    // Assign ranks
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];

    for (let rank = 0; rank < n; rank++) {
        const [scoreValue, originalIndex] = pairs[rank];

        if (rank < 3) {
            result[originalIndex] = medals[rank];
        } else {
            result[originalIndex] = String(rank + 1);
        }
    }

    return result;
}

/**
 * Test cases for Problem 506: Relative Ranks
 */
function testSolution() {
    console.log('Testing 506. Relative Ranks');

    // Test case 1: Example from problem
    const result1 = solve([5, 4, 3, 2, 1]);
    const expected1 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Another example
    const result2 = solve([10, 3, 8, 9, 4]);
    const expected2 = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single athlete
    const result3 = solve([100]);
    const expected3 = ["Gold Medal"];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Two athletes
    const result4 = solve([7, 5]);
    const expected4 = ["Gold Medal", "Silver Medal"];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Three athletes
    const result5 = solve([1, 2, 3]);
    const expected5 = ["Bronze Medal", "Silver Medal", "Gold Medal"];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 506. Relative Ranks!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 506. Relative Ranks ===');
    console.log('Category: Sorting');
    console.log('Difficulty: Easy');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
