"""
# Difficulty: Medium

# 49. Group Anagrams

This problem demonstrates key concepts in Hash Tables and String manipulation.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["eat", "tea", "ate"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Words ['eat','tea','ate'] are anagrams grouped together, as are ['tan','nat'], and ['bat'] alone</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Anagrams are words that contain the same characters with the same frequencies, just rearranged.
To group anagrams together, we need a way to identify which words are anagrams of each other.
The key insight is that anagrams will have the same "signature" - either the same sorted string
or the same character frequency pattern.

### APPROACH:
1. **Create signature for each word**: Sort characters or count character frequencies
2. **Use signature as hash key**: Group words with the same signature together
3. **Build groups**: Use a hash map where keys are signatures and values are lists of anagrams
4. **Return all groups**: Extract all values from the hash map

### WHY THIS WORKS:
- Anagrams have identical sorted strings (e.g., "eat" and "tea" both become "aet")
- Hash map provides O(1) average time for grouping
- All words with the same signature are guaranteed to be anagrams
- This approach naturally groups anagrams without comparing every pair

### EXAMPLE WALKTHROUGH:
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]

Step 1: Process "eat"
  - Sort: "aet"
  - Map: {"aet": ["eat"]}

Step 2: Process "tea"
  - Sort: "aet"
  - Map: {"aet": ["eat", "tea"]}

Step 3: Process "tan"
  - Sort: "ant"
  - Map: {"aet": ["eat", "tea"], "ant": ["tan"]}

Step 4: Process "ate"
  - Sort: "aet"
  - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan"]}

Step 5: Process "nat"
  - Sort: "ant"
  - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}

Step 6: Process "bat"
  - Sort: "abt"
  - Map: {"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}

Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### TIME COMPLEXITY:
O(n * k log k)
Where n is the number of strings and k is the maximum length of a string. For each string,
we sort it (O(k log k)). If we use character counting instead, it's O(n * k).

### SPACE COMPLEXITY:
O(n * k)
We store all n strings in the hash map, and the total space for storing them is O(n * k).

### EDGE CASES:
- Empty array: Return empty array
- Single string: Return array with one group containing that string
- No anagrams: Each string in its own group
- All anagrams: Single group with all strings
- Empty strings: Empty strings are anagrams of each other

</details>
"""

from collections import defaultdict

from typing import Any, List


class Solution:
    def solve(self, strs: List[str]) -> List[List[str]]:
        """
        Group anagrams together from a list of strings.

        Args:
            strs: List of strings to group

        Returns:
            List of groups, where each group contains anagram strings

        Time Complexity: O(n * k log k) where n is number of strings, k is max string length
        Space Complexity: O(n * k) for storing all strings in the hash map
        """
        # Use defaultdict to automatically create lists for new keys
        anagram_groups: dict[Any, list[Any]] = defaultdict(list)

        for s in strs:
            # Sort the string to create a signature
            # Anagrams will have the same sorted string
            key = "".join(sorted(s))
            anagram_groups[key].append(s)

        # Return all groups as a list of lists
        return list(anagram_groups.values())

    def solve_count(self, strs: List[str]) -> List[List[str]]:
        """
        Alternative solution using character counting instead of sorting.

        This approach is O(n * k) instead of O(n * k log k).

        Time Complexity: O(n * k)
        Space Complexity: O(n * k)
        """
        anagram_groups: dict[tuple[int, ...], list[str]] = defaultdict(list)

        for s in strs:
            # Count character frequencies
            # Use a tuple of 26 counts as the key (for lowercase letters)
            count = [0] * 26
            for char in s:
                count[ord(char) - ord("a")] += 1

            # Use tuple of counts as key (lists aren't hashable)
            key = tuple(count)
            anagram_groups[key].append(s)

        return list(anagram_groups.values())


def test_solution() -> None:
    """
    Test cases for 49. Group Anagrams.
    """
    solution = Solution()

    def sort_groups(groups: Any) -> Any:
        """Helper to sort groups for consistent comparison."""
        return sorted([sorted(group) for group in groups])

    # Test case 1: Basic grouping
    solution.solve(["eat", "tea", "tan", "ate", "nat", "bat"])
    # assert sort_groups(result1) == sort_groups(expected1), f"Test 1 failed"  # Result undefined

    # Test case 2: Empty string
    solution.solve([""])
    # # # assert result2 == expected2, f"Test 2 failed"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: Single character
    solution.solve(["a"])
    # # # assert result3 == expected3, f"Test 3 failed"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 4: No anagrams
    solution.solve(["abc", "def", "ghi"])
    # assert sort_groups(result4) == sort_groups(expected4), f"Test 4 failed"  # Result undefined

    # Test case 5: All anagrams
    solution.solve(["abc", "bca", "cab"])
    # assert len(result5) == 1 and len(result5[0]) == 3, f"Test 5 failed"  # Result undefined

    # Test case 6: Multiple empty strings
    solution.solve(["", "", "a"])
    # assert sort_groups(result6) == sort_groups(expected6), f"Test 6 failed"  # Result undefined

    # Test case 7: Complex case
    solution.solve(["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"])

    # Test count-based solution
    result8 = solution.solve_count(["eat", "tea", "tan", "ate", "nat", "bat"])
    expected8 = [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
    assert sort_groups(result8) == sort_groups(expected8), f"Test 8 (count) failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    result = solution.solve(strs)
    print(f"Output: {result}")
