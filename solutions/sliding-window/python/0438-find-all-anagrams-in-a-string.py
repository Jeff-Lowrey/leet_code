"""
# Difficulty: Medium

# 438. Find All Anagrams In A String

Given two strings s and p, return an array of all the start indices of p's anagrams in s. You may return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>"cbaebabacd", p = "abc"</dd>
<dt>Output:</dt>
<dd>[0,6]</dd>
<dt>Explanation:</dt>
<dd>The start indices of p's anagrams in s are [0, 6]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Sliding Window Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use sliding window with character frequency map. Expand until window contains all p characters with same frequency. Add start index to result. Shrink by moving left pointer.

### APPROACH:
1. **Count target**: Use Counter(p) to get character frequencies
2. **Initialize window**: Create window counter for first len(p) characters
# 3. **Check first window**: If window == p_count, add 0 to result  # Result undefined
4. **Slide window**: For i from len(p) to len(s)
5. **Add new character**: Increment count for s[i]
6. **Remove old character**: Decrement count for s[i-len(p)]
# 7. **Check match**: If window == p_count, add (i-len(p)+1) to result  # Result undefined
8. **Return result**: Return list of starting indices

### WHY THIS WORKS:
- Fixed window of len(p): check if character frequencies match
- Maintain frequency difference: if all 26 chars have diff=0, found anagram
- Slide window: update freq for char leaving and char entering
- Record start index when frequencies match exactly
- O(n) time: single pass with O(1) work per position, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
s = "cbaebabacd", p = "abc"
```

Step 1: Sliding window of size 3

Steps:
Step 1: "cba": is anagram of "abc" → index 0
Step 2: "bae": not anagram
Step 3: "aeb": not anagram
Step 4: "eba": is anagram of "abc" → index 6
Step 5: "bab": not anagram
Step 6: "aba": not anagram
Step 7: "bac": is anagram of "abc" (but not in string)
Step 8: "acd": not anagram

Output:
```
[0,6]
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

from collections import Counter

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        """
        Find all start indices of anagrams of pattern p in string s.

        Args:
            s (str): The input string to search in
            p (str): The pattern string to find anagrams of

        Returns:
            List[int]: List of starting indices where anagrams of p are found in s

        Example:
            >>> solution = Solution()
            >>> solution.findAnagrams("cbaebabacd", "abc")
            [0, 6]
        """
        # Handle edge cases
        if not s or not p or len(s) < len(p):
            return []

        # Initialize result list and pattern frequency counter
        result: list[Any] = []
        p_count = Counter(p)
        window_count: Counter[str] = Counter()

        # Get lengths for convenience
        p_len = len(p)
        s_len = len(s)

        # Sliding window approach
        for i in range(s_len):
            # Add new character to window
            window_count[s[i]] += 1

            # Remove character from window if window size exceeds pattern length
            if i >= p_len:
                if window_count[s[i - p_len]] == 1:
                    del window_count[s[i - p_len]]
                else:
                    window_count[s[i - p_len]] -= 1

            # Check if current window is an anagram
            if i >= p_len - 1 and window_count == p_count:
                result.append(i - p_len + 1)

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findAnagrams("cbaebabacd", "abc")
    expected: list[Any] = [0, 6]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.findAnagrams("", "a")
    expected = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 438. Find All Anagrams In A String")
