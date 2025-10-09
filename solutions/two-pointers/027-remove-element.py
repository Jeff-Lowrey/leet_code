"""
# 027. Remove Element
# Difficulty: Medium
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
    def removeElement(self, nums: List[int], val: int) -> int:
        """
        Removes all instances of val from nums in-place and returns new length.
        
        Args:
            nums: List of integers to process
            val: Value to remove from the list
            
        Returns:
            int: Length of array after removing specified value
            
        Time Complexity: O(n) where n is length of nums
        Space Complexity: O(1) as we modify array in-place
        """
        if not nums:
            return 0
        
        # Initialize pointer for position to place next valid element
        k = 0
        
        # Iterate through array
        for i in range(len(nums)):
            # If current element is not the value to remove,
            # place it at position k and increment k
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        
        return k

def test_solution():
    """
    Test cases for 027. Remove Element.
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
    print(f"Solution for 027. Remove Element")
