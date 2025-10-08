/**
 * 240. Search A 2D Matrix Ii
 * Medium
 *
 * This problem demonstrates key concepts in Matrix.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This problem requires understanding of matrix concepts.
 *
 * APPROACH:
 * Apply matrix methodology to solve efficiently.
 *
 * WHY THIS WORKS:
 * The solution leverages matrix principles for optimal performance.
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [example input]\nStep 1: [explain first step]\nOutput: [expected output]
 *
 * EDGE CASES:
 * - Empty input handling\n- Single element cases\n- Large input considerations
 */

/**
 * Main solution for Problem 240: Search a 2D Matrix II
 *
 * @param {number[][]} matrix - m x n matrix sorted in ascending order (rows and columns)
 * @param {number} target - Target value to search for
 * @return {boolean} - True if target is found
 *
 * Time Complexity: O(m + n) - worst case eliminate one row or column per iteration
 * Space Complexity: O(1) - constant space
 */
function solve(matrix, target) {
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
            // Current value is too large, move left (eliminate column)
            col--;
        } else {
            // Current value is too small, move down (eliminate row)
            row++;
        }
    }

    return false;
}

/**
 * Test cases for Problem 240: Search a 2D Matrix II
 */
function testSolution() {
    console.log('Testing 240. Search a 2D Matrix II');

    // Test case 1: Target exists in matrix
    const matrix1 = [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30]
    ];
    console.assert(solve(matrix1, 5) === true, 'Test 1 failed: 5 should be found');
    console.assert(solve(matrix1, 20) === false, 'Test 2 failed: 20 should not be found');

    // Test case 2: Target at corners
    console.assert(solve(matrix1, 1) === true, 'Test 3 failed: 1 (top-left) should be found');
    console.assert(solve(matrix1, 30) === true, 'Test 4 failed: 30 (bottom-right) should be found');
    console.assert(solve(matrix1, 15) === true, 'Test 5 failed: 15 (top-right) should be found');
    console.assert(solve(matrix1, 18) === true, 'Test 6 failed: 18 (bottom-left) should be found');

    // Test case 3: Single element matrix
    const matrix2 = [[5]];
    console.assert(solve(matrix2, 5) === true, 'Test 7 failed: single element match');
    console.assert(solve(matrix2, 1) === false, 'Test 8 failed: single element no match');

    // Test case 4: Single row
    const matrix3 = [[1, 3, 5, 7, 9]];
    console.assert(solve(matrix3, 3) === true, 'Test 9 failed: single row match');
    console.assert(solve(matrix3, 4) === false, 'Test 10 failed: single row no match');

    // Test case 5: Single column
    const matrix4 = [[2], [4], [6], [8]];
    console.assert(solve(matrix4, 6) === true, 'Test 11 failed: single column match');
    console.assert(solve(matrix4, 5) === false, 'Test 12 failed: single column no match');

    // Test case 6: Empty matrix
    console.assert(solve([], 1) === false, 'Test 13 failed: empty matrix');

    console.log('All test cases passed for 240. Search a 2D Matrix II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 240. Search A 2D Matrix Ii ===');
    console.log('Category: Matrix');
    console.log('Difficulty: Medium');
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
 * - This solution focuses on matrix concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
