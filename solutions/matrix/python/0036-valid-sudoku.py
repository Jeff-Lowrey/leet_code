"""
### INTUITION:
The key insight is that use hash sets to track seen digits for each row, column, and 3x3 box.
Make a single pass through the board, checking for duplicates in the appropriate sets.

### APPROACH:
1. **Data Structures**: Use sets for each row, column, and box
2. **Single Pass**: Iterate through each cell once
3. **Box Index**: Calculate box index as (row // 3) * 3 + (col // 3)
4. **Check**: For each digit, verify it hasn't been seen in its row, column, or box

### WHY THIS WORKS:
Sets provide O(1) lookup, allowing us to efficiently check for duplicates.
The box index formula maps each cell to one of 9 boxes (0-8).

### EXAMPLE WALKTHROUGH:
Input:
```
[["5", "3", ".", ".", "7", ".", ".", ".", "."]
```

Input:
```
For cell (0, 0) = "5":
```

- Row 0 set: add "5"
- Col 0 set: add "5"
- Box 0 set: add "5"
For cell (0, 1) = "3":
- Row 0 set: add "3" (5 already present)
- Col 1 set: add "3"
- Box 0 set: add "3" (5 already present)

Steps:
Step 1: If we encounter "5" again in row 0, col 0, or box 0 → return False

Output:
```
return False
```

### TIME COMPLEXITY:
**O(1)**
- Board is fixed size 9x9 = 81 cells
- Each cell processed once

### SPACE COMPLEXITY:
**O(1)**
- At most 9 sets with 9 elements each
- Fixed space regardless of input

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        """
        Approach: Hash sets for rows, columns, and boxes
        Time Complexity: O(1) - fixed 9x9 board
        Space Complexity: O(1) - fixed space for sets
        """
        # Initialize sets for each row, column, and 3x3 box
        rows: list[set[str]] = [set() for _ in range(9)]
        cols: list[set[str]] = [set() for _ in range(9)]
        boxes: list[set[str]] = [set() for _ in range(9)]

        for i in range(9):
            for j in range(9):
                cell = board[i][j]

                # Skip empty cells
                if cell == ".":
                    continue

                # Calculate which 3x3 box this cell belongs to
                box_index = (i // 3) * 3 + (j // 3)

                # Check if digit already seen in row, column, or box
                if cell in rows[i] or cell in cols[j] or cell in boxes[box_index]:
                    return False

                # Add digit to respective sets
                rows[i].add(cell)
                cols[j].add(cell)
                boxes[box_index].add(cell)

        return True

    def isValidSudokuSingleSet(self, board: list[list[str]]) -> bool:
        """
        Approach: Single set with tuple keys
        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        seen: set[tuple[int, str] | tuple[int, int, str]] = set()

        for i in range(9):
            for j in range(9):
                cell = board[i][j]

                if cell == ".":
                    continue

                # Create unique keys for row, column, and box
                row_key: tuple[int, str] = (i, cell)
                col_key: tuple[int, str] = (j, cell)  # Changed order to match type
                box_key: tuple[int, int, str] = (i // 3, j // 3, cell)

                if row_key in seen or col_key in seen or box_key in seen:
                    return False

                seen.add(row_key)
                seen.add(col_key)
                seen.add(box_key)

        return True


def test_solution() -> None:
    """Test cases for Problem 36."""
    solution = Solution()

    # Test case 1: Valid sudoku
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
    assert solution.isValidSudoku(board1) is True
    assert solution.isValidSudokuSingleSet(board1) is True
    print("Test case 1 passed: Valid sudoku")

    # Test case 2: Invalid - duplicate in row
    board2 = [
        ["8", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    assert solution.isValidSudoku(board2) is False
    print("Test case 2 passed: Invalid - duplicate in row")

    # Test case 3: Invalid - duplicate in column
    board3 = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["5", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    assert solution.isValidSudoku(board3) is False
    print("Test case 3 passed: Invalid - duplicate in column")

    # Test case 4: Invalid - duplicate in 3x3 box
    board4 = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "5", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    assert solution.isValidSudoku(board4) is False
    print("Test case 4 passed: Invalid - duplicate in 3x3 box")

    # Test case 5: All empty
    board5 = [["." for _ in range(9)] for _ in range(9)]
    assert solution.isValidSudoku(board5) is True
    print("Test case 5 passed: All empty cells")

    # Test case 6: Single digit
    board6 = [["." for _ in range(9)] for _ in range(9)]
    board6[0][0] = "5"
    assert solution.isValidSudoku(board6) is True
    print("Test case 6 passed: Single digit")

    # Test case 7: Full valid board
    board7 = [
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
    assert solution.isValidSudoku(board7) is True
    print("Test case 7 passed: Full valid board")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()
