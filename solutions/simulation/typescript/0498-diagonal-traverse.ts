/**
 * # 498. Diagonal Traverse
 *
 * Solve problem #498: Diagonal Traverse
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
 * **Techniques**: Simulation, Direction control
 * **Data Structures**: Matrix, Array
 * **Patterns**: Diagonal pattern
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
 * ```
 * Input: example input
 * Output: example output
 * ```
 *
 * ### TIME COMPLEXITY:
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

function findDiagonalOrder(mat: number[][]): number[] {
    if (!mat || !mat.length || !mat[0].length) return [];

    const m: number = mat.length, n: number = mat[0].length;
    const result: number[] = [];
    let row: number = 0, col: number = 0, goingUp: boolean = true;

    for (let i = 0; i < m * n; i++) {
        result.push(mat[row][col]);

        if (goingUp) {
            if (col === n - 1) {
                row++;
                goingUp = false;
            } else if (row === 0) {
                col++;
                goingUp = false;
            } else {
                row--;
                col++;
            }
        } else {
            if (row === m - 1) {
                col++;
                goingUp = true;
            } else if (col === 0) {
                row++;
                goingUp = true;
            } else {
                row++;
                col--;
            }
        }
    }

    return result;
}

if (require.main === module) {
    const testCases: [number[][], number[]][] = [
        [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 4, 7, 5, 3, 6, 8, 9]],
        [[[1, 2], [3, 4]], [1, 2, 3, 4]],
    ];

    console.log("Testing findDiagonalOrder:");
    for (const [mat, expected] of testCases) {
        const result: number[] = findDiagonalOrder(mat);
        const status: string = JSON.stringify(result) === JSON.stringify(expected) ? "✓" : "✗";
        console.log(`${status} findDiagonalOrder(${JSON.stringify(mat)})`);
        console.log(`   = ${JSON.stringify(result)}, expected = ${JSON.stringify(expected)}`);
    }
}

export { findDiagonalOrder };
