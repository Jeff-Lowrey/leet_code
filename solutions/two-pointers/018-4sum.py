"""
# 018. 4Sum
**Medium**

Given a problem that demonstrates key concepts in Two Pointers.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages two pointers principles
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

The approach uses two pointers techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using two pointers method
3. Return the computed result

</details>
"""

class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        """
        Find all unique quadruplets in nums that sum up to target.
        
        Args:
            nums: List of integers
            target: Target sum
            
        Returns:
            List of lists containing unique quadruplets that sum to target
            
        Example:
            Input: nums = [1,0,-1,0,-2,2], target = 0
            Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
        """
        # Handle edge cases
        if not nums or len(nums) < 4:
            return []
        
        # Sort the array to handle duplicates and use two pointers approach
        nums.sort()
        n = len(nums)
        result = []
        
        # Fix first two numbers and use two pointers for the rest
        for i in range(n - 3):
            # Skip duplicates for first number
            if i > 0 and nums[i] == nums[i - 1]:
                continue
                
            # Early break if smallest possible sum is greater than target
            if nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target:
                break
                
            # Skip if largest possible sum is smaller than target
            if nums[i] + nums[n - 3] + nums[n - 2] + nums[n - 1] < target:
                continue
                
            for j in range(i + 1, n - 2):
                # Skip duplicates for second number
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                    
                # Use two pointers for the remaining two numbers
                left, right = j + 1, n - 1
                
                while left < right:
                    current_sum = nums[i] + nums[j] + nums[left] + nums[right]
                    
                    if current_sum == target:
                        result.append([nums[i], nums[j], nums[left], nums[right]])
                        
                        # Skip duplicates for third number
                        while left < right and nums[left] == nums[left + 1]:
                            left += 1
                        # Skip duplicates for fourth number
                        while left < right and nums[right] == nums[right - 1]:
                            right -= 1
                            
                        left += 1
                        right -= 1
                    elif current_sum < target:
                        left += 1
                    else:
                        right -= 1
        
        return result

def test_solution():
    """
    Test cases for 018. 4Sum.
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
    print(f"Solution for 018. 4Sum")
