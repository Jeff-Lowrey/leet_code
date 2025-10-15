/**
 * # Difficulty:
 *
 * # 048. Rotate Image
 * **Transpose + Reverse**
 *
 * Rotate an n x n 2D matrix 90 degrees clockwise in-place.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Matrix rotated 90° clockwise</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Rotating 90 degrees clockwise can be achieved by two simple operations:
 * 1. Transpose the matrix (swap rows and columns)
 * 2. Reverse each row
 *
 * This avoids using extra space for a new matrix.
 *
 * ### APPROACH:
 * 1. **Transpose**: Convert matrix[i][j] to matrix[j][i] for all i, j
 * 2. **Reverse rows**: Reverse each row to complete the 90-degree rotation
 * 3. **In-place**: Both operations modify the matrix directly
 *
 * ### WHY THIS WORKS:
 * - Transpose flips the matrix along diagonal
 * - Reversing rows completes the 90-degree clockwise rotation
 * - Two simple operations replace complex rotation logic
 * - No additional space needed
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [[1,2,3],
 *         [4,5,6],
 *         [7,8,9]]
 *
 * Step 1 (Transpose): [[1,4,7],
 *                       [2,5,8],
 *                       [3,6,9]]
 *
 * Step 2 (Reverse rows): [[7,4,1],
 *                         [8,5,2],
 *                         [9,6,3]]
 *
 * Output: [[7,4,1],
 *          [8,5,2],
 *          [9,6,3]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n^2) where n is matrix dimension
 *
 * ### SPACE COMPLEXITY:
 * O(1) in-place modification
 *
 * ### EDGE CASES:
 * - 1x1 matrix (no change needed)
 * - 2x2 matrix (minimal case)
 * - Empty matrix (not per problem constraints)
 *
 * </details>
 */

/**
 * Main solution for Problem 048: Rotate Image
 *
 * @param {number[][]} matrix - n x n 2D matrix
 * @return {void} - Modifies matrix in-place
 *
 * Time Complexity: O(n^2) - visit each element once
 * Space Complexity: O(1) - in-place rotation
 */
function solve(matrix) {
  const n = matrix.length;

  // Step 1: Transpose the matrix (swap matrix[i][j] with matrix[j][i])
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Swap elements across the diagonal
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n - 1;
    while (left < right) {
      const temp = matrix[i][left];
      matrix[i][left] = matrix[i][right];
      matrix[i][right] = temp;
      left++;
      right--;
    }
  }
}

/**
 * Test cases for Problem 048: Rotate Image
 */
function testSolution() {
  console.log("Testing 048. Rotate Image");

  // Helper function to compare matrices
  function matricesEqual(mat1, mat2) {
    if (mat1.length !== mat2.length) return false;
    for (let i = 0; i < mat1.length; i++) {
      if (mat1[i].length !== mat2[i].length) return false;
      for (let j = 0; j < mat1[i].length; j++) {
        if (mat1[i][j] !== mat2[i][j]) return false;
      }
    }
    return true;
  }

  // Test case 1: 3x3 matrix
  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const expected1 = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ];
  solve(matrix1);
  console.assert(
    matricesEqual(matrix1, expected1),
    "Test 1 failed: 3x3 rotation incorrect",
  );

  // Test case 2: 4x4 matrix
  const matrix2 = [
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ];
  const expected2 = [
    [15, 13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7, 10, 11],
  ];
  solve(matrix2);
  console.assert(
    matricesEqual(matrix2, expected2),
    "Test 2 failed: 4x4 rotation incorrect",
  );

  // Test case 3: 1x1 matrix (edge case)
  const matrix3 = [[1]];
  const expected3 = [[1]];
  solve(matrix3);
  console.assert(
    matricesEqual(matrix3, expected3),
    "Test 3 failed: 1x1 rotation incorrect",
  );

  // Test case 4: 2x2 matrix
  const matrix4 = [
    [1, 2],
    [3, 4],
  ];
  const expected4 = [
    [3, 1],
    [4, 2],
  ];
  solve(matrix4);
  console.assert(
    matricesEqual(matrix4, expected4),
    "Test 4 failed: 2x2 rotation incorrect",
  );

  console.log("All test cases passed for 048. Rotate Image!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 048. Rotate Image ===");
  console.log("Category: Matrix");
  console.log("Difficulty: Transpose");
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
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
