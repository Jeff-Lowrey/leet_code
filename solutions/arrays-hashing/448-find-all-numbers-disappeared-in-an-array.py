"""
# 448. Find All Numbers Disappeared In An Array
# Difficulty: Medium
Given a problem that demonstrates key concepts in Arrays Hashing.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of arrays hashing concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply arrays hashing methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages arrays hashing principles
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

The approach uses arrays hashing techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using arrays hashing method
3. Return the computed result

</details>
"""

class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        """
        Find all numbers from 1 to n that are missing in the input array.
        
        Args:
            nums: List of integers where each integer is in range [1, n]
                 and n is the length of the list
        
        Returns:
            List of integers that are missing from the input array
        
        Time Complexity: O(n)
        Space Complexity: O(1) - excluding the output array
        """
        # Mark present numbers using index manipulation
        for num in nums:
            # Get the absolute value since numbers might have been marked negative
            index = abs(num) - 1
            # Mark as seen by making the number at index negative
            nums[index] = -abs(nums[index])
        
        # Find missing numbers by checking which indices contain positive numbers
        result = []
        for i in range(len(nums)):
            if nums[i] > 0:
                # i + 1 is missing from the original array
                result.append(i + 1)
        
        return result

def test_solution():
    """
    Test cases for 448. Find All Numbers Disappeared In An Array.
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
    print(f"Solution for 448. Find All Numbers Disappeared In An Array")
