"""
# 211. Design Add and Search Words Data Structure
# Difficulty: Medium
Design a data structure that supports adding new words and finding if a string matches any previously added string.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need a data structure that can efficiently store words and support wildcard searches.
A Trie (prefix tree) is perfect for this - it allows efficient storage and search with wildcard support.

### APPROACH:
1. **Trie Structure**: Each node has a dictionary of children and a boolean flag for word end
2. **addWord**: Insert word character by character into the trie
3. **search**: Use DFS/recursion to handle wildcards ('.')
   - Regular character: follow that specific path
   - Wildcard '.': try all possible children paths

### WHY THIS WORKS:
- Trie provides efficient prefix-based storage
- DFS naturally handles the branching required by wildcards
- Each node maintains children references and word-end markers
- Time complexity is optimal for both operations

### TIME COMPLEXITY:
- addWord: O(n) where n is word length
- search: O(26^m) worst case where m is number of wildcards, O(n) average

### SPACE COMPLEXITY: O(total characters in all words)

### EXAMPLE WALKTHROUGH:
```
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search(".ad") -> true (matches "bad", "dad", "mad")
search("b..") -> true (matches "bad")
```

### EDGE CASES:
- Empty string
- All wildcards
- No matches
- Single character words

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses a Trie with DFS for wildcard searching.

### Algorithm Steps:
1. Build Trie structure with TrieNode class
2. addWord: Insert characters into trie
3. search: Use DFS to handle wildcards recursively

</details>
"""

class TrieNode:
    """Node in the Trie data structure."""

    def __init__(self):
        """Initialize a Trie node."""
        self.children = {}  # Map from character to TrieNode
        self.is_word = False  # True if this node marks the end of a word

class WordDictionary:
    """
    Data structure for adding and searching words with wildcard support.

    Supports '.' as a wildcard that matches any single character.
    """

    def __init__(self):
        """
        Initialize the WordDictionary.

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        """
        Add a word to the dictionary.

        Args:
            word: Word to add

        Time Complexity: O(n) where n is the length of the word
        Space Complexity: O(n) in worst case for new word
        """
        node = self.root

        # Traverse or create path for each character
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]

        # Mark end of word
        node.is_word = True

    def search(self, word: str) -> bool:
        """
        Search for a word in the dictionary.

        Supports '.' as wildcard that matches any single character.

        Args:
            word: Word to search for (may contain '.')

        Returns:
            bool: True if word exists or matches pattern

        Time Complexity: O(n) best case, O(26^m) worst case where m is wildcards
        Space Complexity: O(n) for recursion stack
        """
        return self._search_helper(word, 0, self.root)

    def _search_helper(self, word: str, index: int, node: TrieNode) -> bool:
        """
        Helper method for recursive search with wildcard support.

        Args:
            word: Word being searched
            index: Current position in word
            node: Current TrieNode

        Returns:
            bool: True if remaining word matches from this node
        """
        # Base case: reached end of word
        if index == len(word):
            return node.is_word

        char = word[index]

        # Case 1: Wildcard - try all children
        if char == '.':
            for child in node.children.values():
                if self._search_helper(word, index + 1, child):
                    return True
            return False

        # Case 2: Regular character
        if char not in node.children:
            return False

        return self._search_helper(word, index + 1, node.children[char])

def test_solution():
    """
    Test cases for WordDictionary.
    """
    # Test case 1: Basic functionality
    wd1 = WordDictionary()
    wd1.addWord("bad")
    wd1.addWord("dad")
    wd1.addWord("mad")
    assert wd1.search("pad") == False
    assert wd1.search("bad") == True
    assert wd1.search(".ad") == True
    assert wd1.search("b..") == True
    assert wd1.search("...") == True
    assert wd1.search("b.d") == True

    # Test case 2: No matches
    wd2 = WordDictionary()
    wd2.addWord("at")
    wd2.addWord("and")
    wd2.addWord("an")
    wd2.addWord("add")
    assert wd2.search("a") == False
    assert wd2.search(".at") == False
    assert wd2.search("an.") == True
    assert wd2.search("a.d.") == False
    assert wd2.search("b.") == False
    assert wd2.search("a.d") == True
    assert wd2.search(".") == False

    # Test case 3: Single character
    wd3 = WordDictionary()
    wd3.addWord("a")
    assert wd3.search("a") == True
    assert wd3.search(".") == True
    assert wd3.search("b") == False
    assert wd3.search("..") == False

    # Test case 4: Longer words with wildcards
    wd4 = WordDictionary()
    wd4.addWord("hello")
    wd4.addWord("world")
    assert wd4.search("hello") == True
    assert wd4.search("h....") == True
    assert wd4.search(".orld") == True
    assert wd4.search("w.r.d") == True
    assert wd4.search("....o") == True
    assert wd4.search("......") == False

    # Test case 5: Multiple words with common prefix
    wd5 = WordDictionary()
    wd5.addWord("run")
    wd5.addWord("runner")
    wd5.addWord("running")
    assert wd5.search("run") == True
    assert wd5.search("runner") == True
    assert wd5.search("running") == True
    assert wd5.search("run...") == True
    assert wd5.search("r.n") == True
    assert wd5.search("r.nning") == True

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("WordDictionary demonstration:")
    word_dict = WordDictionary()

    word_dict.addWord("bad")
    word_dict.addWord("dad")
    word_dict.addWord("mad")

    print(f'search("pad") = {word_dict.search("pad")}')  # False
    print(f'search("bad") = {word_dict.search("bad")}')  # True
    print(f'search(".ad") = {word_dict.search(".ad")}')  # True
    print(f'search("b..") = {word_dict.search("b..")}')  # True
    print(f'search("...") = {word_dict.search("...")}')  # True
