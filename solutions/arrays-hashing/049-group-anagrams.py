"""
49. Group Anagrams
Medium

Given an array of strings strs, group the anagrams together. You can return the
answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
"""

from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        """
        Approach: Hash map with sorted string as key
        Time Complexity: O(n * k log k) where n is number of strings, k is max length
        Space Complexity: O(n * k)
        """
        anagrams = defaultdict(list)

        for s in strs:
            # Sort string to create key
            key = ''.join(sorted(s))
            anagrams[key].append(s)

        return list(anagrams.values())

    def groupAnagramsOptimal(self, strs: list[str]) -> list[list[str]]:
        """
        Approach: Character count as tuple key
        Time Complexity: O(n * k) where n is number of strings, k is max length
        Space Complexity: O(n * k)
        """
        anagrams = defaultdict(list)

        for s in strs:
            # Count characters
            count = [0] * 26
            for char in s:
                count[ord(char) - ord('a')] += 1

            # Use tuple of counts as key
            key = tuple(count)
            anagrams[key].append(s)

        return list(anagrams.values())


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
    print(f"Input: {strs1}")
    result1 = solution.groupAnagrams(strs1)
    print(f"Output: {result1}")

    # Test case 2
    strs2 = [""]
    print(f"Input: {strs2}")
    result2 = solution.groupAnagrams(strs2)
    print(f"Output: {result2}")

    # Test case 3
    strs3 = ["a"]
    print(f"Input: {strs3}")
    result3 = solution.groupAnagrams(strs3)
    print(f"Output: {result3}")
