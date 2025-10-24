"""
# Difficulty: Medium

# 759. Employee Free Time

We are given a list schedule of employees, which represents the working time for each employee.

Each employee has a list of non-overlapping Intervals, and these intervals are in sorted order.

Return the list of finite intervals representing common, positive-length free time for all employees, also in sorted order.

(Even though we are representing Intervals in the form [x, y], the objects inside are Intervals, not lists or arrays. For example, schedule[0][0].start = 1, schedule[0][0].end = 2, and schedule[0][0][0] is not defined). Also, we wouldn't include intervals like [5, 5] in our answer, as they have zero length.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]</dd>
<dt>Output:</dt>
<dd>[[3,4]] (common free time)</dd>
<dt>Explanation:</dt>
<dd>Free time when all employees are not busy: [[3,4]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Flatten all employee intervals into a list of (time, type) events. Sort by time. Use counter: increment for start, decrement for end. When counter > 0, time is covered. Build result intervals.

### APPROACH:
1. **Flatten all intervals**: Create list of (time, type) where type is +1 for start, -1 for end
2. **Sort by time**: Sort all events by time
3. **Track active intervals**: Maintain counter for active employees at each time
4. **Merge common times**: When counter == len(schedule), all employees free
5. **Build free intervals**: Collect continuous time ranges with counter == len(schedule)
6. **Return result**: Return list of common free time intervals

### WHY THIS WORKS:
- Treat each employee schedule as list of intervals, merge all together
- Flatten all intervals, sort by start time
- Merge consecutive overlapping intervals
- Free time = gaps between merged intervals
- O(n log n) where n is total intervals, O(n) space

### EXAMPLE WALKTHROUGH:
Input:
```
schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]
```

Step 1: Flatten all intervals
all_intervals = [1-2, 5-6, 1-3, 4-10]
Step 2: Find gaps between merged intervals
merged = [1-3, 4-10]
gap = [3-4]

Output:
```
[[3,4]] (common free time)
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

from typing import Any, List, Optional, Dict, Tuple


class Interval:
    """Represents a time interval with start and end times."""

    def __init__(self, start: Any, end: Any) -> None:
        self.start = start
        self.end = end

    def __eq__(self, other: Any) -> bool:
        return self.start == other.start and self.end == other.end

    def __repr__(self) -> str:
        return f"[{self.start},{self.end}]"


class Solution:
    def employeeFreeTime(self, schedule: List[List[Interval]]) -> List[Interval]:
        """
        Find the free time intervals common to all employees.

        Args:
            schedule: List of lists where each inner list contains Interval objects
                     representing an employee's busy periods

        Returns:
            List of Interval objects representing common free time periods
        """
        if not schedule:
            return []

        # Flatten all intervals into a single list
        all_intervals: list[Any] = []
        for employee_schedule in schedule:
            all_intervals.extend(employee_schedule)

        # Sort intervals by start time
        all_intervals.sort(key=lambda x: x.start)

        # Merge overlapping intervals
        merged: list[Any] = []
        for interval in all_intervals:
            # If this is the first interval or if there's no overlap
            if not merged or merged[-1].end < interval.start:
                merged.append(interval)
            else:
                # Merge overlapping intervals
                merged[-1].end = max(merged[-1].end, interval.end)

        # Find gaps between merged intervals
        result: list[Any] = []
        for i in range(1, len(merged)):
            # If there's a gap between current and previous interval
            if merged[i].start > merged[i - 1].end:
                # Add the gap as a free time interval
                result.append(Interval(merged[i - 1].end, merged[i].start))

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """

    # Note: This problem requires an Interval class definition
    # For testing purposes, we'll create a simple Interval class
    class Interval:
        def __init__(self: Any, start: Any, end: Any) -> None:
            self.start = start
            self.end = end

        def __eq__(self: Any, other: Any) -> Any:
            return self.start == other.start and self.end == other.end

        def __repr__(self: Any) -> Any:
            return f"[{self.start},{self.end}]"

    solution = Solution()

    # Test case 1: Example from problem
    schedule1 = [[Interval(1, 2), Interval(5, 6)], [Interval(1, 3)], [Interval(4, 10)]]
    result = solution.employeeFreeTime(schedule1)  # type: ignore
    expected = [Interval(3, 4)]
    assert len(result) == len(expected) and all(r == e for r, e in zip(result, expected)), (
        f"Expected {expected}, got {result}"
    )

    # Test case 2: No free time
    schedule2 = [[Interval(1, 3), Interval(4, 6)], [Interval(1, 6)]]
    result = solution.employeeFreeTime(schedule2)  # type: ignore
    expected: list[Any] = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Empty input
    result = solution.employeeFreeTime([])
    expected: list[Any] = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 759. Employee")
