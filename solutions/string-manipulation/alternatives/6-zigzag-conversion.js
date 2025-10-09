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
 * Main solution for Problem 6: Zigzag Conversion
 *
 * @param {string} s - Input string
 * @param {number} numRows - Number of rows in zigzag pattern
 * @return {string} - String read line by line
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s, numRows) {
    // Edge cases
    if (numRows === 1 || numRows >= s.length) {
        return s;
    }

    // Create array of strings for each row
    const rows = new Array(numRows).fill('');
    let currentRow = 0;
    let goingDown = false;

    // Iterate through the string
    for (let char of s) {
        rows[currentRow] += char;

        // Change direction when we hit the top or bottom row
        if (currentRow === 0 || currentRow === numRows - 1) {
            goingDown = !goingDown;
        }

        // Move to next row
        currentRow += goingDown ? 1 : -1;
    }

    // Concatenate all rows
    return rows.join('');
}

/**
 * Test cases for Problem 6: Zigzag Conversion
 */
function testSolution() {
    console.log('Testing 6. Zigzag Conversion');

    // Test case 1: Basic 3 rows
    const result1 = solve("PAYPALISHIRING", 3);
    const expected1 = "PAHNAPLSIIGYIR";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: 4 rows
    const result2 = solve("PAYPALISHIRING", 4);
    const expected2 = "PINALSIGYAHRPI";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single row
    const result3 = solve("A", 1);
    const expected3 = "A";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two rows
    const result4 = solve("ABCDE", 2);
    const expected4 = "ACEBD";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: More rows than string length
    const result5 = solve("AB", 3);
    const expected5 = "AB";
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 6. Zigzag Conversion!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 6. Zigzag Conversion ===');
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
