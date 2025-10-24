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
 * Example:
 * Input: `n` = 3
 * Output: 3
 * Explanation: There are three ways to climb to the top.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n` = 3</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>Ways to climb 3 stairs: 3 methods [1+1+1, 1+2, 2+1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Basic Types
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

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

/**
 * Main solution for Problem 070: Climbing Stairs
 *
 * @param {number} n - Number of steps to reach the top
 * @return {number} - Number of distinct ways to climb to the top
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(n) {
  if (n <= 2) {
    return n;
  }

  let prev2 = 1; // ways to reach step i-2
  let prev1 = 2; // ways to reach step i-1

  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

/**
 * Test cases for Problem 070: Climbing Stairs
 */
function testSolution() {
  console.log("Testing 070. Climbing Stairs");

  // Test case 1: n = 2
  const result1 = solve(2);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: n = 3
  const result2 = solve(3);
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: n = 5
  const result3 = solve(5);
  const expected3 = 8;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  console.log("All test cases passed for 070. Climbing Stairs!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 070. Climbing Stairs ===");
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
