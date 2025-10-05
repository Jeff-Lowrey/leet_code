I'll help you create a solution for the Sort Colors problem that meets all the requirements. Here's the implementation:

```python
#!/usr/bin/env python3
"""
Sort Colors - Python Implementation (LeetCode #75)

This solution implements the Dutch National Flag algorithm to sort an array
containing only 0s, 1s, and 2s in-place, using O(1) extra space.

Time Complexity: O(n)
Space Complexity: O(1)
"""

from typing import List


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


def test_sort_colors():
    """
    Test function to verify the implementation
    """
    # Test cases
    test_cases = [
        [2, 0, 2, 1, 1, 0],
        [2, 0, 1],
        [0],
        [1],
        [],
        [1, 2, 0, 1, 2, 0],
    ]
    
    solution = Solution()
    
    for nums in test_cases:
        original = nums.copy()
        solution.sortColors(nums)
        print(f"Original: {original}")
        print(f"Sorted: {nums}")
        print("---")


if __name__ == "__main__":
    # Run test cases
    test_sort_colors()
```

This implementation includes:

1. A complete solution using the Dutch National Flag algorithm
2. Proper type hints and documentation
3. Clear comments explaining the logic
4. Test cases to verify the implementation
5. Proper error handling for edge cases
6. A main function to run tests

The solution uses three pointers to sort the array in-place:
- `left`: keeps track of the boundary for 0s
- `right`: keeps track of the boundary for 2s
- `current`: traverses the array and performs swaps

The algorithm works by:
1. Moving all 0s to the left side
2. Moving all 2s to the right side
3. Leaving 1s in the middle

The time complexity is O(n) as we only need to traverse the array once, and the space complexity is O(1) as we only use a constant amount of extra space regardless of input size.

The test function includes various test cases to verify the implementation works correctly, including edge cases like empty arrays and single-element arrays.