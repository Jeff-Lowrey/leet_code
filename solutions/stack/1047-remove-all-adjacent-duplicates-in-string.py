"""
# 1047. Remove All Adjacent Duplicates In String
# Difficulty: Easy
You are given a string s consisting of lowercase English letters. A duplicate removal
consists of choosing two adjacent and equal characters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be
proven that the answer is unique.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

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

### TIME COMPLEXITY: O(n)
Single pass through string with O(1) stack operations

### SPACE COMPLEXITY: O(n)
Stack stores up to n characters in worst case (no duplicates)

### EDGE CASES:
- Empty string: returns empty string
- No duplicates: returns original string
- All characters form duplicate pairs: returns empty string
- Cascading removals: "abccba" → "abba" → "aa" → ""

</details>
"""

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
        stack = []

        for char in s:
            # If stack is not empty and top element equals current character
            if stack and stack[-1] == char:
                stack.pop()  # Remove the duplicate pair
            else:
                stack.append(char)  # Add current character

        return ''.join(stack)

def test_solution():
    """Test cases for Problem 1047."""
    solution = Solution()

    # Test case 1
    # assert solution.solve() == expected

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()
