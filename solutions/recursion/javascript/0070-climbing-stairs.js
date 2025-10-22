/**
 * # 70. Climbing Stairs
 * # Difficulty: Easy
 *
 * @param {number} n
 * @return {number}
 */

class Solution {
  /**
   * Calculate ways to climb stairs using recursion with memoization.
   * Time Complexity: O(n), Space Complexity: O(n)
   */
  climbStairs(n) {
    const memo = {};

    const helper = (steps) => {
      if (steps <= 2) {
        return steps;
      }
      if (steps in memo) {
        return memo[steps];
      }
      memo[steps] = helper(steps - 1) + helper(steps - 2);
      return memo[steps];
    };

    return helper(n);
  }

  /**
   * Calculate ways iteratively.
   * Time Complexity: O(n), Space Complexity: O(1)
   */
  climbStairsIterative(n) {
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

function runTests() {
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
