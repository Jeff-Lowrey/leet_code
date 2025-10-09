"""
# 007. Reverse
# Difficulty: Medium
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
    def reverse(self, x: int) -> int:
        """
        Reverses the digits of an integer while preserving its sign.

        Args:
            x (int): The integer to be reversed

        Returns:
            int: The reversed integer, or 0 if the result would overflow

        Note:
            - Handles both positive and negative integers
            - Returns 0 if the reversed number exceeds 32-bit integer range
            - Removes leading zeros automatically
        """
        # Handle the sign separately
        sign = -1 if x < 0 else 1

        # Convert to positive number and to string
        x_str = str(abs(x))

        # Reverse the string
        reversed_str = x_str[::-1]

        # Convert back to integer with original sign
        result = sign * int(reversed_str)

        # Check for 32-bit integer overflow
        if result < -(2**31) or result > 2**31 - 1:
            return 0

        return result

def test_solution():
    """
    Test cases for 007. Reverse.
    """
    solution = Solution()

    # Test case 1: Positive number
    result = solution.reverse(123)
    expected = 321
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Negative number
    result = solution.reverse(-123)
    expected = -321
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Number ending with zero
    result = solution.reverse(120)
    expected = 21
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Single digit
    result = solution.reverse(7)
    expected = 7
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Zero
    result = solution.reverse(0)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Overflow case (32-bit integer limit)
    result = solution.reverse(1534236469)  # Would reverse to 9646324351 (overflow)
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Negative overflow case
    result = solution.reverse(-2147483648)  # Would overflow
    expected = 0
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Large positive within bounds
    result = solution.reverse(1463847412)  # Reverses to 2147483641 (within bounds)
    expected = 2147483641
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 007. Reverse Integer ===")

    # Demonstrate various cases
    test_cases = [123, -123, 120, 0, 1534236469, -2147483648]

    for num in test_cases:
        result = solution.reverse(num)
        print(f"reverse({num}) -> {result}")

    print("\nKey insights:")
    print("- Handles sign preservation")
    print("- Removes leading zeros automatically")
    print("- Returns 0 for 32-bit integer overflow")
    print("- Works with negative numbers correctly")
