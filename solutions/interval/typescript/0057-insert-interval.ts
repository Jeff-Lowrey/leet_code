/**
 * ### METADATA:
 *
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
 * O(n)** - Single pass through intervals array to find insertion point and merge overlaps
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty intervals list**: Return [newInterval]
 * - **No overlap**: Insert in correct sorted position
 * - **Complete overlap**: Merge all overlapping intervals
 * - **New interval at start**: Add before all existing
 * - **New interval at end**: Add after all existing
 *
 * *
 */

class Solution {
  /**
   * Approach: Linear scan with merge
   *         Time Complexity: O(n)
   *         Space Complexity: O(1) excluding output
   */
  insert(intervals: number[][], newInterval: number[]): number[][] {
    // Implementation
    result: list.set(Any, []
    i = 0
    n = intervals.length
    while i < n and intervals.get(i)[1] < newInterval.get(0):
    result.append(intervals.get(i))
    i += 1
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Insert Interval
  solution = Solution()
  console.log("Insert Interval:")
  test_cases = [([[1, 3], [6, 9]], [2, 5]), ([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]), ([], [5, 7])]
  for intervals, new_interval in test_cases:
  result = solution.insert(intervals, new_interval)
  console.log(`Intervals: {intervals}`)
  console.log(`New: {new_interval}`)
  console.log(`Result: result\n`)
  # Test Non-overlapping Intervals
  solution_remove = SolutionRemove()
  console.log("Non-overlapping Intervals:")
  remove_cases = [[[1, 2], [2, 3], [3, 4], [1, 3]], [[1, 2], [1, 2], [1, 2]], [[1, 2], [2, 3]]]
  for intervals in remove_cases:
  min_removals: int = solution_remove.eraseOverlapIntervals(intervals)
  console.log(`Intervals: {intervals}`)
  console.log(`Min removals: {min_removals}\n`)
  # Test Meeting Rooms
  solution_meeting = SolutionMeetingRooms()
  console.log("Meeting Rooms I:")
  meeting_cases = [[[0, 30], [5, 10], [15, 20]], [[7, 10], [2, 4]]]
  for intervals in meeting_cases:
  can_attend: bool = solution_meeting.canAttendMeetings(intervals)
  console.log(`Intervals: {intervals}`)
  console.log(`Can attend all: {can_attend}\n`)
  # Test Meeting Rooms II
  solution_meeting2 = SolutionMeetingRoomsII()
  console.log("Meeting Rooms II:")
  for intervals in meeting_cases:
  min_rooms: int = solution_meeting2.minMeetingRooms(intervals)
  console.log(`Intervals: {intervals}`)
  console.log(`Min rooms needed: {min_rooms}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;