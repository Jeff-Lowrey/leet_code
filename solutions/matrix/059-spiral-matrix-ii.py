"""
# 059. Spiral Matrix II
**Layer-by-Layer**

Generate an n x n matrix filled with elements from 1 to n^2 in spiral order.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Fill the matrix in layers, moving right, down, left, up in each layer, spiraling inward.
Track boundaries and shrink them as each direction completes.

### APPROACH:
1. **Initialize boundaries**: top, bottom, left, right
2. **Fill right**: Move right along top row, increment top
3. **Fill down**: Move down along right column, decrement right
4. **Fill left**: Move left along bottom row, decrement bottom
5. **Fill up**: Move up along left column, increment left
6. **Repeat**: Continue until all cells filled

### WHY THIS WORKS:
- Layer-by-layer approach systematically fills spiral
- Boundary tracking prevents revisiting cells
- Four directional movements complete each layer
- Counter increments sequentially from 1 to n^2

### TIME COMPLEXITY: O(n^2) - visit each cell once
### SPACE COMPLEXITY: O(n^2) - output matrix (O(1) excluding output)

### EXAMPLE WALKTHROUGH:
```
Input: n = 3

Step 1: Fill right: [1,2,3]
Step 2: Fill down:  [_,_,4]
                    [_,_,5]
Step 3: Fill left:  [_,_,_]
                    [_,_,_]
                    [9,8,7]
Step 4: Fill up:    [_,_,_]
                    [6,_,_]
Step 5: Fill center: [_,_,_]
                     [_,5,_]

Output: [[1,2,3],
         [8,9,4],
         [7,6,5]]
```

### EDGE CASES:
- n = 1 (single cell)
- Even vs odd n (center handling)
- Boundary conditions

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach fills matrix in spiral layers from outside to inside.

### Algorithm Steps:
1. Initialize n x n matrix with zeros
2. Track top, bottom, left, right boundaries
3. Fill matrix moving: right → down → left → up
4. Shrink boundaries after each direction
5. Continue until all n^2 cells filled

</details>
"""


class Solution:
    def generateMatrix(self, n: int) -> list[list[int]]:
        """
        Generate n x n spiral matrix.

        Args:
            n: Dimension of square matrix

        Returns:
            n x n matrix filled 1 to n^2 in spiral order

        Time Complexity: O(n^2)
        Space Complexity: O(n^2) for output matrix
        """
        # Initialize n x n matrix with zeros
        matrix = [[0] * n for _ in range(n)]

        # Define boundaries
        top, bottom = 0, n - 1
        left, right = 0, n - 1

        num = 1

        while top <= bottom and left <= right:
            # Fill right: left to right along top row
            for col in range(left, right + 1):
                matrix[top][col] = num
                num += 1
            top += 1

            # Fill down: top to bottom along right column
            for row in range(top, bottom + 1):
                matrix[row][right] = num
                num += 1
            right -= 1

            # Fill left: right to left along bottom row
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    matrix[bottom][col] = num
                    num += 1
                bottom -= 1

            # Fill up: bottom to top along left column
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    matrix[row][left] = num
                    num += 1
                left += 1

        return matrix

    # Alias for consistent interface
    solve = generateMatrix


def test_solution():
    """
    Test cases for 059. Spiral Matrix II.
    """
    solution = Solution()

    # Test case 1: n = 1 (single cell)
    result1 = solution.generateMatrix(1)
    expected1 = [[1]]
    assert result1 == expected1, f"Test case 1 failed: expected {expected1}, got {result1}"
    print("Test case 1 passed: n = 1")

    # Test case 2: n = 3
    result2 = solution.generateMatrix(3)
    expected2 = [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
    assert result2 == expected2, f"Test case 2 failed: expected {expected2}, got {result2}"
    print("Test case 2 passed: n = 3")

    # Test case 3: n = 4
    result3 = solution.generateMatrix(4)
    expected3 = [[1, 2, 3, 4], [12, 13, 14, 5], [11, 16, 15, 6], [10, 9, 8, 7]]
    assert result3 == expected3, f"Test case 3 failed: expected {expected3}, got {result3}"
    print("Test case 3 passed: n = 4")

    # Test case 4: n = 2
    result4 = solution.generateMatrix(2)
    expected4 = [[1, 2], [4, 3]]
    assert result4 == expected4, f"Test case 4 failed: expected {expected4}, got {result4}"
    print("Test case 4 passed: n = 2")

    # Test case 5: n = 5 (verify pattern continues)
    result5 = solution.generateMatrix(5)
    # Verify it's 5x5 and has all numbers 1-25
    assert len(result5) == 5 and len(result5[0]) == 5, "Matrix dimensions incorrect"
    flat = [num for row in result5 for num in row]
    assert sorted(flat) == list(range(1, 26)), "Numbers not in correct range"
    # Check corners - the center of 5x5 spiral should be 25
    assert result5[0][0] == 1, "Top-left should be 1"
    assert result5[0][4] == 5, "Top-right should be 5"
    assert result5[2][2] == 25, "Center should be 25"
    print("Test case 5 passed: n = 5")

    print("\nAll test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("\nExample: Generating 3x3 spiral matrix")
    result = solution.generateMatrix(3)
    for row in result:
        print(row)

    print("\nExample: Generating 4x4 spiral matrix")
    result = solution.generateMatrix(4)
    for row in result:
        print(row)
