"""
# Difficulty: Medium

# 150. Evaluate Reverse Polish Notation

You are given an array of strings tokens that represents an arithmetic expression
in Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:
- The valid operators are '+', '-', '*', and '/'.
- Each operand may be an integer or another expression.
- The division between two integers always truncates toward zero.
- There will not be any division by zero.
- The input represents a valid arithmetic expression in reverse polish notation.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["2","1","+","3","*"]</dd>
<dt>Output:</dt>
<dd>9</dd>
<dt>Explanation:</dt>
<dd>Postfix '2 1 + 3 *' evaluates to 9</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Reverse Polish Notation (RPN) is perfect for stack-based evaluation. In RPN,
operators come after their operands, so we can process left-to-right:
push numbers onto stack, and when we see an operator, pop two operands,
compute, and push result back.

### APPROACH:
1. **Initialize stack**: Empty stack to store operands
2. **Process tokens**: Iterate through each token
3. **Handle numbers**: Push numbers onto stack
4. **Handle operators**: Pop two operands, compute, push result
5. **Return result**: Final stack should have one element (the answer)

### WHY THIS WORKS:
- RPN guarantees operators have their operands available on stack
- Stack's LIFO property matches RPN's evaluation order
- Each operator consumes exactly two operands and produces one result

### EXAMPLE WALKTHROUGH:
```
Input: ["2","1","+","3","*"]
Stack operations:
"2" -> [2]
"1" -> [2,1]
"+" -> [3]        (pop 1,2; compute 2+1=3; push 3)
"3" -> [3,3]
"*" -> [9]        (pop 3,3; compute 3*3=9; push 9)
Output: 9
```

### TIME COMPLEXITY:
O(n)
Where n is the number of tokens - process each token once

### SPACE COMPLEXITY:
O(n)
Stack can hold up to n/2 operands in worst case

### EDGE CASES:
- Single number: return that number
- Division truncating toward zero
- Negative operands and results

</details>
"""


from typing import Any

class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        """
        Evaluate Reverse Polish Notation expression using stack.

        Args:
            tokens: List of strings representing RPN expression

        Returns:
            Integer result of the expression

        Time Complexity: O(n) - process each token once
        Space Complexity: O(n) - stack storage
        """
        stack: list[Any] = []
        operators = {"+", "-", "*", "/"}

        for token in tokens:
            if token in operators:
                # Pop two operands (order matters for - and /)
                b = stack.pop()  # Second operand
                a = stack.pop()  # First operand

                # Perform operation
                if token == "+":
                    result = a + b
                elif token == "-":
                    result = a - b
                elif token == "*":
                    result = a * b
                elif token == "/":
                    # Division truncates toward zero
                    result = int(a / b)

                stack.append(result)
            else:
                # Token is a number
                stack.append(int(token))

        # Stack should have exactly one element - the final result
        return stack[0]

    def evalRPNOptimized(self, tokens: list[str]) -> int:
        """
        Alternative implementation with operator dictionary.

        Args:
            tokens: List of strings representing RPN expression

        Returns:
            Integer result of the expression
        """
        stack: list[Any] = []

        # Define operations as lambda functions
        operations = {
            "+": lambda a, b: a + b,
            "-": lambda a, b: a - b,
            "*": lambda a, b: a * b,
            "/": lambda a, b: int(a / b),  # Truncate toward zero
        }

        for token in tokens:
            if token in operations:
                b = stack.pop()
                a = stack.pop()
                stack.append(operations[token](a, b))
            else:
                stack.append(int(token))

        return stack[0]


def test_solution() -> None:
    """Test cases for Problem 150."""
    solution = Solution()

    # Test case 1: Basic expression
    result1 = solution.evalRPN(["2", "1", "+", "3", "*"])
    expected1 = 9
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Division
    result2 = solution.evalRPN(["4", "13", "5", "/", "+"])
    expected2 = 6  # 4 + (13/5) = 4 + 2 = 6
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Complex expression
    result3 = solution.evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
    expected3 = 22
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single number
    result4 = solution.evalRPN(["42"])
    expected4 = 42
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Negative numbers
    result5 = solution.evalRPN(["-1", "-2", "+"])
    expected5 = -3
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Division with negative result
    result6 = solution.evalRPN(["1", "-1", "/"])
    expected6 = -1
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test optimized version
    result7 = solution.evalRPNOptimized(["2", "1", "+", "3", "*"])
    expected7 = 9
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 150. Evaluate Reverse Polish Notation ===")
    print(f"evalRPN(['2','1','+','3','*']) -> {solution.evalRPN(['2', '1', '+', '3', '*'])}")
    print(f"evalRPN(['4','13','5','/','+']) -> {solution.evalRPN(['4', '13', '5', '/', '+'])}")
    print(f"evalRPN(['42']) -> {solution.evalRPN(['42'])}")
