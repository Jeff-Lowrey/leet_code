/**
 * # 1041. Robot Bounded In Circle
 *
 * Solve problem #1041: Robot Bounded In Circle
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
 * **Techniques**: Simulation, Direction tracking
 * **Data Structures**: String
 * **Patterns**: Cycle detection
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

### TIME COMPLEXITY:
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

function isRobotBounded(instructions) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let x = 0, y = 0, direction = 0;

    for (const instruction of instructions) {
        if (instruction === 'G') {
            x += directions[direction][0];
            y += directions[direction][1];
        } else if (instruction === 'L') {
            direction = (direction + 3) % 4;
        } else if (instruction === 'R') {
            direction = (direction + 1) % 4;
        }
    }

    return (x === 0 && y === 0) || direction !== 0;
}

if (require.main === module) {
    const testCases = [
        ["GGLLGG", true],
        ["GG", false],
        ["GL", true],
    ];

    console.log("Testing isRobotBounded:");
    for (const [instructions, expected] of testCases) {
        const result = isRobotBounded(instructions);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} isRobotBounded("${instructions}") = ${result}, expected = ${expected}`);
    }
}

module.exports = { isRobotBounded };
