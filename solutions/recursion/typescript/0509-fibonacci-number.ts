/**
 * # 509. Fibonacci Number
 *
 * # Difficulty: Easy
 *
 * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
 * such that each number is the sum of the two preceding ones, starting from 0 and 1. That is:
 *
 * F(0) = 0, F(1) = 1
 * F(n) = F(n - 1) + F(n - 2), for n > 1.
 *
 * Given n, calculate F(n).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 4</dd>
 * <dt>Output:</dt>
 * <dd>3</dd>
 * <dt>Explanation:</dt>
 * <dd>F(4) = F(3) + F(2) = 2 + 1 = 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Recursion, Memoization, Iteration
 * **Data Structures**: Map (for memoization)
 * **Patterns**: Base Case Recursion, Top-Down DP
 * **Time Complexity**: O(2^n) naive, O(n) with memoization
 * **Space Complexity**: O(n) for recursion stack and memoization
 *
 * ### INTUITION:
 * The Fibonacci sequence is the classic example of recursion. Each number is defined
 * recursively as the sum of the two preceding numbers, with base cases F(0)=0 and F(1)=1.
 *
 * ### APPROACH:
 * 1. **Base cases**: If n is 0 or 1, return n directly
 * 2. **Recursive case**: Return fib(n-1) + fib(n-2)
 * 3. **Optimization**: Use memoization to avoid redundant calculations
 *
 * ### WHY THIS WORKS:
 * - The Fibonacci definition is inherently recursive
 * - Base cases prevent infinite recursion
 * - Memoization reduces time complexity from exponential to linear
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: n = 4
 * fib(4) = fib(3) + fib(2)
 * fib(3) = fib(2) + fib(1) = 1 + 1 = 2
 * fib(2) = fib(1) + fib(0) = 1 + 0 = 1
 * fib(4) = 2 + 1 = 3
 * ```
 *
 * ### TIME COMPLEXITY:
 * - Naive recursion: O(2^n) - exponential
 * - With memoization: O(n) - linear
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion stack depth
 *
 * ### EDGE CASES:
 * - n = 0: return 0
 * - n = 1: return 1
 * - Large n: use memoization to avoid timeout
 *
 * </details>
 */

class Solution {
  /**
   * Calculate Fibonacci number using simple recursion.
   *
   * Time Complexity: O(2^n)
   * Space Complexity: O(n)
   */
  fib(n: number): number {
    // Base cases
    if (n <= 1) {
      return n;
    }

    // Recursive case
    return this.fib(n - 1) + this.fib(n - 2);
  }

  /**
   * Calculate Fibonacci using recursion with memoization.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  fibMemoization(n: number): number {
    const memo = new Map<number, number>();

    const helper = (num: number): number => {
      if (num <= 1) {
        return num;
      }

      if (memo.has(num)) {
        return memo.get(num)!;
      }

      const result = helper(num - 1) + helper(num - 2);
      memo.set(num, result);
      return result;
    };

    return helper(n);
  }

  /**
   * Calculate Fibonacci iteratively (most efficient).
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  fibIterative(n: number): number {
    if (n <= 1) {
      return n;
    }

    let prev2 = 0;
    let prev1 = 1;

    for (let i = 2; i <= n; i++) {
      const current = prev1 + prev2;
      prev2 = prev1;
      prev1 = current;
    }

    return prev1;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Small values
  console.log(`Test 1: ${solution.fib(0) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.fib(1) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.fib(2) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.fib(3) === 2 ? "PASS" : "FAIL"}`);
  console.log(`Test 5: ${solution.fib(4) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${solution.fib(5) === 5 ? "PASS" : "FAIL"}`);

  // Test with memoization
  console.log(`Test 7 (Memo): ${solution.fibMemoization(10) === 55 ? "PASS" : "FAIL"}`);
  console.log(`Test 8 (Memo): ${solution.fibMemoization(15) === 610 ? "PASS" : "FAIL"}`);

  // Test iterative
  console.log(`Test 9 (Iterative): ${solution.fibIterative(20) === 6765 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
