/**
 * # 0304. Range Sum Query 2D - Immutable
 *
 * Difficulty: Medium
 *
 * Given a 2D matrix, handle multiple queries of the following type:
 * Calculate the sum of the elements of matrix inside the rectangle defined by its upper left
 * corner (row1, col1) and lower right corner (row2, col2).
 *
 * Implement the NumMatrix class:
 * - NumMatrix(int[][] matrix) Initializes the object with the integer matrix.
 * - int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements
 *   of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower
 *   right corner (row2, col2).
 *
 * **Example:**
 *
 * Input:
 * ["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
 * [[[[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]], [2, 1, 4, 3], [1, 1, 2, 2], [1, 2, 2, 4]]
 *
 * Output:
 * [null, 8, 11, 12]
 *
 * Explanation:
 * NumMatrix numMatrix = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]);
 * numMatrix.sumRegion(2, 1, 4, 3); // return 8 (sum of the red rectangle)
 * numMatrix.sumRegion(1, 1, 2, 2); // return 11 (sum of the green rectangle)
 * numMatrix.sumRegion(1, 2, 2, 4); // return 12 (sum of the blue rectangle)
 *
 * **Constraints:**
 * - m == matrix.length
 * - n == matrix[i].length
 * - 1 <= m, n <= 200
 * - -10^5 <= matrix[i][j] <= 10^5
 * - 0 <= row1 <= row2 < m
 * - 0 <= col1 <= col2 < n
 * - At most 10^4 calls will be made to sumRegion.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Prefix sum (2D), Dynamic programming, Preprocessing
 * **Data Structures**: 2D array, Matrix
 * **Patterns**: Prefix sum, Range query optimization
 * **Time Complexity**: Constructor O(m * n), sumRegion O(1)
 * **Space Complexity**: O(m * n)
 *
 * ### INTUITION:
 * The key insight is to preprocess the matrix into a 2D prefix sum array. This allows us to
 * answer range sum queries in O(1) time. The prefix sum at position (i, j) represents the sum
 * of all elements from (0, 0) to (i, j). Using inclusion-exclusion principle, we can calculate
 * any rectangular sum in constant time.
 *
 * ### APPROACH:
 * 1. Create a 2D prefix sum matrix during preprocessing where prefix[i][j] = sum of all elements from (0,0) to (i-1,j-1)
 * 2. To avoid index out of bounds, make prefix matrix (m+1) x (n+1) with padding
 * 3. Build prefix sum using dynamic programming: prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1]
 * 4. For range query (r1,c1) to (r2,c2), use preprocessing results for O(1) lookup:
 *    sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
 *
 * ### WHY THIS WORKS:
 * The 2D prefix sum uses the inclusion-exclusion principle:
 * - prefix[r2+1][c2+1] includes everything from (0,0) to (r2,c2)
 * - Subtract prefix[r1][c2+1] to remove rows above r1
 * - Subtract prefix[r2+1][c1] to remove columns left of c1
 * - Add back prefix[r1][c1] because it was subtracted twice
 *
 *

This solution uses dynamic programming for efficient implementation.

This solution uses preprocessing for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * **Input:** matrix = [[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]]
 * Operations: ["NumMatrix", "sumRegion(2,1,4,3)", "sumRegion(1,1,2,2)", "sumRegion(1,2,2,4)"]
 *
 * **Step 1:** Create prefix sum matrix with padding
 *
 * Matrix: [[3, 0, 1, 4, 2],
 *          [5, 6, 3, 2, 1],
 *          [1, 2, 0, 1, 5],
 *          [4, 1, 0, 1, 7],
 *          [1, 0, 3, 0, 5]]
 *
 * Prefix sum (with padding):
 * [[0,  0,  0,  0,  0,  0],
 *  [0,  3,  3,  4,  8, 10],
 *  [0,  8, 14, 18, 24, 27],
 *  [0,  9, 17, 21, 28, 36],
 *  [0, 13, 22, 26, 34, 49],
 *  [0, 14, 23, 30, 38, 58]]
 *
 * Query sumRegion(2, 1, 4, 3):
 * sum = prefix[5][4] - prefix[2][4] - prefix[5][1] + prefix[2][1]
 *     = 38 - 24 - 14 + 8 = 8 ✓
 *
 * Result: [null, 8, 11, 12]
 *
 * ### TIME COMPLEXITY:
 * **Constructor: O(m * n)** where m, n are matrix dimensions - must compute all prefix sums
 * **sumRegion: O(1)** - simple arithmetic using precomputed values
 *
 * ### SPACE COMPLEXITY:
 * **O(m * n)** - store prefix sum matrix of same dimensions as input
 *
 * ### EDGE CASES:
 * - Empty matrix: [[]] → No valid queries possible
 * - Single element matrix: [[5]] → sumRegion(0,0,0,0) returns 5
 * - Query covering entire matrix: sumRegion(0,0,m-1,n-1) returns sum of all elements
 * - Query for single cell: sumRegion(2,2,2,2) returns matrix[2][2]
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
