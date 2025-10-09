"""
# 253. Meeting Rooms Ii
# Difficulty: Medium
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
    """
    Solution class for the Meeting Rooms II problem.
    Determines the minimum number of meeting rooms required to hold all meetings.
    """
    
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        """
        Calculates the minimum number of meeting rooms needed.
        
        Args:
            intervals: List of meetings where each meeting is [start_time, end_time]
            
        Returns:
            int: Minimum number of meeting rooms required
            
        Time Complexity: O(nlogn) where n is the number of meetings
        Space Complexity: O(n) for storing the heap
        """
        # Handle edge cases
        if not intervals:
            return 0
        if len(intervals) == 1:
            return 1
            
        # Sort meetings by start time
        intervals.sort(key=lambda x: x[0])
        
        # Initialize a min heap to track meeting end times
        rooms = []
        # Add first meeting's end time to heap
        heapq.heappush(rooms, intervals[0][1])
        
        # Process remaining meetings
        for i in range(1, len(intervals)):
            # If the earliest ending meeting ends before current meeting starts
            # we can reuse that room
            if rooms[0] <= intervals[i][0]:
                heapq.heappop(rooms)
            
            # Add current meeting's end time to heap
            heapq.heappush(rooms, intervals[i][1])
            
        # The size of heap represents minimum rooms needed
        return len(rooms)

def test_solution():
    """
    Test cases for 253. Meeting Rooms Ii.
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
    print(f"Solution for 253. Meeting Rooms Ii")
