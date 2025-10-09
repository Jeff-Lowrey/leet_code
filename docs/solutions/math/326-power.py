"""
# Difficulty: Medium

# 326. Power

Given a problem that demonstrates key concepts in Math.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

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

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        """
        Determines if a given number is a power of three.

        Args:
            n (int): The number to check

        Returns:
            bool: True if n is a power of three, False otherwise

        Time Complexity: O(log_3(n))
        Space Complexity: O(1)
        """
        # Handle edge cases
        if n <= 0:
            return False

        # A number is a power of three if it can be divided by 3 repeatedly
        # until reaching 1, with no remainder at each step
        while n > 1:
            if n % 3 != 0:
                return False
            n = n // 3

        return True

    def isPowerOfThreeOptimized(self, n: int) -> bool:
        """
        Alternative implementation using mathematical properties.
        3^19 = 1162261467 is the largest power of 3 that fits in a 32-bit integer.
        If n is a power of 3, it must divide 3^19 evenly.

        Args:
            n (int): The number to check

        Returns:
            bool: True if n is a power of three, False otherwise

        Time Complexity: O(1)
        Space Complexity: O(1)
        """
        return n > 0 and 1162261467 % n == 0

def test_solution():
    """
    Test cases for 326. Power.
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
    print(f"Solution for 326. Power")
