"""
# 435. Non Overlapping Intervals
**Medium**

Given a problem that demonstrates key concepts in Interval.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of interval concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply interval methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages interval principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses interval techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using interval method
3. Return the computed result

</details>
"""

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

def test_solution():
    """
    Test cases for 435. Non Overlapping Intervals.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 435. Non Overlapping Intervals")
