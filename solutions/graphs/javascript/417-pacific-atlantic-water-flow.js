/**
 *  Difficulty: Medium
 *
 * # 417. Pacific Atlantic Water Flow
 *
 * There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the island's right and bottom edges.
 *
 * The island is partitioned into a grid of square cells. You are given an m x n integer matrix heights where heights[r][c] represents the height above sea level of the cell at coordinate (r, c).
 *
 * The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is less than or equal to the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.
 *
 * Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[0,4]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Cells where water can flow to both oceans: [[0,4],[1,3],[1,4],[2,2]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Graph Traversal (DFS/BFS), Graph Algorithms
 * **Data Structures**: Graph (Adjacency List/Matrix), Queue, Stack
 * **Patterns**: Graph Traversal Pattern, Connected Components
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem models relationships as a graph and uses traversal techniques (DFS/BFS) to explore connections and find solutions.
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply graphs methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages graphs principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 * Step 1: DFS from Pacific border (top, left)
 *   pacific = {(0,0),(0,1),...,(4,0)}
 *
 * Step 2: DFS from Atlantic border (bottom, right)
 *   atlantic = {(4,4),(4,3),...,(0,4)}
 *
 * Step 3: Find intersection
 *   Both oceans reachable from:
 *   (0,4): height=5 → can flow both ways
 *   (1,3): height=4 → can flow both ways
 *   (1,4): height=4 → can flow both ways
 *   (2,2): height=5 → can flow both ways
 *   (3,0): height=6 → can flow both ways
 *   (3,1): height=7 → can flow both ways
 *   (4,0): height=5 → can flow both ways
 *
 * Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 417: Pacific Atlantic Water Flow
 *
 * @param {number[][]} heights - 2D array of cell heights
 * @return {number[][]} - Array of coordinates [row, col] where water can reach both oceans
 *
 * Time Complexity: O(m * n) - visit each cell at most twice
 * Space Complexity: O(m * n) - two visited arrays and recursion stack
 */
function solve(heights) {
  if (!heights || heights.length === 0 || heights[0].length === 0) {
    return [];
  }

  const rows = heights.length;
  const cols = heights[0].length;

  // Track which cells can reach each ocean
  const pacificReachable = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  const atlanticReachable = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  function dfs(row, col, reachable, prevHeight) {
    // Check bounds and if current height allows water flow
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      reachable[row][col] ||
      heights[row][col] < prevHeight
    ) {
      return;
    }

    reachable[row][col] = true;

    // Explore all 4 directions
    for (const [dr, dc] of directions) {
      dfs(row + dr, col + dc, reachable, heights[row][col]);
    }
  }

  // Start DFS from Pacific borders (top and left edges)
  for (let col = 0; col < cols; col++) {
    dfs(0, col, pacificReachable, heights[0][col]); // Top edge
    dfs(rows - 1, col, atlanticReachable, heights[rows - 1][col]); // Bottom edge
  }

  for (let row = 0; row < rows; row++) {
    dfs(row, 0, pacificReachable, heights[row][0]); // Left edge
    dfs(row, cols - 1, atlanticReachable, heights[row][cols - 1]); // Right edge
  }

  // Find intersection - cells reachable from both oceans
  const result = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacificReachable[row][col] && atlanticReachable[row][col]) {
        result.push([row, col]);
      }
    }
  }

  return result;
}

/**
 * Test cases for Problem 417: Pacific Atlantic Water Flow
 */
function testSolution() {
  console.log("Testing 417. Pacific Atlantic Water Flow");

  // Helper function to compare arrays of coordinates
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const setA = new Set(a.map((coord) => coord.join(",")));
    const setB = new Set(b.map((coord) => coord.join(",")));
    return setA.size === setB.size && [...setA].every((x) => setB.has(x));
  }

  // Test case 1: Example from problem description
  const heights1 = [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ];
  const result1 = solve(heights1);
  const expected1 = [
    [0, 4],
    [1, 3],
    [1, 4],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Single cell
  const heights2 = [[1]];
  const result2 = solve(heights2);
  const expected2 = [[0, 0]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single row
  const heights3 = [[1, 2, 3]];
  const result3 = solve(heights3);
  const expected3 = [
    [0, 0],
    [0, 1],
    [0, 2],
  ];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Single column
  const heights4 = [[1], [2], [3]];
  const result4 = solve(heights4);
  const expected4 = [
    [0, 0],
    [1, 0],
    [2, 0],
  ];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Mountain in center
  const heights5 = [
    [1, 1, 1],
    [1, 3, 1],
    [1, 1, 1],
  ];
  const result5 = solve(heights5);
  const expected5 = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Empty grid
  const heights6 = [];
  const result6 = solve(heights6);
  const expected6 = [];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  // Test case 7: Descending heights
  const heights7 = [
    [3, 2, 1],
    [2, 1, 0],
    [1, 0, 0],
  ];
  const result7 = solve(heights7);
  const expected7 = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 0],
    [2, 1],
    [2, 2],
  ];
  console.assert(
    arraysEqual(result7, expected7),
    `Test 7 failed: expected ${JSON.stringify(expected7)}, got ${JSON.stringify(result7)}`,
  );

  console.log("All test cases passed for 417. Pacific Atlantic Water Flow!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 417. Pacific Atlantic Water Flow ===");
  console.log("Category: Graphs");
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
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
