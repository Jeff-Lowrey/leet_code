/**
 * 48. Rotate Image
 * Medium
 *
 * Rotate Image - JavaScript Implementation
 * Time Complexity: O(n²) where n is the dimension of the matrix
 * Space Complexity: O(1) - in-place rotation
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * To rotate a matrix 90 degrees clockwise in-place, we can use a two-step approach:
 * 1. Transpose the matrix (swap rows and columns)
 * 2. Reverse each row
 *
 * ### APPROACH:
 * 1. **Transpose**: Convert matrix[i][j] to matrix[j][i]
 * 2. **Reverse rows**: Reverse each row to complete the clockwise rotation
 *
 * ### WHY THIS WORKS:
 * - Transposing flips the matrix along its diagonal
 * - Reversing rows completes the 90-degree clockwise rotation
 * - This achieves the rotation without using extra space
 *
 * ### EXAMPLE WALKTHROUGH:
 * Original:    Transpose:   Reverse rows:
 * [1,2,3]      [1,4,7]      [7,4,1]
 * [4,5,6]  ->  [2,5,8]  ->  [8,5,2]
 * [7,8,9]      [3,6,9]      [9,6,3]
 *
 * </details>
 */

/**
 * Rotate the image by 90 degrees (clockwise) in-place
 * @param {number[][]} matrix - n x n 2D matrix representing the image
 * @return {void} - modifies matrix in-place
 */
function rotate(matrix) {
    const n = matrix.length;

    // Step 1: Transpose the matrix (swap rows and columns)
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            // Swap matrix[i][j] and matrix[j][i]
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }

    // Step 2: Reverse each row
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}

/**
 * Test cases for rotate image
 */
function runTests() {
    // Test case 1: 3x3 matrix
    const matrix1 = [[1,2,3],[4,5,6],[7,8,9]];
    rotate(matrix1);
    const expected1 = [[7,4,1],[8,5,2],[9,6,3]];
    console.assert(JSON.stringify(matrix1) === JSON.stringify(expected1),
                   `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(matrix1)}`);

    // Test case 2: 4x4 matrix
    const matrix2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
    rotate(matrix2);
    const expected2 = [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]];
    console.assert(JSON.stringify(matrix2) === JSON.stringify(expected2),
                   `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(matrix2)}`);

    // Test case 3: 1x1 matrix
    const matrix3 = [[1]];
    rotate(matrix3);
    const expected3 = [[1]];
    console.assert(JSON.stringify(matrix3) === JSON.stringify(expected3),
                   `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(matrix3)}`);

    // Test case 4: 2x2 matrix
    const matrix4 = [[1,2],[3,4]];
    rotate(matrix4);
    const expected4 = [[3,1],[4,2]];
    console.assert(JSON.stringify(matrix4) === JSON.stringify(expected4),
                   `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(matrix4)}`);

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = rotate;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}