/**
 * 150. Evaluate Reverse Polish Notation
 * Medium
 *
 * Evaluates a Reverse Polish Notation (RPN) expression LeetCode 150 - Evaluate Reverse Polish Notation @param {string[]} tokens - Array of strings representing the RPN expression @return {number} - Result of evaluating the expression
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Evaluate Reverse Polish Notation is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Evaluates a Reverse Polish Notation (RPN) expression
 * LeetCode 150 - Evaluate Reverse Polish Notation
 * 
 * @param {string[]} tokens - Array of strings representing the RPN expression
 * @return {number} - Result of evaluating the expression
 */
function evalRPN(tokens) {
    // Edge case: empty input
    if (!tokens || tokens.length === 0) {
        return 0;
    }

    // Stack to keep track of numbers
    const stack = [];
    
    // Set of valid operators
    const operators = new Set(['+', '-', '*', '/']);

    // Process each token
    for (const token of tokens) {
        if (operators.has(token)) {
            // If token is an operator, pop two numbers and perform operation
            if (stack.length < 2) {
                throw new Error('Invalid RPN expression: insufficient operands');
            }
            
            const num2 = stack.pop();
            const num1 = stack.pop();
            
            // Perform the operation and push result back to stack
            switch (token) {
                case '+':
                    stack.push(num1 + num2);
                    break;
                case '-':
                    stack.push(num1 - num2);
                    break;
                case '*':
                    stack.push(num1 * num2);
                    break;
                case '/':
                    // Handle division by zero
                    if (num2 === 0) {
                        throw new Error('Division by zero');
                    }
                    // For division, we need to truncate toward zero
                    stack.push(Math.trunc(num1 / num2));
                    break;
            }
        } else {
            // If token is a number, push it to the stack
            stack.push(Number(token));
        }
    }

    // After processing all tokens, stack should have exactly one number
    if (stack.length !== 1) {
        throw new Error('Invalid RPN expression: too many operands');
    }

    return stack[0];
}

// Example test cases
const testCases = [
    {
        input: ["2", "1", "+", "3", "*"],
        expected: 9,
        description: "Basic arithmetic: (2 + 1) * 3 = 9"
    },
    {
        input: ["4", "13", "5", "/", "+"],
        expected: 6,
        description: "Division with truncation: 4 + (13 / 5) = 6"
    },
    {
        input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
        expected: 22,
        description: "Complex expression"
    }
];

// Run test cases
function runTests() {
    for (const test of testCases) {
        try {
            const result = evalRPN(test.input);
            console.log(`Test: ${test.description}`);
            console.log(`Input: ${test.input.join(' ')}`);
            console.log(`Expected: ${test.expected}`);
            console.log(`Got: ${result}`);
            console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
            console.log('---');
        } catch (error) {
            console.error(`Error in test case: ${error.message}`);
        }
    }
}

// Export the function for use in other modules
module.exports = evalRPN;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}