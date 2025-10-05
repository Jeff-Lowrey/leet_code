I'll help you create a solution for finding the range of a target number in a sorted array. Here's the implementation:

```python
#!/usr/bin/env python3
"""
Find Range - Python Implementation

This module provides a solution to find the starting and ending positions
of a target value in a sorted array.

Time Complexity: O(log n)
Space Complexity: O(1)
"""

from typing import List


def find_range(nums: List[int], target: int) -> List[int]:
    """
    Find the starting and ending positions of a target value in a sorted array.
    
    Args:
        nums: A sorted array of integers
        target: The target value to search for
    
    Returns:
        A list containing the starting and ending positions of the target value.
        Returns [-1, -1] if target is not found.
    """
    def find_bound(is_left: bool) -> int:
        """
        Binary search helper to find left or right boundary.
        
        Args:
            is_left: Boolean indicating whether to find left or right boundary
        
        Returns:
            Index of the boundary position
        """
        left, right = 0, len(nums) - 1
        boundary = -1
        
        while left <= right:
            mid = (left + right) // 2
            
            if nums[mid] == target:
                boundary = mid
                if is_left:
                    right = mid - 1  # Continue searching left
                else:
                    left = mid + 1   # Continue searching right
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
                
        return boundary
    
    # Handle empty array case
    if not nums:
        return [-1, -1]
    
    # Find left and right boundaries
    left_bound = find_bound(True)
    
    # If target not found, return [-1, -1]
    if left_bound == -1:
        return [-1, -1]
    
    # Find right boundary
    right_bound = find_bound(False)
    
    return [left_bound, right_bound]


def main():
    """
    Main function to test the implementation.
    """
    # Test cases
    test_cases = [
        ([5,7,7,8,8,10], 8),
        ([5,7,7,8,8,10], 6),
        ([], 0),
        ([1], 1),
        ([1,1,1,1,1], 1)
    ]
    
    # Run test cases
    for nums, target in test_cases:
        result = find_range(nums, target)
        print(f"Array: {nums}")
        print(f"Target: {target}")
        print(f"Range: {result}")
        print()


if __name__ == "__main__":
    main()
```

This implementation provides a solution to find the starting and ending positions of a target value in a sorted array. Here's a breakdown of the key components:

1. The main function `find_range` takes a sorted array and a target value as input and returns a list containing the starting and ending positions.

2. A helper function `find_bound` implements binary search to find either the leftmost or rightmost occurrence of the target value.

3. The solution handles various edge cases:
   - Empty array
   - Target not found in array
   - Single element array
   - Multiple occurrences of target

4. The implementation uses binary search for efficiency, resulting in O(log n) time complexity.

5. The code includes test cases in the main function to demonstrate usage.

Key features:
- Clean and efficient implementation
- Proper type hints
- Comprehensive documentation
- Handle edge cases
- Follow Python conventions
- Includes test cases

To use this code, you can either:
1. Import and use the `find_range` function in your code
2. Run the file directly to see test cases in action

The solution will find the range of any target value in a sorted array efficiently.