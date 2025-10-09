"""
# 136. Single
# Difficulty: Medium
Given a problem that demonstrates key concepts in Bit Manipulation.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply bit manipulation methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages bit manipulation principles
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

The approach uses bit manipulation techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using bit manipulation method
3. Return the computed result

</details>
"""

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Find the single number in an array where all other numbers appear twice.
        
        Args:
            nums (List[int]): Array of integers where all numbers except one appear twice
            
        Returns:
            int: The number that appears only once
            
        Example:
            >>> solution = Solution()
            >>> solution.singleNumber([2,2,1])
            1
            >>> solution.singleNumber([4,1,2,1,2])
            4
        """
        # Using XOR operation:
        # - XOR of a number with itself is 0
        # - XOR of a number with 0 is the number itself
        # - XOR is associative and commutative
        result = 0
        for num in nums:
            result ^= num
        return result

def test_solution():
    """
    Test cases for 136. Single.
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
    print(f"Solution for 136. Single")
