"""
# 0509. Fibonacci Number

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


def fib(n: int) -> int:
    """
    Calculate nth Fibonacci number using memoized recursion.

    Args:
        n: Non-negative integer

    Returns:
        The nth Fibonacci number
    """
    memo = {}

    def helper(k: int) -> int:
        if k in memo:
            return memo[k]

        if k <= 1:
            return k

        memo[k] = helper(k - 1) + helper(k - 2)
        return memo[k]

    return helper(n)


def fibNaive(n: int) -> int:
    """
    Naive recursive solution (exponential time).

    Args:
        n: Non-negative integer

    Returns:
        The nth Fibonacci number
    """
    if n <= 1:
        return n
    return fibNaive(n - 1) + fibNaive(n - 2)


def fibIterative(n: int) -> int:
    """
    Iterative solution with O(1) space.

    Args:
        n: Non-negative integer

    Returns:
        The nth Fibonacci number
    """
    if n <= 1:
        return n

    prev2, prev1 = 0, 1

    for _ in range(2, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current

    return prev1


def fibDP(n: int) -> int:
    """
    Bottom-up dynamic programming solution.

    Args:
        n: Non-negative integer

    Returns:
        The nth Fibonacci number
    """
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (0, 0),
        (1, 1),
        (2, 1),
        (3, 2),
        (4, 3),
        (5, 5),
        (6, 8),
        (10, 55),
        (15, 610)
    ]

    print("Testing fib (memoized recursion):")
    for n, expected in test_cases:
        result = fib(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fib(n) = result, expected = expected")

    print("\nTesting fibIterative (O(1) space):")
    for n, expected in test_cases:
        result = fibIterative(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibIterative(n) = result, expected = expected")

    print("\nTesting fibDP (bottom-up DP):")
    for n, expected in test_cases:
        result = fibDP(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibDP(n) = result, expected = expected")

    # Only test naive version with small inputs (exponential time!)
    print("\nTesting fibNaive (naive recursion - small inputs only):")
    for n, expected in test_cases[:7]:  # Only first 7 test cases
        result = fibNaive(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibNaive(n) = result, expected = expected")
