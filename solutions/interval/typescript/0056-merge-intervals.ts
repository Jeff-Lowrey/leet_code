/**
 * # Difficulty: Medium
 *
 * # 0056. Merge Intervals
 *
 * Difficulty: Easy
 *
 * Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>intervals = [[1,3], [2,6], [8,10], [15,18]]</dd>
 * <dt>Output:</dt>
 * <dd>[[1,6], [8,10], [15,18]]</dd>
 * <dt>Explanation:</dt>
 * <dd>Merged intervals [[1,3],[2,6],[8,10],[15,18]] become [[1,6],[8,10],[15,18]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Sort intervals by start time. Iterate through sorted intervals. If current overlaps with last merged interval, extend the end. Otherwise add current interval as new merged interval.
 *
 * ### APPROACH:
 * 1. **Sort intervals**: Sort intervals by start time
 * 2. **Initialize result**: Set result = [intervals[0]]
 * 3. **Iterate from second**: For each interval in intervals[1:]
 * 4. **Check overlap**: If current_start <= result[-1][1], intervals overlap
 * 5. **Merge if overlap**: Update result[-1][1] = max(result[-1][1], current_end)
 * 6. **Add if no overlap**: Append current interval to result
 * 7. **Return result**: Return merged intervals
 *
 * ### WHY THIS WORKS:
 * - Sort intervals by start time enables linear merge
 * - If current.start <= last.end: overlapping, extend last.end to max
 * - Otherwise: non-overlapping, add to result and update last
 * - Sorting ensures we never miss overlaps
 * - O(n log n) for sort, O(n) space for result
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * intervals = [[1,3], [2,6], [8,10], [15,18]]
 * ```
 *
 * Step 1: Sort by start time
 * Already sorted: [[1,3], [2,6], [8,10], [15,18]]
 * Step 2: Initialize with first interval
 * merged = [[1,3]]
 * Step 3: Process [2,6]
 * 2 ≤ 3 (overlaps with [1,3])
 * Merge: [1, max(3,6)] = [1,6]
 * merged = [[1,6]]
 * Step 4: Process [8,10]
 * 8 > 6 (no overlap with [1,6])
 * Add new interval
 * merged = [[1,6], [8,10]]
 * Step 5: Process [15,18]
 * 15 > 10 (no overlap with [8,10])
 * Add new interval
 * merged = [[1,6], [8,10], [15,18]]
 *
 * Output:
 * ```
 * [[1,6], [8,10], [15,18]]
 * ```

 * ### TIME COMPLEXITY:

 * O(n)

 * - Single pass through the input
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

class Solution {
  /**
   * Merges overlapping intervals.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  merge(intervals: number[][]): number[][] {
    if (!intervals || intervals.length === 0) {
      return [];
    }
    if (intervals.length === 1) {
      return intervals;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize result with first interval
    const merged: number[][] = [intervals[0]];

    // Iterate through remaining intervals
    for (let i = 1; i < intervals.length; i++) {
      const current = intervals[i];
      const previous = merged[merged.length - 1];

      // If current interval overlaps with previous
      if (current[0] <= previous[1]) {
        // Update the end time of previous interval
        previous[1] = Math.max(previous[1], current[1]);
      } else {
        // No overlap, add current interval to result
        merged.push(current);
      }
    }

    return merged;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]);
  console.log(
    `Test 1: ${
      JSON.stringify(result1) ===
      JSON.stringify([
        [1, 6],
        [8, 10],
        [15, 18],
      ])
        ? "PASS"
        : "FAIL"
    }`
  );

  const result2 = solution.merge([
    [1, 4],
    [4, 5],
  ]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([[1, 5]]) ? "PASS" : "FAIL"}`);

  const result3 = solution.merge([]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
