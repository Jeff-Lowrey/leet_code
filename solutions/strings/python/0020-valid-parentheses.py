"""
# 20. Valid Parentheses

# Difficulty: Easy

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "()[]{}"</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>All brackets are properly matched and in correct order</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Stack, String Matching
**Data Structures**: Stack
**Patterns**: Stack Pattern, Bracket Matching
**Time Complexity**: O(n)
**Space Complexity**: O(n)

### INTUITION:
Bracket matching follows LIFO (Last In First Out) pattern - the most recent
opening bracket should be closed first. A stack is perfect for this.

### APPROACH:
1. **Use stack**: Push opening brackets onto stack
2. **Match closing brackets**: When encountering closing bracket, check if
   it matches the top of stack (most recent opening bracket)
3. **Final check**: Stack should be empty if all brackets matched
4. **Early exit**: If closing bracket doesn't match or stack is empty, invalid

### WHY THIS WORKS:
The stack maintains the order of unclosed opening brackets. Each closing bracket
must match the most recent unclosed opening bracket (top of stack). If all
brackets are properly matched, the stack will be empty at the end.

### EXAMPLE WALKTHROUGH:
```
Input: s = "({[]})"

Step 1: '(' → push to stack: ['(']
Step 2: '{' → push to stack: ['(', '{']
Step 3: '[' → push to stack: ['(', '{', '[']
Step 4: ']' → matches '[', pop: ['(', '{']
Step 5: '}' → matches '{', pop: ['(']
Step 6: ')' → matches '(', pop: []

Stack empty → true
```

### TIME COMPLEXITY:
O(n) where n is the length of the string

### SPACE COMPLEXITY:
O(n) for the stack in worst case (all opening brackets)

### EDGE CASES:
- Empty string: valid (true)
- Single bracket: invalid (false)
- Only opening brackets: invalid (false)
- Only closing brackets: invalid (false)
- Mismatched types: e.g., "([)]" → false

</details>
"""


class Solution:
    def isValid(self, s: str) -> bool:
        """
        Check if parentheses are valid using stack.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Mapping of closing to opening brackets
        bracket_map = {")": "(", "}": "{", "]": "["}
        stack: list[str] = []

        for char in s:
            # If it's a closing bracket
            if char in bracket_map:
                # Check if stack has matching opening bracket
                if not stack or stack[-1] != bracket_map[char]:
                    return False
                stack.pop()
            else:
                # It's an opening bracket, push to stack
                stack.append(char)

        # Valid if all brackets matched (stack is empty)
        return len(stack) == 0

    def isValidAlternative(self, s: str) -> bool:
        """
        Alternative implementation with explicit opening check.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack: list[str] = []
        opening = {"(", "{", "["}
        pairs = {"(": ")", "{": "}", "[": "]"}

        for char in s:
            if char in opening:
                stack.append(char)
            else:
                # Closing bracket
                if not stack:
                    return False
                if pairs[stack[-1]] != char:
                    return False
                stack.pop()

        return len(stack) == 0


def test_solution() -> None:
    """Test cases for 20. Valid Parentheses."""
    solution = Solution()

    # Test cases
    assert solution.isValid("()") is True
    assert solution.isValid("()[]{}") is True
    assert solution.isValid("(]") is False
    assert solution.isValid("([)]") is False
    assert solution.isValid("{[]}") is True
    assert solution.isValid("") is True
    assert solution.isValid("(") is False
    assert solution.isValid(")") is False
    assert solution.isValid("((") is False
    assert solution.isValid("()))") is False

    # Test alternative implementation
    assert solution.isValidAlternative("()[]{}") is True
    assert solution.isValidAlternative("([)]") is False

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 20. Valid Parentheses ===")
    test_strings = [
        "()",
        "()[]{}",
        "(]",
        "([)]",
        "{[]}",
        "((()))",
        "((())",
    ]

    for test_str in test_strings:
        result = solution.isValid(test_str)
        print(f'"{test_str}": {result}')
