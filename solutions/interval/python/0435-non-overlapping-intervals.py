"""
# Difficulty: Medium

# 435. Non Overlapping Intervals

Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>intervals = [[1,2],[2,3],[3,4],[1,3]]</dd>
<dt>Output:</dt>
<dd>1 (min intervals to remove)</dd>
<dt>Explanation:</dt>
<dd>Minimum 1 interval removed to make [[1,2],[2,3],[3,4],[1,3]] non-overlapping</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Sort by end time (greedy). Keep track of previous interval's end. If current start >= previous end, intervals don't overlap. Otherwise, skip current interval (remove it). Count removals.

### APPROACH:
1. **Sort by end time**: Sort intervals by interval[1]
2. **Initialize variables**: Set count = 0, prev_end = intervals[0][1]
3. **Iterate from second**: For each interval in intervals[1:]
4. **Check overlap**: If current_start < prev_end, intervals overlap
5. **Remove current**: Increment count
6. **No overlap**: Update prev_end = current_end
7. **Return count**: Return count as minimum intervals to remove

### WHY THIS WORKS:
- Sort by end time: greedy choice is interval finishing earliest
- Always pick interval with earliest end to leave room for more intervals
- Count overlaps: if start < last_end, remove current (increment count)
- Greedy works: earliest end maximizes remaining space for future intervals
- O(n log n) for sorting, O(1) space excluding input

### EXAMPLE WALKTHROUGH:
Input:
```
intervals = [[1,2],[2,3],[3,4],[1,3]]
```

Step 1: Sort by end time
sorted = [[1,2],[2,3],[1,3],[3,4]]
Step 2: Greedy selection
Select [1,2], end=2
[2,3]: 2 ≥ 2, select it, end=3

Steps:
Step 1: [1,3]: 1 < 3, overlaps → remove count=1
Step 2: [3,4]: 3 ≥ 3, select it

Output:
```
1 (min intervals to remove)
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

from typing import List, Optional, Dict, Tuple


class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        """
        Calculate the minimum number of intervals to remove to make the remaining intervals
        non-overlapping.

        Args:
            intervals: List of intervals where each interval is [start, end]

        Returns:
            int: Minimum number of intervals that must be removed

        Time Complexity: O(n log n) where n is the number of intervals
        Space Complexity: O(1) as we sort in place
        """
        if not intervals:
            return 0

        # Sort intervals based on end time
        # This greedy approach helps us keep intervals that end earlier
        intervals.sort(key=lambda x: x[1])

        non_overlapping = 1  # Count of non-overlapping intervals
        current_end = intervals[0][1]  # End time of the first interval

        # Iterate through sorted intervals
        for i in range(1, len(intervals)):
            # If current interval's start is >= previous interval's end,
            # they don't overlap
            if intervals[i][0] >= current_end:
                non_overlapping += 1
                current_end = intervals[i][1]

        # Return the number of intervals to remove
        # (total intervals - non-overlapping intervals)
        return len(intervals) - non_overlapping


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 2: All overlapping
    result = solution.eraseOverlapIntervals([[1, 2], [1, 2], [1, 2]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 3: No overlaps
    result = solution.eraseOverlapIntervals([[1, 2], [2, 3]])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.eraseOverlapIntervals([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single interval
    result = solution.eraseOverlapIntervals([[1, 2]])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 435. Non Overlapping Intervals")
