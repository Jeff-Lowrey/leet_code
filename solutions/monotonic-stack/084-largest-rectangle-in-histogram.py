"""
# Difficulty: Medium

# 084. Largest Rectangle In Histogram

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2, 1, 5, 6, 2, 3]</dd>
<dt>Output:</dt>
<dd>"Solution for 084. Largest Rectangle In Histogram: {result}"</dd>
<dt>Explanation:</dt>
<dd>Largest rectangle area is 10</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use monotonic increasing stack to track indices. When current height < stack top, pop and calculate area with popped as smallest height. Width is current index minus new stack top. Track max area.

### APPROACH:
1. **Initialize stack**: Create empty stack to store indices
2. **Initialize max area**: Set max_area = 0
3. **Iterate with sentinel**: Process each bar plus a sentinel (height 0) at end
4. **Maintain increasing stack**: While stack not empty and current height < height at stack top
5. **Calculate area**: Pop index, height = heights[popped], width = (i - stack[-1] - 1) if stack else i
6. **Update maximum**: max_area = max(max_area, height * width)
7. **Push current**: Append current index to stack
8. **Return result**: Return max_area

### WHY THIS WORKS:
- Monotonic increasing stack maintains indices where heights are ascending
- When shorter bar found, pop taller bars and calculate their max rectangles
- Width = current_index - stack_top - 1 (distance between boundaries)
- Stack indices represent left boundaries, current index is right boundary
- O(n) time: each bar pushed/popped once, O(n) space for stack

### EXAMPLE WALKTHROUGH:
```
Input: heights = [2,1,5,6,2,3]
Step 1: Use monotonic stack
  i=0: stack=[(0,2)]
  i=1: pop (0,2), area=2*1=2, push (1,1)
  i=2: push (2,5)
  i=3: push (3,6)
  i=4: pop (3,6), area=6*1=6
        pop (2,5), area=5*2=10
        push (2,2)
  i=5: push (5,3)

Output: 10 (maximum area)
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
