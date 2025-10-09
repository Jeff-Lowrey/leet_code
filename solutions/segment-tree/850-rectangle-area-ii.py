"""
# Difficulty: Hard

# 850. Rectangle Area II

You are given a 2D array of axis-aligned rectangles. Each rectangle[i] = [xi1, yi1, xi2, yi2] denotes the ith rectangle where (xi1, yi1) are the coordinates of the bottom-left corner, and (xi2, yi2) are the coordinates of the top-right corner.

Calculate the total area covered by all rectangles in the plane. Any area covered by two or more rectangles should only be counted once.

Return the total area. Since the answer may be too large, return it modulo 10^9 + 7.

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
This is a classic computational geometry problem. The challenge is handling overlapping rectangles efficiently. We can use a sweep line algorithm with segment trees, or coordinate compression with a 2D grid approach.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
```
Input: [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Unique X coords: [0,1,2,3]
Unique Y coords: [0,1,2,3]

Grid cells covered:
[0,1]×[0,1]: covered by rect 0
[1,2]×[0,1]: covered by rects 0,1,2
[1,2]×[1,2]: covered by rects 0,1
[1,2]×[2,3]: covered by rect 1
[2,3]×[0,1]: covered by rect 2

Total area = 1 + 1 + 1 + 1 + 1 + 1 = 6
```

### TIME COMPLEXITY:
- Sweep Line: O(n² log n)
- Coordinate Compression: O(n²)

### SPACE COMPLEXITY:
O(n)
For coordinate storage and data structures

### EDGE CASES:
- No rectangles
- Single rectangle
- Completely overlapping rectangles
- Non-overlapping rectangles
- Large coordinates (use modulo)

</details>
"""

class Solution:
    def rectangleArea(self, rectangles: list[list[int]]) -> int:
        """
        Calculate total area using coordinate compression.

        Args:
            rectangles: List of [x1, y1, x2, y2] rectangles

        Returns:
            Total area covered modulo 10^9 + 7

        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        MOD = 10**9 + 7

        if not rectangles:
            return 0

        # Extract unique coordinates
        x_coords = set()
        y_coords = set()
        for x1, y1, x2, y2 in rectangles:
            x_coords.add(x1)
            x_coords.add(x2)
            y_coords.add(y1)
            y_coords.add(y2)

        x_sorted = sorted(x_coords)
        y_sorted = sorted(y_coords)

        # Create coordinate mappings
        x_map = {x: i for i, x in enumerate(x_sorted)}
        y_map = {y: i for i, y in enumerate(y_sorted)}

        # Mark grid cells as covered
        n_x = len(x_sorted)
        n_y = len(y_sorted)
        grid = [[False] * (n_y - 1) for _ in range(n_x - 1)]

        # Mark all cells covered by each rectangle
        for x1, y1, x2, y2 in rectangles:
            for i in range(x_map[x1], x_map[x2]):
                for j in range(y_map[y1], y_map[y2]):
                    grid[i][j] = True

        # Calculate total area
        area = 0
        for i in range(n_x - 1):
            for j in range(n_y - 1):
                if grid[i][j]:
                    width = x_sorted[i + 1] - x_sorted[i]
                    height = y_sorted[j + 1] - y_sorted[j]
                    area = (area + width * height) % MOD

        return area

    def rectangleAreaSweepLine(self, rectangles: list[list[int]]) -> int:
        """
        Calculate total area using sweep line algorithm.

        Args:
            rectangles: List of [x1, y1, x2, y2] rectangles

        Returns:
            Total area covered modulo 10^9 + 7

        Time Complexity: O(n² log n)
        Space Complexity: O(n)
        """
        MOD = 10**9 + 7

        if not rectangles:
            return 0

        # Create events: (x, y1, y2, type) where type: 1=start, -1=end
        events = []
        for x1, y1, x2, y2 in rectangles:
            events.append((x1, y1, y2, 1))  # Rectangle starts
            events.append((x2, y1, y2, -1))  # Rectangle ends

        # Sort events by x-coordinate
        events.sort()

        def calculate_y_coverage(active_intervals):
            """Calculate total Y coverage from active intervals."""
            if not active_intervals:
                return 0

            # Merge overlapping intervals
            intervals = sorted(active_intervals)
            total = 0
            current_start, current_end = intervals[0]

            for start, end in intervals[1:]:
                if start <= current_end:
                    # Overlapping or adjacent
                    current_end = max(current_end, end)
                else:
                    # Non-overlapping
                    total += current_end - current_start
                    current_start, current_end = start, end

            total += current_end - current_start
            return total

        total_area = 0
        active_intervals = []  # List of (y1, y2) for active rectangles
        prev_x = events[0][0]

        for x, y1, y2, event_type in events:
            # Calculate area from prev_x to current x
            if x > prev_x and active_intervals:
                width = x - prev_x
                height = calculate_y_coverage(active_intervals)
                total_area = (total_area + width * height) % MOD

            # Update active intervals
            if event_type == 1:
                active_intervals.append((y1, y2))
            else:
                active_intervals.remove((y1, y2))

            prev_x = x

        return total_area

def test_solution():
    """Test cases for Problem 850."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.rectangleArea([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]])
    expected1 = 6
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Non-overlapping rectangles
    result2 = solution.rectangleArea([[0, 0, 1, 1], [2, 2, 3, 3]])
    expected2 = 2
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single rectangle
    result3 = solution.rectangleArea([[0, 0, 2, 2]])
    expected3 = 4
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Completely overlapping
    result4 = solution.rectangleArea([[0, 0, 2, 2], [0, 0, 2, 2]])
    expected4 = 4
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Partially overlapping
    result5 = solution.rectangleArea([[0, 0, 2, 2], [1, 1, 3, 3]])
    expected5 = 7  # 4 + 4 - 1 (overlap)
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test sweep line approach
    result6 = solution.rectangleAreaSweepLine([[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]])
    expected6 = 6
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Three rectangles in a row
    result7 = solution.rectangleArea([[0, 0, 1, 1], [1, 0, 2, 1], [2, 0, 3, 1]])
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Complex overlapping - recalculated
    result8 = solution.rectangleArea([[0, 0, 3, 3], [1, 1, 4, 4], [2, 2, 5, 5]])
    # Grid creates: actual area is 9 + 9 + 9 - overlaps = 19
    expected8 = 19
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    solution = Solution()
    print("=== 850. Rectangle Area II ===")

    test_cases = [
        [[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]],
        [[0, 0, 1, 1], [2, 2, 3, 3]],
        [[0, 0, 2, 2], [1, 1, 3, 3]],
    ]

    for rectangles in test_cases:
        print(f"\nInput: {rectangles}")

        # Show both approaches
        result_grid = solution.rectangleArea(rectangles[:])
        result_sweep = solution.rectangleAreaSweepLine(rectangles[:])

        print(f"Coordinate Compression: {result_grid}")
        print(f"Sweep Line:             {result_sweep}")

    # Detailed walkthrough
    print("\nDetailed example: [[0,0,2,2],[1,0,2,3],[1,0,3,1]]")
    rectangles = [[0, 0, 2, 2], [1, 0, 2, 3], [1, 0, 3, 1]]

    # Extract coordinates
    x_coords = set()
    y_coords = set()
    for x1, y1, x2, y2 in rectangles:
        x_coords.add(x1)
        x_coords.add(x2)
        y_coords.add(y1)
        y_coords.add(y2)

    x_sorted = sorted(x_coords)
    y_sorted = sorted(y_coords)

    print(f"Unique X coordinates: {x_sorted}")
    print(f"Unique Y coordinates: {y_sorted}")

    # Show grid
    print("\nGrid cells:")
    for i in range(len(x_sorted) - 1):
        for j in range(len(y_sorted) - 1):
            x1, x2 = x_sorted[i], x_sorted[i + 1]
            y1, y2 = y_sorted[j], y_sorted[j + 1]

            # Check which rectangles cover this cell
            covered_by = []
            for idx, (rx1, ry1, rx2, ry2) in enumerate(rectangles):
                if rx1 <= x1 < x2 <= rx2 and ry1 <= y1 < y2 <= ry2:
                    covered_by.append(idx)

            if covered_by:
                area = (x2 - x1) * (y2 - y1)
                print(f"  [{x1},{x2})×[{y1},{y2}): area={area}, covered by {covered_by}")

    print(f"\nTotal area: {solution.rectangleArea(rectangles)}")

    # Performance comparison
    print("\nApproach complexities:")
    print("Coordinate Compression: O(n²) time, O(n) space")
    print("Sweep Line:             O(n² log n) time, O(n) space")
    print("\nNote: Result is modulo 10^9 + 7 for large areas")
