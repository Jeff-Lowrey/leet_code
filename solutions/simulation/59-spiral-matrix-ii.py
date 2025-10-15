"""
# Difficulty: Medium

# 59. Spiral Matrix II

Given a positive integer n, generate an n x n matrix filled with elements from 1 to n²
in spiral order.

Example 1:
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]

Example 2:
Input: n = 1
Output: [[1]]

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[1, 2, 3]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Spiral matrix filled 1 to n²</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Similar to Spiral Matrix I, but instead of reading, we're writing values in spiral order.
Use the same boundary-tracking technique, filling the matrix layer by layer from outside to inside.

### APPROACH:
1. **Initialize**: Create n×n matrix, counter starting at 1
2. **Maintain Boundaries**: top, bottom, left, right
3. **Fill in Spiral Order**:
   - Right: Fill top row from left to right
   - Down: Fill right column from top to bottom
   - Left: Fill bottom row from right to left
   - Up: Fill left column from bottom to top
4. **Shrink Boundaries**: After each direction, adjust boundary
5. **Increment Counter**: Use sequential numbers 1 to n²

**Key Pattern**: Same as Spiral Matrix I traversal, but filling instead of reading

### WHY THIS WORKS:
- Boundary tracking ensures we fill each cell exactly once
- Spiral pattern (right→down→left→up) creates the required order
- Sequential counter ensures values go from 1 to n²
- Shrinking boundaries naturally moves us inward

### EXAMPLE WALKTHROUGH:
```
n = 3, total = 9

Initial: matrix = [[0,0,0],[0,0,0],[0,0,0]]
         top=0, bottom=2, left=0, right=2, num=1

Step 1 - Right (top row): Fill [0,0] to [0,2]
  [[1,2,3],[0,0,0],[0,0,0]], num=4, top=1

Step 2 - Down (right col): Fill [1,2] to [2,2]
  [[1,2,3],[0,0,4],[0,0,5]], num=6, right=1

Step 3 - Left (bottom row): Fill [2,1] to [2,0]
  [[1,2,3],[0,0,4],[7,6,5]], num=8, bottom=1

Step 4 - Up (left col): Fill [1,0]
  [[1,2,3],[8,0,4],[7,6,5]], num=9, left=1

Step 5 - Right (center): Fill [1,1]
  [[1,2,3],[8,9,4],[7,6,5]], done

Result: [[1,2,3],[8,9,4],[7,6,5]]
```

### TIME COMPLEXITY:
O(n²)
- Fill each of n² cells once

### SPACE COMPLEXITY:
O(1)
- Only use constant extra space (not counting output matrix)

### EDGE CASES:
- n = 1: Single element [[1]]
- n = 2: [[1,2],[4,3]]
- Even vs odd n: Different center handling

</details>
"""
from typing import Any



class Solution:
    def generateMatrix(self, n: int) -> list[list[int]]:
        """
        Generate n×n matrix with numbers 1 to n² in spiral order.

        Args:
            n: Size of matrix

        Returns:
            n×n matrix filled in spiral order

        Time Complexity: O(n²)
        Space Complexity: O(1) excluding output
        """
        matrix = [[0] * n for _ in range(n)]

        # Boundaries
        top, bottom = 0, n - 1
        left, right = 0, n - 1

        num = 1

        while top <= bottom and left <= right:
            # Fill right along top row
            for col in range(left, right + 1):
                matrix[top][col] = num
                num += 1
            top += 1

            # Fill down along right column
            for row in range(top, bottom + 1):
                matrix[row][right] = num
                num += 1
            right -= 1

            # Fill left along bottom row
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    matrix[bottom][col] = num
                    num += 1
                bottom -= 1

            # Fill up along left column
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    matrix[row][left] = num
                    num += 1
                left += 1

        return matrix

    def generateMatrixDirection(self, n: int) -> list[list[int]]:
        """
        Alternative approach using direction vectors.

        Time Complexity: O(n²)
        Space Complexity: O(n²) for visited tracking
        """
        matrix = [[0] * n for _ in range(n)]
        visited = [[False] * n for _ in range(n)]

        # Directions: right, down, left, up
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        current_dir = 0

        row, col = 0, 0

        for num in range(1, n * n + 1):
            matrix[row][col] = num
            visited[row][col] = True

            # Try next position in current direction
            next_row = row + directions[current_dir][0]
            next_col = col + directions[current_dir][1]

            # Check if need to change direction
            if next_row < 0 or next_row >= n or next_col < 0 or next_col >= n or visited[next_row][next_col]:
                # Turn right (next direction in spiral)
                current_dir = (current_dir + 1) % 4
                next_row = row + directions[current_dir][0]
                next_col = col + directions[current_dir][1]

            row, col = next_row, next_col

        return matrix

    def generateMatrixRecursive(self, n: int) -> list[list[int]]:
        """
        Recursive approach filling layers.

        Time Complexity: O(n²)
        Space Complexity: O(n) for recursion depth
        """
        matrix = [[0] * n for _ in range(n)]

        def fill_layer(top: Any, bottom: Any, left: Any, right: Any, num: Any) -> Any:
            if top > bottom or left > right:
                return num

            # Fill top row
            for col in range(left, right + 1):
                matrix[top][col] = num
                num += 1

            # Fill right column
            for row in range(top + 1, bottom + 1):
                matrix[row][right] = num
                num += 1

            # Fill bottom row (if exists)
            if top < bottom:
                for col in range(right - 1, left - 1, -1):
                    matrix[bottom][col] = num
                    num += 1

            # Fill left column (if exists)
            if left < right:
                for row in range(bottom - 1, top, -1):
                    matrix[row][left] = num
                    num += 1

            # Fill inner layer
            return fill_layer(top + 1, bottom - 1, left + 1, right - 1, num)

        fill_layer(0, n - 1, 0, n - 1, 1)
        return matrix


def print_matrix(matrix):
    """Helper to print matrix nicely."""
    for row in matrix:
        print(" ".join(f"{num:3}" for num in row))
    print()


def test_solution() -> None:
    """Test cases for Problem 59."""
    solution = Solution()

    # Test case 1: n = 3
    n1 = 3
    expected1 = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
    assert solution.generateMatrix(n1) == expected1, "Test case 1 failed"

    # Test case 2: n = 1
    n2 = 1
    expected2 = [[1]]
    assert solution.generateMatrix(n2) == expected2, "Test case 2 failed"

    # Test case 3: n = 2
    n3 = 2
    expected3 = [[1, 2], [4, 3]]
    assert solution.generateMatrix(n3) == expected3, "Test case 3 failed"

    # Test case 4: n = 4
    n4 = 4
    expected4 = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
    assert solution.generateMatrix(n4) == expected4, "Test case 4 failed"

    # Test case 5: n = 5
    n5 = 5
    result5 = solution.generateMatrix(n5)
    # Verify it's 5x5 and contains all numbers 1-25
    assert len(result5) == 5 and len(result5[0]) == 5, "Test case 5 size failed"
    flat = [num for row in result5 for num in row]
    assert sorted(flat) == list(range(1, 26)), "Test case 5 content failed"

    # Test direction method
    n6 = 3
    expected6 = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
    assert solution.generateMatrixDirection(n6) == expected6, "Direction method failed"

    # Test recursive method
    n7 = 2
    expected7 = [[1, 2], [4, 3]]
    assert solution.generateMatrixRecursive(n7) == expected7, "Recursive method failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 59. Spiral Matrix II ===\n")

    # Example 1: n = 3
    n1 = 3
    print(f"n = {n1}")
    result1 = solution.generateMatrix(n1)
    print_matrix(result1)

    # Example 2: n = 4
    n2 = 4
    print(f"n = {n2}")
    result2 = solution.generateMatrix(n2)
    print_matrix(result2)

    # Example 3: n = 5
    n3 = 5
    print(f"n = {n3}")
    result3 = solution.generateMatrix(n3)
    print_matrix(result3)

    # Visualize the spiral pattern
    print("Spiral pattern for n=4:")
    print("→→→→   (1-4)")
    print("   ↓   (5)")
    print("←←←    (6-7)")
    print("↑      (8-9)")
    print("→→     (10-11)")
    print("  ↓    (12-13)")
    print("←      (14)")
    print("↑      (15)")
    print("→      (16)")
