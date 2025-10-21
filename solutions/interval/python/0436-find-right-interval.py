"""
# Difficulty: Medium

# 436. Find Right Interval

You are given an array of intervals, where intervals[i] = [starti, endi] and each starti is unique.

The right interval for an interval i is an interval j such that startj >= endi and startj is minimized. Note that i may equal j.

Return an array of right interval indices for each interval i. If no right interval exists for interval i, then put -1 at index i.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>intervals = [[3,4],[2,3],[1,2]]</dd>
<dt>Output:</dt>
<dd>[-1,0,1]</dd>
<dt>Explanation:</dt>
<dd>For each interval [1,2], the right interval [2,3] has the smallest start ≥ 2</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, Tree
**Patterns**: Two Pointers Pattern, Binary Search Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Sort intervals by start time. For each interval, binary search for the first interval whose start >= current interval's end. Store the index or -1 if not found.

### APPROACH:
1. **Create index mapping**: Build dict mapping start to original index
2. **Sort starts**: Create sorted list of start times
3. **For each interval**: Get its end time
4. **Binary search**: Use bisect_left to find smallest start >= end
5. **Check if found**: If index < len(starts), get original index from mapping
6. **Not found**: Append -1 to result
7. **Return result**: Return list of right interval indices

### WHY THIS WORKS:
- Binary search on sorted start times to find next interval
- Store original indices before sorting to map back
- For each interval's end, binary search for smallest start >= end
- HashMap maps start value to original index
- O(n log n) for sort + n binary searches, O(n) space

### EXAMPLE WALKTHROUGH:
```
Input: intervals = [[3,4],[2,3],[1,2]]
Step 1: Create index mapping
  indexed = [(3,4,0), (2,3,1), (1,2,2)]

Step 2: Sort by start time
  sorted = [(1,2,2), (2,3,1), (3,4,0)]

Step 3: Binary search for each interval's end
  [3,4]: find start ≥ 4 → not found → -1
  [2,3]: find start ≥ 3 → found at index 0
  [1,2]: find start ≥ 2 → found at index 1

Output: [-1,0,1]
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
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: No right interval exists
    result = solution.findRightInterval([[1, 4], [2, 3], [3, 4]])
    expected = [-1, -1, -1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All have right intervals
    result = solution.findRightInterval([[1, 2], [2, 3], [3, 4]])
    expected = [1, 2, -1]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Empty input
    result = solution.findRightInterval([])
    expected: list[Any] = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Single interval
    result = solution.findRightInterval([[1, 2]])
    expected = [-1]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 436. Find Right Interval")
