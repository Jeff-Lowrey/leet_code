"""
# Difficulty: Medium

# 0056. Merge Intervals

Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>intervals = [[1,3], [2,6], [8,10], [15,18]]</dd>
<dt>Output:</dt>
<dd>[[1,6], [8,10], [15,18]]</dd>
<dt>Explanation:</dt>
<dd>Merged intervals [[1,3],[2,6],[8,10],[15,18]] become [[1,6],[8,10],[15,18]]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Sort intervals by start time. Iterate through sorted intervals. If current overlaps with last merged interval, extend the end. Otherwise add current interval as new merged interval.

### APPROACH:
1. **Sort intervals**: Sort intervals by start time
2. **Initialize result**: Set result = [intervals[0]]
3. **Iterate from second**: For each interval in intervals[1:]
4. **Check overlap**: If current_start <= result[-1][1], intervals overlap
5. **Merge if overlap**: Update result[-1][1] = max(result[-1][1], current_end)
6. **Add if no overlap**: Append current interval to result
7. **Return result**: Return merged intervals

### WHY THIS WORKS:
- Sort intervals by start time enables linear merge
- If current.start <= last.end: overlapping, extend last.end to max
- Otherwise: non-overlapping, add to result and update last
- Sorting ensures we never miss overlaps
- O(n log n) for sort, O(n) space for result

### EXAMPLE WALKTHROUGH:
Input:
```
intervals = [[1,3], [2,6], [8,10], [15,18]]
```

Step 1: Sort by start time
Already sorted: [[1,3], [2,6], [8,10], [15,18]]
Step 2: Initialize with first interval
merged = [[1,3]]
Step 3: Process [2,6]
2 ≤ 3 (overlaps with [1,3])
Merge: [1, max(3,6)] = [1,6]
merged = [[1,6]]
Step 4: Process [8,10]
8 > 6 (no overlap with [1,6])
Add new interval
merged = [[1,6], [8,10]]
Step 5: Process [15,18]
15 > 10 (no overlap with [8,10])
Add new interval
merged = [[1,6], [8,10], [15,18]]

Output:
```
[[1,6], [8,10], [15,18]]
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


class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        """
        Merges overlapping intervals in the input list.

        Args:
            intervals: List of intervals where each interval is [start, end]

        Returns:
            List of merged intervals

        Time Complexity: O(n log n) due to sorting
        Space Complexity: O(n) or O(1) depending if we consider output space
        """
        # Handle edge cases
        if not intervals:
            return []
        if len(intervals) == 1:
            return intervals

        # Sort intervals based on start time
        intervals.sort(key=lambda x: x[0])

        # Initialize result with first interval
        merged = [intervals[0]]

        # Iterate through remaining intervals
        for current in intervals[1:]:
            # Get the last interval from merged list
            previous = merged[-1]

            # If current interval overlaps with previous
            if current[0] <= previous[1]:
                # Update the end time of previous interval
                previous[1] = max(previous[1], current[1])
            else:
                # No overlap, add current interval to result
                merged.append(current)

        return merged


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.merge([[1, 3], [2, 6], [8, 10], [15, 18]])
    expected = [[1, 6], [8, 10], [15, 18]]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.merge([])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.merge([[1, 2]])
    expected = [[1, 2]]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 056. Merge Intervals")
