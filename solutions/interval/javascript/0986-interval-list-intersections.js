/**
 * # Difficulty: Medium
 *
 * # 0986. Interval List Intersections
 *
 * Difficulty: Medium
 *
 * You are given two lists of closed intervals, firstList and secondList, where firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. Each list of intervals is pairwise disjoint and in sorted order.
 *
 * Return the intersection of these two interval lists.
 *
 * A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.
 *
 * The intersection of two closed intervals is a set of real numbers that are either empty or represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,2],[5,5],[8,10]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Intersection of [[0,2],[5,10],[13,23],[24,25]] and [[1,5],[8,12],[15,24],[25,26]] is [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Greedy Selection
 * **Data Structures**: Array, String
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

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
 * Input:
 * ```
 * firstList = [[0,2],[5,10]], secondList = [[1,5],[8,12]]
 * ```
 *
 * Step 1: Two pointers
 * i=0, j=0: [0,2] ∩ [1,5] = [1,2]
 * i=1, j=0: [5,10] ∩ [1,5] = [5,5]
 * i=1, j=1: [5,10] ∩ [8,12] = [8,10]
 *
 * Output:
 * ```
 * [[1,2],[5,5],[8,10]]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 986: Interval List Intersections
 *
 * @param {number[][]} firstList - First sorted list of intervals
 * @param {number[][]} secondList - Second sorted list of intervals
 * @return {number[][]} - List of interval intersections
 *
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function solve(firstList, secondList) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < firstList.length && j < secondList.length) {
    const [start1, end1] = firstList[i];
    const [start2, end2] = secondList[j];

    // Find intersection
    const intersectionStart = Math.max(start1, start2);
    const intersectionEnd = Math.min(end1, end2);

    // Check if there's a valid intersection
    if (intersectionStart <= intersectionEnd) {
      result.push([intersectionStart, intersectionEnd]);
    }

    // Move pointer of interval that ends first
    if (end1 < end2) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

/**
 * Test cases for Problem 986: Interval List Intersections
 */
function testSolution() {
  console.log("Testing 986. Interval List Intersections");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Basic functionality
  const result1 = solve(
    [
      [0, 2],
      [5, 10],
      [13, 23],
      [24, 25],
    ],
    [
      [1, 5],
      [8, 12],
      [15, 24],
      [25, 26],
    ],
  );
  const expected1 = [
    [1, 2],
    [5, 5],
    [8, 10],
    [15, 23],
    [24, 24],
    [25, 25],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: No intersections
  const result2 = solve(
    [
      [1, 3],
      [5, 9],
    ],
    [
      [4, 4],
      [10, 12],
    ],
  );
  const expected2 = [];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Complete overlap
  const result3 = solve([[1, 7]], [[3, 10]]);
  const expected3 = [[3, 7]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Empty lists
  const result4 = solve([], [[1, 5]]);
  const expected4 = [];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Touching intervals
  const result5 = solve(
    [
      [1, 3],
      [5, 7],
    ],
    [
      [2, 4],
      [6, 8],
    ],
  );
  const expected5 = [
    [2, 3],
    [6, 7],
  ];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: One interval contains the other
  const result6 = solve(
    [[1, 10]],
    [
      [2, 3],
      [4, 5],
      [6, 7],
    ],
  );
  const expected6 = [
    [2, 3],
    [4, 5],
    [6, 7],
  ];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 986. Interval List Intersections!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 986. Interval List Intersections ===");
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
