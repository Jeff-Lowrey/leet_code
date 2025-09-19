"""
56. Merge Intervals
Medium

Given an array of intervals where intervals[i] = [starti, endi], merge all
overlapping intervals, and return an array of the non-overlapping intervals
that cover all the intervals in the input.

Example:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
To merge overlapping intervals, we need to first sort them by start time, then walk through them sequentially, merging adjacent intervals when they overlap.

### APPROACH:
1. **Sort intervals** by start time to ensure we process them in order
2. **Initialize merged list** with the first interval
3. **For each remaining interval**:
   - If it overlaps with the last merged interval (current.start ≤ last.end)
   - Merge by extending the end time to max(current.end, last.end)
   - Otherwise, add as a new separate interval

### WHY THIS WORKS:
- Sorting ensures we never miss potential merges between non-adjacent intervals
- Since intervals are sorted by start time, we only need to check overlap with the most recently added interval
- Two intervals [a,b] and [c,d] overlap if c ≤ b (assuming a ≤ c after sorting)

### TIME COMPLEXITY: O(n log n)
### SPACE COMPLEXITY: O(1) excluding output

### EXAMPLE WALKTHROUGH:
```
Input: [[1,3],[2,6],[8,10],[15,18]]
After sorting: [[1,3],[2,6],[8,10],[15,18]] (already sorted)

Step 1: merged = [[1,3]]
Step 2: [2,6] overlaps with [1,3] (2 ≤ 3) → merge to [1,6]
Step 3: [8,10] doesn't overlap with [1,6] (8 > 6) → add separately
Step 4: [15,18] doesn't overlap with [8,10] (15 > 10) → add separately
Result: [[1,6],[8,10],[15,18]]
```

### EDGE CASES:
- Single interval → return as-is
- No overlaps → return sorted intervals
- Complete overlap → one interval contains another
- Adjacent intervals with touching endpoints → merge them

</details>

class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        """
        Approach: Sort and merge
        Time Complexity: O(n log n)
        Space Complexity: O(1) excluding output
        """
        if not intervals:
            return []

        # Sort intervals by start time
        intervals.sort(key=lambda x: x[0])

        merged = [intervals[0]]

        for current in intervals[1:]:
            last_merged = merged[-1]

            # If current interval overlaps with last merged
            if current[0] <= last_merged[1]:
                # Merge by extending the end time
                last_merged[1] = max(last_merged[1], current[1])
            else:
                # No overlap, add as new interval
                merged.append(current)

        return merged

    def mergeWithComparator(self, intervals: list[list[int]]) -> list[list[int]]:
        """
        Alternative approach with explicit comparison
        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if not intervals:
            return []

        intervals.sort()
        result = []

        for interval in intervals:
            # If result is empty or no overlap
            if not result or result[-1][1] < interval[0]:
                result.append(interval)
            else:
                # Overlap exists, merge
                result[-1][1] = max(result[-1][1], interval[1])

        return result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    intervals1 = [[1, 3], [2, 6], [8, 10], [15, 18]]
    print(f"Input: {intervals1}")
    print(f"Output: {solution.merge(intervals1)}")  # [[1,6],[8,10],[15,18]]

    # Test case 2
    intervals2 = [[1, 4], [4, 5]]
    print(f"Input: {intervals2}")
    print(f"Output: {solution.merge(intervals2)}")  # [[1,5]]

    # Test case 3
    intervals3 = [[1, 4], [2, 3]]
    print(f"Input: {intervals3}")
    print(f"Output: {solution.merge(intervals3)}")  # [[1,4]]
