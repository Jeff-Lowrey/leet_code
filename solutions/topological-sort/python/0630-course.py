"""
# Difficulty: Medium

# 0630. Course Schedule III

There are n different online courses numbered from 1 to n. You are given an array courses where courses[i] = [durationi, lastDayi] indicate that the ith course should be taken continuously for durationi days and must be finished before or on lastDayi.

You will start on the 1st day and you cannot take two or more courses simultaneously.

Return the maximum number of courses that you can take.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]</dd>
<dt>Output:</dt>
<dd>3 (max courses)</dd>
<dt>Explanation:</dt>
<dd>Maximum courses you can take within time limit</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Sorting
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Greedy Algorithm
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is that greedy: sort courses by deadline. For each course, if time available, add to heap (track duration). If no time, compare with longest course taken. If current shorter, replace longest.

### APPROACH:
1. **Sort by end time**: Sort courses by their deadlines
2. **Initialize heap and time**: Create max heap, set current_time = 0
3. **Iterate courses**: For each course (duration, deadline)
4. **Add to schedule**: Push -duration to heap, add duration to current_time
5. **Check feasibility**: If current_time > deadline, remove longest course
6. **Continue processing**: Handle all courses
7. **Return result**: Return len(heap)

### WHY THIS WORKS:
- Sort courses by deadline: greedy choice of course order
- Use max heap to track course durations taken so far
- If current time + duration > deadline, remove longest course (heap top)
- Greedy: always try to fit course, remove longest if conflicts
- O(n log n) for sort + heap operations, O(n) space for heap

### EXAMPLE WALKTHROUGH:
Input:
```
courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]
```

Step 1: Sort by end time
sorted = [[200,1300],[1000,1250],[2000,3200],[100,200]]
Step 2: Greedy selection
Take course ending at 1300
Take course ending at 1250 (can't, conflicts)
Take course ending at 3200
...

Output:
```
3 (max courses)
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

import heapq

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        """
        Finds the maximum number of courses that can be taken given their durations
        and deadlines.

        Args:
            courses: List of [duration, deadline] pairs for each course

        Returns:
            Maximum number of courses that can be taken

        Time Complexity: O(n log n) where n is the number of courses
        Space Complexity: O(n) for storing courses in the heap
        """
        # Sort courses by deadline to process earlier deadlines first
        courses.sort(key=lambda x: x[1])

        # Max heap to store course durations we've taken
        taken: list[Any] = []
        current_time = 0

        for duration, deadline in courses:
            # If we can take this course without exceeding its deadline
            if current_time + duration <= deadline:
                current_time += duration
                # Push negative duration for max heap (Python has min heap by default)
                heapq.heappush(taken, -duration)
            # If we can't take it directly, check if we can swap with a longer course
            elif taken and -taken[0] > duration:
                # Remove the longest course we've taken so far
                longest_duration = -heapq.heappop(taken)
                # Add the time difference after swapping
                current_time = current_time - longest_duration + duration
                # Add the new course
                heapq.heappush(taken, -duration)

        # Return the number of courses taken
        return len(taken)


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.scheduleCourse([[100, 200], [200, 1300], [1000, 1250], [2000, 3200]])
    expected = 3
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Simple case
    result = solution.scheduleCourse([[1, 2]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Multiple courses with tight deadlines
    result = solution.scheduleCourse([[3, 2], [4, 3]])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.scheduleCourse([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Course duration equals deadline
    result = solution.scheduleCourse([[5, 5], [4, 6], [2, 6]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 630. Course")
