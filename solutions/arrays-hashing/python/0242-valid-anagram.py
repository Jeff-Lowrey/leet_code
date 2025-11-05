"""# 0242. Valid Anagram

# Difficulty: Easy

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>s = "anagram", t = "nagaram"</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>The strings 'anagram' and 'nagaram' are anagrams (same character counts)</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n) - Single pass with O(1) hash lookups
**Space Complexity**: O(1) - at most 26 lowercase letters

### INTUITION:
Two strings are anagrams if they contain the exact same characters with the same frequencies. We can verify this by counting character frequencies in both strings.

### APPROACH:
1. **Length check**: If strings have different lengths, they can't be anagrams
2. **Count characters**: Use a hash map or array to count frequency of each character
3. **Compare counts**: Both strings should have identical character frequency distributions

### WHY THIS WORKS:
- Anagrams are rearrangements of the same letters
- Character frequency is invariant under rearrangement
- If two strings have the same character frequencies, they must be anagrams

### EXAMPLE WALKTHROUGH:
Input:
```
s = "anagram", t = "nagaram"
```

Character counts for s:
a: 3, n: 1, g: 1, r: 1, m: 1
Character counts for t:
n: 1, a: 3, g: 1, r: 1, m: 1

Steps:
Step 1: Both have identical counts → True

Output:
```
True
```

### TIME COMPLEXITY:
**O(n)** where n is the length of the strings

- **Counter construction**: O(n) to build Counter(s) by iterating through first string
- **Second Counter**: O(n) to build Counter(t) by iterating through second string
- **Counter comparison**: O(1) or O(k) where k is number of distinct characters (at most 26 for lowercase English letters)
- **Hash map operations**: O(1) average case for each character counting operation
- **Early termination**: Length check is O(1) and can short-circuit for different-length strings
- **Overall**: O(n) + O(n) + O(1) = O(n) linear time in the length of the input strings

### SPACE COMPLEXITY:
**O(1)** constant space (considering only lowercase English letters)

- **Counter objects**: O(k) where k is the number of distinct characters in the strings
- **Lowercase English constraint**: At most 26 distinct characters possible, so k ≤ 26
- **Bounded by alphabet**: Since alphabet size is fixed and small (26 characters), this is considered O(1) constant space
- **Two Counters**: Each stores at most 26 key-value pairs, total 52 entries maximum
- **Independent of input size**: Space doesn't grow with string length n, only with alphabet size (constant)
- **Overall**: O(1) constant space because the space is bounded by the fixed alphabet size, not input length

### EDGE CASES:
- Empty strings → True (both empty)
- Different lengths → False immediately
- Single character → direct comparison

</details>"""

from collections import Counter
from typing import Any


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        """
        Approach: Character frequency counter
        Time Complexity: O(n)
        Space Complexity: O(1) - at most 26 characters
        """
        return Counter(s) == Counter(t)

    def isAnagramManual(self, s: str, t: str) -> bool:
        """
        Manual counting approach
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if len(s) != len(t):
            return False

        count: dict[Any, Any] = {}

        # Count characters in s
        for char in s:
            count[char] = count.get(char, 0) + 1

        # Subtract counts for t
        for char in t:
            if char not in count:
                return False
            count[char] -= 1
            if count[char] < 0:
                return False

        return all(v == 0 for v in count.values())

    def isAnagramSort(self, s: str, t: str) -> bool:
        """
        Sorting approach
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        return sorted(s) == sorted(t)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    s1, t1 = "anagram", "nagaram"
    print(f"s: '{s1}', t: '{t1}'")
    print(f"Output: {solution.isAnagram(s1, t1)}")  # True

    # Test case 2
    s2, t2 = "rat", "car"
    print(f"s: '{s2}', t: '{t2}'")
    print(f"Output: {solution.isAnagram(s2, t2)}")  # False
