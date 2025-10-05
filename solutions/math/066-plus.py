I'll help you create a solution for the "Plus One" problem. I'll write a complete Python implementation that follows best practices and includes proper documentation.

```python
#!/usr/bin/env python3
"""
Plus One - LeetCode Problem Implementation

Given a non-empty array of decimal digits representing a non-negative integer,
increment the integer by one and return the resulting array of digits.

Example:
    Input: digits = [1,2,3]
    Output: [1,2,4]
    Explanation: The array represents the integer 123, incrementing by one gives 124.
"""

from typing import List


class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        """
        Add one to the number represented by the digits array.
        
        Args:
            digits (List[int]): Array of digits representing a non-negative integer
            
        Returns:
            List[int]: Resulting array after adding one to the number
            
        Time Complexity: O(n) where n is the length of digits
        Space Complexity: O(1) in most cases, O(n) when new digit needs to be added
        """
        n = len(digits)
        
        # Iterate from right to left
        for i in range(n - 1, -1, -1):
            # If current digit is less than 9, simply increment and return
            if digits[i] < 9:
                digits[i] += 1
                return digits
            # If current digit is 9, set it to 0 and continue to next digit
            digits[i] = 0
        
        # If we're here, it means we need to add a new digit
        # (e.g., 999 -> 1000)
        return [1] + digits


def test_plus_one():
    """
    Test function to verify the solution with various test cases.
    """
    solution = Solution()
    
    # Test cases
    test_cases = [
        ([1, 2, 3], [1, 2, 4]),
        ([4, 3, 2, 1], [4, 3, 2, 2]),
        ([9], [1, 0]),
        ([9, 9], [1, 0, 0]),
        ([0], [1])
    ]
    
    # Run tests
    for i, (input_digits, expected) in enumerate(test_cases):
        result = solution.plusOne(input_digits.copy())
        assert result == expected, f"Test case {i + 1} failed: expected {expected}, got {result}"
        print(f"Test case {i + 1} passed: {input_digits} -> {result}")


if __name__ == "__main__":
    # Run tests when script is executed
    test_plus_one()
```

This implementation includes:

1. A complete solution to the "Plus One" problem
2. Proper type hints using the typing module
3. Comprehensive docstrings explaining the functionality
4. A test function with various test cases
5. Clean code structure following Python conventions
6. Efficient implementation with O(n) time complexity
7. Proper handling of edge cases (e.g., numbers ending in 9)

The solution handles the following cases:
- Regular increment (e.g., 123 -> 124)
- Numbers ending in 9 (e.g., 129 -> 130)
- All nines case (e.g., 999 -> 1000)
- Single digit numbers (e.g., 9 -> 10)

The code is structured as a complete, runnable file that can be executed directly to run the tests or imported as a module to use the Solution class.