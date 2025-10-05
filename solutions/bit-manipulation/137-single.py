I'll help you implement a solution for the Single Number II problem. This solution will find the number that appears only once in an array where all other numbers appear exactly three times.

```python
#!/usr/bin/env python3
"""
Single Number II - Python Implementation

Problem: Given an array where every element appears three times except for one element
which appears only once, find that single element.

Example:
Input: [2,2,3,2]
Output: 3

Input: [0,1,0,1,0,1,99]
Output: 99
"""

from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Find the single number that appears only once while others appear three times.
        
        Args:
            nums: List of integers where all numbers except one appear three times
            
        Returns:
            The number that appears only once
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Initialize ones and twos for bit manipulation
        ones = 0
        twos = 0
        
        for num in nums:
            # First appearance: add to ones
            # Second appearance: remove from ones, add to twos
            # Third appearance: remove from twos
            ones = (ones ^ num) & ~twos
            twos = (twos ^ num) & ~ones
            
        return ones


def test_single_number():
    """Test cases for the singleNumber function."""
    solution = Solution()
    
    # Test case 1
    assert solution.singleNumber([2, 2, 3, 2]) == 3
    
    # Test case 2
    assert solution.singleNumber([0, 1, 0, 1, 0, 1, 99]) == 99
    
    # Test case 3
    assert solution.singleNumber([1]) == 1
    
    # Test case 4
    assert solution.singleNumber([1, 1, 1, 4]) == 4
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Run test cases
    test_single_number()
    
    # Example usage
    solution = Solution()
    example_input = [2, 2, 3, 2]
    result = solution.singleNumber(example_input)
    print(f"Input: {example_input}")
    print(f"Single number: {result}")
```

This implementation includes:

1. A clean and efficient solution using bit manipulation
2. Proper type hints and documentation
3. Clear comments explaining the logic
4. Test cases to verify the implementation
5. Example usage in the main block
6. Proper error handling through the algorithm design

The solution uses a bit manipulation approach that:
- Keeps track of bits that have appeared once (ones) and twice (twos)
- Uses XOR and AND operations to maintain the count of appearances
- Returns the number that appears only once

The time complexity is O(n) where n is the length of the input array, and the space complexity is O(1) as we only use two variables regardless of input size.

The code includes test cases to verify the implementation works correctly for various scenarios and follows Python best practices and conventions.