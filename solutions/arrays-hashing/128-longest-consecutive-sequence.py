I'll help you implement a solution for the Longest Consecutive sequence problem. I'll create a clean, well-documented implementation that follows Python best practices.

```python
#!/usr/bin/env python3
"""
Longest Consecutive Sequence Implementation

This module provides a solution to find the length of the longest consecutive
sequence in an unsorted array of integers.

Example:
    Input: nums = [100,4,200,1,3,2]
    Output: 4
    Explanation: The longest consecutive sequence is [1,2,3,4]
"""

from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        """
        Find the length of the longest consecutive sequence in an unsorted array.
        
        Args:
            nums: List of integers (can be unsorted and contain duplicates)
            
        Returns:
            int: Length of the longest consecutive sequence
            
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0
        
        # Convert list to set for O(1) lookup
        num_set = set(nums)
        longest_streak = 0
        
        # Iterate through each number in the set
        for num in num_set:
            # Only start counting sequences from the smallest number in the sequence
            # If num-1 exists, this isn't the start of a sequence
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1
                
                # Count consecutive numbers
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1
                
                # Update longest streak if current streak is longer
                longest_streak = max(longest_streak, current_streak)
        
        return longest_streak


def test_longest_consecutive():
    """
    Test function to verify the implementation with various test cases.
    """
    solution = Solution()
    
    # Test case 1: Standard case
    assert solution.longestConsecutive([100,4,200,1,3,2]) == 4
    
    # Test case 2: Empty array
    assert solution.longestConsecutive([]) == 0
    
    # Test case 3: Single element
    assert solution.longestConsecutive([1]) == 1
    
    # Test case 4: No consecutive numbers
    assert solution.longestConsecutive([2,4,6,8]) == 1
    
    # Test case 5: Duplicate numbers
    assert solution.longestConsecutive([1,1,2,2,3,3]) == 3
    
    # Test case 6: Negative numbers
    assert solution.longestConsecutive([-3,-2,-1,0,1,2]) == 6
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Run the test cases
    test_longest_consecutive()
    
    # Example usage
    example_nums = [100,4,200,1,3,2]
    solution = Solution()
    result = solution.longestConsecutive(example_nums)
    print(f"Longest consecutive sequence length for {example_nums}: {result}")
```

This implementation includes:

1. A clear module docstring explaining the purpose and providing an example
2. Type hints using the typing module
3. A Solution class with the main implementation
4. Detailed comments explaining the algorithm and its complexity
5. A comprehensive test function with various test cases
6. Main block for example usage
7. Proper error handling for edge cases (empty input)
8. Efficient implementation using a set for O(1) lookups
9. Clean code structure following PEP 8 guidelines

The algorithm works by:
1. Converting the input list to a set for O(1) lookups
2. Finding the start of each sequence (numbers that don't have a predecessor)
3. Counting consecutive numbers from each sequence start
4. Keeping track of the longest sequence found

The solution handles various edge cases and has optimal time complexity of O(n) with space complexity of O(n).