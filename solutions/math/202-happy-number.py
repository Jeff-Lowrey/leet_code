"""
# Difficulty: Easy

# 202. Happy Number

Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return true if n is a happy number, and false if not.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 19:</dd>
<dt>Output:</dt>
<dd>1² + 9² = 82</dd>
<dt>Explanation:</dt>
<dd>Number 19 is happy: 1²+9²=82, 8²+2²=68, 6²+8²=100, 1²+0²+0²=1</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Either the process reaches 1 (happy) or enters a cycle (not happy). Use a set to detect cycles, or use Floyd's cycle detection.

### APPROACH:
1. **Calculate sum**: Get sum of squares of digits
2. **Track seen numbers**: Use set to detect cycle
3. **Check termination**: If 1, return True; if cycle, return False
4. **Alternative**: Floyd's cycle detection (two pointers)

### WHY THIS WORKS:
- Numbers either reach 1 or cycle
- Cycles always occur for unhappy numbers
- Set or two-pointer both detect cycles

### EXAMPLE WALKTHROUGH:
```
n = 19:
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1 → Happy!

n = 2:
2² = 4
4² = 16
1² + 6² = 37
3² + 7² = 58
5² + 8² = 89
8² + 9² = 145
1² + 4² + 5² = 42
4² + 2² = 20
2² + 0² = 4 → Cycle! Not happy
```

### TIME COMPLEXITY:
O(log n)
Depends on number of digits and cycle detection

### SPACE COMPLEXITY:
- Set approach: O(log n)
- Two-pointer: O(1)

### EDGE CASES:
- n = 1 (already happy)
- Single digit numbers
- Large numbers

</details>
"""


from typing import Any

class Solution:
    def isHappy(self, n: int) -> bool:
        """
        Determine if number is happy using set.

        Args:
            n: Positive integer

        Returns:
            True if happy, False otherwise

        Time Complexity: O(log n)
        Space Complexity: O(log n)
        """
        seen: set[Any] = set()

        while n != 1 and n not in seen:
            seen.add(n)
            n = self.sumOfSquares(n)

        return n == 1

    def sumOfSquares(self, n: int) -> int:
        """Calculate sum of squares of digits."""
        total = 0
        while n > 0:
            digit = n % 10
            total += digit * digit
            n //= 10
        return total

    def isHappyFloyd(self, n: int) -> bool:
        """
        Two-pointer approach (Floyd's cycle detection).

        Time Complexity: O(log n)
        Space Complexity: O(1)
        """
        slow = n
        fast = n

        while True:
            slow = self.sumOfSquares(slow)
            fast = self.sumOfSquares(self.sumOfSquares(fast))

            if fast == 1:
                return True
            if slow == fast:
                return False


def test_solution() -> None:
    """Test cases for Problem 202."""
    solution = Solution()

    assert solution.isHappy(19) is True
    assert solution.isHappy(2) is False
    assert solution.isHappy(1) is True
    assert solution.isHappy(7) is True
    assert solution.isHappy(4) is False
    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    solution = Solution()
    print("\n=== 202. Happy Number ===")
    for n in [1, 2, 7, 19, 100]:
        result = solution.isHappy(n)
        print(f"isHappy({n}) -> {result}")
