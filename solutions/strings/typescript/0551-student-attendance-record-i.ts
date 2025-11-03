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
 * O(n²)** - Analysis of time complexity - [Add explanation of why this complexity]
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

function checkRecord(s: string): boolean {
    return (s.split('A').length - 1) < 2 && !s.includes('LLL');
}

function checkRecordSinglePass(s: string): boolean {
    let absentCount: number = 0;
    let consecutiveLate: number = 0;

    for (const char of s) {
        if (char === 'A') {
            absentCount++;
            if (absentCount >= 2) return false;
            consecutiveLate = 0;
        } else if (char === 'L') {
            consecutiveLate++;
            if (consecutiveLate >= 3) return false;
        } else {
            consecutiveLate = 0;
        }
    }

    return true;
}

if (require.main === module) {
    const testCases: [string, boolean][] = [
        ["PPALLP", true],
        ["PPALLL", false],
        ["ALLAPPL", false],
        ["LALL", true],
    ];

    console.log("Testing checkRecord:");
    for (const [s, expected] of testCases) {
        const result: boolean = checkRecord(s);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} checkRecord("${s}") = ${result}, expected = ${expected}`);
    }
}

export { checkRecord, checkRecordSinglePass };
