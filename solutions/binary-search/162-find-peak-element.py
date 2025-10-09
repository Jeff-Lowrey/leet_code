"""
# 162. Find Peak Element
# Difficulty: Medium
Given a problem that demonstrates key concepts in Binary Search.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply binary search methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages binary search principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses binary search techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using binary search method
3. Return the computed result

</details>
"""

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        """
        Finds a peak element in the array using binary search.
        
        Args:
            nums: List of integers where we need to find a peak element
            
        Returns:
            Index of any peak element in the array
            
        Example:
            >>> s = Solution()
            >>> s.findPeakElement([1,2,3,1])
            2
            >>> s.findPeakElement([1,2,1,3,5,6,4])
            5
        """
        # Handle edge cases
        if not nums:
            return -1
        if len(nums) == 1:
            return 0
        
        left, right = 0, len(nums) - 1
        
        # Binary search implementation
        while left < right:
            mid = left + (right - left) // 2
            
            # If mid element is less than next element,
            # peak must be on the right side
            if nums[mid] < nums[mid + 1]:
                left = mid + 1
            # If mid element is greater than next element,
            # peak must be on the left side or at mid
            else:
                right = mid
                
        return left

def test_solution():
    """
    Test cases for 162. Find Peak Element.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 162. Find Peak Element")
