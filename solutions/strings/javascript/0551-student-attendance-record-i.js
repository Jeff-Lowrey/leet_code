/**
 * # 551. Student Attendance Record I
 *
 * Difficulty: Medium
 *
 * Solve the Student Attendance Record I problem as described.
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
 * **Techniques**: String traversal, Counting, Pattern matching
 * **Data Structures**: String
 * **Patterns**: State tracking
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

function checkRecord(s) {
    return (s.split('A').length - 1) < 2 && !s.includes('LLL');
}

function checkRecordSinglePass(s) {
    let absentCount = 0;
    let consecutiveLate = 0;

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
    const testCases = [
        ["PPALLP", true],
        ["PPALLL", false],
        ["ALLAPPL", false],
        ["LALL", true],
    ];

    console.log("Testing checkRecord:");
    for (const [s, expected] of testCases) {
        const result = checkRecord(s);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} checkRecord("${s}") = ${result}, expected = ${expected}`);
    }
}

module.exports = { checkRecord, checkRecordSinglePass };
