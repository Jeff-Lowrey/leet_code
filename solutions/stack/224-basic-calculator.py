"""
# Difficulty: Hard

# 224. Basic Calculator

Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

The expression string contains only '(', ')', '+', '-', non-negative integers and spaces ' '.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"1 + 1"</dd>
<dt>Output:</dt>
<dd>2</dd>
<dt>Explanation:</dt>
<dd>Expression '1+1' evaluates to 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic stack problem for parsing expressions with parentheses. The key insight is to use a stack to save the current state (result and sign) when entering a parenthesized subexpression, then restore it when exiting.

### APPROACH:
1. **Stack for State**: Use stack to save [result, sign] when encountering '('
2. **Parse Numbers**: Build numbers digit by digit as we scan
3. **Handle Operations**: Apply operations (+/-) when we encounter operators or ')'
4. **Parentheses Logic**: Push state on '(', pop and apply on ')'

### WHY THIS WORKS:
- Stack naturally handles nested parentheses
- We maintain running result and current sign
- When we see '(', we start a fresh calculation (subproblem)
- When we see ')', we complete the subproblem and add back to previous result
- Numbers and operators are processed left to right

### EXAMPLE WALKTHROUGH:
```
Input: "1 + 1"
1. num=1, result=0, sign=1
2. '+': result = 0 + 1*1 = 1, sign=1
3. num=1: result = 1 + 1*1 = 2
Output: 2

Input: "2-(1+1)"
1. num=2, result=0, sign=1
2. '-': result = 0 + 2*1 = 2, sign=-1
3. '(': push [2, -1], reset result=0, sign=1
4. num=1, result=0, sign=1
5. '+': result = 0 + 1*1 = 1, sign=1
6. num=1: result = 1 + 1*1 = 2
7. ')': pop [2, -1], result = 2 + 2*(-1) = 0
Output: 0
```

### TIME COMPLEXITY:
O(n)
Single pass through the string

### SPACE COMPLEXITY:
O(n)
Stack can grow up to the depth of nested parentheses

### EDGE CASES:
- **No parentheses**: Simple left-to-right evaluation
- **Nested parentheses**: Stack handles multiple levels
- **Spaces in expression**: Skip whitespace during parsing
- **Negative numbers**: Handle with sign tracking
- **Single digit**: Return the digit value

</details>
"""


from typing import Any

class Solution:
    def calculate(self, s: str) -> int:
        """
        Calculate the result of a basic arithmetic expression with parentheses.

        Args:
            s: String containing digits, +, -, (, ), and spaces

        Returns:
            The calculated result

        Time Complexity: O(n) where n is length of string
        Space Complexity: O(n) for stack in worst case (nested parentheses)
        """
        stack: list[Any] = []
        result = 0
        number = 0
        sign = 1  # 1 for positive, -1 for negative

        for char in s:
            if char.isdigit():
                # Build the current number
                number = number * 10 + int(char)

            elif char == "+":
                # Apply the previous number with its sign
                result += sign * number
                number = 0
                sign = 1

            elif char == "-":
                # Apply the previous number with its sign
                result += sign * number
                number = 0
                sign = -1

            elif char == "(":
                # Save current state and start fresh calculation
                stack.append(result)
                stack.append(sign)
                result = 0
                sign = 1

            elif char == ")":
                # Apply the current number
                result += sign * number
                number = 0

                # Pop the sign and previous result
                result *= stack.pop()  # This is the sign before '('
                result += stack.pop()  # This is the result before '('

            # Ignore spaces

        # Apply the last number
        result += sign * number
        return result

    def calculateAlternative(self, s: str) -> int:
        """
        Alternative implementation with explicit result tracking.

        Args:
            s: Expression string

        Returns:
            Calculated result
        """

        def helper(index: int) -> tuple[int, int]:
            """
            Process expression starting from index, return (result, next_index).

            Args:
                index: Starting position in string

            Returns:
                Tuple of (calculated_result, next_index)
            """
            result = 0
            number = 0
            sign = 1

            while index < len(s):
                char = s[index]

                if char.isdigit():
                    number = number * 10 + int(char)

                elif char == "+":
                    result += sign * number
                    number = 0
                    sign = 1

                elif char == "-":
                    result += sign * number
                    number = 0
                    sign = -1

                elif char == "(":
                    # Recursively solve the subproblem
                    sub_result, next_index = helper(index + 1)
                    result += sign * sub_result
                    index = next_index
                    number = 0

                elif char == ")":
                    # End of current subproblem
                    result += sign * number
                    return result, index

                index += 1

            # Apply the last number
            result += sign * number
            return result, index

        return helper(0)[0]

    def calculateSimple(self, s: str) -> int:
        """
        Simplified version for expressions without parentheses.

        Args:
            s: Expression string (no parentheses)

        Returns:
            Calculated result
        """
        result = 0
        number = 0
        sign = 1

        for char in s + "+":  # Add '+' to trigger final calculation
            if char.isdigit():
                number = number * 10 + int(char)
            elif char in "+-":
                result += sign * number
                number = 0
                sign = 1 if char == "+" else -1

        return result


def test_solution() -> None:
    """Test cases for Problem 224."""
    solution = Solution()

    # Test case 1: Simple addition
    result1 = solution.calculate("1 + 1")
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Subtraction
    result2 = solution.calculate(" 2-1 + 2 ")
    expected2 = 3
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Parentheses
    result3 = solution.calculate("(1+(4+5+2)-3)+(6+8)")
    expected3 = 23
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Negative in parentheses
    result4 = solution.calculate("2-(1+1)")
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Nested parentheses
    result5 = solution.calculate("(1+2)-(3-(4-5))")
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single number
    result6 = solution.calculate("123")
    expected6 = 123
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Complex expression
    result7 = solution.calculate("- (3 + (4 + 5))")
    expected7 = -12
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test alternative implementation
    result8 = solution.calculateAlternative("(1+(4+5+2)-3)+(6+8)")
    assert result8 == expected3, f"Alternative: Expected {expected3}, got {result8}"

    # Test simple implementation (no parentheses)
    result9 = solution.calculateSimple("1 + 1")
    assert result9 == expected1, f"Simple: Expected {expected1}, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 224. Basic Calculator ===")

    # Example 1: Simple arithmetic
    expr1 = "1 + 1"
    result1 = solution.calculate(expr1)
    print(f"calculate('{expr1}') -> {result1}")

    # Example 2: With spaces
    expr2 = " 2-1 + 2 "
    result2 = solution.calculate(expr2)
    print(f"calculate('{expr2}') -> {result2}")

    # Example 3: Parentheses
    expr3 = "(1+(4+5+2)-3)+(6+8)"
    result3 = solution.calculate(expr3)
    print(f"calculate('{expr3}') -> {result3}")

    # Example 4: Subtraction with parentheses
    expr4 = "2-(1+1)"
    result4 = solution.calculate(expr4)
    print(f"calculate('{expr4}') -> {result4}")

    # Example 5: Nested parentheses
    expr5 = "(1+2)-(3-(4-5))"
    result5 = solution.calculate(expr5)
    print(f"calculate('{expr5}') -> {result5}")

    print(f"\nStep-by-step for '2-(1+1)':")
    print(f"1. Process '2': result=0, num=2, sign=1")
    print(f"2. Process '-': result=2, sign=-1, num=0")
    print(f"3. Process '(': push [2, -1], reset result=0, sign=1")
    print(f"4. Process '1': num=1")
    print(f"5. Process '+': result=1, sign=1, num=0")
    print(f"6. Process '1': num=1")
    print(f"7. Process ')': result=2, pop sign=-1, pop prev_result=2")
    print(f"8. Final: 2 + 2*(-1) = 0")

    print(f"\nKey insights:")
    print(f"1. Stack saves state when entering parentheses")
    print(f"2. Current result and sign handle immediate calculation")
    print(f"3. Numbers are built digit by digit")
    print(f"4. Operations are applied when seeing next operator or ')'")
    print(f"5. Spaces are ignored during processing")
