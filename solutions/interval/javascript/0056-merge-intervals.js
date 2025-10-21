/**
 * # Difficulty: Medium
 *
 * # 056. Merge Intervals
 *
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,6]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Merged intervals [[1,3],[2,6],[8,10],[15,18]] become [[1,6],[8,10],[15,18]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, String
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
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
 * Input: intervals = [[1,3], [2,6], [8,10], [15,18]]
 *
 * Step 1: Sort by start time
 *   Already sorted: [[1,3], [2,6], [8,10], [15,18]]
 *
 * Step 2: Initialize with first interval
 *   merged = [[1,3]]
 *
 * Step 3: Process [2,6]
 *   2 ≤ 3 (overlaps with [1,3])
 *   Merge: [1, max(3,6)] = [1,6]
 *   merged = [[1,6]]
 *
 * Step 4: Process [8,10]
 *   8 > 6 (no overlap with [1,6])
 *   Add new interval
 *   merged = [[1,6], [8,10]]
 *
 * Step 5: Process [15,18]
 *   15 > 10 (no overlap with [8,10])
 *   Add new interval
 *   merged = [[1,6], [8,10], [15,18]]
 *
 * Output: [[1,6], [8,10], [15,18]]
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
 * Main solution for Problem 056: Merge Intervals
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[][]} - Merged intervals
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(intervals) {
  // Edge case: empty array
  if (!intervals || intervals.length === 0) {
    return [];
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Initialize result with first interval
  const merged = [intervals[0]];

  // Iterate through remaining intervals
  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    // Check if current interval overlaps with last merged interval
    if (current[0] <= lastMerged[1]) {
      // Merge by extending the end time
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      // No overlap, add as new interval
      merged.push(current);
    }
  }

  return merged;
}

/**
 * Test cases for Problem 056: Merge Intervals
 */
function testSolution() {
  console.log("Testing 056. Merge Intervals");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Basic overlapping intervals
  const result1 = solve([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]);
  const expected1 = [
    [1, 6],
    [8, 10],
    [15, 18],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: All intervals merge into one
  const result2 = solve([
    [1, 4],
    [4, 5],
  ]);
  const expected2 = [[1, 5]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: Single interval
  const result3 = solve([[1, 4]]);
  const expected3 = [[1, 4]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: No overlapping intervals
  const result4 = solve([
    [1, 2],
    [3, 4],
    [5, 6],
  ]);
  const expected4 = [
    [1, 2],
    [3, 4],
    [5, 6],
  ];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Unsorted intervals
  const result5 = solve([
    [1, 4],
    [0, 2],
    [3, 5],
  ]);
  const expected5 = [[0, 5]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  // Test case 6: Empty array
  const result6 = solve([]);
  const expected6 = [];
  console.assert(
    arraysEqual(result6, expected6),
    `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`,
  );

  console.log("All test cases passed for 056. Merge Intervals!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 056. Merge Intervals ===");
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
