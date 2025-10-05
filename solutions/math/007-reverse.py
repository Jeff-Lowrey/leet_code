I'll help you create a solution for the Reverse Integer problem that meets all the requirements. Here's the complete implementation:

```python
#!/usr/bin/env python3
"""
Reverse Integer Implementation

This module provides a solution for reversing an integer while handling
overflow cases and maintaining the sign of the original number.

Example:
    Input: 123
    Output: 321
    
    Input: -123
    Output: -321
    
    Input: 120
    Output: 21
"""


class Solution:
    def reverse(self, x: int) -> int:
        """
        Reverses the digits of an integer while preserving its sign.
        
        Args:
            x (int): The integer to be reversed
            
        Returns:
            int: The reversed integer, or 0 if the result would overflow
            
        Note:
            - Handles both positive and negative integers
            - Returns 0 if the reversed number exceeds 32-bit integer range
            - Removes leading zeros automatically
        """
        # Handle the sign separately
        sign = -1 if x < 0 else 1
        
        # Convert to positive number and to string
        x_str = str(abs(x))
        
        # Reverse the string
        reversed_str = x_str[::-1]
        
        # Convert back to integer with original sign
        result = sign * int(reversed_str)
        
        # Check for 32-bit integer overflow
        if result < -2**31 or result > 2**31 - 1:
            return 0
            
        return result


def test_reverse_integer():
    """
    Test function to verify the reverse integer implementation.
    """
    solution = Solution()
    
    # Test cases
    test_cases = [
        (123, 321),
        (-123, -321),
        (120, 21),
        (0, 0),
        (1534236469, 0),  # Should return 0 due to overflow
        (-2147483648, 0)  # Should return 0 due to overflow
    ]
    
    # Run tests
    for input_num, expected in test_cases:
        result = solution.reverse(input_num)
        assert result == expected, f"Test failed for input {input_num}. Expected {expected}, got {result}"
        print(f"Input: {input_num}, Output: {result}")


if __name__ == "__main__":
    # Run test cases
    test_reverse_integer()
    print("All tests passed successfully!")
```

This implementation includes:

1. A clean and efficient solution using string manipulation
2. Proper handling of negative numbers
3. Overflow checking for 32-bit integers
4. Comprehensive test cases
5. Clear documentation and comments
6. Proper Python structure with a class-based solution
7. A test function to verify the implementation

The solution handles all edge cases including:
- Negative numbers
- Numbers with trailing zeros
- Zero input
- Numbers that would cause overflow when reversed
- 32-bit integer bounds checking

The code follows Python best practices and conventions, including:
- Proper docstrings
- Type hints
- Clear variable names
- Consistent formatting
- Modular structure

To use this code, you can either:
1. Import the Solution class and use it in your code
2. Run the file directly to execute the test cases

The implementation is efficient and easy to understand, making it suitable for both production use and educational purposes.