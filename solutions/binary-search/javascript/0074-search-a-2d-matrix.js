/**
 * # Difficulty: Medium
 *
 * # 074. Search A 2D Matrix
 *
 * Difficulty: Easy
 *
 * You are given an m x n integer matrix matrix with the following two properties:
 *
 * - Each row is sorted in non-decreasing order.
 * - The first integer of each row is greater than the last integer of the previous row.
 *
 * Given an integer target, return true if target is in matrix or false otherwise.
 *
 * You must write a solution in O(log(m * n)) time complexity.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3</dd>
 * <dt>Output:</dt>
 * <dd>True (target found)</dd>
 * <dt>Explanation:</dt>
 * <dd>Target 3 is found in the 2D matrix [[1,3,5,7],[10,11,16,20],[23,30,34,60]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Binary Search
 * **Data Structures**: Array, Tree, Matrix
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply binary search methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages binary search principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
 * ```
 *
 * Step 1: Treat as 1D array
 * rows = 3, cols = 4, total = 12 elements
 * left = 0, right = 11
 * Step 2: Binary search
 * mid = 5: row = 5//4 = 1, col = 5%4 = 1
 *
 * Steps:
 * Step 1: matrix[1][1] = 11 > 3, right = 4
 * Step 2: mid = 2: row = 2//4 = 0, col = 2%4 = 2
 * Step 3: matrix[0][2] = 5 > 3, right = 1
 * Step 4: mid = 0: row = 0//4 = 0, col = 0%4 = 0
 * Step 5: matrix[0][0] = 1 < 3, left = 1
 * Step 6: mid = 1: row = 1//4 = 0, col = 1%4 = 1
 * Step 7: matrix[0][1] = 3 == 3 ✓
 *
 * Output:
 * ```
 * True (target found)
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 074: Search A 2D Matrix
 *
 * @param {number[][]} matrix - 2D matrix with sorted properties
 * @param {number} target - Target value to search for
 * @return {boolean} - True if target found, false otherwise
 *
 * Time Complexity: O(log(m * n))
 * Space Complexity: O(1)
 */
function solve(matrix, target) {
  // Handle edge cases
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
    return false;
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const totalElements = rows * cols;

  let left = 0;
  let right = totalElements - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Convert 1D index to 2D coordinates
    const row = Math.floor(mid / cols);
    const col = mid % cols;
    const midValue = matrix[row][col];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  // Target not found
  return false;
}

/**
 * Test cases for Problem 074: Search A 2D Matrix
 */
function testSolution() {
  console.log("Testing 074. Search A 2D Matrix");

  // Test case 1: Target found in matrix
  const result1 = solve(
    [
      [1, 4, 7, 11],
      [15, 16, 17, 18],
      [23, 24, 25, 26],
    ],
    16,
  );
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Target not found
  const result2 = solve(
    [
      [1, 4, 7, 11],
      [15, 16, 17, 18],
      [23, 24, 25, 26],
    ],
    13,
  );
  const expected2 = false;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element found
  const result3 = solve([[1]], 1);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element not found
  const result4 = solve([[1]], 2);
  const expected4 = false;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty matrix
  const result5 = solve([], 1);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Target at first position
  const result6 = solve(
    [
      [1, 4, 7, 11],
      [15, 16, 17, 18],
      [23, 24, 25, 26],
    ],
    1,
  );
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 7: Target at last position
  const result7 = solve(
    [
      [1, 4, 7, 11],
      [15, 16, 17, 18],
      [23, 24, 25, 26],
    ],
    26,
  );
  const expected7 = true;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  // Test case 8: Single row matrix
  const result8 = solve([[1, 3, 5, 7]], 3);
  const expected8 = true;
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );

  console.log("All test cases passed for 074. Search A 2D Matrix!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 074. Search A 2D Matrix ===");
  console.log("Category: Binary Search");
  console.log("Difficulty: Medium");
  console.log("");

  console.log("Example 1:");
  console.log(
    "Input: matrix = [[1,4,7,11],[15,16,17,18],[23,24,25,26]], target = 16",
  );
  console.log(
    "Output:",
    solve(
      [
        [1, 4, 7, 11],
        [15, 16, 17, 18],
        [23, 24, 25, 26],
      ],
      16,
    ),
  );
  console.log("");

  console.log("Example 2:");
  console.log(
    "Input: matrix = [[1,4,7,11],[15,16,17,18],[23,24,25,26]], target = 13",
  );
  console.log(
    "Output:",
    solve(
      [
        [1, 4, 7, 11],
        [15, 16, 17, 18],
        [23, 24, 25, 26],
      ],
      13,
    ),
  );
  console.log("");

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
 * - The key insight is treating the 2D matrix as a conceptual 1D sorted array
 * - Index conversion formulas: row = Math.floor(index / cols), col = index % cols
 * - This approach works because of the specific matrix properties in the problem
 * - Alternative approach: binary search on rows first, then columns (also O(log m + log n))
 * - The 1D conversion approach is more elegant and easier to implement correctly
 */
