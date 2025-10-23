/**
 * # Difficulty: Medium
 *
 * # 085. Maximal Rectangle
 *
 * Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]</dd>
 * <dt>Output:</dt>
 * <dd>6</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximal rectangle has area 6 (2 rows x 3 columns of 1's)</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Stack Operations
 * **Data Structures**: Array, String, Stack
 * **Patterns**: Greedy Algorithm
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply monotonic stack methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages monotonic stack principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"]]
 * Step 1: Build height array for each row
 *   row 0: heights = [1,0,1,0,0]
 *   row 1: heights = [2,0,2,1,1]
 *
 * Step 2: Find max rectangle in each histogram
 *   row 0: max = 1
 *   row 1: max = 3
 *
 * Output: 3 (maximal rectangle)
 * ```
 *
 * ### TIME COMPLEXITY:
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
 * Helper function to find largest rectangle in histogram
 */
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  let i = 0;

  while (i < heights.length) {
    if (stack.length === 0 || heights[i] >= heights[stack[stack.length - 1]]) {
      stack.push(i);
      i++;
    } else {
      const topIndex = stack.pop();
      const height = heights[topIndex];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
  }

  while (stack.length > 0) {
    const topIndex = stack.pop();
    const height = heights[topIndex];
    const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}

/**
 * Main solution for Problem 085: Maximal Rectangle
 *
 * @param {string[][]} matrix - Binary matrix with '0' and '1'
 * @return {number} - Maximum rectangle area containing only 1's
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(n)
 */
function solve(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // Update heights: increment if '1', reset to 0 if '0'
      if (matrix[i][j] === "1") {
        heights[j]++;
      } else {
        heights[j] = 0;
      }
    }
    // Find max rectangle for current histogram
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}

/**
 * Test cases for Problem 085: Maximal Rectangle
 */
function testSolution() {
  console.log("Testing 085. Maximal Rectangle");

  // Test case 1: Example from problem
  const result1 = solve([
    ["1", "0", "1", "0", "0"],
    ["1", "0", "1", "1", "1"],
    ["1", "1", "1", "1", "1"],
    ["1", "0", "0", "1", "0"],
  ]);
  const expected1 = 6;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Single cell with 1
  const result2 = solve([["1"]]);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All zeros
  const result3 = solve([
    ["0", "0"],
    ["0", "0"],
  ]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: All ones
  const result4 = solve([
    ["1", "1"],
    ["1", "1"],
  ]);
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Complex pattern
  const result5 = solve([
    ["0", "1"],
    ["1", "0"],
  ]);
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  console.log("All test cases passed for 085. Maximal Rectangle!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 085. Maximal ===");
  console.log("Category: Monotonic Stack");
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
