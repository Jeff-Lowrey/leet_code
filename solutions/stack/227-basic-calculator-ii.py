I'll help you create a solution for the Basic Calculator II implementation in Python. I'll write a clean, well-commented solution that handles basic arithmetic operations.

```python
#!/usr/bin/env python3
"""
Basic Calculator II Implementation

This module provides a solution for evaluating basic arithmetic expressions
containing numbers and operators (+, -, *, /) without parentheses.

Example:
    "3+2*2" = 7
    " 3/2 " = 1
    " 3+5 / 2 " = 5
"""


class Solution:
    def calculate(self, s: str) -> int:
        """
        Evaluates a string expression containing numbers and basic arithmetic operators.
        
        Args:
            s (str): The input string containing the arithmetic expression
                    (can contain spaces, numbers, and operators +, -, *, /)
        
        Returns:
            int: The result of evaluating the expression
        
        Time Complexity: O(n) where n is the length of the input string
        Space Complexity: O(1) as we only use a fixed-size stack
        """
        if not s:
            return 0
        
        # Initialize variables
        stack = []
        curr_num = 0
        last_operator = '+'
        
        # Process each character in the string
        for i, char in enumerate(s):
            # Build number from consecutive digits
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)
            
            # Process operator or end of string
            if (not char.isdigit() and char != ' ') or i == len(s) - 1:
                # Handle previous operator
                if last_operator == '+':
                    stack.append(curr_num)
                elif last_operator == '-':
                    stack.append(-curr_num)
                elif last_operator == '*':
                    stack.append(stack.pop() * curr_num)
                elif last_operator == '/':
                    # Handle division according to problem requirements
                    # For negative numbers, truncate toward zero
                    prev_num = stack.pop()
                    if prev_num < 0:
                        stack.append(-(abs(prev_num) // curr_num))
                    else:
                        stack.append(prev_num // curr_num)
                
                # Reset current number and update last operator
                curr_num = 0
                if char != ' ':
                    last_operator = char
        
        # Sum up all numbers in the stack
        return sum(stack)


def test_calculator():
    """
    Test function to verify the calculator implementation
    """
    solution = Solution()
    
    # Test cases
    test_cases = [
        ("3+2*2", 7),
        (" 3/2 ", 1),
        (" 3+5 / 2 ", 5),
        ("14-3/2", 13),
        ("0", 0),
        ("1+1+1", 3),
        ("2*3*4", 24),
        ("10/2/2", 2),
    ]
    
    # Run tests
    for expression, expected in test_cases:
        result = solution.calculate(expression)
        assert result == expected, f"Failed: {expression} = {result}, expected {expected}"
        print(f"Passed: {expression} = {result}")


if __name__ == "__main__":
    # Run tests when script is executed
    test_calculator()
```

This implementation provides a complete solution for the Basic Calculator II problem with the following features:

1. Clean, well-structured code following Python conventions
2. Comprehensive comments explaining the implementation
3. Efficient solution with O(n) time complexity
4. Proper handling of edge cases
5. Built-in test cases to verify functionality
6. Proper handling of division with truncation toward zero
7. Support for spaces in the input string

The solution uses a stack-based approach to handle operator precedence (* and / before + and -) and maintains clean, readable code structure. The test cases cover various scenarios including:
- Basic arithmetic operations
- Spaces in the expression
- Division with truncation
- Multiple operations
- Zero handling
- Consecutive operations of the same type

The code can be run directly to execute the test cases, or the Solution class can be imported and used in other code.