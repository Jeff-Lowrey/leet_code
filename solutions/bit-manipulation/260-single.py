I'll help you create a solution for the Single Number III problem. This implementation will find two numbers that appear only once in an array where all other numbers appear exactly twice.

```python
#!/usr/bin/env python3
"""
Single Number III - Python Implementation

This module provides a solution to find two numbers that appear only once in an array
where all other numbers appear exactly twice.

Example:
    Input: [1,2,1,3,2,5]
    Output: [3,5]
"""

from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> List[int]:
        """
        Find two numbers that appear only once in the array.
        
        Args:
            nums: List of integers where all numbers except two appear twice
            
        Returns:
            List containing the two numbers that appear only once
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not nums:
            return []
        
        # Step 1: XOR all numbers together
        # This will give us XOR of two unique numbers (let's call them x and y)
        # because all other numbers appear twice and will cancel out
        xor_result = 0
        for num in nums:
            xor_result ^= num
            
        # Step 2: Find rightmost set bit in xor_result
        # This bit will be different in x and y
        rightmost_set_bit = 1
        while (xor_result & rightmost_set_bit) == 0:
            rightmost_set_bit <<= 1
            
        # Step 3: Divide numbers into two groups based on the rightmost set bit
        # One group will contain x and numbers that share same bit value
        # Other group will contain y and numbers that share same bit value
        x = y = 0
        for num in nums:
            if num & rightmost_set_bit:
                x ^= num
            else:
                y ^= num
                
        return [x, y]


def test_single_number():
    """
    Test function to verify the solution.
    """
    solution = Solution()
    
    # Test case 1: Basic case
    assert sorted(solution.singleNumber([1,2,1,3,2,5])) == [3,5]
    
    # Test case 2: Negative numbers
    assert sorted(solution.singleNumber([-1,0,-1,2])) == [0,2]
    
    # Test case 3: Minimal case
    assert sorted(solution.singleNumber([1,2])) == [1,2]
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Run test cases
    test_single_number()
    
    # Example usage
    solution = Solution()
    result = solution.singleNumber([1,2,1,3,2,5])
    print(f"Example input: [1,2,1,3,2,5]")
    print(f"Output: {result}")
```

This implementation provides a solution to the Single Number III problem with the following features:

1. Uses bit manipulation to achieve O(n) time complexity and O(1) space complexity
2. Includes detailed comments explaining the algorithm steps
3. Provides type hints for better code readability
4. Includes test cases to verify the solution
5. Follows Python best practices and conventions
6. Handles edge cases appropriately

The algorithm works in three main steps:
1. XOR all numbers together to get XOR of the two unique numbers
2. Find a bit that differs in the two unique numbers
3. Use that bit to separate numbers into two groups and XOR them separately

The solution is efficient and handles various cases including:
- Regular positive numbers
- Negative numbers
- Minimal input cases
- Empty input validation

The code is structured as a complete, runnable file with proper documentation and test cases.