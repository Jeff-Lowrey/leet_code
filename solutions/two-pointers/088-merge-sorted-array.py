I'll help you create a solution for the Merge Sorted Array problem. I'll write a clean, well-commented implementation that follows Python best practices.

```python
#!/usr/bin/env python3
"""
Merge Sorted Array - LeetCode Problem Solution

This module provides a solution to merge two sorted arrays in-place.
The first array has enough space at the end to accommodate the second array.

Time Complexity: O(m + n) where m and n are the lengths of the input arrays
Space Complexity: O(1) as we modify the array in-place
"""

from typing import List


class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Merge nums2 into nums1 as one sorted array in-place.
        
        Args:
            nums1: First array with extra space at end (length = m + n)
            m: Number of elements in nums1 (excluding extra space)
            nums2: Second array to be merged
            n: Number of elements in nums2
            
        Returns:
            None (modifies nums1 in-place)
        """
        # Initialize pointers for the end of both arrays
        p1 = m - 1  # Last element in nums1
        p2 = n - 1  # Last element in nums2
        p = m + n - 1  # Last position in merged array

        # While there are elements to compare in both arrays
        while p2 >= 0 and p1 >= 0:
            if nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1

        # If there are remaining elements in nums2
        while p2 >= 0:
            nums1[p] = nums2[p2]
            p2 -= 1
            p -= 1


def test_merge_sorted_array():
    """
    Test function to verify the merge implementation.
    """
    # Test case 1: Normal case
    nums1 = [1, 2, 3, 0, 0, 0]
    nums2 = [2, 5, 6]
    Solution().merge(nums1, 3, nums2, 3)
    assert nums1 == [1, 2, 2, 3, 5, 6], f"Test case 1 failed: {nums1}"

    # Test case 2: Empty nums1
    nums1 = [0]
    nums2 = [1]
    Solution().merge(nums1, 0, nums2, 1)
    assert nums1 == [1], f"Test case 2 failed: {nums1}"

    # Test case 3: Empty nums2
    nums1 = [1]
    nums2 = []
    Solution().merge(nums1, 1, nums2, 0)
    assert nums1 == [1], f"Test case 3 failed: {nums1}"

    print("All test cases passed!")


if __name__ == "__main__":
    # Run the test cases
    test_merge_sorted_array()
```

This implementation includes:

1. A clean, well-structured solution to the merge sorted array problem
2. Proper type hints and documentation
3. Clear comments explaining the logic
4. Test cases to verify the implementation
5. Efficient in-place merging algorithm
6. Handling of edge cases (empty arrays)

The solution uses a three-pointer approach to merge the arrays from the end, which is more efficient than merging from the beginning as it avoids shifting elements.

The algorithm:
1. Starts from the end of both arrays
2. Compares elements from both arrays
3. Places the larger element at the end of nums1
4. Continues until all elements are merged
5. Handles any remaining elements from nums2

The test cases verify:
1. Normal case with mixed elements
2. Edge case with empty first array
3. Edge case with empty second array

You can run this file directly to execute the tests and verify the implementation works correctly.