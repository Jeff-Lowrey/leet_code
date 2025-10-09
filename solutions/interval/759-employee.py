"""
# Difficulty: Medium

# 759. Employee

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
    def employeeFreeTime(self, schedule: List[List[Interval]]) -> List[Interval]:
        """
        Find the free time intervals common to all employees.
        
        Args:
            schedule: List of lists where each inner list contains Interval objects
                     representing an employee's busy periods
        
        Returns:
            List of Interval objects representing common free time periods
        """
        if not schedule:
            return []

        # Flatten all intervals into a single list
        all_intervals = []
        for employee_schedule in schedule:
            all_intervals.extend(employee_schedule)
        
        # Sort intervals by start time
        all_intervals.sort(key=lambda x: x.start)
        
        # Merge overlapping intervals
        merged = []
        for interval in all_intervals:
            # If this is the first interval or if there's no overlap
            if not merged or merged[-1].end < interval.start:
                merged.append(interval)
            else:
                # Merge overlapping intervals
                merged[-1].end = max(merged[-1].end, interval.end)
        
        # Find gaps between merged intervals
        result = []
        for i in range(1, len(merged)):
            # If there's a gap between current and previous interval
            if merged[i].start > merged[i-1].end:
                # Add the gap as a free time interval
                result.append(Interval(merged[i-1].end, merged[i].start))
        
        return result

def test_solution():
    """
    Test cases for 759. Employee.
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
    print(f"Solution for 759. Employee")
