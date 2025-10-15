"""
# Difficulty: Medium

# 036. Valid Sudoku

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

1. Each row must contain the digits 1-9 without repetition.
2. Each column must contain the digits 1-9 without repetition.
3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Note:
- A Sudoku board (partially filled) could be valid but is not necessarily solvable.
- Only the filled cells need to be validated according to the mentioned rules.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>board = [</dd>
<dt>Output:</dt>
<dd>True</dd>
<dt>Explanation:</dt>
<dd>The 9×9 Sudoku board is valid because each row, column, and 3×3 sub-box contains no duplicate digits 1-9</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use three hash sets to track numbers seen in each row, column, and 3x3 box. For each cell, calculate its box index using (row//3)*3 + (col//3), then check if the number already exists in any of the three sets before adding it.

### APPROACH:
1. **Initialize tracking sets**: Create three dictionaries (rows, cols, boxes) using defaultdict(set) to track seen numbers
2. **Iterate through board**: Loop through each cell (i, j) in the 9×9 grid using nested loops
3. **Skip empty cells**: If board[i][j] == '.', continue to next cell without validation
4. **Calculate box index**: Compute box_idx = (i // 3) * 3 + (j // 3) to determine which 3×3 box the cell belongs to
5. **Check for duplicates**: Verify the current value doesn't exist in rows[i], cols[j], or boxes[box_idx]
6. **Return false if duplicate**: If value found in any of the three sets, return False immediately
7. **Add to tracking sets**: Add the current value to rows[i].add(val), cols[j].add(val), and boxes[box_idx].add(val)
8. **Return true on completion**: If loop completes without finding duplicates, return True

### WHY THIS WORKS:
- Hash sets provide O(1) lookup to detect duplicates instantly
- Using three separate tracking structures (rows, cols, boxes) allows simultaneous validation
- Box index formula (row//3)*3 + (col//3) correctly maps any cell to its 3×3 box (0-8)
- Single pass through the board achieves O(81) = O(1) time for fixed 9×9 grid
- Early return on first duplicate prevents unnecessary checking

### EXAMPLE WALKTHROUGH:
```
Input: board = [
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  ...
]

Step 1: Initialize tracking sets
  rows: dict[Any, set[Any]] = defaultdict(set)
  cols: dict[Any, set[Any]] = defaultdict(set)
  boxes: dict[Any, set[Any]] = defaultdict(set)

Step 2: Process cell (0,0) = "5"
  box_idx = (0//3)*3 + (0//3) = 0
  Add to rows[0], cols[0], boxes[0]

Step 3: Process cell (0,1) = "3"
  box_idx = (0//3)*3 + (1//3) = 0
  "3" not in rows[0], cols[1], boxes[0]
  Add to respective sets

Step 4: Continue for all cells
  If "5" appears again in row 0, col 0, or box 0
  → return False

Step 5: All cells checked without conflicts
Output: True
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

from collections import defaultdict

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        """
        Determines if a 9x9 Sudoku board is valid.

        Args:
            board: 9x9 list of lists containing strings ('1'-'9' or '.')

        Returns:
            bool: True if the board is valid, False otherwise
        """
        # Initialize hash sets to track numbers in rows, columns, and boxes
        rows: dict[Any, set[Any]] = defaultdict(set)
        cols: dict[Any, set[Any]] = defaultdict(set)
        boxes: dict[Any, set[Any]] = defaultdict(set)

        # Iterate through each cell in the 9x9 board
        for i in range(9):
            for j in range(9):
                # Get current cell value
                val = board[i][j]

                # Skip empty cells
                if val == ".":
                    continue

                # Calculate box index (0-8) for current cell
                box_idx = (i // 3) * 3 + (j // 3)

                # Check if number already exists in current row, column, or box
                if val in rows[i] or val in cols[j] or val in boxes[box_idx]:
                    return False

                # Add number to respective sets
                rows[i].add(val)
                cols[j].add(val)
                boxes[box_idx].add(val)

        return True


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Valid sudoku board
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
    result = solution.isValidSudoku(board1)
    expected = True
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Invalid sudoku - duplicate in row
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
    result = solution.isValidSudoku(board2)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Invalid sudoku - duplicate in column
    board3 = [
        ["8", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["3", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"],
    ]
    result = solution.isValidSudoku(board3)
    expected = False
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 036. Valid Sudoku")
