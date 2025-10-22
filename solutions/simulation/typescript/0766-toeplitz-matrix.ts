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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space
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

class Solution {
  isToeplitzMatrix(matrix: number[][]): boolean {
    const m = matrix.length;
    const n = matrix[0].length;

    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (matrix[i][j] !== matrix[i + 1][j + 1]) {
          return false;
        }
      }
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.isToeplitzMatrix([
    [1, 2, 3, 4],
    [5, 1, 2, 3],
    [9, 5, 1, 2],
  ]);
  console.log(`Test 1: ${result1 === true ? "PASS" : "FAIL"}`);

  const result2 = solution.isToeplitzMatrix([
    [1, 2],
    [2, 2],
  ]);
  console.log(`Test 2: ${result2 === false ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
