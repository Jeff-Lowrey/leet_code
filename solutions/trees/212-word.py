I'll help you implement a solution for Word Search II in Python. This solution will use a Trie data structure for efficient word searching in the board.

```python
from typing import List

class TrieNode:
    """Node class for Trie data structure"""
    def __init__(self):
        self.children = {}
        self.is_word = False
        self.word = ''

class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        """
        Find all words from the given list that can be formed by adjacent characters on the board.
        
        Args:
            board: 2D list of characters representing the game board
            words: List of words to search for
            
        Returns:
            List of words found on the board
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
            node.is_word = True
            node.word = word

        rows, cols = len(board), len(board[0])
        result = set()

        def dfs(row: int, col: int, node: TrieNode) -> None:
            """
            Depth-first search to find words on the board starting from given position.
            
            Args:
                row: Current row position
                col: Current column position
                node: Current TrieNode in the trie
            """
            # Check if current position is valid
            if (row < 0 or row >= rows or 
                col < 0 or col >= cols or 
                board[row][col] not in node.children):
                return

            char = board[row][col]
            curr_node = node.children[char]

            # If we found a word, add it to results
            if curr_node.is_word:
                result.add(curr_node.word)

            # Mark current cell as visited
            board[row][col] = '#'

            # Search in all four directions
            directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
            for dx, dy in directions:
                new_row, new_col = row + dx, col + dy
                dfs(new_row, new_col, curr_node)

            # Restore the cell
            board[row][col] = char

        # Start DFS from each cell
        for i in range(rows):
            for j in range(cols):
                dfs(i, j, root)

        return list(result)


def test_word_search():
    """Test function with example cases"""
    solution = Solution()
    
    # Test case 1
    board1 = [
        ["o","a","a","n"],
        ["e","t","a","e"],
        ["i","h","k","r"],
        ["i","f","l","v"]
    ]
    words1 = ["oath","pea","eat","rain"]
    assert set(solution.findWords(board1, words1)) == {"eat","oath"}

    # Test case 2
    board2 = [["a","b"],["c","d"]]
    words2 = ["abcb"]
    assert solution.findWords(board2, words2) == []

    print("All test cases passed!")


if __name__ == "__main__":
    test_word_search()
```

This implementation solves the Word Search II problem using the following approach:

1. We create a Trie data structure to store all the words we're looking for. This makes the search process more efficient.

2. The `TrieNode` class represents nodes in our Trie, with:
   - `children`: dictionary of child nodes
   - `is_word`: boolean indicating if this node represents the end of a word
   - `word`: the complete word if this is an end node

3. The main `findWords` method:
   - First builds the Trie from the input words
   - Then performs DFS from each cell on the board
   - Uses a set to store found words (avoiding duplicates)

4. The `dfs` helper function:
   - Performs depth-first search on the board
   - Uses the Trie to guide the search
   - Marks visited cells with '#' to avoid using them again in the same path
   - Restores cells after exploring all possibilities

5. The solution handles edge cases:
   - Empty board or words list
   - Invalid board positions
   - Words that don't exist on the board

6. Includes test cases to verify the implementation

The code follows Python best practices:
- Type hints for better code readability
- Clear documentation and comments
- Proper error handling
- Efficient data structures (Trie, Set)
- Clean code structure with separate concerns

To use this solution, simply call the `findWords` method with a board and list of words as arguments. The test cases demonstrate the expected usage and results.