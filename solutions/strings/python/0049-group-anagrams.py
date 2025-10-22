"""
# 49. Group Anagrams

# Difficulty: Medium

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>strs = ["eat","tea","tan","ate","nat","bat"]</dd>
<dt>Output:</dt>
<dd>[["bat"],["nat","tan"],["ate","eat","tea"]]</dd>
<dt>Explanation:</dt>
<dd>Grouping strings by their character composition</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Hash Map, Sorting, Character Counting
**Data Structures**: Hash Map, Array
**Patterns**: Grouping Pattern, Hash Key Generation
**Time Complexity**: O(n * k log k) where k is max string length
**Space Complexity**: O(n * k)

### INTUITION:
Anagrams have the same character composition. We can use this property to create
a unique key for each group. Strings with the same key are anagrams.

### APPROACH:
1. **Sorted String as Key**: Sort each string and use sorted version as hash key
2. **Character Count as Key**: Count character frequencies as tuple key
3. **Group by Key**: All strings with same key go into same group
4. **Return Values**: Extract all groups from hash map

### WHY THIS WORKS:
Anagrams produce the same sorted string (e.g., "eat" and "tea" both become "aet").
By using sorted strings as keys, we automatically group anagrams together.

### EXAMPLE WALKTHROUGH:
```
Input: ["eat","tea","tan","ate","nat","bat"]

Sorting approach:
"eat" → "aet" → group 1
"tea" → "aet" → group 1
"tan" → "ant" → group 2
"ate" → "aet" → group 1
"nat" → "ant" → group 2
"bat" → "abt" → group 3

Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### TIME COMPLEXITY:
O(n * k log k) where n is number of strings, k is max length
- Sorting each string takes O(k log k)
- Process n strings

### SPACE COMPLEXITY:
O(n * k) for hash map storing all strings

### EDGE CASES:
- Empty array: return []
- Single string: return [[str]]
- All same: one group
- All different: n groups

</details>
"""

from collections import defaultdict
from typing import List


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        """
        Group anagrams using sorted string as key.

        Time Complexity: O(n * k log k)
        Space Complexity: O(n * k)
        """
        groups: dict[str, list[str]] = defaultdict(list)

        for s in strs:
            # Use sorted string as key
            key = "".join(sorted(s))
            groups[key].append(s)

        return list(groups.values())

    def groupAnagramsCharCount(self, strs: List[str]) -> List[List[str]]:
        """
        Group anagrams using character count as key.

        Time Complexity: O(n * k)
        Space Complexity: O(n * k)
        """
        groups: dict[tuple, list[str]] = defaultdict(list)

        for s in strs:
            # Count characters (26 lowercase letters)
            count = [0] * 26
            for char in s:
                count[ord(char) - ord("a")] += 1

            # Use tuple of counts as key
            key = tuple(count)
            groups[key].append(s)

        return list(groups.values())

    def groupAnagramsPrime(self, strs: List[str]) -> List[List[str]]:
        """
        Group anagrams using prime number product as key.

        Time Complexity: O(n * k)
        Space Complexity: O(n * k)

        Each letter maps to a prime number. Product is unique for each anagram group.
        """
        # Prime numbers for a-z
        primes = [
            2,
            3,
            5,
            7,
            11,
            13,
            17,
            19,
            23,
            29,
            31,
            37,
            41,
            43,
            47,
            53,
            59,
            61,
            67,
            71,
            73,
            79,
            83,
            89,
            97,
            101,
        ]

        groups: dict[int, list[str]] = defaultdict(list)

        for s in strs:
            # Calculate product of prime numbers
            product = 1
            for char in s:
                product *= primes[ord(char) - ord("a")]

            groups[product].append(s)

        return list(groups.values())


def test_solution() -> None:
    """Test cases for 49. Group Anagrams."""
    solution = Solution()

    # Helper to compare results (order doesn't matter)
    def same_groups(result: list[list[str]], expected: list[list[str]]) -> bool:
        result_sorted = [sorted(group) for group in result]
        expected_sorted = [sorted(group) for group in expected]
        return sorted(result_sorted) == sorted(expected_sorted)

    # Test case 1
    strs1 = ["eat", "tea", "tan", "ate", "nat", "bat"]
    expected1 = [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
    assert same_groups(solution.groupAnagrams(strs1), expected1)

    # Test case 2
    strs2 = [""]
    expected2 = [[""]]
    assert same_groups(solution.groupAnagrams(strs2), expected2)

    # Test case 3
    strs3 = ["a"]
    expected3 = [["a"]]
    assert same_groups(solution.groupAnagrams(strs3), expected3)

    # Test character count approach
    assert same_groups(solution.groupAnagramsCharCount(strs1), expected1)

    # Test prime approach
    assert same_groups(solution.groupAnagramsPrime(strs1), expected1)

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 49. Group Anagrams ===")
    test_input = ["eat", "tea", "tan", "ate", "nat", "bat"]
    result = solution.groupAnagrams(test_input)
    print(f"Input: {test_input}")
    print(f"Output: {result}")
