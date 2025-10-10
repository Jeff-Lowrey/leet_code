"""
# Difficulty: Easy

# 566. Reshape The Matrix

In MATLAB, there is a handy function called reshape which can reshape an m x n matrix
into a new one with a different size r x c keeping its original data.

You are given an m x n matrix mat and two integers r and c representing the number of
rows and the number of columns of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in
the same row-traversing order as they were.

If the reshape operation with given parameters is possible and legal, output the new
reshaped matrix; otherwise, output the original matrix.

Example 1:
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]

Example 2:
Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]]

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
Reshape is only possible if the total number of elements remains the same.
Flatten the matrix conceptually, then redistribute elements into new dimensions.
Use division and modulo to convert between 1D and 2D indices.

### APPROACH:
1. **Validation**: Check if m × n = r × c (same total elements)
2. **If Invalid**: Return original matrix
3. **If Valid**: Map elements using index conversion
   - 1D index: idx = i * n + j
   - 2D position in new matrix: row = idx // c, col = idx % c
4. **Fill Result**: Place each element at its new position

**Key Insight**: Index mapping
- Every element can be identified by a linear index (0 to total-1)
- This linear index maps to different 2D coordinates in different shapes

### WHY THIS WORKS:
- Row-major order is preserved when we use sequential indexing
- Division gives the row position in new matrix
- Modulo gives the column position in new matrix
- This naturally handles the reshape transformation

### EXAMPLE WALKTHROUGH:
```
mat = [[1,2],[3,4]], r = 1, c = 4

Original shape: 2×2, New shape: 1×4
Total elements: 4 = 4 ✓ (valid)

Linear indices: [0,1,2,3] → [1,2,3,4]

Mapping to 1×4:
- idx 0: row = 0//4 = 0, col = 0%4 = 0 → result[0][0] = 1
- idx 1: row = 1//4 = 0, col = 1%4 = 1 → result[0][1] = 2
- idx 2: row = 2//4 = 0, col = 2%4 = 2 → result[0][2] = 3
- idx 3: row = 3//4 = 0, col = 3%4 = 3 → result[0][3] = 4

Result: [[1,2,3,4]]
```

### TIME COMPLEXITY:
O(m × n)
- Must process each element once

### SPACE COMPLEXITY:
O(r × c)
- Need to store the reshaped matrix (same size as original)

### EDGE CASES:
- Invalid reshape (different total): Return original matrix
- Same shape: Return copy or original
- Single element: [[1]] can reshape to [[1]]
- Single row/column: Can reshape to column/row with same elements

</details>
"""

class Solution:
    def matrixReshape(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:
        """
        Reshape matrix if possible using index mapping.

        Args:
            mat: m x n matrix
            r: Target number of rows
            c: Target number of columns

        Returns:
            Reshaped r x c matrix or original if impossible

        Time Complexity: O(m × n)
        Space Complexity: O(r × c)
        """
        m, n = len(mat), len(mat[0])

        # Validate: total elements must be the same
        if m * n != r * c:
            return mat

        result = [[0] * c for _ in range(r)]

        # Map each element from old to new position
        for i in range(m):
            for j in range(n):
                # Calculate linear index
                idx = i * n + j

                # Convert to new 2D position
                new_row = idx // c
                new_col = idx % c

                result[new_row][new_col] = mat[i][j]

        return result

    def matrixReshapeFlatten(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:
        """
        Alternative approach: Flatten then reshape.

        More intuitive but uses extra space for flattened array.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n + r × c)
        """
        m, n = len(mat), len(mat[0])

        if m * n != r * c:
            return mat

        # Flatten to 1D array
        flat = []
        for row in mat:
            flat.extend(row)

        # Reshape: take chunks of size c
        result = []
        for i in range(r):
            result.append(flat[i * c : (i + 1) * c])

        return result

    def matrixReshapeGenerator(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:
        """
        Pythonic approach using generator and list comprehension.

        Time Complexity: O(m × n)
        Space Complexity: O(r × c)
        """
        m, n = len(mat), len(mat[0])

        if m * n != r * c:
            return mat

        # Generator to yield elements in row-major order
        def elements():
            for row in mat:
                yield from row

        gen = elements()

        # Build result using list comprehension
        result = [[next(gen) for _ in range(c)] for _ in range(r)]

        return result

    def matrixReshapeOneLiner(self, mat: list[list[int]], r: int, c: int) -> list[list[int]]:
        """
        Ultra-compact one-liner approach (Pythonic but less readable).

        Time Complexity: O(m × n)
        Space Complexity: O(r × c)
        """
        m, n = len(mat), len(mat[0])

        if m * n != r * c:
            return mat

        flat = [val for row in mat for val in row]
        return [flat[i * c : (i + 1) * c] for i in range(r)]

def test_solution():
    """Test cases for Problem 566."""
    solution = Solution()

    # Test case 1: Reshape 2x2 to 1x4
    mat1 = [[1, 2], [3, 4]]
    r1, c1 = 1, 4
    expected1 = [[1, 2, 3, 4]]
    assert solution.matrixReshape(mat1, r1, c1) == expected1, "Test case 1 failed"

    # Test case 2: Invalid reshape (different total)
    mat2 = [[1, 2], [3, 4]]
    r2, c2 = 2, 4
    expected2 = [[1, 2], [3, 4]]
    assert solution.matrixReshape(mat2, r2, c2) == expected2, "Test case 2 failed"

    # Test case 3: Reshape 1x4 to 2x2
    mat3 = [[1, 2, 3, 4]]
    r3, c3 = 2, 2
    expected3 = [[1, 2], [3, 4]]
    assert solution.matrixReshape(mat3, r3, c3) == expected3, "Test case 3 failed"

    # Test case 4: Reshape 2x2 to 4x1
    mat4 = [[1, 2], [3, 4]]
    r4, c4 = 4, 1
    expected4 = [[1], [2], [3], [4]]
    assert solution.matrixReshape(mat4, r4, c4) == expected4, "Test case 4 failed"

    # Test case 5: Same shape
    mat5 = [[1, 2], [3, 4]]
    r5, c5 = 2, 2
    expected5 = [[1, 2], [3, 4]]
    assert solution.matrixReshape(mat5, r5, c5) == expected5, "Test case 5 failed"

    # Test case 6: Single element
    mat6 = [[1]]
    r6, c6 = 1, 1
    expected6 = [[1]]
    assert solution.matrixReshape(mat6, r6, c6) == expected6, "Test case 6 failed"

    # Test case 7: Larger matrix
    mat7 = [[1, 2, 3, 4], [5, 6, 7, 8]]
    r7, c7 = 4, 2
    expected7 = [[1, 2], [3, 4], [5, 6], [7, 8]]
    assert solution.matrixReshape(mat7, r7, c7) == expected7, "Test case 7 failed"

    # Test flatten method
    mat8 = [[1, 2], [3, 4]]
    expected8 = [[1, 2, 3, 4]]
    assert solution.matrixReshapeFlatten(mat8, 1, 4) == expected8, "Flatten method failed"

    # Test generator method
    mat9 = [[1, 2, 3, 4]]
    expected9 = [[1, 2], [3, 4]]
    assert solution.matrixReshapeGenerator(mat9, 2, 2) == expected9, "Generator method failed"

    # Test one-liner method
    mat10 = [[1, 2], [3, 4]]
    expected10 = [[1], [2], [3], [4]]
    assert solution.matrixReshapeOneLiner(mat10, 4, 1) == expected10, "One-liner method failed"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 566. Reshape The Matrix ===\n")

    # Example 1: Reshape 2x2 to 1x4
    mat1 = [[1, 2], [3, 4]]
    print("Original matrix (2x2):")
    for row in mat1:
        print(row)
    result1 = solution.matrixReshape(mat1, 1, 4)
    print("\nReshaped to 1x4:")
    for row in result1:
        print(row)
    print()

    # Example 2: Reshape 1x6 to 2x3
    mat2 = [[1, 2, 3, 4, 5, 6]]
    print("Original matrix (1x6):")
    for row in mat2:
        print(row)
    result2 = solution.matrixReshape(mat2, 2, 3)
    print("\nReshaped to 2x3:")
    for row in result2:
        print(row)
    print()

    # Example 3: Invalid reshape
    mat3 = [[1, 2], [3, 4]]
    print("Original matrix (2x2):")
    for row in mat3:
        print(row)
    result3 = solution.matrixReshape(mat3, 2, 4)
    print("\nTrying to reshape to 2x4 (invalid - 4 != 8):")
    for row in result3:
        print(row)
    print("(Returned original matrix as reshape is impossible)")
