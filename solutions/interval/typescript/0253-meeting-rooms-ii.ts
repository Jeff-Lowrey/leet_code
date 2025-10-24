/**
 * # Difficulty: Medium
 *
 * # 253. Meeting Rooms Ii
 *
 * Difficulty: Medium
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
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Greedy Algorithm
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Track meeting start and end times separately. Use min heap for end times. When a new meeting starts, remove all meetings that have already ended. Heap size is rooms needed at that moment. Return maximum heap size.
 *
 * ### APPROACH:
 * 1. **Separate start and end times**: Create start_times and end_times arrays
 * 2. **Sort both arrays**: Sort start_times and end_times independently
 * 3. **Initialize pointers**: Set start_ptr = 0, end_ptr = 0, rooms = 0, max_rooms = 0
 * 4. **Process all meetings**: While start_ptr < len(start_times)
 * 5. **Meeting starts**: If start_times[start_ptr] < end_times[end_ptr], increment rooms and start_ptr
 * 6. **Meeting ends**: Else decrement rooms and increment end_ptr
 * 7. **Track maximum**: max_rooms = max(max_rooms, rooms)
 * 8. **Return result**: Return max_rooms
 *
 * ### WHY THIS WORKS:
 * - Sort start times and end times separately as two arrays
 * - Two pointers: when meeting starts before earliest end, need new room
 * - When meeting starts after earliest end, reuse that room
 * - Track maximum rooms needed simultaneously
 * - O(n log n) for sorting, O(n) space for separate arrays
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * intervals = [[0,30],[5,10],[15,20]]
 * ```
 *
 * Step 1: Separate start and end times
 * starts = [0,5,15]
 * ends = [10,20,30]
 * Step 2: Use two pointers
 * time=0: start meeting, rooms=1
 * time=5: start meeting, rooms=2
 * time=10: end meeting, rooms=1
 * time=15: start meeting, rooms=2
 * time=20: end meeting, rooms=1
 * time=30: end meeting, rooms=0
 *
 * Output:
 * ```
 * 2 (minimum meeting rooms needed)
 * ```

### TIME COMPLEXITY:
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

class MinHeap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  push(val: number): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): number | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] >= this.heap[parentIndex]) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let minIndex = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[minIndex]) {
        minIndex = leftChild;
      }
      if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[minIndex]) {
        minIndex = rightChild;
      }
      if (minIndex === index) break;

      [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
      index = minIndex;
    }
  }
}

class Solution {
  /**
   * Calculates the minimum number of meeting rooms needed.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  minMeetingRooms(intervals: number[][]): number {
    if (!intervals || intervals.length === 0) {
      return 0;
    }
    if (intervals.length === 1) {
      return 1;
    }

    // Sort meetings by start time
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize a min heap to track meeting end times
    const rooms = new MinHeap();
    rooms.push(intervals[0][1]);

    // Process remaining meetings
    for (let i = 1; i < intervals.length; i++) {
      // If the earliest ending meeting ends before current meeting starts
      // we can reuse that room
      if (rooms.peek()! <= intervals[i][0]) {
        rooms.pop();
      }

      // Add current meeting's end time to heap
      rooms.push(intervals[i][1]);
    }

    // The size of heap represents minimum rooms needed
    return rooms.size();
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(
    `Test 1: ${
      solution.minMeetingRooms([
        [0, 30],
        [5, 10],
        [15, 20],
      ]) === 2
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(
    `Test 2: ${
      solution.minMeetingRooms([
        [7, 10],
        [2, 4],
      ]) === 1
        ? "PASS"
        : "FAIL"
    }`
  );
  console.log(
    `Test 3: ${
      solution.minMeetingRooms([
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 8],
      ]) === 4
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
