/**
 * # 1041. Robot Bounded In Circle
 *
 * LeetCode Problem 1041: Robot Bounded In Circle
 * Difficulty: Medium
 * Category: Simulation
 *
 * METADATA:
 * Techniques: Simulation, Direction tracking
 * Data Structures: String
 * Patterns: Cycle detection
 * Time Complexity: O(n)
 * Space Complexity: O(1)
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
