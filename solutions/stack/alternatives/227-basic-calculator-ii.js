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
 * Main solution for Problem 227: Basic Calculator Ii
 *
 * @param {string} s - Mathematical expression string
 * @return {number} - Evaluated result
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(s) {
    const stack = [];
    let num = 0;
    let operator = '+';

    for (let i = 0; i < s.length; i++) {
        const char = s[i];

        // Build multi-digit numbers
        if (char >= '0' && char <= '9') {
            num = num * 10 + parseInt(char);
        }

        // Process operator (or end of string)
        if ((char !== ' ' && isNaN(char)) || i === s.length - 1) {
            if (operator === '+') {
                stack.push(num);
            } else if (operator === '-') {
                stack.push(-num);
            } else if (operator === '*') {
                stack.push(stack.pop() * num);
            } else if (operator === '/') {
                // Truncate toward zero
                const top = stack.pop();
                stack.push(Math.trunc(top / num));
            }

            // Update operator for next iteration
            operator = char;
            num = 0;
        }
    }

    // Sum all values in stack
    return stack.reduce((sum, val) => sum + val, 0);
}

/**
 * Test cases for Problem 227: Basic Calculator Ii
 */
function testSolution() {
    console.log('Testing 227. Basic Calculator Ii');

    // Test case 1: Mixed operators
    const result1 = solve("3+2*2");
    const expected1 = 7;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Spaces in expression
    const result2 = solve(" 3/2 ");
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Complex expression
    const result3 = solve(" 3+5 / 2 ");
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Multiple operations
    const result4 = solve("14-3/2");
    const expected4 = 13;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 227. Basic Calculator Ii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 227. Basic Calculator Ii ===');
    console.log('Category: Stack');
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
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
