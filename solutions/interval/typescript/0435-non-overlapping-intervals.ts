/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that sort by end time (greedy). Keep track of previous interval's end. If current start >= previous end, intervals don't overlap. Otherwise, skip current interval (remove it). Count removals.
 *
 * ### APPROACH:
 * Data structures: Array** - uses array for storing and processing intervals
 * 1. **Sort by end time**: Sort intervals array by interval[1]
 * 2. **Initialize variables**: Set count = 0, prev_end = intervals[0][1]
 * 3. **Iterate from second**: For each interval in intervals array[1:]
 * 4. **Check overlap**: If current_start < prev_end using array, intervals overlap
 * 5. **Remove current**: Increment count
 * 6. **No overlap**: Update prev_end = current_end from array
 * 7. **Return count**: Return count as minimum intervals to remove
 *
 * ### WHY THIS WORKS:
 * - Sort by end time: greedy choice is interval finishing earliest
 * - Always pick interval with earliest end to leave room for more intervals
 * - Count overlaps: if start < last_end, remove current (increment count)
 * - Greedy works: earliest end maximizes remaining space for future intervals
 * - O(n log n) for sorting, O(1) space excluding input
 *
 *
 *
 * This solution uses hash table lookup for efficient implementation.
 *
 * This solution uses hash map storage for efficient implementation.
 *
 * This solution uses array traversal for efficient implementation.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:** intervals = [[1,2],[2,3],[3,4],[1,3]]
 *
 * Step 1:** Sort intervals by end time for intervals=[[1,2],[2,3],[3,4],[1,3]]
 * - Original: [[1,2],[2,3],[3,4],[1,3]]
 * - Sorted: [[1,2],[2,3],[1,3],[3,4]]
 *
 * Step 2:** Select first interval [1,2]
 * - nonOverlapping = 1, currentEnd = 2
 *
 * Step 3:** Check [2,3]
 * - Start 2 >= currentEnd 2? Yes, no overlap
 * - Select it: nonOverlapping = 2, currentEnd = 3
 *
 * Step 4:** Check [1,3]
 * - Start 1 >= currentEnd 3? No, overlaps
 * - Skip it (will be removed)
 *
 * Step 5:** Check [3,4]
 * - Start 3 >= currentEnd 3? Yes, no overlap
 * - Select it: nonOverlapping = 3, currentEnd = 4
 *
 * Step 6:** Update prev_end when no overlap
 * - After processing all intervals
 * - Final state: kept intervals [[1,2],[2,3],[3,4]]
 * - Removed intervals: [[1,3]]
 *
 * Step 7:** Return count
 * - Total intervals: 4
 * - Non-overlapping kept: 3
 * - Return count = 4 - 3 = 1 as minimum intervals to remove
 *
 * Output:
 * ```
 * 1
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
