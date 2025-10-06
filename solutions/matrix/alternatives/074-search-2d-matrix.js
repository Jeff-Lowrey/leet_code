/**
 * 74. Search a 2D Matrix
 * Medium
 *
 * Search 2D Matrix - JavaScript Implementation
 * Time Complexity: O(log(m*n)) where m and n are matrix dimensions
 * Space Complexity: O(1) - only using pointers
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Since the matrix is sorted both row-wise and the first element of each row is greater than
 * the last element of the previous row, we can treat the entire matrix as a single sorted array.
 * We can use binary search to find the target efficiently.
 *
 * ### APPROACH:
 * 1. **Treat matrix as 1D array**: Map 2D indices to 1D and vice versa
 * 2. **Binary search**: Use standard binary search on the "flattened" matrix
 * 3. **Index conversion**:
 *    - 1D index `i` maps to matrix[Math.floor(i/n)][i%n]
 *    - Where n is the number of columns
 *
 * ### WHY THIS WORKS:
 * - The matrix properties guarantee it's equivalent to a sorted 1D array
 * - Binary search gives us O(log(m*n)) time complexity
 * - Index mapping allows us to work with 2D matrix using 1D logic
 *
 * ### EXAMPLE WALKTHROUGH:
 * Matrix: [[1,3,5,7],
 *          [10,11,16,20],
 *          [23,30,34,60]]
 *
 * As 1D: [1,3,5,7,10,11,16,20,23,30,34,60] - fully sorted!
 * Target 11: Binary search finds it at index 5 → matrix[1][1]
 *
 * Index conversion:
 * - 1D index 5 → row = Math.floor(5/4) = 1, col = 5%4 = 1
 * - matrix[1][1] = 11 ✓
 *
 * </details>
 */

/**
 * Search for target in a sorted 2D matrix
 * @param {number[][]} matrix - m x n matrix with sorted properties
 * @param {number} target - target value to search for
 * @return {boolean} - true if target is found, false otherwise
 */
function searchMatrix(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0;
    let right = m * n - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Convert 1D index to 2D coordinates
        const row = Math.floor(mid / n);
        const col = mid % n;
        const midVal = matrix[row][col];

        if (midVal === target) {
            return true;
        } else if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

/**
 * Test cases for search 2D matrix
 */
function runTests() {
    // Test case 1: Target found
    const matrix1 = [[1,3,5,7],[10,11,16,20],[23,30,34,60]];
    console.assert(searchMatrix(matrix1, 3) === true, "Test 1a failed");
    console.assert(searchMatrix(matrix1, 11) === true, "Test 1b failed");
    console.assert(searchMatrix(matrix1, 60) === true, "Test 1c failed");

    // Test case 2: Target not found
    const matrix2 = [[1,3,5,7],[10,11,16,20],[23,30,34,60]];
    console.assert(searchMatrix(matrix2, 13) === false, "Test 2a failed");
    console.assert(searchMatrix(matrix2, 0) === false, "Test 2b failed");
    console.assert(searchMatrix(matrix2, 100) === false, "Test 2c failed");

    // Test case 3: Single element matrix
    const matrix3 = [[1]];
    console.assert(searchMatrix(matrix3, 1) === true, "Test 3a failed");
    console.assert(searchMatrix(matrix3, 2) === false, "Test 3b failed");

    // Test case 4: Single row matrix
    const matrix4 = [[1,3,5,7,9]];
    console.assert(searchMatrix(matrix4, 5) === true, "Test 4a failed");
    console.assert(searchMatrix(matrix4, 6) === false, "Test 4b failed");

    // Test case 5: Single column matrix
    const matrix5 = [[1],[3],[5]];
    console.assert(searchMatrix(matrix5, 3) === true, "Test 5a failed");
    console.assert(searchMatrix(matrix5, 4) === false, "Test 5b failed");

    // Test case 6: Empty matrix
    console.assert(searchMatrix([], 1) === false, "Test 6a failed");
    console.assert(searchMatrix([[]], 1) === false, "Test 6b failed");

    // Test case 7: Larger matrix
    const matrix7 = [
        [1,4,7,11],
        [15,20,25,30],
        [35,40,45,50],
        [55,60,65,70]
    ];
    console.assert(searchMatrix(matrix7, 25) === true, "Test 7a failed");
    console.assert(searchMatrix(matrix7, 14) === false, "Test 7b failed");

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = searchMatrix;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}