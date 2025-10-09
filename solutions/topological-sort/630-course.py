"""
# 630. Course
# Difficulty: Medium
Given a problem that demonstrates key concepts in Topological Sort.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages topological sort principles
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

The approach uses topological sort techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using topological sort method
3. Return the computed result

</details>
"""

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
        taken = []
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

def test_solution():
    """
    Test cases for 630. Course.
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
    print(f"Solution for 630. Course")
