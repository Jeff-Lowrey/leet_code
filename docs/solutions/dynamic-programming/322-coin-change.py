"""
# Difficulty: Medium

You are given an integer array coins representing coins of different denominations
and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that
amount of money cannot be made up by any combination of the coins, `return -1`.

You may assume that you have an infinite number of each kind of coin.

Example:
Input: coins = [1,2,5], `amount = 11`
Output: 3
Explanation: 11 = `5 + 5` + 1

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This is a classic "minimum path to `target`" DP problem. For any amount, we want
the minimum coins needed. We can build this up from smaller amounts.

### APPROACH:
[Detailed explanation of the solution approach]

### WHY THIS WORKS:
- [Explanation of correctness]

### EXAMPLE WALKTHROUGH:
```
coins = [1,2,5], `amount = 11`

dp[0] = 0
dp[1] = 1 (use coin 1)
dp[2] = 1 (use coin 2)
dp[3] = 2 (use coin `2 + coin` 1)
dp[4] = 2 (use coin `2 + coin` 2)
dp[5] = 1 (use coin 5)
dp[6] = 2 (use coin `5 + coin` 1)
...
dp[11] = 3 (use coin `5 + coin` `5 + coin` 1)
```

### TIME COMPLEXITY:
O(amount × len(coins))
For each amount from 1 to target, try all coins

### SPACE COMPLEXITY:
O(amount)
DP array of size amount + 1

### EDGE CASES:
- Amount is 0: return 0 (no coins needed)
- No solution possible: return -1
- Single coin type: straightforward calculation
- Large amounts: DP handles efficiently

</details>
"""

class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        """
        Approach: Dynamic Programming (Bottom-up)
        Time Complexity: O(amount * len(coins))
        Space Complexity: O(amount)
        """
        # Initialize DP array
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        # For each amount from 1 to target
        for i in range(1, amount + 1):
            # Try each coin
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1

    def coinChangeTopDown(self, coins: list[int], amount: int) -> int:
        """
        Approach: Dynamic Programming (Top-down with memoization)
        Time Complexity: O(amount * len(coins))
        Space Complexity: O(amount)
        """
        memo = {}

        def dp(n):
            # Base cases
            if n == 0:
                return 0
            if n < 0:
                return float('inf')

            # Check memo
            if n in memo:
                return memo[n]

            # Try each coin
            min_coins = float('inf')
            for coin in coins:
                result = dp(n - coin)
                if result != float('inf'):
                    min_coins = min(min_coins, result + 1)

            memo[n] = min_coins
            return min_coins

        result = dp(amount)
        return result if result != float('inf') else -1

    def coinChangeBFS(self, coins: list[int], amount: int) -> int:
        """
        Approach: BFS
        Time Complexity: O(amount * len(coins))
        Space Complexity: O(amount)
        """
        if amount == 0:
            return 0

        from collections import deque
        queue = deque([0])
        visited = {0}
        level = 0

        while queue:
            level += 1
            size = len(queue)

            for _ in range(size):
                current = queue.popleft()

                for coin in coins:
                    next_amount = current + coin

                    if next_amount == amount:
                        return level

                    if next_amount < amount and next_amount not in visited:
                        visited.add(next_amount)
                        queue.append(next_amount)

        return -1

# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    coins1 = [1, 2, 5]
    amount1 = 11
    print(f"Input: coins = {coins1}, amount = {amount1}")
    print(f"Output: {solution.coinChange(coins1, amount1)}")  # 3

    # Test case 2
    coins2 = [2]
    amount2 = 3
    print(f"Input: coins = {coins2}, amount = {amount2}")
    print(f"Output: {solution.coinChange(coins2, amount2)}")  # -1

    # Test case 3
    coins3 = [1]
    amount3 = 0
    print(f"Input: coins = {coins3}, amount = {amount3}")
    print(f"Output: {solution.coinChange(coins3, amount3)}")  # 0
