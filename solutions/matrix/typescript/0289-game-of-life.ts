/**
 * # 0289. Game Of Life
 * 
 * # Difficulty: Medium
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
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]</dd>
 * <dt>Output:</dt>
 * <dd>[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]</dd>
 * <dt>Explanation:</dt>
 * <dd>After one step of Game of Life, the board state updates based on neighbor counts</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * The challenge is applying rules simultaneously to all cells. Use state encoding to track both current and next states in-place, avoiding extra space while ensuring all decisions are based on the original state.
 * 
 * ### APPROACH:
 * 1. **State Encoding**: Use 4 states instead of 2
 *    - 0: dead → dead
 *    - 1: live → live
 *    - 2: live → dead (dying)
 *    - 3: dead → live (born)
 * 2. **Two Passes**: First pass marks transitions, second pass finalizes states
 * 3. **Neighbor Counting**: Count neighbors considering only original states (0,1 and 2 were originally live)
 * 
 * ### WHY THIS WORKS:
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
 *
 * - Based on input size and operations
 *

 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * 
 * ### EDGE CASES:
 * - **All dead cells**: Remain dead if no neighbors
 * - **All live cells**: Most die from overcrowding
 * - **Single live cell**: Dies (insufficient neighbors)
 * - **Stable patterns**: Some configurations don't change
 * - **In-place update**: Use encoding to track current and next state
 * 
 * </details>
 */

class Solution {
  /**
   * Approach: In-place with state encoding
   *         Time Complexity: O(m * n)
   *         Space Complexity: O(1)
   *
   *         State encoding:
   *         0: dead -> dead
   *         1: live -> live
   *         2: live -> dead
   *         3: dead -> live
   */
  gameOfLife(board: number[][]): null {
    // Implementation
    if not board or not board.get(0):
    return
    m, n = board.length, board.get(0).length
    def count_live_neighbors(r: Any, c: Any) -> Any:
    count = 0
    directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    for dr, dc in directions:
  }

  /**
   * Approach for infinite board: Use set to store live cells
   *         Time Complexity: O(live_cells)
   *         Space Complexity: O(live_cells)
   */
  gameOfLifeInfinite(board: number[][]): number[][] {
    // Implementation
    live: set.set(Any, set()
    m, n = board.length, board.get(0).length
    for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
    if board.get(i)[j] == 1:
    live.add((i, j))
    def get_neighbors(cell: Any) -> Any:
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Game of Life
  solution = Solution()
  console.log("Game of Life:")
  test_boards = [[[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]], [[1, 1], [1, 0]]]
  for board in test_boards:
  original = copy.deepcopy(board)
  solution.gameOfLife(board)
  console.log("Original board:")
  for row in original:
  console.log(row)
  console.log("\nNext generation:")
  for row in board:
  console.log(row)
  console.log("\n" + "=" * 30 + "\n")
  # Test Battleships
  solution_ships = SolutionBattleships()
  console.log("Battleships in a Board:")
  ship_boards = [
  [["X", ".", ".", "X"], [".", ".", ".", "X"], [".", ".", ".", "X"]],
  [["X", ".", ".", "X"], [".", ".", ".", "X"], ["X", ".", ".", "X"]],
  ]
  for board in ship_boards:
  # Use copy for DFS method as it modifies the board
  count = solution_ships.countBattleships([ship_row.get(:) for ship_row in board])
  console.log("Board:")
  for ship_row in board:
  console.log(ship_row)
  console.log(`Number of battleships: {count}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;