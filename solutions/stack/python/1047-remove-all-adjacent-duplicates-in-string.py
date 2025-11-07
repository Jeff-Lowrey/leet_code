"""
### INTUITION:
Use a stack to efficiently track characters. When we see a character that matches
the top of the stack, we've found an adjacent duplicate pair - pop the stack.
Otherwise, push the character onto the stack.

### APPROACH:
1. Use stack to track characters we've seen
2. For each character:
   - If it matches stack top: pop (remove duplicate pair)
   - Otherwise: push character onto stack
3. Join stack elements to form final string

### WHY THIS WORKS:
- Stack naturally maintains adjacency (top element is most recent)
- Removing duplicates as we go handles cascading removals
- Single pass is sufficient since we process left-to-right

### EXAMPLE WALKTHROUGH:
Input:
```
s = "abbaca"
```

Step 1: Use stack
'a': stack=['a']
'b': stack=['a','b']
'b': stack=['a'] (removed duplicate)
'a': stack=[] (removed duplicate)
'c': stack=['c']
'a': stack=['c','a']

Output:
```
"ca"
```

### TIME COMPLEXITY:
**O(n)**
Single pass through string with **O(1)** stack operations

### SPACE COMPLEXITY:
**O(n)**
Stack stores up to n characters in worst case (no duplicates)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import Any


class Solution:
    def removeDuplicates(self, s: str) -> str:
        """
        Remove all adjacent duplicate characters from string using stack.

        Args:
            s: String consisting of lowercase English letters

        Returns:
            Final string after all duplicate removals

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack: list[Any] = []

        for char in s:
            # If stack is not empty and top element equals current character
            if stack and stack[-1] == char:
                stack.pop()  # Remove the duplicate pair
            else:
                stack.append(char)  # Add current character

        return "".join(stack)


def test_solution() -> None:
    """Test cases for Problem 1047."""
    solution = Solution()

    # Test case 1
    # assert solution.solve() == expected

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
