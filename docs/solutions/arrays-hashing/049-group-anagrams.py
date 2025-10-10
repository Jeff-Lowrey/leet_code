"""
# Difficulty: Medium

Given an array of strings strs, group the anagrams together. You can return the
`answer` in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Group strings by their "anagram signature" - a canonical representation that's the same for all anagrams. Two common signatures: sorted characters or character frequency count.

### APPROACH:
1. **Create signature**: For each string, generate a canonical form (sorted chars or char counts)
2. **Group by signature**: Use a hash map where signature is key, list of anagrams is value
3. **Return groups**: Extract all value lists from the hash map

### WHY THIS WORKS:
- All anagrams have the same signature (sorted characters or character counts)
- Hash map automatically groups strings with identical signatures
- Different anagrams will have different signatures

### EXAMPLE WALKTHROUGH:
```
Input: ["eat","tea","tan","ate","nat","bat"]

Using sorted string as key:
"eat" → key "aet" → group 1
"tea" → key "aet" → group 1
"tan" → key "ant" → group 2
"ate" → key "aet" → group 1
"nat" → key "ant" → group 2
"bat" → key "abt" → group 3

Final groups:
"aet": ["eat", "tea", "ate"]
"ant": ["tan", "nat"]
"abt": ["bat"]

Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### TIME COMPLEXITY:
- **Sorting approach**: O(n × k log k) where n = number of strings, k = max string length
- **Counting approach**: O(n × k) - more efficient

### SPACE COMPLEXITY:
O(n × k)

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

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
