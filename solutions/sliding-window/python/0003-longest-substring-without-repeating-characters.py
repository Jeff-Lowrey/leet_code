"""
# Difficulty: Medium

# 0003. Longest Substring Without Repeating Characters

Given a string s, find the length of the longest substring without repeating characters.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"abcabcbb"</dd>
<dt>Output:</dt>
<dd>3 (substring "abc")</dd>
<dt>Explanation:</dt>
<dd>Longest substring without repeating characters is 'abc' with length 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, String
**Patterns**: Sliding Window Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use sliding window with hash set. Expand right pointer and add characters. When duplicate found, shrink from left until duplicate removed. Track maximum window size.

### APPROACH:
1. **Initialize variables**: Set max_length = 0, left = 0, char_set = set()
2. **Iterate with right pointer**: For right in range(len(s))
3. **Handle duplicates**: While s[right] in char_set, remove s[left] from set and increment left
4. **Add current character**: Add s[right] to char_set
5. **Update maximum**: max_length = max(max_length, right - left + 1)
6. **Continue scanning**: Process all characters
7. **Return result**: Return max_length

### WHY THIS WORKS:
- Sliding window maintains valid substring by moving start when duplicate found
- Hash map stores character positions for O(1) duplicate detection
- When duplicate found, jump start to (last position + 1) instead of incrementing by 1
- Each character visited at most twice (once by right, once by start jump)
- O(n) time with O(min(n, m)) space where m is charset size (typically 128 or 256)

### EXAMPLE WALKTHROUGH:
Input:
```
s = "abcabcbb"
```

Step 1: char='a', pos=0
char_position = {'a': 0}, start = 0
max_length = 1
Step 2: char='b', pos=1
char_position = {'a': 0, 'b': 1}, start = 0
max_length = 2
Step 3: char='c', pos=2
char_position = {'a': 0, 'b': 1, 'c': 2}, start = 0
max_length = 3
Step 4: char='a', pos=3 (repeat!)
'a' at position 0 >= start, so update start = 0 + 1 = 1
char_position = {'a': 3, 'b': 1, 'c': 2}
Step 5: char='b', pos=4 (repeat!)
'b' at position 1 >= start, so update start = 1 + 1 = 2
char_position = {'a': 3, 'b': 4, 'c': 2}
Step 6: char='c', pos=5 (repeat!)
'c' at position 2 >= start, so update start = 2 + 1 = 3
char_position = {'a': 3, 'b': 4, 'c': 5}
Step 7: char='b', pos=6 (repeat!)
'b' at position 4 >= start, so update start = 4 + 1 = 5
Step 8: char='b', pos=7 (repeat!)
'b' at position 6 >= start, so update start = 6 + 1 = 7

Output:
```
3 (substring "abc")
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any


class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        """
        Find the length of the longest substring without repeating characters.

        Args:
            s (str): Input string

        Returns:
            int: Length of the longest substring without repeating characters

        Time Complexity: O(n) where n is the length of the string
        Space Complexity: O(min(m, n)) where m is the size of the character set
        """
        # Handle edge cases
        if not s:
            return 0
        if len(s) == 1:
            return 1

        # Dictionary to store the last position of each character
        char_position: dict[Any, Any] = {}

        # Variables to track the current and maximum length
        max_length = 0
        start = 0

        # Iterate through the string
        for current_pos, char in enumerate(s):
            # If we find a repeating character, update the start position
            if char in char_position and char_position[char] >= start:
                start = char_position[char] + 1
            else:
                # Update max_length if current window is larger
                current_length = current_pos - start + 1
                max_length = max(max_length, current_length)

            # Update the last position of current character
            char_position[char] = current_pos

        return max_length


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.lengthOfLongestSubstring("abcabcbb")
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.lengthOfLongestSubstring("")
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.lengthOfLongestSubstring("a")
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 003. Longest Substring Without Repeating Characters")
