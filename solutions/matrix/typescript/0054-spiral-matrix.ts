/**
 * # 54. Spiral Matrix
 *
 * Difficulty: Easy
 *
 * # Difficulty: Medium
 *
 * Given an m x `n` matrix, return all elements of the matrix in spiral order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [[1,2,3],[4,5,6],[7,8,9]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,3,6,9,8,7,4,5]</dd>
 * <dt>Explanation:</dt>
 * <dd>Spiral order traversal: [1,2,3,6,9,8,7,4,5]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Tree, Matrix
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) excluding output array - Constant extra space
 *
 * ### INTUITION:
 * Think of traversing the matrix in layers, like peeling an onion. We traverse the outermost layer first (right → down → left → up), then move to the next inner layer and repeat the pattern.
 *
 * ### APPROACH:
 * 1. Use four boundaries: top, bottom, left, right
 * 2. For each layer, traverse in spiral order:
 *    - Move right along top row, then increment top
 *    - Move down along right column, then decrement right
 *    - Move left along bottom row (if still valid), then decrement bottom
 *    - Move up along left column (if still valid), then increment left
 * 3. Continue until all boundaries converge
 *
 * ### WHY THIS WORKS:
 * By systematically shrinking the boundaries after each direction, we ensure we visit each element exactly once in spiral order. The boundary checks prevent revisiting elements or going out of bounds.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * ```
 *
 * Steps:
 * Step 1: Layer 1 - Right → traverse top row → [1,2,3]
 * Step 2: Layer 1 - Down → traverse right column → [1,2,3,6,9]
 * Step 3: Layer 1 - Left → traverse bottom row → [1,2,3,6,9,8,7]
 * Step 4: Layer 1 - Up → traverse left column → [1,2,3,6,9,8,7,4]
 * Step 5: Layer 2 - Center → single element → [1,2,3,6,9,8,7,4,5]
 *
 * Output:
 * ```
 * [1,2,3,6,9,8,7,4,5]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 *
 * ### SPACE COMPLEXITY:
 * O(1) excluding output array
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - **Empty matrix**: Return empty list
 * - **Single row**: Return that row
 * - **Single column**: Return that column
 * - **Single element**: Return [element]
 * - **Rectangle (m×n)**: Spiral inward from boundaries
 *
 * </details>
 */

class Solution {
  /**
   * Traverse matrix in spiral order.
   *
   * Time Complexity: O(m × n)
   * Space Complexity: O(1) excluding output
   */
  spiralOrder(matrix: number[][]): number[] {
    if (!matrix || !matrix[0]) {
      return [];
    }

    const m = matrix.length;
    const n = matrix[0].length;
    const result: number[] = [];

    let top = 0;
    let bottom = m - 1;
    let left = 0;
    let right = n - 1;

    while (top <= bottom && left <= right) {
      for (let col = left; col <= right; col++) {
        result.push(matrix[top][col]);
      }
      top++;

      for (let row = top; row <= bottom; row++) {
        result.push(matrix[row][right]);
      }
      right--;

      if (top <= bottom) {
        for (let col = right; col >= left; col--) {
          result.push(matrix[bottom][col]);
        }
        bottom--;
      }

      if (left <= right) {
        for (let row = bottom; row >= top; row--) {
          result.push(matrix[row][left]);
        }
        left++;
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

  const result1 = solution.spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  const expected1 = [1, 2, 3, 6, 9, 8, 7, 4, 5];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);

  const result2 = solution.spiralOrder([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]);
  const expected2 = [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
