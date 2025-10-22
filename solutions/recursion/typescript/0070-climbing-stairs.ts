/**
 * # 70. Climbing Stairs
 *
 * # Difficulty: Easy
 *
 * You are climbing a staircase. It takes n steps to reach the top.
 *
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 3</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>There are three ways to climb to the top: 1+1+1, 1+2, 2+1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Dynamic Programming, Memoization
 * **Data Structures**: Hash Map (for memoization)
 * **Patterns**: Fibonacci Pattern
 * **Time Complexity**: O(n) with memoization
 * **Space Complexity**: O(n) for memoization
 *
 * ### INTUITION:
 * To reach step n, you can come from step (n-1) by taking 1 step, or from step (n-2) by taking 2 steps.
 * So ways(n) = ways(n-1) + ways(n-2), which is the Fibonacci recurrence relation!
 *
 * ### APPROACH:
 * 1. **Base cases**: ways(1) = 1, ways(2) = 2
 * 2. **Recursive relation**: ways(n) = ways(n-1) + ways(n-2)
 * 3. **Memoization**: Cache results to avoid redundant calculations
 * 4. **Optimization**: Can be solved iteratively with O(1) space
 *
 * ### WHY THIS WORKS:
 * - Every path to step n must come through step (n-1) or (n-2)
 * - Total paths = paths through (n-1) + paths through (n-2)
 * - This matches Fibonacci sequence starting from F(1)=1, F(2)=2
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 4
 * ways(4) = ways(3) + ways(2)
 * ways(3) = ways(2) + ways(1) = 2 + 1 = 3
 * ways(2) = 2 (base case)
 * ways(4) = 3 + 2 = 5
 * The 5 ways are: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n) with memoization
 *
 * ### SPACE COMPLEXITY:
 * O(n) for memoization/recursion stack
 *
 * ### EDGE CASES:
 * - n = 1: return 1
 * - n = 2: return 2
 * - Large n: use memoization
 *
 * </details>
 */

class Solution {
  /**
   * Calculate ways to climb stairs using recursion with memoization.
   * Time Complexity: O(n), Space Complexity: O(n)
   */
  climbStairs(n: number): number {
    const memo = new Map<number, number>();

    const helper = (steps: number): number => {
      if (steps <= 2) {
        return steps;
      }
      if (memo.has(steps)) {
        return memo.get(steps)!;
      }
      const result = helper(steps - 1) + helper(steps - 2);
      memo.set(steps, result);
      return result;
    };

    return helper(n);
  }

  /**
   * Calculate ways iteratively.
   * Time Complexity: O(n), Space Complexity: O(1)
   */
  climbStairsIterative(n: number): number {
    if (n <= 2) {
      return n;
    }

    let prev2 = 1;
    let prev1 = 2;

    for (let i = 3; i <= n; i++) {
      const current = prev1 + prev2;
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();
  console.log(`Test 1: ${solution.climbStairs(1) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.climbStairs(2) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.climbStairs(3) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.climbStairs(4) === 5 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.climbStairs(5) === 8 ? "PASS" : "FAIL"}`);
  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
