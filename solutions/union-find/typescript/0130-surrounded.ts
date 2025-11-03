/**
### INTUITION:
The key insight is that use Union-Find to connect adjacent 'X' cells. For border 'O' cells, connect to virtual border node. After processing, 'O' cells not connected to border should be flipped to 'X'.

### APPROACH:
1. **Initialize Union-Find**: Create parent array and find/union functions
2. **Connect border Os**: Union all 'O' cells on borders with a dummy border node
3. **Connect internal Os**: Union all adjacent 'O' cells in interior
4. **Identify surrounded**: After unions, check if each 'O' is connected to border
5. **Flip if surrounded**: If 'O' not connected to border, change to 'X'
6. **Keep if connected**: If connected to border, keep as 'O'
7. **Modify in-place**: Update board directly

### WHY THIS WORKS:
- This ensures that union-find or DFS from borders to mark unsurrounded regions
- This ensures that start DFS/BFS from 'O' cells on borders (these can't be surrounded)
- This ensures that mark all connected 'O' cells as safe (connected to border)
- This ensures that flip all unmarked 'O' to 'X' (these are surrounded)
- This ensures that o(m*n) time: visit each cell once, O(m*n) space for visited/parent array

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
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Captures all regions surrounded by 'X' using DFS from borders.
   *
   * Time Complexity: O(m * n)
   * Space Complexity: O(m * n) for recursion stack
   */
  solve(board: string[][]): void {
    if (!board || board.length === 0 || board[0].length === 0) {
      return;
    }

    const rows = board.length;
    const cols = board[0].length;

    const dfs = (row: number, col: number): void => {
      // Check boundaries and if current cell is 'O'
      if (row < 0 || col < 0 || row >= rows || col >= cols || board[row][col] !== "O") {
        return;
      }

      // Mark this cell as visited by changing it to a temporary character
      board[row][col] = "#";

      // Check all four adjacent cells
      dfs(row + 1, col); // Down
      dfs(row - 1, col); // Up
      dfs(row, col + 1); // Right
      dfs(row, col - 1); // Left
    };

    // Step 1: Mark all 'O's connected to the border as '#'

    // Check first and last row
    for (let col = 0; col < cols; col++) {
      dfs(0, col);
      dfs(rows - 1, col);
    }

    // Check first and last column
    for (let row = 0; row < rows; row++) {
      dfs(row, 0);
      dfs(row, cols - 1);
    }

    // Step 2: Flip all remaining 'O's to 'X's and restore '#'s to 'O's
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === "O") {
          board[row][col] = "X";
        } else if (board[row][col] === "#") {
          board[row][col] = "O";
        }
      }
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const board1 = [["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]];
  solution.solve(board1);
  const expected1 = [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]];
  console.log(`Test 1: ${JSON.stringify(board1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const board2 = [["X", "X", "X"], ["X", "O", "X"], ["X", "X", "X"]];
  solution.solve(board2);
  const expected2 = [["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]];
  console.log(`Test 2: ${JSON.stringify(board2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
