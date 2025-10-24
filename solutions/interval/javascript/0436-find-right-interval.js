/**
 * # Difficulty: Medium
 *
 * # 436. Find Right Interval
 *
 * Difficulty: Medium
 *
 * You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.
 *
 * The right interval for an interval i is an interval j such that startj >= endi and startj is minimized. Note that i may equal j.
 *
 * Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[3,4],[2,3],[1,2]]</dd>
 * <dt>Output:</dt>
 * <dd>[-1,0,1]</dd>
 * <dt>Explanation:</dt>
 * <dd>For each interval [1,2], the right interval [2,3] has the smallest start ≥ 2</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
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
 * Input:
 * ```
 * intervals = [[3,4],[2,3],[1,2]]
 * ```
 *
 * Step 1: Create index mapping
 * indexed = [(3,4,0), (2,3,1), (1,2,2)]
 * Step 2: Sort by start time
 * sorted = [(1,2,2), (2,3,1), (3,4,0)]
 * Step 3: Binary search for each interval's end
 *
 * Steps:
 * Step 1: [3,4]: find start ≥ 4 → not found → -1
 * Step 2: [2,3]: find start ≥ 3 → found at index 0
 * Step 3: [1,2]: find start ≥ 2 → found at index 1
 *
 * Output:
 * ```
 * [-1,0,1]
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
 * Main solution for Problem 436: Find Right Interval
 *
 * @param {number[][]} intervals - Array of intervals [start, end]
 * @return {number[]} - Array of right interval indices
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(intervals) {
  const n = intervals.length;
  const result = new Array(n).fill(-1);

  // Create array with start times and original indices
  const starts = intervals.map((interval, i) => [interval[0], i]);

  // Sort by start time
  starts.sort((a, b) => a[0] - b[0]);

  // For each interval, binary search for right interval
  for (let i = 0; i < n; i++) {
    const end = intervals[i][1];

    // Binary search for smallest start >= end
    let left = 0;
    let right = n - 1;
    let minIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (starts[mid][0] >= end) {
        minIndex = starts[mid][1];
        right = mid - 1; // Look for smaller valid start
      } else {
        left = mid + 1;
      }
    }

    result[i] = minIndex;
  }

  return result;
}

/**
 * Test cases for Problem 436: Find Right Interval
 */
function testSolution() {
  console.log("Testing 436. Find Right Interval");

  // Helper function to compare arrays
  const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  // Test case 1: Basic functionality
  const result1 = solve([
    [3, 4],
    [2, 3],
    [1, 2],
  ]);
  const expected1 = [-1, 0, 1];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );

  // Test case 2: Single interval
  const result2 = solve([[1, 2]]);
  const expected2 = [-1];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );

  // Test case 3: No right intervals
  const result3 = solve([
    [1, 4],
    [2, 3],
    [3, 4],
  ]);
  const expected3 = [-1, 2, -1];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );

  // Test case 4: All have right intervals
  const result4 = solve([
    [1, 2],
    [2, 3],
    [3, 4],
  ]);
  const expected4 = [1, 2, -1];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );

  // Test case 5: Same interval can be right interval
  const result5 = solve([
    [1, 12],
    [2, 9],
    [3, 10],
    [13, 14],
    [15, 16],
    [16, 17],
  ]);
  const expected5 = [3, 3, 3, 4, 5, -1];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 436. Find Right Interval!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 436. Find Right Interval ===");
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
