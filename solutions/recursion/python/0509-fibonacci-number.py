"""
# 509. Fibonacci Number

# Difficulty: Easy

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
such that each number is the sum of the two preceding ones, starting from 0 and 1. That is:

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 4</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>F(4) = F(3) + F(2) = 2 + 1 = 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: Recursion, Memoization, Iteration
**Data Structures**: Array (for memoization)
**Patterns**: Base Case Recursion, Top-Down DP
**Time Complexity**: O(2^n) naive, O(n) with memoization
**Space Complexity**: O(n) for recursion stack and memoization

### INTUITION:
The Fibonacci sequence is the classic example of recursion. Each number is defined
recursively as the sum of the two preceding numbers, with base cases F(0)=0 and F(1)=1.

### APPROACH:
1. **Base cases**: If n is 0 or 1, return n directly
2. **Recursive case**: Return fib(n-1) + fib(n-2)
3. **Optimization**: Use memoization to avoid redundant calculations

### WHY THIS WORKS:
- The Fibonacci definition is inherently recursive
- Base cases prevent infinite recursion
- Memoization reduces time complexity from exponential to linear

### EXAMPLE WALKTHROUGH:
```
Input: n = 4
fib(4) = fib(3) + fib(2)
fib(3) = fib(2) + fib(1) = 1 + 1 = 2
fib(2) = fib(1) + fib(0) = 1 + 0 = 1
fib(4) = 2 + 1 = 3
```

### TIME COMPLEXITY:
- Naive recursion: O(2^n) - exponential
- With memoization: O(n) - linear

### SPACE COMPLEXITY:
O(n) - recursion stack depth

### EDGE CASES:
- n = 0: return 0
- n = 1: return 1
- Large n: use memoization to avoid timeout

</details>
"""


class Solution:
    def fib(self, n: int) -> int:
        """
        Calculate Fibonacci number using simple recursion.

        Time Complexity: O(2^n)
        Space Complexity: O(n)
        """
        # Base cases
        if n <= 1:
            return n

        # Recursive case
        return self.fib(n - 1) + self.fib(n - 2)

    def fibMemoization(self, n: int) -> int:
        """
        Calculate Fibonacci using recursion with memoization.

        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        memo: dict[int, int] = {}

        def helper(num: int) -> int:
            if num <= 1:
                return num

            if num in memo:
                return memo[num]

            memo[num] = helper(num - 1) + helper(num - 2)
            return memo[num]

        return helper(n)

    def fibIterative(self, n: int) -> int:
        """
        Calculate Fibonacci iteratively (most efficient).

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if n <= 1:
            return n

        prev2 = 0
        prev1 = 1

        for _ in range(2, n + 1):
            current = prev1 + prev2
            prev2 = prev1
            prev1 = current

        return prev1


def test_solution() -> None:
    """Test cases for 509. Fibonacci Number."""
    solution = Solution()

    # Test case 1
    assert solution.fib(0) == 0
    assert solution.fib(1) == 1
    assert solution.fib(2) == 1
    assert solution.fib(3) == 2
    assert solution.fib(4) == 3
    assert solution.fib(5) == 5

    # Test with memoization
    assert solution.fibMemoization(10) == 55
    assert solution.fibMemoization(15) == 610

    # Test iterative
    assert solution.fibIterative(20) == 6765

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 509. Fibonacci Number ===")
    for i in range(10):
        print(f"F({i}) = {solution.fib(i)}")
