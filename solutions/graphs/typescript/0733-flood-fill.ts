/**
 * # Difficulty: Easy
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Two Pointers, Stack Operations, Graph Traversal
 * **Data Structures**: Array, Stack, Tree
 * **Patterns**: Two Pointers Pattern, Graph Pattern
 * **Time Complexity**: O(m×n)
 * **Space Complexity**: O(m×n)
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

class Solution {
  /**
   * Perform flood fill using DFS.
   *
   * Time Complexity: O(m×n)
   * Space Complexity: O(m×n)
   */
  floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {
    if (!image || !image[0]) {
      return image;
    }

    const rows = image.length;
    const cols = image[0].length;

    if (sr < 0 || sr >= rows || sc < 0 || sc >= cols) {
      return image;
    }

    const originalColor = image[sr][sc];

    if (originalColor === color) {
      return image;
    }

    const dfs = (row: number, col: number): void => {
      if (row < 0 || row >= rows || col < 0 || col >= cols || image[row][col] !== originalColor) {
        return;
      }

      image[row][col] = color;

      dfs(row - 1, col);
      dfs(row + 1, col);
      dfs(row, col - 1);
      dfs(row, col + 1);
    };

    dfs(sr, sc);
    return image;
  }

  /**
   * Iterative version using stack.
   *
   * Time Complexity: O(m×n)
   * Space Complexity: O(m×n)
   */
  floodFillIterative(image: number[][], sr: number, sc: number, color: number): number[][] {
    if (!image || !image[0]) {
      return image;
    }

    const rows = image.length;
    const cols = image[0].length;

    if (sr < 0 || sr >= rows || sc < 0 || sc >= cols) {
      return image;
    }

    const originalColor = image[sr][sc];

    if (originalColor === color) {
      return image;
    }

    const stack: [number, number][] = [[sr, sc]];

    while (stack.length > 0) {
      const [row, col] = stack.pop()!;

      if (row < 0 || row >= rows || col < 0 || col >= cols || image[row][col] !== originalColor) {
        continue;
      }

      image[row][col] = color;

      stack.push([row - 1, col]);
      stack.push([row + 1, col]);
      stack.push([row, col - 1]);
      stack.push([row, col + 1]);
    }

    return image;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const image1 = [[1, 1, 1], [1, 1, 0], [1, 0, 1]];
  const result1 = solution.floodFill(image1, 1, 1, 2);
  const expected1 = [[2, 2, 2], [2, 2, 0], [2, 0, 1]];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const image2 = [[0, 0, 0], [0, 0, 0]];
  const result2 = solution.floodFill(image2, 0, 0, 0);
  const expected2 = [[0, 0, 0], [0, 0, 0]];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
