"""
# Difficulty: Medium

# 227. Basic Calculator Ii

Given a string s which represents an expression, evaluate this expression and return its value.

The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2^31, 2^31 - 1].

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"3+2*2"</dd>
<dt>Output:</dt>
<dd>7</dd>
<dt>Explanation:</dt>
<dd>Expression '3+2*2' evaluates to 7</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Stack Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Iterative Solution
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use stack to handle operators. Scan number by number. For +/- push to stack. For *// pop, compute with previous, push result. Finally sum stack for result.

### APPROACH:
1. **Initialize variables**: Set stack = [], num = 0, sign = '+'
2. **Iterate through string**: For i, char in enumerate(s)
3. **Build number**: If char.isdigit(), num = num * 10 + int(char)
4. **Process operator**: If char in '+-*/' or last character
5. **Handle signs**: If sign == '+', push num; if '-', push -num; if '*', push stack.pop() * num; if '/', push int(stack.pop() / num)
6. **Update sign**: Set sign = char, reset num = 0
7. **Sum stack**: Return sum(stack) as final result

### WHY THIS WORKS:
- Stack handles operator precedence: */ evaluated immediately, +- pushed to stack
- Track last operator, current number being built
- When + or -, push to stack (signed number)
- When * or /, pop and compute with current number, push result
- Sum stack at end for final result
- O(n) time: single pass, O(n) space for stack

### EXAMPLE WALKTHROUGH:
```
Input: s = "3+2*2"
Step 1: Parse and evaluate
  num=3, op='+', stack=[3]
  num=2, op='*', stack=[3,2]
  num=2, op=None, stack=[3,4] (multiply 2*2)

Step 2: Sum stack
  result = 3+4 = 7

Output: 7
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


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
        stack: list[Any] = []
        curr_num = 0
        last_operator = "+"

        # Process each character in the string
        for i, char in enumerate(s):
            # Build number from consecutive digits
            if char.isdigit():
                curr_num = curr_num * 10 + int(char)

            # Process operator or end of string
            if (not char.isdigit() and char != " ") or i == len(s) - 1:
                # Handle previous operator
                if last_operator == "+":
                    stack.append(curr_num)
                elif last_operator == "-":
                    stack.append(-curr_num)
                elif last_operator == "*":
                    stack.append(stack.pop() * curr_num)
                elif last_operator == "/":
                    # Handle division according to problem requirements
                    # For negative numbers, truncate toward zero
                    prev_num = stack.pop()
                    if prev_num < 0:
                        stack.append(-(abs(prev_num) // curr_num))
                    else:
                        stack.append(prev_num // curr_num)

                # Reset current number and update last operator
                curr_num = 0
                if char != " ":
                    last_operator = char

        # Sum up all numbers in the stack
        return sum(stack)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.calculate("3+2*2")
    expected = 7
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.calculate("")
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single number
    result = solution.calculate("42")
    expected = 42
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 227. Basic Calculator Ii")
