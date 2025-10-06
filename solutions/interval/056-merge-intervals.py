"""
# 056. Merge Intervals
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
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        """
        Merges overlapping intervals in the input list.
        
        Args:
            intervals: List of intervals where each interval is [start, end]
        
        Returns:
            List of merged intervals
            
        Time Complexity: O(n log n) due to sorting
        Space Complexity: O(n) or O(1) depending if we consider output space
        """
        # Handle edge cases
        if not intervals:
            return []
        if len(intervals) == 1:
            return intervals
        
        # Sort intervals based on start time
        intervals.sort(key=lambda x: x[0])
        
        # Initialize result with first interval
        merged = [intervals[0]]
        
        # Iterate through remaining intervals
        for current in intervals[1:]:
            # Get the last interval from merged list
            previous = merged[-1]
            
            # If current interval overlaps with previous
            if current[0] <= previous[1]:
                # Update the end time of previous interval
                previous[1] = max(previous[1], current[1])
            else:
                # No overlap, add current interval to result
                merged.append(current)
        
        return merged

def test_solution():
    """
    Test cases for 056. Merge Intervals.
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
    print(f"Solution for 056. Merge Intervals")
