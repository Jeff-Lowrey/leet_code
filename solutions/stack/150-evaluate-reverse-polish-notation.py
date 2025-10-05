I'll help you create a solution for evaluating Reverse Polish Notation (RPN) expressions in Python. I'll create a complete implementation that meets the requirements and handles edge cases appropriately.

```python
#!/usr/bin/env python3
"""
Solution for evaluating Reverse Polish Notation (RPN) expressions.

This implementation evaluates mathematical expressions given in RPN format,
where operators follow their operands. For example: ["2", "1", "+", "3", "*"]
represents (2 + 1) * 3 = 9

Author: Assistant
"""

from typing import List


class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        """
        Evaluates an arithmetic expression in Reverse Polish Notation.
        
        Args:
            tokens: List of strings representing numbers and operators in RPN format
            
        Returns:
            int: Result of evaluating the RPN expression
            
        Raises:
            ValueError: If the expression is invalid or division by zero is attempted
        """
        if not tokens:
            return 0
        
        # Stack to store operands
        stack = []
        
        # Define operations
        operations = {
            '+': lambda x, y: x + y,
            '-': lambda x, y: x - y,
            '*': lambda x, y: x * y,
            '/': lambda x, y: int(x / y)  # Integer division as per requirements
        }
        
        try:
            for token in tokens:
                if token in operations:
                    # If token is an operator, pop two operands and apply operation
                    if len(stack) < 2:
                        raise ValueError("Invalid RPN expression: insufficient operands")
                    
                    # Pop operands in correct order (second operand first)
                    operand2 = stack.pop()
                    operand1 = stack.pop()
                    
                    # Perform operation and push result back to stack
                    result = operations[token](operand1, operand2)
                    stack.append(result)
                else:
                    # If token is a number, convert to integer and push to stack
                    stack.append(int(token))
            
            # After processing all tokens, stack should have exactly one value
            if len(stack) != 1:
                raise ValueError("Invalid RPN expression: too many operands")
            
            return stack[0]
            
        except ZeroDivisionError:
            raise ValueError("Division by zero is not allowed")
        except ValueError as e:
            if str(e).startswith("Invalid RPN"):
                raise
            raise ValueError("Invalid token in expression")


def main():
    """
    Main function to demonstrate the RPN evaluator with example cases.
    """
    solution = Solution()
    
    # Test cases
    test_cases = [
        ["2", "1", "+", "3", "*"],
        ["4", "13", "5", "/", "+"],
        ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
    ]
    
    # Run test cases
    for tokens in test_cases:
        try:
            result = solution.evalRPN(tokens)
            print(f"Expression: {tokens}")
            print(f"Result: {result}\n")
        except ValueError as e:
            print(f"Error evaluating {tokens}: {str(e)}\n")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A complete `Solution` class with the `evalRPN` method that evaluates RPN expressions
2. Proper type hints and documentation
3. Comprehensive error handling for various edge cases:
   - Division by zero
   - Invalid expressions (too many/few operands)
   - Invalid tokens
4. A dictionary of lambda functions for operations
5. A main function with example test cases
6. Clear comments explaining the implementation
7. Proper Python conventions and best practices

The solution uses a stack-based approach, which is the standard way to evaluate RPN expressions:
1. Numbers are pushed onto the stack
2. When an operator is encountered, the appropriate number of operands are popped
3. The operation is performed and the result is pushed back onto the stack
4. The final result is the only value remaining on the stack

The code handles all the required operations (+, -, *, /) and performs integer division as specified in typical RPN calculator requirements.

You can run this file directly to see it process the example test cases, or import the Solution class to use it in other code.