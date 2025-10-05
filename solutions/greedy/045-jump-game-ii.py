I'll help you implement the Jump Game II solution in Python. Here's the complete implementation with comments and proper structure:

```python
#!/usr/bin/env python3
"""
Jump Game II - Python Implementation

Problem: Given an array of non-negative integers nums, you are initially positioned at the first index.
Each element in the array represents your maximum jump length at that position.
Your goal is to reach the last index in the minimum number of jumps.

Example:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. 
Jump 1 step from index 0 to 1, then 3 steps to the last index.
"""

from typing import List


class Solution:
    def jump(self, nums: List[int]) -> int:
        """
        Calculates the minimum number of jumps needed to reach the last index.
        
        Args:
            nums: List of non-negative integers representing maximum jump lengths
            
        Returns:
            int: Minimum number of jumps needed to reach the last index
            
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Handle edge cases
        if not nums or len(nums) <= 1:
            return 0
            
        # Initialize variables
        jumps = 0          # Count of jumps taken
        current_max = 0    # Maximum index that can be reached with current jumps
        next_max = 0      # Maximum index that can be reached with jumps + 1
        
        # Iterate through the array (except last element)
        for i in range(len(nums) - 1):
            # Update the farthest position we can reach
            next_max = max(next_max, i + nums[i])
            
            # If we've reached the current maximum position
            # we need to take another jump
            if i == current_max:
                jumps += 1
                current_max = next_max
                
                # If we can already reach the end, break
                if current_max >= len(nums) - 1:
                    break
                    
        return jumps


def test_jump_game():
    """
    Test function to verify the implementation
    """
    solution = Solution()
    
    # Test cases
    test_cases = [
        ([2,3,1,1,4], 2),
        ([2,3,0,1,4], 2),
        ([1], 0),
        ([1,2], 1),
        ([1,1,1,1], 3)
    ]
    
    # Run tests
    for nums, expected in test_cases:
        result = solution.jump(nums)
        assert result == expected, f"Test failed for {nums}. Expected {expected}, got {result}"
        print(f"Test passed for {nums}. Result: {result}")


if __name__ == "__main__":
    # Run tests
    test_jump_game()
```

This implementation includes:

1. A complete solution to the Jump Game II problem using a greedy approach
2. Proper type hints and documentation
3. Efficient implementation with O(n) time complexity and O(1) space complexity
4. Test cases to verify the implementation
5. Clear comments explaining the logic
6. Proper handling of edge cases
7. Following Python best practices and PEP 8 conventions

The solution uses a greedy approach where we keep track of:
- The current maximum reach (current_max)
- The next maximum reach (next_max)
- The number of jumps taken

The algorithm makes optimal jumps by looking ahead at each position and updating the maximum reachable position. When we reach the current maximum position, we take a jump and update our current maximum to the next maximum we've found.

You can save this file as `generated/GD-045-PY_jump_game_ii___python_implementation.py` and run it directly to test the implementation.