"""
# 084. Largest Rectangle In Histogram
# Difficulty: Medium
Given a problem that demonstrates key concepts in Monotonic Stack.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of monotonic stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply monotonic stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages monotonic stack principles
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

The approach uses monotonic stack techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using monotonic stack method
3. Return the computed result

</details>
"""

class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        """
        Find largest rectangle area in histogram using monotonic stack.

        Args:
            heights: Array of bar heights in histogram

        Returns:
            Maximum rectangle area

        Time Complexity: O(n) - each element pushed/popped once
        Space Complexity: O(n) - stack can hold all elements in worst case
        """
        stack = []  # Store indices of bars
        max_area = 0

        for i, h in enumerate(heights):
            # Maintain increasing stack
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                # Width is distance to current bar minus distance to previous bar
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)

            stack.append(i)

        # Process remaining bars in stack
        while stack:
            height = heights[stack.pop()]
            width = len(heights) if not stack else len(heights) - stack[-1] - 1
            max_area = max(max_area, height * width)

        return max_area

    def solve(self, heights: list[int]) -> int:
        """Wrapper method for consistency with template."""
        return self.largestRectangleArea(heights)

def test_solution():
    """
    Test cases for 084. Largest Rectangle In Histogram.
    """
    solution = Solution()

    # Test case 1: Classic example
    result = solution.solve([2, 1, 5, 6, 2, 3])
    expected = 10
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single bar
    result = solution.solve([2])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Increasing heights
    result = solution.solve([1, 2, 3, 4, 5])
    expected = 9
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Decreasing heights
    result = solution.solve([5, 4, 3, 2, 1])
    expected = 9
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: All same height
    result = solution.solve([4, 4, 4, 4])
    expected = 16
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Empty array
    result = solution.solve([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Two bars
    result = solution.solve([2, 4])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    heights = [2, 1, 5, 6, 2, 3]
    result = solution.solve(heights)
    print(f"Solution for 084. Largest Rectangle In Histogram: {result}")
