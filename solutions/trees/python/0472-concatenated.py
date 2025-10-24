"""
# Difficulty: Medium

# 0472. Concatenated Words

Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses"]</dd>
<dt>Output:</dt>
<dd>["catsdogcats","dogcatsdog"]</dd>
<dt>Explanation:</dt>
<dd>Concatenated words are formed by combining other words: 'catsdogcats' = 'cats' + 'dog' + 'cats'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Dynamic Programming
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build Trie of all words. For each word, DFS from Trie root trying to match it as concatenation of words. Use memoization on position. Word is valid if complete match with 2+ words.

### APPROACH:
1. **Sort by length**: Sort words by length
2. **Build set**: Create word_set from words
3. **Define canForm**: Implement function to check if word can be formed
4. **Use DP**: For each word, use dp[i] = True if word[:i] can be segmented
5. **Check segments**: For each position, try all possible word breaks
6. **Validate**: Word is concatenated if dp[len(word)] is True
7. **Filter results**: Return words that can be formed by concatenation

### WHY THIS WORKS:
- Trie stores all words, DFS checks if word can be formed by concatenating
- For each position, try all words that match from that position
- Word is concatenated if formed by >= 2 words (track depth)
- Memoization caches (pos, depth) to avoid recomputing subproblems
- O(n * m * k) time: n words, m avg length, k concatenation attempts

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses"]
```

Step 1: Check each word
"catsdogcats" = "cats" + "dog" + "cats" ✓
"dogcatsdog" = "dog" + "cats" + "dog" ✓

Output:
```
["catsdogcats","dogcatsdog"]
```

### TIME COMPLEXITY:
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple, Set


class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        """
        Find all concatenated words in the given list of words.

        Args:
            words: List of strings to check for concatenated words

        Returns:
            List of strings that are concatenated words
        """
        # Handle edge cases
        if not words:
            return []

        # Convert list to set for O(1) lookup
        word_set = set(words)
        result: list[Any] = []

        def can_form(word: str, word_set: Set[str], start: int, memo: dict) -> bool:
            """
            Helper function to check if a word can be formed by concatenating other words.
            Uses dynamic programming with memoization for optimization.

            Args:
                word: String to check
                word_set: Set of all available words
                start: Starting index in the word
                memo: Memoization dictionary

            Returns:
                Boolean indicating if the word can be formed
            """
            # Base case: reached end of word
            if start == len(word):
                return True

            # Check memoization
            if start in memo:
                return memo[start]

            # Try all possible prefixes from current position
            for end in range(start + 1, len(word) + 1):
                prefix = word[start:end]
                # Check if prefix is in word_set (excluding the word itself)
                if prefix in word_set and prefix != word:
                    if can_form(word, word_set, end, memo):
                        memo[start] = True
                        return True

            memo[start] = False
            return False

        # Check each word in the list
        for word in words:
            # Skip empty strings and single-character words
            if not word:
                continue

            # Check if current word can be formed by concatenating other words
            if can_form(word, word_set, 0, {}):
                result.append(word)

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findAllConcatenatedWordsInADict(
        ["cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat"]
    )
    expected = ["catsdogcats", "dogcatsdog", "ratcatdogcat"]
    assert sorted(result) == sorted(expected), f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.findAllConcatenatedWordsInADict([])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: No concatenated words
    result = solution.findAllConcatenatedWordsInADict(["a", "b", "c"])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 472. Concatenated")
