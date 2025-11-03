"""# 0049. Group Anagrams

Difficulty: Easy


Given an array of strings strs, group the anagrams together. You can return the
`answer` in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different
word or phrase, typically using all the original letters exactly once.

Example:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>strs = ["eat","tea","tan","ate","nat","bat"]</dd>
<dt>Output:</dt>
<dd>[["bat"],["nat","tan"],["ate","eat","tea"]]</dd>
<dt>Explanation:</dt>
<dd>Words ['eat','tea','ate'] are anagrams grouped together, as are ['tan','nat'], and ['bat'] alone</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal, Sorting
**Data Structures**: Hash Map (dictionary), Array (list)
**Patterns**: Hash Table Pattern, Anagram Detection
**Time Complexity**: O(n × k log k) - Sorting approach (n strings, k max length)
**Space Complexity**: O(n × k) - Store all strings in hash map


### INTUITION:
The key insight is that group strings by their "anagram signature" - a canonical representation that's the same for all anagrams. Two common signatures: sorted characters or character frequency count.

### APPROACH:
1. **Create signature**: For each string, generate a canonical form (sorted chars or char counts)
2. **Group by signature**: Use a hash map where signature is key, list of anagrams is value
3. **Return groups**: Extract all value lists from the hash map

### WHY THIS WORKS:
- This ensures that all anagrams have the same signature (sorted characters or character counts)
- This ensures that hash map automatically groups strings with identical signatures
- This ensures that different anagrams will have different signatures

### EXAMPLE WALKTHROUGH:
Input:
```
["eat","tea","tan","ate","nat","bat"]
```

Using sorted string as key:

Steps:
Step 1: "eat" → key "aet" → group 1
Step 2: "tea" → key "aet" → group 1
Step 3: "tan" → key "ant" → group 2
Step 4: "ate" → key "aet" → group 1
Step 5: "nat" → key "ant" → group 2
Step 6: "bat" → key "abt" → group 3

Final groups:
```
"aet": ["eat", "tea", "ate"]
"ant": ["tan", "nat"]
"abt": ["bat"]
```

Output:
```
[["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### TIME COMPLEXITY:
**O(n × k log k)** - where n is the number of strings and k is the maximum string length. For the sorting approach: we iterate through all n strings (O(n)), and for each string we sort its k characters (O(k log k)). Total: O(n × k log k). The character counting approach is more efficient at O(n × k) since counting characters takes O(k) time per string without sorting.

### SPACE COMPLEXITY:
**O(n × k)** - We store all n strings in the hash map, each with average length k. The map keys (sorted strings or character counts) also take O(k) space per unique anagram group. In the worst case where all strings are unique, we have n groups, each storing one string of length k, giving us O(n × k) total space. The character count array uses O(26) = O(1) space per string, which doesn't affect the overall O(n × k) complexity.

### EDGE CASES:
- **Empty string array**: Return empty list
- **Single string**: Return [[string]]
- **No anagrams**: Each string in its own group
- **All anagrams of each other**: Return single group with all strings
- **Empty strings**: All empty strings grouped together

</details>
"""

from collections import defaultdict
from typing import Any


class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        """
        Approach: Hash map with sorted string as key
        Time Complexity: O(n * k log k) where n is number of strings, k is max length
        Space Complexity: O(n * k)
        """
        anagrams: dict[Any, list[Any]] = defaultdict(list)

        for s in strs:
            # Sort string to create key
            key = "".join(sorted(s))
            anagrams[key].append(s)

        return list(anagrams.values())

    def groupAnagramsOptimal(self, strs: list[str]) -> list[list[str]]:
        """
        Approach: Character count as tuple key
        Time Complexity: O(n * k) where n is number of strings, k is max length
        Space Complexity: O(n * k)
        """
        anagrams: dict[tuple[int, ...], list[str]] = defaultdict(list)

        for s in strs:
            # Count characters
            count = [0] * 26
            for char in s:
                count[ord(char) - ord("a")] += 1

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
