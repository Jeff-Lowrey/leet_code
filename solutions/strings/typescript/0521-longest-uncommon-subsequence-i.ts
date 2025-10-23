/**
 * # 521. Longest Uncommon Subsequence I
 *
 * LeetCode Problem 521: Longest Uncommon Subsequence I
 * Difficulty: Easy
 * Category: Strings
 *
 * METADATA:
 * Techniques: String comparison, Logical reasoning
 * Data Structures: String
 * Patterns: Brainteaser
 * Time Complexity: O(min(n, m))
 * Space Complexity: O(1)
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
