I'll help you implement a solution for Permutations II in Python. This solution will handle duplicate numbers in the input array and generate unique permutations.

```python
#!/usr/bin/env python3
"""
Permutations II - Python Implementation

This module provides a solution for generating unique permutations of a list
that may contain duplicate numbers.

Example:
    Input: nums = [1,1,2]
    Output: [[1,1,2], [1,2,1], [2,1,1]]
"""

from typing import List
from collections import Counter


class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible unique permutations of the input array.
        
        Args:
            nums: List of integers (may contain duplicates)
            
        Returns:
            List of lists containing all unique permutations
        
        Time Complexity: O(n!)
        Space Complexity: O(n)
        """
        # Handle empty input
        if not nums:
            return []
        
        def backtrack(counter: Counter, temp_perm: List[int], n: int) -> None:
            """
            Helper function for backtracking to generate permutations.
            
            Args:
                counter: Counter object containing remaining numbers
                temp_perm: Current permutation being built
                n: Target length of permutation
            """
            # Base case: if current permutation is complete
            if len(temp_perm) == n:
                result.append(temp_perm[:])
                return
            
            # Try each unique number from counter
            for num in counter:
                if counter[num] > 0:
                    # Add current number to permutation
                    temp_perm.append(num)
                    counter[num] -= 1
                    
                    # Recursive call
                    backtrack(counter, temp_perm, n)
                    
                    # Backtrack
                    temp_perm.pop()
                    counter[num] += 1
        
        result = []
        # Create counter for frequency of each number
        counter = Counter(nums)
        backtrack(counter, [], len(nums))
        return result


def test_permute_unique():
    """Test function to verify the implementation."""
    solution = Solution()
    
    # Test case 1: List with duplicates
    assert sorted(solution.permuteUnique([1, 1, 2])) == sorted([[1, 1, 2], 
                                                               [1, 2, 1], 
                                                               [2, 1, 1]])
    
    # Test case 2: List with all unique elements
    assert sorted(solution.permuteUnique([1, 2, 3])) == sorted([[1, 2, 3], 
                                                               [1, 3, 2], 
                                                               [2, 1, 3],
                                                               [2, 3, 1], 
                                                               [3, 1, 2], 
                                                               [3, 2, 1]])
    
    # Test case 3: Empty list
    assert solution.permuteUnique([]) == []
    
    # Test case 4: Single element
    assert solution.permuteUnique([1]) == [[1]]
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_permute_unique()
```

This implementation includes:

1. A `Solution` class with the main `permuteUnique` method that generates unique permutations
2. A helper `backtrack` function that uses backtracking to build permutations
3. Use of `Counter` from collections to handle duplicate numbers efficiently
4. Comprehensive test cases to verify the implementation
5. Clear documentation and comments explaining the approach
6. Proper type hints and docstrings
7. Edge case handling (empty input, single element)

The solution uses a backtracking approach with the following key features:
- Uses Counter to keep track of number frequencies
- Avoids generating duplicate permutations by using Counter
- Maintains time complexity of O(n!) and space complexity of O(n)
- Follows Python best practices and PEP 8 guidelines

The test cases verify the solution works for:
- Lists with duplicates
- Lists with unique elements
- Empty lists
- Single-element lists

You can run this file directly to execute the tests and verify the implementation works correctly.