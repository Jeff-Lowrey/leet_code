/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that sort meetings by start time. Check consecutive meetings for overlap by comparing start of next meeting with end of current. If any overlap, return false.
 *
 * ### APPROACH:
 * 1. **Sort by start time**: Sort intervals by interval[0]
 * 2. **Check consecutive pairs**: For i in range(1, len(intervals))
 * 3. **Check overlap**: If intervals[i][0] < intervals[i-1][1], overlap exists
 * 4. **Return False**: Overlapping meetings cannot be attended
 * 5. **Continue checking**: Process all pairs
 * 6. **Return True**: If no overlaps found
 *
 * ### WHY THIS WORKS:
 * - Sort by start time, check consecutive intervals for overlap
 * - Overlap if current.start < previous.end
 * - Single overlap means person can't attend all meetings
 * - Sorting ensures we check all potential conflicts
 * - O(n log n) for sort, O(1) space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * intervals = [[0,30],[5,10],[15,20]]
 * ```
 *
 * Step 1: Sort by start time
 * sorted = [[0,30],[5,10],[15,20]]
 * Step 2: Check for overlaps
 *
 * Steps:
 * Step 1: [0,30] vs [5,10]: 5 < 30 → overlap found
 *
 * Output:
 * ```
 * False (cannot attend all meetings)
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
   * Determines if a person can attend all meetings.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  canAttendMeetings(intervals: number[][]): boolean {
    if (!intervals || intervals.length === 0) {
      return true;
    }

    // Sort intervals by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Check for overlaps
    for (let i = 1; i < intervals.length; i++) {
      // If current meeting starts before previous meeting ends
      if (intervals[i][0] < intervals[i - 1][1]) {
        return false;
      }
    }

    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${
      solution.canAttendMeetings([
        [0, 30],
        [5, 10],
        [15, 20],
      ]) === false
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(
    `Test 2: ${
      solution.canAttendMeetings([
        [7, 10],
        [2, 4],
      ]) === true
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(`Test 3: ${solution.canAttendMeetings([]) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
