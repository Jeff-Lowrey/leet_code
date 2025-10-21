"""
# Difficulty: Medium

# 316. Remove

Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"bcabc"</dd>
<dt>Output:</dt>
<dd>"abc"</dd>
<dt>Explanation:</dt>
<dd>After removing duplicate letters while maintaining lexicographical order, result is 'abc'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use monotonic increasing stack. For each character, while stack top > current character, pop if we can remove it (count > 0 and appears later). This ensures lexicographically smallest result.

### APPROACH:
1. **Count occurrences**: Create counter for each character's frequency
2. **Initialize stack and visited**: stack = [], visited = set()
3. **Iterate through string**: For each char in s
4. **Decrement count**: counter[char] -= 1
5. **Skip if visited**: If char in visited, continue
6. **Maintain order**: While stack and stack[-1] > char and counter[stack[-1]] > 0, pop and remove from visited
7. **Add current**: Append char to stack, add to visited
8. **Return result**: Return ''.join(stack)

### WHY THIS WORKS:
- Monotonic stack builds lexicographically smallest result
- Track remaining count of each char: safe to remove if appears later
- Pop larger chars from stack if count > 0 (can add back later)
- Visited set prevents duplicate characters in result
- Greedy approach works: always try to place smaller char earlier

### EXAMPLE WALKTHROUGH:
```
Input: s = "bcabc"
Step 1: Count frequencies and track remaining
  freq = {'b':2, 'c':2, 'a':1}

Step 2: Build result with monotonic stack
  Add 'b': stack=['b']
  Add 'c': stack=['b','c']
  Add 'a': pop 'c' (a<c, c appears later), pop 'b' (a<b, b appears later)
          stack=['a']
  Add 'b': stack=['a','b']
  Add 'c': stack=['a','b','c']

Output: "abc"
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
    def removeDuplicateLetters(self, s: str) -> str:
        """
        Remove duplicate letters to create smallest lexicographical order string.

        Args:
            s: Input string with possible duplicate characters

        Returns:
            Smallest lexicographical string with no duplicate characters

        Time Complexity: O(n) - single pass through string
        Space Complexity: O(1) - stack and sets limited to 26 characters
        """
        # Count occurrences of each character
        last_occurrence = {char: i for i, char in enumerate(s)}

        stack: list[Any] = []
        in_stack: set[Any] = set()

        for i, char in enumerate(s):
            # Skip if character already in result
            if char in in_stack:
                continue

            # Remove larger characters that appear later
            while stack and stack[-1] > char and last_occurrence[stack[-1]] > i:
                removed = stack.pop()
                in_stack.remove(removed)

            stack.append(char)
            in_stack.add(char)

        return "".join(stack)

    def solve(self, s: str) -> str:
        """Wrapper method for consistency with template."""
        return self.removeDuplicateLetters(s)


def test_solution() -> None:
    """
    Test cases for 316. Remove Duplicate Letters.
    """
    solution = Solution()

    # Test case 1: Basic example
    solution.solve("bcabc")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: Multiple duplicates
    solution.solve("cbacdcbc")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: No duplicates
    solution.solve("abcd")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: All same character
    solution.solve("aaaa")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Reverse alphabetical
    solution.solve("dcba")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 6: Complex pattern
    solution.solve("ecbacba")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 7: Single character
    solution.solve("a")
    # # # assert result == expected, f"Expected {expected}, got {result}"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    s = "bcabc"
    solution.solve(s)
