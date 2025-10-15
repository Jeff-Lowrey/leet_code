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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
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

/**
 * Main solution for Problem 498: Diagonal Traverse
 *
 * @param {number[][]} mat - m x n matrix
 * @return {number[]} - Elements in diagonal order
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1) excluding output
 */
function solve(mat) {
  if (!mat || mat.length === 0 || mat[0].length === 0) {
    return [];
  }

  const m = mat.length;
  const n = mat[0].length;
  const result = [];
  let row = 0,
    col = 0;
  let goingUp = true;

  for (let i = 0; i < m * n; i++) {
    result.push(mat[row][col]);

    if (goingUp) {
      // Moving up-right
      if (row === 0 && col < n - 1) {
        // Hit top boundary, move right and change direction
        col++;
        goingUp = false;
      } else if (col === n - 1) {
        // Hit right boundary, move down and change direction
        row++;
        goingUp = false;
      } else {
        // Continue up-right
        row--;
        col++;
      }
    } else {
      // Moving down-left
      if (col === 0 && row < m - 1) {
        // Hit left boundary, move down and change direction
        row++;
        goingUp = true;
      } else if (row === m - 1) {
        // Hit bottom boundary, move right and change direction
        col++;
        goingUp = true;
      } else {
        // Continue down-left
        row++;
        col--;
      }
    }
  }

  return result;
}

/**
 * Test cases for Problem 498: Diagonal Traverse
 */
function testSolution() {
  console.log("Testing 498. Diagonal Traverse");

  // Helper function to compare arrays
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, idx) => val === arr2[idx]);
  };

  // Test case 1: 3x3 matrix
  const result1 = solve([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  const expected1 = [1, 2, 4, 7, 5, 3, 6, 8, 9];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: 3x4 matrix
  const result2 = solve([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ]);
  const expected2 = [1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single row
  const result3 = solve([[1, 2, 3]]);
  const expected3 = [1, 2, 3];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single column
  const result4 = solve([[1], [2], [3]]);
  const expected4 = [1, 2, 3];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Single element
  const result5 = solve([[5]]);
  const expected5 = [5];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 498. Diagonal Traverse!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 498. Diagonal Traverse ===");
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
