"""
79. Word Search
Medium

Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are
horizontally or vertically neighboring. The same letter cell may not be used more than once.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to find a path in the grid that spells out the target word. This is a classic backtracking
problem where we explore all possible paths from each starting position.

### APPROACH:
1. **Try each cell as starting point**: For each cell, start DFS if it matches first character
2. **DFS with backtracking**:
   - Mark current cell as visited (modify in-place)
   - Try all 4 directions (up, down, left, right)
   - If we reach the end of word, return True
   - Backtrack by unmarking the cell
3. **Base cases**:
   - If we've matched entire word, return True
   - If out of bounds or character doesn't match, return False

### WHY THIS WORKS:
- DFS explores all possible paths from each starting position
- Backtracking ensures we don't reuse cells in the same path
- In-place modification avoids extra space for visited tracking

### EXAMPLE WALKTHROUGH:
```
Board: [["A","B","C","E"],
        ["S","F","C","S"],
        ["A","D","E","E"]]
Word: "ABCCED"

Start at (0,0) 'A':
A(0,0) → B(0,1) → C(0,2) → C(1,2) → E(2,2) → D(2,1) ✓

Path found: A→B→C→C→E→D matches "ABCCED"
```

### COMPLEXITY:
- Time: O(m*n*4^L) where L is word length - DFS from each cell
- Space: O(L) - recursion depth for word length

</details>
"""

def exist(board, word):
    """
    Check if word exists in the board using DFS with backtracking.

    Args:
        board: List[List[str]] - m x n grid of characters
        word: str - target word to search for

    Returns:
        bool - True if word exists in board, False otherwise
    """
    if not board or not board[0] or not word:
        return False

    m, n = len(board), len(board[0])

    def dfs(row, col, index):
        """DFS helper function with backtracking."""
        # Base case: found the entire word
        if index == len(word):
            return True

        # Check bounds and character match
        if (row < 0 or row >= m or col < 0 or col >= n or
            board[row][col] != word[index]):
            return False

        # Mark current cell as visited
        temp = board[row][col]
        board[row][col] = '#'

        # Explore all 4 directions
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        for dr, dc in directions:
            if dfs(row + dr, col + dc, index + 1):
                board[row][col] = temp  # Restore before returning
                return True

        # Backtrack: restore original character
        board[row][col] = temp
        return False

    # Try starting from each cell
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True

    return False


def test_exist():
    """Test cases for word search."""
    # Test case 1: Word exists
    board1 = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
    assert exist(board1, "ABCCED") == True, "Test 1a failed"
    assert exist(board1, "SEE") == True, "Test 1b failed"
    assert exist(board1, "ABCB") == False, "Test 1c failed"

    # Test case 2: Single character
    board2 = [["A"]]
    assert exist(board2, "A") == True, "Test 2a failed"
    assert exist(board2, "AB") == False, "Test 2b failed"

    # Test case 3: Word doesn't exist
    board3 = [["A","B"],["C","D"]]
    assert exist(board3, "ACDB") == True, "Test 3a failed"
    assert exist(board3, "ACDBX") == False, "Test 3b failed"

    # Test case 4: Complex path
    board4 = [["C","A","A"],["A","A","A"],["B","C","D"]]
    assert exist(board4, "AAB") == True, "Test 4a failed"

    # Test case 5: Backtracking required
    board5 = [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]]
    assert exist(board5, "ABCESEEEFS") == True, "Test 5 failed"

    # Test case 6: Long word
    board6 = [["a","a","a","a"],["a","a","a","a"],["a","a","a","a"]]
    assert exist(board6, "aaaaaaaaaaaaa") == False, "Test 6 failed"

    # Test case 7: Edge case - empty word
    board7 = [["A"]]
    assert exist(board7, "") == False, "Test 7 failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_exist()