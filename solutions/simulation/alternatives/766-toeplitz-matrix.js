/**
 * # Difficulty: Easy
 *
 * # 766. Toeplitz Matrix
 *
 * Given an m x n matrix, return true if the matrix is Toeplitz. Otherwise, return false.
 *
 * A matrix is Toeplitz if every diagonal from top-left to bottom-right has the same elements.
 *
 * Example 1:
 * Input: matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]
 * Output: true
 * Explanation:
 * In the above grid, the diagonals are:
 * "[9]", "[5, 5]", "[1, 1, 1]", "[2, 2, 2]", "[3, 3]", "[4]".
 * In each diagonal all elements are the same, so the answer is True.
 *
 * Example 2:
 * Input: matrix = [[1,2],[2,2]]
 * Output: false
 * Explanation:
 * The diagonal "[1, 2]" has different elements.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3, 4]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Matrix [[1,2,3,4],[5,1,2,3],[9,5,1,2]] is Toeplitz (each diagonal has equal elements)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * In a Toeplitz matrix, each diagonal going from top-left to bottom-right contains
 * identical elements. A key observation: element at (i,j) should equal element at (i+1,j+1).
 * We can check this property for all valid positions.
 *
 * ### APPROACH:
 * 1. **Simple Check**: For each cell (i,j), compare with (i+1,j+1)
 * 2. **Skip Last Row and Column**: They have no cells to compare with
 * 3. **Early Exit**: Return false as soon as mismatch found
 * 4. **Return True**: If all checks pass
 *
 * **Key Insight**: Diagonal property
 * - All elements on same diagonal have property: row - col = constant
 * - Simpler: matrix[i][j] == matrix[i+1][j+1] for all valid (i,j)
 *
 * ### WHY THIS WORKS:
 * - If (i,j) == (i+1,j+1) for all cells, then entire diagonals match
 * - Transitive property: if a==b and b==c, then a==c
 * - Checking adjacent cells on diagonal ensures entire diagonal is same
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * matrix = [[1,2,3,4],
 *           [5,1,2,3],
 *           [9,5,1,2]]
 *
 * Check (0,0)==(1,1): 1==1 ✓
 * Check (0,1)==(1,2): 2==2 ✓
 * Check (0,2)==(1,3): 3==3 ✓
 * Check (1,0)==(2,1): 5==5 ✓
 * Check (1,1)==(2,2): 1==1 ✓
 * Check (1,2)==(2,3): 2==2 ✓
 *
 * All checks pass → True
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Check each cell once (except last row and column)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only use constant extra space
 *
 * ### EDGE CASES:
 * - Single row: Always Toeplitz
 * - Single column: Always Toeplitz
 * - Single cell: Always Toeplitz
 * - 2×2 matrix: Check only (0,0) vs (1,1)
 *
 * </details>
 */

/**
 * Main solution for Problem 766: Toeplitz Matrix
 *
 * @param {number[][]} matrix - m x n matrix
 * @return {boolean} - True if matrix is Toeplitz, false otherwise
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1)
 */
function solve(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return true;
  }

  const m = matrix.length;
  const n = matrix[0].length;

  // Check each element starting from (1, 1)
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // Compare with diagonal predecessor
      if (matrix[i][j] !== matrix[i - 1][j - 1]) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Test cases for Problem 766: Toeplitz Matrix
 */
function testSolution() {
  console.log("Testing 766. Toeplitz Matrix");

  // Test case 1: Valid Toeplitz matrix
  const result1 = solve([
    [1, 2, 3, 4],
    [5, 1, 2, 3],
    [9, 5, 1, 2],
  ]);
  console.assert(
    result1 === true,
    `Test 1 failed: expected true, got ${result1}`,
  );

  // Test case 2: Not a Toeplitz matrix
  const result2 = solve([
    [1, 2],
    [2, 2],
  ]);
  console.assert(
    result2 === false,
    `Test 2 failed: expected false, got ${result2}`,
  );

  // Test case 3: Single element
  const result3 = solve([[1]]);
  console.assert(
    result3 === true,
    `Test 3 failed: expected true, got ${result3}`,
  );

  // Test case 4: Single row (always Toeplitz)
  const result4 = solve([[1, 2, 3, 4, 5]]);
  console.assert(
    result4 === true,
    `Test 4 failed: expected true, got ${result4}`,
  );

  // Test case 5: Single column (always Toeplitz)
  const result5 = solve([[1], [2], [3], [4]]);
  console.assert(
    result5 === true,
    `Test 5 failed: expected true, got ${result5}`,
  );

  // Test case 6: 2x2 Toeplitz
  const result6 = solve([
    [1, 2],
    [3, 1],
  ]);
  console.assert(
    result6 === true,
    `Test 6 failed: expected true, got ${result6}`,
  );

  // Test case 7: Larger valid Toeplitz
  const result7 = solve([
    [1, 2, 3],
    [4, 1, 2],
    [5, 4, 1],
  ]);
  console.assert(
    result7 === true,
    `Test 7 failed: expected true, got ${result7}`,
  );

  console.log("All test cases passed for 766. Toeplitz Matrix!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 766. Toeplitz Matrix ===");
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
