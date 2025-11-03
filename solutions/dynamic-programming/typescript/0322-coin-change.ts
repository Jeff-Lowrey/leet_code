/**
### INTUITION:
The key insight is that this is a classic "minimum path to `target`" DP problem. For any amount, we want
the minimum coins needed. We can build this up from smaller amounts.

### APPROACH:
1. **Initialize DP array**: Create array of size (amount + 1) filled with infinity, representing minimum coins needed for each amount
2. **Set base case**: Set dp[0] = 0 (zero coins needed to make amount 0)
3. **Iterate through amounts**: For each amount from 1 to target, calculate minimum coins needed
4. **Try each coin**: For current amount i, try using each coin denomination that doesn't exceed i
5. **Update DP value**: For each valid coin, calculate dp[i - coin] + 1 and take minimum across all coins
6. **Build up solution**: Each dp[i] is built from previously computed smaller amounts (bottom-up dynamic programming)
7. **Return result**: Return dp[amount] if reachable (not infinity), otherwise return -1 (impossible to make amount)

### WHY THIS WORKS:
Using BFS with a queue processes nodes level by level. Tracking level size ensures we group nodes correctly. This works because BFS naturally visits nodes in level order, and we can identify level boundaries by counting nodes in the queue at each level's start.

### EXAMPLE WALKTHROUGH:
Input:
```
coins = [1,2,5], `amount = 11`
```

dp[0] = 0
dp[1] = 1 (use coin 1)
dp[2] = 1 (use coin 2)
dp[3] = 2 (use coin `2 + coin` 1)
dp[4] = 2 (use coin `2 + coin` 2)
dp[5] = 1 (use coin 5)
dp[6] = 2 (use coin `5 + coin` 1)
...
dp[11] = 3 (use coin `5 + coin` `5 + coin` 1)

Output:
```
[Expected output]
```

Step-by-step execution:
1. [First step]
2. [Second step]
3. [Final step]

### TIME COMPLEXITY:
O(amount × len(coins)**)
For each amount from 1 to target, try all coins

### SPACE COMPLEXITY:
O(amount)**
DP array of size amount + 1

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
      for (const coin of coins) {
        if (i >= coin) {
          dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
      }
    }

    return dp[amount] > amount ? -1 : dp[amount];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.coinChange([1, 2, 5], 11) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.coinChange([2], 3) === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.coinChange([1], 0) === 0 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
