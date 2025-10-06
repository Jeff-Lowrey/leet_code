"""
# 733. Flood Fill
**Easy**

An image is represented by an m x n integer grid image where image[i][j] represents
the pixel value of the image. You are also given three integers sr, sc, and color.
You should perform a flood fill on the image starting from the pixel image[sr][sc].

To perform a flood fill, consider the starting pixel, plus any pixels connected
4-directionally to the starting pixel of the same color as the starting pixel,
plus any pixels connected 4-directionally to those pixels (also with the same color),
and so on. Replace the color of all of the aforementioned pixels with color.

Return the modified image after performing the flood fill.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Flood fill is a classic graph traversal problem similar to DFS. We start from
a pixel and spread to all connected pixels of the same color, changing them
to the new color. It's like the paint bucket tool in image editors.

### APPROACH:
1. **Check validity**: Ensure starting position is within bounds
2. **Get original color**: Store the color we're replacing
3. **Early exit**: If new color equals original color, no work needed
4. **DFS traversal**: Recursively visit all connected same-colored pixels
5. **4-directional movement**: Check up, down, left, right neighbors

### WHY THIS WORKS:
- DFS naturally explores all connected components
- We change color as we visit to avoid revisiting
- 4-directional connectivity mimics pixel adjacency
- Recursion handles the spreading pattern automatically

### TIME COMPLEXITY: O(m×n)
Where m, n are image dimensions - worst case visit all pixels

### SPACE COMPLEXITY: O(m×n)
For recursion stack in worst case (straight line of same color)

### EXAMPLE WALKTHROUGH:
```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Original color at (1,1) = 1
Step 1: Change (1,1) to 2, explore neighbors
Step 2: Change (0,0) to 2, change (0,1) to 2, change (0,2) to 2
Step 3: Change (1,0) to 2, change (2,0) to 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
```

### EDGE CASES:
- Starting pixel already has target color
- Single pixel image
- All pixels same color
- Starting position out of bounds

</details>
"""

class Solution:
    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
        """
        Perform flood fill starting from given position.

        Args:
            image: 2D grid representing the image
            sr: Starting row index
            sc: Starting column index
            color: New color to fill with

        Returns:
            Modified image after flood fill

        Time Complexity: O(m×n) - visit each pixel at most once
        Space Complexity: O(m×n) - recursion stack depth
        """
        if not image or not image[0]:
            return image

        rows, cols = len(image), len(image[0])

        # Check if starting position is valid
        if sr < 0 or sr >= rows or sc < 0 or sc >= cols:
            return image

        original_color = image[sr][sc]

        # If the new color is the same as original, no work needed
        if original_color == color:
            return image

        def dfs(row: int, col: int) -> None:
            """
            Depth-first search to fill connected pixels.

            Args:
                row: Current row index
                col: Current column index
            """
            # Check bounds and color match
            if (row < 0 or row >= rows or col < 0 or col >= cols or
                image[row][col] != original_color):
                return

            # Change color of current pixel
            image[row][col] = color

            # Recursively fill 4-directionally connected pixels
            dfs(row - 1, col)  # Up
            dfs(row + 1, col)  # Down
            dfs(row, col - 1)  # Left
            dfs(row, col + 1)  # Right

        # Start the flood fill
        dfs(sr, sc)
        return image

    def floodFillIterative(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:
        """
        Iterative version using stack to avoid recursion depth issues.

        Args:
            image: 2D grid representing the image
            sr: Starting row index
            sc: Starting column index
            color: New color to fill with

        Returns:
            Modified image after flood fill

        Time Complexity: O(m×n)
        Space Complexity: O(m×n) - for the stack
        """
        if not image or not image[0]:
            return image

        rows, cols = len(image), len(image[0])

        if sr < 0 or sr >= rows or sc < 0 or sc >= cols:
            return image

        original_color = image[sr][sc]

        if original_color == color:
            return image

        stack = [(sr, sc)]

        while stack:
            row, col = stack.pop()

            if (row < 0 or row >= rows or col < 0 or col >= cols or
                image[row][col] != original_color):
                continue

            image[row][col] = color

            # Add 4-directional neighbors to stack
            stack.extend([(row-1, col), (row+1, col), (row, col-1), (row, col+1)])

        return image


def test_solution():
    """Test cases for Problem 733."""
    solution = Solution()

    # Test case 1: Basic flood fill
    image1 = [[1,1,1],[1,1,0],[1,0,1]]
    result1 = solution.floodFill(image1, 1, 1, 2)
    expected1 = [[2,2,2],[2,2,0],[2,0,1]]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Single pixel
    image2 = [[0,0,0],[0,0,0]]
    result2 = solution.floodFill(image2, 0, 0, 0)
    expected2 = [[0,0,0],[0,0,0]]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Same color as original
    image3 = [[1,1,1],[1,1,0],[1,0,1]]
    result3 = solution.floodFill(image3, 1, 1, 1)
    expected3 = [[1,1,1],[1,1,0],[1,0,1]]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Different starting positions
    image4 = [[0,0,0],[0,1,1]]
    result4 = solution.floodFill(image4, 1, 1, 1)
    expected4 = [[0,0,0],[0,1,1]]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Test iterative version
    image5 = [[1,1,1],[1,1,0],[1,0,1]]
    result5 = solution.floodFillIterative(image5, 1, 1, 2)
    expected5 = [[2,2,2],[2,2,0],[2,0,1]]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 733. Flood Fill ===")
    image = [[1,1,1],[1,1,0],[1,0,1]]
    print(f"Original: {image}")
    result = solution.floodFill(image, 1, 1, 2)
    print(f"After flood fill: {result}")
