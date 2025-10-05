I'll help you implement a solution for the Combination Sum II problem. I'll create a clean, well-documented implementation that follows Python best practices.

```python
#!/usr/bin/env python3
"""
Combination Sum II - Python Implementation

This module provides a solution for finding all unique combinations of numbers
that sum to a target value, where each number can only be used once.

Example:
    Input: candidates = [10,1,2,7,6,1,5], target = 8
    Output: [[1,1,6], [1,2,5], [1,7], [2,6]]
"""

from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations of numbers that sum to target.
        
        Args:
            candidates: List of candidate numbers
            target: Target sum to achieve
            
        Returns:
            List of all unique combinations that sum to target
        """
        # Sort candidates to handle duplicates and enable early termination
        candidates.sort()
        result = []
        
        def backtrack(curr: List[int], pos: int, remain: int) -> None:
            """
            Recursive backtracking helper function.
            
            Args:
                curr: Current combination being built
                pos: Current position in candidates array
                remain: Remaining sum to achieve
            """
            if remain == 0:
                # Found a valid combination
                result.append(curr[:])
                return
            
            for i in range(pos, len(candidates)):
                # Skip duplicates to avoid duplicate combinations
                if i > pos and candidates[i] == candidates[i-1]:
                    continue
                    
                # Early termination if current number is too large
                if candidates[i] > remain:
                    break
                    
                # Include current number and recurse
                curr.append(candidates[i])
                backtrack(curr, i + 1, remain - candidates[i])
                curr.pop()  # Backtrack by removing the last number
        
        backtrack([], 0, target)
        return result


def test_combination_sum2():
    """Test function to verify the implementation."""
    solution = Solution()
    
    # Test case 1
    candidates1 = [10, 1, 2, 7, 6, 1, 5]
    target1 = 8
    expected1 = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]
    result1 = solution.combinationSum2(candidates1, target1)
    assert sorted(result1) == sorted(expected1), f"Test case 1 failed: {result1}"
    
    # Test case 2
    candidates2 = [2, 5, 2, 1, 2]
    target2 = 5
    expected2 = [[1, 2, 2], [5]]
    result2 = solution.combinationSum2(candidates2, target2)
    assert sorted(result2) == sorted(expected2), f"Test case 2 failed: {result2}"
    
    print("All test cases passed!")


if __name__ == "__main__":
    test_combination_sum2()
```

This implementation includes:

1. A clear module docstring explaining the purpose of the code
2. Type hints using the typing module
3. A Solution class with the main combinationSum2 method
4. A helper backtracking function for the recursive implementation
5. Comprehensive comments explaining the logic
6. Test cases to verify the implementation
7. Proper handling of edge cases and duplicates
8. Efficient implementation using sorting and early termination

The solution uses a backtracking approach with the following optimizations:
- Sorting the candidates array to handle duplicates and enable early termination
- Skipping duplicate numbers at the same level to avoid duplicate combinations
- Early termination when the current number is too large

The code follows Python best practices and conventions, including:
- Proper indentation
- Meaningful variable names
- Type hints
- Docstrings for functions
- Clear code structure
- Test cases for verification

When run, it will execute the test cases and verify the implementation works correctly.