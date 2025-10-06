/**
 * 240. Search a 2D Matrix II
 * Medium
 *
 * Search 2D Matrix II - JavaScript Implementation
 * Time Complexity: O(m+n) where m and n are matrix dimensions
 * Space Complexity: O(1) - only using two pointers
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Unlike the previous matrix search problem, this matrix is only sorted row-wise and column-wise,
 * but rows don't have the property where first element > last element of previous row.
 * We can use the sorted properties to eliminate entire rows/columns efficiently.
 *
 * ### APPROACH:
 * 1. **Start from top-right corner** (or bottom-left): This gives us optimal elimination
 * 2. **Compare with target**:
 *    - If current > target: move left (eliminate current column)
 *    - If current < target: move down (eliminate current row)
 *    - If current == target: found it!
 * 3. **Continue until out of bounds or found**
 *
 * ### WHY THIS WORKS:
 * - Starting from top-right: all elements left are smaller, all elements down are larger
 * - This allows us to eliminate entire rows/columns in each step
 * - Time complexity becomes O(m+n) instead of O(m*n)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Matrix: [[1,4,7,11,15],
 *          [2,5,8,12,19],
 *          [3,6,9,16,22],
 *          [10,13,14,17,24],
 *          [18,21,23,26,30]]
 * Target: 5
 *
 * Start at (0,4): 15 > 5, move left
 * At (0,3): 11 > 5, move left
 * At (0,2): 7 > 5, move left
 * At (0,1): 4 < 5, move down
 * At (1,1): 5 == 5, found!
 *
 * </details>
 */

/**
 * Search for target in a sorted 2D matrix (row and column sorted)
 * @param {number[][]} matrix - m x n matrix with row/column sorted properties
 * @param {number} target - target value to search for
 * @return {boolean} - true if target is found, false otherwise
 */
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;

    // Start from top-right corner
    let row = 0;
    let col = n - 1;

    while (row < m && col >= 0) {
        const current = matrix[row][col];

        if (current === target) {
            return true;
        } else if (current > target) {
            // Current is too large, move left
            col--;
        } else {
            // Current is too small, move down
            row++;
        }
    }

    return false;
}

/**
 * Test cases for search 2D matrix II
 */
function runTests() {
    // Test case 1: Target found
    const matrix1 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]];
    console.assert(searchMatrix(matrix1, 5) === true, "Test 1a failed");
    console.assert(searchMatrix(matrix1, 11) === true, "Test 1b failed");
    console.assert(searchMatrix(matrix1, 30) === true, "Test 1c failed");
    console.assert(searchMatrix(matrix1, 1) === true, "Test 1d failed");

    // Test case 2: Target not found
    const matrix2 = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]];
    console.assert(searchMatrix(matrix2, 20) === false, "Test 2a failed");
    console.assert(searchMatrix(matrix2, 0) === false, "Test 2b failed");
    console.assert(searchMatrix(matrix2, 100) === false, "Test 2c failed");

    // Test case 3: Single element matrix
    const matrix3 = [[5]];
    console.assert(searchMatrix(matrix3, 5) === true, "Test 3a failed");
    console.assert(searchMatrix(matrix3, 6) === false, "Test 3b failed");

    // Test case 4: Single row matrix
    const matrix4 = [[1,3,5]];
    console.assert(searchMatrix(matrix4, 3) === true, "Test 4a failed");
    console.assert(searchMatrix(matrix4, 4) === false, "Test 4b failed");

    // Test case 5: Single column matrix
    const matrix5 = [[1],[3],[5]];
    console.assert(searchMatrix(matrix5, 3) === true, "Test 5a failed");
    console.assert(searchMatrix(matrix5, 4) === false, "Test 5b failed");

    // Test case 6: Empty matrix
    console.assert(searchMatrix([], 1) === false, "Test 6a failed");
    console.assert(searchMatrix([[]], 1) === false, "Test 6b failed");

    // Test case 7: Duplicates
    const matrix7 = [[1,2,3,4,5],[2,3,4,5,6],[3,4,5,6,7]];
    console.assert(searchMatrix(matrix7, 3) === true, "Test 7a failed");
    console.assert(searchMatrix(matrix7, 8) === false, "Test 7b failed");

    // Test case 8: Larger matrix with edge cases
    const matrix8 = [[-5]];
    console.assert(searchMatrix(matrix8, -5) === true, "Test 8a failed");
    console.assert(searchMatrix(matrix8, -10) === false, "Test 8b failed");

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = searchMatrix;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}