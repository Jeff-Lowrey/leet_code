/**
 * # 0509. Fibonacci Number
 *
 * Difficulty: Medium
 *
 * Solve the Fibonacci Number problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>* ```</dd>
 * <dt>Output:</dt>
 * <dd>* ```</dd>
 * <dt>Explanation:</dt>
 * <dd>Processing input produces the expected output</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: * - Recursion
 * **Data Structures**: * - Map (for memoization)
 * **Patterns**: * - Top-down recursion with memoization
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
 * * The Fibonacci sequence is the classic example of recursion. Each number is defined
 *  * recursively as the sum of the two preceding numbers, with base cases F(0)=0 and F(1)=1.
 *  *
 *  * ### APPROACH:
 * * 1. **Base cases**: If n is 0 or 1, return n directly
 *  * 2. **Recursive case**: Return fib(n-1) + fib(n-2)
 *  * 3. **Optimization**: Use memoization to avoid redundant calculations
 *  *
 *  * ### WHY THIS WORKS:
 *  * - The Fibonacci definition is inherently recursive
 *  * - Base cases prevent infinite recursion
 *  * - Memoization reduces time complexity from exponential to linear
 *  *
 *  * ### EXAMPLE WALKTHROUGH:
 *  * ```
 *  * Input: n = 4
 *  * fib(4) = fib(3) + fib(2)
 *  * fib(3) = fib(2) + fib(1) = 1 + 1 = 2
 *  * fib(2) = fib(1) + fib(0) = 1 + 0 = 1
 *  * fib(4) = 2 + 1 = 3
 *  * ```
 *  *
 *  * ### TIME COMPLEXITY:
 *  * - Naive recursion: O(2^n) - exponential
 *  * - With memoization: O(n) - linear
 *  *
 *  * ### SPACE COMPLEXITY:
 *  * O(n) - recursion stack depth
 *  *
 *  * ### EDGE CASES:
 *  * - n = 0: return 0
 *  * - n = 1: return 1
 *  * - Large n: use memoization to avoid timeout
 *  *
 *  *
*/

/**
 * Calculate nth Fibonacci number using memoized recursion.
 * @param n - Non-negative integer
 * @returns The nth Fibonacci number
 */
function fib(n: number): number {
    const memo: Map<number, number> = new Map();

    function helper(k: number): number {
        if (memo.has(k)) {
            return memo.get(k)!;
        }

        if (k <= 1) {
            return k;
        }

        const result: number = helper(k - 1) + helper(k - 2);
        memo.set(k, result);
        return result;
    }

    return helper(n);
}

/**
 * Naive recursive solution (exponential time).
 * @param n - Non-negative integer
 * @returns The nth Fibonacci number
 */
function fibNaive(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibNaive(n - 1) + fibNaive(n - 2);
}

/**
 * Iterative solution with O(1) space.
 * @param n - Non-negative integer
 * @returns The nth Fibonacci number
 */
function fibIterative(n: number): number {
    if (n <= 1) {
        return n;
    }

    let prev2: number = 0;
    let prev1: number = 1;

    for (let i = 2; i <= n; i++) {
        const current: number = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

/**
 * Bottom-up dynamic programming solution.
 * @param n - Non-negative integer
 * @returns The nth Fibonacci number
 */
function fibDP(n: number): number {
    if (n <= 1) {
        return n;
    }

    const dp: number[] = new Array(n + 1);
    dp[0] = 0;
    dp[1] = 1;

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Test cases
if (require.main === module) {
    const testCases: [number, number][] = [
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
        const result: number = fib(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} fib(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting fibIterative (O(1) space):");
    for (const [n, expected] of testCases) {
        const result: number = fibIterative(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} fibIterative(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting fibDP (bottom-up DP):");
    for (const [n, expected] of testCases) {
        const result: number = fibDP(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} fibDP(${n}) = ${result}, expected = ${expected}`);
    }

    // Only test naive version with small inputs (exponential time!)
    console.log("\nTesting fibNaive (naive recursion - small inputs only):");
    for (const [n, expected] of testCases.slice(0, 7)) {
        const result: number = fibNaive(n);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} fibNaive(${n}) = ${result}, expected = ${expected}`);
    }
}

export { fib, fibNaive, fibIterative, fibDP };
