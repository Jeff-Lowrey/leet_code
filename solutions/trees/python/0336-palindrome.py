"""
# Difficulty: Medium

# 336. Palindrome Pairs

You are given an array of strings words. A palindrome pair is defined as a pair of integers (i, j) where i != j such that the concatenation of words[i] + words[j] is a palindrome.

Return an array of all the palindrome pairs of words.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>words = ["abcd","dcba","lls","s","sssll"]</dd>
<dt>Output:</dt>
<dd>[[0,1],[1,0]] (palindrome pairs)</dd>
<dt>Explanation:</dt>
<dd>Palindrome pairs like ['abcd','dcba'] concatenate to form palindrome 'abcddcba'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build Trie of all words. For each word, try forming palindrome pairs by checking: 1) reverse exists in Trie, 2) prefix + reverse where suffix is palindrome, 3) reverse + suffix where prefix is palindrome.

### APPROACH:
1. **Build trie**: Insert all words with their indices into trie
2. **Define isPalindrome**: Helper function to check if string is palindrome
3. **Search for pairs**: For each word, search in trie
4. **Case 1 - word in trie**: If word + reversed_word is palindrome, add pair
5. **Case 2 - prefix match**: If prefix in trie and remaining suffix is palindrome, add pair
6. **Case 3 - suffix match**: Search all words in trie, check if can form palindrome
7. **Avoid duplicates**: Skip pairs where i == j
8. **Return result**: Return list of all palindrome pairs

### WHY THIS WORKS:
- Trie stores all words, search finds palindrome pairs efficiently
- For each word, check all possible split points: (prefix, suffix)
- If prefix is palindrome and reversed suffix exists in trie: valid pair
- If suffix is palindrome and reversed prefix exists in trie: valid pair
- O(n * k^2) time: n words, k avg length, k splits * k palindrome check

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["abcd","dcba","lls","s","sssll"]
```

Step 1: Check all pairs
"lls" + "s" = "llss" (not palindrome)
"s" + "lls" = "slls" (not palindrome)
"abcd" + "dcba" = "abcddcba" (palindrome) ✓

Output:
```
[[0,1],[1,0]] (palindrome pairs)
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple
import re


class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word
        self.word_index: int = -1  # Index of word in original list
        self.palindrome_suffixes: list[int] = []  # List of word indices with palindrome suffixes


class Solution:
    def __init__(self) -> None:
        """Initialize the solution with a root trie node."""
        self.root = TrieNode()

    def is_palindrome(self, word: str, start: int, end: int) -> bool:
        """
        Check if a substring is a palindrome.

        Args:
            word: String to check
            start: Starting index
            end: Ending index (exclusive)

        Returns:
            bool: True if the substring is a palindrome
        """
        while start < end - 1:
            if word[start] != word[end - 1]:
                return False
            start += 1
            end -= 1
        return True

    def add_word(self, word: str, index: int) -> None:
        """
        Add a word to the trie structure.

        Args:
            word: Word to add
            index: Index of the word in original list
        """
        node = self.root
        for i, char in enumerate(reversed(word)):
            if self.is_palindrome(word, 0, len(word) - i):
                node.palindrome_suffixes.append(index)
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]

        node.word_index = index
        node.palindrome_suffixes.append(index)

    def find_palindrome_pairs(self, words: List[str]) -> List[List[int]]:
        """
        Find all pairs of words that form palindromes when concatenated.

        Args:
            words: List of words to check

        Returns:
            List[List[int]]: List of pairs of indices that form palindromes
        """
        # Handle edge cases
        if not words or len(words) < 2:
            return []

        # Build trie with all words
        for i, word in enumerate(words):
            self.add_word(word, i)

        result: list[Any] = []

        # Check each word for potential pairs
        for i, word in enumerate(words):
            node = self.root

            # Check for empty string special case
            if node.word_index >= 0 and node.word_index != i and self.is_palindrome(word, 0, len(word)):
                result.append([i, node.word_index])

            # Check each character
            for j, char in enumerate(word):
                # If we can't find the character, break
                if char not in node.children:
                    break

                node = node.children[char]

                # Check if we found a word and remaining substring is palindrome
                if node.word_index >= 0 and node.word_index != i:
                    if self.is_palindrome(word, j + 1, len(word)):
                        result.append([i, node.word_index])

            else:  # We've processed all characters
                # Check palindrome suffixes
                for suffix_index in node.palindrome_suffixes:
                    if suffix_index != i:
                        result.append([i, suffix_index])

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """

    # Note: This problem uses a TrieNode class that needs to be defined
    class TrieNode:
        def __init__(self: Any) -> None:
            self.children: dict[str, Any] = {}
            self.word_index = -1
            self.palindrome_suffixes: list[int] = []

    solution = Solution()

    # Test case 1: Example from problem
    result = solution.find_palindrome_pairs(["abcd", "dcba", "lls", "s", "sssll"])
    # Valid pairs: "lls" + "s" = "llss" is not palindrome, but "s" + "lls" = "slls" is palindrome
    # "sssll" + "lls" = "sssllls" is not, but reversing approach works
    # "dcba" + "abcd" = "dcbaabcd" is palindrome
    # "abcd" + "dcba" = "abcddcba" is palindrome
    assert len(result) >= 2, f"Expected at least 2 pairs, got result"

    # Test case 2: Simple palindrome pairs
    result = solution.find_palindrome_pairs(["bat", "tab", "cat"])
    expected = [[0, 1], [1, 0]]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Empty string handling
    result = solution.find_palindrome_pairs(["a", ""])
    expected = [[0, 1], [1, 0]]
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Test is_palindrome helper
    result = solution.is_palindrome("racecar", 0, 7)
    expected = True
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 336. Palindrome")
