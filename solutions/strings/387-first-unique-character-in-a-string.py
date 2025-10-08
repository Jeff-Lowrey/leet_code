"""
# 387. First Unique Character In A String
**Easy**

This problem demonstrates key concepts in Hash Tables and String manipulation.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To find the first unique (non-repeating) character in a string, we need to know the frequency
of each character. A character is unique if it appears exactly once. We need to return the index
of the first such character when reading left to right.

### APPROACH:
1. **Count frequencies**: Build a frequency map of all characters in the string
2. **Find first unique**: Iterate through string again, checking frequency map
3. **Return index**: Return the index of first character with frequency 1
4. **Return -1**: If no unique character exists

### WHY THIS WORKS:
- Two-pass approach: first pass counts, second pass finds
- Hash map provides O(1) lookup for character frequencies
- By iterating left to right in second pass, we find the first unique character
- This approach is more efficient than checking each character's uniqueness separately

### TIME COMPLEXITY: O(n)
We make two passes through the string: one to count (O(n)) and one to find (O(n)).
Total is O(2n) = O(n).

### SPACE COMPLEXITY: O(1)
Although we use a hash map, since we're limited to lowercase English letters (26 characters),
the space is bounded by a constant. For general character sets, it would be O(k) where k is
the character set size.

### EXAMPLE WALKTHROUGH:
```
Input: s = "leetcode"
Step 1: Count frequencies: {'l':1, 'e':3, 't':1, 'c':1, 'o':1, 'd':1}
Step 2: Check s[0]='l': frequency is 1, found first unique!
Output: 0

Input: s = "loveleetcode"
Step 1: Count frequencies: {'l':2, 'o':2, 'v':1, 'e':4, 't':1, 'c':1, 'd':1}
Step 2: Check s[0]='l': frequency is 2, not unique
Step 3: Check s[1]='o': frequency is 2, not unique
Step 4: Check s[2]='v': frequency is 1, found first unique!
Output: 2
```

### EDGE CASES:
- Empty string: Return -1
- Single character: Return 0
- No unique characters (all repeated): Return -1
- All unique characters: Return 0 (first character)
- String with only one unique character at the end: Return its index

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses the Counter from collections module for efficient frequency counting.

### Algorithm Steps:
1. Import Counter from collections
2. Count all character frequencies in one pass
3. Iterate through string indices
4. For each character, check if its frequency is 1
5. Return the index of the first character with frequency 1
6. If no such character exists, return -1

### Alternative Approaches:
- Use regular dict instead of Counter (slightly more code)
- Single pass with ordered dict (track order while counting)
- indexOf + lastIndexOf comparison (less efficient)

</details>
"""

from collections import Counter


class Solution:
    def solve(self, s: str) -> int:
        """
        Find index of first unique (non-repeating) character in string.

        Args:
            s: Input string

        Returns:
            Index of first unique character, or -1 if none exists

        Time Complexity: O(n) - two passes through the string
        Space Complexity: O(1) - bounded by character set size (26 for lowercase)
        """
        # Count character frequencies
        char_count = Counter(s)

        # Find first character with frequency 1
        for i, char in enumerate(s):
            if char_count[char] == 1:
                return i

        return -1

    def solve_dict(self, s: str) -> int:
        """
        Solution using regular dictionary instead of Counter.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Count frequencies manually
        char_count = {}
        for char in s:
            char_count[char] = char_count.get(char, 0) + 1

        # Find first unique
        for i, char in enumerate(s):
            if char_count[char] == 1:
                return i

        return -1


def test_solution():
    """
    Test cases for 387. First Unique Character In A String.
    """
    solution = Solution()

    # Test case 1: First character is unique
    result1 = solution.solve("leetcode")
    assert result1 == 0, f"Test 1 failed: expected 0, got {result1}"

    # Test case 2: Unique character in middle
    result2 = solution.solve("loveleetcode")
    assert result2 == 2, f"Test 2 failed: expected 2, got {result2}"

    # Test case 3: No unique character
    result3 = solution.solve("aabb")
    assert result3 == -1, f"Test 3 failed: expected -1, got {result3}"

    # Test case 4: Single character
    result4 = solution.solve("z")
    assert result4 == 0, f"Test 4 failed: expected 0, got {result4}"

    # Test case 5: All characters unique
    result5 = solution.solve("abcdef")
    assert result5 == 0, f"Test 5 failed: expected 0, got {result5}"

    # Test case 6: Unique at end
    result6 = solution.solve("aabbccz")
    assert result6 == 6, f"Test 6 failed: expected 6, got {result6}"

    # Test case 7: Empty string
    result7 = solution.solve("")
    assert result7 == -1, f"Test 7 failed: expected -1, got {result7}"

    # Test case 8: Complex pattern
    result8 = solution.solve("dddccdbba")
    assert result8 == 8, f"Test 8 failed: expected 8, got {result8}"

    # Test dict solution
    result9 = solution.solve_dict("leetcode")
    assert result9 == 0, f"Test 9 (dict) failed: expected 0, got {result9}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"First unique in 'leetcode': index {solution.solve('leetcode')}")
    print(f"First unique in 'loveleetcode': index {solution.solve('loveleetcode')}")
    print(f"First unique in 'aabb': index {solution.solve('aabb')}")
