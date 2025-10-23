"""
# 509. Fibonacci Number

LeetCode Problem 509: Fibonacci Number
Difficulty: Easy
Category: Recursion

Problem Description:
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given n, calculate F(n).

Example 1:
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Example 2:
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Example 3:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

Constraints:
- 0 <= n <= 30

METADATA:
Techniques:
- Recursion
- Memoization
- Dynamic programming
- Iterative solution

Data Structures:
- Dictionary/HashMap (for memoization)
- Array (for DP)

Patterns:
- Top-down recursion with memoization
- Bottom-up dynamic programming
- Space optimization

Time Complexity:
- Naive recursion: O(2^n)
- Memoized recursion: O(n)
- Iterative DP: O(n)
- Space-optimized iterative: O(n)

Space Complexity:
- Naive recursion: O(n) call stack
- Memoized recursion: O(n) memoization + O(n) call stack
- Iterative DP: O(n) for array
- Space-optimized: O(1)

Intuition:
The Fibonacci sequence is defined recursively, making it a natural fit for recursive solutions.
However, naive recursion results in exponential time complexity due to redundant calculations.
We can optimize using memoization (caching results) or convert to an iterative solution.
Further optimization reduces space to O(1) by only tracking the last two values.

Approach:
1. Naive recursion: Direct implementation of the recursive formula
2. Memoized recursion: Cache computed values to avoid recomputation
3. Iterative DP: Build up from base cases using a loop
4. Space-optimized: Only keep track of previous two values

Why This Works:
The Fibonacci sequence has overlapping subproblems - F(n) depends on F(n-1) and F(n-2),
which in turn depend on earlier values. By caching or building from the bottom up,
we eliminate redundant calculations and achieve linear time complexity.

Example Walkthrough:
Example: n = 5
- F(0) = 0
- F(1) = 1
- F(2) = F(1) + F(0) = 1 + 0 = 1
- F(3) = F(2) + F(1) = 1 + 1 = 2
- F(4) = F(3) + F(2) = 2 + 1 = 3
- F(5) = F(4) + F(3) = 3 + 2 = 5

Naive recursion makes many redundant calls:
F(5) calls F(4) and F(3)
F(4) calls F(3) and F(2)
F(3) is computed twice already!
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
        print(f"{status} fib({n}) = {result}, expected = {expected}")

    print("\nTesting fibIterative (O(1) space):")
    for n, expected in test_cases:
        result = fibIterative(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibIterative({n}) = {result}, expected = {expected}")

    print("\nTesting fibDP (bottom-up DP):")
    for n, expected in test_cases:
        result = fibDP(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibDP({n}) = {result}, expected = {expected}")

    # Only test naive version with small inputs (exponential time!)
    print("\nTesting fibNaive (naive recursion - small inputs only):")
    for n, expected in test_cases[:7]:  # Only first 7 test cases
        result = fibNaive(n)
        status = "✓" if result == expected else "✗"
        print(f"{status} fibNaive({n}) = {result}, expected = {expected}")
