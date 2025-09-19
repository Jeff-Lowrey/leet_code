"""
70. Climbing Stairs
Easy

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you
climb to the top?

Example:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is the classic Fibonacci problem in disguise! To reach step n, you can
either come from step (n-1) by taking 1 step, or from step (n-2) by taking 2 steps.
So: ways(n) = ways(n-1) + ways(n-2)

### PATTERN RECOGNITION:
- n=1: 1 way (1)
- n=2: 2 ways (1+1, 2)
- n=3: 3 ways (1+1+1, 1+2, 2+1)
- n=4: 5 ways (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)
- Notice: 1, 2, 3, 5... This is Fibonacci sequence!

### APPROACH:
1. Base cases: ways(1)=1, ways(2)=2
2. For any step n: ways(n) = ways(n-1) + ways(n-2)
3. Use bottom-up DP to avoid redundant calculations

### WHY FIBONACCI?
- From step (n-1): one way to reach n (take 1 step)
- From step (n-2): one way to reach n (take 2 steps)
- These are the ONLY ways to reach step n
- So total ways = ways to reach (n-1) + ways to reach (n-2)

### OPTIMIZATION:
Instead of storing all values, we only need the last two values,
making space complexity O(1) instead of O(n).

</details>
"""

class Solution:
    def climbStairs(self, n: int) -> int:
        """
        Approach: Dynamic Programming (Fibonacci)
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if n <= 2:
            return n

        # Only need to track last two values
        prev2 = 1  # ways to reach step i-2
        prev1 = 2  # ways to reach step i-1

        for i in range(3, n + 1):
            current = prev1 + prev2
            prev2 = prev1
            prev1 = current

        return prev1

    def climbStairsDP(self, n: int) -> int:
        """
        Approach: Dynamic Programming with array
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if n <= 2:
            return n

        dp = [0] * (n + 1)
        dp[1] = 1
        dp[2] = 2

        for i in range(3, n + 1):
            dp[i] = dp[i - 1] + dp[i - 2]

        return dp[n]

    def climbStairsRecursive(self, n: int) -> int:
        """
        Approach: Recursive with memoization
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        memo = {}

        def helper(n):
            if n <= 2:
                return n

            if n in memo:
                return memo[n]

            memo[n] = helper(n - 1) + helper(n - 2)
            return memo[n]

        return helper(n)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    n1 = 2
    print(f"Input: n = {n1}")
    print(f"Output: {solution.climbStairs(n1)}")  # 2

    # Test case 2
    n2 = 3
    print(f"Input: n = {n2}")
    print(f"Output: {solution.climbStairs(n2)}")  # 3

    # Test case 3
    n3 = 5
    print(f"Input: n = {n3}")
    print(f"Output: {solution.climbStairs(n3)}")  # 8
