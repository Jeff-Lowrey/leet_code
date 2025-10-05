I'll help you create a solution for the Basic Calculator II implementation in JavaScript. I'll write a complete solution with comments and proper error handling.

```javascript
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
```

This implementation provides a complete solution for the Basic Calculator II problem with the following features:

1. **Clean Code Structure**: The code is well-organized with clear function definitions and comments.

2. **Error Handling**: The solution handles edge cases like empty strings and invalid input.

3. **Efficient Algorithm**: Uses a stack-based approach to handle operator precedence.

4. **Documentation**: Includes detailed comments explaining the implementation and function purposes.

5. **Testing**: Includes example test cases that can be run directly.

6. **Modularity**: The code is structured to be both usable as a module and runnable directly.

The calculator supports:
- Basic arithmetic operations (+, -, *, /)
- Proper operator precedence
- Handling of spaces in the input
- Integer division with proper rounding
- Non-negative integer operands

To use this code, you can either:
1. Import it as a module in another file
2. Run it directly to see the test cases in action

The implementation follows JavaScript best practices and conventions, making it maintainable and readable.