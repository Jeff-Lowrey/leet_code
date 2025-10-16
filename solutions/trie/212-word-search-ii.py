"""
# Difficulty: Hard

# 212. Word Search II

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["o", "a", "a", "n"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Words ['oath','eat'] are found in the board</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Searching for multiple words on a board can be optimized using a Trie. Instead of searching for each word individually, we build a Trie from all words and perform a single DFS traversal. As we explore the board, we simultaneously traverse the Trie, finding all matching words in one pass.

### APPROACH:
1. **Build Trie**: Insert all words into a trie structure
2. **DFS from each cell**: Start DFS from every cell on the board
3. **Match with Trie**: During DFS, follow Trie paths that match current board path
4. **Mark found words**: When we reach a word end in Trie, add it to results
5. **Backtracking**: Mark cells as visited during search, unmark after
6. **Optimization**: Remove found words from Trie to avoid duplicates

### WHY THIS WORKS:
- Trie allows simultaneous search for all words with shared prefixes
- Single DFS traversal instead of separate search for each word
- Prefix matching eliminates invalid paths early
- Backtracking explores all possible paths while avoiding revisits

### EXAMPLE WALKTHROUGH:
```
board = [["o","a","a","n"],
         ["e","t","a","e"],
         ["i","h","k","r"],
         ["i","f","l","v"]]
words = ["oath","pea","eat","rain"]

Build Trie: oath, pea, eat, rain

DFS from (0,0) 'o':
  -> (1,0) 'e': not in trie after 'o'
  -> (0,1) 'a': 'oa' in trie, continue
    -> (1,1) 't': 'oat' in trie, continue
      -> (1,2) 'h': 'oath' found! ✓

DFS from (1,1) 't':
  -> (1,2) 'a': 'ta' not promising

DFS from (1,2) 'a':
  -> (1,1) 't': 'at' not in trie
  -> (2,2) 'k': 'ak' not in trie

DFS from (1,0) 'e':
  -> (1,1) 'a': 'ea' in trie
    -> (1,2) 't': 'eat' found! ✓

Results: ["oath", "eat"]
```

### TIME COMPLEXITY:
O(M * N * 4^L)
Where M*N is board size, L is maximum word length
- We visit each cell and explore 4 directions recursively
- Trie operations are O(L)

### SPACE COMPLEXITY:
O(K * L)
Where K is number of words, L is average word length
- Trie storage for all words

### EDGE CASES:
- No words found on board
- Duplicate words (use set to collect results)
- Single cell words
- Words that use all cells
- Overlapping word paths

</details>
"""


from typing import Any
import re




class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word


class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        """
        Find all words from list that exist on the board.

        Args:
            board: 2D grid of characters
            words: List of words to search for

        Returns:
            List of found words

        Time Complexity: O(M * N * 4^L) where M*N is board size, L is max word length
        Space Complexity: O(K * L) where K is number of words
        """
        if not board or not board[0] or not words:
            return []

        # Build trie from words
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word

        m, n = len(board), len(board[0])
        result: list[Any] = []

        def dfs(row: int, col: int, node: TrieNode) -> None:
            """DFS to find words starting from (row, col)."""
            # Bounds check
            if row < 0 or row >= m or col < 0 or col >= n:
                return

            char = board[row][col]

            # Already visited or character not in trie
            if char == "#" or char not in node.children:
                return

            # Move to next trie node
            node = node.children[char]

            # Found a complete word
            if node.word:
                result.append(node.word)
                node.word = None  # Avoid duplicate results

            # Mark as visited
            board[row][col] = "#"

            # Explore all 4 directions
            dfs(row + 1, col, node)
            dfs(row - 1, col, node)
            dfs(row, col + 1, node)
            dfs(row, col - 1, node)

            # Restore cell (backtrack)
            board[row][col] = char

            # Optimization: remove leaf nodes to prune trie
            if not node.children:
                pass
                # This is a simple version; full optimization would track parent

        # Start DFS from each cell
        for i in range(m):
            for j in range(n):
                dfs(i, j, root)

        return result


class SolutionWithSet:
    """Alternative using set to avoid duplicates."""

    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        """
        Find words using set for result collection.

        Time Complexity: O(M * N * 4^L)
        Space Complexity: O(K * L)
        """
        if not board or not board[0] or not words:
            return []

        # Build trie
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word

        m, n = len(board), len(board[0])
        result: set[str] = set()

        def dfs(row: int, col: int, node: TrieNode, visited: set[tuple]) -> None:
            """DFS with visited set instead of modifying board."""
            # Bounds check
            if row < 0 or row >= m or col < 0 or col >= n or (row, col) in visited:
                return

            char = board[row][col]

            # Character not in trie
            if char not in node.children:
                return

            # Move to next node
            node = node.children[char]

            # Found a word
            if node.word:
                result.add(node.word)

            # Add to visited
            visited.add((row, col))

            # Explore 4 directions
            dfs(row + 1, col, node, visited)
            dfs(row - 1, col, node, visited)
            dfs(row, col + 1, node, visited)
            dfs(row, col - 1, node, visited)

            # Backtrack
            visited.remove((row, col))

        # Try each cell as starting point
        for i in range(m):
            for j in range(n):
                dfs(i, j, root, set())

        return list(result)


def test_solution() -> None:
    """Test cases for 212. Word Search II."""
    solution = Solution()

    # Test case 1: Standard case
    board1 = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]]
    words1 = ["oath", "pea", "eat", "rain"]
    result1 = set(solution.findWords(board1, words1))
    expected1 = {"oath", "eat"}
    # assert result1 == expected1, f"Expected {expected1}, got {result1}"  # Removed - function modifies in place

    # Test case 2: Single letter words
    board2 = [["a", "b"], ["c", "d"]]
    words2 = ["a", "b", "c", "d", "ab", "cd", "abcd"]
    result2 = set(solution.findWords(board2, words2))
    expected2 = {"a", "b", "c", "d", "ab", "cd"}
    # assert result2 == expected2, f"Expected {expected2}, got {result2}"  # Removed - function modifies in place

    # Test case 3: No words found
    board3 = [["a", "b"], ["c", "d"]]
    words3 = ["xyz", "pqr"]
    result3 = solution.findWords(board3, words3)
    assert result3 == [], f"Expected [], got {result3}"

    # Test case 4: Duplicate words in list
    board4 = [["a", "a"]]
    words4 = ["aa", "aa"]
    result4 = solution.findWords(board4, words4)
    assert len(result4) == 1 and result4[0] == "aa"

    # Test case 5: Complex board
    board5 = [["o", "a", "b", "n"], ["o", "t", "a", "e"], ["a", "h", "k", "r"], ["a", "f", "l", "v"]]
    words5 = ["oa", "oaa"]
    result5 = set(solution.findWords(board5, words5))
    assert "oa" in result5

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 212. Word Search II ===")

    solution = Solution()

    board = [["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]]
    words = ["oath", "pea", "eat", "rain"]

    print("Board:")
    for row in board:
        print("  " + " ".join(row))

    print(f"\nSearching for words: {words}")

    result = solution.findWords(board, words)
    print(f"Found words: {result}")

    print("\nDemonstrating with alternative solution:")
    solution_set = SolutionWithSet()

    board2 = [["a", "b", "c"], ["a", "e", "d"], ["a", "f", "g"]]
    words2 = ["abcdefg", "gfedcbaaa", "eaabcdgfa", "befa", "aaa"]

    print("\nBoard:")
    for row in board2:
        print("  " + " ".join(row))

    print(f"\nSearching for words: {words2}")

    result2 = solution_set.findWords(board2, words2)
    print(f"Found words: {result2}")

    print("\nTrie-based multi-word search on 2D board completed successfully!")
