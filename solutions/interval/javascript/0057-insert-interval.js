/**
 * # 0057. Insert Interval
 *
 * Difficulty: Easy
 *
 *
 * You are given an array of `non-overlapping` intervals where intervals[i] = [starti, endi]
 * represent the start and the end of the ith interval and intervals is sorted in
 * ascending order by starti. You are also given an interval newInterval = [`start`, end].
 *
 * Insert newInterval into intervals such that intervals is still sorted and `non-overlapping`.
 *
 * Example:
 * Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * Output: [[1,5],[6,9]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[1,3],[6,9]], newInterval = [2,5]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,5],[6,9]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Insert [2,5] into [[1,2],[3,5],[6,7],[8,10]] results in [[1,5],[6,7],[8,10]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Greedy Selection
 * **Data Structures**: Array, String
 * **Patterns**: Greedy Algorithm, Divide and Conquer
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) for result array

 *
 * ### INTUITION:
 * Since intervals are sorted and `non-overlapping`, we can process them in three phases:
 * 1. Add intervals that come before newInterval
 * 2. Merge overlapping intervals with newInterval
 * 3. Add intervals that come after newInterval
 *
 * ### APPROACH:
 * 1. **Before Phase**: Add all intervals that `end` before newInterval starts
 * 2. **Merge Phase**: Merge all overlapping intervals with newInterval
 * 3. **After Phase**: Add all remaining intervals
 *
 * ### WHY THIS WORKS:
 * The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * intervals = [[1,3],[6,9]], newInterval = [2,5]
 * ```
 *
 * Phase 1: [1,3] overlaps with [2,5] (`3 >= 2`)
 *
 * Steps:
 * Step 1: Phase 2: Merge [1,3] and [2,5] → [1,5]
 * Step 2: Phase 3: [6,9] doesn't overlap (`6 > 5`) → add `as-is`
 * Step 3: Result: [[1,5],[6,9]]
 * 
 * Output:
 * ```
 * [[1,5],[6,9]]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(n) for result array

 * ### EDGE CASES:
 * - **Empty intervals list**: Return [newInterval]
 * - **No overlap**: Insert in correct sorted position
 * - **Complete overlap**: Merge all overlapping intervals
 * - **New interval at start**: Add before all existing
 * - **New interval at end**: Add after all existing
 *
 * </details>
 */

/**
 * Main solution for Problem 057: Insert Interval
 *
 * @param {number[][]} intervals - Sorted non-overlapping intervals
 * @param {number[]} newInterval - New interval to insert
 * @return {number[][]} - Merged intervals after insertion
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for result array
 */
function solve(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Phase 1: Add all intervals that end before newInterval starts
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: Merge all overlapping intervals with newInterval
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Phase 3: Add all remaining intervals
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

/**
 * Test cases for Problem 057: Insert Interval
 */
function testSolution() {
  console.log("Testing 057. Insert Interval");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Insert with merge
  const result1 = solve(
    [
      [1, 3],
      [6, 9],
    ],
    [2, 5],
  );
  const expected1 = [
    [1, 5],
    [6, 9],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Insert without merge
  const result2 = solve(
    [
      [1, 2],
      [3, 5],
      [6, 7],
      [8, 10],
      [12, 16],
    ],
    [4, 8],
  );
  const expected2 = [
    [1, 2],
    [3, 10],
    [12, 16],
  ];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Insert at beginning
  const result3 = solve(
    [
      [3, 5],
      [6, 9],
    ],
    [1, 2],
  );
  const expected3 = [
    [1, 2],
    [3, 5],
    [6, 9],
  ];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: Insert at end
  const result4 = solve([[1, 5]], [6, 8]);
  const expected4 = [
    [1, 5],
    [6, 8],
  ];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Empty intervals
  const result5 = solve([], [5, 7]);
  const expected5 = [[5, 7]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Merge all intervals
  const result6 = solve([[1, 5]], [2, 3]);
  const expected6 = [[1, 5]];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 057. Insert Interval!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 057. Insert Interval ===");
  console.log("Category: Interval");
  console.log("Difficulty: Start");
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
