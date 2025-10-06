"""
59. Spiral Matrix II
Medium

Given a positive integer n, generate an n x n `matrix` filled with elements from 1 to n² in spiral order.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to fill an n×n `matrix` in spiral order (clockwise from outside to inside).
We can maintain boundaries and move in the spiral pattern: `right` → down → `left` → up.

### APPROACH:
1. **Initialize boundaries**: top, bottom, `left`, right
2. **Fill in spiral order**:
   - Fill top row (left to right), then shrink top boundary
   - Fill right column (top to bottom), then shrink right boundary
   - Fill bottom row (right to left), then shrink bottom boundary
   - Fill left column (bottom to top), then shrink left boundary
3. **Continue until all cells filled**

### WHY THIS WORKS:
- We systematically fill layer by layer from outside to inside
- Boundary tracking ensures we don't overlap or miss cells
- The spiral pattern naturally fills all n² positions

### EXAMPLE WALKTHROUGH:
```
`n` = 3:
Step 1: Fill top row    [1,2,3]
                        [0,0,0]
                        [0,0,0]

Step 2: Fill `right` col  [1,2,3]
                        [0,0,4]
                        [0,0,5]

Step 3: Fill bottom row [1,2,3]
                        [0,0,4]
                        [7,6,5]

Step 4: Fill `left` col   [1,2,3]
                        [8,0,4]
                        [7,6,5]

Step 5: Fill center     [1,2,3]
                        [8,9,4]
                        [7,6,5]
```

### COMPLEXITY:
- Time: O(n²) - fill each cell exactly once
- Space: O(1) - only using output matrix

</details>
"""

def generateMatrix(n):
    """
    Generate an n x n matrix filled with elements from 1 to n² in spiral order.

    Args:
        n: int - positive integer representing matrix size

    Returns:
        List[List[int]] - n x n matrix filled in spiral order
    """
    if n <= 0:
        return []

    # Initialize n x n matrix with zeros
    matrix = [[0] * n for _ in range(n)]

    # Define boundaries
    top, bottom = 0, n - 1
    left, right = 0, n - 1

    num = 1

    while top <= bottom and left <= right:
        # Fill top row (left to right)
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        top += 1

        # Fill right column (top to bottom)
        for row in range(top, bottom + 1):
            matrix[row][right] = num
            num += 1
        right -= 1

        # Fill bottom row (right to left) if we still have rows
        if top <= bottom:
            for col in range(right, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
            bottom -= 1

        # Fill left column (bottom to top) if we still have columns
        if left <= right:
            for row in range(bottom, top - 1, -1):
                matrix[row][left] = num
                num += 1
            left += 1

    return matrix


def test_generateMatrix():
    """Test cases for spiral matrix II."""
    # Test case 1: n = 1
    result1 = generateMatrix(1)
    expected1 = [[1]]
    assert result1 == expected1, f"Test 1 failed: expected {expected1}, got {result1}"

    # Test case 2: n = 3
    result2 = generateMatrix(3)
    expected2 = [[1,2,3],[8,9,4],[7,6,5]]
    assert result2 == expected2, f"Test 2 failed: expected {expected2}, got {result2}"

    # Test case 3: n = 4
    result3 = generateMatrix(4)
    expected3 = [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]
    assert result3 == expected3, f"Test 3 failed: expected {expected3}, got {result3}"

    # Test case 4: n = 2
    result4 = generateMatrix(2)
    expected4 = [[1,2],[4,3]]
    assert result4 == expected4, f"Test 4 failed: expected {expected4}, got {result4}"

    # Test case 5: n = 5
    result5 = generateMatrix(5)
    expected5 = [
        [1,2,3,4,5],
        [16,17,18,19,6],
        [15,24,25,20,7],
        [14,23,22,21,8],
        [13,12,11,10,9]
    ]
    assert result5 == expected5, f"Test 5 failed: expected {expected5}, got {result5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_generateMatrix()