/**
 * # 1041. Robot Bounded In Circle
 *
 * Difficulty: Medium
 *
 * Solve the Robot Bounded In Circle problem as described.
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
 * **Techniques**: Simulation, Direction tracking
 * **Data Structures**: String
 * **Patterns**: Cycle detection
 * **Time Complexity**: **O(n²)**
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
 * **O(n)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

function isRobotBounded(instructions: string): boolean {
    const directions: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let x: number = 0, y: number = 0, direction: number = 0;

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
    const testCases: [string, boolean][] = [
        ["GGLLGG", true],
        ["GG", false],
        ["GL", true],
    ];

    console.log("Testing isRobotBounded:");
    for (const [instructions, expected] of testCases) {
        const result: boolean = isRobotBounded(instructions);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} isRobotBounded("${instructions}") = ${result}, expected = ${expected}`);
    }
}

export { isRobotBounded };
