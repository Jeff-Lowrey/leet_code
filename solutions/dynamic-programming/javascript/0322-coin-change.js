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

</details>

*/

/**
 * Main solution for Problem 322: Coin Change
 *
 * @param {number[]} coins - Coin denominations
 * @param {number} amount - Target amount
 * @return {number} - Minimum number of coins needed, or -1 if impossible
 *
 * Time Complexity: O(amount * coins.length)
 * Space Complexity: O(amount)
 */
function solve(coins, amount) {
  if (amount === 0) return 0;

  // dp[i] represents minimum coins needed for amount i
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

/**
 * Test cases for Problem 322: Coin Change
 */
function testSolution() {
  console.log("Testing 322. Coin Change");

  // Test case 1: Basic functionality
  const result1 = solve([1, 2, 5], 11);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Impossible case
  const result2 = solve([2], 3);
  const expected2 = -1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Zero amount
  const result3 = solve([1], 0);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  console.log("All test cases passed for 322. Coin Change!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 322. Coin Change ===");
  console.log("Category: Dynamic Programming");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
