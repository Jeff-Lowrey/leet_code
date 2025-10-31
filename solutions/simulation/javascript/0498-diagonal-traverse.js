/**
 * # 0498. Diagonal Traverse
 *
 * Difficulty: Medium
 *
 * Solve the Diagonal Traverse problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>mat = [[1,2,3], [4,5,6], [7,8,9]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,4,7,5,3,6,8,9]</dd>
 * <dt>Explanation:</dt>
 * <dd>Traverse diagonals in zigzag pattern: up-right then down-left alternating</dd>
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
 * Elements on the same diagonal have the same sum of row + column indices.
 * Traverse diagonals alternately upward and downward, handling direction changes
 * and boundaries carefully.
 *
 * ### APPROACH:
 * **Data structures: Matrix (2D array input), Array (result storage)**
 * 1. **Diagonal Identification**: Elements at (i, j) in matrix where i + j = k are on the same diagonal
 * 2. **Direction Alternation**: Even-indexed diagonals go up-right in array, odd-indexed go down-left in array
 * 3. **Boundary Handling**: When hitting matrix edges, change to next diagonal with proper direction
 * 4. **Movement Pattern** in array:
 * - Going up: row--, col++
 * - Going down: row++, col--
 * - Hit boundary: adjust position in array and flip direction
 *
 * **Key Observations**:
 * - Total diagonals = m + n - 1
 * - Diagonal d contains elements where i + j = d
 * - Direction alternates: up (d even), down (d odd)
 *
 * ### WHY THIS WORKS:
 * - Using row + col sum groups elements into diagonals naturally
 * - Alternating directions matches the required zigzag pattern
 * - Boundary checks ensure we stay within matrix bounds
 * - Direction flipping at boundaries creates the diagonal traversal pattern
 *
 * ### EXAMPLE WALKTHROUGH:
 * **Input:** mat = [[1,2,3], [4,5,6], [7,8,9]]
 *
 * **Step 1:** Initialize - Start at (0,0), direction = up for mat=[[1,2,3], [4,5,6], [7,8,9]]
 * - Add element 1, move according to boundary rules
 *
 * **Step 2:** Process diagonal sum=1 (down direction)
 * - Add elements: 2, then 4
 * - Hit boundaries and flip direction
 *
 * **Step 3:** Process diagonal sum=2 (up direction)
 * - Add elements: 7, 5, 3 (reverse order due to direction)
 * - Hit boundaries and flip direction
 *
 * **Step 4:** Continue pattern for remaining diagonals
 * - Diagonal sum=3 (down): 6, 8
 * - Diagonal sum=4 (up): 9
 *
 * Output:
 * ```
 * [1,2,4,7,5,3,6,8,9]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Visit each element exactly once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only use constant extra space (not counting output array)
 *
 * ### EDGE CASES:
 * - Single element matrix: mat=[[1]] → [1] (trivial case, no direction change needed)
 * - Single row matrix: mat=[[1,2,3]] → [1,2,3] (all elements traversed left to right)
 * - Single column matrix: mat=[[1],[2],[3]] → [1,2,3] (all elements traversed top to bottom)
 * - Non-square matrices: mat=[[1,2,3],[4,5,6]] → [1,2,4,5,3,6] (2×3 matrix handles proper diagonal traversal)
 *
 *
*/

function findDiagonalOrder(mat) {
    if (!mat || !mat.length || !mat[0].length) return [];

    const m = mat.length, n = mat[0].length;
    const result = [];
    let row = 0, col = 0, goingUp = true;

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
    const testCases = [
        [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [1, 2, 4, 7, 5, 3, 6, 8, 9]],
        [[[1, 2], [3, 4]], [1, 2, 3, 4]],
    ];

    console.log("Testing findDiagonalOrder:");
    for (const [mat, expected] of testCases) {
        const result = findDiagonalOrder(mat);
        const status = JSON.stringify(result) === JSON.stringify(expected) ? "✓" : "✗";
        console.log(`${status} findDiagonalOrder(${JSON.stringify(mat)})`);
        console.log(`   = ${JSON.stringify(result)}, expected = ${JSON.stringify(expected)}`);
    }
}

module.exports = { findDiagonalOrder };
