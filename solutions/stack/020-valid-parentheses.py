"""
20. Valid Parentheses
# Difficulty: Easy
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic stack problem. When we encounter an opening bracket, we push it onto the stack.
When we encounter a closing bracket, we check if it matches the most recent opening bracket (top of stack).
If all brackets are properly matched, the stack will be empty at the end.

### APPROACH:
1. **Use a stack** to track opening brackets
2. **Push opening brackets** onto the stack
3. **Pop and check** when encountering closing brackets
4. **Validate matching** bracket types
5. **Check empty stack** at the end

### WHY THIS WORKS:
- Stack follows LIFO (Last In, First Out) principle
- This naturally handles the "most recent unmatched opening bracket" requirement
- Each closing bracket must match the most recent opening bracket
- Empty stack at the end means all brackets were properly matched

### TIME COMPLEXITY: O(n)
Single pass through the string

### SPACE COMPLEXITY: O(n)
Stack can contain up to n/2 opening brackets in worst case

### EXAMPLE WALKTHROUGH:
```
Input: s = "([{}])"

Step 1: '(' → push to stack: ['(']
Step 2: '[' → push to stack: ['(', '[']
Step 3: '{' → push to stack: ['(', '[', '{']
Step 4: '}' → pop '{', matches ✓, stack: ['(', '[']
Step 5: ']' → pop '[', matches ✓, stack: ['(']
Step 6: ')' → pop '(', matches ✓, stack: []
Result: Empty stack → True
```

### EDGE CASES:
- Empty string: Valid (return True)
- Single opening bracket: Invalid
- Single closing bracket: Invalid
- Odd length string: Invalid (can't have balanced brackets)
- Wrong order: "([)]" → Invalid

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

Stack-based approach:
1. Create a mapping of closing to opening brackets
2. Use stack to track opening brackets
3. For each character:
   - If opening bracket: push to stack
   - If closing bracket: check if it matches top of stack
4. Return True if stack is empty at the end

Alternative approaches:
- Replace pairs iteratively (less efficient)
- Recursive approach (more complex)

</details>
"""

class Solution:
    def isValid(self, s: str) -> bool:
        """
        Determine if parentheses string is valid using stack approach.

        Args:
            s: String containing only '(', ')', '{', '}', '[', ']'

        Returns:
            True if string has valid parentheses, False otherwise

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Early termination: odd length can't be balanced
        if len(s) % 2 == 1:
            return False

        # Stack to track opening brackets
        stack = []

        # Mapping of closing to opening brackets
        bracket_map = {
            ')': '(',
            '}': '{',
            ']': '['
        }

        for char in s:
            if char in bracket_map:
                # Closing bracket
                if not stack or stack.pop() != bracket_map[char]:
                    return False
            else:
                # Opening bracket
                stack.append(char)

        # Valid if all brackets were matched (empty stack)
        return len(stack) == 0

    def isValidAlternative(self, s: str) -> bool:
        """
        Alternative implementation with explicit opening bracket check.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []
        opening = {'(', '[', '{'}
        pairs = {')': '(', ']': '[', '}': '{'}

        for char in s:
            if char in opening:
                stack.append(char)
            elif char in pairs:
                if not stack or stack.pop() != pairs[char]:
                    return False
            # Ignore other characters (if any)

        return len(stack) == 0

    def isValidIterative(self, s: str) -> bool:
        """
        Alternative iterative replacement approach (less efficient).

        Time Complexity: O(n²) in worst case
        Space Complexity: O(n)
        """
        # Keep replacing valid pairs until no more changes
        while '()' in s or '[]' in s or '{}' in s:
            s = s.replace('()', '').replace('[]', '').replace('{}', '')

        return s == ''

def test_solution():
    """Test cases for Valid Parentheses problem."""
    solution = Solution()

    # Test case 1: Simple valid cases
    assert solution.isValid("()") == True, "Test 1a failed"
    assert solution.isValid("[]") == True, "Test 1b failed"
    assert solution.isValid("{}") == True, "Test 1c failed"

    # Test case 2: Multiple brackets
    assert solution.isValid("()[]{}") == True, "Test 2a failed"
    assert solution.isValid("([{}])") == True, "Test 2b failed"

    # Test case 3: Invalid cases
    assert solution.isValid("(]") == False, "Test 3a failed"
    assert solution.isValid("([)]") == False, "Test 3b failed"
    assert solution.isValid("((") == False, "Test 3c failed"
    assert solution.isValid("))") == False, "Test 3d failed"

    # Test case 4: Edge cases
    assert solution.isValid("") == True, "Test 4a failed"
    assert solution.isValid("(") == False, "Test 4b failed"
    assert solution.isValid(")") == False, "Test 4c failed"

    # Test case 5: Complex valid case
    assert solution.isValid("((([{}])))") == True, "Test 5a failed"

    # Test case 6: Complex invalid case
    assert solution.isValid("([{}]))]") == False, "Test 6a failed"

    # Test alternative implementations
    assert solution.isValidAlternative("()[]{}") == True, "Alt test failed"
    assert solution.isValidIterative("([{}])") == True, "Iterative test failed"

    print("All test cases passed for Valid Parentheses!")

if __name__ == "__main__":
    test_solution()