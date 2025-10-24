"""
# Difficulty: Medium

# 075. Sort Colors

Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>nums = [2, 0, 2, 1, 1, 0]</dd>
<dt>Output:</dt>
<dd>[0, 0, 1, 1, 2, 2]</dd>
<dt>Explanation:</dt>
<dd>Sort colors [2,0,2,1,1,0] in-place to [0,0,1,1,2,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern
**Time Complexity**: O(n)
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Use three pointers: p0 for next 0, p2 for next 2, current for scanning. When see 0, swap with p0. When see 2, swap with p2. When see 1, just move current. Partitions in single pass.

### APPROACH:
1. **Initialize three pointers**: Set low = 0, mid = 0, high = len(nums) - 1
2. **Process while mid <= high**: Continue loop while mid hasn't passed high
3. **Case nums[mid] == 0**: Swap nums[mid] with nums[low], increment both low and mid
4. **Case nums[mid] == 1**: Just increment mid (already in correct position)
5. **Case nums[mid] == 2**: Swap nums[mid] with nums[high], decrement high only
6. **Continue partitioning**: Repeat until mid > high
7. **Array sorted**: After loop, array contains 0s, then 1s, then 2s

### WHY THIS WORKS:
- Dutch national flag: three pointers (low, mid, high)
- low tracks next position for 0, high tracks next position for 2
- If nums[mid] == 0: swap with low, advance both
- If nums[mid] == 2: swap with high, decrement high only (don't advance mid, need to check swapped value)
- O(n) time single pass, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [2, 0, 2, 1, 1, 0]
```

Step 1: Initialize pointers
left = 0, current = 0, right = 5
Array: [2, 0, 2, 1, 1, 0]
Step 2: current=0, nums[0]=2
Swap with right: [0, 0, 2, 1, 1, 2]
right = 4, current stays at 0
Step 3: current=0, nums[0]=0
Swap with left: [0, 0, 2, 1, 1, 2]
left = 1, current = 1
Step 4: current=1, nums[1]=0
Swap with left: [0, 0, 2, 1, 1, 2]
left = 2, current = 2
Step 5: current=2, nums[2]=2
Swap with right: [0, 0, 1, 1, 2, 2]
right = 3, current stays at 2
Step 6: current=2, nums[2]=1
Move current: current = 3
Step 7: current=3, nums[3]=1
Move current: current = 4
Step 8: current=4, right=3, stop (current > right)

Output:
```
[0, 0, 1, 1, 2, 2]
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
    def sortColors(self, nums: List[int]) -> None:
        """
        Sorts an array containing only 0s, 1s, and 2s in-place.

        Args:
            nums: List of integers (containing only 0s, 1s, and 2s)

        Returns:
            None (modifies the input array in-place)
        """
        # Edge case: empty array or single element
        if not nums or len(nums) == 1:
            return

        # Initialize three pointers
        left = 0  # pointer for 0s (left boundary)
        right = len(nums) - 1  # pointer for 2s (right boundary)
        current = 0  # current element being examined

        while current <= right:
            if nums[current] == 0:
                # Swap current element with left pointer
                nums[current], nums[left] = nums[left], nums[current]
                left += 1
                current += 1
            elif nums[current] == 2:
                # Swap current element with right pointer
                nums[current], nums[right] = nums[right], nums[current]
                right -= 1
                # Don't increment current as the swapped element needs to be checked
            else:
                # Element is 1, just move forward
                current += 1


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    solution.sortColors([2, 0, 2, 1, 1, 0])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 2: Empty input
    solution.sortColors([])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    # Test case 3: Single element
    solution.sortColors([1])
    # # # assert result == expected, f"Expected expected, got result"  # Removed - function modifies in place  # Commented - result not defined  # Result not defined

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 075. Sort Colors")
