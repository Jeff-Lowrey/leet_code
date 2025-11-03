"""
### INTUITION:
The key insight is that flatten all employee intervals into a list of (time, type) events. Sort by time. Use counter: increment for start, decrement for end. When counter > 0, time is covered. Build result intervals.

### APPROACH:
1. **Flatten all intervals**: Create list of (time, type) where type is +1 for start, -1 for end
2. **Sort by time**: Sort all events by time
3. **Track active intervals**: Maintain counter for active employees at each time
4. **Merge common times**: When counter == len(schedule), all employees free
5. **Build free intervals**: Collect continuous time ranges with counter == len(schedule)
6. **Return result**: Return list of common free time intervals

### WHY THIS WORKS:
- This ensures that treat each employee schedule as list of intervals, merge all together
- This ensures that flatten all intervals, sort by start time
- This ensures that merge consecutive overlapping intervals
- This ensures that free time = gaps between merged intervals
- This ensures that o(n log n) where n is total intervals, O(n) space

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
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
        f"Expected expected, got result"
    )

    # Test case 2: No free time
    schedule2 = [[Interval(1, 3), Interval(4, 6)], [Interval(1, 6)]]
    result = solution.employeeFreeTime(schedule2)  # type: ignore
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Empty input
    result = solution.employeeFreeTime([])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 759. Employee")
