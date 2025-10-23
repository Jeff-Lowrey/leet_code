"""
# Difficulty: Medium

# 085. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>matrix = [["1","0","1","0","0"],["1","0","1","1","1"]]</dd>
<dt>Output:</dt>
<dd>3 (maximal rectangle)</dd>
<dt>Explanation:</dt>
<dd>Maximal rectangle area is 6</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, String
**Patterns**: Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
For each row, treat it as base of histogram. Heights are consecutive 1s above in each column. Apply largest rectangle in histogram for each row. Track maximum across all rows.

### APPROACH:
1. **Build height array**: For each row, treat as base of histogram
2. **Update heights**: For each row, if cell is '1', heights[j] += 1; else heights[j] = 0
3. **Apply histogram algorithm**: For each row's height array, call largestRectangleInHistogram
4. **Track maximum**: Update max_area with result from histogram calculation
5. **Continue for all rows**: Process entire matrix
6. **Return result**: Return max_area

### WHY THIS WORKS:
- Treat each row as histogram base: heights = consecutive 1s above
- Apply largest rectangle in histogram algorithm to each row
- Update heights: if cell is 1, heights[j]++; if 0, heights[j]=0
- Max rectangle found by processing all rows as histograms
- O(m*n) time: histogram calculation O(n) per row, O(n) space for heights array

### EXAMPLE WALKTHROUGH:
```
Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"]]
Step 1: Build height array for each row
  row 0: heights = [1,0,1,0,0]
  row 1: heights = [2,0,2,1,1]

Step 2: Find max rectangle in each histogram
  row 0: max = 1
  row 1: max = 3

Output: 3 (maximal rectangle)
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

from typing import List, Optional, Dict, Tuple


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
                if matrix[row][col] == "1":
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
        stack: list[int] = []  # Stack to store indices
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


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.maximalRectangle(
        [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]
    )
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.maximalRectangle([])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single cell with 1
    result = solution.maximalRectangle([["1"]])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 085. Maximal")
