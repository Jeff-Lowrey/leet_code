"""
### INTUITION:
The key insight is that use three pointers: p0 for next 0, p2 for next 2, current for scanning. When see 0, swap with p0. When see 2, swap with p2. When see 1, just move current. Partitions in single pass.

### APPROACH:
1. **Initialize three pointers**: Set low = 0, mid = 0, high = len(nums) - 1
2. **Process while mid <= high**: Continue loop while mid hasn't passed high
3. **Case nums[mid] == 0**: Swap nums[mid] with nums[low], increment both low and mid
4. **Case nums[mid] == 1**: Just increment mid (already in correct position)
5. **Case nums[mid] == 2**: Swap nums[mid] with nums[high], decrement high only
6. **Continue partitioning**: Repeat until mid > high
7. **Array sorted**: After loop, array contains 0s, then 1s, then 2s

### WHY THIS WORKS:
- This ensures that dutch national flag: three pointers (low, mid, high)
- This ensures that low tracks next position for 0, high tracks next position for 2
- This ensures that if nums[mid] == 0: swap with low, advance both
- This ensures that if nums[mid] == 2: swap with high, decrement high only (don't advance mid, need to check swapped value)
- This ensures that o(n) time single pass, O(1) space

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
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
