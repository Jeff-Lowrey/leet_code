/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 566: Reshape The Matrix
 *
 * @param {number[][]} mat - Original m x n matrix
 * @param {number} r - Target number of rows
 * @param {number} c - Target number of columns
 * @return {number[][]} - Reshaped matrix or original if impossible
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(r × c)
 */
function solve(mat, r, c) {
    if (!mat || mat.length === 0 || mat[0].length === 0) {
        return mat;
    }

    const m = mat.length;
    const n = mat[0].length;

    // Check if reshape is possible
    if (m * n !== r * c) {
        return mat;
    }

    // Create new matrix
    const result = Array(r).fill(0).map(() => Array(c).fill(0));

    // Fill new matrix by reading original in row-major order
    for (let i = 0; i < m * n; i++) {
        // Map index to original matrix position
        const origRow = Math.floor(i / n);
        const origCol = i % n;

        // Map index to new matrix position
        const newRow = Math.floor(i / c);
        const newCol = i % c;

        result[newRow][newCol] = mat[origRow][origCol];
    }

    return result;
}

/**
 * Test cases for Problem 566: Reshape The Matrix
 */
function testSolution() {
    console.log('Testing 566. Reshape The Matrix');

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

    // Test case 1: 2x2 to 1x4
    const result1 = solve([[1,2],[3,4]], 1, 4);
    const expected1 = [[1,2,3,4]];
    console.assert(matricesEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: 2x2 to 4x1
    const result2 = solve([[1,2],[3,4]], 4, 1);
    const expected2 = [[1],[2],[3],[4]];
    console.assert(matricesEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Impossible reshape (return original)
    const original3 = [[1,2],[3,4]];
    const result3 = solve(original3, 2, 3);
    console.assert(matricesEqual(result3, original3),
        `Test 3 failed: should return original matrix`);

    // Test case 4: Same dimensions
    const result4 = solve([[1,2],[3,4]], 2, 2);
    const expected4 = [[1,2],[3,4]];
    console.assert(matricesEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Single element
    const result5 = solve([[100]], 1, 1);
    const expected5 = [[100]];
    console.assert(matricesEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 566. Reshape The Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 566. Reshape The Matrix ===');
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
