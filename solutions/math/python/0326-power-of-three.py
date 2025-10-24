"""
# 326. Power of Three

# Difficulty: Easy

Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3^x.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 27</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>3^3 = 27</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Recursion, Mathematics
**Data Structures**: None
**Patterns**: Divide and Conquer, Mathematical
**Time Complexity**: O(log₃ n) for recursion
**Space Complexity**: O(log₃ n) for recursion stack

### INTUITION:
Similar to power of two, but we divide by 3 instead of 2.
If n is divisible by 3, recursively check n/3.
If n becomes 1, it's a power of three.

### APPROACH:
1. **Base cases**: n = 1 (true, 3^0), n ≤ 0 (false)
2. **Divisible by 3**: Recursively check n/3
3. **Not divisible by 3**: Return false
4. **Alternative**: Check if log₃(n) is an integer

### WHY THIS WORKS:
- Powers of 3: 1, 3, 9, 27, 81, 243, etc.
- Dividing by 3 repeatedly should eventually reach 1
- If we cannot divide evenly, n is not a power of 3

### EXAMPLE WALKTHROUGH:
Input:
```
n = 27
```

Steps:
Step 1: isPowerOfThree(27) → 27 % 3 == 0, check isPowerOfThree(9)
Step 2: isPowerOfThree(9)  → 9 % 3 == 0, check isPowerOfThree(3)
Step 3: isPowerOfThree(3)  → 3 % 3 == 0, check isPowerOfThree(1)
Step 4: isPowerOfThree(1)  → return True
Step 5: Result: True

### TIME COMPLEXITY:
O(log₃ n) - dividing by 3 each time

### SPACE COMPLEXITY:
O(log₃ n) - recursion stack depth

### EDGE CASES:
- n ≤ 0: return False
- n = 1: return True (3^0)
- Numbers not divisible by 3: return False

</details>
"""


class Solution:
    def isPowerOfThree(self, n: int) -> bool:
        """
        Check if n is a power of three using recursion.

        Time Complexity: O(log₃ n)
        Space Complexity: O(log₃ n)
        """
        # Base cases
        if n <= 0:
            return False
        if n == 1:
            return True

        # If n is not divisible by 3, it cannot be a power of 3
        if n % 3 != 0:
            return False

        # Recursively check n/3
        return self.isPowerOfThree(n // 3)

    def isPowerOfThreeIterative(self, n: int) -> bool:
        """
        Check iteratively.

        Time Complexity: O(log₃ n)
        Space Complexity: O(1)
        """
        if n <= 0:
            return False

        while n > 1:
            if n % 3 != 0:
                return False
            n //= 3

        return True

    def isPowerOfThreeMath(self, n: int) -> bool:
        """
        Check using mathematics.

        Time Complexity: O(1)
        Space Complexity: O(1)

        3^19 = 1162261467 is the largest power of 3 within 32-bit integer range.
        If n is a power of 3, it must be a divisor of 3^19.
        """
        return n > 0 and 1162261467 % n == 0


def test_solution() -> None:
    """Test cases for 326. Power of Three."""
    solution = Solution()

    # Test cases - recursive
    assert solution.isPowerOfThree(1) is True
    assert solution.isPowerOfThree(27) is True
    assert solution.isPowerOfThree(0) is False
    assert solution.isPowerOfThree(-1) is False
    assert solution.isPowerOfThree(9) is True
    assert solution.isPowerOfThree(45) is False

    # Test iterative
    assert solution.isPowerOfThreeIterative(3) is True
    assert solution.isPowerOfThreeIterative(81) is True
    assert solution.isPowerOfThreeIterative(10) is False

    # Test math
    assert solution.isPowerOfThreeMath(243) is True
    assert solution.isPowerOfThreeMath(100) is False

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 326. Power of Three ===")
    test_values = [1, 3, 9, 10, 27, 45, 81, 243, 729]
    for val in test_values:
        print(f"n={val}: {solution.isPowerOfThree(val)}")
