"""
# Difficulty: Easy

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you
climb to the top?

Example:
Input: `n` = 3
Output: 3
Explanation: There are three ways to climb to the top.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n` = 3</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>Ways to climb 3 stairs: 3 methods [1+1+1, 1+2, 2+1]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
This is the classic Fibonacci problem in `disguise! To` reach step `n`, you can
either come from step (`n-1`) by taking 1 step, or from step (`n-2`) by taking 2 steps.
So: ways(n) = ways(`n-1`) + ways(`n-2`)

### APPROACH:
1. Base cases: ways(1)=1, ways(2)=2
2. For any step n: ways(n) = ways(`n-1`) + ways(`n-2`)
3. Use `bottom-up` DP to avoid redundant calculations

### WHY THIS WORKS:
The recurrence relation ways(n) = ways(n-1) + ways(n-2) is valid because the only ways to reach step n are by taking a 1-step from step n-1 or a 2-step from step n-2. These are mutually exclusive paths, so we can add them together. By starting with the base cases and building up to n, we ensure every subproblem is solved exactly once, avoiding the exponential time complexity of naive recursion.

### EXAMPLE WALKTHROUGH:
```
Input: n = 3
Step 1: Build DP table
  dp[0] = 1 (0 steps: 1 way)
  dp[1] = 1 (1 step: one 1-step)
  dp[2] = 2 (2 steps: two 1-steps or one 2-step)
  dp[3] = dp[2] + dp[1] = 2 + 1 = 3

Step 2: Enumerate paths for verification
  Path 1: 1+1+1
  Path 2: 1+2
  Path 3: 2+1

Output: 3 (ways to climb)
```

### TIME COMPLEXITY:
O(n)
Single pass from 3 to n, constant work per iteration

### SPACE COMPLEXITY:
O(1)
Only store two variables (prev1, prev2), not full DP array

### EDGE CASES:
- n = 1: return 1 (one way)
- n = 2: return 2 (two ways)
- Large n: Fibonacci grows exponentially but algorithm is linear
- n = 0: not in problem constraints

</details>
"""


from typing import Any

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
        memo: dict[Any, Any] = {}

        def helper(n: Any) -> Any:
            if n <= 2:
                return n

            if n in memo:
                return memo[n]

            memo[n] = helper(n - 1) + helper(n - 2)
            return memo[n]

        return int(helper(n))


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
