/**
 * # 390. Elimination Game
 *
 * Difficulty: Medium
 *
 * Solve the Elimination Game problem as described.
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
 * **Data Structures**: * - None (pure mathematical solution)
 * **Patterns**: * - Elimination pattern
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(1)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * example input
 * ```
 *
 * Output:
 * ```
 * example output
 * ```

 * ### TIME COMPLEXITY:
 * **O(n²)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

/**
 * Find the last remaining number after elimination process.
 * @param {number} n - Upper bound of the range [1, n]
 * @return {number} The last remaining number
 */
function lastRemaining(n) {
    let head = 1;  // Current head of the sequence
    let step = 1;  // Distance between consecutive remaining numbers
    let leftToRight = true;  // Direction of elimination
    let remaining = n;  // Count of remaining numbers

    while (remaining > 1) {
        // Update head if:
        // 1. Going left to right (always update)
        // 2. Going right to left AND odd count (head would be eliminated)
        if (leftToRight || remaining % 2 === 1) {
            head += step;
        }

        // After each round:
        remaining = Math.floor(remaining / 2);  // Half the numbers remain
        step *= 2;  // Numbers are twice as far apart
        leftToRight = !leftToRight;  // Alternate direction
    }

    return head;
}

/**
 * Recursive solution for the elimination game.
 * @param {number} n - Upper bound of the range [1, n]
 * @return {number} The last remaining number
 */
function lastRemainingRecursive(n) {
    function helper(n, leftToRight) {
        // Base case
        if (n === 1) {
            return 1;
        }

        // If going left to right, result is 2 * helper for right to left
        // with n//2 elements
        if (leftToRight) {
            return 2 * helper(Math.floor(n / 2), false);
        } else {
            // If going right to left:
            // - If n is odd, same as left to right
            // - If n is even, result is 2 * helper - 1
            if (n % 2 === 1) {
                return 2 * helper(Math.floor(n / 2), true);
            } else {
                return 2 * helper(Math.floor(n / 2), true) - 1;
            }
        }
    }

    return helper(n, true);
}

// Test cases
if (require.main === module) {
    const testCases = [
        [1, 1],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 4],
        [7, 4],
        [8, 6],
        [9, 6],
        [10, 8],
        [100, 54],
        [1000, 510]
    ];

    console.log("Testing lastRemaining (iterative):");
    for (const [n, expected] of testCases) {
        const result = lastRemaining(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} lastRemaining(${n}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting lastRemainingRecursive:");
    for (const [n, expected] of testCases) {
        const result = lastRemainingRecursive(n);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} lastRemainingRecursive(${n}) = ${result}, expected = ${expected}`);
    }
}

module.exports = { lastRemaining, lastRemainingRecursive };
