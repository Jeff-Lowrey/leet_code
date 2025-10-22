/**
 * # Difficulty: Medium
 *
 * # 435. Non Overlapping Intervals
 *
 * Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[1,2],[2,3],[3,4],[1,3]]</dd>
 * <dt>Output:</dt>
 * <dd>1 (min intervals to remove)</dd>
 * <dt>Explanation:</dt>
 * <dd>Minimum 1 interval removed to make [[1,2],[2,3],[3,4],[1,3]] non-overlapping</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Sort by end time (greedy). Keep track of previous interval's end. If current start >= previous end, intervals don't overlap. Otherwise, skip current interval (remove it). Count removals.
 *
 * ### APPROACH:
 * 1. **Sort by end time**: Sort intervals by interval[1]
 * 2. **Initialize variables**: Set count = 0, prev_end = intervals[0][1]
 * 3. **Iterate from second**: For each interval in intervals[1:]
 * 4. **Check overlap**: If current_start < prev_end, intervals overlap
 * 5. **Remove current**: Increment count
 * 6. **No overlap**: Update prev_end = current_end
 * 7. **Return count**: Return count as minimum intervals to remove
 *
 * ### WHY THIS WORKS:
 * - Sort by end time: greedy choice is interval finishing earliest
 * - Always pick interval with earliest end to leave room for more intervals
 * - Count overlaps: if start < last_end, remove current (increment count)
 * - Greedy works: earliest end maximizes remaining space for future intervals
 * - O(n log n) for sorting, O(1) space excluding input
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
 * Step 1: Sort by end time
 *   sorted = [[1,2],[2,3],[1,3],[3,4]]
 *
 * Step 2: Greedy selection
 *   Select [1,2], end=2
 *   [2,3]: 2 ≥ 2, select it, end=3
 *   [1,3]: 1 < 3, overlaps → remove count=1
 *   [3,4]: 3 ≥ 3, select it
 *
 * Output: 1 (min intervals to remove)
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

class Solution {
  /**
   * Calculate the minimum number of intervals to remove.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  eraseOverlapIntervals(intervals: number[][]): number {
    if (!intervals || intervals.length === 0) {
      return 0;
    }

    // Sort intervals by end time
    intervals.sort((a, b) => a[1] - b[1]);

    let nonOverlapping = 1;
    let currentEnd = intervals[0][1];

    for (let i = 1; i < intervals.length; i++) {
      if (intervals[i][0] >= currentEnd) {
        nonOverlapping++;
        currentEnd = intervals[i][1];
      }
    }

    return intervals.length - nonOverlapping;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${
      solution.eraseOverlapIntervals([
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 3],
      ]) === 1
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(
    `Test 2: ${
      solution.eraseOverlapIntervals([
        [1, 2],
        [1, 2],
        [1, 2],
      ]) === 2
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(
    `Test 3: ${
      solution.eraseOverlapIntervals([
        [1, 2],
        [2, 3],
      ]) === 0
        ? "PASS"
        : "FAIL"
    }`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
