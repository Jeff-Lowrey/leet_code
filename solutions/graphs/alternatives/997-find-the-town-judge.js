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
 * Main solution for Problem 997: Find The Town Judge
 *
 * @param {number} n - Number of people labeled 1 to n
 * @param {number[][]} trust - Array of trust relationships [a, b] means a trusts b
 * @return {number} - The town judge's label, or -1 if no judge exists
 *
 * Time Complexity: O(E) where E is number of trust relationships
 * Space Complexity: O(n) for trust score array
 */
function solve(n, trust) {
    // Special case: single person is automatically the judge
    if (n === 1) return 1;

    // Calculate net trust score for each person (indegree - outdegree)
    const trustScore = new Array(n + 1).fill(0);

    for (const [a, b] of trust) {
        trustScore[a]--; // a trusts someone (outdegree)
        trustScore[b]++; // b is trusted by someone (indegree)
    }

    // Find person with trust score of n-1 (trusted by all others, trusts no one)
    for (let i = 1; i <= n; i++) {
        if (trustScore[i] === n - 1) {
            return i;
        }
    }

    return -1; // No judge found
}

/**
 * Test cases for Problem 997: Find The Town Judge
 */
function testSolution() {
    console.log('Testing 997. Find The Town Judge');

    // Test case 1: Basic case with judge
    const result1 = solve(2, [[1,2]]);
    console.assert(result1 === 2, `Test 1 failed: expected 2, got ${result1}`);

    // Test case 2: Three people, person 3 is judge
    const result2 = solve(3, [[1,3],[2,3]]);
    console.assert(result2 === 3, `Test 2 failed: expected 3, got ${result2}`);

    // Test case 3: No judge (person 3 trusts someone)
    const result3 = solve(3, [[1,3],[2,3],[3,1]]);
    console.assert(result3 === -1, `Test 3 failed: expected -1, got ${result3}`);

    // Test case 4: Single person
    const result4 = solve(1, []);
    console.assert(result4 === 1, `Test 4 failed: expected 1, got ${result4}`);

    // Test case 5: No trust relationships
    const result5 = solve(3, []);
    console.assert(result5 === -1, `Test 5 failed: expected -1, got ${result5}`);

    // Test case 6: Multiple people trust each other (no judge)
    const result6 = solve(3, [[1,2],[2,3],[3,1]]);
    console.assert(result6 === -1, `Test 6 failed: expected -1, got ${result6}`);

    // Test case 7: Judge doesn't trust everyone else
    const result7 = solve(4, [[1,2],[1,3],[2,3],[3,4],[4,3]]);
    console.assert(result7 === -1, `Test 7 failed: expected -1, got ${result7}`);

    // Test case 8: Large case with clear judge
    const result8 = solve(4, [[1,4],[2,4],[3,4]]);
    console.assert(result8 === 4, `Test 8 failed: expected 4, got ${result8}`);

    console.log('All test cases passed for 997. Find The Town Judge!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 997. Find The Town Judge ===');
    console.log('Category: Graphs');
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
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
