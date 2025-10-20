"""
# Difficulty: Medium

# 162. Find Peak Element

A peak element is an element that is strictly greater than its neighbors.

Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in O(log n) time.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[1,2,3,1]</dd>
<dt>Output:</dt>
<dd>2 (index of peak element)</dd>
<dt>Explanation:</dt>
<dd>Peak element 4 is at index 2 in array [1,2,4,3]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
A peak must exist because edges are considered smaller. Use binary search: if nums[mid] < nums[mid+1], a peak exists to the right (upward slope); otherwise a peak exists to the left or at mid (downward slope). Always converges to a peak.

### APPROACH:
1. **Initialize binary search**: Set left = 0, right = len(nums) - 1
2. **Loop until convergence**: While left < right, calculate mid = (left + right) // 2
3. **Compare with neighbor**: Check if nums[mid] > nums[mid + 1]
4. **Peak in left half**: If nums[mid] > nums[mid + 1], peak is in left half including mid, set right = mid
5. **Peak in right half**: Otherwise, peak is in right half, set left = mid + 1
6. **Converge to peak**: Continue until left == right
7. **Return peak index**: Return left (or right, they're equal) as the peak element index

### WHY THIS WORKS:
- Binary search: if nums[mid] < nums[mid+1], peak must be on right
- If nums[mid] > nums[mid+1], peak on left (mid could be peak)
- Works because adjacent elements are unequal (guaranteed peak exists)
- Doesn't need to check all elements, just finds any peak
- O(log n) time, O(1) space

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,2,3,1]
Step 1: Initialize binary search
  left = 0, right = 3

Step 2: Binary search for peak
  mid = 1: nums[1]=2 < nums[2]=3
  → Peak is on right, left = 2

  mid = 2: nums[2]=3 > nums[3]=1
  → Peak could be at mid or left, right = 2

  left = right = 2

Step 3: Check result
  nums[2] = 3 is greater than neighbors (2 and 1)

Output: 2 (index of peak element)
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
    def findPeakElement(self, nums: List[int]) -> int:
        """
        Finds a peak element in the array using binary search.

        Args:
            nums: List of integers where we need to find a peak element

        Returns:
            Index of any peak element in the array

        Example:
            >>> s = Solution()
            >>> s.findPeakElement([1,2,3,1])
            2
            >>> s.findPeakElement([1,2,1,3,5,6,4])
            5
        """
        # Handle edge cases
        if not nums:
            return -1
        if len(nums) == 1:
            return 0

        left, right = 0, len(nums) - 1

        # Binary search implementation
        while left < right:
            mid = left + (right - left) // 2

            # If mid element is less than next element,
            # peak must be on the right side
            if nums[mid] < nums[mid + 1]:
                left = mid + 1
            # If mid element is greater than next element,
            # peak must be on the left side or at mid
            else:
                right = mid

        return left


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findPeakElement([1, 2, 3, 1])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Single element
    result = solution.findPeakElement([1])
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Multiple peaks - any is valid
    result = solution.findPeakElement([1, 2, 1, 3, 5, 6, 4])
    # Result could be index 1 or 5 (both are peaks)
    assert result in [1, 5], f"Expected 1 or 5, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 162. Find Peak Element")
