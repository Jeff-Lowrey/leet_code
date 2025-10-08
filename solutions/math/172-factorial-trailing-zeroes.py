"""
# 172. Factorial Trailing Zeroes
**Medium**

Given an integer n, return the number of trailing zeroes in n!.

Note that n! = n × (n - 1) × (n - 2) × ... × 3 × 2 × 1.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Trailing zeroes come from factors of 10 = 2 × 5. In n!, there are always more factors of 2 than 5, so we only need to count factors of 5.

### APPROACH:
1. **Count multiples of 5**: n/5 gives multiples of 5
2. **Count multiples of 25**: n/25 gives extra factor of 5
3. **Count multiples of 125**: n/125 gives another extra factor
4. **Continue**: Until 5^k > n

### WHY THIS WORKS:
- Every 5 numbers contributes at least one 5: 5, 10, 15, 20, 25...
- Every 25 numbers contributes an extra 5: 25, 50, 75, 100, 125...
- Every 125 numbers contributes another extra 5: 125, 250...
- Total = n/5 + n/25 + n/125 + ...

### TIME COMPLEXITY: O(log n)
Number of divisions by 5 until we reach 0

### SPACE COMPLEXITY: O(1)
Only using counters

### EXAMPLE WALKTHROUGH:
```
n = 30:
30/5 = 6 (multiples of 5: 5,10,15,20,25,30)
30/25 = 1 (multiples of 25: 25)
30/125 = 0
Total: 6 + 1 = 7 trailing zeroes

30! = 265252859812191058636308480000000
      (7 trailing zeroes)
```

### KEY INSIGHTS:
- Don't calculate n! (too large)
- Count factors of 5, not factors of 10
- Each power of 5 contributes additional zeroes

### EDGE CASES:
- n = 0: 0! = 1 (no trailing zeroes)
- n < 5: No factors of 5
- Powers of 5: 5, 25, 125 (extra factors)

</details>
"""


class Solution:
    def trailingZeroes(self, n: int) -> int:
        """
        Count trailing zeroes in n!.

        Args:
            n: Positive integer

        Returns:
            Number of trailing zeroes

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        count = 0
        while n >= 5:
            n //= 5
            count += n
        return count

    def trailingZeroesRecursive(self, n: int) -> int:
        """Recursive approach."""
        if n < 5:
            return 0
        return n // 5 + self.trailingZeroesRecursive(n // 5)


def test_solution() -> None:
    """Test cases for Problem 172."""
    solution = Solution()

    assert solution.trailingZeroes(3) == 0
    assert solution.trailingZeroes(5) == 1
    assert solution.trailingZeroes(10) == 2
    assert solution.trailingZeroes(25) == 6
    assert solution.trailingZeroes(30) == 7
    assert solution.trailingZeroes(0) == 0
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    solution = Solution()
    print("\n=== 172. Factorial Trailing Zeroes ===")
    for n in [5, 10, 25, 30, 100]:
        result = solution.trailingZeroes(n)
        print(f"trailingZeroes({n}) -> {result}")
