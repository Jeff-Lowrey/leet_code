"""
# 676. Implement Magic Dictionary
**Medium**

Design a data structure that is initialized with a list of different words. Provided a string, you should determine if you can change exactly one character in this string to match any word in the data structure.

Implement the MagicDictionary class:
- MagicDictionary() Initializes the object.
- void buildDict(String[] dictionary) Sets the data structure with an array of distinct strings dictionary.
- bool search(String searchWord) Returns true if you can change exactly one character in searchWord to match any string in the data structure, otherwise returns false.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to find if we can change exactly one character in a search word to match any word in the dictionary. A trie is perfect for this as it allows efficient prefix matching and we can use DFS to explore all possible single-character changes.

### APPROACH:
1. **Build Trie**: Store all dictionary words in a trie structure
2. **DFS Search**: For each search, use DFS to explore all paths with exactly one character change
3. **Track Changes**: Use a flag to track if we've used our one allowed change
4. **Exact Match**: Must reach end of both search word and trie path with exactly one change

### WHY THIS WORKS:
- Trie structure enables efficient prefix matching
- DFS allows exploring all possible single character changes
- By tracking changes used, we ensure exactly one modification
- Early termination when more than one change is needed

### TIME COMPLEXITY:
- Build: O(n × l) where n is number of words, l is average length
- Search: O(26 × l) in worst case, but typically much better due to pruning

### SPACE COMPLEXITY: O(n × l)
For the trie structure storing all dictionary words

### EXAMPLE WALKTHROUGH:
```
Dictionary: ["hello", "leetcode"]
Search: "hhllo"

DFS Process:
1. Start at root, search word "hhllo"
2. At position 0: 'h' matches 'h' in "hello" path → continue
3. At position 1: 'h' doesn't match 'e' in "hello" → use one change, continue
4. At position 2: 'l' matches 'l' → continue
5. At position 3: 'l' matches 'l' → continue
6. At position 4: 'o' matches 'o' → continue
7. Reached end with exactly one change → return True
```

### KEY INSIGHTS:
- Trie enables efficient word storage and prefix matching
- DFS with change tracking finds all possible single modifications
- Must use exactly one change (not zero, not more than one)
- Can optimize by trying different characters only when needed

</details>
"""

class TrieNode:
    """Node in trie structure for magic dictionary."""

    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end = False  # Marks end of a word

class MagicDictionary:
    """Magic dictionary supporting single character change searches."""

    def __init__(self):
        """Initialize your data structure here."""
        self.root = TrieNode()

    def buildDict(self, dictionary: list[str]) -> None:
        """Build the dictionary from an array of distinct strings."""
        for word in dictionary:
            self._insert(word)

    def _insert(self, word: str) -> None:
        """Insert a word into the trie."""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, searchWord: str) -> bool:
        """
        Search if we can change exactly one character to match any word.

        Args:
            searchWord: Word to search with exactly one character change

        Returns:
            True if exactly one character change creates a match
        """
        def dfs(node: TrieNode, index: int, changed: bool) -> bool:
            """
            DFS search with change tracking.

            Args:
                node: Current trie node
                index: Current position in search word
                changed: Whether we've already used our one change

            Returns:
                True if we can complete the search with exactly one change
            """
            # Base case: reached end of search word
            if index == len(searchWord):
                return node.is_end and changed

            char = searchWord[index]

            # Try exact match (no change needed here)
            if char in node.children:
                if dfs(node.children[char], index + 1, changed):
                    return True

            # Try changing current character (if we haven't changed yet)
            if not changed:
                for next_char in node.children:
                    if next_char != char:  # This is a change
                        if dfs(node.children[next_char], index + 1, True):
                            return True

            return False

        return dfs(self.root, 0, False)

    def searchAlternative(self, searchWord: str) -> bool:
        """
        Alternative implementation using iterative approach with explicit tracking.

        Args:
            searchWord: Word to search

        Returns:
            True if exactly one character change creates a match
        """
        def canMatch(word: str) -> bool:
            """Check if word can be matched with exactly one change."""
            if len(word) != len(searchWord):
                return False

            changes = 0
            for i in range(len(word)):
                if word[i] != searchWord[i]:
                    changes += 1
                    if changes > 1:
                        return False

            return changes == 1

        # Get all words from trie
        def getAllWords() -> list[str]:
            """Extract all words from the trie."""
            words = []

            def dfs(node: TrieNode, current_word: str):
                if node.is_end:
                    words.append(current_word)

                for char, child_node in node.children.items():
                    dfs(child_node, current_word + char)

            dfs(self.root, "")
            return words

        all_words = getAllWords()
        return any(canMatch(word) for word in all_words)


def test_solution():
    """Test cases for Problem 676."""

    # Test case 1: Basic functionality
    magic_dict1 = MagicDictionary()
    magic_dict1.buildDict(["hello", "leetcode"])

    # Should return True - change 'h' to 'e' in "hhllo" to get "hello"
    result1 = magic_dict1.search("hhllo")
    assert result1 == True, f"Expected True, got {result1}"

    # Should return True - change 'e' to 'o' in "hell" to get "hello"
    result2 = magic_dict1.search("hell")
    assert result2 == False, f"Expected False, got {result2}"  # Different length

    # Should return False - "hello" matches exactly (0 changes)
    result3 = magic_dict1.search("hello")
    assert result3 == False, f"Expected False, got {result3}"

    # Should return True - change first 'e' to 'a' in "leetcode"
    result4 = magic_dict1.search("aeetcode")
    assert result4 == True, f"Expected True, got {result4}"

    # Test case 2: Edge cases
    magic_dict2 = MagicDictionary()
    magic_dict2.buildDict(["a", "aa", "aaa"])

    result5 = magic_dict2.search("a")
    assert result5 == False, f"Expected False, got {result5}"  # Exact match

    result6 = magic_dict2.search("b")
    assert result6 == True, f"Expected True, got {result6}"  # Change 'b' to 'a'

    result7 = magic_dict2.search("ab")
    assert result7 == True, f"Expected True, got {result7}"  # Change 'b' to 'a' to get "aa"

    result8 = magic_dict2.search("aab")
    assert result8 == True, f"Expected True, got {result8}"  # Change 'b' to 'a' to get "aaa"

    # Test case 3: No valid changes
    magic_dict3 = MagicDictionary()
    magic_dict3.buildDict(["abc"])

    result9 = magic_dict3.search("ab")
    assert result9 == False, f"Expected False, got {result9}"  # Wrong length

    result10 = magic_dict3.search("abcd")
    assert result10 == False, f"Expected False, got {result10}"  # Wrong length

    # Test alternative implementation
    result11 = magic_dict1.searchAlternative("hhllo")
    assert result11 == True, f"Alternative: Expected True, got {result11}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 676. Implement Magic Dictionary ===")

    # Example 1: Basic usage
    magic_dict = MagicDictionary()
    magic_dict.buildDict(["hello", "leetcode"])

    test_words = ["hhllo", "hello", "aeetcode", "leetcod", "xyz"]

    print(f"Dictionary: ['hello', 'leetcode']")
    for word in test_words:
        result = magic_dict.search(word)
        print(f"search('{word}') -> {result}")

    print(f"\nExample explanations:")
    print(f"- 'hhllo' -> True (change 2nd 'h' to 'e' to get 'hello')")
    print(f"- 'hello' -> False (exact match, 0 changes)")
    print(f"- 'aeetcode' -> True (change 1st 'a' to 'l' to get 'leetcode')")
    print(f"- 'leetcod' -> False (wrong length)")
    print(f"- 'xyz' -> False (no possible single change)")

    # Example 2: Different dictionary
    print(f"\n--- Different Dictionary ---")
    magic_dict2 = MagicDictionary()
    magic_dict2.buildDict(["a", "aa", "aaa"])

    test_words2 = ["a", "b", "ab", "aab", "aaab"]
    print(f"Dictionary: ['a', 'aa', 'aaa']")
    for word in test_words2:
        result = magic_dict2.search(word)
        print(f"search('{word}') -> {result}")

    print(f"\nKey insights:")
    print(f"1. Trie structure enables efficient prefix matching")
    print(f"2. DFS explores all possible single character changes")
    print(f"3. Must use exactly one change (not zero, not multiple)")
    print(f"4. Early termination prevents unnecessary exploration")
    print(f"5. Time complexity: O(26 × l) for search in worst case")