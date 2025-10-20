"""
# Difficulty: Medium

# 3. Longest Substring Without Repeating Characters

This problem demonstrates key concepts in Sliding Window and Hash Tables.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"abcabcbb"</dd>
<dt>Output:</dt>
<dd>3 (from "abc")</dd>
<dt>Explanation:</dt>
<dd>Longest substring without repeating characters is 'abc' with length 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(min(n, m))

### INTUITION:
We need to find the longest substring where all characters are unique (no repeating characters).
The key insight is to use a sliding window approach: as we expand the window by adding characters,
if we encounter a duplicate, we shrink the window from the left until the duplicate is removed.

### APPROACH:
1. **Use sliding window**: Maintain a window of unique characters
2. **Track character positions**: Use hash map to store the most recent index of each character
3. **Expand window**: Add characters from the right
4. **Handle duplicates**: When a duplicate is found, move left pointer past the previous occurrence
5. **Track maximum**: Keep track of the longest valid window seen

### WHY THIS WORKS:
- Hash map provides O(1) lookup for checking if a character was seen
- Storing character indices allows us to quickly jump past duplicates
- Left pointer only moves forward, never backward
- Each character is visited at most twice (once by right, once by left)
- This efficiently finds the longest substring without checking all substrings

### EXAMPLE WALKTHROUGH:
```
Input: s = "abcabcbb"

right=0, left=0: 'a' -> window="a", max_length=1
  map: {'a':0}

right=1, left=0: 'b' -> window="ab", max_length=2
  map: {'a':0, 'b':1}

right=2, left=0: 'c' -> window="abc", max_length=3
  map: {'a':0, 'b':1, 'c':2}

right=3, left=0: 'a' (duplicate!)
  - 'a' was at index 0
  - Move left to 1 (past the duplicate)
  - window="bca", max_length=3
  map: {'a':3, 'b':1, 'c':2}

right=4, left=1: 'b' (duplicate!)
  - 'b' was at index 1
  - Move left to 2 (past the duplicate)
  - window="cab", max_length=3
  map: {'a':3, 'b':4, 'c':2}

right=5, left=2: 'c' (duplicate!)
  - 'c' was at index 2
  - Move left to 3 (past the duplicate)
  - window="abc", max_length=3
  map: {'a':3, 'b':4, 'c':5}

right=6, left=3: 'b' (duplicate!)
  - 'b' was at index 4
  - Move left to 5
  - window="cb", max_length=3
  map: {'a':3, 'b':6, 'c':5}

right=7, left=5: 'b' (duplicate!)
  - 'b' was at index 6
  - Move left to 7
  - window="b", max_length=3
  map: {'a':3, 'b':7, 'c':5}

Output: 3 (from "abc")
```

### TIME COMPLEXITY:
O(n)
We iterate through the string once with the right pointer, and the left pointer moves at most n
times total. Each character is processed at most twice. Total: O(2n) = O(n).

### SPACE COMPLEXITY:
O(min(n, m))
Where n is the string length and m is the character set size. In the worst case (all unique
characters), the hash map stores n entries. For ASCII (128 chars) or Unicode subsets, space
is bounded by the character set size.

### EDGE CASES:
- Empty string: Return 0
- Single character: Return 1
- All unique characters: Return length of string
- All same characters: Return 1
- Two characters alternating: Return 2

</details>
"""


from typing import Any

class Solution:
    def solve(self, s: str) -> int:
        """
        Find length of longest substring without repeating characters.

        Args:
            s: Input string

        Returns:
            Length of the longest substring without repeating characters

        Time Complexity: O(n) where n is the length of the string
        Space Complexity: O(min(n, m)) where m is character set size
        """
        char_index: dict[str, int] = {}  # Maps character to its most recent index
        max_length = 0
        left = 0

        for right, char in enumerate(s):
            # If character is in current window, move left pointer
            if char in char_index and char_index[char] >= left:
                left = char_index[char] + 1

            # Update character's most recent index
            char_index[char] = right

            # Update max length
            max_length = max(max_length, right - left + 1)

        return max_length

    def solve_set(self, s: str) -> int:
        """
        Alternative solution using a set to track characters in window.

        This approach explicitly removes characters when shrinking the window.

        Time Complexity: O(n)
        Space Complexity: O(min(n, m))
        """
        char_set: set[Any] = set()
        max_length = 0
        left = 0

        for right in range(len(s)):
            # Remove characters from left until no duplicate
            while s[right] in char_set:
                char_set.remove(s[left])
                left += 1

            # Add current character
            char_set.add(s[right])

            # Update max length
            max_length = max(max_length, right - left + 1)

        return max_length


def test_solution() -> None:
    """
    Test cases for 3. Longest Substring Without Repeating Characters.
    """
    solution = Solution()

    # Test case 1: "abc" has length 3
    solution.solve("abcabcbb")

    # Test case 2: All same characters
    solution.solve("bbbbb")

    # Test case 3: "wke" has length 3
    solution.solve("pwwkew")

    # Test case 4: Empty string
    solution.solve("")

    # Test case 5: All unique characters
    solution.solve("abcdef")

    # Test case 6: Single character
    solution.solve("a")

    # Test case 7: Two characters
    solution.solve("au")

    # Test case 8: Pattern with duplicates
    solution.solve("dvdf")

    # Test case 9: Long pattern
    solution.solve("tmmzuxt")

    # Test set-based solution
    result10 = solution.solve_set("abcabcbb")
    assert result10 == 3, f"Test 10 (set) failed: expected 3, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    print(f"Longest substring in 'abcabcbb': {solution.solve('abcabcbb')}")
    print(f"Longest substring in 'bbbbb': {solution.solve('bbbbb')}")
    print(f"Longest substring in 'pwwkew': {solution.solve('pwwkew')}")
