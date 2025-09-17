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
