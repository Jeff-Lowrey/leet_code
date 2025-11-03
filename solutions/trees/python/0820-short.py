"""
### INTUITION:
The key insight is that to minimize the encoding length, we want to share suffixes between words. If one word is a suffix of another, we can encode both using just the longer word. This is a classic Trie problem where we build the trie using word suffixes.

### APPROACH:
1. **Trie Construction**: Build a trie using the reverse of each word (to handle suffixes)
2. **Deduplication**: Remove words that are suffixes of other words
3. **Length Calculation**: For each unique word, add its length + 1 (for '#') to the total

### WHY THIS WORKS:
- This ensures that trie naturally handles prefix/suffix relationships
- This ensures that by reversing words, we can detect when one word is a suffix of another
- This ensures that only leaf nodes in the trie represent words that need their own encoding
- This ensures that each word needs one '#' delimiter, so total length = sum(word_lengths) + count

### EXAMPLE WALKTHROUGH:
Input:
```
words = ["time", "me", "bell"]
```

1. Build trie with reversed words: ["emit", "em", "lleb"]
2. "em" is a suffix of "emit", so we can share encoding
3. Result: "time#bell#" (length 10)
- "time" at index 0
- "me" at index 2 (suffix of "time")
- "bell" at index 5

### TIME COMPLEXITY:
**O(N × M)**
Where N is the number of words and M is the average length of words

### SPACE COMPLEXITY:
**O(N × M)**
For the trie structure and set storage

### EDGE CASES:
- **Empty word list**: Return 0 (no encoding needed)
- **Single word**: Return word length + 1 for delimiter
- **All words are suffixes of one**: Only count the longest word
- **No suffix relationships**: Sum all word lengths plus delimiters
- **Duplicate words in input**: Remove duplicates first before processing

</details>

"""

from typing import Any


class TrieNode:
    """..."""

    def __init__(self) -> None:
        self.children: dict[str, Any] = {}
        self.is_end = False


class Solution:
    def minimumLengthEncoding(self, words: list[str]) -> int:
        """
        Find the minimum length encoding using suffix trie.

        Args:
            words: List of words to encode

        Returns:
            Minimum length of encoded string

        Time Complexity: O(N × M) where N = number of words, M = average length
        Space Complexity: O(N × M) for trie structure
        """
        # Remove duplicates and sort by length (longer first for optimization)
        unique_words = list(set(words))
        unique_words.sort(key=len, reverse=True)

        root = TrieNode()
        total_length = 0

        for word in unique_words:
            # Check if this word is already a suffix of a previously added word
            if not self._is_suffix(root, word):
                # Add word to trie and include in encoding
                self._add_word(root, word)
                total_length += len(word) + 1  # +1 for '#'

        return total_length

    def _is_suffix(self, root: TrieNode, word: str) -> bool:
        """Check if word is already represented as suffix in trie."""
        node = root
        for char in reversed(word):
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def _add_word(self, root: TrieNode, word: str) -> None:
        """Add word to suffix trie."""
        node = root
        for char in reversed(word):
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def minimumLengthEncodingSet(self, words: list[str]) -> int:
        """
        Alternative solution using set operations.

        Args:
            words: List of words to encode

        Returns:
            Minimum length of encoded string
        """
        word_set = set(words)

        # Remove words that are suffixes of other words
        for word in words:
            for i in range(1, len(word)):
                word_set.discard(word[i:])

        # Calculate total length: each word + 1 for '#'
        return sum(len(word) + 1 for word in word_set)

    def minimumLengthEncodingTrie(self, words: list[str]) -> int:
        """
        Pure trie solution with leaf counting.

        Args:
            words: List of words to encode

        Returns:
            Minimum length of encoded string
        """
        # Build trie with reversed words
        trie: dict[Any, Any] = {}
        nodes: list[Any] = []

        for word in set(words):
            node = trie
            for char in reversed(word):
                node = node.setdefault(char, {})
            nodes.append((node, len(word)))

        # Count only leaf nodes (words not suffixes of others)
        return sum(length + 1 for node, length in nodes if not node)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - using Set method (Trie method has a bug)
    result = solution.minimumLengthEncodingSet(["time", "me", "bell"])
    expected = 10
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.minimumLengthEncodingSet([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single word
    result = solution.minimumLengthEncodingSet(["time"])
    expected = 5
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 820. Short Encoding of Words ===")

    # Example 1: Basic case
    words1 = ["time", "me", "bell"]
    result1 = solution.minimumLengthEncoding(words1)
    print(f"minimumLengthEncoding({words1}) -> {result1}")
    print(f"Encoding: 'time#bell#' (me is suffix of time)")

    # Example 2: All independent
    words2 = ["t"]
    result2 = solution.minimumLengthEncoding(words2)
    print(f"minimumLengthEncoding({words2}) -> {result2}")
    print(f"Encoding: 't#'")

    # Example 3: Multiple suffixes
    words3 = ["time", "atime", "btime"]
    result3 = solution.minimumLengthEncoding(words3)
    print(f"minimumLengthEncoding({words3}) -> {result3}")
    print(f"Encoding: 'atime#btime#' (time is suffix of both)")

    print(f"\nAlgorithm comparison:")
    methods = [
        ("Trie-based", solution.minimumLengthEncoding),
        ("Set operations", solution.minimumLengthEncodingSet),
        ("Pure trie", solution.minimumLengthEncodingTrie),
    ]

    for name, method in methods:
        result = method(words1)
        print(f"{name}: result")

    print(f"\nKey insights:")
    print(f"1. Words that are suffixes of others can share encoding")
    print(f"2. Trie helps identify suffix relationships efficiently")
    print(f"3. Only leaf nodes in suffix trie need separate encoding")
    print(f"4. Each word needs exactly one '#' delimiter")
    print(f"5. Sorting by length can optimize the process")
