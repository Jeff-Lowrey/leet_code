/**
 * 227. Basic Calculator Ii
 * Medium
 *
 * Basic Calculator II - JavaScript Implementation This calculator evaluates a string expression containing basic arithmetic operations Supports: addition (+), subtraction (-), multiplication ( ), and division (/) Numbers are non-negative integers The expression contains only numbers, operators, and spaces
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Basic Calculator Ii is to understand the core problem pattern
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
 * Basic Calculator II - JavaScript Implementation
 * This calculator evaluates a string expression containing basic arithmetic operations
 * Supports: addition (+), subtraction (-), multiplication (*), and division (/)
 * Numbers are non-negative integers
 * The expression contains only numbers, operators, and spaces
 */

/**
 * @param {string} s - The input expression string
 * @return {number} - The calculated result
 */
function calculate(s) {
    // Handle empty or invalid input
    if (!s || typeof s !== 'string') {
        return 0;
    }

    // Remove all spaces from the input string
    s = s.replace(/\s/g, '');

    // Initialize variables
    const stack = [];
    let currentNumber = 0;
    let currentOperator = '+';

    // Process each character in the string
    for (let i = 0; i <= s.length; i++) {
        const currentChar = s[i];

        // Build number from consecutive digits
        if (currentChar >= '0' && currentChar <= '9') {
            currentNumber = (currentNumber * 10) + parseInt(currentChar);
            continue;
        }

        // Process operator or end of string
        if (isOperator(currentChar) || i === s.length) {
            // Apply previous operator
            switch (currentOperator) {
                case '+':
                    stack.push(currentNumber);
                    break;
                case '-':
                    stack.push(-currentNumber);
                    break;
                case '*':
                    stack.push(stack.pop() * currentNumber);
                    break;
                case '/':
                    // Handle division with proper rounding for negative numbers
                    const dividend = stack.pop();
                    const quotient = dividend / currentNumber;
                    stack.push(quotient > 0 ? Math.floor(quotient) : Math.ceil(quotient));
                    break;
            }

            // Reset number and update operator
            currentNumber = 0;
            currentOperator = currentChar;
        }
    }

    // Sum up all numbers in the stack
    return stack.reduce((sum, num) => sum + num, 0);
}

/**
 * Helper function to check if a character is an operator
 * @param {string} char - Character to check
 * @return {boolean} - True if character is an operator
 */
function isOperator(char) {
    return char === '+' || char === '-' || char === '*' || char === '/';
}

// Export the function for use in other modules
module.exports = calculate;

// Example usage and test cases
if (require.main === module) {
    const testCases = [
        "3+2*2",           // Expected: 7
        " 3/2 ",          // Expected: 1
        " 3+5 / 2 ",      // Expected: 5
        "14-3/2",         // Expected: 13
        "1+2*5/3+6/4"     // Expected: 4
    ];

    testCases.forEach(test => {
        console.log(`Input: "${test}"`);
        console.log(`Result: ${calculate(test)}\n`);
    });
}