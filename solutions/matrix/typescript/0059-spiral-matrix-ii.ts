/**
 * # Difficulty: Medium
 *
 * # 0059. Spiral Matrix II
 *
 * Difficulty: Easy
 *
 * Given a positive integer n, generate an n x n matrix filled with elements from 1 to n²
 * in spiral order.
 *
 * Example 1:
 * Input: n = 3
 * Output: [[1,2,3],[8,9,4],[7,6,5]]
 *
 * Example 2:
 * Input: n = 1
 * Output: [[1]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Spiral matrix filled 1 to n²</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree, Matrix
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n²) - Nested iteration through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Similar to Spiral Matrix I, but instead of reading, we're writing values in spiral order.
 * Use the same boundary-tracking technique, filling the matrix layer by layer from outside to inside.
 *
 * ### APPROACH:
 * 1. **Initialize**: Create n×n matrix, counter starting at 1
 * 2. **Maintain Boundaries**: top, bottom, left, right
 * 3. **Fill in Spiral Order**:
 *    - Right: Fill top row from left to right
 *    - Down: Fill right column from top to bottom
 *    - Left: Fill bottom row from right to left
 *    - Up: Fill left column from bottom to top
 * 4. **Shrink Boundaries**: After each direction, adjust boundary
 * 5. **Increment Counter**: Use sequential numbers 1 to n²
 *
 * **Key Pattern**: Same as Spiral Matrix I traversal, but filling instead of reading
 *
 * ### WHY THIS WORKS:
 * - Boundary tracking ensures we fill each cell exactly once
 * - Spiral pattern (right→down→left→up) creates the required order
 * - Sequential counter ensures values go from 1 to n²
 * - Shrinking boundaries naturally moves us inward
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3, total = 9
 * ```
 *
 * Initial: matrix = [[0,0,0],[0,0,0],[0,0,0]]
 * top=0, bottom=2, left=0, right=2, num=1
 * Step 1 - Right (top row): Fill [0,0] to [0,2]
 * [[1,2,3],[0,0,0],[0,0,0]], num=4, top=1
 * Step 2 - Down (right col): Fill [1,2] to [2,2]
 * [[1,2,3],[0,0,4],[0,0,5]], num=6, right=1
 * Step 3 - Left (bottom row): Fill [2,1] to [2,0]
 * [[1,2,3],[0,0,4],[7,6,5]], num=8, bottom=1
 * Step 4 - Up (left col): Fill [1,0]
 * [[1,2,3],[8,0,4],[7,6,5]], num=9, left=1
 * Step 5 - Right (center): Fill [1,1]
 * [[1,2,3],[8,9,4],[7,6,5]], done
 * Result: [[1,2,3],[8,9,4],[7,6,5]]

 * ### TIME COMPLEXITY:
 * O(n²)
 * - Nested iteration through input
 * - Fill each of n² cells once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * - Only use constant extra space (not counting output matrix)
 *
 * ### EDGE CASES:
 * - n = 1: Single element [[1]]
 * - n = 2: [[1,2],[4,3]]
 * - Even vs odd n: Different center handling
 *
 * </details>
 */

class Solution {
  generateMatrix(n: number): number[][] {
    const matrix: number[][] = Array(n)
      .fill(0)
      .map(() => Array(n).fill(0));

    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
      // Fill right along top row
      for (let col = left; col <= right; col++) {
        matrix[top][col] = num++;
      }
      top++;

      // Fill down along right column
      for (let row = top; row <= bottom; row++) {
        matrix[row][right] = num++;
      }
      right--;

      // Fill left along bottom row
      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          matrix[bottom][col] = num++;
        }
        bottom--;
      }

      // Fill up along left column
      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          matrix[row][left] = num++;
        }
        left++;
      }
    }

    return matrix;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.generateMatrix(3);
  console.log(
    `Test 1: ${
      JSON.stringify(result1) ===
      JSON.stringify([
        [1, 2, 3],
        [8, 9, 4],
        [7, 6, 5],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  const result2 = solution.generateMatrix(1);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[1]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
