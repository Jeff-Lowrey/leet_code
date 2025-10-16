"""
# Difficulty: Medium

# 79. Word Search

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["A", "B", "C", "E"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Word 'OATH' exists in the board by searching paths</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic backtracking problem on a 2D grid. While a Trie isn't strictly necessary for single word search, understanding this problem helps with Word Search II (212). We use DFS with backtracking to explore all possible paths, marking visited cells to avoid reuse, and unmarking them when backtracking.

### APPROACH:
1. **Try each cell as start**: Iterate through all cells as potential starting points
2. **DFS with backtracking**: From each start, explore 4 directions recursively
3. **Match characters**: At each step, check if current cell matches current character
4. **Mark visited**: Temporarily mark cells as visited to prevent reuse
5. **Backtrack**: Restore cell value when returning from recursion
6. **Early termination**: Return true immediately when word is found

Optional Trie optimization: Pre-check if word's prefix exists (useful for multiple words)

### WHY THIS WORKS:
- DFS explores all possible paths systematically
- Backtracking allows trying different paths from same starting point
- Marking prevents cycles and reuse of same cell
- Base cases handle word completion and boundary conditions
- Early termination avoids unnecessary exploration

### EXAMPLE WALKTHROUGH:
```
board = [['A','B','C','E'],
         ['S','F','C','S'],
         ['A','D','E','E']]
word = "ABCCED"

Try (0,0) 'A':
  Match 'A' ✓, mark visited, look for 'B'
  Try (0,1) 'B':
    Match 'B' ✓, mark visited, look for 'C'
    Try (0,2) 'C':
      Match 'C' ✓, mark visited, look for 'C'
      Try (1,2) 'C':
        Match 'C' ✓, mark visited, look for 'E'
        Try (2,2) 'E':
          Match 'E' ✓, mark visited, look for 'D'
          Try (2,1) 'D':
            Match 'D' ✓, complete! Return True

Result: True (found path)
```

### TIME COMPLEXITY:
O(M * N * 4^L)
Where M*N is board size, L is word length
- We try each cell as start: O(M*N)
- From each cell, explore 4 directions recursively: O(4^L)

### SPACE COMPLEXITY:
O(L)
For recursion stack depth (word length)

### EDGE CASES:
- Word longer than total cells
- Word is single character
- Word not in board
- Word requires using all cells
- Multiple valid paths exist

</details>
"""

from collections import Counter


class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        Check if word exists in board using DFS backtracking.

        Args:
            board: 2D grid of characters
            word: Target word to find

        Returns:
            True if word exists in board, False otherwise

        Time Complexity: O(M * N * 4^L) where M*N is board size, L is word length
        Space Complexity: O(L) for recursion stack
        """
        if not board or not board[0] or not word:
            return False

        m, n = len(board), len(board[0])

        def dfs(row: int, col: int, index: int) -> bool:
            """
            DFS to find word starting from (row, col) at word[index].

            Args:
                row: Current row
                col: Current column
                index: Current position in word

            Returns:
                True if word can be found from this position
            """
            # Base case: found complete word
            if index == len(word):
                return True

            # Boundary checks
            if row < 0 or row >= m or col < 0 or col >= n or board[row][col] != word[index]:
                return False

            # Mark current cell as visited
            temp = board[row][col]
            board[row][col] = "#"

            # Explore all 4 directions
            found = (
                dfs(row + 1, col, index + 1)
                or dfs(row - 1, col, index + 1)
                or dfs(row, col + 1, index + 1)
                or dfs(row, col - 1, index + 1)
            )

            # Restore cell (backtrack)
            board[row][col] = temp

            return found

        # Try each cell as starting point
        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0]:  # Optimization: check first char
                    if dfs(i, j, 0):
                        return True

        return False


class SolutionWithVisitedSet:
    """Alternative using visited set instead of modifying board."""

    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        Use visited set to track visited cells.

        Time Complexity: O(M * N * 4^L)
        Space Complexity: O(L + M*N) for recursion and visited set
        """
        if not board or not board[0] or not word:
            return False

        m, n = len(board), len(board[0])

        def dfs(row: int, col: int, index: int, visited: set) -> bool:
            """DFS with visited set."""
            # Found complete word
            if index == len(word):
                return True

            # Boundary and visit checks
            if row < 0 or row >= m or col < 0 or col >= n or (row, col) in visited or board[row][col] != word[index]:
                return False

            # Mark as visited
            visited.add((row, col))

            # Explore 4 directions
            found = (
                dfs(row + 1, col, index + 1, visited)
                or dfs(row - 1, col, index + 1, visited)
                or dfs(row, col + 1, index + 1, visited)
                or dfs(row, col - 1, index + 1, visited)
            )

            # Backtrack
            visited.remove((row, col))

            return found

        # Try each cell as starting point
        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0] and dfs(i, j, 0, set()):
                    return True

        return False


class SolutionOptimized:
    """Optimized solution with early pruning."""

    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        Add early pruning optimizations.

        Time Complexity: O(M * N * 4^L)
        Space Complexity: O(L)
        """
        if not board or not board[0] or not word:
            return False

        m, n = len(board), len(board[0])

        # Early termination: check if all characters exist
        board_chars: Counter[str] = Counter()
        for row in board:
            for char in row:
                board_chars[char] += 1

        word_chars = Counter(word)
        for char, count in word_chars.items():
            if board_chars[char] < count:
                return False  # Not enough characters in board

        # Optimization: reverse word if last char is less frequent
        if board_chars[word[0]] > board_chars[word[-1]]:
            word = word[::-1]

        def dfs(row: int, col: int, index: int) -> bool:
            """DFS with standard backtracking."""
            if index == len(word):
                return True

            if row < 0 or row >= m or col < 0 or col >= n or board[row][col] != word[index]:
                return False

            temp = board[row][col]
            board[row][col] = "#"

            found = (
                dfs(row + 1, col, index + 1)
                or dfs(row - 1, col, index + 1)
                or dfs(row, col + 1, index + 1)
                or dfs(row, col - 1, index + 1)
            )

            board[row][col] = temp
            return found

        # Try each cell matching first character
        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0] and dfs(i, j, 0):
                    return True

        return False


def test_solution() -> None:
    """Test cases for 79. Word Search."""
    solution = Solution()
    solution_visited = SolutionWithVisitedSet()
    solution_opt = SolutionOptimized()

    # Test case 1: Standard case
    board1 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    assert solution.exist(board1, "ABCCED")
    assert solution.exist(board1, "SEE")
    assert not solution.exist(board1, "ABCB")

    assert solution_visited.exist(board1, "ABCCED")
    assert solution_opt.exist(board1, "SEE")

    # Test case 2: Single character
    board2 = [["a"]]
    assert solution.exist(board2, "a")
    assert not solution.exist(board2, "b")

    # Test case 3: Word not in board
    board3 = [["A", "B"], ["C", "D"]]
    assert solution.exist(board3, "ABDC")  # A->B->D->C path exists
    assert solution.exist(board3, "CDBA")  # C->D->B->A path exists
    assert not solution.exist(board3, "XYZ")

    # Test case 4: Long path
    board4 = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]]
    assert solution.exist(board4, "ABCFI")
    assert solution.exist(board4, "ABEF")

    # Test case 5: Cannot reuse cell
    board5 = [["A", "A"]]
    assert not solution.exist(board5, "AAA")  # Can't reuse same cell

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 79. Word Search ===")

    solution = Solution()

    board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]

    print("Board:")
    for row in board:
        print("  " + " ".join(row))

    words = ["ABCCED", "SEE", "ABCB"]
    print("\nSearching for words:")

    for word in words:
        result = solution.exist(board, word)
        print(f"  '{word}': {result}")

    print("\nDemonstrating optimized solution:")
    solution_opt = SolutionOptimized()

    board2 = [["C", "A", "A"], ["A", "A", "A"], ["B", "C", "D"]]

    print("\nBoard:")
    for row in board2:
        print("  " + " ".join(row))

    test_words = ["AAB", "CAA", "BCD"]
    print("\nSearching for words:")

    for word in test_words:
        result = solution_opt.exist(board2, word)
        print(f"  '{word}': {result}")

    print("\nDFS backtracking word search completed successfully!")
