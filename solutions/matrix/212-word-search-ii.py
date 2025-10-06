"""
212. Word Search II
Hard

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are
horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is an extension of Word Search I, but instead of searching for one word, we need to find
multiple words efficiently. A Trie (prefix tree) is perfect for this as it allows us to search
for multiple words simultaneously and prune paths early when no word has a given prefix.

### APPROACH:
1. **Build Trie**: Insert all words into a Trie data structure
2. **DFS with Trie traversal**:
   - Start DFS from each cell
   - Traverse both the board and Trie simultaneously
   - When we reach a word end in Trie, add it to results
   - Prune branches when current path can't lead to any word
3. **Optimization**: Remove found words from Trie to avoid duplicates

### WHY THIS WORKS:
- Trie allows efficient prefix checking and multiple word search
- DFS explores all paths while Trie guides the search
- Early pruning improves performance significantly
- Removing found words prevents duplicate results

### EXAMPLE WALKTHROUGH:
```
Board: [["o","a","a","n"],
        ["e","t","a","e"],
        ["i","h","k","r"],
        ["i","f","l","v"]]
Words: ["oath","pea","eat","rain"]

Build Trie with all words, then DFS from each cell:
- From (0,0) 'o': o→a→t→h ✓ "oath" found
- From (1,1) 't': no valid words start with 't' at this position
- From (1,0) 'e': e→a→t ✓ "eat" found
- etc.

Result: ["oath", "eat"]
```

### COMPLEXITY:
- Time: O(m*n*4^L*W) where L is max word length, W is number of words
- Space: O(W*L) for Trie storage

</details>
"""

class TrieNode:
    """Trie node for efficient word search."""
    def __init__(self):
        self.children = {}
        self.word = None  # Store the complete word at end nodes


def findWords(board, words):
    """
    Find all words from the word list that exist in the board.

    Args:
        board: List[List[str]] - m x n board of characters
        words: List[str] - list of words to search for

    Returns:
        List[str] - all words found in the board
    """
    if not board or not board[0] or not words:
        return []

    # Build Trie
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word

    m, n = len(board), len(board[0])
    result = []

    def dfs(row, col, parent):
        """DFS with Trie traversal."""
        char = board[row][col]
        curr_node = parent.children[char]

        # Check if we found a word
        if curr_node.word:
            result.append(curr_node.word)
            curr_node.word = None  # Avoid duplicates

        # Mark as visited
        board[row][col] = '#'

        # Explore all 4 directions
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        for dr, dc in directions:
            new_row, new_col = row + dr, col + dc
            if (0 <= new_row < m and 0 <= new_col < n and
                board[new_row][new_col] in curr_node.children):
                dfs(new_row, new_col, curr_node)

        # Backtrack
        board[row][col] = char

        # Optimization: remove empty nodes
        if not curr_node.children:
            del parent.children[char]

    # Try starting from each cell
    for i in range(m):
        for j in range(n):
            if board[i][j] in root.children:
                dfs(i, j, root)

    return result


def test_findWords():
    """Test cases for word search II."""
    # Test case 1: Standard case
    board1 = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
    words1 = ["oath","pea","eat","rain"]
    result1 = findWords(board1, words1)
    expected1 = ["oath", "eat"]
    assert sorted(result1) == sorted(expected1), f"Test 1 failed: expected {expected1}, got {result1}"

    # Test case 2: No words found
    board2 = [["a","b"],["c","d"]]
    words2 = ["abcb"]
    result2 = findWords(board2, words2)
    expected2 = []
    assert result2 == expected2, f"Test 2 failed: expected {expected2}, got {result2}"

    # Test case 3: Single character words
    board3 = [["a","b"],["c","d"]]
    words3 = ["a","b","c","d","e"]
    result3 = findWords(board3, words3)
    expected3 = ["a", "b", "c", "d"]
    assert sorted(result3) == sorted(expected3), f"Test 3 failed: expected {expected3}, got {result3}"

    # Test case 4: Overlapping paths
    board4 = [["a","a"]]
    words4 = ["aaa"]
    result4 = findWords(board4, words4)
    expected4 = []
    assert result4 == expected4, f"Test 4 failed: expected {expected4}, got {result4}"

    # Test case 5: Multiple valid words
    board5 = [["a","b","c"],["a","e","d"],["a","f","g"]]
    words5 = ["abcdefg","gfedcbaaa","eaabcdgfa","befa","dgc","ade"]
    result5 = findWords(board5, words5)
    expected5 = ["abcdefg","befa","eaabcdgfa","gfedcbaaa"]
    assert sorted(result5) == sorted(expected5), f"Test 5 failed: expected {expected5}, got {result5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_findWords()