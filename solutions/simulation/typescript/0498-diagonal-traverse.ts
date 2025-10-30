/**
 * # 0498. Diagonal Traverse
 *
 * # Difficulty: Medium
 *
 * Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.
 *
 * Example 1:
 * Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [1,2,4,7,5,3,6,8,9]
 *
 * Example 2:
 * Input: mat = [[1,2],[3,4]]
 * Output: [1,2,3,4]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3], [4, 5, 6], [7, 8, 9]]</dd>
 * <dt>Output:</dt>
 * <dd>[1,2,4,7,5,3,6,8,9]</dd>
 * <dt>Explanation:</dt>
 * <dd>Diagonal traversal of [[1,2,3],[4,5,6],[7,8,9]] is [1,2,4,7,5,3,6,8,9]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Simulation, Direction control, Diagonal traversal
 * **Data Structures**: Matrix, Array
 * **Patterns**: Diagonal pattern, Zigzag traversal
 * **Time Complexity**: O(m × n)
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Elements on the same diagonal have the same sum of row + column indices.
 * Traverse diagonals alternately upward and downward, handling direction changes
 * and boundaries carefully.
 *
 * ### APPROACH:
 * 1. **Diagonal Identification**: Elements at (i, j) where i + j = k are on the same diagonal, tracked in array
 * 2. **Direction Alternation**: Even-indexed diagonals go up-right, odd-indexed go down-left
 * 3. **Boundary Handling**: When hitting matrix edges, change to next diagonal with proper direction
 * 4. **Movement Pattern**:
 * - Going up: row--, col++ (move in matrix)
 * - Going down: row++, col-- (move in matrix)
 * - Hit boundary: adjust position and flip direction
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
 * **Step 1:** Diagonal 0 (sum=0)
 * - Elements where row+col=0: [1]
 * - Direction: up, Result: [1]
 *
 * **Step 2:** Diagonal 1 (sum=1)
 * - Elements where row+col=1: [2,4]
 * - Direction: down, Result: [1,2,4]
 *
 * **Step 3:** Diagonal 2 (sum=2)
 * - Elements where row+col=2: [7,5,3]
 * - Direction: up, Result: [1,2,4,7,5,3]
 *
 * **Step 4:** Diagonal 3 (sum=3)
 * - Elements where row+col=3: [6,8]
 * - Direction: down, Result: [1,2,4,7,5,3,6,8]
 *
 * **Step 5:** Diagonal 4 (sum=4)
 * - Elements where row+col=4: [9]
 * - Direction: up, Result: [1,2,4,7,5,3,6,8,9]
 *
 * **Output:** [1,2,4,7,5,3,6,8,9]
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
 * - Single element matrix: [[1]] → [1] (no diagonals to traverse)
 * - Single row matrix: [[1,2,3]] → [1,2,3] (all elements in order)
 * - Single column matrix: [[1],[2],[3]] → [1,2,3] (all elements in order)
 * - Non-square matrices: Different row and column counts (e.g., 2×3 or 3×2)
 * - Empty matrix: [] → [] (no elements to traverse)
 *
 *
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
