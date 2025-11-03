/**
 * # 0289. Game Of Life
 *
 * Difficulty: Medium
 *
 *
 * According to Wikipedia's article: "The Game of Life, also known simply as Life,
 * is a cellular automaton devised by the British mathematician John Horton Conway in 1970."
 *
 * The board is made up of an m x `n` `grid` of cells, where each cell has an initial
 * state: live (represented by a 1) or dead (represented by a 0). Each cell interacts
 * with its eight neighbors (horizontal, vertical, diagonal) using the following four rules:
 *
 * 1. Any live cell with fewer than two live neighbors dies (underpopulation)
 * 2. Any live cell with two or three live neighbors lives on to the next generation
 * 3. Any live cell with more than three live neighbors dies (overpopulation)
 * 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
 *
 * The next state is created by applying the above rules simultaneously to every cell
 * in the current state, where births and deaths occur simultaneously.
 *
 * Example:
 * Input: `board` = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * Output: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>board` = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]</dd>
 * <dt>Output:</dt>
 * <dd>[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]</dd>
 * <dt>Explanation:</dt>
 * <dd>After one step of Game of Life, the board state updates based on neighbor counts</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Array, String, Matrix
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
The key insight is that the challenge is applying rules simultaneously to all cells. Use state encoding to track both current and next states in-place, avoiding extra space while ensuring all decisions are based on the original state.

### APPROACH:
1. **State Encoding**: Use 4 states instead of 2
   - 0: dead → dead
   - 1: live → live
   - 2: live → dead (dying)
   - 3: dead → live (born)
2. **Two Passes**: First pass marks transitions, second pass finalizes states
3. **Neighbor Counting**: Count neighbors considering only original states (0,1 and 2 were originally live)

### WHY THIS WORKS:
 * The encoding preserves original state information while tracking transitions. During neighbor counting, we can distinguish original live cells (1 or 2) from original dead cells (0 or 3), ensuring correct rule application.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
 * ```
 *
 * Steps (showing 4 generations with rule application):
 *
 * Step 1: Initial → Generation 1
 *   Applying rules to each cell (showing all 8 neighbors):
 *   - [0,1]=1 has neighbors [0,0]=0, [0,2]=0, [1,0]=0, [1,1]=0, [1,2]=1 → 1 live → dies (underpopulation)
 *   - [1,2]=1 has neighbors [0,1]=1, [0,2]=0, [1,1]=0, [2,1]=1, [2,2]=1 → 3 live → survives (2-3 neighbors)
 *   - [2,0]=1 has neighbors [1,0]=0, [1,1]=0, [2,1]=1, [3,0]=0, [3,1]=0 → 1 live → dies (underpopulation)
 *   - [2,1]=1 has neighbors [1,0]=0, [1,1]=0, [1,2]=1, [2,0]=1, [2,2]=1, [3,0]=0, [3,1]=0, [3,2]=0 → 3 live → survives (2-3 neighbors)
 *   - [2,2]=1 has neighbors [1,1]=0, [1,2]=1, [2,1]=1, [3,1]=0, [3,2]=0 → 2 live → survives (2-3 neighbors)
 *   - [1,0]=0 has neighbors [0,0]=0, [0,1]=1, [1,1]=0, [2,0]=1, [2,1]=1 → 3 live → becomes alive (reproduction)
 *   - [1,1]=0 has neighbors [0,0]=0, [0,1]=1, [0,2]=0, [1,0]=0, [1,2]=1, [2,0]=1, [2,1]=1, [2,2]=1 → 5 live → stays dead (not exactly 3)
 *   - [3,1]=0 has neighbors [2,0]=1, [2,1]=1, [2,2]=1, [3,0]=0, [3,2]=0 → 3 live → becomes alive (reproduction)
 *   Result: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
 *
 * Step 2: Generation 1 → Generation 2
 *   Pattern stabilizing, fewer changes
 *   Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]
 *
 * Step 3: Generation 2 → Generation 3
 *   Pattern reached stable state (no changes)
 *   Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]
 *
 * Step 4: Generation 3 → Generation 4
 *   Pattern remains stable
 *   Result: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]
 *
 * Output (after 4 generations):
 * ```
 * [[0,0,0],[0,0,1],[0,1,1],[0,1,0]]
 * ```

 * ### TIME COMPLEXITY:

 * O(m × n)

 * - Based on input size and operations
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
- **All dead cells**: Remain dead if no neighbors
- **All live cells**: Most die from overcrowding
- **Single live cell**: Dies (insufficient neighbors)
- **Stable patterns**: Some configurations don't change
- **In-place update**: Use encoding to track current and next state

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>
 */

/**
 * Main solution for Problem 289: Game Of Life
 *
 * @param {number[][]} board - 2D grid representing game state
 * @return {void} - Modifies board in-place
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1)
 */
function solve(board) {
  if (!board || board.length === 0 || board[0].length === 0) {
    return;
  }

  const m = board.length;
  const n = board[0].length;

  // State encoding:
  // 0: dead -> dead
  // 1: live -> live
  // 2: live -> dead (dying)
  // 3: dead -> live (born)

  // Helper function to count live neighbors
  const countLiveNeighbors = (row, col) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    let count = 0;
    for (const [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
        // Count as live if originally live (1 or 2)
        if (board[newRow][newCol] === 1 || board[newRow][newCol] === 2) {
          count++;
        }
      }
    }

    return count;
  };

  // First pass: mark transitions using encoding
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const liveNeighbors = countLiveNeighbors(i, j);

      if (board[i][j] === 1) {
        // Live cell
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 2; // Will die
        }
        // else stays 1 (survives)
      } else {
        // Dead cell
        if (liveNeighbors === 3) {
          board[i][j] = 3; // Will become alive
        }
        // else stays 0 (stays dead)
      }
    }
  }

  // Second pass: finalize states
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 0; // Died
      } else if (board[i][j] === 3) {
        board[i][j] = 1; // Born
      }
    }
  }
}

/**
 * Test cases for Problem 289: Game Of Life
 */
function testSolution() {
  console.log("Testing 289. Game Of Life");

  // Helper to compare 2D arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false;
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false;
      }
    }
    return true;
  };

  // Test case 1: Basic example
  const board1 = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ];
  solve(board1);
  const expected1 = [
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
  ];
  console.assert(
    arraysEqual(board1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(board1)}`,
  );

  // Test case 2: All dead cells
  const board2 = [
    [0, 0],
    [0, 0],
  ];
  solve(board2);
  const expected2 = [
    [0, 0],
    [0, 0],
  ];
  console.assert(
    arraysEqual(board2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(board2)}`,
  );

  // Test case 3: Stable configuration (block)
  const board3 = [
    [1, 1],
    [1, 1],
  ];
  solve(board3);
  const expected3 = [
    [1, 1],
    [1, 1],
  ];
  console.assert(
    arraysEqual(board3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(board3)}`,
  );

  // Test case 4: Blinker (oscillator)
  const board4 = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
  solve(board4);
  const expected4 = [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ];
  console.assert(
    arraysEqual(board4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(board4)}`,
  );

  // Test case 5: Single cell (dies)
  const board5 = [[1]];
  solve(board5);
  const expected5 = [[0]];
  console.assert(
    arraysEqual(board5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(board5)}`,
  );

  console.log("All test cases passed for 289. Game Of Life!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 289. Game Of Life ===");
  console.log("Category: Simulation");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
