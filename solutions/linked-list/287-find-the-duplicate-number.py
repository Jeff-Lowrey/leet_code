I'll help you create a solution for finding duplicates in Python. I'll implement this using Floyd's Tortoise and Hare (Cycle Detection) algorithm, which is an efficient solution for this problem.

```python
#!/usr/bin/env python3
"""
LeetCode 287: Find the Duplicate Number
Implementation of Floyd's Tortoise and Hare (Cycle Detection) algorithm
to find a duplicate number in an array where numbers are in range [1, n]
"""

from typing import List


class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        """
        Find the duplicate number in an array using Floyd's Cycle Detection.
        
        Args:
            nums: List[int] - Array containing n + 1 integers where each integer
                            is in the range [1, n] inclusive.
        
        Returns:
            int - The duplicate number in the array
        
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return -1
        
        # Phase 1: Finding the intersection point of the two runners
        tortoise = nums[0]
        hare = nums[0]
        
        # Move tortoise one step and hare two steps until they meet
        while True:
            tortoise = nums[tortoise]
            hare = nums[nums[hare]]
            if tortoise == hare:
                break
        
        # Phase 2: Finding the entrance to the cycle
        tortoise = nums[0]
        while tortoise != hare:
            tortoise = nums[tortoise]
            hare = nums[hare]
        
        return hare


def test_find_duplicate():
    """
    Test cases for the findDuplicate function
    """
    solution = Solution()
    
    # Test case 1: Basic case
    assert solution.findDuplicate([1, 3, 4, 2, 2]) == 2
    
    # Test case 2: Another basic case
    assert solution.findDuplicate([3, 1, 3, 4, 2]) == 3
    
    # Test case 3: Minimum case
    assert solution.findDuplicate([1, 1]) == 1
    
    # Test case 4: Larger array
    assert solution.findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1]) == 9
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Run the test cases
    test_find_duplicate()
```

This implementation includes:

1. A complete solution using Floyd's Cycle Detection algorithm
2. Proper type hints and documentation
3. Comprehensive test cases
4. Clear comments explaining the implementation
5. Efficient O(n) time complexity and O(1) space complexity
6. Error handling for edge cases

The algorithm works by treating the array as a linked list where each value points to an index. Since there's a duplicate number, there must be a cycle in this "linked list". The algorithm has two phases:

1. First phase finds the intersection point of the two runners (tortoise and hare)
2. Second phase finds the entrance of the cycle, which is the duplicate number

The solution handles the requirements by:
- Following Python best practices (PEP 8)
- Including type hints
- Providing comprehensive documentation
- Including test cases
- Handling edge cases
- Using an efficient algorithm

You can run this file directly to execute the test cases and verify the implementation works correctly.