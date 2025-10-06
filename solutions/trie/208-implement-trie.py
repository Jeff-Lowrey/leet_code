"""
# 208. Implement Trie
**Medium**

A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:
- Trie() Initializes the trie object.
- void insert(String word) Inserts the string word into the trie.
- boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
- boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A trie is a tree where each node represents a character and paths from root to nodes represent prefixes or complete words. Each node has children for possible next characters and a flag indicating if it's the end of a word.

### APPROACH:
1. **Node structure**: Each node has a dictionary of children and a boolean end flag
2. **Insert**: Follow/create path for each character, mark end node
3. **Search**: Follow path, return true only if path exists and ends at marked node
4. **StartsWith**: Follow path, return true if path exists regardless of end flag

### WHY THIS WORKS:
- Tree structure naturally represents prefix relationships
- Each level represents position in word/prefix
- End flags distinguish complete words from partial prefixes
- Dictionary children allow efficient character lookup

### TIME COMPLEXITY: O(m)
Where m is the length of the word/prefix for all operations

### SPACE COMPLEXITY: O(ALPHABET_SIZE × N × M)
Where N is number of words and M is average length

### EXAMPLE WALKTHROUGH:
```
Insert "app":
root → 'a' → 'p' → 'p' (end=True)

Insert "apple":
root → 'a' → 'p' → 'p' → 'l' → 'e' (end=True)

Search "app": root → 'a' → 'p' → 'p' (end=True) → True
Search "appl": root → 'a' → 'p' → 'p' → 'l' (end=False) → False
StartsWith "app": root → 'a' → 'p' → 'p' (exists) → True
```

### KEY INSIGHTS:
- Use dictionary for children to handle any character
- End flag crucial for distinguishing words vs prefixes
- Shared prefixes save space through common path sharing
- Path traversal is core operation for all methods

</details>
"""

class TrieNode:
    """Node in the trie data structure."""

    def __init__(self):
        self.children = {}  # Dictionary mapping character to child node
        self.is_end_word = False  # True if this node represents end of a word

class Trie:
    """
    Trie (Prefix Tree) implementation for efficient string operations.
    """

    def __init__(self):
        """Initialize the trie with empty root node."""
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        """
        Insert a word into the trie.

        Args:
            word: String to insert

        Time Complexity: O(m) where m is length of word
        Space Complexity: O(m) for new nodes in worst case
        """
        current = self.root

        for char in word:
            if char not in current.children:
                current.children[char] = TrieNode()
            current = current.children[char]

        current.is_end_word = True

    def search(self, word: str) -> bool:
        """
        Search for a complete word in the trie.

        Args:
            word: String to search for

        Returns:
            True if word exists as complete word, False otherwise

        Time Complexity: O(m) where m is length of word
        Space Complexity: O(1)
        """
        current = self.root

        for char in word:
            if char not in current.children:
                return False
            current = current.children[char]

        return current.is_end_word

    def startsWith(self, prefix: str) -> bool:
        """
        Check if any word in trie starts with given prefix.

        Args:
            prefix: Prefix string to check

        Returns:
            True if any word has this prefix, False otherwise

        Time Complexity: O(m) where m is length of prefix
        Space Complexity: O(1)
        """
        current = self.root

        for char in prefix:
            if char not in current.children:
                return False
            current = current.children[char]

        return True


class TrieAlternative:
    """Alternative trie implementation using arrays for children."""

    def __init__(self):
        """Initialize with root node using array for children."""
        self.root = [None] * 26  # For lowercase letters a-z
        self.is_word = [False] * 1  # Track if root is end of word
        self.size = 1  # Track total nodes for dynamic allocation

    def _char_index(self, char: str) -> int:
        """Convert character to array index."""
        return ord(char) - ord('a')

    def insert(self, word: str) -> None:
        """Insert word using array-based children."""
        current_idx = 0  # Start at root (index 0)

        for char in word:
            char_idx = self._char_index(char)

            # Create new node if needed
            if self.root[current_idx * 26 + char_idx] is None:
                # Expand arrays if needed
                while len(self.root) <= (self.size + 1) * 26:
                    self.root.extend([None] * 26)
                    self.is_word.append(False)

                self.root[current_idx * 26 + char_idx] = self.size
                current_idx = self.size
                self.size += 1
            else:
                current_idx = self.root[current_idx * 26 + char_idx]

        self.is_word[current_idx] = True

def test_solution():
    """Test cases for 208. Implement Trie."""

    # Test basic Trie operations
    trie = Trie()

    # Test insert and search
    trie.insert("apple")
    assert trie.search("apple") == True
    assert trie.search("app") == False
    assert trie.startsWith("app") == True

    trie.insert("app")
    assert trie.search("app") == True

    # Test more complex operations
    trie.insert("application")
    assert trie.search("application") == True
    assert trie.startsWith("appl") == True
    assert trie.search("appl") == False

    # Test non-existent words
    assert trie.search("banana") == False
    assert trie.startsWith("ban") == False

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    trie = Trie()
    words = ["apple", "app", "application", "apply"]

    print("=== 208. Implement Trie ===")
    print("Inserting words:", words)

    for word in words:
        trie.insert(word)

    # Test searches
    test_words = ["app", "appl", "apple", "banana"]
    for word in test_words:
        found = trie.search(word)
        prefix = trie.startsWith(word[:3] if len(word) >= 3 else word)
        print(f"'{word}': found={found}, prefix='{word[:3]}'={prefix}")

    print("\nTrie structure efficiently stores shared prefixes!")
