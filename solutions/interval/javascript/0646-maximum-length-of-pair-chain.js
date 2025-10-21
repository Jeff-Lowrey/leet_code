/**
 * # Difficulty: Medium
 *
 * # 646. Maximum Length Of Pair Chain
 *
 * You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.
 *
 * A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.
 *
 * Return the length longest chain which can be formed.
 *
 * You do not need to use up all the given intervals. You can select pairs in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>pairs = [[1,2],[2,3],[3,4]]</dd>
 * <dt>Output:</dt>
 * <dd>2 (maximum chain length)</dd>
 * <dt>Explanation:</dt>
 * <dd>Longest chain of pairs [[1,2],[2,3],[3,4]] is 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Sorting
 * **Data Structures**: Array
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of interval concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply interval methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages interval principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: pairs = [[1,2],[2,3],[3,4]]
 * Step 1: Sort by second element
 *   sorted = [[1,2],[2,3],[3,4]]
 *
 * Step 2: Greedy selection
 *   Select [1,2], end=2
 *   [2,3]: 2 ≥ 2, skip
 *   [3,4]: 3 > 2, select it, length=2
 *
 * Output: 2 (maximum chain length)
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
 * Main solution for Problem 646: Maximum Length Of Pair Chain
 *
 * @param {number[][]} pairs - Array of pairs [a, b]
 * @return {number} - Maximum length of pair chain
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(pairs) {
  if (!pairs || pairs.length === 0) {
    return 0;
  }

  // Sort pairs by second element (end value)
  pairs.sort((a, b) => a[1] - b[1]);

  let chainLength = 1;
  let currentEnd = pairs[0][1];

  for (let i = 1; i < pairs.length; i++) {
    // If current pair's start is greater than previous end, extend chain
    if (pairs[i][0] > currentEnd) {
      chainLength++;
      currentEnd = pairs[i][1];
    }
  }

  return chainLength;
}

/**
 * Test cases for Problem 646: Maximum Length Of Pair Chain
 */
function testSolution() {
  console.log("Testing 646. Maximum Length Of Pair Chain");

  // Test case 1: Basic functionality
  const result1 = solve([
    [1, 2],
    [2, 3],
    [3, 4],
  ]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Longer chain
  const result2 = solve([
    [1, 2],
    [7, 8],
    [4, 5],
  ]);
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single pair
  const result3 = solve([[1, 2]]);
  const expected3 = 1;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: No chaining possible
  const result4 = solve([
    [1, 10],
    [2, 9],
    [3, 8],
  ]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: All can chain
  const result5 = solve([
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ]);
  const expected5 = 4;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Unsorted input
  const result6 = solve([
    [9, 10],
    [2, 3],
    [5, 6],
    [1, 2],
  ]);
  const expected6 = 4;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 646. Maximum Length Of Pair Chain!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 646. Maximum Length Of Pair Chain ===");
  console.log("Category: Interval");
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
 * - This solution focuses on interval concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
