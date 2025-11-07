"""
### INTUITION:
The key insight is that sort intervals by start time. For each interval, binary search for the first interval whose start >= current interval's end. Store the index or -1 if not found.

### APPROACH:
1. **Create index mapping**: Build dict mapping start to original index
2. **Sort starts**: Create sorted list of start times
3. **For each interval**: Get its end time
4. **Binary search**: Use bisect_left to find smallest start >= end
5. **Check if found**: If index < len(starts), get original index from mapping
6. **Not found**: Append -1 to result
7. **Return result**: Return list of right interval indices

### WHY THIS WORKS:
- This ensures that binary search on sorted start times to find next interval
- This ensures that store original indices before sorting to map back
- This ensures that for each interval's end, binary search for smallest start >= end
- This ensures that hashMap maps start value to original index
- This ensures that o(n log n) for sort + n binary searches, O(n) space

### EXAMPLE WALKTHROUGH:
Input:
```
intervals = [[3,4],[2,3],[1,2]]
```

Step 1: Create index mapping
indexed = [(3,4,0), (2,3,1), (1,2,2)]
Step 2: Sort by start time
sorted = [(1,2,2), (2,3,1), (3,4,0)]
Step 3: Binary search for each interval's end

Steps:
Step 1: [3,4]: find start ≥ 4 → not found → -1
Step 2: [2,3]: find start ≥ 3 → found at index 0
Step 3: [1,2]: find start ≥ 2 → found at index 1

Output:
```
[-1,0,1]
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
    """Interval with start and end."""

    def __init__(self, start: Any = 0, end: Any = 0) -> None:
        self.start = start
        self.end = end


class Solution:
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        """
        Find the right interval for each interval in the given list.

        Args:
            intervals: List of intervals where each interval is [start, end]

        Returns:
            List of indices where result[i] is the index j such that intervals[j].start
            is the smallest that is >= intervals[i].end. Returns -1 if no such interval exists.
        """
        if not intervals:
            return []

        # Create list of (start_point, index) pairs for binary search
        start_points = [(interval[0], i) for i, interval in enumerate(intervals)]
        start_points.sort()  # Sort by start points

        def binary_search(target: int) -> int:
            """
            Binary search to find the smallest start point >= target

            Args:
                target: The value to search for

            Returns:
                Index of the right interval or -1 if not found
            """
            left, right = 0, len(start_points) - 1
            result = -1

            while left <= right:
                mid = (left + right) // 2
                if start_points[mid][0] >= target:
                    result = start_points[mid][1]
                    right = mid - 1
                else:
                    left = mid + 1

            return result

        # Find right interval for each interval
        result: list[Any] = []
        for interval in intervals:
            right_index = binary_search(interval[1])
            result.append(right_index)

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findRightInterval([[3, 4], [2, 3], [1, 2]])
    expected = [-1, 0, 1]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: No right interval exists
    result = solution.findRightInterval([[1, 4], [2, 3], [3, 4]])
    expected = [-1, -1, -1]
    assert result == expected, f"Expected expected, got result"

    # Test case 3: All have right intervals
    result = solution.findRightInterval([[1, 2], [2, 3], [3, 4]])
    expected = [1, 2, -1]
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.findRightInterval([])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single interval
    result = solution.findRightInterval([[1, 2]])
    expected = [-1]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 436. Find Right Interval")
