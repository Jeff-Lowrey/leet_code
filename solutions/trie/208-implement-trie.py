"""
208. Implement Trie (Prefix Tree)
Medium

A trie (pronounced as "try") or prefix tree is a tree data structure used to
efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class:
- Trie() Initializes the trie object.
- void insert(String word) Inserts the string word into the trie.
- boolean search(String word) Returns true if the string word is in the trie.
- boolean startsWith(String prefix) Returns true if there is any string in the
  trie that starts with the given prefix.

Example:
Input:
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output:
[null, null, true, false, true, null, true]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
A Trie (prefix tree) stores strings in a tree structure where each path from root to a node represents a prefix. This allows for efficient string operations by sharing common prefixes between words.

### APPROACH:
1. **TrieNode Structure**: Each node contains:
   - `children`: dictionary mapping characters to child nodes
   - `is_end`: boolean marking if a word ends at this node
2. **Insert**: Follow the path character by character, creating nodes as needed
3. **Search**: Follow the path and check if we reach a word ending
4. **StartsWith**: Follow the path and check if we can complete the prefix

### WHY THIS WORKS:
The tree structure naturally represents the prefix relationships between strings. Each level represents a character position, and paths represent actual strings. The `is_end` flag distinguishes between prefixes and complete words.

### TIME COMPLEXITY: O(m)
- m is the length of the word/prefix
- All operations traverse exactly m nodes

### SPACE COMPLEXITY: O(ALPHABET_SIZE × N × M)
- N is number of words, M is average word length
- In worst case, no prefixes are shared
- For lowercase English: up to 26 children per node

### EXAMPLE WALKTHROUGH:
Inserting "apple" and "app":
```
      root
       |
       a
       |
       p
       |
       p (is_end=True for "app")
       |
       l
       |
       e (is_end=True for "apple")
```

### OPERATIONS:
- **search("app")**: Follow a→p→p, find is_end=True → return True
- **search("appl")**: Follow a→p→p→l, find is_end=False → return False
- **startsWith("ap")**: Follow a→p, node exists → return True

### APPLICATIONS:
- Autocomplete/auto-suggestion
- Spell checkers
- Word games (Scrabble, Boggle)
- IP routing tables
- String matching with wildcards

</details>

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    """
    Time Complexity: O(m) for all operations where m is key length
    Space Complexity: O(ALPHABET_SIZE * N * M) where N is number of keys
    """

    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._search_prefix(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._search_prefix(prefix) is not None

    def _search_prefix(self, prefix: str) -> TrieNode:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node


"""
211. Design Add and Search Words Data Structure
Medium

Design a data structure that supports adding new words and finding if a string
matches any previously added string.

Implement the WordDictionary class:
- WordDictionary() Initializes the object.
- void addWord(word) Adds word to the data structure.
- bool search(word) Returns true if there is any string in the data structure
  that matches word. word may contain dots '.' where dots can be matched with
  any letter.

Example:
Input:
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output:
[null,null,null,null,false,true,true,true]
"""

class WordDictionary:
    """
    Time Complexity: O(m) for addWord, O(m * 26^n) worst case for search
    where n is number of dots
    """

    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        def dfs(node, index):
            if index == len(word):
                return node.is_end

            char = word[index]
            if char == '.':
                # Try all possible characters
                for child in node.children.values():
                    if dfs(child, index + 1):
                        return True
                return False
            else:
                if char not in node.children:
                    return False
                return dfs(node.children[char], index + 1)

        return dfs(self.root, 0)


"""
212. Word Search II
Hard

Given an m x n board of characters and a list of strings words, return all words
on the board.

Each word must be constructed from letters of sequentially adjacent cells, where
adjacent cells are horizontally or vertically neighboring. The same letter cell
may not be used more than once in a word.

Example:
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
       words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
"""

class SolutionWordSearch:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        """
        Approach: Trie + DFS
        Time Complexity: O(m * n * 4^L) where L is max word length
        Space Complexity: O(TOTAL_CHARS)
        """
        # Build Trie
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.is_end = True
            node.word = word  # Store the word at end node

        rows, cols = len(board), len(board[0])
        result = []

        def dfs(r, c, node):
            char = board[r][c]

            if char not in node.children:
                return

            next_node = node.children[char]

            if next_node.is_end:
                result.append(next_node.word)
                next_node.is_end = False  # Avoid duplicates

            board[r][c] = '#'  # Mark as visited

            # Explore neighbors
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                    dfs(nr, nc, next_node)

            board[r][c] = char  # Restore

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, root)

        return result


# Test cases
if __name__ == "__main__":
    # Test Trie
    print("Testing Trie:")
    trie = Trie()
    operations = [
        ("insert", "apple"),
        ("search", "apple"),
        ("search", "app"),
        ("startsWith", "app"),
        ("insert", "app"),
        ("search", "app")
    ]

    for op in operations:
        if op[0] == "insert":
            trie.insert(op[1])
            print(f"Inserted '{op[1]}'")
        elif op[0] == "search":
            result = trie.search(op[1])
            print(f"Search '{op[1]}': {result}")
        else:
            result = trie.startsWith(op[1])
            print(f"Starts with '{op[1]}': {result}")

    print("\n" + "="*50 + "\n")

    # Test WordDictionary
    print("Testing WordDictionary:")
    wd = WordDictionary()
    wd_operations = [
        ("add", "bad"),
        ("add", "dad"),
        ("add", "mad"),
        ("search", "pad"),
        ("search", "bad"),
        ("search", ".ad"),
        ("search", "b..")
    ]

    for op in wd_operations:
        if op[0] == "add":
            wd.addWord(op[1])
            print(f"Added '{op[1]}'")
        else:
            result = wd.search(op[1])
            print(f"Search '{op[1]}': {result}")
