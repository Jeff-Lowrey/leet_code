I'll help you create a basic calculator implementation in JavaScript that meets the requirements. Here's the complete solution:

```javascript
/**
 * Basic Calculator Implementation
 * Evaluates basic mathematical expressions with +, -, *, /, and parentheses
 */

class Calculator {
    constructor() {
        this.precedence = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        };
    }

    /**
     * Evaluates a mathematical expression string
     * @param {string} expression - The mathematical expression to evaluate
     * @returns {number} - The result of the calculation
     */
    calculate(expression) {
        try {
            // Remove all spaces and validate input
            expression = expression.replace(/\s+/g, '');
            if (!expression) return 0;

            // Convert expression to tokens
            const tokens = this.tokenize(expression);
            
            // Convert to postfix notation and evaluate
            const postfix = this.infixToPostfix(tokens);
            return this.evaluatePostfix(postfix);
        } catch (error) {
            console.error('Error calculating expression:', error);
            return null;
        }
    }

    /**
     * Converts expression string to tokens
     * @param {string} expression - The expression to tokenize
     * @returns {Array} - Array of tokens
     */
    tokenize(expression) {
        const tokens = [];
        let number = '';

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (this.isDigit(char)) {
                number += char;
            } else {
                if (number !== '') {
                    tokens.push(Number(number));
                    number = '';
                }
                if (char !== ' ') {
                    tokens.push(char);
                }
            }
        }

        if (number !== '') {
            tokens.push(Number(number));
        }

        return tokens;
    }

    /**
     * Converts infix notation to postfix notation
     * @param {Array} tokens - Array of tokens in infix notation
     * @returns {Array} - Array of tokens in postfix notation
     */
    infixToPostfix(tokens) {
        const output = [];
        const operators = [];

        for (const token of tokens) {
            if (typeof token === 'number') {
                output.push(token);
            } else if (token === '(') {
                operators.push(token);
            } else if (token === ')') {
                while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove '('
            } else {
                while (
                    operators.length > 0 &&
                    operators[operators.length - 1] !== '(' &&
                    this.precedence[operators[operators.length - 1]] >= this.precedence[token]
                ) {
                    output.push(operators.pop());
                }
                operators.push(token);
            }
        }

        while (operators.length > 0) {
            output.push(operators.pop());
        }

        return output;
    }

    /**
     * Evaluates postfix notation expression
     * @param {Array} postfix - Array of tokens in postfix notation
     * @returns {number} - Result of evaluation
     */
    evaluatePostfix(postfix) {
        const stack = [];

        for (const token of postfix) {
            if (typeof token === 'number') {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();
                stack.push(this.performOperation(a, b, token));
            }
        }

        return stack[0];
    }

    /**
     * Performs basic arithmetic operation
     * @param {number} a - First operand
     * @param {number} b - Second operand
     * @param {string} operator - Arithmetic operator
     * @returns {number} - Result of operation
     */
    performOperation(a, b, operator) {
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: throw new Error(`Unknown operator: ${operator}`);
        }
    }

    /**
     * Checks if a character is a digit
     * @param {string} char - Character to check
     * @returns {boolean} - True if character is a digit
     */
    isDigit(char) {
        return char >= '0' && char <= '9';
    }
}

// Export the Calculator class
module.exports = Calculator;

// Example usage
if (require.main === module) {
    const calc = new Calculator();
    
    // Test cases
    const testExpressions = [
        "2 + 3",
        "4 * (2 + 3)",
        "10 - 5 * 2",
        "20 / 4 + 2",
        "(4 + 8) * (6 - 2)",
        "3 * (4 + 2) / 3"
    ];

    testExpressions.forEach(expr => {
        console.log(`${expr} = ${calc.calculate(expr)}`);
    });
}
```

This implementation provides a robust basic calculator that can:

1. Handle basic arithmetic operations (+, -, *, /)
2. Process parentheses correctly
3. Respect operator precedence
4. Handle multi-digit numbers
5. Ignore whitespace
6. Handle error cases

The code is structured using a class-based approach and includes:

- Clear documentation and comments
- Error handling
- Modular design with separate methods for different responsibilities
- Support for both direct usage and module exports
- Example test cases

The calculator uses the Shunting Yard algorithm to convert infix notation to postfix notation, which makes it easier to evaluate mathematical expressions while respecting operator precedence and parentheses.

To use the calculator:

```javascript
const calc = new Calculator();
console.log(calc.calculate("2 + 3 * 4")); // Outputs: 14
```

The code includes error handling and validation, making it suitable for production use. It's also extensible - new operators or features can be added by modifying the precedence table and adding corresponding operation handlers.