/**
 * # 509. Fibonacci Number
 *
 * LeetCode Problem 509: Fibonacci Number
 * Difficulty: Easy
 * Category: Recursion
 *
 * Problem Description:
 * The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence,
 * such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,
 *
 * F(0) = 0, F(1) = 1
 * F(n) = F(n - 1) + F(n - 2), for n > 1.
 *
 * Given n, calculate F(n).
 *
 * Example 1:
 * Input: n = 2
 * Output: 1
 * Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
 *
 * Example 2:
 * Input: n = 3
 * Output: 2
 * Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
 *
 * Example 3:
 * Input: n = 4
 * Output: 3
 * Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 *
 * Constraints:
 * - 0 <= n <= 30
 *
 * METADATA:
 * Techniques:
 * - Recursion
 * - Memoization
 * - Dynamic programming
 * - Iterative solution
 *
 * Data Structures:
 * - Map (for memoization)
 * - Array (for DP)
 *
 * Patterns:
 * - Top-down recursion with memoization
 * - Bottom-up dynamic programming
 * - Space optimization
 *
 * Time Complexity:
 * - Naive recursion: O(2^n)
 * - Memoized recursion: O(n)
 * - Iterative DP: O(n)
 * - Space-optimized iterative: O(n)
 *
 * Space Complexity:
 * - Naive recursion: O(n) call stack
 * - Memoized recursion: O(n) memoization + O(n) call stack
 * - Iterative DP: O(n) for array
 * - Space-optimized: O(1)
 *
 * Intuition:
 * The Fibonacci sequence is defined recursively, making it a natural fit for recursive solutions.
 * However, naive recursion results in exponential time complexity due to redundant calculations.
 * We can optimize using memoization (caching results) or convert to an iterative solution.
 * Further optimization reduces space to O(1) by only tracking the last two values.
 *
 * Approach:
 * 1. Naive recursion: Direct implementation of the recursive formula
 * 2. Memoized recursion: Cache computed values to avoid recomputation
 * 3. Iterative DP: Build up from base cases using a loop
 * 4. Space-optimized: Only keep track of previous two values
 *
 * Why This Works:
 * The Fibonacci sequence has overlapping subproblems - F(n) depends on F(n-1) and F(n-2),
 * which in turn depend on earlier values. By caching or building from the bottom up,
 * we eliminate redundant calculations and achieve linear time complexity.
 *
 * Example Walkthrough:
 * Example: n = 5
 * - F(0) = 0
 * - F(1) = 1
 * - F(2) = F(1) + F(0) = 1 + 0 = 1
 * - F(3) = F(2) + F(1) = 1 + 1 = 2
 * - F(4) = F(3) + F(2) = 2 + 1 = 3
 * - F(5) = F(4) + F(3) = 3 + 2 = 5
 *
 * Naive recursion makes many redundant calls:
 * F(5) calls F(4) and F(3)
 * F(4) calls F(3) and F(2)
 * F(3) is computed twice already!
 */

/**
 * Calculate nth Fibonacci number using memoized recursion.
 * @param {number} n - Non-negative integer
 * @return {number} The nth Fibonacci number
 */
function fib(n) {
    const memo = new Map();

    function helper(k) {
        if (memo.has(k)) {
            return memo.get(k);
        }

        if (k <= 1) {
            return k;
        }

        const result = helper(k - 1) + helper(k - 2);
        memo.set(k, result);
        return result;
    }

    return helper(n);
}

/**
 * Naive recursive solution (exponential time).
 * @param {number} n - Non-negative integer
 * @return {number} The nth Fibonacci number
 */
function fibNaive(n) {
    if (n <= 1) {
        return n;
    }
    return fibNaive(n - 1) + fibNaive(n - 2);
}

/**
 * Iterative solution with O(1) space.
 * @param {number} n - Non-negative integer
 * @return {number} The nth Fibonacci number
 */
function fibIterative(n) {
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

/**
 * Bottom-up dynamic programming solution.
 * @param {number} n - Non-negative integer
 * @return {number} The nth Fibonacci number
 */
function fibDP(n) {
    if (n <= 1) {
        return n;
    }

    const dp = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Test cases
if (require.main === module) {
    const testCases = [
        [0, 0],
        [1, 1],
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 5],
        [6, 8],
        [10, 55],
        [15, 610]
    ];

    console.log("Testing fib (memoized recursion):");
    for (const [n, expected] of testCases) {
        const result = fib(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} fib(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting fibIterative (O(1) space):");
    for (const [n, expected] of testCases) {
        const result = fibIterative(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} fibIterative(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting fibDP (bottom-up DP):");
    for (const [n, expected] of testCases) {
        const result = fibDP(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} fibDP(${n}) = ${result}, expected = ${expected}`);
    }

    // Only test naive version with small inputs (exponential time!)
    console.log("\nTesting fibNaive (naive recursion - small inputs only):");
    for (const [n, expected] of testCases.slice(0, 7)) {
        const result = fibNaive(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} fibNaive(${n}) = ${result}, expected = ${expected}`);
    }
}

module.exports = { fib, fibNaive, fibIterative, fibDP };
