/**
 * # 885. Spiral Matrix Iii
 *
 * LeetCode Problem 885: Spiral Matrix III
 * Difficulty: Medium
 * Category: Simulation
 *
 * METADATA:
 * Techniques: Simulation, Direction control
 * Data Structures: Array
 * Patterns: Spiral pattern
 * Time Complexity: O(max(rows, cols)^2)
 * Space Complexity: O(rows * cols)
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
