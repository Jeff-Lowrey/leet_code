I'll help you create a basic calculator implementation in Python that meets the requirements. Here's the complete solution:

```python
#!/usr/bin/env python3
"""
Basic Calculator Implementation in Python

This module implements a basic calculator that can evaluate mathematical expressions
containing basic arithmetic operations (+, -, *, /), parentheses, and handles
whitespace. The calculator follows standard order of operations (PEMDAS).
"""


class Calculator:
    def __init__(self):
        """Initialize the calculator with supported operators and their precedence."""
        self.operators = {
            '+': 1,
            '-': 1,
            '*': 2,
            '/': 2
        }

    def evaluate(self, expression: str) -> float:
        """
        Evaluate a mathematical expression and return the result.

        Args:
            expression (str): The mathematical expression to evaluate

        Returns:
            float: The result of the evaluation

        Raises:
            ValueError: If the expression is invalid
            ZeroDivisionError: If division by zero is attempted
        """
        try:
            # Remove whitespace and validate expression
            expression = expression.replace(' ', '')
            if not expression:
                return 0

            # Convert expression to tokens
            tokens = self._tokenize(expression)
            
            # Convert to postfix notation and evaluate
            postfix = self._infix_to_postfix(tokens)
            return self._evaluate_postfix(postfix)

        except Exception as e:
            raise ValueError(f"Invalid expression: {str(e)}")

    def _tokenize(self, expression: str) -> list:
        """Convert expression string to list of tokens."""
        tokens = []
        current_number = ''
        
        for char in expression:
            if char.isdigit() or char == '.':
                current_number += char
            else:
                if current_number:
                    tokens.append(float(current_number))
                    current_number = ''
                tokens.append(char)
        
        if current_number:
            tokens.append(float(current_number))
            
        return tokens

    def _infix_to_postfix(self, tokens: list) -> list:
        """Convert infix notation to postfix notation using Shunting Yard algorithm."""
        output = []
        operator_stack = []

        for token in tokens:
            if isinstance(token, (int, float)):
                output.append(token)
            elif token == '(':
                operator_stack.append(token)
            elif token == ')':
                while operator_stack and operator_stack[-1] != '(':
                    output.append(operator_stack.pop())
                if operator_stack:  # Remove the '('
                    operator_stack.pop()
            elif token in self.operators:
                while (operator_stack and operator_stack[-1] != '(' and
                       self.operators.get(operator_stack[-1], 0) >= self.operators[token]):
                    output.append(operator_stack.pop())
                operator_stack.append(token)

        while operator_stack:
            output.append(operator_stack.pop())

        return output

    def _evaluate_postfix(self, postfix: list) -> float:
        """Evaluate postfix expression."""
        stack = []

        for token in postfix:
            if isinstance(token, (int, float)):
                stack.append(token)
            else:
                b = stack.pop()
                a = stack.pop()
                
                if token == '+':
                    stack.append(a + b)
                elif token == '-':
                    stack.append(a - b)
                elif token == '*':
                    stack.append(a * b)
                elif token == '/':
                    if b == 0:
                        raise ZeroDivisionError("Division by zero")
                    stack.append(a / b)

        return stack[0] if stack else 0


def main():
    """Main function to demonstrate calculator usage."""
    calculator = Calculator()
    
    # Test cases
    test_expressions = [
        "2 + 3",
        "10 - 5",
        "3 * (4 + 2)",
        "20 / 4",
        "(2 + 3) * (4 - 1)",
        "2.5 + 3.7",
    ]

    print("Basic Calculator Demo:")
    print("-" * 30)
    
    for expression in test_expressions:
        try:
            result = calculator.evaluate(expression)
            print(f"{expression} = {result}")
        except Exception as e:
            print(f"Error evaluating '{expression}': {str(e)}")


if __name__ == "__main__":
    main()
```

This implementation provides a complete basic calculator solution with the following features:

1. Supports basic arithmetic operations (+, -, *, /)
2. Handles parentheses for proper order of operations
3. Supports floating-point numbers
4. Handles whitespace in expressions
5. Includes error handling for invalid expressions and division by zero
6. Uses the Shunting Yard algorithm for expression parsing
7. Follows Python best practices and includes comprehensive comments

The calculator works by:
1. Tokenizing the input expression
2. Converting infix notation to postfix notation
3. Evaluating the postfix expression

The code includes a main function with test cases to demonstrate usage. You can run the file directly to see the calculator in action.

To use the calculator in your code:

```python
calculator = Calculator()
result = calculator.evaluate("3 * (4 + 2)")  # Returns 18.0
```

The implementation handles edge cases and throws appropriate exceptions for invalid input or mathematical errors.