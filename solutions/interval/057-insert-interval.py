"""
# Difficulty: Medium

You are given an array of `non-overlapping` intervals where intervals[i] = [starti, endi]
represent the start and the end of the ith interval and intervals is sorted in
ascending order by starti. You are also given an interval newInterval = [`start`, end].

Insert newInterval into intervals such that intervals is still sorted and `non-overlapping`.

Example:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>intervals = [[1,3],[6,9]], newInterval = [2,5]</dd>
<dt>Output:</dt>
<dd>[[1,5],[6,9]]</dd>
<dt>Explanation:</dt>
<dd>Insert [2,5] into [[1,2],[3,5],[6,7],[8,10]] results in [[1,5],[6,7],[8,10]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Since intervals are sorted and `non-overlapping`, we can process them in three phases:
1. Add intervals that come before newInterval
2. Merge overlapping intervals with newInterval
3. Add intervals that come after newInterval

### APPROACH:
1. **Before Phase**: Add all intervals that `end` before newInterval starts
2. **Merge Phase**: Merge all overlapping intervals with newInterval
3. **After Phase**: Add all remaining intervals

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
```
intervals = [[1,3],[6,9]], newInterval = [2,5]

Phase 1: [1,3] overlaps with [2,5] (`3 >= 2`)
Phase 2: Merge [1,3] and [2,5] → [1,5]
Phase 3: [6,9] doesn't overlap (`6 > 5`) → add `as-is`

Result: [[1,5],[6,9]]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(n) for result array

### EDGE CASES:
- **Empty intervals list**: Return [newInterval]
- **No overlap**: Insert in correct sorted position
- **Complete overlap**: Merge all overlapping intervals
- **New interval at start**: Add before all existing
- **New interval at end**: Add after all existing

</details>
"""


class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        """
        Approach: Linear scan with merge
        Time Complexity: O(n)
        Space Complexity: O(1) excluding output
        """
        result: list[Any] = []
        i = 0
        n = len(intervals)

        # Add all intervals that come before newInterval
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # Merge overlapping intervals
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1

        result.append(newInterval)

        # Add remaining intervals
        while i < n:
            result.append(intervals[i])
            i += 1

        return result


"""
435. Non-overlapping Intervals
# Difficulty: Medium
Given an array of intervals where intervals[i] = [starti, endi], return the
minimum number of intervals you need to remove to make the rest non-overlapping.

Example:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
"""


class SolutionRemove:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        """
        Approach: Greedy - Sort by end time
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        if not intervals:
            return 0

        # Sort by end time
        intervals.sort(key=lambda x: x[1])

        count = 0
        prev_end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                # Overlap found, remove current interval
                count += 1
            else:
                # No overlap, update prev_end
                prev_end = intervals[i][1]

        return count


"""
252. Meeting Rooms
# Difficulty: Easy
Given an array of meeting time intervals where intervals[i] = [starti, endi],
determine if a person could attend all meetings.

Example:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: false
"""


class SolutionMeetingRooms:
    def canAttendMeetings(self, intervals: list[list[int]]) -> bool:
        """
        Approach: Sort and check overlaps
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        intervals.sort()

        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                return False

        return True


"""
253. Meeting Rooms II
# Difficulty: Medium
Given an array of meeting time intervals where intervals[i] = [starti, endi],
return the minimum number of conference rooms required.

Example:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2
"""

import heapq
from typing import Any



class SolutionMeetingRoomsII:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        """
        Approach: Min heap for end times
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not intervals:
            return 0

        # Sort by start time
        intervals.sort()

        # Min heap to track end times
        rooms = [intervals[0][1]]

        for i in range(1, len(intervals)):
            # If current meeting starts after earliest ending
            if intervals[i][0] >= rooms[0]:
                heapq.heappop(rooms)

            # Add current meeting's end time
            heapq.heappush(rooms, intervals[i][1])

        return len(rooms)

    def minMeetingRoomsSweepLine(self, intervals: list[list[int]]) -> int:
        """
        Approach: Sweep line algorithm
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        events: list[Any] = []

        for start, end in intervals:
            events.append((start, 1))  # Start of meeting
            events.append((end, -1))  # End of meeting

        # Sort by time, if same time, process end before start
        events.sort(key=lambda x: (x[0], x[1]))

        max_rooms = 0
        current_rooms = 0

        for _, delta in events:
            current_rooms += delta
            max_rooms = max(max_rooms, current_rooms)

        return max_rooms


# Test cases
if __name__ == "__main__":
    # Test Insert Interval
    solution = Solution()

    print("Insert Interval:")
    test_cases = [([[1, 3], [6, 9]], [2, 5]), ([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]), ([], [5, 7])]

    for intervals, new_interval in test_cases:
        result = solution.insert(intervals, new_interval)
        print(f"Intervals: {intervals}")
        print(f"New: {new_interval}")
        print(f"Result: {result}\n")

    # Test Non-overlapping Intervals
    solution_remove = SolutionRemove()

    print("Non-overlapping Intervals:")
    remove_cases = [[[1, 2], [2, 3], [3, 4], [1, 3]], [[1, 2], [1, 2], [1, 2]], [[1, 2], [2, 3]]]

    for intervals in remove_cases:
        min_removals: int = solution_remove.eraseOverlapIntervals(intervals)
        print(f"Intervals: {intervals}")
        print(f"Min removals: {min_removals}\n")

    # Test Meeting Rooms
    solution_meeting = SolutionMeetingRooms()

    print("Meeting Rooms I:")
    meeting_cases = [[[0, 30], [5, 10], [15, 20]], [[7, 10], [2, 4]]]

    for intervals in meeting_cases:
        can_attend: bool = solution_meeting.canAttendMeetings(intervals)
        print(f"Intervals: {intervals}")
        print(f"Can attend all: {can_attend}\n")

    # Test Meeting Rooms II
    solution_meeting2 = SolutionMeetingRoomsII()

    print("Meeting Rooms II:")
    for intervals in meeting_cases:
        min_rooms: int = solution_meeting2.minMeetingRooms(intervals)
        print(f"Intervals: {intervals}")
        print(f"Min rooms needed: {min_rooms}\n")
