/**
 * # 70. Climbing Stairs
 *
 * Difficulty: Easy
 *
 * # Difficulty: Easy
 *
 * You are climbing a staircase. It takes `n` steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you
 * climb to the top?
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 3</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Ways to climb 3 stairs: 3 methods [1+1+1, 1+2, 2+1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Dynamic Programming
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * This is the classic Fibonacci problem in `disguise! To` reach step `n`, you can
 * either come from step (`n-1`) by taking 1 step, or from step (`n-2`) by taking 2 steps.
 * So: ways(n) = ways(`n-1`) + ways(`n-2`)
 *
 * ### APPROACH:
 * 1. Base cases: ways(1)=1, ways(2)=2
 * 2. For any step n: ways(n) = ways(`n-1`) + ways(`n-2`)
 * 3. Use `bottom-up` DP to avoid redundant calculations
 *
 * ### WHY THIS WORKS:
 * The recurrence relation ways(n) = ways(n-1) + ways(n-2) is valid because the only ways to reach step n are by taking a 1-step from step n-1 or a 2-step from step n-2. These are mutually exclusive paths, so we can add them together. By starting with the base cases and building up to n, we ensure every subproblem is solved exactly once, avoiding the exponential time complexity of naive recursion.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 3
 * ```
 *
 * Step 1: Build DP table
 * dp[0] = 1 (0 steps: 1 way)
 * dp[1] = 1 (1 step: one 1-step)
 * dp[2] = 2 (2 steps: two 1-steps or one 2-step)
 * dp[3] = dp[2] + dp[1] = 2 + 1 = 3
 * Step 2: Enumerate paths for verification
 * Path 1: 1+1+1
 * Path 2: 1+2
 * Path 3: 2+1
 *
 * Output:
 * ```
 * 3 (ways to climb)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 * Single pass from 3 to n, constant work per iteration
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only store two variables (prev1, prev2), not full DP array
 *
 * ### EDGE CASES:
 * - n = 1: return 1 (one way)
 * - n = 2: return 2 (two ways)
 * - Large n: Fibonacci grows exponentially but algorithm is linear
 * - n = 0: not in problem constraints
 *
 * </details>
 */

class Solution {
  climbStairs(n: number): number {
    if (n <= 2) return n;

    let prev = 1;
    let curr = 2;

    for (let i = 3; i <= n; i++) {
      const temp = curr;
      curr = prev + curr;
      prev = temp;
    }

    return curr;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.climbStairs(2) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.climbStairs(3) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.climbStairs(5) === 8 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
