"""
### INTUITION:
The key insight is that sort meetings by start time. Check consecutive meetings for overlap by comparing start of next meeting with end of current. If any overlap, return false.

### APPROACH:
1. **Sort by start time**: Sort intervals by interval[0]
2. **Check consecutive pairs**: For i in range(1, len(intervals))
3. **Check overlap**: If intervals[i][0] < intervals[i-1][1], overlap exists
4. **Return False**: Overlapping meetings cannot be attended
5. **Continue checking**: Process all pairs
6. **Return True**: If no overlaps found

### WHY THIS WORKS:
- Sort by start time, check consecutive intervals for overlap
- Overlap if current.start < previous.end
- Single overlap means person can't attend all meetings
- Sorting ensures we check all potential conflicts
- O(n log n) for sort, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
intervals = [[0,30],[5,10],[15,20]]
```

Step 1: Sort by start time
sorted = [[0,30],[5,10],[15,20]]
Step 2: Check for overlaps

Steps:
Step 1: [0,30] vs [5,10]: 5 < 30 → overlap found

Output:
```
False (cannot attend all meetings)
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

</details>

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def can_attend_meetings(self, intervals: List[List[int]]) -> bool:
        """
        Determines if a person can attend all meetings.

        Args:
            intervals: List of meeting intervals where each interval is [start_time, end_time]

        Returns:
            bool: True if all meetings can be attended, False if there are conflicts

        Example:
            >>> s = Solution()
            >>> s.can_attend_meetings([[0,30],[5,10],[15,20]])
            False
            >>> s.can_attend_meetings([[7,10],[2,4]])
            True
        """
        # Handle edge cases
        if not intervals:
            return True

        # Sort intervals based on start time
        intervals.sort(key=lambda x: x[0])

        # Check for overlaps
        for i in range(1, len(intervals)):
            # If current meeting starts before previous meeting ends
            if intervals[i][0] < intervals[i - 1][1]:
                return False

        return True


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Overlapping meetings
    result = solution.can_attend_meetings([[0, 30], [5, 10], [15, 20]])
    expected = False
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.can_attend_meetings([])
    expected = True
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Non-overlapping meetings
    result = solution.can_attend_meetings([[7, 10], [2, 4]])
    expected = True
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 252. Meeting Rooms")
