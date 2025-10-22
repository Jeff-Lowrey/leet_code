/**
 * # Difficulty: Medium
 * 
 * # 073. Set Matrix Zeroes
 * 
 * Given an m x n matrix, if an element is 0, set its entire row and column to 0 in-place.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 1, 1], [1, 0, 1], [1, 1, 1]]</dd>
 * <dt>Output:</dt>
 * <dd>[[1, 0, 1], [0, 0, 0], [1, 0, 1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Matrix with zeros: element at [1][1] is 0, so row 1 and column 1 become all zeros</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * 
 * ### METADATA:
 * **Techniques**: In-Place Modification, State Tracking
 * **Data Structures**: Matrix, Array
 * **Patterns**: Space Optimization, Two-Pass Algorithm
 * **Time Complexity**: O(m × n) - Two passes through matrix
 * **Space Complexity**: O(1) - Uses first row/column as markers
 * 
 * 
 * ### INTUITION:
 * Use the first row and first column as marker arrays to track which rows/columns should be zeroed.
 * Need separate flags for first row/column since they overlap at [0][0].
 * 
 * 
 * ### APPROACH:
 * 1. **Track first row/column**: Check if they initially contain zeros
 * 2. **Mark using first row/column**: Use matrix[i][0] and matrix[0][j] as markers
 * 3. **Zero based on markers**: Set cells to zero based on markers in first row/column
 * 4. **Handle first row/column**: Zero them separately if needed based on flags
 * 
 * 
 * ### WHY THIS WORKS:
 * - First row/column serve as marker arrays (no extra space needed)
 * - Original zero positions are preserved in markers
 * - In-place modification requires no extra O(m+n) space
 * - Process order prevents overwriting needed markers
 * 
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: [[1, 1, 1],
 *         [1, 0, 1],
 *         [1, 1, 1]]
 * 
 * Step 1: Check first row/col
 *   - firstRowHasZero = False
 *   - firstColHasZero = False
 * 
 * Step 2: Mark using first row/col
 *   - Found 0 at [1][1]
 *   - Set matrix[1][0] = 0 (mark row 1)
 *   - Set matrix[0][1] = 0 (mark column 1)
 * 
 * Step 3: Zero based on markers
 *   - matrix[1][1] = 0 (row 1 marked, col 1 marked)
 *   - matrix[0][1] = 0 (col 1 marked)
 *   - matrix[2][1] = 0 (col 1 marked)
 *   - matrix[1][0] = 0 (row 1 marked)
 *   - matrix[1][2] = 0 (row 1 marked)
 * 
 * Output: [[1, 0, 1],
 *          [0, 0, 0],
 *          [1, 0, 1]]
 * ```
 * 
 * 
 * ### TIME COMPLEXITY:
 * O(m × n) - Two passes through matrix
 * 
 * 
 * ### SPACE COMPLEXITY:
 * O(1) - Only uses two boolean flags for first row/column
 * 
 * 
 * ### EDGE CASES:
 * - First row/column contains zeros
 * - Single row or column matrix
 * - All zeros or no zeros
 * - 1×1 matrix
 * 
 * </details>
 */

class Solution {
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  demonstrate_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;