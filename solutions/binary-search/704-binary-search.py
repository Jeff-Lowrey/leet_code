I'll help you create a complete binary search implementation in Python that meets all the requirements. Here's the solution:

```python
#!/usr/bin/env python3
"""
Binary Search Implementation in Python
LeetCode Problem 704: Binary Search

This module implements the binary search algorithm to find a target value
in a sorted array of integers.

Time Complexity: O(log n)
Space Complexity: O(1)
"""

from typing import List


def binary_search(nums: List[int], target: int) -> int:
    """
    Performs binary search to find target in a sorted array.
    
    Args:
        nums: A sorted array of integers
        target: The value to search for
    
    Returns:
        int: Index of target if found, -1 if not found
    """
    # Initialize the left and right pointers
    left = 0
    right = len(nums) - 1
    
    # Continue searching while the pointers haven't crossed
    while left <= right:
        # Calculate the middle index
        # Using (left + right) // 2 can cause integer overflow
        # This formula is safer
        mid = left + (right - left) // 2
        
        # If we found the target, return its index
        if nums[mid] == target:
            return mid
        
        # If target is greater, ignore left half
        elif nums[mid] < target:
            left = mid + 1
            
        # If target is smaller, ignore right half
        else:
            right = mid - 1
    
    # Target was not found
    return -1


def main():
    """
    Main function to test the binary search implementation
    """
    # Test cases
    test_cases = [
        {
            'nums': [-1, 0, 3, 5, 9, 12],
            'target': 9,
            'expected': 4
        },
        {
            'nums': [-1, 0, 3, 5, 9, 12],
            'target': 2,
            'expected': -1
        },
        {
            'nums': [1],
            'target': 1,
            'expected': 0
        },
        {
            'nums': [],
            'target': 5,
            'expected': -1
        }
    ]
    
    # Run test cases
    for i, test in enumerate(test_cases, 1):
        result = binary_search(test['nums'], test['target'])
        status = "PASSED" if result == test['expected'] else "FAILED"
        print(f"Test {i}: {status}")
        print(f"Input: nums = {test['nums']}, target = {test['target']}")
        print(f"Expected: {test['expected']}, Got: {result}\n")


if __name__ == "__main__":
    main()
```

This implementation includes:

1. Clear documentation and comments explaining the code
2. Type hints for better code readability and IDE support
3. A robust binary search implementation that handles edge cases
4. Test cases to verify the implementation
5. Main function to run and demonstrate the code
6. Proper Python conventions and best practices

The binary search algorithm works by repeatedly dividing the search interval in half. It maintains two pointers (left and right) and compares the middle element with the target value. Based on the comparison, it eliminates half of the remaining elements and continues the search in the appropriate half.

The implementation:
- Handles empty arrays
- Works with arrays of any size
- Returns -1 when the target is not found
- Uses safe arithmetic to avoid integer overflow
- Has O(log n) time complexity
- Has O(1) space complexity

You can run this file directly to see the test cases in action.