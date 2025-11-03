"""
### INTUITION:
A power of four must be a power of two with the bit set at an even position.
Powers of 4 in binary: 1 (1), 4 (100), 16 (10000), 64 (1000000).
Notice the single bit is always at position 0, 2, 4, 6, etc. (even positions).

### APPROACH:
1. **Base cases**: n = 1 (true, 4^0), n ≤ 0 (false)
2. **Divisible by 4**: Recursively check n/4
3. **Not divisible by 4**: Return false
4. **Alternative**: Check if power of 2 AND (n-1) % 3 == 0

### WHY THIS WORKS:
- Powers of 4: 1, 4, 16, 64, 256, 1024, etc.
- Dividing by 4 repeatedly should eventually reach 1
- Mathematical property: 4^x = (2^2)^x = 2^(2x) means the bit is at even position
- All powers of 4 satisfy: (n-1) % 3 == 0

### EXAMPLE WALKTHROUGH:
Input:
```
n = 16
```

Steps:
Step 1: isPowerOfFour(16) → 16 % 4 == 0, check isPowerOfFour(4)
Step 2: isPowerOfFour(4)  → 4 % 4 == 0, check isPowerOfFour(1)
Step 3: isPowerOfFour(1)  → return True
Step 4: Result: True

Output:
```
True
```

### TIME COMPLEXITY:
**O(log₄ n)** - dividing by 4 each time

### SPACE COMPLEXITY:
**O(log₄ n)** - recursion stack depth

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

"""


class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        """
        Check if n is a power of four using recursion.

        Time Complexity: O(log₄ n)
        Space Complexity: O(log₄ n)
        """
        # Base cases
        if n <= 0:
            return False
        if n == 1:
            return True

        # If n is not divisible by 4, it cannot be a power of 4
        if n % 4 != 0:
            return False

        # Recursively check n/4
        return self.isPowerOfFour(n // 4)

    def isPowerOfFourBitManipulation(self, n: int) -> bool:
        """
        Check using bit manipulation.

        Time Complexity: O(1)
        Space Complexity: O(1)

        A power of 4 must be:
        1. A power of 2: n > 0 and (n & (n-1)) == 0
        2. Have bit at even position: n & 0x55555555 != 0
           (0x55555555 = 01010101010101010101010101010101 in binary)
        """
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

    def isPowerOfFourMath(self, n: int) -> bool:
        """
        Check using mathematics.

        Time Complexity: O(1)
        Space Complexity: O(1)

        Property: All powers of 4 when subtracted by 1 are divisible by 3.
        4^0 - 1 = 0 (divisible by 3)
        4^1 - 1 = 3 (divisible by 3)
        4^2 - 1 = 15 (divisible by 3)
        """
        return n > 0 and (n & (n - 1)) == 0 and (n - 1) % 3 == 0

    def isPowerOfFourIterative(self, n: int) -> bool:
        """
        Check iteratively.

        Time Complexity: O(log₄ n)
        Space Complexity: O(1)
        """
        if n <= 0:
            return False

        while n > 1:
            if n % 4 != 0:
                return False
            n //= 4

        return True


def test_solution() -> None:
    """Test cases for 342. Power of Four."""
    solution = Solution()

    # Test cases - recursive
    assert solution.isPowerOfFour(1) is True
    assert solution.isPowerOfFour(16) is True
    assert solution.isPowerOfFour(5) is False
    assert solution.isPowerOfFour(0) is False
    assert solution.isPowerOfFour(2) is False  # Power of 2, not 4
    assert solution.isPowerOfFour(8) is False  # Power of 2, not 4
    assert solution.isPowerOfFour(64) is True

    # Test bit manipulation
    assert solution.isPowerOfFourBitManipulation(4) is True
    assert solution.isPowerOfFourBitManipulation(256) is True
    assert solution.isPowerOfFourBitManipulation(32) is False

    # Test math approach
    assert solution.isPowerOfFourMath(1024) is True
    assert solution.isPowerOfFourMath(100) is False

    # Test iterative
    assert solution.isPowerOfFourIterative(16) is True
    assert solution.isPowerOfFourIterative(12) is False

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 342. Power of Four ===")
    test_values = [1, 2, 4, 5, 8, 16, 32, 64, 256]
    for val in test_values:
        print(f"n={val}: {solution.isPowerOfFour(val)}")
