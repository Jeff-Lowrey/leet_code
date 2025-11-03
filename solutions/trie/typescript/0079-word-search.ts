/**
 * # Difficulty: Medium
 *
 * # 0079. Word Search
 *
 *
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["A", "B", "C", "E"]]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Word 'OATH' exists in the board by searching paths</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Hash Table Pattern, Backtracking
 * **Time Complexity**: O(M * N * 4^L)
 * **Space Complexity**: O(L)
 *
 * ### INTUITION:
The key insight is that this is a classic backtracking problem on a 2D grid. While a Trie isn't strictly necessary for single word search, understanding this problem helps with Word Search II (212). We use DFS with backtracking to explore all possible paths, marking visited cells to avoid reuse, and unmarking them when backtracking.

### APPROACH:
 * 1. **Try each cell as start**: Iterate through all cells as potential starting points
 * 2. **DFS with backtracking**: From each start, explore 4 directions recursively
 * 3. **Match characters**: At each step, check if current cell matches current character
 * 4. **Mark visited**: Temporarily mark cells as visited to prevent reuse
 * 5. **Backtrack**: Restore cell value when returning from recursion
 * 6. **Early termination**: Return true immediately when word is found
 *
 * Optional Trie optimization: Pre-check if word's prefix exists (useful for multiple words)
 *
 * ### WHY THIS WORKS:
- This ensures that dFS explores all possible paths systematically
- This ensures that backtracking allows trying different paths from same starting point
- This ensures that marking prevents cycles and reuse of same cell
- This ensures that base cases handle word completion and boundary conditions
- This ensures that early termination avoids unnecessary exploration

### EXAMPLE WALKTHROUGH:
Input:
```
board = [['A','B','C','E'],
```

['S','F','C','S'],
['A','D','E','E']]
word = "ABCCED"
Try (0,0) 'A':
Match 'A' ✓, mark visited, look for 'B'
Try (0,1) 'B':
Match 'B' ✓, mark visited, look for 'C'
Try (0,2) 'C':
Match 'C' ✓, mark visited, look for 'C'
Try (1,2) 'C':
Match 'C' ✓, mark visited, look for 'E'
Try (2,2) 'E':
Match 'E' ✓, mark visited, look for 'D'
Try (2,1) 'D':
Match 'D' ✓, complete! Return True
Result: True (found path)

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
 * O(M * N * 4^L)
 * Where M*N is board size, L is word length
 * - We try each cell as start: O(M*N)
 * - From each cell, explore 4 directions recursively: O(4^L)
 *
 * ### SPACE COMPLEXITY:
 * O(L)
 * For recursion stack depth (word length)
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Solution {
  exist(board: string[][], word: string): boolean {
    if (!board || !board[0] || !word) return false;

    const m = board.length;
    const n = board[0].length;

    const dfs = (row: number, col: number, index: number): boolean => {
      if (index === word.length) return true;

      if (row < 0 || row >= m || col < 0 || col >= n || board[row][col] !== word[index]) {
        return false;
      }

      const temp = board[row][col];
      board[row][col] = "#";

      const found =
        dfs(row + 1, col, index + 1) ||
        dfs(row - 1, col, index + 1) ||
        dfs(row, col + 1, index + 1) ||
        dfs(row, col - 1, index + 1);

      board[row][col] = temp;
      return found;
    };

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === word[0] && dfs(i, j, 0)) {
          return true;
        }
      }
    }

    return false;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const board1 = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
  console.log(`Test 1: ${solution.exist(board1, "ABCCED") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.exist(board1, "SEE") === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.exist(board1, "ABCB") === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
