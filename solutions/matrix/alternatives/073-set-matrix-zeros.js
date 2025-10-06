/**
 * 73. Set Matrix Zeroes
 * Medium
 *
 * Set Matrix Zeroes - JavaScript Implementation
 * Time Complexity: O(m*n) where m and n are matrix dimensions
 * Space Complexity: O(1) - in-place using matrix as storage
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * We need to mark which rows and columns should be zeroed without using extra space.
 * We can use the first row and first column as markers.
 *
 * ### APPROACH:
 * 1. **Check if first row/column have zeros**: Store this information
 * 2. **Use first row/column as markers**: Mark which rows/columns need to be zeroed
 * 3. **Zero marked rows/columns**: Set elements to zero based on markers
 * 4. **Handle first row/column**: Zero them if they originally had zeros
 *
 * ### WHY THIS WORKS:
 * - The first row and column serve as storage for which rows/columns to zero
 * - We handle the first row/column separately to avoid conflicts
 * - This achieves O(1) space complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:           After marking:    After zeroing:
 * [1,1,1]          [1,0,1]          [1,0,1]
 * [1,0,1]     ->   [0,0,1]     ->   [0,0,0]
 * [1,1,1]          [1,0,1]          [1,0,1]
 *
 * </details>
 */

/**
 * Set entire rows and columns to 0 if an element is 0
 * @param {number[][]} matrix - m x n integer matrix
 * @return {void} - modifies matrix in-place
 */
function setZeroes(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    // Check if first row and first column have zeros
    let firstRowZero = false;
    let firstColZero = false;

    // Check first row
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }

    // Check first column
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }

    // Use first row and column as markers
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;  // Mark row
                matrix[0][j] = 0;  // Mark column
            }
        }
    }

    // Zero out marked rows and columns
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // Handle first row
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }

    // Handle first column
    if (firstColZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
}

/**
 * Test cases for set matrix zeros
 */
function runTests() {
    // Test case 1: Standard case
    const matrix1 = [[1,1,1],[1,0,1],[1,1,1]];
    setZeroes(matrix1);
    const expected1 = [[1,0,1],[0,0,0],[1,0,1]];
    console.assert(JSON.stringify(matrix1) === JSON.stringify(expected1),
                   `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(matrix1)}`);

    // Test case 2: Multiple zeros
    const matrix2 = [[0,1,2,0],[3,4,5,2],[1,3,1,5]];
    setZeroes(matrix2);
    const expected2 = [[0,0,0,0],[0,4,5,0],[0,3,1,0]];
    console.assert(JSON.stringify(matrix2) === JSON.stringify(expected2),
                   `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(matrix2)}`);

    // Test case 3: All zeros
    const matrix3 = [[0,0],[0,0]];
    setZeroes(matrix3);
    const expected3 = [[0,0],[0,0]];
    console.assert(JSON.stringify(matrix3) === JSON.stringify(expected3),
                   `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(matrix3)}`);

    // Test case 4: No zeros
    const matrix4 = [[1,2],[3,4]];
    setZeroes(matrix4);
    const expected4 = [[1,2],[3,4]];
    console.assert(JSON.stringify(matrix4) === JSON.stringify(expected4),
                   `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(matrix4)}`);

    // Test case 5: Single element matrix with zero
    const matrix5 = [[0]];
    setZeroes(matrix5);
    const expected5 = [[0]];
    console.assert(JSON.stringify(matrix5) === JSON.stringify(expected5),
                   `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(matrix5)}`);

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = setZeroes;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}