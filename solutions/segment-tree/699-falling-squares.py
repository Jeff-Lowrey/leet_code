"""
# Difficulty: Hard

# 699. Falling Squares

There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array positions where positions[i] = [lefti, sideLengthi] represents the ith square with a side length of sideLengthi that is dropped with its left edge aligned with X-coordinate lefti.

Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands on the top side of another square or on the X-axis. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.

Return an integer array ans where ans[i] represents the height of the tallest stack of squares after dropping the ith square.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[2, 5, 5]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>After each square falls, the skyline heights are [2,5,5]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a range maximum query problem with updates. For each falling square, we need to find the maximum height in its range [left, right), then update that range with the new height. Segment trees with lazy propagation are perfect for this.

### APPROACH:
1. **Coordinate compression**: Extract all left and right boundaries from positions, create sorted mapping to compress coordinates
2. **Build segment tree**: Create segment tree with lazy propagation to handle range queries and updates efficiently
3. **Process each square**: For each falling square, determine its compressed coordinate range [left, right)
4. **Query max height**: Use segment tree to find maximum height in the square's landing range
5. **Calculate new height**: Add square's side length to the maximum height found to get new height at this position
6. **Update range**: Use lazy propagation to update all positions in range with the new height value
7. **Track and return heights**: After each square, query global maximum and add to result array

### WHY THIS WORKS:
The algorithm correctly solves the problem by systematically exploring all valid states while maintaining necessary invariants. Each step preserves correctness through careful state management, and the base cases handle edge conditions properly. The approach guarantees finding the solution (if one exists) by examining all possibilities or efficiently pruning invalid paths.

### EXAMPLE WALKTHROUGH:
```
Input: [[1,2],[2,3],[6,1]]
Square 1: [1,3) at height 0 → lands at 0, new height 2
Square 2: [2,5) overlaps [2,3), max height 2 → lands at 2, new height 5
Square 3: [6,7) no overlap → lands at 0, new height 1
Heights: [2, 5, 5]
```

### TIME COMPLEXITY:
O(n² log n)
Due to coordinate compression and segment tree operations

### SPACE COMPLEXITY:
O(n)
For coordinate mapping and tree structure

### EDGE CASES:
- Single square
- Non-overlapping squares
- Completely overlapping squares
- Squares with different sizes
- Large coordinate values

</details>
"""


from typing import Any
import re


class Solution:
    def fallingSquares(self, positions: list[list[int]]) -> list[int]:
        """
        Simulate falling squares using segment tree with coordinate compression.

        Args:
            positions: List of [left, sideLength] for each square

        Returns:
            List of maximum heights after each square drops

        Time Complexity: O(n² log n)
        Space Complexity: O(n)
        """
        if not positions:
            return []

        # Coordinate compression
        coords: set[Any] = set()
        for left, size in positions:
            coords.add(left)
            coords.add(left + size)

        sorted_coords = sorted(coords)
        coord_map = {c: i for i, c in enumerate(sorted_coords)}
        m = len(sorted_coords)

        class SegmentTree:
            def __init__(self: Any, n: Any) -> None:
                self.n = n
                self.tree = [0] * (4 * n)
                self.lazy = [0] * (4 * n)

            def push(self: Any, node: Any) -> Any:
                """Push lazy value down to children."""
                if self.lazy[node] != 0:
                    self.tree[2 * node] = self.lazy[node]
                    self.tree[2 * node + 1] = self.lazy[node]
                    self.lazy[2 * node] = self.lazy[node]
                    self.lazy[2 * node + 1] = self.lazy[node]
                    self.lazy[node] = 0

            def update(self: Any, node: Any, start: Any, end: Any, l: Any, r: Any, val: Any) -> Any:
                """Update range [l, r] to val."""
                if r < start or end < l:
                    return

                if l <= start and end <= r:
                    self.tree[node] = val
                    self.lazy[node] = val
                    return

                self.push(node)
                mid = (start + end) // 2
                self.update(2 * node, start, mid, l, r, val)
                self.update(2 * node + 1, mid + 1, end, l, r, val)
                self.tree[node] = max(self.tree[2 * node], self.tree[2 * node + 1])

            def query(self: Any, node: Any, start: Any, end: Any, l: Any, r: Any) -> Any:
                """Query maximum in range [l, r]."""
                if r < start or end < l:
                    return 0

                if l <= start and end <= r:
                    return self.tree[node]

                self.push(node)
                mid = (start + end) // 2
                left_max = self.query(2 * node, start, mid, l, r)
                right_max = self.query(2 * node + 1, mid + 1, end, l, r)
                return max(left_max, right_max)

        seg_tree = SegmentTree(m)
        result: list[Any] = []
        max_height = 0

        for left, size in positions:
            left_idx = coord_map[left]
            right_idx = coord_map[left + size] - 1  # Exclusive right becomes inclusive

            # Find max height in range
            curr_max = seg_tree.query(1, 0, m - 1, left_idx, right_idx)
            new_height = curr_max + size

            # Update range to new height
            seg_tree.update(1, 0, m - 1, left_idx, right_idx, new_height)

            # Track overall maximum
            max_height = max(max_height, new_height)
            result.append(max_height)

        return result

    def fallingSquaresBruteForce(self, positions: list[list[int]]) -> list[int]:
        """
        Brute force solution using list of intervals.

        Args:
            positions: List of [left, sideLength] for each square

        Returns:
            List of maximum heights after each square drops

        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        if not positions:
            return []

        intervals: list[tuple[int, int, int]] = []  # List of (left, right, height)
        result = []
        max_height = 0

        for left, size in positions:
            right = left + size
            curr_max = 0

            # Find max height in overlapping intervals
            for l, r, h in intervals:
                # Check if intervals overlap
                if l < right and left < r:
                    curr_max = max(curr_max, h)

            new_height = curr_max + size
            intervals.append((left, right, new_height))

            max_height = max(max_height, new_height)
            result.append(max_height)

        return result


def test_solution() -> None:
    """Test cases for Problem 699."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.fallingSquares([[1, 2], [2, 3], [6, 1]])
    expected1 = [2, 5, 5]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Another example
    result2 = solution.fallingSquares([[100, 100], [200, 100]])
    expected2 = [100, 100]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single square
    result3 = solution.fallingSquares([[1, 5]])
    expected3 = [5]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Stacking squares
    result4 = solution.fallingSquares([[1, 1], [1, 1], [1, 1]])
    expected4 = [1, 2, 3]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Non-overlapping squares
    result5 = solution.fallingSquares([[1, 2], [5, 2], [10, 2]])
    expected5 = [2, 2, 2]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test brute force approach
    result6 = solution.fallingSquaresBruteForce([[1, 2], [2, 3], [6, 1]])
    expected6 = [2, 5, 5]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Overlapping but not completely
    result7 = solution.fallingSquares([[1, 3], [2, 2], [3, 3]])
    expected7 = [3, 5, 8]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage and demonstration
    solution = Solution()
    print("=== 699. Falling Squares ===")

    test_cases = [
        [[1, 2], [2, 3], [6, 1]],
        [[100, 100], [200, 100]],
        [[1, 1], [1, 1], [1, 1]],
    ]

    for positions in test_cases:
        print(f"\nInput: {positions}")

        # Show both approaches
        result_seg = solution.fallingSquares(positions[:])
        result_brute = solution.fallingSquaresBruteForce(positions[:])

        print(f"Segment Tree: {result_seg}")
        print(f"Brute Force:  {result_brute}")

    # Detailed walkthrough
    print("\nDetailed example: [[1,2],[2,3],[6,1]]")
    positions = [[1, 2], [2, 3], [6, 1]]
    print("Simulating square drops:")

    intervals: list[Any] = []
    max_height = 0
    heights: list[Any] = []

    for i, (left, size) in enumerate(positions):
        right = left + size
        curr_max = 0

        for l, r, h in intervals:
            if l < right and left < r:
                curr_max = max(curr_max, h)

        new_height = curr_max + size
        intervals.append((left, right, new_height))
        max_height = max(max_height, new_height)
        heights.append(max_height)

        print(f"Square {i + 1}: [{left}, {right}) with size {size}")
        print(f"  Lands on height {curr_max}, new height = {new_height}")
        print(f"  Max overall height: {max_height}")

    print(f"Result: {heights}")

    # Performance comparison
    print("\nApproach complexities:")
    print("Segment Tree: O(n² log n) time, O(n) space")
    print("Brute Force:  O(n²) time, O(n) space")
