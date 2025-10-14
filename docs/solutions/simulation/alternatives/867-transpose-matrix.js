/**
 * # Difficulty: Easy
 *
 * # 867. Transpose Matrix
 *
 * Given a 2D integer array matrix, return the transpose of matrix.
 *
 * The transpose of a matrix is the matrix flipped over its main diagonal, switching
 * the matrix's row and column indices.
 *
 * Example 1:
 * Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * Output: [[1,4,7],[2,5,8],[3,6,9]]
 *
 * Example 2:
 * Input: matrix = [[1,2,3],[4,5,6]]
 * Output: [[1,4],[2,5],[3,6]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Transpose of [[1,2,3],[4,5,6]] is [[1,4],[2,5],[3,6]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Transposing a matrix means converting rows to columns and vice versa.
 * Element at position (i,j) in original matrix moves to position (j,i) in transposed matrix.
 * For an m×n matrix, transpose is n×m.
 *
 * ### APPROACH:
 * 1. **Create Result Matrix**: Size n×m (swapped dimensions)
 * 2. **Map Elements**: result[j][i] = matrix[i][j]
 * 3. **Iterate**: Process all elements once
 *
 * **Key Pattern**: Row-column swap
 * - Original: m rows × n columns
 * - Transpose: n rows × m columns
 * - Position mapping: (i,j) → (j,i)
 *
 * ### WHY THIS WORKS:
 * - Transpose definition: swap rows and columns
 * - By definition: A^T[j][i] = A[i][j]
 * - Creating new matrix with swapped dimensions accommodates the transformation
 * - Each element lands in exactly one position
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * matrix = [[1,2,3],
 *           [4,5,6]]
 *
 * Original: 2×3 (2 rows, 3 cols)
 *
 * Element positions:
 * (0,0):1 → (0,0):1
 * (0,1):2 → (1,0):2
 * (0,2):3 → (2,0):3
 * (1,0):4 → (0,1):4
 * (1,1):5 → (1,1):5
 * (1,2):6 → (2,1):6
 *
 * Result: 3×2 (3 rows, 2 cols)
 * [[1,4],
 *  [2,5],
 *  [3,6]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Must visit every element once
 *
 * ### SPACE COMPLEXITY:
 * O(m × n)
 * - Need to create new matrix of same total size (different dimensions)
 *
 * ### EDGE CASES:
 * - Square matrix (n×n): Transpose is also n×n
 * - Single row: Becomes single column
 * - Single column: Becomes single row
 * - Single cell: Unchanged [[1]] → [[1]]
 *
 * </details>
 */

/**
 * Main solution for Problem 867: Transpose Matrix
 *
 * @param {number[][]} matrix - m x n matrix
 * @return {number[][]} - Transposed n x m matrix
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(n × m)
 */
function solve(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return matrix;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    // Create result matrix with swapped dimensions
    const result = Array(n).fill(0).map(() => Array(m).fill(0));

    // Copy elements to transposed positions
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }

    return result;
}

/**
 * Test cases for Problem 867: Transpose Matrix
 */
function testSolution() {
    console.log('Testing 867. Transpose Matrix');

    // Helper function to compare matrices
    const matricesEqual = (mat1, mat2) => {
        if (mat1.length !== mat2.length) return false;
        for (let i = 0; i < mat1.length; i++) {
            if (mat1[i].length !== mat2[i].length) return false;
            for (let j = 0; j < mat1[i].length; j++) {
                if (mat1[i][j] !== mat2[i][j]) return false;
            }
        }
        return true;
    };

    // Test case 1: 2x3 matrix
    const result1 = solve([[1,2,3],[4,5,6]]);
    const expected1 = [[1,4],[2,5],[3,6]];
    console.assert(matricesEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: 3x2 matrix
    const result2 = solve([[1,2],[3,4],[5,6]]);
    const expected2 = [[1,3,5],[2,4,6]];
    console.assert(matricesEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single element
    const result3 = solve([[1]]);
    const expected3 = [[1]];
    console.assert(matricesEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single row
    const result4 = solve([[1,2,3,4]]);
    const expected4 = [[1],[2],[3],[4]];
    console.assert(matricesEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Single column
    const result5 = solve([[1],[2],[3]]);
    const expected5 = [[1,2,3]];
    console.assert(matricesEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Square matrix
    const result6 = solve([[1,2],[3,4]]);
    const expected6 = [[1,3],[2,4]];
    console.assert(matricesEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 867. Transpose Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 867. Transpose Matrix ===');
    console.log('Category: Simulation');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
