"""
# Difficulty: Medium

# 033. Search In Rotated Sorted Array

There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[4, 5, 6, 7, 0, 1, 2], target = 0</dd>
<dt>Output:</dt>
<dd>4</dd>
<dt>Explanation:</dt>
<dd>Target 0 is found at index 4 in rotated sorted array [4,5,6,7,0,1,2]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The array has two sorted portions. At each binary search step, determine which half is properly sorted by comparing mid with left/right. Then check if target falls within the sorted half's range. If yes, search that half; otherwise search the other half.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(nums) - 1 for binary search boundaries
2. **Binary search loop**: While left <= right, calculate mid = (left + right) // 2
3. **Check for target**: If nums[mid] == target, return mid immediately
4. **Identify sorted half**: Compare nums[left] with nums[mid] to determine which half is properly sorted
5. **Check target in sorted half**: If left half sorted and target in range [nums[left], nums[mid]], search left (right = mid - 1)
6. **Otherwise search other half**: If target not in sorted half, search the unsorted half (left = mid + 1 or right = mid - 1)
7. **Handle right half sorted**: Similarly check if right half is sorted and if target falls in its range
8. **Return -1**: If loop completes without finding target, return -1

### WHY THIS WORKS:
- At least one half of array (left or right of mid) is always properly sorted
- Comparing nums[left] with nums[mid] reveals which half is sorted
- If target in sorted half's range, binary search that half; otherwise search other half
- Each iteration halves search space, maintaining O(log n) time
- Works because rotation preserves sorted order within each half, just shifts the pivot point

### EXAMPLE WALKTHROUGH:
```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: Initialize
  left = 0, right = 6
  mid = 3, nums[3] = 7

Step 2: Check mid
  nums[3] = 7 ≠ 0
  Left half [4,5,6,7] is sorted (4 ≤ 7)
  Is target in [4,7]? No (0 < 4)
  Search right half: left = 4

Step 3: left = 4, right = 6
  mid = 5, nums[5] = 1
  nums[5] = 1 ≠ 0
  Right half [1,2] is sorted (1 < 4, so left is NOT sorted)
  Is target in [1,2]? No (0 < 1)
  Search left half: right = 4

Step 4: left = 4, right = 4
  mid = 4, nums[4] = 0
  Found target!

Output: 4
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
    def search(self, nums: List[int], target: int) -> int:
        """
        Search for target in a rotated sorted array.

        Args:
            nums: List[int] - The rotated sorted array
            target: int - The value to search for

        Returns:
            int - Index of target if found, -1 if not found

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if not nums:
            return -1

        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2

            # If we found the target
            if nums[mid] == target:
                return mid

            # Check if left half is sorted
            if nums[left] <= nums[mid]:
                # Check if target is in left half
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            # Right half must be sorted
            else:
                # Check if target is in right half
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1

        return -1


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.search([4, 5, 6, 7, 0, 1, 2], target=0)
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.search([], 0)
    expected = -1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 033. Search In Rotated Sorted Array")
