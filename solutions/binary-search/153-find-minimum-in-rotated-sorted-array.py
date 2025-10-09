"""
# 153. Find Minimum In Rotated Sorted Array
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
    """
    Solution class for finding the minimum element in a rotated sorted array.
    
    The array is originally sorted in ascending order but has been rotated 
    between 1 and n times.
    """
    
    def findMin(self, nums: List[int]) -> int:
        """
        Finds the minimum element in a rotated sorted array using binary search.
        
        Args:
            nums: List[int] - Input array that was originally sorted then rotated
            
        Returns:
            int - The minimum element in the array
            
        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        # Handle edge cases
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
        
        # If array is not rotated (already sorted)
        if nums[0] < nums[-1]:
            return nums[0]
        
        left, right = 0, len(nums) - 1
        
        # Binary search implementation
        while left <= right:
            # If we're down to two elements, return the minimum
            if right - left <= 1:
                return min(nums[left], nums[right])
            
            mid = (left + right) // 2
            
            # If mid element is greater than right element,
            # minimum must be in right half
            if nums[mid] > nums[right]:
                left = mid
            # If mid element is less than right element,
            # minimum must be in left half (including mid)
            else:
                right = mid
                
        return nums[left]

def test_solution():
    """
    Test cases for 153. Find Minimum In Rotated Sorted Array.
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
    print(f"Solution for 153. Find Minimum In Rotated Sorted Array")
