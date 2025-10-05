I'll help you create a Python implementation for checking non-overlapping intervals. I'll create a solution that handles interval overlap detection with clear comments and proper structure.

```python
#!/usr/bin/env python3
"""
Non-overlapping Intervals Implementation
This module provides functionality to handle and process non-overlapping intervals.

Author: Assistant
Date: 2024
"""

from typing import List


class IntervalProcessor:
    """
    A class to process and manage intervals, specifically handling non-overlapping operations.
    """
    
    @staticmethod
    def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
        """
        Determines the minimum number of intervals that need to be removed to make the remaining intervals non-overlapping.
        
        Args:
            intervals (List[List[int]]): List of intervals where each interval is [start, end]
            
        Returns:
            int: Minimum number of intervals to remove
        """
        if not intervals:
            return 0
        
        # Sort intervals based on end time
        intervals.sort(key=lambda x: x[1])
        
        non_overlap_count = 1  # Count of non-overlapping intervals
        current_end = intervals[0][1]
        
        # Iterate through sorted intervals
        for i in range(1, len(intervals)):
            if intervals[i][0] >= current_end:
                # Found non-overlapping interval
                non_overlap_count += 1
                current_end = intervals[i][1]
        
        # Return number of intervals to remove
        return len(intervals) - non_overlap_count

    @staticmethod
    def isNonOverlapping(intervals: List[List[int]]) -> bool:
        """
        Checks if a list of intervals is non-overlapping.
        
        Args:
            intervals (List[List[int]]): List of intervals where each interval is [start, end]
            
        Returns:
            bool: True if intervals are non-overlapping, False otherwise
        """
        if not intervals:
            return True
        
        # Sort intervals based on start time
        intervals.sort(key=lambda x: x[0])
        
        # Check for overlaps
        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i-1][1]:
                return False
        
        return True


def main():
    """
    Main function to demonstrate the usage of IntervalProcessor.
    """
    # Example usage
    processor = IntervalProcessor()
    
    # Test case 1: Overlapping intervals
    intervals1 = [[1,2], [2,3], [3,4], [1,3]]
    removals = processor.eraseOverlapIntervals(intervals1)
    print(f"Test case 1 - Minimum intervals to remove: {removals}")
    
    # Test case 2: Non-overlapping intervals
    intervals2 = [[1,2], [2,3], [3,4], [4,5]]
    is_non_overlapping = processor.isNonOverlapping(intervals2)
    print(f"Test case 2 - Is non-overlapping: {is_non_overlapping}")
    
    # Test case 3: Empty intervals
    intervals3 = []
    is_non_overlapping = processor.isNonOverlapping(intervals3)
    print(f"Test case 3 - Is non-overlapping (empty): {is_non_overlapping}")


if __name__ == "__main__":
    main()
```

This implementation provides a complete solution for handling non-overlapping intervals with the following features:

1. A dedicated `IntervalProcessor` class that encapsulates interval-related operations
2. Two main methods:
   - `eraseOverlapIntervals`: Finds minimum intervals to remove to make the set non-overlapping
   - `isNonOverlapping`: Checks if a set of intervals is non-overlapping
3. Proper type hints and documentation
4. Edge case handling (empty intervals, single intervals)
5. Example usage in the main function
6. Clean code structure following Python conventions
7. Comprehensive comments explaining the implementation

The solution uses efficient algorithms:
- For finding minimum removals: O(n log n) time complexity due to sorting
- For checking non-overlapping: O(n log n) time complexity due to sorting

The code can be run directly to see example results or imported as a module for use in other projects.