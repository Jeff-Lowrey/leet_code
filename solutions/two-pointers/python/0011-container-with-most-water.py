"""
# Difficulty: Medium

# 011. Container With Most Water

You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>height = [1, 8, 6, 2, 5, 4, 8, 3, 7]</dd>
<dt>Output:</dt>
<dd>49</dd>
<dt>Explanation:</dt>
<dd>Maximum water container area is 49 with heights [1,8,6,2,5,4,8,3,7]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Two Pointers, Binary Search
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Hash Table Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use two pointers from both ends. Calculate area = min(height[left], height[right]) * width. Move pointer with smaller height inward (moving taller pointer can't increase area). Track maximum.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(height) - 1
2. **Initialize max area**: Set max_area = 0
3. **Loop while left < right**: Continue until pointers meet
4. **Calculate area**: area = min(height[left], height[right]) * (right - left)
5. **Update maximum**: max_area = max(max_area, area)
6. **Move pointer**: If height[left] < height[right], increment left; else decrement right
7. **Return result**: Return max_area as maximum water container

### WHY THIS WORKS:
- Two pointers: left at start, right at end
- Area = min(height[left], height[right]) * (right - left)
- Move pointer with shorter height: taller height won't improve area until we find taller opposite
- Track maximum area seen
- O(n) time: single pass, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
```

Step 1: Initialize
left = 0 (height=1), right = 8 (height=7)
max_area = 0
Step 2: First iteration
width = 8 - 0 = 8
min_height = min(1, 7) = 1
area = 8 × 1 = 8
max_area = 8
Move left pointer (smaller height)
left = 1
Step 3: left=1 (height=8), right=8 (height=7)
width = 8 - 1 = 7
min_height = min(8, 7) = 7
area = 7 × 7 = 49
max_area = 49
Move right pointer (smaller height)
right = 7
Step 4: left=1 (height=8), right=7 (height=3)
width = 7 - 1 = 6
min_height = min(8, 3) = 3
area = 6 × 3 = 18
max_area = 49 (no change)
Move right pointer
right = 6
Step 5: Continue until left >= right...

Output:
```
49
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from typing import List, Optional, Dict, Tuple
import re


class Solution:
    def maxArea(self, height: List[int]) -> int:
        """
        Calculate the maximum area of water that can be contained between two vertical lines.

        Args:
            height: List of integers representing heights of vertical lines

        Returns:
            Maximum area of water that can be contained
        """
        # Initialize pointers and maximum area
        left = 0
        right = len(height) - 1
        max_area = 0

        # Use two-pointer technique to find maximum area
        while left < right:
            # Calculate current area
            # Area = width * minimum height between two lines
            current_area = (right - left) * min(height[left], height[right])

            # Update maximum area if current area is larger
            max_area = max(max_area, current_area)

            # Move the pointer with smaller height inward
            # This is optimal because moving the larger height pointer
            # would only decrease the area
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])
    expected = 49
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.maxArea([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.maxArea([1])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 011. Container With Most Water")
