"""
# Difficulty: Medium

# 0042. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>height = [0,1,0,2,1,0,1,3,2,1,2,1]</dd>
<dt>Output:</dt>
<dd>6 (total water trapped)</dd>
<dt>Explanation:</dt>
<dd>Rain water trapped between heights [0,1,0,2,1,0,1,3,2,1,2,1] is 6 units</dd>
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
For each position, calculate trapped water = min(max_left, max_right) - height. Use two pointers from both ends. Track max heights seen. Move pointer with smaller max height inward.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(height) - 1
2. **Track max heights**: Set left_max = 0, right_max = 0
3. **Initialize water count**: Set water = 0
4. **Loop while left < right**: Continue until pointers meet
5. **Process shorter side**: If height[left] < height[right], process left
6. **Update max and water**: If height[left] >= left_max, update left_max; else add (left_max - height[left]) to water
7. **Move pointer**: Increment left or decrement right based on which side processed
8. **Return result**: Return water as total trapped water

### WHY THIS WORKS:
- Water level at any position determined by min(left_max, right_max) - height
- Two pointers work inward from edges tracking max heights seen so far
- Process side with smaller max first: its water amount is already determined by the smaller max
- Other side's larger max guarantees it won't limit water on current side
- Single pass O(n) time replaces two-pass array approach, O(1) space instead of O(n)

### EXAMPLE WALKTHROUGH:
Input:
```
height = [0,1,0,2,1,0,1,3,2,1,2,1]
```

Step 1: Calculate max heights
left_max = [0,1,1,2,2,2,2,3,3,3,3,3]
right_max = [3,3,3,3,3,3,3,3,2,2,2,1]
Step 2: Calculate water at each position
i=2: min(1,3)-0 = 1
i=4: min(2,3)-1 = 1
i=5: min(2,3)-0 = 2
...

Output:
```
6 (total water trapped)
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


class Solution:
    def trap(self, height: List[int]) -> int:
        """
        Calculate the amount of water that can be trapped between blocks.

        Args:
            height: List of integers representing the height of each block

        Returns:
            Integer representing the total amount of water that can be trapped

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Edge case: if array is empty or has less than 3 elements
        if not height or len(height) < 3:
            return 0

        # Initialize pointers and variables
        left = 0
        right = len(height) - 1
        left_max = right_max = water = 0

        # Use two pointer technique to calculate trapped water
        while left < right:
            # Update maximum height from left
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            # Update maximum height from right
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1

        return water


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.trap([1, 2, 3])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.trap([])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.trap([1])
    expected = 0
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 042. Trapping Rain Water")
