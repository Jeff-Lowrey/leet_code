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

function spiralMatrixIII(rows, cols, rStart, cStart) {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const result = [];
    let r = rStart, c = cStart;
    let direction = 0, steps = 1;

    result.push([r, c]);

    while (result.length < rows * cols) {
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < steps; j++) {
                r += directions[direction][0];
                c += directions[direction][1];
                if (r >= 0 && r < rows && c >= 0 && c < cols) {
                    result.push([r, c]);
                }
            }
            direction = (direction + 1) % 4;
            if (result.length >= rows * cols) break;
        }
        steps++;
    }

    return result;
}

if (require.main === module) {
    const testCases = [
        [1, 4, 0, 0, 4],
        [5, 6, 1, 4, 30],
    ];

    console.log("Testing spiralMatrixIII:");
    for (const [rows, cols, rStart, cStart, expectedLen] of testCases) {
        const result = spiralMatrixIII(rows, cols, rStart, cStart);
        const status = result.length === expectedLen ? "✓" : "✗";
        console.log(`${status} spiralMatrixIII(${rows}, ${cols}, ${rStart}, ${cStart}) returned ${result.length} coordinates, expected ${expectedLen}`);
    }
}

module.exports = { spiralMatrixIII };
