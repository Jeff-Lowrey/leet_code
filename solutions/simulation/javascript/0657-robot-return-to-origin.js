/**
 * # 657. Robot Return To Origin
 *
 * LeetCode Problem 657: Robot Return to Origin
 * Difficulty: Easy
 * Category: Simulation
 *
 * METADATA:
 * Techniques: Simulation, Counting
 * Data Structures: String
 * Patterns: Position tracking
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function judgeCircle(moves) {
    return (moves.split('U').length - 1) === (moves.split('D').length - 1) &&
           (moves.split('L').length - 1) === (moves.split('R').length - 1);
}

if (require.main === module) {
    const testCases = [
        ["UD", true],
        ["LL", false],
        ["UDLR", true],
    ];

    console.log("Testing judgeCircle:");
    for (const [moves, expected] of testCases) {
        const result = judgeCircle(moves);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} judgeCircle("${moves}") = ${result}, expected = ${expected}`);
    }
}

module.exports = { judgeCircle };
