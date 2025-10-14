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
 * - **Single number:** Return that number
 * - **Division by zero:** Handle appropriately (should not occur)
 * - **Negative results:** Handle negative numbers
 * - **Order of operands:** Ensure correct subtraction/division order
 * - **Nested operations:** Stack handles complexity
 *
 * </details>
 */

/**
 * Main solution for Problem 150: Evaluate Reverse Polish Notation
 *
 * @param {string[]} tokens - Array of numbers and operators in RPN
 * @return {number} - Evaluated result
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(tokens) {
    const stack = [];
    const operators = new Set(['+', '-', '*', '/']);

    for (const token of tokens) {
        if (operators.has(token)) {
            // Pop two operands (note: order matters for - and /)
            const b = stack.pop();
            const a = stack.pop();

            let result;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    // Truncate toward zero
                    result = Math.trunc(a / b);
                    break;
            }

            stack.push(result);
        } else {
            // It's a number
            stack.push(parseInt(token));
        }
    }

    return stack[0];
}

/**
 * Test cases for Problem 150: Evaluate Reverse Polish Notation
 */
function testSolution() {
    console.log('Testing 150. Evaluate Reverse Polish Notation');

    // Test case 1: Basic expression
    const result1 = solve(["2","1","+","3","*"]);
    const expected1 = 9;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Division with truncation
    const result2 = solve(["4","13","5","/","+"]);
    const expected2 = 6;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Complex expression
    const result3 = solve(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]);
    const expected3 = 22;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Negative division
    const result4 = solve(["4","-2","/"]);
    const expected4 = -2;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 150. Evaluate Reverse Polish Notation!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 150. Evaluate Reverse Polish Notation ===');
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
