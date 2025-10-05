I'll help you create a solution for the Non-Overlapping Intervals problem. I'll write a clean, well-documented implementation that follows Python best practices.

```python
#!/usr/bin/env python3
"""
Non-Overlapping Intervals - Python Implementation

This module provides a solution to find the minimum number of intervals that need
to be removed to make the remaining intervals non-overlapping.

Example:
    Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
    Output: 1
    Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
"""

from typing import List


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


def main():
    """
    Main function to test the solution with example cases.
    """
    # Test cases
    solution = Solution()
    
    # Test case 1
    intervals1 = [[1,2],[2,3],[3,4],[1,3]]
    print(f"Test case 1: {intervals1}")
    print(f"Result: {solution.eraseOverlapIntervals(intervals1)}\n")

    # Test case 2
    intervals2 = [[1,2],[1,2],[1,2]]
    print(f"Test case 2: {intervals2}")
    print(f"Result: {solution.eraseOverlapIntervals(intervals2)}\n")

    # Test case 3
    intervals3 = [[1,2],[2,3]]
    print(f"Test case 3: {intervals3}")
    print(f"Result: {solution.eraseOverlapIntervals(intervals3)}\n")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A complete solution to the Non-Overlapping Intervals problem using a greedy approach
2. Proper type hints and documentation
3. Clear comments explaining the logic
4. A main function with test cases
5. Efficient implementation with O(n log n) time complexity
6. Proper handling of edge cases (empty input)
7. Clean code structure following Python conventions

The solution works by:
1. Sorting intervals by end time
2. Greedily selecting non-overlapping intervals
3. Calculating the minimum number of intervals to remove

The code is structured as a complete, runnable file and includes example test cases in the main function. It handles edge cases appropriately and follows Python best practices and conventions.