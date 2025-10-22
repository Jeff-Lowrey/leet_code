/**
 * # Difficulty: Medium
 *
 * # 498. Diagonal Traverse
 *
 * Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.
 *
 * Example 1:
 * Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,4,7,5,3,6,8,9]
 *
 * Example 2:
 * Input: mat = [[1,2],[3,4]]
 * Output: [1,2,3,4]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Diagonal traversal of [[1,2,3],[4,5,6],[7,8,9]] is [1,2,4,7,5,3,6,8,9]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Graph
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Elements on the same diagonal have the same sum of row + column indices.
 * Traverse diagonals alternately upward and downward, handling direction changes
 * and boundaries carefully.
 *
 * ### APPROACH:
 * 1. **Diagonal Identification**: Elements at (i, j) where i + j = k are on the same diagonal
 * 2. **Direction Alternation**: Even-indexed diagonals go up-right, odd-indexed go down-left
 * 3. **Boundary Handling**: When hitting edges, change to next diagonal with proper direction
 * 4. **Movement Pattern**:
 *    - Going up: row--, col++
 *    - Going down: row++, col--
 *    - Hit boundary: adjust position and flip direction
 *
 * **Key Observations**:
 * - Total diagonals = m + n - 1
 * - Diagonal d contains elements where i + j = d
 * - Direction alternates: up (d even), down (d odd)
 *
 * ### WHY THIS WORKS:
 * - Using row + col sum groups elements into diagonals naturally
 * - Alternating directions matches the required zigzag pattern
 * - Boundary checks ensure we stay within matrix bounds
 * - Direction flipping at boundaries creates the diagonal traversal pattern
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * mat = [[1,2,3],
 *        [4,5,6],
 *        [7,8,9]]
 *
 * Diagonal 0 (sum=0): [1] → up direction
 * Diagonal 1 (sum=1): [2,4] → down direction
 * Diagonal 2 (sum=2): [7,5,3] → up direction
 * Diagonal 3 (sum=3): [6,8] → down direction
 * Diagonal 4 (sum=4): [9] → up direction
 *
 * Result: [1,2,4,7,5,3,6,8,9]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Visit each element exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only use constant extra space (not counting output array)
 *
 * ### EDGE CASES:
 * - Single element: [[1]] → [1]
 * - Single row: [[1,2,3]] → [1,2,3]
 * - Single column: [[1],[2],[3]] → [1,2,3]
 * - Non-square matrices: Different row and column counts
 *
 * </details>
 */

class Solution {
  findDiagonalOrder(mat: number[][]): number[] {
    if (!mat || !mat[0]) {
      return [];
    }

    const m = mat.length;
    const n = mat[0].length;
    const result: number[] = [];
    let row = 0;
    let col = 0;
    let direction = 1; // 1 for up-right, -1 for down-left

    for (let i = 0; i < m * n; i++) {
      result.push(mat[row][col]);

      if (direction === 1) {
        // Going up-right
        if (col === n - 1) {
          // Hit right edge
          row++;
          direction = -1;
        } else if (row === 0) {
          // Hit top edge
          col++;
          direction = -1;
        } else {
          // Normal up-right movement
          row--;
          col++;
        }
      } else {
        // Going down-left
        if (row === m - 1) {
          // Hit bottom edge
          col++;
          direction = 1;
        } else if (col === 0) {
          // Hit left edge
          row++;
          direction = 1;
        } else {
          // Normal down-left movement
          row++;
          col--;
        }
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.findDiagonalOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  console.log(
    `Test 1: ${
      JSON.stringify(result1) === JSON.stringify([1, 2, 4, 7, 5, 3, 6, 8, 9]) ? "PASS" : "FAIL"
    }`
  );

  const result2 = solution.findDiagonalOrder([
    [1, 2],
    [3, 4],
  ]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([1, 2, 3, 4]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
