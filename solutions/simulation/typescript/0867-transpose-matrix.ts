/**
 * # Difficulty: Easy
 *
 * # 867. Transpose Matrix
 *
 * Given a 2D integer array matrix, return the transpose of matrix.
 *
 * The transpose of a matrix is the matrix flipped over its main diagonal, switching
 * the matrix's row and column indices.
 *
 * Example 1:
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[1,4,7],[2,5,8],[3,6,9]]
 *
 * Example 2:
 * Input: matrix = [[1,2,3],[4,5,6]]
 * Output: [[1,4],[2,5],[3,6]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Transpose of [[1,2,3],[4,5,6]] is [[1,4],[2,5],[3,6]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Map, Array, Matrix
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(m × n)
 *
 * ### INTUITION:
 * Transposing a matrix means converting rows to columns and vice versa.
 * Element at position (i,j) in original matrix moves to position (j,i) in transposed matrix.
 * For an m×n matrix, transpose is n×m.
 *
 * ### APPROACH:
 * 1. **Create Result Matrix**: Size n×m (swapped dimensions)
 * 2. **Map Elements**: result[j][i] = matrix[i][j]
 * 3. **Iterate**: Process all elements once
 *
 * **Key Pattern**: Row-column swap
 * - Original: m rows × n columns
 * - Transpose: n rows × m columns
 * - Position mapping: (i,j) → (j,i)
 *
 * ### WHY THIS WORKS:
 * - Transpose definition: swap rows and columns
 * - By definition: A^T[j][i] = A[i][j]
 * - Creating new matrix with swapped dimensions accommodates the transformation
 * - Each element lands in exactly one position
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [[1,2,3],
 * ```
 *
 * [4,5,6]]
 * Original: 2×3 (2 rows, 3 cols)
 * Element positions:
 *
 * Steps:
 * Step 1: (0,0):1 → (0,0):1
 * Step 2: (0,1):2 → (1,0):2
 * Step 3: (0,2):3 → (2,0):3
 * Step 4: (1,0):4 → (0,1):4
 * Step 5: (1,1):5 → (1,1):5
 * Step 6: (1,2):6 → (2,1):6
 * Step 7: Result: 3×2 (3 rows, 2 cols)
 * Step 8: [[1,4],
 * Step 9: [2,5],
 * Step 10: [3,6]]

### TIME COMPLEXITY:
 * O(m × n)
 * - Must visit every element once
 *
 * ### SPACE COMPLEXITY:
 * O(m × n)
 * - Need to create new matrix of same total size (different dimensions)
 *
 * ### EDGE CASES:
 * - Square matrix (n×n): Transpose is also n×n
 * - Single row: Becomes single column
 * - Single column: Becomes single row
 * - Single cell: Unchanged [[1]] → [[1]]
 *
 * </details>
 */

class Solution {
  transpose(matrix: number[][]): number[][] {
    const m = matrix.length;
    const n = matrix[0].length;

    const result: number[][] = Array(n)
      .fill(0)
      .map(() => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        result[j][i] = matrix[i][j];
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

  const result1 = solution.transpose([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  console.log(
    `Test 1: ${
      JSON.stringify(result1) ===
      JSON.stringify([
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  const result2 = solution.transpose([
    [1, 2, 3],
    [4, 5, 6],
  ]);
  console.log(
    `Test 2: ${
      JSON.stringify(result2) ===
      JSON.stringify([
        [1, 4],
        [2, 5],
        [3, 6],
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
