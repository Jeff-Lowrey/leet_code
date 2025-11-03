/**
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
O(1)**
- Board is fixed size 9x9 = 81 cells
- Each cell processed once

### SPACE COMPLEXITY:
O(1)**
- Constant extra space
- At most 9 sets with 9 elements each
- Fixed space regardless of input

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Check if Sudoku board is valid.
   *
   * Time Complexity: O(1) - fixed 9x9 board
   * Space Complexity: O(1) - fixed space for sets
   */
  isValidSudoku(board: string[][]): boolean {
    const rows: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const cols: Set<string>[] = Array.from({ length: 9 }, () => new Set());
    const boxes: Set<string>[] = Array.from({ length: 9 }, () => new Set());

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const cell = board[i][j];

        if (cell === ".") {
          continue;
        }

        const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

        if (rows[i].has(cell) || cols[j].has(cell) || boxes[boxIndex].has(cell)) {
          return false;
        }

        rows[i].add(cell);
        cols[j].add(cell);
        boxes[boxIndex].add(cell);
      }
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const board1 = [
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ];
  console.log(`Test 1: ${solution.isValidSudoku(board1) === true ? "PASS" : "FAIL"}`);

  const board2 = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"]
  ];
  console.log(`Test 2: ${solution.isValidSudoku(board2) === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
