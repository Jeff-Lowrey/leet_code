"""
# 242. Valid Anagram

# Difficulty: Easy

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "anagram", t = "nagaram"</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>Both strings contain the same characters with the same frequencies</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Hash Map, Sorting, Character Counting
**Data Structures**: Hash Map, Array
**Patterns**: Frequency Counter Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - limited to 26 characters

### INTUITION:
Two strings are anagrams if they contain the same characters with the same frequencies.
We can use a hash map to count character frequencies or simply sort both strings.

### APPROACH:
1. **Hash Map Approach**: Count character frequencies in both strings and compare
2. **Sorting Approach**: Sort both strings and check if they're equal
3. **Array Counter**: Use array of size 26 for lowercase English letters
4. **Early Exit**: Check length first - different lengths can't be anagrams

### WHY THIS WORKS:
An anagram must have the exact same character composition. By counting frequencies,
we verify that every character appears the same number of times in both strings.

### EXAMPLE WALKTHROUGH:
```
Input: s = "anagram", t = "nagaram"

Frequency count for s:
a: 3, n: 1, g: 1, r: 1, m: 1

Frequency count for t:
n: 1, a: 3, g: 1, r: 1, m: 1

Both have same frequencies → true
```

### TIME COMPLEXITY:
O(n) where n is the length of the strings

### SPACE COMPLEXITY:
O(1) - hash map has at most 26 keys for English lowercase letters

### EDGE CASES:
- Empty strings: both empty → true
- Different lengths: → false
- Single character: check equality
- All same character: check counts match

</details>
"""


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        """
        Check if two strings are anagrams using hash map.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Early exit: different lengths can't be anagrams
        if len(s) != len(t):
            return False

        # Count character frequencies
        char_count: dict[str, int] = {}

        for char in s:
            char_count[char] = char_count.get(char, 0) + 1

        for char in t:
            if char not in char_count:
                return False
            char_count[char] -= 1
            if char_count[char] < 0:
                return False

        return all(count == 0 for count in char_count.values())

    def isAnagramSorting(self, s: str, t: str) -> bool:
        """
        Check using sorting approach.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        return sorted(s) == sorted(t)

    def isAnagramCounter(self, s: str, t: str) -> bool:
        """
        Check using Python Counter.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        from collections import Counter

        return Counter(s) == Counter(t)

    def isAnagramArray(self, s: str, t: str) -> bool:
        """
        Check using array for lowercase English letters only.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if len(s) != len(t):
            return False

        counts = [0] * 26

        for i in range(len(s)):
            counts[ord(s[i]) - ord("a")] += 1
            counts[ord(t[i]) - ord("a")] -= 1

        return all(count == 0 for count in counts)


def test_solution() -> None:
    """Test cases for 242. Valid Anagram."""
    solution = Solution()

    # Test cases
    assert solution.isAnagram("anagram", "nagaram") is True
    assert solution.isAnagram("rat", "car") is False
    assert solution.isAnagram("", "") is True
    assert solution.isAnagram("a", "a") is True
    assert solution.isAnagram("ab", "ba") is True
    assert solution.isAnagram("abc", "bca") is True

    # Test sorting approach
    assert solution.isAnagramSorting("listen", "silent") is True
    assert solution.isAnagramSorting("hello", "world") is False

    # Test counter approach
    assert solution.isAnagramCounter("anagram", "nagaram") is True
    assert solution.isAnagramCounter("rat", "car") is False

    # Test array approach
    assert solution.isAnagramArray("anagram", "nagaram") is True
    assert solution.isAnagramArray("test", "ttew") is False

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 242. Valid Anagram ===")
    test_pairs = [
        ("anagram", "nagaram"),
        ("rat", "car"),
        ("listen", "silent"),
        ("hello", "world"),
    ]

    for s, t in test_pairs:
        result = solution.isAnagram(s, t)
        print(f'"{s}" and "{t}": {result}')
