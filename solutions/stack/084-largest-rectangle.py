"""
84. Largest Rectangle in Histogram
Hard

Given an array of integers heights representing the histogram's bar height where
the width of each bar is 1, return the area of the largest rectangle in the histogram.

Example:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle is shown in red, which has an area = 10 units.
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
For each bar, we want to find the largest rectangle that can be formed with that bar as the shortest height. This requires finding how far left and right we can extend while maintaining the current bar's height as the minimum.

### APPROACH:
1. Use a monotonic increasing stack to track bar indices
2. When we encounter a shorter bar, it means we've found the right boundary for previous bars
3. For each popped bar, calculate the rectangle area using that bar's height
4. The width is determined by the current position and the bar below in the stack

### WHY THIS WORKS:
The stack maintains bars in increasing height order. When we encounter a shorter bar, we know the previous bars can't extend further right. For each popped bar, the width of its rectangle spans from the bar below it in the stack to the current position.

### TIME COMPLEXITY: O(n)
- Each bar is pushed and popped at most once

### SPACE COMPLEXITY: O(n)
- Stack can contain up to n elements in worst case

### EXAMPLE WALKTHROUGH:
For heights = [2,1,5,6,2,3]:
1. Process 2: stack = [0]
2. Process 1: pop 2, calculate area = 2*1 = 2, stack = [1]
3. Process 5: stack = [1,2]
4. Process 6: stack = [1,2,3]
5. Process 2: pop 6 (area = 6*1 = 6), pop 5 (area = 5*2 = 10), stack = [1,4]
6. Process 3: stack = [1,4,5]
7. Final cleanup: calculate remaining areas

### OPTIMIZATION:
Adding sentinel values (0) at beginning and end eliminates edge case handling and simplifies the algorithm.

### EDGE CASES:
- Empty array: return 0
- Single bar: return its height
- All bars same height: return height * length
- Increasing heights: calculate area when processing is complete

</details>

class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        """
        Approach: Monotonic Stack
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack = []  # Store indices
        max_area = 0
        index = 0

        while index < len(heights):
            # If current bar is higher than stack top, push it
            if not stack or heights[index] >= heights[stack[-1]]:
                stack.append(index)
                index += 1
            else:
                # Pop the top
                top_of_stack = stack.pop()

                # Calculate area with heights[top_of_stack] as smallest bar
                width = index if not stack else index - stack[-1] - 1
                area = heights[top_of_stack] * width
                max_area = max(max_area, area)

        # Pop remaining bars from stack
        while stack:
            top_of_stack = stack.pop()
            width = index if not stack else index - stack[-1] - 1
            area = heights[top_of_stack] * width
            max_area = max(max_area, area)

        return max_area

    def largestRectangleAreaOptimized(self, heights: list[int]) -> int:
        """
        Approach: Stack with sentinel values
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Add sentinel values to avoid edge cases
        heights = [0] + heights + [0]
        stack = []
        max_area = 0

        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                height_idx = stack.pop()
                height = heights[height_idx]
                width = i - stack[-1] - 1
                max_area = max(max_area, height * width)

            stack.append(i)

        return max_area

    def largestRectangleAreaBruteForce(self, heights: list[int]) -> int:
        """
        Approach: Brute Force
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        max_area = 0
        n = len(heights)

        for i in range(n):
            min_height = heights[i]
            for j in range(i, n):
                min_height = min(min_height, heights[j])
                width = j - i + 1
                area = min_height * width
                max_area = max(max_area, area)

        return max_area


"""
85. Maximal Rectangle
Hard

Given a rows x cols binary matrix filled with 0's and 1's, find the largest
rectangle containing only 1's and return its area.
"""

class SolutionMatrix:
    def maximalRectangle(self, matrix: list[list[str]]) -> int:
        """
        Approach: Convert to histogram problem for each row
        Time Complexity: O(m * n)
        Space Complexity: O(n)
        """
        if not matrix or not matrix[0]:
            return 0

        rows, cols = len(matrix), len(matrix[0])
        heights = [0] * cols
        max_area = 0

        for row in matrix:
            # Update heights for current row
            for i in range(cols):
                if row[i] == '1':
                    heights[i] += 1
                else:
                    heights[i] = 0

            # Calculate max rectangle in current histogram
            max_area = max(max_area, self.largestRectangleArea(heights))

        return max_area

    def largestRectangleArea(self, heights: list[int]) -> int:
        """Helper function using stack approach"""
        stack = []
        max_area = 0
        index = 0

        while index < len(heights):
            if not stack or heights[index] >= heights[stack[-1]]:
                stack.append(index)
                index += 1
            else:
                top = stack.pop()
                width = index if not stack else index - stack[-1] - 1
                area = heights[top] * width
                max_area = max(max_area, area)

        while stack:
            top = stack.pop()
            width = index if not stack else index - stack[-1] - 1
            area = heights[top] * width
            max_area = max(max_area, area)

        return max_area


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    heights1 = [2, 1, 5, 6, 2, 3]
    print(f"Input: {heights1}")
    print(f"Output: {solution.largestRectangleArea(heights1)}")  # 10

    # Test case 2
    heights2 = [2, 4]
    print(f"Input: {heights2}")
    print(f"Output: {solution.largestRectangleArea(heights2)}")  # 4

    print("\nMaximal Rectangle in Matrix:")
    solution_matrix = SolutionMatrix()

    # Test case for matrix
    matrix = [
        ["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"]
    ]
    print("Input matrix:")
    for row in matrix:
        print(row)
    print(f"Output: {solution_matrix.maximalRectangle(matrix)}")  # 6
