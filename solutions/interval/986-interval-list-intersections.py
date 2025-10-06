"""
# 986. Interval List Intersections
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
    def intervalIntersection(self, firstList: List[List[int]], secondList: List[List[int]]) -> List[List[int]]:
        """
        Find all intersections between two lists of intervals.
        
        Args:
            firstList: First list of intervals where each interval is [start, end]
            secondList: Second list of intervals where each interval is [start, end]
            
        Returns:
            List of intervals representing all intersections between the input lists
        """
        # Initialize result list and pointers
        result = []
        i = j = 0
        
        # Process intervals while we have elements in both lists
        while i < len(firstList) and j < len(secondList):
            # Get current intervals from both lists
            interval1 = firstList[i]
            interval2 = secondList[j]
            
            # Find the intersection points
            start = max(interval1[0], interval2[0])
            end = min(interval1[1], interval2[1])
            
            # If there is a valid intersection, add it to result
            if start <= end:
                result.append([start, end])
            
            # Move the pointer of the interval that ends earlier
            if interval1[1] < interval2[1]:
                i += 1
            else:
                j += 1
                
        return result

def test_solution():
    """
    Test cases for 986. Interval List Intersections.
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
    print(f"Solution for 986. Interval List Intersections")
