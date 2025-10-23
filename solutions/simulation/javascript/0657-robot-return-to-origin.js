/**
 * # 657. Robot Return To Origin
 *
 * Solve problem #657: Robot Return To Origin
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
 * **Techniques**: Simulation, Counting
 * **Data Structures**: String
 * **Patterns**: Position tracking
 * **Time Complexity**: **O(n)**
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
 * ```
 * Input: example input
 * Output: example output
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Analysis of time complexity
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
