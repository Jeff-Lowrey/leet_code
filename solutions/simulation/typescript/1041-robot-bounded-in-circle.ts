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
