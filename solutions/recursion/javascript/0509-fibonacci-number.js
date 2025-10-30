/**
 * # 0509. Fibonacci Number
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
 * **Data Structures**: Array (for memoization)
 * **Patterns**: Base Case Recursion, Top-Down DP
 * **Time Complexity**: O(2^n) naive, O(n) with memoization
 * **Space Complexity**: O(n) for recursion stack and memoization
 *
 * ### INTUITION:
 * The Fibonacci sequence is the classic example of recursion. Each number is defined
 * recursively as the sum of the two preceding numbers, with base cases F(0)=0 and F(1)=1.
 *
 * ### APPROACH:
 * 1. **Base cases**: If n is 0 or 1, return n directly from recursion
 * 2. **Recursive case**: Return fib(n-1) + fib(n-2) using recursion
 * 3. **Optimization**: Use memoization with array or hash map to avoid redundant calculations
 *
 * ### WHY THIS WORKS:
 * - The Fibonacci definition is inherently recursive
 * - Base cases prevent infinite recursion
 * - Memoization reduces time complexity from exponential to linear
 *
 *

This solution uses iteration for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * **Input:** n = 4
 *
 * **Step 1:** Base cases - F(0) = 0, F(1) = 1 (defined by problem)
 *
 * **Step 2:** Calculate F(2) = F(1) + F(0) = 1 + 0 = 1
 *
 * **Step 3:** Calculate F(3) = F(2) + F(1) = 1 + 1 = 2
 *
 * **Step 4:** Calculate F(4) = F(3) + F(2) = 2 + 1 = 3
 *
 * **Output:** 3
 *
 * ### TIME COMPLEXITY:
 * - Naive recursion: O(2^n) - exponential
 * - With memoization: O(n) - linear
 *
 * ### SPACE COMPLEXITY:
 * O(n) - recursion stack depth
 *
 * ### EDGE CASES:
 * - n = 0: Base case, F(0) = 0 (returns 0 immediately)
 * - n = 1: Base case, F(1) = 1 (returns 1 immediately)
 * - n = 2: First computed value F(2) = F(1) + F(0) = 1 + 0 = 1
 * - Large n (e.g., n > 30): Naive recursion O(2^n) causes timeout, memoization required for O(n)
 * - Maximum n value (constraints typically n ≤ 30): F(30) = 832040 still manageable with memoization
 *
 *
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
