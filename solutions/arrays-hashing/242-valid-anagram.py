"""
242. Valid Anagram
Easy

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example:
Input: s = "anagram", t = "nagaram"
Output: true
"""

from collections import Counter

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

        count = {}

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
