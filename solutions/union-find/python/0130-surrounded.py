"""
# Difficulty: Medium

# 130. Surrounded Regions

Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'.

A region is captured by flipping all 'O's into 'X's in that surrounded region.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]</dd>
<dt>Output:</dt>
<dd>[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]</dd>
<dt>Explanation:</dt>
<dd>Surrounded regions: 'X' regions surrounded by 'O' are captured</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use Union-Find to connect adjacent 'X' cells. For border 'O' cells, connect to virtual border node. After processing, 'O' cells not connected to border should be flipped to 'X'.

### APPROACH:
1. **Initialize Union-Find**: Create parent array and find/union functions
2. **Connect border Os**: Union all 'O' cells on borders with a dummy border node
3. **Connect internal Os**: Union all adjacent 'O' cells in interior
4. **Identify surrounded**: After unions, check if each 'O' is connected to border
5. **Flip if surrounded**: If 'O' not connected to border, change to 'X'
6. **Keep if connected**: If connected to border, keep as 'O'
7. **Modify in-place**: Update board directly

### WHY THIS WORKS:
- Union-find or DFS from borders to mark unsurrounded regions
- Start DFS/BFS from 'O' cells on borders (these can't be surrounded)
- Mark all connected 'O' cells as safe (connected to border)
- Flip all unmarked 'O' to 'X' (these are surrounded)
- O(m*n) time: visit each cell once, O(m*n) space for visited/parent array

### EXAMPLE WALKTHROUGH:
Input:
```
board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
```

Step 1: Mark border-connected 'O's
(1,1), (1,2), (2,2) are surrounded
(3,1) is connected to border
Step 2: Flip surrounded 'O's to 'X'
Only flip (1,1), (1,2), (2,2)

Output:
```
[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        """
        Captures all regions surrounded by 'X'. A region is captured by flipping all 'O's
        into 'X's in that surrounded region.

        Args:
            board: The input board represented as a 2D list of 'X' and 'O' characters

        Modifies the board in-place.
        """
        if not board or not board[0]:
            return

        rows, cols = len(board), len(board[0])

        def dfs(row: int, col: int) -> None:
            """
            Depth-first search to mark all connected 'O's that should not be captured.

            Args:
                row: Current row index
                col: Current column index
            """
            # Check boundaries and if current cell is 'O'
            if row < 0 or col < 0 or row >= rows or col >= cols or board[row][col] != "O":
                return

            # Mark this cell as visited by changing it to a temporary character
            board[row][col] = "#"

            # Check all four adjacent cells
            dfs(row + 1, col)  # Down
            dfs(row - 1, col)  # Up
            dfs(row, col + 1)  # Right
            dfs(row, col - 1)  # Left

        # Step 1: Mark all 'O's connected to the border as '#'

        # Check first and last row
        for col in range(cols):
            dfs(0, col)
            dfs(rows - 1, col)

        # Check first and last column
        for row in range(rows):
            dfs(row, 0)
            dfs(row, cols - 1)

        # Step 2: Flip all remaining 'O's to 'X's and restore '#'s to 'O's
        for row in range(rows):
            for col in range(cols):
                if board[row][col] == "O":
                    board[row][col] = "X"
                elif board[row][col] == "#":
                    board[row][col] = "O"


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    board1 = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]
    solution.solve(board1)
    expected1 = [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]]
    assert board1 == expected1, f"Expected {expected1}, got {board1}"

    # Test case 2: All surrounded
    board2 = [["X", "X", "X"], ["X", "O", "X"], ["X", "X", "X"]]
    solution.solve(board2)
    expected2 = [["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]]
    assert board2 == expected2, f"Expected {expected2}, got {board2}"

    # Test case 3: Border connected
    board3 = [["O", "O"], ["O", "O"]]
    solution.solve(board3)
    expected3 = [["O", "O"], ["O", "O"]]
    assert board3 == expected3, f"Expected {expected3}, got {board3}"

    # Test case 4: Empty board
    board4: list[Any] = []
    solution.solve(board4)
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 5: Single cell
    board5 = [["O"]]
    solution.solve(board5)
    expected5 = [["O"]]
    assert board5 == expected5, f"Expected {expected5}, got {board5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("Solution for 130. Surrounded")
