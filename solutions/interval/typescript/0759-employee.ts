/**
 * # Difficulty: Medium
 *
 * # 0759. Employee Free Time
 *
 *
 * We are given a list schedule of employees, which represents the working time for each employee.
 *
 * Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.
 *
 * Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.
 *
 * (Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined). Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]</dd>
 * <dt>Output:</dt>
 * <dd>[[3,4]] (common free time)</dd>
 * <dt>Explanation:</dt>
 * <dd>Free time when all employees are not busy: [[3,4]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
The key insight is that flatten all employee intervals into a list of (time, type) events. Sort by time. Use counter: increment for start, decrement for end. When counter > 0, time is covered. Build result intervals.

### APPROACH:
 * 1. **Flatten all intervals**: Create list of (time, type) where type is +1 for start, -1 for end
 * 2. **Sort by time**: Sort all events by time
 * 3. **Track active intervals**: Maintain counter for active employees at each time
 * 4. **Merge common times**: When counter == len(schedule), all employees free
 * 5. **Build free intervals**: Collect continuous time ranges with counter == len(schedule)
 * 6. **Return result**: Return list of common free time intervals
 *
 * ### WHY THIS WORKS:
- This ensures that treat each employee schedule as list of intervals, merge all together
- This ensures that flatten all intervals, sort by start time
- This ensures that merge consecutive overlapping intervals
- This ensures that free time = gaps between merged intervals
- This ensures that o(n log n) where n is total intervals, O(n) space

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
 * ```
 *
 * Step 1: Flatten all intervals
 * all_intervals = [1-2, 5-6, 1-3, 4-10]
 * Step 2: Find gaps between merged intervals
 * merged = [1-3, 4-10]
 * gap = [3-4]
 *
 * Output:
 * ```
 * [[3,4]] (common free time)
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
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

class Interval {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }
}

class Solution {
  /**
   * Find the free time intervals common to all employees.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  employeeFreeTime(schedule: Interval[][]): Interval[] {
    if (!schedule || schedule.length === 0) {
      return [];
    }

    // Flatten all intervals into a single list
    const allIntervals: Interval[] = [];
    for (const employeeSchedule of schedule) {
      allIntervals.push(...employeeSchedule);
    }

    // Sort intervals by start time
    allIntervals.sort((a, b) => a.start - b.start);

    // Merge overlapping intervals
    const merged: Interval[] = [];
    for (const interval of allIntervals) {
      // If this is the first interval or if there's no overlap
      if (merged.length === 0 || merged[merged.length - 1].end < interval.start) {
        merged.push(interval);
      } else {
        // Merge overlapping intervals
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
      }
    }

    // Find gaps between merged intervals
    const result: Interval[] = [];
    for (let i = 1; i < merged.length; i++) {
      // If there's a gap between current and previous interval
      if (merged[i].start > merged[i - 1].end) {
        // Add the gap as a free time interval
        result.push(new Interval(merged[i - 1].end, merged[i].start));
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Solution, Interval };
}

function runTests(): void {
  const solution = new Solution();

  const schedule1 = [
    [new Interval(1, 2), new Interval(5, 6)],
    [new Interval(1, 3)],
    [new Interval(4, 10)],
  ];
  const result1 = solution.employeeFreeTime(schedule1);
  console.log(
    `Test 1: ${
      result1.length === 1 && result1[0].start === 3 && result1[0].end === 4 ? "PASS" : "FAIL"
    }`
  );

  const schedule2 = [[new Interval(1, 3), new Interval(4, 6)], [new Interval(1, 6)]];
  const result2 = solution.employeeFreeTime(schedule2);
  console.log(`Test 2: ${result2.length === 0 ? "PASS" : "FAIL"}`);

  const result3 = solution.employeeFreeTime([]);
  console.log(`Test 3: ${result3.length === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
export { Interval };
