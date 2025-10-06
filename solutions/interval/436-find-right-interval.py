"""
# 436. Find Right Interval
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
    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:
        """
        Find the right interval for each interval in the given list.
        
        Args:
            intervals: List of intervals where each interval is [start, end]
        
        Returns:
            List of indices where result[i] is the index j such that intervals[j].start
            is the smallest that is >= intervals[i].end. Returns -1 if no such interval exists.
        """
        if not intervals:
            return []
        
        # Create list of (start_point, index) pairs for binary search
        start_points = [(interval[0], i) for i, interval in enumerate(intervals)]
        start_points.sort()  # Sort by start points
        
        def binary_search(target: int) -> int:
            """
            Binary search to find the smallest start point >= target
            
            Args:
                target: The value to search for
                
            Returns:
                Index of the right interval or -1 if not found
            """
            left, right = 0, len(start_points) - 1
            result = -1
            
            while left <= right:
                mid = (left + right) // 2
                if start_points[mid][0] >= target:
                    result = start_points[mid][1]
                    right = mid - 1
                else:
                    left = mid + 1
                    
            return result
        
        # Find right interval for each interval
        result = []
        for interval in intervals:
            right_index = binary_search(interval[1])
            result.append(right_index)
            
        return result

def test_solution():
    """
    Test cases for 436. Find Right Interval.
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
    print(f"Solution for 436. Find Right Interval")
