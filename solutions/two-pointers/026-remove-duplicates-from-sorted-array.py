I'll help you create a Python implementation for removing duplicates from a sorted array. I'll create a complete solution that meets the requirements and handles edge cases.

```python
#!/usr/bin/env python3
"""
Remove Duplicates from Sorted Array - Python Implementation
This module provides a solution to remove duplicates from a sorted array in-place.

The implementation modifies the input array directly and returns the number of unique elements.
"""

from typing import List


def remove_duplicates(nums: List[int]) -> int:
    """
    Remove duplicates from a sorted array in-place and return the number of unique elements.
    
    Args:
        nums: A sorted array of integers
        
    Returns:
        int: The number of unique elements in the array
        
    Example:
        >>> nums = [1, 1, 2, 2, 3, 4, 4]
        >>> k = remove_duplicates(nums)
        >>> print(k, nums[:k])
        4 [1, 2, 3, 4]
    """
    # Handle edge cases
    if not nums:
        return 0
    if len(nums) == 1:
        return 1
    
    # Initialize pointer for unique elements
    unique_pos = 1
    
    # Iterate through the array starting from the second element
    for i in range(1, len(nums)):
        # If current element is different from previous element
        if nums[i] != nums[i - 1]:
            # Place the current element at the unique_pos position
            nums[unique_pos] = nums[i]
            unique_pos += 1
    
    return unique_pos


def main():
    """
    Main function to demonstrate the remove_duplicates functionality.
    """
    # Test cases
    test_cases = [
        [1, 1, 2],
        [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
        [],
        [1],
        [1, 1, 1, 1, 1],
    ]
    
    # Run test cases
    for nums in test_cases:
        original = nums.copy()
        k = remove_duplicates(nums)
        print(f"Original array: {original}")
        print(f"After removing duplicates: {nums[:k]}")
        print(f"Number of unique elements: {k}")
        print("-" * 50)


if __name__ == "__main__":
    main()
```

This implementation includes:

1. A well-documented `remove_duplicates` function that:
   - Takes a sorted array as input
   - Removes duplicates in-place
   - Returns the number of unique elements
   - Handles edge cases (empty array, single element)

2. A `main` function that demonstrates the usage with various test cases

3. Proper type hints and docstrings following Python conventions

4. Clear comments explaining the logic

5. Edge case handling

The solution uses a two-pointer technique to remove duplicates in-place, which is memory efficient as it doesn't require additional space proportional to the input size.

The code follows PEP 8 style guidelines and includes proper error handling. It can be run directly as a script or imported as a module in other Python programs.

To use this code:
1. Save it to the specified path
2. Run it directly to see the test cases in action
3. Import the `remove_duplicates` function to use it in other code

The time complexity is O(n) where n is the length of the input array, and the space complexity is O(1) as it modifies the array in-place.