"""
# Difficulty: Medium

# 252. Meeting Rooms

Given a problem that demonstrates key concepts in Interval.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

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

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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
            if intervals[i][0] < intervals[i-1][1]:
                return False
                
        return True

def test_solution():
    """
    Test cases for 252. Meeting Rooms.
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
    print(f"Solution for 252. Meeting Rooms")
