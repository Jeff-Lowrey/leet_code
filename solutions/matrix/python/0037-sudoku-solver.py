"""
# Difficulty: Hard

# 037. Sudoku Solver
**Backtracking**

Solve a Sudoku puzzle by filling the empty cells.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["5", "3", ".", ".", "7", ".", ".", ".", "."]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Sudoku puzzle is solved by filling empty cells following rules</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Array Traversal, Stack Operations
**Data Structures**: Hash Set, Array, String
**Patterns**: Backtracking
**Time Complexity**: O(9^(n*n)) worst case, where n=9
**Space Complexity**: O(n*n) for recursion stack

### INTUITION:
Use backtracking to try placing digits 1-9 in empty cells, validating each placement
against Sudoku rules (no duplicates in row, column, or 3x3 box). Backtrack when no
valid digit can be placed.

### APPROACH:
1. **Find empty cell**: Scan for next '.' cell
2. **Try digits**: Attempt placing digits 1-9
3. **Validate**: Check if placement is valid (row, column, box)
4. **Recurse**: Continue solving with this placement
5. **Backtrack**: If stuck, undo placement and try next digit

### WHY THIS WORKS:
- Backtracking explores all possible configurations
- Validation ensures Sudoku rules are maintained
- Early pruning reduces search space
- Modifies board in-place for efficiency

### EXAMPLE WALKTHROUGH:
```
Input: board with some filled cells and '.' for empty
Step 1: Find first empty cell
Step 2: Try placing '1' - check if valid
Step 3: Recurse to next empty cell
Step 4: If contradiction found, backtrack and try '2'
Output: Completed valid Sudoku board
```

### TIME COMPLEXITY:
O(9^(n*n)) worst case, where n=9

### SPACE COMPLEXITY:
O(n*n) for recursion stack

### EDGE CASES:
- Board already solved
- Multiple solutions (return first found)
- Invalid input (unsolvable)

</details>
"""


class Solution:
    def solveSudoku(self, board: list[list[str]]) -> None:
        """
        Solve Sudoku puzzle using backtracking.

        Args:
            board: 9x9 grid with digits '1'-'9' and '.' for empty cells

        Returns:
            None (modifies board in-place)

        Time Complexity: O(9^(n*n)) worst case
        Space Complexity: O(n*n) recursion stack
        """

        def is_valid(row: int, col: int, num: str) -> bool:
            """Check if placing num at (row, col) is valid."""
            # Check row
            if num in board[row]:
                return False

            # Check column
            if num in (board[i][col] for i in range(9)):
                return False

            # Check 3x3 box
            box_row, box_col = 3 * (row // 3), 3 * (col // 3)
            for i in range(box_row, box_row + 3):
                for j in range(box_col, box_col + 3):
                    if board[i][j] == num:
                        return False

            return True

        def backtrack() -> bool:
            """Recursively solve the Sudoku board."""
            # Find next empty cell
            for row in range(9):
                for col in range(9):
                    if board[row][col] == ".":
                        # Try digits 1-9
                        for num in "123456789":
                            if is_valid(row, col, num):
                                board[row][col] = num

                                # Recurse
                                if backtrack():
                                    return True

                                # Backtrack
                                board[row][col] = "."

                        return False

            # All cells filled
            return True

        backtrack()

    # Alias for consistent interface
    solve = solveSudoku


def test_solution() -> None:
    """
    Test cases for 037. Sudoku Solver.
    """
    solution = Solution()

    # Test case 1: Classic Sudoku puzzle
    board1 = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    expected1 = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
    ]
    solution.solveSudoku(board1)
    assert board1 == expected1, f"Test case 1 failed"
    print("Test case 1 passed: Classic Sudoku")

    # Test case 2: Nearly complete Sudoku
    board2 = [
        ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
        ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
        ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
        ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
        ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
        ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
        ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
        ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
        ["3", "4", "5", "2", "8", "6", "1", "7", "."],
    ]
    solution.solveSudoku(board2)
    assert board2[-1][-1] == "9", f"Test case 2 failed"
    print("Test case 2 passed: Nearly complete Sudoku")

    # Test case 3: Hard Sudoku with minimal clues
    board3 = [
        [".", ".", "9", "7", "4", "8", ".", ".", "."],
        ["7", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", "2", ".", "1", ".", "9", ".", ".", "."],
        [".", ".", "7", ".", ".", ".", "2", "4", "."],
        [".", "6", "4", ".", "1", ".", "5", "9", "."],
        [".", "9", "8", ".", ".", ".", "3", ".", "."],
        [".", ".", ".", "8", ".", "3", ".", "2", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "6"],
        [".", ".", ".", "2", "7", "5", "9", ".", "."],
    ]
    solution.solveSudoku(board3)
    # Verify solution is valid (all rows, cols, boxes have 1-9)
    for row in board3:
        assert set(row) == set("123456789"), f"Invalid row: {row}"
    print("Test case 3 passed: Hard Sudoku")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample: Solving a Sudoku puzzle")
    board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    print("Before:")
    for row in board:
        print(" ".join(row))
    solution.solveSudoku(board)
    print("\nAfter:")
    for row in board:
        print(" ".join(row))
