"""
# Difficulty: Easy

# 720. Longest Word In Dictionary

Given an array of strings words representing an English Dictionary, return the longest word in words that can be built one character at a time by other words in words.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["w", "wo", "wor", "worl", "world"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Longest word in dictionary built one char at a time is 'world'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(N * L)
**Space Complexity**: O(N * L)

### INTUITION:
We need to find the longest word where all its prefixes exist as words in the dictionary. A Trie is perfect for this because we can check if a word can be built character by character by verifying that each intermediate node represents a complete word. DFS or BFS through the trie helps us find the longest buildable word.

### APPROACH:
1. **Build Trie**: Insert all words, marking word ends
2. **DFS/BFS traversal**: Explore trie paths where every node is a word end
3. **Track longest**: Keep track of longest word found
4. **Lexicographic order**: When same length, choose lexicographically smaller
5. **Validate path**: Only continue if current node is a word end

### WHY THIS WORKS:
- Trie naturally represents prefix relationships
- Word end markers indicate which prefixes are valid words
- DFS/BFS explores all buildable words systematically
- Path validation ensures all prefixes exist
- Lexicographic ordering handled by trie structure (or sorting)

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["w","wo","wor","worl","world"]
```

Build Trie:
DFS from root:
Build Trie:

Steps:
Step 1: root -> 'w' (word end)
Step 2: -> 'o' (word end)
Step 3: -> 'r' (word end)
Step 4: -> 'l' (word end)
Step 5: -> 'd' (word end)
Step 6: Visit 'w' (is word) -> can continue
Step 7: Visit 'wo' (is word) -> can continue
Step 8: Visit 'wor' (is word) -> can continue
Step 9: Visit 'worl' (is word) -> can continue
Step 10: Visit 'world' (is word) -> found! length=5
Step 11: Result: "world" (all prefixes are words)
Step 12: words = ["a","banana","app","appl","ap","apply","apple"]
Step 13: root -> 'a' (word end)
Step 14: -> 'p' (word end)
Step 15: -> 'p' (NOT word end) -> can't continue
Step 16: -> 'l' (word end)
Step 17: -> 'e' (word end) -> "apple" ✓
Step 18: -> 'y' (word end) -> "apply" ✓
Step 19: Result: "apple" (lexicographically smaller than "apply")

Output:
```
"world"
```

### TIME COMPLEXITY:
O(N * L)
Where N is number of words, L is average word length
- Building trie: O(N * L)
- DFS traversal: O(N * L)

### SPACE COMPLEXITY:
O(N * L)
For trie storage

### EDGE CASES:
- Empty word list
- Single character words
- No buildable words
- Multiple words of same length
- All words are prefixes of each other

</details>
"""

import re


class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word
        self.is_word: bool = False  # Alias for is_end


class Solution:
    def longestWord(self, words: list[str]) -> str:
        """
        Find longest word that can be built one character at a time.

        Args:
            words: List of dictionary words

        Returns:
            Longest buildable word (lexicographically smallest if tie)

        Time Complexity: O(N * L) where N is words count, L is average length
        Space Complexity: O(N * L) for trie storage
        """
        if not words:
            return ""

        # Build trie
        root = TrieNode()

        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_word = True
            node.word = word

        # DFS to find longest buildable word

        def dfs(node: TrieNode) -> str:
            """Find longest buildable word from this node."""
            result = node.word if node.word else ""

            # Explore children - only if child is also a word
            for child_node in node.children.values():
                if child_node.is_word:  # Can only continue if this is a word
                    candidate = dfs(child_node)

                    # Update result if candidate is longer, or same length but smaller
                    if len(candidate) > len(result) or (len(candidate) == len(result) and candidate < result):
                        result = candidate

            return result

        # Start DFS from root (empty word)
        return dfs(root)


class SolutionBFS:
    """Alternative solution using BFS level by level."""

    def longestWord(self, words: list[str]) -> str:
        """
        Find longest word using BFS.

        Time Complexity: O(N * L)
        Space Complexity: O(N * L)
        """
        if not words:
            return ""

        # Build trie
        root = TrieNode()

        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_word = True
            node.word = word

        # BFS to find longest word
        queue = [root]
        longest = ""

        while queue:
            node = queue.pop(0)

            # Update longest if this node has a longer word
            if node.word and (
                len(node.word) > len(longest) or (len(node.word) == len(longest) and node.word < longest)
            ):
                longest = node.word

            # Add children that are words (buildable)
            for child in node.children.values():
                if child.is_word:
                    queue.append(child)

        return longest


class SolutionSort:
    """Simple solution using sorting and set."""

    def longestWord(self, words: list[str]) -> str:
        """
        Sort words and check if all prefixes exist.

        Time Complexity: O(N * L * log N)
        Space Complexity: O(N)
        """
        if not words:
            return ""

        # Sort by length (ascending), then lexicographically
        words.sort(key=lambda x: (len(x), x))

        word_set = {""}  # Empty string is always buildable
        longest = ""

        for word in words:
            # Check if prefix (all but last char) exists
            if word[:-1] in word_set:
                word_set.add(word)
                # Update longest (already sorted, so later = longer or lex smaller)
                if len(word) > len(longest):
                    longest = word

        return longest


class SolutionSimple:
    """Simplest solution checking all prefixes."""

    def longestWord(self, words: list[str]) -> str:
        """
        Check each word's prefixes directly.

        Time Complexity: O(N^2 * L)
        Space Complexity: O(N)
        """
        word_set = set(words)
        longest = ""

        for word in words:
            # Check if all prefixes exist
            valid = True
            for i in range(1, len(word)):
                if word[:i] not in word_set:
                    valid = False
                    break

            if valid:
                # Update longest
                if len(word) > len(longest) or (len(word) == len(longest) and word < longest):
                    longest = word

        return longest


def test_solution() -> None:
    """Test cases for 720. Longest Word In Dictionary."""
    solution = Solution()
    solution_bfs = SolutionBFS()
    solution_sort = SolutionSort()
    solution_simple = SolutionSimple()

    # Test case 1: Standard case
    words1 = ["w", "wo", "wor", "worl", "world"]
    expected1 = "world"
    assert solution.longestWord(words1) == expected1
    assert solution_bfs.longestWord(words1) == expected1
    assert solution_sort.longestWord(words1) == expected1
    assert solution_simple.longestWord(words1) == expected1

    # Test case 2: Lexicographic tie
    words2 = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
    expected2 = "apple"
    assert solution.longestWord(words2) == expected2
    assert solution_bfs.longestWord(words2) == expected2
    assert solution_sort.longestWord(words2) == expected2
    assert solution_simple.longestWord(words2) == expected2

    # Test case 3: No buildable word
    words3 = ["abc", "xyz"]
    expected3 = ""
    assert solution.longestWord(words3) == expected3
    assert solution_bfs.longestWord(words3) == expected3
    assert solution_sort.longestWord(words3) == expected3
    assert solution_simple.longestWord(words3) == expected3

    # Test case 4: Single char words
    words4 = ["a", "b", "c"]
    result4 = solution.longestWord(words4)
    assert result4 in ["a", "b", "c"] and len(result4) == 1
    assert solution_sort.longestWord(words4) == "a"  # Lexicographically smallest

    # Test case 5: Complex case
    words5 = ["m", "mo", "moc", "moch", "mocha", "l", "la", "lat", "latt", "latte", "c", "ca", "cat"]
    result5 = solution.longestWord(words5)
    assert result5 in ["mocha", "latte"]  # Both length 5
    result5_sort = solution_sort.longestWord(words5)
    assert result5_sort == "latte"  # Lexicographically first

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 720. Longest Word In Dictionary ===")

    solution = Solution()

    words = ["w", "wo", "wor", "worl", "world"]
    print(f"Words: {words}")
    result = solution.longestWord(words)
    print(f"Longest buildable word: '{result}'")

    print("\nExample with lexicographic tie:")
    words2 = ["a", "banana", "app", "appl", "ap", "apply", "apple"]
    print(f"Words: {words2}")
    result2 = solution.longestWord(words2)
    print(f"Longest buildable word: '{result2}'")
    print("  ('apple' and 'apply' both length 5, but 'apple' is lexicographically smaller)")

    print("\nExample with multiple branches:")
    solution_sort = SolutionSort()
    words3 = ["m", "mo", "moc", "moch", "mocha", "l", "la", "lat", "latt", "latte"]
    print(f"Words: {words3}")
    result3 = solution_sort.longestWord(words3)
    print(f"Longest buildable word: '{result3}'")

    print("\nTrie-based longest buildable word search completed successfully!")
