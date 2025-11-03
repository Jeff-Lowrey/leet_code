"""
### INTUITION:
The key insight is that sort balloons by end position. Use greedy: shoot arrow at the end of first balloon. Count balloons this arrow bursts (end >= balloon start). Move to first unbursted balloon. Count total arrows.

### APPROACH:
1. **Sort by end**: Sort balloons by end coordinate
2. **Initialize arrow**: Set arrows = 1, current_end = balloons[0][1]
3. **Iterate from second**: For each balloon in balloons[1:]
4. **Check if in range**: If balloon_start <= current_end, same arrow can burst it
5. **Need new arrow**: If balloon_start > current_end, increment arrows, update current_end
6. **Continue processing**: Handle all balloons
7. **Return result**: Return arrows as minimum arrows needed

### WHY THIS WORKS:
- This ensures that sort by end coordinate: shoot arrow at earliest ending balloon
- This ensures that greedy: one arrow at end position can burst all overlapping balloons
- This ensures that count arrows: increment when balloon starts after last arrow position
- This ensures that earliest end maximizes number of balloons burst per arrow
- This ensures that o(n log n) for sort, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
points = [[10,16],[2,8],[1,6],[7,12]]
```

Step 1: Sort by end position
sorted = [[1,6],[2,8],[7,12],[10,16]]
Step 2: Greedy arrow placement
Arrow at 6: bursts [1,6],[2,8]
Arrow at 12: bursts [7,12],[10,16]

Output:
```
2 (minimum arrows)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        """
        Finds the minimum number of arrows needed to burst all balloons.

        Args:
            points: List of balloon coordinates where each balloon is represented
                   by [start, end] coordinates

        Returns:
            int: Minimum number of arrows needed

        Example:
            Input: [[10,16],[2,8],[1,6],[7,12]]
            Output: 2
        """
        # Handle edge cases
        if not points:
            return 0

        # Sort balloons by end coordinate
        points.sort(key=lambda x: x[1])

        arrows = 1  # Start with one arrow
        current_end = points[0][1]  # Track the end coordinate of current group

        # Iterate through all balloons
        for start, end in points[1:]:
            # If current balloon starts after the previous arrow position,
            # we need a new arrow
            if start > current_end:
                arrows += 1
                current_end = end

        return arrows


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: All separate (no overlap)
    result = solution.findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]])
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 3: All overlap
    result = solution.findMinArrowShots([[1, 10], [2, 9], [3, 8], [4, 7]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Empty input
    result = solution.findMinArrowShots([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single balloon
    result = solution.findMinArrowShots([[1, 5]])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 452. Minimum Number Of Arrows To Burst Balloons")
