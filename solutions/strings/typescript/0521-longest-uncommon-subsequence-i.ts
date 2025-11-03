/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * 1. **Initialize data structures**: Set up the required data structures for the algorithm
 * 2. **Process input**: Iterate through the input applying the core technique
 * 3. **Track state**: Maintain necessary state information during processing
 * 4. **Return result**: Construct and return the final solution
 *
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
 *
 * Step-by-step execution:
 * 1. [First step]
 * 2. [Second step]
 * 3. [Final step]
 *
 * ### TIME COMPLEXITY:
 * O(n)** - Analysis of time complexity - [Add explanation of why this complexity]
 *
 * ### SPACE COMPLEXITY:
 * O(n)** - Analysis of space complexity - [Add explanation of why this complexity]
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
