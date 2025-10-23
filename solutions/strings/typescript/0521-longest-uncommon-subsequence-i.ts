/**
 * # 521. Longest Uncommon Subsequence I
 *
 * Solve problem #521: Longest Uncommon Subsequence I
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>input data here</dd>
 * <dt>Output:</dt>
 * <dd>output data here</dd>
 * <dt>Explanation:</dt>
 * <dd>Explanation of the solution</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: String comparison, Logical reasoning
 * **Data Structures**: String
 * **Patterns**: Brainteaser
 * **Time Complexity**: **O(n)**
 * **Space Complexity**: **O(n)**
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
 * ```
 * Input: example input
 * Output: example output
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

function findLUSlength(a: string, b: string): number {
    return a === b ? -1 : Math.max(a.length, b.length);
}

if (require.main === module) {
    const testCases: [string, string, number][] = [
        ["aba", "cdc", 3],
        ["aaa", "bbb", 3],
        ["aaa", "aaa", -1],
        ["a", "aa", 2],
    ];

    console.log("Testing findLUSlength:");
    for (const [a, b, expected] of testCases) {
        const result: number = findLUSlength(a, b);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} findLUSlength("${a}", "${b}") = ${result}, expected = ${expected}`);
    }
}

export { findLUSlength };
