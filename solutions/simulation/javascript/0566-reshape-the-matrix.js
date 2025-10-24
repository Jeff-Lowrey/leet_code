/**
 * # Difficulty: Easy
 *
 * # 0566. Reshape The Matrix
 *
 *
 * In MATLAB, there is a handy function called reshape which can reshape an m x n matrix
 * into a new one with a different size r x c keeping its original data.
 *
 * You are given an m x n matrix mat and two integers r and c representing the number of
 * rows and the number of columns of the wanted reshaped matrix.
 *
 * The reshaped matrix should be filled with all the elements of the original matrix in
 * the same row-traversing order as they were.
 *
 * If the reshape operation with given parameters is possible and legal, output the new
 * reshaped matrix; otherwise, output the original matrix.
 *
 * Example 1:
 * Input: mat = [[1,2],[3,4]], r = 1, c = 4
 * Output: [[1,2,3,4]]
 *
 * Example 2:
 * Input: mat = [[1,2],[3,4]], r = 2, c = 4
 * Output: [[1,2],[3,4]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Reshape [[1,2],[3,4]] from 2×2 to 1×4: [[1,2,3,4]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(r × c)

 *
 * ### INTUITION:
 * Reshape is only possible if the total number of elements remains the same.
 * Flatten the matrix conceptually, then redistribute elements into new dimensions.
 * Use division and modulo to convert between 1D and 2D indices.
 *
 * ### APPROACH:
 * 1. **Validation**: Check if m × n = r × c (same total elements)
 * 2. **If Invalid**: Return original matrix
 * 3. **If Valid**: Map elements using index conversion
 *    - 1D index: idx = i * n + j
 *    - 2D position in new matrix: row = idx // c, col = idx % c
 * 4. **Fill Result**: Place each element at its new position
 *
 * **Key Insight**: Index mapping
 * - Every element can be identified by a linear index (0 to total-1)
 * - This linear index maps to different 2D coordinates in different shapes
 *
 * ### WHY THIS WORKS:
 * - Row-major order is preserved when we use sequential indexing
 * - Division gives the row position in new matrix
 * - Modulo gives the column position in new matrix
 * - This naturally handles the reshape transformation
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * mat = [[1,2],[3,4]], r = 1, c = 4
 * ```
 *
 * Original shape: 2×2, New shape: 1×4
 * Total elements: 4 = 4 ✓ (valid)
 * Mapping to 1×4:
 *
 * Steps:
 * Step 1: Linear indices: [0,1,2,3] → [1,2,3,4]
 * Step 2: - idx 0: row = 0//4 = 0, col = 0%4 = 0 → result[0][0] = 1
 * Step 3: - idx 1: row = 1//4 = 0, col = 1%4 = 1 → result[0][1] = 2
 * Step 4: - idx 2: row = 2//4 = 0, col = 2%4 = 2 → result[0][2] = 3
 * Step 5: - idx 3: row = 3//4 = 0, col = 3%4 = 3 → result[0][3] = 4
 * Step 6: Result: [[1,2,3,4]]
 * 
 * Output:
 * ```
 * [[1,2,3,4]]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Must process each element once
 *
 * ### SPACE COMPLEXITY:
 * O(r × c)
 * - Need to store the reshaped matrix (same size as original)
 *
 * ### EDGE CASES:
 * - Invalid reshape (different total): Return original matrix
 * - Same shape: Return copy or original
 * - Single element: [[1]] can reshape to [[1]]
 * - Single row/column: Can reshape to column/row with same elements
 *
 * </details>
 */

/**
 * Main solution for Problem 566: Reshape The Matrix
 *
 * @param {number[][]} mat - Original m x n matrix
 * @param {number} r - Target number of rows
 * @param {number} c - Target number of columns
 * @return {number[][]} - Reshaped matrix or original if impossible
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(r × c)
 */
function solve(mat, r, c) {
  if (!mat || mat.length === 0 || mat[0].length === 0) {
    return mat;
  }

  const m = mat.length;
  const n = mat[0].length;

  // Check if reshape is possible
  if (m * n !== r * c) {
    return mat;
  }

  // Create new matrix
  const result = Array(r)
    .fill(0)
    .map(() => Array(c).fill(0));

  // Fill new matrix by reading original in row-major order
  for (let i = 0; i < m * n; i++) {
    // Map index to original matrix position
    const origRow = Math.floor(i / n);
    const origCol = i % n;

    // Map index to new matrix position
    const newRow = Math.floor(i / c);
    const newCol = i % c;

    result[newRow][newCol] = mat[origRow][origCol];
  }

  return result;
}

/**
 * Test cases for Problem 566: Reshape The Matrix
 */
function testSolution() {
  console.log("Testing 566. Reshape The Matrix");

  // Helper function to compare matrices
  const matricesEqual = (mat1, mat2) => {
    if (mat1.length !== mat2.length) return false;
    for (let i = 0; i < mat1.length; i++) {
      if (mat1[i].length !== mat2[i].length) return false;
      for (let j = 0; j < mat1[i].length; j++) {
        if (mat1[i][j] !== mat2[i][j]) return false;
      }
    }
    return true;
  };

  // Test case 1: 2x2 to 1x4
  const result1 = solve(
    [
      [1, 2],
      [3, 4],
    ],
    1,
    4,
  );
  const expected1 = [[1, 2, 3, 4]];
  console.assert(
    matricesEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: 2x2 to 4x1
  const result2 = solve(
    [
      [1, 2],
      [3, 4],
    ],
    4,
    1,
  );
  const expected2 = [[1], [2], [3], [4]];
  console.assert(
    matricesEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Impossible reshape (return original)
  const original3 = [
    [1, 2],
    [3, 4],
  ];
  const result3 = solve(original3, 2, 3);
  console.assert(
    matricesEqual(result3, original3),
    `Test 3 failed: should return original matrix`,
  );

  // Test case 4: Same dimensions
  const result4 = solve(
    [
      [1, 2],
      [3, 4],
    ],
    2,
    2,
  );
  const expected4 = [
    [1, 2],
    [3, 4],
  ];
  console.assert(
    matricesEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Single element
  const result5 = solve([[100]], 1, 1);
  const expected5 = [[100]];
  console.assert(
    matricesEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 566. Reshape The Matrix!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 566. Reshape The Matrix ===");
  console.log("Category: Simulation");
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
