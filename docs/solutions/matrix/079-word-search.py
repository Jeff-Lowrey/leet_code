"""
# Difficulty: 

# 079. Word Search
**Backtracking + DFS**

Given an m x n grid of characters and a string word, return true if word exists in the grid.

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
Use DFS with backtracking to search for the word starting from each cell. Mark visited
cells temporarily to avoid reusing them in the current path, then unmark for other paths.

### APPROACH:
1. **Try each cell**: Start DFS from each cell matching first letter
2. **DFS search**: Recursively search adjacent cells for next letter
3. **Mark visited**: Temporarily mark cells to prevent revisiting
4. **Backtrack**: Unmark cells when backtracking to try other paths
5. **Check boundaries**: Validate cell coordinates and character match

### WHY THIS WORKS:
- DFS explores all possible paths from each starting position
- Backtracking allows trying different paths
- Visited marking prevents cycles in current path
- Early termination when word found

### EXAMPLE WALKTHROUGH:
```
Board: [['A','B','C','E'],
        ['S','F','C','S'],
        ['A','D','E','E']]
Word: "ABCCED"

Step 1: Start at (0,0) 'A' - matches
Step 2: Try (0,1) 'B' - matches
Step 3: Try (0,2) 'C' - matches
Step 4: Try (1,2) 'C' - matches
Step 5: Try (2,2) 'E' - matches
Step 6: Try (2,3) 'D' - backtrack, try (1,3)
...
Found: True
```

### TIME COMPLEXITY:
O(m * n * 4^L) where L is word length

### SPACE COMPLEXITY:
O(L) for recursion stack

### EDGE CASES:
- Word longer than board cells
- Single character word
- Word not in board
- Entire board is the word

</details>
"""

class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        """
        Search for word in board using DFS with backtracking.

        Args:
            board: m x n grid of characters
            word: Word to search for

        Returns:
            True if word exists in board, False otherwise

        Time Complexity: O(m * n * 4^L)
        Space Complexity: O(L) for recursion
        """
        if not board or not word:
            return False

        m, n = len(board), len(board[0])

        def dfs(row: int, col: int, index: int) -> bool:
            """
            DFS to search for word starting at (row, col).

            Args:
                row: Current row
                col: Current column
                index: Current index in word

            Returns:
                True if word found from this position
            """
            # Found complete word
            if index == len(word):
                return True

            # Check boundaries
            if row < 0 or row >= m or col < 0 or col >= n:
                return False

            # Check character match and not visited
            if board[row][col] != word[index]:
                return False

            # Mark as visited
            temp = board[row][col]
            board[row][col] = "#"

            # Search in all 4 directions
            found = (
                dfs(row + 1, col, index + 1)
                or dfs(row - 1, col, index + 1)
                or dfs(row, col + 1, index + 1)
                or dfs(row, col - 1, index + 1)
            )

            # Backtrack: unmark as visited
            board[row][col] = temp

            return found

        # Try starting from each cell
        for i in range(m):
            for j in range(n):
                if board[i][j] == word[0] and dfs(i, j, 0):
                    return True

        return False

    # Alias for consistent interface
    solve = exist

def test_solution():
    """
    Test cases for 079. Word Search.
    """
    solution = Solution()

    # Test case 1: Word exists
    board1 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    assert solution.exist(board1, "ABCCED") == True, "Test case 1 failed"
    print("Test case 1 passed: Word exists")

    # Test case 2: Word exists (different path)
    board2 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    assert solution.exist(board2, "SEE") == True, "Test case 2 failed"
    print("Test case 2 passed: Word exists (different path)")

    # Test case 3: Word does not exist
    board3 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    assert solution.exist(board3, "ABCB") == False, "Test case 3 failed"
    print("Test case 3 passed: Word does not exist")

    # Test case 4: Single character word
    board4 = [["A", "B"], ["C", "D"]]
    assert solution.exist(board4, "A") == True, "Test case 4 failed"
    print("Test case 4 passed: Single character word")

    # Test case 5: Single cell board
    board5 = [["A"]]
    assert solution.exist(board5, "A") == True, "Test case 5 failed"
    print("Test case 5 passed: Single cell board")

    # Test case 6: Word longer than board
    board6 = [["A", "B"], ["C", "D"]]
    assert solution.exist(board6, "ABCDEFGH") == False, "Test case 6 failed"
    print("Test case 6 passed: Word longer than board")

    # Test case 7: Entire board is the word
    board7 = [["A", "B"], ["C", "D"]]
    assert solution.exist(board7, "ABDC") == True, "Test case 7 failed"
    print("Test case 7 passed: Entire board is the word")

    # Test case 8: Zigzag path
    board8 = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]]
    assert solution.exist(board8, "ABEF") == True, "Test case 8 failed"
    print("Test case 8 passed: Zigzag path")

    # Test case 9: Cannot reuse same cell
    board9 = [["A", "A", "A"], ["A", "A", "A"], ["A", "A", "A"]]
    assert solution.exist(board9, "AAAAAAAAAA") == False, "Test case 9 failed"
    print("Test case 9 passed: Cannot reuse same cell")

    # Test case 10: Adjacent duplicates
    board10 = [["A", "A", "A"], ["A", "A", "A"], ["A", "A", "A"]]
    assert solution.exist(board10, "AAAAA") == True, "Test case 10 failed"
    print("Test case 10 passed: Adjacent duplicates")

    print("\nAll test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample 1: Word search in grid")
    board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]
    print(f"Board:")
    for row in board:
        print(row)
    print(f"Search 'ABCCED': {solution.exist(board, 'ABCCED')}")
    print(f"Search 'SEE': {solution.exist(board, 'SEE')}")
    print(f"Search 'ABCB': {solution.exist(board, 'ABCB')}")
