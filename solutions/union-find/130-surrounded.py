I'll help you implement a solution for the Surrounded Regions problem. I'll create a clean, well-documented implementation that handles the requirements.

```python
#!/usr/bin/env python3
"""
Surrounded Regions - LeetCode 130
Time Complexity: O(m*n) where m and n are the dimensions of the board
Space Complexity: O(m*n) in worst case for recursion stack
"""

from typing import List


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
            if (row < 0 or col < 0 or 
                row >= rows or col >= cols or 
                board[row][col] != 'O'):
                return

            # Mark this cell as visited by changing it to a temporary character
            board[row][col] = '#'

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
                if board[row][col] == 'O':
                    board[row][col] = 'X'
                elif board[row][col] == '#':
                    board[row][col] = 'O'


def test_surrounded_regions():
    """
    Test function to verify the solution works correctly.
    """
    # Test case 1
    board1 = [
        ["X", "X", "X", "X"],
        ["X", "O", "O", "X"],
        ["X", "X", "O", "X"],
        ["X", "O", "X", "X"]
    ]
    expected1 = [
        ["X", "X", "X", "X"],
        ["X", "X", "X", "X"],
        ["X", "X", "X", "X"],
        ["X", "O", "X", "X"]
    ]
    
    solution = Solution()
    solution.solve(board1)
    assert board1 == expected1, f"Test case 1 failed. Expected {expected1}, got {board1}"
    
    # Test case 2 - Empty board
    board2 = []
    solution.solve(board2)
    assert board2 == [], "Test case 2 failed"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_surrounded_regions()
```

This implementation includes:

1. A complete solution to the Surrounded Regions problem using DFS
2. Clear documentation and comments explaining the approach
3. Type hints for better code readability
4. A test function to verify the solution
5. Proper handling of edge cases (empty board, border cases)
6. Clean code structure following Python conventions

The algorithm works in two steps:
1. First, it marks all 'O's that are connected to the border (these cannot be captured) by changing them to '#'
2. Then, it converts all remaining 'O's to 'X's (these are surrounded) and restores the '#'s back to 'O's

The solution modifies the board in-place as required and handles all edge cases appropriately.