"""
37. Sudoku Solver
Hard

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
1. Each of the digits 1-9 must occur exactly once in each row.
2. Each of the digits 1-9 must occur exactly once in each column.
3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.

The '.' character indicates empty cells.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic backtracking problem. We need to try placing digits 1-9 in empty cells
and validate if the placement is valid according to Sudoku rules. If we reach a dead end,
we backtrack and try the next possibility.

### APPROACH:
1. **Find empty cell**: Look for next '.' in the board
2. **Try digits 1-9**: For each digit, check if placement is valid
3. **Validate placement**: Check row, column, and 3x3 box constraints
4. **Recursive solve**: If valid, place digit and recursively solve remaining
5. **Backtrack**: If no solution found, remove digit and try next

### WHY THIS WORKS:
- Backtracking explores all possible valid combinations
- Early validation prevents invalid paths from being explored deeply
- Systematic approach ensures we find a solution if one exists

### VALIDATION RULES:
- **Row**: Digit must not appear elsewhere in same row
- **Column**: Digit must not appear elsewhere in same column
- **3x3 Box**: Digit must not appear elsewhere in same 3x3 sub-grid

### EXAMPLE WALKTHROUGH:
```
Input board with '.' for empty cells:
[["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]]

Algorithm tries each empty cell systematically, validating each placement.
```

### COMPLEXITY:
- Time: O(9^(n*n)) where n=9 - worst case tries all combinations
- Space: O(n*n) - recursion depth for board size

</details>
"""

def solveSudoku(board):
    """
    Solve a Sudoku puzzle using backtracking.

    Args:
        board: List[List[str]] - 9x9 Sudoku board with '.' for empty cells

    Returns:
        None - modifies board in-place
    """
    def is_valid(board, row, col, num):
        """Check if placing num at (row, col) is valid."""
        # Check row
        for j in range(9):
            if board[row][j] == num:
                return False

        # Check column
        for i in range(9):
            if board[i][col] == num:
                return False

        # Check 3x3 box
        box_row = 3 * (row // 3)
        box_col = 3 * (col // 3)
        for i in range(box_row, box_row + 3):
            for j in range(box_col, box_col + 3):
                if board[i][j] == num:
                    return False

        return True

    def solve():
        """Recursive backtracking solver."""
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    # Try digits 1-9
                    for num in '123456789':
                        if is_valid(board, i, j, num):
                            board[i][j] = num

                            # Recursively solve
                            if solve():
                                return True

                            # Backtrack
                            board[i][j] = '.'

                    # No valid digit found
                    return False

        # All cells filled successfully
        return True

    solve()


def test_solveSudoku():
    """Test cases for Sudoku solver."""
    # Test case 1: Standard Sudoku
    board1 = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ]

    expected1 = [
        ["5","3","4","6","7","8","9","1","2"],
        ["6","7","2","1","9","5","3","4","8"],
        ["1","9","8","3","4","2","5","6","7"],
        ["8","5","9","7","6","1","4","2","3"],
        ["4","2","6","8","5","3","7","9","1"],
        ["7","1","3","9","2","4","8","5","6"],
        ["9","6","1","5","3","7","2","8","4"],
        ["2","8","7","4","1","9","6","3","5"],
        ["3","4","5","2","8","6","1","7","9"]
    ]

    solveSudoku(board1)
    assert board1 == expected1, f"Test 1 failed: got {board1}"

    # Test case 2: Harder Sudoku
    board2 = [
        [".",".","9","7","4","8",".",".","."],
        ["7",".",".",".",".",".",".",".","."],
        [".","2",".","1",".","9",".",".","."],
        [".",".","7",".",".",".","2","4","."],
        [".","6","4",".","1",".","5","9","."],
        [".","9","8",".",".",".","3",".","."],
        [".",".",".","8",".","3",".","2","."],
        [".",".",".",".",".",".",".",".","6"],
        [".",".",".","2","7","5","9",".","."]
    ]

    # Just test that it solves without error
    solveSudoku(board2)

    # Validate the solution
    def is_solved(board):
        """Check if board is completely and correctly solved."""
        # Check all cells are filled
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    return False

        # Check rows
        for i in range(9):
            if set(board[i]) != set('123456789'):
                return False

        # Check columns
        for j in range(9):
            if set(board[i][j] for i in range(9)) != set('123456789'):
                return False

        # Check 3x3 boxes
        for box_row in range(0, 9, 3):
            for box_col in range(0, 9, 3):
                box_set = set()
                for i in range(box_row, box_row + 3):
                    for j in range(box_col, box_col + 3):
                        box_set.add(board[i][j])
                if box_set != set('123456789'):
                    return False

        return True

    assert is_solved(board2), "Test 2 failed: solution is invalid"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solveSudoku()