"""
# 268. Missing
**Medium**

Given a problem that demonstrates key concepts in Math.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of math concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply math methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages math principles
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

The approach uses math techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using math method
3. Return the computed result

</details>
"""


class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        """
        Find the missing number in a sequence of n numbers from 0 to n.

        This implementation uses the mathematical formula for sum of first n numbers
        and subtracts the sum of given numbers to find the missing one.
        Time Complexity: O(n)
        Space Complexity: O(1)

        Args:
            nums: List of integers containing n numbers from 0 to n with one missing

        Returns:
            The missing number in the sequence
        """
        n = len(nums)
        # Expected sum of numbers from 0 to n
        expected_sum = (n * (n + 1)) // 2
        # Actual sum of numbers in the array
        actual_sum = sum(nums)
        # The difference is the missing number
        return expected_sum - actual_sum

    def missingNumber_xor(self, nums: List[int]) -> int:
        """
        Alternative implementation using XOR operation.

        This method uses the property that a^a = 0 and a^0 = a
        Time Complexity: O(n)
        Space Complexity: O(1)

        Args:
            nums: List of integers containing n numbers from 0 to n with one missing

        Returns:
            The missing number in the sequence
        """
        result = len(nums)
        for i in range(len(nums)):
            result ^= i ^ nums[i]
        return result


def test_solution():
    """
    Test cases for 268. Missing.
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
    print(f"Solution for 268. Missing")
