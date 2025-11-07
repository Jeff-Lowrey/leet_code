"""
### INTUITION:
The key insight is that we need to find the last word in a string and return its length. The key challenge
is handling trailing spaces. The simplest approach is to strip trailing spaces and
then count backwards until we hit a space or the beginning of the string.

### APPROACH:
1. **Strip Trailing Spaces**: Remove spaces from the end
2. **Count Backwards**: Start from end and count characters until space or start
3. **Return Count**: The number of characters counted

Alternative approaches:
- **Split and Take Last**: Split by spaces and get last element's length
- **Right to Left Scan**: Scan from right, skip spaces, then count letters
- **Built-in Methods**: Use split() and access last element

### WHY THIS WORKS:
- Stripping trailing spaces ensures we start counting from actual last word
- Counting backwards from end is efficient (O(k) where k is last word length)
- Stops at first space encountered, which marks word boundary
- Handles edge cases like multiple trailing spaces

### EXAMPLE WALKTHROUGH:
Input:
```
"Hello World"
"   fly me   to   the moon  "
```

Method 1 (Strip and Count):
1. Strip: "Hello World" (no trailing spaces)
2. Start from end at 'd', count = 0
3. Count: d(1), l(2), r(3), o(4), W(5)
4. Hit space, stop
Result: 5
Method 1:
1. Strip: "   fly me   to   the moon"
2. Count from 'n': n(1), o(2), o(3), m(4)
3. Hit space, stop
Result: 4

### TIME COMPLEXITY:
**O(n)**
- In worst case (no spaces), we scan the entire string
- Typically much faster as we only process the last word

### SPACE COMPLEXITY:
**O(1)**
- Only using a counter variable
- No additional data structures needed
- If using split(), space becomes **O(n)** for storing words

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""


class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        """
        Return length of last word in string.

        Args:
            s: Input string with words separated by spaces

        Returns:
            Length of the last word

        Time Complexity: O(n) worst case, O(k) typical where k is last word length
        Space Complexity: O(1)
        """
        # Strip trailing spaces and count backwards
        s = s.rstrip()
        count = 0

        # Count from end until we hit a space or reach the start
        for i in range(len(s) - 1, -1, -1):
            if s[i] == " ":
                break
            count += 1

        return count

    def lengthOfLastWordSplit(self, s: str) -> int:
        """
        Simple solution using split method.

        Args:
            s: Input string

        Returns:
            Length of the last word

        Time Complexity: O(n)
        Space Complexity: O(n) for storing split words
        """
        words = s.split()
        return len(words[-1]) if words else 0

    def lengthOfLastWordTwoPhase(self, s: str) -> int:
        """
        Two-phase approach: skip trailing spaces, then count.

        Args:
            s: Input string

        Returns:
            Length of the last word

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        i = len(s) - 1
        length = 0

        # Skip trailing spaces
        while i >= 0 and s[i] == " ":
            i -= 1

        # Count word characters
        while i >= 0 and s[i] != " ":
            length += 1
            i -= 1

        return length

    def lengthOfLastWordReverse(self, s: str) -> int:
        """
        Using reversed iteration.

        Args:
            s: Input string

        Returns:
            Length of the last word
        """
        found_letter = False
        count = 0

        for char in reversed(s):
            if char != " ":
                found_letter = True
                count += 1
            elif found_letter:
                # Hit space after finding letters - word complete
                break

        return count

    def lengthOfLastWordOneLiner(self, s: str) -> int:
        """
        Concise one-liner solution.

        Args:
            s: Input string

        Returns:
            Length of the last word
        """
        return len(s.rstrip().split()[-1]) if s.strip() else 0


def test_solution() -> None:
    """Test cases for Problem 58."""
    solution = Solution()

    # Test case 1: Standard case
    result1 = solution.lengthOfLastWord("Hello World")
    expected1 = 5
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Trailing spaces
    result2 = solution.lengthOfLastWord("   fly me   to   the moon  ")
    expected2 = 4
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single word
    result3 = solution.lengthOfLastWord("luffy")
    expected3 = 5
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single character
    result4 = solution.lengthOfLastWord("a")
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Multiple spaces
    result5 = solution.lengthOfLastWord("a ")
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Long last word
    result6 = solution.lengthOfLastWord("Hello World Programming")
    expected6 = 11
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test split solution
    result7 = solution.lengthOfLastWordSplit("Hello World")
    expected7 = 5
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test two-phase solution
    result8 = solution.lengthOfLastWordTwoPhase("   fly me   to   the moon  ")
    expected8 = 4
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test reverse solution
    result9 = solution.lengthOfLastWordReverse("luffy")
    expected9 = 5
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test one-liner solution
    result10 = solution.lengthOfLastWordOneLiner("Hello World")
    expected10 = 5
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 58. Length of Last Word ===")

    test_cases = ["Hello World", "   fly me   to   the moon  ", "luffy", "a", "Today is a nice day", "Programming"]

    for test in test_cases:
        result = solution.lengthOfLastWord(test)
        print(f"Input:  '{test}'")
        print(f"Length of last word: result")
        print()

    # Demonstrate the logic
    print("Step-by-step for '   fly me   to   the moon  ':")
    s = "   fly me   to   the moon  "
    print(f"1. Original: '{s}'")
    print(f"2. Strip trailing: '{s.rstrip()}'")
    print("3. Count from end: m(1), o(2), o(3), n(4)")
    print(f"4. Result: {solution.lengthOfLastWord(s)}")
