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
 * Main solution for Problem 274: H Index
 *
 * @param {number[]} citations - Array of citation counts
 * @return {number} - The h-index value
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(citations) {
    // Sort citations in descending order
    citations.sort((a, b) => b - a);

    let hIndex = 0;
    for (let i = 0; i < citations.length; i++) {
        // At position i, we have (i + 1) papers
        // If citations[i] >= i + 1, then we have at least (i + 1) papers with >= (i + 1) citations
        if (citations[i] >= i + 1) {
            hIndex = i + 1;
        } else {
            break; // No point continuing once the condition fails
        }
    }

    return hIndex;
}

/**
 * Test cases for Problem 274: H Index
 */
function testSolution() {
    console.log('Testing 274. H Index');

    // Test case 1: Example from problem
    const result1 = solve([3, 0, 6, 1, 5]);
    const expected1 = 3;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example
    const result2 = solve([1, 3, 1]);
    const expected2 = 1;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: High citations
    const result3 = solve([100]);
    const expected3 = 1;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All zeros
    const result4 = solve([0, 0, 0]);
    const expected4 = 0;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Increasing sequence
    const result5 = solve([1, 2, 3, 4, 5]);
    const expected5 = 3;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 274. H Index!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 274. H Index ===');
    console.log('Category: Sorting');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
