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
 * Main solution for Problem 38: Count And Say
 *
 * @param {number} n - The position in the count-and-say sequence
 * @return {string} - The nth term in the sequence
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(2^n)
 */
function solve(n) {
    // Base case
    if (n === 1) return "1";

    // Start with the first term
    let result = "1";

    // Generate each subsequent term
    for (let i = 1; i < n; i++) {
        result = getNextTerm(result);
    }

    return result;
}

/**
 * Helper function to generate the next term from the current term
 *
 * @param {string} s - Current term
 * @return {string} - Next term
 */
function getNextTerm(s) {
    let next = "";
    let i = 0;

    while (i < s.length) {
        let currentChar = s[i];
        let count = 1;

        // Count consecutive identical characters
        while (i + count < s.length && s[i + count] === currentChar) {
            count++;
        }

        // Append count + character
        next += count + currentChar;
        i += count;
    }

    return next;
}

/**
 * Test cases for Problem 38: Count And Say
 */
function testSolution() {
    console.log('Testing 38. Count And Say');

    // Test case 1: n = 1
    const result1 = solve(1);
    const expected1 = "1";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 2
    const result2 = solve(2);
    const expected2 = "11";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 3
    const result3 = solve(3);
    const expected3 = "21";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: n = 4
    const result4 = solve(4);
    const expected4 = "1211";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: n = 5
    const result5 = solve(5);
    const expected5 = "111221";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 38. Count And Say!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 38. Count And Say ===');
    console.log('Category: String Manipulation');
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
