"""
### INTUITION:
The key insight is that for each cell, compute the average of itself and its 8 neighbors (or fewer if on edge).
The challenge is to use original values for all calculations, not partially smoothed values.

### APPROACH:
1. **Create Result Matrix**: Store smoothed values separately to avoid using partial results
2. **For Each Cell**: Calculate average of valid neighbors
3. **Neighbor Counting**: Check all 8 directions, count only valid cells
4. **Floor Division**: Use integer division for rounding down

**Key Pattern**: 3×3 filter with boundary handling
- Center cell + up to 8 neighbors
- Edge cells have fewer neighbors
- Corner cells have only 3 neighbors

### WHY THIS WORKS:
- Separate result matrix ensures we always use original values
- Direction array simplifies checking all 8 neighbors
- Boundary checks handle edges and corners automatically
- Integer division naturally floors the average

### EXAMPLE WALKTHROUGH:
Input:
```
[[1, 1, 1]
```

Input:
```
img = [[100,200,100],
```

[200,50,200],
[100,200,100]]
Cell [0,0] (corner, 4 cells):
Neighbors: [0,0], [0,1], [1,0], [1,1]
Sum: 100 + 200 + 200 + 50 = 550
Average: 550 // 4 = 137
Cell [1,1] (center, 9 cells):
Neighbors: all 9 cells
Sum+200+100+200+50+200+100+200+100 = 1250
Average // 9 = 138
Cell [0,1] (edge, 6 cells):
Neighbors: [0,0], [0,1], [0,2], [1,0], [1,1], [1,2]
Sum+200+100+200+50+200 = 850
Average // 6 = 141
Result: [[137,141,137],[141,138,141],[137,141,137]]

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
**O(m × n)**
- Visit each cell once, check constant number of neighbors

### SPACE COMPLEXITY:
**O(m × n)**
- Need separate result matrix (or **O(1)** with bit manipulation)

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""


class Solution:
    def imageSmoother(self, img: list[list[int]]) -> list[list[int]]:
        """
        Apply 3×3 averaging filter to smooth image.

        Args:
            img: m × n grayscale image

        Returns:
            Smoothed image

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(img), len(img[0])
        result = [[0] * n for _ in range(m)]

        # 8 directions + center
        directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 0), (0, 1), (1, -1), (1, 0), (1, 1)]

        for i in range(m):
            for j in range(n):
                total = 0
                count = 0

                # Check all neighbors and self
                for di, dj in directions:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < m and 0 <= nj < n:
                        total += img[ni][nj]
                        count += 1

                # Floor division for rounding down
                result[i][j] = total // count

        return result

    def imageSmootherCompact(self, img: list[list[int]]) -> list[list[int]]:
        """
        More compact version using max/min for boundary checks.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(img), len(img[0])
        result = [[0] * n for _ in range(m)]

        for i in range(m):
            for j in range(n):
                # Get valid neighbor range
                i_start, i_end = max(0, i - 1), min(m, i + 2)
                j_start, j_end = max(0, j - 1), min(n, j + 2)

                total = 0
                count = 0

                for ni in range(i_start, i_end):
                    for nj in range(j_start, j_end):
                        total += img[ni][nj]
                        count += 1

                result[i][j] = total // count

        return result

    def imageSmootherInPlace(self, img: list[list[int]]) -> list[list[int]]:
        """
        In-place solution using bit manipulation to store both old and new values.

        Each cell can hold values 0-255, so we can use higher bits for new value.

        Time Complexity: O(m × n)
        Space Complexity: O(1)
        """
        m, n = len(img), len(img[0])

        for i in range(m):
            for j in range(n):
                total = 0
                count = 0

                # Check all 3x3 neighbors
                for ni in range(max(0, i - 1), min(m, i + 2)):
                    for nj in range(max(0, j - 1), min(n, j + 2)):
                        # Extract original value (lower 8 bits)
                        total += img[ni][nj] & 0xFF
                        count += 1

                # Store new value in higher bits
                img[i][j] |= (total // count) << 8

        # Extract new values
        for i in range(m):
            for j in range(n):
                img[i][j] >>= 8

        return img

    def imageSmootherPadding(self, img: list[list[int]]) -> list[list[int]]:
        """
        Alternative using zero padding to simplify boundary handling.

        Time Complexity: O(m × n)
        Space Complexity: O(m × n)
        """
        m, n = len(img), len(img[0])

        # Create padded image
        padded = [[0] * (n + 2) for _ in range(m + 2)]
        for i in range(m):
            for j in range(n):
                padded[i + 1][j + 1] = img[i][j]

        result = [[0] * n for _ in range(m)]

        for i in range(m):
            for j in range(n):
                total = 0
                count = 0

                # Check 3x3 in padded image
                for pi in range(i, i + 3):
                    for pj in range(j, j + 3):
                        if padded[pi][pj] != 0 or (pi == i + 1 and pj == j + 1):
                            total += padded[pi][pj]
                            count += 1

                # Adjust count for padding (need to recalculate properly)
                # Actually, with padding we can simplify:
                total = sum(padded[pi][pj] for pi in range(i, i + 3) for pj in range(j, j + 3))
                # Count actual cells (not padding)
                count = 0
                for pi in range(i, i + 3):
                    for pj in range(j, j + 3):
                        # Check if original cell exists
                        if 0 <= pi - 1 < m and 0 <= pj - 1 < n:
                            count += 1

                result[i][j] = total // count if count > 0 else 0

        return result


def test_solution() -> None:
    """Test cases for Problem 661."""
    solution = Solution()

    # Test case 1: All ones with zero center
    img1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    expected1 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    assert solution.imageSmoother(img1) == expected1, "Test case 1 failed"

    # Test case 2: Larger values
    img2 = [[100, 200, 100], [200, 50, 200], [100, 200, 100]]
    expected2 = [[137, 141, 137], [141, 138, 141], [137, 141, 137]]
    assert solution.imageSmoother(img2) == expected2, "Test case 2 failed"

    # Test case 3: Single cell
    img3 = [[5]]
    expected3 = [[5]]
    assert solution.imageSmoother(img3) == expected3, "Test case 3 failed"

    # Test case 4: Single row
    img4 = [[1, 2, 3]]
    expected4 = [[1, 2, 2]]
    assert solution.imageSmoother(img4) == expected4, "Test case 4 failed"

    # Test case 5: Single column
    img5 = [[1], [2], [3]]
    expected5 = [[1], [2], [2]]
    assert solution.imageSmoother(img5) == expected5, "Test case 5 failed"

    # Test case 6: 2x2
    img6 = [[1, 1], [1, 1]]
    expected6 = [[1, 1], [1, 1]]
    assert solution.imageSmoother(img6) == expected6, "Test case 6 failed"

    # Test compact method
    img7 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    expected7 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    assert solution.imageSmootherCompact(img7) == expected7, "Compact method failed"

    # Test in-place method
    img8 = [[100, 200, 100], [200, 50, 200], [100, 200, 100]]
    expected8 = [[137, 141, 137], [141, 138, 141], [137, 141, 137]]
    assert solution.imageSmootherInPlace(img8) == expected8, "In-place method failed"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 661. Image Smoother ===\n")

    # Example 1
    img1 = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    print("Original image:")
    for row in img1:
        print(row)
    result1 = solution.imageSmoother(img1)
    print("\nSmoothed image:")
    for row in result1:
        print(row)
    print()

    # Example 2
    img2 = [[100, 200, 100], [200, 50, 200], [100, 200, 100]]
    print("Original image:")
    for row in img2:
        print(row)
    result2 = solution.imageSmoother(img2)
    print("\nSmoothed image:")
    for row in result2:
        print(row)
    print()

    # Demonstrate edge effects
    img3 = [[10, 20, 30, 40], [50, 60, 70, 80], [90, 100, 110, 120]]
    print("Original image (3x4):")
    for row in img3:
        print(row)
    result3 = solution.imageSmoother(img3)
    print("\nSmoothed image (note edge effects):")
    for row in result3:
        print(row)
    print("\nNotice:")
    print("- Corners use 4 cells for averaging")
    print("- Edges use 6 cells for averaging")
    print("- Interior uses 9 cells for averaging")
