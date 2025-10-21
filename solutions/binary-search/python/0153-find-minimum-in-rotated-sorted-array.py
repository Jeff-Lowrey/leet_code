"""
# Difficulty: Medium

# 153. Find Minimum In Rotated Sorted Array

Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[4,5,6,7,0,1,2]</dd>
<dt>Output:</dt>
<dd>0 (minimum element)</dd>
<dt>Explanation:</dt>
<dd>Minimum element 1 is found in rotated array [3,4,5,1,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Two Pointers
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Two Pointers Pattern, Greedy Algorithm
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The minimum element is where the rotation occurs. Compare mid with right: if nums[mid] > nums[right], minimum is in the right half; otherwise it's in the left half (including mid). This handles both rotated and non-rotated cases.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(nums) - 1
2. **Binary search loop**: While left < right, calculate mid = (left + right) // 2
3. **Compare mid with right**: Check if nums[mid] > nums[right] to determine rotation position
4. **Minimum in right half**: If nums[mid] > nums[right], minimum is in right half, set left = mid + 1
5. **Minimum in left half**: Otherwise, minimum is in left half (including mid), set right = mid
6. **Converge to minimum**: Continue until left == right
7. **Return result**: Return nums[left] as the minimum element

### WHY THIS WORKS:
- Binary search: minimum is at rotation point
- If nums[mid] > nums[right], minimum in right half (left = mid + 1)
- Else minimum in left half including mid (right = mid)
- When left == right, found minimum
- O(log n) time, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4,5,6,7,0,1,2]
Step 1: Check if array is rotated
  nums[0]=4 > nums[-1]=2 → Array is rotated

Step 2: Binary search for minimum
  left = 0, right = 6
  mid = 3: nums[3]=7 > nums[6]=2
  → Minimum is in right half, left = 3

  left = 3, right = 6
  mid = 4: nums[4]=0 < nums[6]=2
  → Minimum could be at mid or left, right = 4

  left = 3, right = 4
  right - left = 1 → return min(nums[3], nums[4]) = min(7, 0) = 0

Output: 0 (minimum element)
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
    """
    Solution class for finding the minimum element in a rotated sorted array.

    The array is originally sorted in ascending order but has been rotated
    between 1 and n times.
    """

    def findMin(self, nums: List[int]) -> int:
        """
        Finds the minimum element in a rotated sorted array using binary search.

        Args:
            nums: List[int] - Input array that was originally sorted then rotated

        Returns:
            int - The minimum element in the array

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        # Handle edge cases
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]

        # If array is not rotated (already sorted)
        if nums[0] < nums[-1]:
            return nums[0]

        left, right = 0, len(nums) - 1

        # Binary search implementation
        while left <= right:
            # If we're down to two elements, return the minimum
            if right - left <= 1:
                return min(nums[left], nums[right])

            mid = (left + right) // 2

            # If mid element is greater than right element,
            # minimum must be in right half
            if nums[mid] > nums[right]:
                left = mid
            # If mid element is less than right element,
            # minimum must be in left half (including mid)
            else:
                right = mid

        return nums[left]


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findMin([4, 5, 6, 7, 0, 1, 2])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single element
    result = solution.findMin([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Not rotated array
    result = solution.findMin([1, 2, 3, 4, 5])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 153. Find Minimum In Rotated Sorted Array")
