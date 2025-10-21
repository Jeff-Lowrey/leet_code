"""
# Difficulty: Easy

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>strs = ["flower","flow","flight"]</dd>
<dt>Output:</dt>
<dd>fl"</dd>
<dt>Explanation:</dt>
<dd>Longest common prefix of ['flower','flow','flight'] is 'fl'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(S)
**Space Complexity**: O(1)

### INTUITION:
The longest common prefix is the sequence of characters that all strings share from the beginning. We can find this by comparing characters at each position across all strings until we find a mismatch.

### APPROACH:
1. **Vertical Scanning**: Compare characters at the same position across all strings
2. Start from position 0 and check if all strings have the same character at that position
3. Continue until we find a mismatch or reach the end of any string
4. Return the prefix found so far

### WHY THIS WORKS:
Since we're looking for a common prefix, all strings must have identical characters at each position from the start. The moment any string differs or ends, we've found the longest possible common prefix.

### EXAMPLE WALKTHROUGH:
For strs = ["flower","flow","flight"]:
1. Position 0: 'f', 'f', 'f' → all match
2. Position 1: 'l', 'l', 'l' → all match
3. Position 2: 'o', 'o', 'i' → mismatch found
4. Return "fl"

### TIME COMPLEXITY:
O(S)
- S is the sum of all characters in all strings
- In worst case, we examine every character once

### SPACE COMPLEXITY:
O(1)
- Only using constant extra space for variables

### EDGE CASES:
- Empty array: return ""
- Empty string in array: return ""
- Single string: return the string itself
- No common prefix: return ""

</details>
"""


from typing import Any
import re




class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word


class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        """
        Approach: Vertical scanning
        Time Complexity: O(S) where S is sum of all characters
        Space Complexity: O(1)
        """
        if not strs:
            return ""

        for i in range(len(strs[0])):
            char = strs[0][i]
            for j in range(1, len(strs)):
                if i >= len(strs[j]) or strs[j][i] != char:
                    return strs[0][:i]

        return strs[0]

    def longestCommonPrefixSort(self, strs: list[str]) -> str:
        """
        Approach: Sort and compare first and last
        Time Complexity: O(n log n * m) where m is average string length
        Space Complexity: O(1)
        """
        if not strs:
            return ""

        strs.sort()
        first = strs[0]
        last = strs[-1]

        i = 0
        while i < len(first) and i < len(last) and first[i] == last[i]:
            i += 1

        return first[:i]

    def longestCommonPrefixTrie(self, strs: list[str]) -> str:
        """
        Approach: Build trie and find common path
        Time Complexity: O(S)
        Space Complexity: O(S)
        """
        if not strs:
            return ""

        class TrieNode:
            def __init__(self: Any) -> None:
                self.children: dict[str, Any] = {}
                self.is_end = False

        root = TrieNode()

        # Build trie
        for word in strs:
            if not word:
                return ""
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_end = True

        # Find common prefix
        prefix: list[Any] = []
        node = root
        while len(node.children) == 1 and not node.is_end:
            char = next(iter(node.children))
            prefix.append(char)
            node = node.children[char]

        return "".join(prefix)


"""
28. Find the Index of the First Occurrence in a String
# Difficulty: Easy
Given two strings needle and haystack, return the index of the first occurrence
of needle in haystack, or -1 if needle is not part of haystack.

Example:
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
"""


class SolutionStrStr:
    def strStr(self, haystack: str, needle: str) -> int:
        """
        Approach: KMP algorithm
        Time Complexity: O(m + n)
        Space Complexity: O(m) where m is needle length
        """
        if not needle:
            return 0

        # Build LPS (Longest Proper Prefix Suffix) array
        def build_lps(pattern: Any) -> Any:
            lps = [0] * len(pattern)
            length = 0
            i = 1

            while i < len(pattern):
                if pattern[i] == pattern[length]:
                    length += 1
                    lps[i] = length
                    i += 1
                else:
                    if length != 0:
                        length = lps[length - 1]
                    else:
                        lps[i] = 0
                        i += 1

            return lps

        lps = build_lps(needle)
        i = j = 0

        while i < len(haystack):
            if haystack[i] == needle[j]:
                i += 1
                j += 1

            if j == len(needle):
                return i - j
            elif i < len(haystack) and haystack[i] != needle[j]:
                if j != 0:
                    j = lps[j - 1]
                else:
                    i += 1

        return -1

    def strStrSimple(self, haystack: str, needle: str) -> int:
        """
        Approach: Simple sliding window
        Time Complexity: O(m * n)
        Space Complexity: O(1)
        """
        if not needle:
            return 0

        for i in range(len(haystack) - len(needle) + 1):
            if haystack[i : i + len(needle)] == needle:
                return i

        return -1


"""
459. Repeated Substring Pattern
# Difficulty: Easy
Given a string s, check if it can be constructed by taking a substring of it and
appending multiple copies of the substring together.

Example:
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.
"""


class SolutionRepeated:
    def repeatedSubstringPattern(self, s: str) -> bool:
        """
        Approach: String concatenation trick
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return s in (s + s)[1:-1]

    def repeatedSubstringPatternKMP(self, s: str) -> bool:
        """
        Approach: KMP algorithm
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(s)
        lps = [0] * n
        length = 0
        i = 1

        while i < n:
            if s[i] == s[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1

        # Check if there's a repeating pattern
        pattern_len = lps[-1]
        return pattern_len > 0 and n % (n - pattern_len) == 0


"""
686. Repeated String Match
# Difficulty: Medium
Given two strings a and b, return the minimum number of times you should repeat
string a so that string b is a substring of it. If it is impossible for b to be
a substring of a after repeating it, return -1.

Example:
Input: a = "abcd", b = "cdabcdab"
Output: 3
Explanation: We return 3 because by repeating a three times "abcdabcdabcd",
b is a substring of it.
"""


class SolutionRepeatedMatch:
    def repeatedStringMatch(self, a: str, b: str) -> int:
        """
        Approach: Calculate minimum repetitions
        Time Complexity: O(n + m)
        Space Complexity: O(n + m)
        """
        # Minimum repetitions needed
        min_reps = (len(b) - 1) // len(a) + 1

        # Try min_reps and min_reps + 1
        for reps in range(min_reps, min_reps + 2):
            if b in a * reps:
                return reps

        return -1


# Test cases
if __name__ == "__main__":
    # Test Longest Common Prefix
    solution = Solution()

    print("Longest Common Prefix:")
    test_cases = [["flower", "flow", "flight"], ["dog", "racecar", "car"], [""], ["a"], ["ab", "a"]]

    for strs in test_cases:
        result = solution.longestCommonPrefix(strs)
        print(f"Input: {strs}")
        print(f"Prefix: '{result}'\n")

    # Test strStr
    solution_str = SolutionStrStr()

    print("Find First Occurrence:")
    str_cases = [("sadbutsad", "sad"), ("leetcode", "leeto"), ("hello", "ll"), ("aaaaa", "bba")]

    for haystack, needle in str_cases:
        index: int = solution_str.strStr(haystack, needle)
        print(f"Haystack: '{haystack}', Needle: '{needle}'")
        print(f"Index: {index}\n")

    # Test Repeated Substring
    solution_repeated = SolutionRepeated()

    print("Repeated Substring Pattern:")
    repeated_cases = ["abab", "aba", "abcabcabcabc", "a", "aa"]

    for s in repeated_cases:
        is_repeated: bool = solution_repeated.repeatedSubstringPattern(s)
        print(f"String: '{s}'")
        print(f"Is repeated: {is_repeated}\n")

    # Test Repeated String Match
    solution_match = SolutionRepeatedMatch()

    print("Repeated String Match:")
    match_cases = [("abcd", "cdabcdab"), ("a", "aa"), ("a", "a"), ("abc", "cabcabca")]

    for a, b in match_cases:
        repetitions: int = solution_match.repeatedStringMatch(a, b)
        print(f"a: '{a}', b: '{b}'")
        print(f"Repetitions: {repetitions}\n")
