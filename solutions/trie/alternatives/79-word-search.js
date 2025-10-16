/**
 * # Difficulty: Medium
 *
 * # 79. Word Search
 *
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.
 *
 * The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["A", "B", "C", "E"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Word 'OATH' exists in the board by searching paths</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a classic backtracking problem on a 2D grid. While a Trie isn't strictly necessary for single word search, understanding this problem helps with Word Search II (212). We use DFS with backtracking to explore all possible paths, marking visited cells to avoid reuse, and unmarking them when backtracking.
 *
 * ### APPROACH:
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
 * - DFS explores all possible paths systematically
 * - Backtracking allows trying different paths from same starting point
 * - Marking prevents cycles and reuse of same cell
 * - Base cases handle word completion and boundary conditions
 * - Early termination avoids unnecessary exploration
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * board = [['A','B','C','E'],
 *          ['S','F','C','S'],
 *          ['A','D','E','E']]
 * word = "ABCCED"
 *
 * Try (0,0) 'A':
 *   Match 'A' ✓, mark visited, look for 'B'
 *   Try (0,1) 'B':
 *     Match 'B' ✓, mark visited, look for 'C'
 *     Try (0,2) 'C':
 *       Match 'C' ✓, mark visited, look for 'C'
 *       Try (1,2) 'C':
 *         Match 'C' ✓, mark visited, look for 'E'
 *         Try (2,2) 'E':
 *           Match 'E' ✓, mark visited, look for 'D'
 *           Try (2,1) 'D':
 *             Match 'D' ✓, complete! Return True
 *
 * Result: True (found path)
 * ```
 *
 * ### TIME COMPLEXITY:
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
 * - Word longer than total cells
 * - Word is single character
 * - Word not in board
 * - Word requires using all cells
 * - Multiple valid paths exist
 *
 * </details>
 */

/**
 * Main solution for Problem 79: Word Search
 *
 * @param {character[][]} board - 2D board of characters
 * @param {string} word - Word to search for
 * @return {boolean} - True if word exists in board
 *
 * Time Complexity: O(m*n*4^L)
 * Space Complexity: O(L)
 */
function exist(board, word) {
  if (!board || board.length === 0 || !word) return false;

  const rows = board.length;
  const cols = board[0].length;

  // DFS helper function
  const dfs = (row, col, index) => {
    // Found the complete word
    if (index === word.length) return true;

    // Boundary checks and character match
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    // Mark cell as visited by temporarily changing it
    const temp = board[row][col];
    board[row][col] = "#";

    // Explore all 4 directions
    const found =
      dfs(row + 1, col, index + 1) || // down
      dfs(row - 1, col, index + 1) || // up
      dfs(row, col + 1, index + 1) || // right
      dfs(row, col - 1, index + 1); // left

    // Backtrack: restore the cell
    board[row][col] = temp;

    return found;
  };

  // Try starting from each cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Alternative solution using visited set instead of modifying board
 */
function existWithSet(board, word) {
  if (!board || board.length === 0 || !word) return false;

  const rows = board.length;
  const cols = board[0].length;

  const dfs = (row, col, index, visited) => {
    if (index === word.length) return true;

    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return false;
    }

    const key = `${row},${col}`;
    if (visited.has(key) || board[row][col] !== word[index]) {
      return false;
    }

    visited.add(key);

    const found =
      dfs(row + 1, col, index + 1, visited) ||
      dfs(row - 1, col, index + 1, visited) ||
      dfs(row, col + 1, index + 1, visited) ||
      dfs(row, col - 1, index + 1, visited);

    visited.delete(key);

    return found;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (dfs(row, col, 0, new Set())) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Test cases for Problem 79: Word Search
 */
function testSolution() {
  console.log("Testing 79. Word Search");

  // Test case 1: Word exists
  const board1 = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  const result1 = exist(board1, "ABCCED");
  console.assert(result1 === true, 'Test 1 failed: "ABCCED" should be found');

  // Test case 2: Word exists with different path
  const board2 = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  const result2 = exist(board2, "SEE");
  console.assert(result2 === true, 'Test 2 failed: "SEE" should be found');

  // Test case 3: Word does not exist
  const board3 = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  const result3 = exist(board3, "ABCB");
  console.assert(
    result3 === false,
    'Test 3 failed: "ABCB" should not be found',
  );

  // Test case 4: Single cell
  const board4 = [["A"]];
  const result4a = exist(board4, "A");
  const result4b = exist(board4, "B");
  console.assert(result4a === true, 'Test 4a failed: "A" should be found');
  console.assert(result4b === false, 'Test 4b failed: "B" should not be found');

  // Test case 5: Word requires zigzag path
  const board5 = [
    ["C", "A", "A"],
    ["A", "A", "A"],
    ["B", "C", "D"],
  ];
  const result5 = exist(board5, "AAB");
  console.assert(result5 === true, 'Test 5 failed: "AAB" should be found');

  // Test case 6: Alternative solution with Set
  const board6 = [
    ["A", "B", "C", "E"],
    ["S", "F", "C", "S"],
    ["A", "D", "E", "E"],
  ];
  const result6 = existWithSet(board6, "ABCCED");
  console.assert(
    result6 === true,
    'Test 6 (with Set) failed: "ABCCED" should be found',
  );

  console.log("All test cases passed for 79. Word Search!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 79. Word Search ===");
  console.log("Category: Trie / Backtracking");
  console.log("Difficulty: Medium");
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  exist,
  existWithSet,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This problem is typically solved with backtracking, not Trie
 * - Trie would be useful for Word Search II (multiple words)
 * - Modifying board temporarily is more space-efficient than using Set
 * - Can optimize by checking if word has characters not in board before starting
 */
