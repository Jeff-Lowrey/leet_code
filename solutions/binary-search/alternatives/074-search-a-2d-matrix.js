/**
 * 74. Search A 2D Matrix
 * Medium
 *
 * Search 2D Matrix - LeetCode 74 Problem: Write an efficient algorithm that searches for a value target in an m x n matrix. The matrix has the following properties: - Integers in each row are sorted from left to right - The first integer of each row is greater than the last integer of the previous row @param {number[][]} matrix - The input 2D matrix @param {number} target - The target value to search for @return {boolean} - Returns true if target is found, false otherwise
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Search A 2D Matrix is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Search 2D Matrix - LeetCode 74
 * 
 * Problem: Write an efficient algorithm that searches for a value target in an m x n matrix.
 * The matrix has the following properties:
 * - Integers in each row are sorted from left to right
 * - The first integer of each row is greater than the last integer of the previous row
 * 
 * @param {number[][]} matrix - The input 2D matrix
 * @param {number} target - The target value to search for
 * @return {boolean} - Returns true if target is found, false otherwise
 */

/**
 * Binary search implementation for 2D matrix
 * Time Complexity: O(log(m*n)) where m is rows and n is columns
 * Space Complexity: O(1)
 */
const searchMatrix = function(matrix, target) {
    // Handle edge cases
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    let left = 0;
    let right = rows * cols - 1;

    // Perform binary search on the flattened matrix
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        // Convert mid index to row and column indices
        const row = Math.floor(mid / cols);
        const col = mid % cols;
        
        const value = matrix[row][col];

        if (value === target) {
            return true;
        } else if (value < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
};

/**
 * Alternative implementation using two binary searches
 * First search for row, then search within row
 * Time Complexity: O(log m + log n)
 * Space Complexity: O(1)
 */
const searchMatrixTwoBinarySearches = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return false;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Binary search for the row
    let topRow = 0;
    let bottomRow = rows - 1;

    while (topRow < bottomRow) {
        const midRow = Math.floor((topRow + bottomRow + 1) / 2);
        if (matrix[midRow][0] <= target) {
            topRow = midRow;
        } else {
            bottomRow = midRow - 1;
        }
    }

    // Binary search within the found row
    let left = 0;
    let right = cols - 1;
    const row = topRow;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (matrix[row][mid] === target) {
            return true;
        } else if (matrix[row][mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
};

// Test cases
function runTests() {
    const testCases = [
        {
            matrix: [
                [1,3,5,7],
                [10,11,16,20],
                [23,30,34,60]
            ],
            target: 3,
            expected: true
        },
        {
            matrix: [
                [1,3,5,7],
                [10,11,16,20],
                [23,30,34,60]
            ],
            target: 13,
            expected: false
        },
        {
            matrix: [],
            target: 0,
            expected: false
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const { matrix, target, expected } = testCases[i];
        const result = searchMatrix(matrix, target);
        console.log(`Test case ${i + 1}:`);
        console.log(`Expected: ${expected}, Got: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Run tests
runTests();

// Export functions for external use
module.exports = {
    searchMatrix,
    searchMatrixTwoBinarySearches
};