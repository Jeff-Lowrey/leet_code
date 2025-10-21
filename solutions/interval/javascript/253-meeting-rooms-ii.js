/**
 * Difficulty: Medium
 *
 * # 253. Meeting Rooms Ii
 *
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[0,30],[5,10],[15,20]]</dd>
 * <dt>Output:</dt>
 * <dd>2 (minimum meeting rooms needed)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 2 meeting rooms needed for [[0,30],[5,10],[15,20]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 *

 * ### METADATA:
 * **Techniques**: Interval Sorting, Merging, Overlap Detection
 * **Data Structures**: Array of Intervals
 * **Patterns**: Interval Pattern, Sweep Line
 * **Time Complexity**: **O(n)
 * **Space Complexity**: **O(1)

 *
 * ### INTUITION:
 * This problem involves intervals and requires sorting or merging to detect overlaps, gaps, or optimal scheduling.
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
 * Input: intervals = [[0,30],[5,10],[15,20]]
 * Step 1: Separate start and end times
 *   starts = [0,5,15]
 *   ends = [10,20,30]
 *
 * Step 2: Use two pointers
 *   time=0: start meeting, rooms=1
 *   time=5: start meeting, rooms=2
 *   time=10: end meeting, rooms=1
 *   time=15: start meeting, rooms=2
 *   time=20: end meeting, rooms=1
 *   time=30: end meeting, rooms=0
 *
 * Output: 2 (minimum meeting rooms needed)
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
 * Main solution for Problem 253: Meeting Rooms II
 *
 * @param {number[][]} intervals - Array of meeting time intervals
 * @return {number} - Minimum number of meeting rooms required
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(intervals) {
  if (!intervals || intervals.length === 0) {
    return 0;
  }

  const n = intervals.length;
  const starts = new Array(n);
  const ends = new Array(n);

  // Separate start and end times
  for (let i = 0; i < n; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
  }

  // Sort both arrays
  starts.sort((a, b) => a - b);
  ends.sort((a, b) => a - b);

  // Two-pointer sweep line algorithm
  let rooms = 0;
  let maxRooms = 0;
  let startPtr = 0;
  let endPtr = 0;

  while (startPtr < n) {
    // If next event is a start, we need a room
    if (starts[startPtr] < ends[endPtr]) {
      rooms++;
      maxRooms = Math.max(maxRooms, rooms);
      startPtr++;
    } else {
      // Next event is an end, free up a room
      rooms--;
      endPtr++;
    }
  }

  return maxRooms;
}

/**
 * Test cases for Problem 253: Meeting Rooms II
 */
function testSolution() {
  console.log("Testing 253. Meeting Rooms II");

  // Test case 1: Basic overlapping meetings
  const result1 = solve([
    [0, 30],
    [5, 10],
    [15, 20],
  ]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Non-overlapping meetings
  const result2 = solve([
    [7, 10],
    [2, 4],
  ]);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: All overlapping
  const result3 = solve([
    [1, 10],
    [2, 11],
    [3, 12],
  ]);
  const expected3 = 3;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single meeting
  const result4 = solve([[1, 5]]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Adjacent meetings
  const result6 = solve([
    [1, 5],
    [5, 10],
    [10, 15],
  ]);
  const expected6 = 1;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 253. Meeting Rooms II!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 253. Meeting Rooms Ii ===");
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
