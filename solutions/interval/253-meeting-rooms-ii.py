"""
# Difficulty: Medium

# 253. Meeting Rooms Ii

Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>intervals = [[0,30],[5,10],[15,20]]</dd>
<dt>Output:</dt>
<dd>2 (minimum meeting rooms needed)</dd>
<dt>Explanation:</dt>
<dd>Minimum 2 meeting rooms needed for [[0,30],[5,10],[15,20]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
Track meeting start and end times separately. Use min heap for end times. When a new meeting starts, remove all meetings that have already ended. Heap size is rooms needed at that moment. Return maximum heap size.

### APPROACH:
1. **Separate start and end times**: Create start_times and end_times arrays
2. **Sort both arrays**: Sort start_times and end_times independently
3. **Initialize pointers**: Set start_ptr = 0, end_ptr = 0, rooms = 0, max_rooms = 0
4. **Process all meetings**: While start_ptr < len(start_times)
5. **Meeting starts**: If start_times[start_ptr] < end_times[end_ptr], increment rooms and start_ptr
6. **Meeting ends**: Else decrement rooms and increment end_ptr
7. **Track maximum**: max_rooms = max(max_rooms, rooms)
8. **Return result**: Return max_rooms

### WHY THIS WORKS:
- Sort start times and end times separately as two arrays
- Two pointers: when meeting starts before earliest end, need new room
- When meeting starts after earliest end, reuse that room
- Track maximum rooms needed simultaneously
- O(n log n) for sorting, O(n) space for separate arrays

### EXAMPLE WALKTHROUGH:
```
Input: intervals = [[0,30],[5,10],[15,20]]
Step 1: Separate start and end times
  starts = [0,5,15]
  ends = [10,20,30]

Step 2: Use two pointers
  time=0: start meeting, rooms=1
  time=5: start meeting, rooms=2
  time=10: end meeting, rooms=1
  time=15: start meeting, rooms=2
  time=20: end meeting, rooms=1
  time=30: end meeting, rooms=0

Output: 2 (minimum meeting rooms needed)
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

import heapq

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    """
    Solution class for the Meeting Rooms II problem.
    Determines the minimum number of meeting rooms required to hold all meetings.
    """

    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        """
        Calculates the minimum number of meeting rooms needed.

        Args:
            intervals: List of meetings where each meeting is [start_time, end_time]

        Returns:
            int: Minimum number of meeting rooms required

        Time Complexity: O(nlogn) where n is the number of meetings
        Space Complexity: O(n) for storing the heap
        """
        # Handle edge cases
        if not intervals:
            return 0
        if len(intervals) == 1:
            return 1

        # Sort meetings by start time
        intervals.sort(key=lambda x: x[0])

        # Initialize a min heap to track meeting end times
        rooms: list[Any] = []
        # Add first meeting's end time to heap
        heapq.heappush(rooms, intervals[0][1])

        # Process remaining meetings
        for i in range(1, len(intervals)):
            # If the earliest ending meeting ends before current meeting starts
            # we can reuse that room
            if rooms[0] <= intervals[i][0]:
                heapq.heappop(rooms)

            # Add current meeting's end time to heap
            heapq.heappush(rooms, intervals[i][1])

        # The size of heap represents minimum rooms needed
        return len(rooms)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.minMeetingRooms([[0, 30], [5, 10], [15, 20]])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: No overlaps
    result = solution.minMeetingRooms([[7, 10], [2, 4]])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All overlap
    result = solution.minMeetingRooms([[1, 5], [2, 6], [3, 7], [4, 8]])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty input
    result = solution.minMeetingRooms([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single meeting
    result = solution.minMeetingRooms([[10, 15]])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 253. Meeting Rooms Ii")
