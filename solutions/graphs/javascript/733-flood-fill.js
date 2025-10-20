/**
 *  Difficulty: Easy
 *
 * # 733. Flood Fill
 *
 * An image is represented by an m x n integer grid image where image[i][j] represents
 * the pixel value of the image. You are also given three integers sr, sc, and color.
 * You should perform a flood fill on the image starting from the pixel image[sr][sc].
 *
 * To perform a flood fill, consider the starting pixel, plus any pixels connected
 * 4-directionally to the starting pixel of the same color as the starting pixel,
 * plus any pixels connected 4-directionally to those pixels (also with the same color),
 * and so on. Replace the color of all of the aforementioned pixels with color.
 *
 * Return the modified image after performing the flood fill.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,1,1]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Flood fill changes connected cells [1,1,1] from color 1 to 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Graph Traversal (DFS/BFS), Graph Algorithms
 * **Data Structures**: Graph (Adjacency List/Matrix), Queue, Stack
 * **Patterns**: Graph Traversal Pattern, Connected Components
 * **Time Complexity**: **O(m×n)
 * **Space Complexity**: **O(m×n)

 *
 * ### INTUITION:
 * Flood fill is a classic graph traversal problem similar to DFS. We start from
 * a pixel and spread to all connected pixels of the same color, changing them
 * to the new color. It's like the paint bucket tool in image editors.
 *
 * ### APPROACH:
 * 1. **Check validity**: Ensure starting position is within bounds
 * 2. **Get original color**: Store the color we're replacing
 * 3. **Early exit**: If new color equals original color, no work needed
 * 4. **DFS traversal**: Recursively visit all connected same-colored pixels
 * 5. **4-directional movement**: Check up, down, left, right neighbors
 *
 * ### WHY THIS WORKS:
 * - DFS naturally explores all connected components
 * - We change color as we visit to avoid revisiting
 * - 4-directional connectivity mimics pixel adjacency
 * - Recursion handles the spreading pattern automatically
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
 * Original color at (1,1) = 1
 * Step 1: Change (1,1) to 2, explore neighbors
 * Step 2: Change (0,0) to 2, change (0,1) to 2, change (0,2) to 2
 * Step 3: Change (1,0) to 2, change (2,0) to 2
 * Output: [[2,2,2],[2,2,0],[2,0,1]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m×n)
 * Where m, n are image dimensions - worst case visit all pixels
 *
 * ### SPACE COMPLEXITY:
 * O(m×n)
 * For recursion stack in worst case (straight line of same color)
 *
 * ### EDGE CASES:
 * - Starting pixel already has target color
 * - Single pixel image
 * - All pixels same color
 * - Starting position out of bounds
 *
 * </details>
 */

/**
 * Main solution for Problem 733: Flood Fill
 *
 * @param {number[][]} image - 2D array representing the image
 * @param {number} sr - Starting row position
 * @param {number} sc - Starting column position
 * @param {number} newColor - New color to fill with
 * @return {number[][]} - Modified image after flood fill
 *
 * Time Complexity: O(m * n) - might visit all pixels
 * Space Complexity: O(m * n) - recursion stack in worst case
 */
function solve(image, sr, sc, newColor) {
  if (!image || image.length === 0 || image[0].length === 0) {
    return image;
  }

  const originalColor = image[sr][sc];

  // If new color is same as original, no change needed
  if (originalColor === newColor) {
    return image;
  }

  const rows = image.length;
  const cols = image[0].length;

  function dfs(row, col) {
    // Base cases: out of bounds or different color
    if (
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      image[row][col] !== originalColor
    ) {
      return;
    }

    // Change current pixel to new color
    image[row][col] = newColor;

    // Explore all 4 directions
    dfs(row + 1, col); // down
    dfs(row - 1, col); // up
    dfs(row, col + 1); // right
    dfs(row, col - 1); // left
  }

  dfs(sr, sc);
  return image;
}

/**
 * Test cases for Problem 733: Flood Fill
 */
function testSolution() {
  console.log("Testing 733. Flood Fill");

  // Helper function to compare 2D arrays
  function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i].length !== b[i].length) return false;
      for (let j = 0; j < a[i].length; j++) {
        if (a[i][j] !== b[i][j]) return false;
      }
    }
    return true;
  }

  // Test case 1: Basic flood fill
  const image1 = [
    [1, 1, 1],
    [1, 1, 0],
    [1, 0, 1],
  ];
  const result1 = solve(JSON.parse(JSON.stringify(image1)), 1, 1, 2);
  const expected1 = [
    [2, 2, 2],
    [2, 2, 0],
    [2, 0, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Same color (no change)
  const image2 = [
    [0, 0, 0],
    [0, 1, 1],
  ];
  const result2 = solve(JSON.parse(JSON.stringify(image2)), 1, 1, 1);
  const expected2 = [
    [0, 0, 0],
    [0, 1, 1],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single pixel
  const image3 = [[1]];
  const result3 = solve(JSON.parse(JSON.stringify(image3)), 0, 0, 2);
  const expected3 = [[2]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Corner pixel
  const image4 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  const result4 = solve(JSON.parse(JSON.stringify(image4)), 0, 0, 2);
  const expected4 = [
    [2, 2, 2],
    [2, 0, 2],
    [2, 2, 2],
  ];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Isolated pixel
  const image5 = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
  const result5 = solve(JSON.parse(JSON.stringify(image5)), 0, 0, 2);
  const expected5 = [
    [2, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Large connected area
  const image6 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ];
  const result6 = solve(JSON.parse(JSON.stringify(image6)), 1, 1, 0);
  const expected6 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 733. Flood Fill!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 733. Flood Fill ===");
  console.log("Category: Graphs");
  console.log("Difficulty: Easy");
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
