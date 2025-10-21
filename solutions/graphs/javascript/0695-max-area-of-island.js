/**
 * # Difficulty: Medium
 *
 * # 695. Max Area Of Island
 *
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
 *
 * The area of an island is the number of cells with a value 1 in the island.
 *
 * Return the maximum area of an island in grid. If there is no island, return 0.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[0,0,1,0,0,0,0,1,0,0,0,0,0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Maximum island area is 6 square units</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Stack Operations, Graph Traversal
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: * O(M × N)
 * **Space Complexity**: * O(M × N)

 *
 * ### INTUITION:
 * This is similar to "Number of Islands" but instead of counting islands, we need to find the largest island by area. We use DFS/BFS to explore each island and calculate its area, keeping track of the maximum area found.
 *
 * ### APPROACH:
 * 1. **Iterate through grid**: Check each cell
 * 2. **Find land**: When we find a 1 (land), start exploring the island
 * 3. **DFS/BFS exploration**: Count all connected land cells (area)
 * 4. **Track maximum**: Keep track of the largest area found
 * 5. **Mark visited**: Avoid double-counting cells
 *
 * ### WHY THIS WORKS:
 * - DFS/BFS explores connected components completely
 * - Each exploration returns the area of that island
 * - We track the maximum area across all islands
 * - In-place marking ensures each cell is counted exactly once
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Grid: [[0,0,1,0,0,0,0,1,0,0,0,0,0],
 *        [0,0,0,0,0,0,0,1,1,1,0,0,0],
 *        [0,1,1,0,1,0,0,0,0,0,0,0,0],
 *        [0,1,0,0,1,1,0,0,1,0,1,0,0]]
 *
 * Islands found:
 * - (0,2): area = 1
 * - (0,7), (1,7), (1,8), (1,9): area = 4
 * - (2,1), (2,2), (3,1): area = 3
 * - (2,4), (3,4), (3,5): area = 3
 * - (3,8): area = 1
 * - (3,10): area = 1
 *
 * Maximum area = 4
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(M × N)
 * We visit each cell at most once
 *
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For recursion stack in worst case
 *
 * ### EDGE CASES:
 * - **All water**: Return 0 (no islands)
 * - **Single cell island**: Return 1
 * - **Entire grid is one island**: Return m * n
 * - **Multiple islands**: Return area of largest
 * - **Empty grid**: Return 0
 *
 * </details>
 */

/**
 * Main solution for Problem 695: Max Area Of Island
 *
 * @param {number[][]} grid - 2D grid of 0s and 1s
 * @return {number} - Maximum area of any island
 *
 * Time Complexity: O(m * n) - visit each cell at most once
 * Space Complexity: O(m * n) - recursion stack in worst case
 */
function solve(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let maxArea = 0;

  function dfs(row, col) {
    // Base cases: out of bounds or water
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      grid[row][col] === 0
    ) {
      return 0;
    }

    // Mark current cell as visited
    grid[row][col] = 0;

    // Calculate area: current cell (1) + areas of all connected cells
    let area = 1;
    area += dfs(row + 1, col); // down
    area += dfs(row - 1, col); // up
    area += dfs(row, col + 1); // right
    area += dfs(row, col - 1); // left

    return area;
  }

  // Iterate through each cell in the grid
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        const area = dfs(row, col);
        maxArea = Math.max(maxArea, area);
      }
    }
  }

  return maxArea;
}

/**
 * Test cases for Problem 695: Max Area Of Island
 */
function testSolution() {
  console.log("Testing 695. Max Area Of Island");

  // Test case 1: Example from problem description
  const grid1 = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ];
  const result1 = solve(JSON.parse(JSON.stringify(grid1)));
  console.assert(result1 === 6, `Test 1 failed: expected 6, got ${result1}`);

  // Test case 2: No islands
  const grid2 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const result2 = solve(JSON.parse(JSON.stringify(grid2)));
  console.assert(result2 === 0, `Test 2 failed: expected 0, got ${result2}`);

  // Test case 3: Single cell island
  const grid3 = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ];
  const result3 = solve(JSON.parse(JSON.stringify(grid3)));
  console.assert(result3 === 1, `Test 3 failed: expected 1, got ${result3}`);

  // Test case 4: Entire grid is one island
  const grid4 = [
    [1, 1],
    [1, 1],
  ];
  const result4 = solve(JSON.parse(JSON.stringify(grid4)));
  console.assert(result4 === 4, `Test 4 failed: expected 4, got ${result4}`);

  // Test case 5: Linear island
  const grid5 = [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
  ];
  const result5 = solve(JSON.parse(JSON.stringify(grid5)));
  console.assert(result5 === 4, `Test 5 failed: expected 4, got ${result5}`);

  // Test case 6: Multiple small islands
  const grid6 = [
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
  ];
  const result6 = solve(JSON.parse(JSON.stringify(grid6)));
  console.assert(result6 === 1, `Test 6 failed: expected 1, got ${result6}`);

  // Test case 7: Empty grid
  const grid7 = [];
  const result7 = solve(grid7);
  console.assert(result7 === 0, `Test 7 failed: expected 0, got ${result7}`);

  console.log("All test cases passed for 695. Max Area Of Island!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 695. Max Area Of Island ===");
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
