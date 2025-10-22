/**
 * # Difficulty: Medium
 * 
 * # 240. Search a 2D Matrix II
 * 
 * Search for a target in an m x n matrix with sorted rows and columns.
 * 
 * Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties:
 * - Integers in each row are sorted in ascending from left to right.
 * - Integers in each column are sorted in ascending from top to bottom.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5</dd>
 * <dt>Output:</dt>
 * <dd>True</dd>
 * <dt>Explanation:</dt>
 * <dd>Target 5 is found in the 2D sorted matrix at position [1][1]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * 
 * ### METADATA:
 * **Techniques**: Binary Search Variant, Elimination Search
 * **Data Structures**: Matrix, 2D Array
 * **Patterns**: Search Space Reduction, Staircase Search
 * **Time Complexity**: O(m + n) - Worst case visit m+n cells
 * **Space Complexity**: O(1) - Only pointer variables
 * 
 * 
 * ### INTUITION:
 * Start from top-right corner (or bottom-left). The position acts as a pivot:
 * - Values to the left are smaller
 * - Values below are larger
 * 
 * This creates a staircase search pattern with O(m+n) complexity.
 * 
 * 
 * ### APPROACH:
 * 1. **Start at top-right**: Position (0, n-1)
 * 2. **Compare with target**:
 *    - If equal: found, return True
 *    - If greater: move left (eliminate column)
 *    - If smaller: move down (eliminate row)
 * 3. **Continue until**: Found or out of bounds
 * 
 * 
 * ### WHY THIS WORKS:
 * - Matrix rows and columns are sorted
 * - Top-right position allows binary-like elimination
 * - Each step eliminates either a row or column
 * - No need to search eliminated regions
 * 
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Matrix: [[1,4,7,11,15],
 *          [2,5,8,12,19],
 *          [3,6,9,16,22],
 *          [10,13,14,17,24],
 *          [18,21,23,26,30]]
 * Target: 5
 * 
 * Step 1: Start (0,4) = 15 > 5 → move left
 * Step 2: At (0,3) = 11 > 5 → move left
 * Step 3: At (0,2) = 7 > 5 → move left
 * Step 4: At (0,1) = 4 < 5 → move down
 * Step 5: At (1,1) = 5 = 5 → found!
 * 
 * Output: True
 * ```
 * 
 * 
 * ### TIME COMPLEXITY:
 * O(m + n) - Worst case visit m+n cells (traverse entire diagonal)
 * 
 * 
 * ### SPACE COMPLEXITY:
 * O(1) - Only uses constant space for row/column pointers
 * 
 * 
 * ### EDGE CASES:
 * - Empty matrix
 * - Single row or column
 * - Target not in matrix
 * - Target at corners
 * - Target smaller than all elements
 * - Target larger than all elements
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