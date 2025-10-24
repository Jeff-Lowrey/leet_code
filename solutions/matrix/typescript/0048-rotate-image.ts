/**
 * # Difficulty: Medium
 *
 * # 48. Rotate Image
 *
 * You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
 *
 * You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [[1,2,3],[4,5,6],[7,8,9]]</dd>
 * <dt>Output:</dt>
 * <dd>[[7,4,1],[8,5,2],[9,6,3]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Matrix rotated 90 degrees clockwise</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree, Matrix
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n²) - Nested iteration through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * To rotate a matrix 90° clockwise in-place, we can use two key insights:
 * 1. Transpose the matrix (swap rows and columns)
 * 2. Reverse each row
 *
 * Alternatively, we can directly manipulate elements in concentric rings.
 *
 * ### APPROACH:
 * **Method 1: Transpose + Reverse**
 * 1. **Transpose**: Convert matrix[i][j] to matrix[j][i]
 * 2. **Reverse rows**: Reverse each row to complete 90° rotation
 *
 * **Method 2: Ring-by-Ring Rotation**
 * 1. **Process rings**: Handle outer ring, then inner rings
 * 2. **Four-way swap**: Rotate 4 elements at once in each ring
 * 3. **Move inward**: Process successively inner rings
 *
 * ### WHY THIS WORKS:
 * - Transpose swaps coordinates: (i,j) → (j,i)
 * - Row reversal completes the 90° clockwise rotation
 * - Ring rotation directly places elements in final positions
 * - Both maintain O(1) space complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * Original:     Transpose:    Reverse Rows:
 * ```
 *
 * 1 2 3         1 4 7         7 4 1
 *
 * Steps:
 * Step 1: 4 5 6    →    2 5 8    →    8 5 2
 * Step 2: 7 8 9         3 6 9         9 6 3
 * Step 3: Result: 90° clockwise rotation

### TIME COMPLEXITY:
 * O(n²)
 * Must touch every element in the n×n matrix
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * In-place rotation without extra matrix
 *
 * ### EDGE CASES:
 * - 1×1 matrix: no rotation needed
 * - 2×2 matrix: swap diagonally opposite elements
 * - Odd vs even dimensions: affects number of rings
 *
 * </details>
 */

class Solution {
  rotate(matrix: number[][]): void {
    const n = matrix.length;

    // Transpose the matrix
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
      }
    }

    // Reverse each row
    for (let i = 0; i < n; i++) {
      matrix[i].reverse();
    }
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  solution.rotate(matrix1);
  console.log(
    `Test 1: ${
      JSON.stringify(matrix1) ===
      JSON.stringify([
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  const matrix2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ];
  solution.rotate(matrix2);
  console.log(
    `Test 2: ${
      JSON.stringify(matrix2) ===
      JSON.stringify([
        [15, 13, 2, 5],
        [14, 3, 4, 1],
        [12, 6, 8, 9],
        [16, 7, 10, 11],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
