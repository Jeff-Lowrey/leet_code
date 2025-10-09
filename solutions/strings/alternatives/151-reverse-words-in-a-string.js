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
 * Main solution for Problem 151: Reverse Words In A String
 *
 * @param {string} s - The input string with words
 * @return {string} - The string with words in reverse order
 *
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(n) for the result string
 */
function solve(s) {
    // Split by whitespace, filter out empty strings, reverse, and join
    return s.trim()
        .split(/\s+/)
        .reverse()
        .join(' ');
}

/**
 * Test cases for Problem 151: Reverse Words In A String
 */
function testSolution() {
    console.log('Testing 151. Reverse Words In A String');

    // Test case 1: Basic with multiple spaces
    const result1 = solve("the sky is blue");
    console.assert(result1 === "blue is sky the",
        `Test 1 failed: expected "blue is sky the", got "${result1}"`);

    // Test case 2: Leading and trailing spaces
    const result2 = solve("  hello world  ");
    console.assert(result2 === "world hello",
        `Test 2 failed: expected "world hello", got "${result2}"`);

    // Test case 3: Multiple spaces between words
    const result3 = solve("a good   example");
    console.assert(result3 === "example good a",
        `Test 3 failed: expected "example good a", got "${result3}"`);

    // Test case 4: Single word
    const result4 = solve("hello");
    console.assert(result4 === "hello",
        `Test 4 failed: expected "hello", got "${result4}"`);

    console.log('All test cases passed for 151. Reverse Words In A String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 151. Reverse Words In A String ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
