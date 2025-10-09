"""
# Difficulty: Medium

# 820. Short Encoding of Words

A valid encoding of an array of words is any reference string s and an array of indices indices such that:
- words.length == indices.length
- The reference string s ends with the character '#'
- For each index indices[i], the substring of s starting at indices[i] and ending at the next '#' is equal to words[i]

Given an array of words, return the length of the shortest reference string s possible of any valid encoding of words.

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
To minimize the encoding length, we want to share suffixes between words. If one word is a suffix of another, we can encode both using just the longer word. This is a classic Trie problem where we build the trie using word suffixes.

### APPROACH:
1. **Trie Construction**: Build a trie using the reverse of each word (to handle suffixes)
2. **Deduplication**: Remove words that are suffixes of other words
3. **Length Calculation**: For each unique word, add its length + 1 (for '#') to the total

### WHY THIS WORKS:
- Trie naturally handles prefix/suffix relationships
- By reversing words, we can detect when one word is a suffix of another
- Only leaf nodes in the trie represent words that need their own encoding
- Each word needs one '#' delimiter, so total length = sum(word_lengths) + count

### EXAMPLE WALKTHROUGH:
```
Input: words = ["time", "me", "bell"]
1. Build trie with reversed words: ["emit", "em", "lleb"]
2. "em" is a suffix of "emit", so we can share encoding
3. Result: "time#bell#" (length 10)
   - "time" at index 0
   - "me" at index 2 (suffix of "time")
   - "bell" at index 5
```

### TIME COMPLEXITY:
O(N × M)
Where N is the number of words and M is the average length of words

### SPACE COMPLEXITY:
O(N × M)
For the trie structure and set storage

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""

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
        trie = {}
        nodes = []

        for word in set(words):
            node = trie
            for char in reversed(word):
                node = node.setdefault(char, {})
            nodes.append((node, len(word)))

        # Count only leaf nodes (words not suffixes of others)
        return sum(length + 1 for node, length in nodes if not node)

def test_solution():
    """Test cases for Problem 820."""
    solution = Solution()

    # Test case 1: Basic functionality
    words1 = ["time", "me", "bell"]
    result1 = solution.minimumLengthEncoding(words1)
    expected1 = 10  # "time#bell#"
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: All words are independent
    words2 = ["t"]
    result2 = solution.minimumLengthEncoding(words2)
    expected2 = 2  # "t#"
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Multiple suffix relationships
    words3 = ["time", "atime", "btime"]
    result3 = solution.minimumLengthEncoding(words3)
    expected3 = 12  # "atime#btime#" (time is suffix of both)
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Duplicates
    words4 = ["me", "me"]
    result4 = solution.minimumLengthEncoding(words4)
    expected4 = 3  # "me#"
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Chain of suffixes
    words5 = ["a", "aa", "aaa"]
    result5 = solution.minimumLengthEncoding(words5)
    expected5 = 4  # "aaa#"
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test alternative implementations
    result6 = solution.minimumLengthEncodingSet(words1)
    assert result6 == expected1, f"Set method: Expected {expected1}, got {result6}"

    result7 = solution.minimumLengthEncodingTrie(words1)
    assert result7 == expected1, f"Trie method: Expected {expected1}, got {result7}"

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
        ("Pure trie", solution.minimumLengthEncodingTrie)
    ]

    for name, method in methods:
        result = method(words1)
        print(f"{name}: {result}")

    print(f"\nKey insights:")
    print(f"1. Words that are suffixes of others can share encoding")
    print(f"2. Trie helps identify suffix relationships efficiently")
    print(f"3. Only leaf nodes in suffix trie need separate encoding")
    print(f"4. Each word needs exactly one '#' delimiter")
    print(f"5. Sorting by length can optimize the process")
