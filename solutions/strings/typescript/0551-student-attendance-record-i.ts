/**
 * # 551. Student Attendance Record I
 *
 * LeetCode Problem 551: Student Attendance Record I
 * Difficulty: Easy
 * Category: Strings
 *
 * METADATA:
 * Techniques: String traversal, Counting, Pattern matching
 * Data Structures: String
 * Patterns: State tracking
 * Time Complexity: O(n)
 * Space Complexity: O(1)
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
