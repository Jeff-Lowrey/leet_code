"""
### INTUITION:
The key insight is that this is the classic Fibonacci problem in `disguise! To` reach step `n`, you can
either come from step (`n-1`) by taking 1 step, or from step (`n-2`) by taking 2 steps.
So: ways(n) = ways(`n-1`) + ways(`n-2`)

### APPROACH:
1. Base cases: ways(1)=1, ways(2)=2
2. For any step n: ways(n) = ways(`n-1`) + ways(`n-2`)
3. Use `bottom-up` DP to avoid redundant calculations

### WHY THIS WORKS:
The recurrence relation ways(n) = ways(n-1) + ways(n-2) is valid because the only ways to reach step n are by taking a 1-step from step n-1 or a 2-step from step n-2. These are mutually exclusive paths, so we can add them together. By starting with the base cases and building up to n, we ensure every subproblem is solved exactly once, avoiding the exponential time complexity of naive recursion.

### EXAMPLE WALKTHROUGH:
Input:
```
n = 3
```

Step 1: Build DP table
dp[0] = 1 (0 steps: 1 way)
dp[1] = 1 (1 step: one 1-step)
dp[2] = 2 (2 steps: two 1-steps or one 2-step)
dp[3] = dp[2] + dp[1] = 2 + 1 = 3
Step 2: Enumerate paths for verification
Path 1: 1+1+1
Path 2: 1+2
Path 3: 2+1

Output:
```
3 (ways to climb)
```

### TIME COMPLEXITY:
**O(n)** where n is the number of stairs. We iterate from step 3 to step n, performing constant-time arithmetic operations at each step. Each step's value is calculated exactly once by adding the previous two values, giving us a linear time complexity of **O(n)**. No repeated subproblem calculations occur due to the bottom-up approach.

### SPACE COMPLEXITY:
**O(1)** for the optimized solution - We only maintain two variables (prev1 and prev2) to track the last two Fibonacci values, regardless of n. The space doesn't grow with input size. Alternative: **O(n)** if using a full DP array to store all intermediate values from 1 to n, but the optimized approach only needs the last two values to compute the next one.

### EDGE CASES:
- **n = 1**: Returns 1 (only one way: single 1-step)
- **n = 2**: Returns 2 (two ways: two 1-steps or one 2-step)
- **Small n**: Base cases handled directly
- **Large n**: Fibonacci grows exponentially but algorithm remains O(n) time
- **n = 0**: Not in problem constraints, but would return 1 (one way to stay at ground)
- **Maximum constraints**: For very large n, integer overflow possible in other languages (Python handles big integers automatically)

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
