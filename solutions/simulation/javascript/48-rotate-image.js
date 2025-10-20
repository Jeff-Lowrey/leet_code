/**
 *  Difficulty: Medium
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
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Matrix rotated 90° clockwise</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

 * ### METADATA:
 * **Techniques**: Direct Simulation, Step-by-step Execution
 * **Data Structures**: Array, Matrix
 * **Patterns**: Simulation Pattern, State Tracking
 * **Time Complexity**: **O(n²)
 * **Space Complexity**: **O(1)

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
 * ```
 * Original:     Transpose:    Reverse Rows:
 * 1 2 3         1 4 7         7 4 1
 * 4 5 6    →    2 5 8    →    8 5 2
 * 7 8 9         3 6 9         9 6 3
 *
 * Result: 90° clockwise rotation
 * ```
 *
 * ### TIME COMPLEXITY:
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

/**
 * Main solution for Problem 48: Rotate Image
 *
 * @param {number[][]} matrix - n x n 2D matrix
 * @return {void} - Modifies matrix in-place
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
function solve(matrix) {
  if (!matrix || matrix.length === 0) {
    return;
  }

  const n = matrix.length;

  // Step 1: Transpose the matrix (swap across diagonal)
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
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
 * Test cases for Problem 48: Rotate Image
 */
function testSolution() {
  console.log("Testing 48. Rotate Image");

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

  // Test case 1: 3x3 matrix
  const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  solve(matrix1);
  const expected1 = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ];
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
  solve(matrix2);
  const expected2 = [
    [15, 13, 2, 5],
    [14, 3, 4, 1],
    [12, 6, 8, 9],
    [16, 7, 10, 11],
  ];
  console.assert(
    matricesEqual(matrix2, expected2),
    "Test 2 failed: 4x4 rotation incorrect",
  );

  // Test case 3: 1x1 matrix (edge case)
  const matrix3 = [[1]];
  solve(matrix3);
  const expected3 = [[1]];
  console.assert(
    matricesEqual(matrix3, expected3),
    "Test 3 failed: 1x1 matrix should remain unchanged",
  );

  // Test case 4: 2x2 matrix
  const matrix4 = [
    [1, 2],
    [3, 4],
  ];
  solve(matrix4);
  const expected4 = [
    [3, 1],
    [4, 2],
  ];
  console.assert(
    matricesEqual(matrix4, expected4),
    "Test 4 failed: 2x2 rotation incorrect",
  );

  console.log("All test cases passed for 48. Rotate Image!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 48. Rotate Image ===");
  console.log("Category: Simulation");
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
