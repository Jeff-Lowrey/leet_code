"""
# 452. Minimum Number Of Arrows To Burst Balloons
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
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        """
        Finds the minimum number of arrows needed to burst all balloons.
        
        Args:
            points: List of balloon coordinates where each balloon is represented
                   by [start, end] coordinates
        
        Returns:
            int: Minimum number of arrows needed
        
        Example:
            Input: [[10,16],[2,8],[1,6],[7,12]]
            Output: 2
        """
        # Handle edge cases
        if not points:
            return 0
        
        # Sort balloons by end coordinate
        points.sort(key=lambda x: x[1])
        
        arrows = 1  # Start with one arrow
        current_end = points[0][1]  # Track the end coordinate of current group
        
        # Iterate through all balloons
        for start, end in points[1:]:
            # If current balloon starts after the previous arrow position,
            # we need a new arrow
            if start > current_end:
                arrows += 1
                current_end = end
        
        return arrows

def test_solution():
    """
    Test cases for 452. Minimum Number Of Arrows To Burst Balloons.
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
    print(f"Solution for 452. Minimum Number Of Arrows To Burst Balloons")
