"""
# 0231. Power of Two

# Difficulty: Easy

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2^x.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 16</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>2^4 = 16</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Recursion, Bit Manipulation
**Data Structures**: None
**Patterns**: Divide and Conquer, Mathematical
**Time Complexity**: O(log n) for recursion
**Space Complexity**: O(log n) for recursion stack

### INTUITION:
A power of two has exactly one bit set in its binary representation.
Recursively, we can check: if n is even, divide by 2 and recurse.
If n becomes 1, it's a power of two. If n is odd (and not 1), it's not.

### APPROACH:
1. **Base cases**: n = 1 (true, 2^0), n ≤ 0 (false)
2. **Even case**: Recursively check n/2
3. **Odd case**: Return false (powers of 2 are never odd except 1)
4. **Alternative**: Bit manipulation - n & (n-1) == 0

### WHY THIS WORKS:
- Powers of 2 in binary: 1, 10, 100, 1000, etc.
- Dividing by 2 removes one bit until we reach 1
- If we encounter an odd number (except 1), it cannot be a power of 2

### EXAMPLE WALKTHROUGH:
Input:
```
n = 16
```

Steps:
Step 1: isPowerOfTwo(16) → 16 % 2 == 0, check isPowerOfTwo(8)
Step 2: isPowerOfTwo(8)  → 8 % 2 == 0, check isPowerOfTwo(4)
Step 3: isPowerOfTwo(4)  → 4 % 2 == 0, check isPowerOfTwo(2)
Step 4: isPowerOfTwo(2)  → 2 % 2 == 0, check isPowerOfTwo(1)
Step 5: isPowerOfTwo(1)  → return True
Step 6: Result: True

Output:
```
True
```

### TIME COMPLEXITY:
O(log n) - dividing by 2 each time

### SPACE COMPLEXITY:
O(log n) - recursion stack depth

### EDGE CASES:
- n ≤ 0: return False
- n = 1: return True (2^0)
- Odd numbers > 1: return False

</details>
"""


class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        """
        Check if n is a power of two using recursion.

        Time Complexity: O(log n)
        Space Complexity: O(log n)
        """
        # Base cases
        if n <= 0:
            return False
        if n == 1:
            return True

        # If n is odd (and not 1), it cannot be a power of 2
        if n % 2 != 0:
            return False

        # Recursively check n/2
        return self.isPowerOfTwo(n // 2)

    def isPowerOfTwoBitManipulation(self, n: int) -> bool:
        """
        Check using bit manipulation (most efficient).

        Time Complexity: O(1)
        Space Complexity: O(1)

        Powers of 2 have exactly one bit set: 1, 10, 100, 1000, etc.
        n & (n-1) removes the rightmost set bit.
        For powers of 2, this results in 0.
        """
        return n > 0 and (n & (n - 1)) == 0

    def isPowerOfTwoIterative(self, n: int) -> bool:
        """
        Check iteratively.

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        if n <= 0:
            return False

        while n > 1:
            if n % 2 != 0:
                return False
            n //= 2

        return True


def test_solution() -> None:
    """Test cases for 231. Power of Two."""
    solution = Solution()

    # Test cases - recursive
    assert solution.isPowerOfTwo(1) is True
    assert solution.isPowerOfTwo(16) is True
    assert solution.isPowerOfTwo(3) is False
    assert solution.isPowerOfTwo(0) is False
    assert solution.isPowerOfTwo(-16) is False
    assert solution.isPowerOfTwo(1024) is True

    # Test bit manipulation
    assert solution.isPowerOfTwoBitManipulation(16) is True
    assert solution.isPowerOfTwoBitManipulation(5) is False

    # Test iterative
    assert solution.isPowerOfTwoIterative(2) is True
    assert solution.isPowerOfTwoIterative(6) is False

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 231. Power of Two ===")
    test_values = [1, 2, 3, 4, 5, 8, 16, 17, 1024]
    for val in test_values:
        print(f"n={val}: {solution.isPowerOfTwo(val)}")
