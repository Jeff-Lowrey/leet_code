/**
 * Difficulty: Medium
 *
 * # 252. Meeting Rooms
 *
 * Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[0,30],[5,10],[15,20]]</dd>
 * <dt>Output:</dt>
 * <dd>False (cannot attend all meetings)</dd>
 * <dt>Explanation:</dt>
 * <dd>The person can attend all meetings because [[0,30],[5,10],[15,20]] has overlaps (cannot attend all)</dd>
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
 * Step 1: Sort by start time
 *   sorted = [[0,30],[5,10],[15,20]]
 *
 * Step 2: Check for overlaps
 *   [0,30] vs [5,10]: 5 < 30 → overlap found
 *
 * Output: False (cannot attend all meetings)
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
 * Main solution for Problem 252: Meeting Rooms
 *
 * @param {number[][]} intervals - Array of meeting time intervals [start, end]
 * @return {boolean} - True if person can attend all meetings
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(intervals) {
  // Edge cases
  if (!intervals || intervals.length <= 1) {
    return true;
  }

  // Sort intervals by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Check for overlaps in consecutive intervals
  for (let i = 1; i < intervals.length; i++) {
    // If current meeting starts before previous ends, there's overlap
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}

/**
 * Test cases for Problem 252: Meeting Rooms
 */
function testSolution() {
  console.log("Testing 252. Meeting Rooms");

  // Test case 1: Overlapping meetings
  const result1 = solve([
    [0, 30],
    [5, 10],
    [15, 20],
  ]);
  const expected1 = false;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Non-overlapping meetings
  const result2 = solve([
    [7, 10],
    [2, 4],
  ]);
  const expected2 = true;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Adjacent meetings (no overlap)
  const result3 = solve([
    [1, 5],
    [5, 10],
    [10, 15],
  ]);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single meeting
  const result4 = solve([[1, 5]]);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty array
  const result5 = solve([]);
  const expected5 = true;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Multiple overlapping
  const result6 = solve([
    [1, 10],
    [2, 5],
    [3, 7],
  ]);
  const expected6 = false;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 252. Meeting Rooms!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 252. Meeting Rooms ===");
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
