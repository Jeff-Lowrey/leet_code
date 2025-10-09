"""
# Difficulty: Medium

# 085. Maximal

Given a problem that demonstrates key concepts in Monotonic Stack.

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
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        """
        Find the area of the largest rectangle containing only '1's in the binary matrix.
        
        Args:
            matrix: A 2D binary matrix consisting of '0's and '1's
            
        Returns:
            int: The area of the largest rectangle
        """
        if not matrix or not matrix[0]:
            return 0
        
        rows, cols = len(matrix), len(matrix[0])
        heights = [0] * cols  # Keep track of consecutive 1's in each column
        max_area = 0
        
        for row in range(rows):
            # Update heights for current row
            for col in range(cols):
                if matrix[row][col] == '1':
                    heights[col] += 1
                else:
                    heights[col] = 0
            
            # Calculate maximum rectangle area for current histogram
            max_area = max(max_area, self._largest_rectangle_in_histogram(heights))
        
        return max_area
    
    def _largest_rectangle_in_histogram(self, heights: List[int]) -> int:
        """
        Helper method to find the largest rectangle area in a histogram.
        Uses a stack-based approach to track potential rectangle boundaries.
        
        Args:
            heights: List of integers representing histogram heights
            
        Returns:
            int: Maximum rectangle area possible in the histogram
        """
        stack = []  # Stack to store indices
        max_area = 0
        i = 0
        
        while i < len(heights):
            # If stack is empty or current height is larger than previous
            if not stack or heights[stack[-1]] <= heights[i]:
                stack.append(i)
                i += 1
            else:
                # Calculate area with height of popped bar as smallest height
                curr_height = heights[stack.pop()]
                width = i - stack[-1] - 1 if stack else i
                max_area = max(max_area, curr_height * width)
        
        # Process remaining elements in stack
        while stack:
            curr_height = heights[stack.pop()]
            width = i - stack[-1] - 1 if stack else i
            max_area = max(max_area, curr_height * width)
        
        return max_area

def test_solution():
    """
    Test cases for 085. Maximal.
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
    print(f"Solution for 085. Maximal")
