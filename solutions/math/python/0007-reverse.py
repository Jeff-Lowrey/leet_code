"""
### INTUITION:
The key insight is that extract digits from end using mod 10. Build reversed number by multiplying result by 10 and adding digit. Check for overflow before each operation.

### APPROACH:
1. **Initialize result**: Set result = 0 to build reversed number
2. **Handle sign**: Store sign of x, work with absolute value
3. **Extract digits**: While x != 0, get digit = x % 10
4. **Build reversed number**: result = result * 10 + digit
5. **Remove last digit**: x = x // 10
6. **Check overflow**: If result > 2^31 - 1 or result < -2^31, return 0
7. **Restore sign**: Multiply result by original sign
8. **Return result**: Return the reversed integer with sign

### WHY THIS WORKS:
- This ensures that build reversed number: rev = rev * 10 + x % 10, then x //= 10
- This ensures that check overflow before multiplying: if rev > MAX // 10, will overflow
- This ensures that handle negative numbers: take abs, reverse, then negate
- This ensures that return 0 if result exceeds 32-bit signed integer range
- This ensures that o(log n) time: number of digits, O(1) space

### EXAMPLE WALKTHROUGH:
Input:
```
x = 123
```

Step 1: Extract digits and build reversed number
result = 0
result = 0*10 + 3 = 3, x = 12
result = 3*10 + 2 = 32, x = 1
result = 32*10 + 1 = 321, x = 0

Output:
```
321
```

### TIME COMPLEXITY:
**O(n)**

- Single pass through the input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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


def test_solution() -> None:
    """
    Test cases for 007. Reverse.
    """
    solution = Solution()

    # Test case 1: Positive number
    result = solution.reverse(123)
    expected = 321
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Negative number
    result = solution.reverse(-123)
    expected = -321
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Number ending with zero
    result = solution.reverse(120)
    expected = 21
    assert result == expected, f"Expected expected, got result"

    # Test case 4: Single digit
    result = solution.reverse(7)
    expected = 7
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Zero
    result = solution.reverse(0)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 6: Overflow case (32-bit integer limit)
    result = solution.reverse(1534236469)  # Would reverse to 9646324351 (overflow)
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 7: Negative overflow case
    result = solution.reverse(-2147483648)  # Would overflow
    expected = 0
    assert result == expected, f"Expected expected, got result"

    # Test case 8: Large positive within bounds
    result = solution.reverse(1463847412)  # Reverses to 2147483641 (within bounds)
    expected = 2147483641
    assert result == expected, f"Expected expected, got result"

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
        print(f"reverse({num}) -> result")

    print("\nKey insights:")
    print("- Handles sign preservation")
    print("- Removes leading zeros automatically")
    print("- Returns 0 for 32-bit integer overflow")
    print("- Works with negative numbers correctly")
