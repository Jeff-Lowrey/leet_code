/**
 * # 0304. Range Sum Query 2d
 *
 * Difficulty: Medium
 *
 * Solve the Range Sum Query 2d problem as described.
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
 * **Techniques**: * - Prefix sum (2D)
 * **Data Structures**: * - 2D array
 * **Patterns**: * - Prefix sum
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

/**
 * Class for 2D range sum queries using prefix sum technique.
 */
class NumMatrix {
    /**
     * Initialize the NumMatrix with prefix sum preprocessing.
     * @param {number[][]} matrix - 2D array of integers
     */
    constructor(matrix) {
        if (!matrix || !matrix.length || !matrix[0].length) {
            this.prefix = [[]];
            return;
        }

        const m = matrix.length;
        const n = matrix[0].length;

        // Create prefix sum matrix with padding (m+1) x (n+1)
        this.prefix = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

        // Build prefix sum matrix
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                this.prefix[i][j] =
                    matrix[i - 1][j - 1]
                    + this.prefix[i - 1][j]
                    + this.prefix[i][j - 1]
                    - this.prefix[i - 1][j - 1];
            }
        }
    }

    /**
     * Calculate sum of rectangle from (row1, col1) to (row2, col2).
     * @param {number} row1 - Upper row index
     * @param {number} col1 - Left column index
     * @param {number} row2 - Lower row index
     * @param {number} col2 - Right column index
     * @return {number} Sum of elements in the specified rectangle
     */
    sumRegion(row1, col1, row2, col2) {
        // Apply inclusion-exclusion principle
        return (
            this.prefix[row2 + 1][col2 + 1]
            - this.prefix[row1][col2 + 1]
            - this.prefix[row2 + 1][col1]
            + this.prefix[row1][col1]
        );
    }
}

// Test cases
if (require.main === module) {
    // Test case 1
    const matrix = [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
    ];

    const numMatrix = new NumMatrix(matrix);

    const testCases = [
        [[2, 1, 4, 3], 8],
        [[1, 1, 2, 2], 11],
        [[1, 2, 2, 4], 12],
        [[0, 0, 4, 4], 58],
        [[0, 0, 0, 0], 3]
    ];

    console.log("Testing NumMatrix.sumRegion:");
    for (const [[row1, col1, row2, col2], expected] of testCases) {
        const result = numMatrix.sumRegion(row1, col1, row2, col2);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} sumRegion(${row1}, ${col1}, ${row2}, ${col2}) = ${result}, expected = ${expected}`);
    }

    // Test case 2: Single element matrix
    const matrix2 = [[5]];
    const numMatrix2 = new NumMatrix(matrix2);
    const result = numMatrix2.sumRegion(0, 0, 0, 0);
    console.log(`\nSingle element test: sumRegion(0, 0, 0, 0) = ${result}, expected = 5, ${result === 5 ? '✓' : '✗'}`);
}

module.exports = NumMatrix;
