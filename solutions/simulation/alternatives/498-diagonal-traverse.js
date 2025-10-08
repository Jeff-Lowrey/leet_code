/**
 * 498. Diagonal Traverse
 * Medium
 *
 * This problem demonstrates key concepts in Simulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Traverse the matrix diagonally, alternating direction with each diagonal. Key insight:
 * diagonals can be identified by (row + col) sum. Even sums go up-right, odd sums go down-left.
 *
 * APPROACH:
 * 1. Start at (0,0) moving up-right
 * 2. When hitting a boundary, change direction and move to next diagonal start
 * 3. Boundary rules:
 *    - Up-right: If hit top row, move right; if hit right col, move down
 *    - Down-left: If hit left col, move down; if hit bottom row, move right
 * 4. Toggle direction after each boundary hit
 *
 * WHY THIS WORKS:
 * The simulation mimics the actual zigzag diagonal traversal pattern. By tracking current
 * position and direction, we handle all boundary cases and direction changes correctly.
 *
 * TIME COMPLEXITY: O(m × n) - visit each element exactly once
 * SPACE COMPLEXITY: O(1) - excluding output array, only constant extra space
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [[1,2,3],[4,5,6],[7,8,9]]
 * Diag 0 (up): [1]
 * Diag 1 (down): [2,4]
 * Diag 2 (up): [7,5,3]
 * Diag 3 (down): [6,8]
 * Diag 4 (up): [9]
 * Result: [1,2,4,7,5,3,6,8,9]
 *
 * EDGE CASES:
 * - Single row or column: Only one direction needed
 * - Single element: Return as-is
 * - Empty matrix: Return empty array
 */

/**
 * Main solution for Problem 498: Diagonal Traverse
 *
 * @param {number[][]} mat - m x n matrix
 * @return {number[]} - Elements in diagonal order
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(1) excluding output
 */
function solve(mat) {
    if (!mat || mat.length === 0 || mat[0].length === 0) {
        return [];
    }

    const m = mat.length;
    const n = mat[0].length;
    const result = [];
    let row = 0, col = 0;
    let goingUp = true;

    for (let i = 0; i < m * n; i++) {
        result.push(mat[row][col]);

        if (goingUp) {
            // Moving up-right
            if (row === 0 && col < n - 1) {
                // Hit top boundary, move right and change direction
                col++;
                goingUp = false;
            } else if (col === n - 1) {
                // Hit right boundary, move down and change direction
                row++;
                goingUp = false;
            } else {
                // Continue up-right
                row--;
                col++;
            }
        } else {
            // Moving down-left
            if (col === 0 && row < m - 1) {
                // Hit left boundary, move down and change direction
                row++;
                goingUp = true;
            } else if (row === m - 1) {
                // Hit bottom boundary, move right and change direction
                col++;
                goingUp = true;
            } else {
                // Continue down-left
                row++;
                col--;
            }
        }
    }

    return result;
}

/**
 * Test cases for Problem 498: Diagonal Traverse
 */
function testSolution() {
    console.log('Testing 498. Diagonal Traverse');

    // Helper function to compare arrays
    const arraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        return arr1.every((val, idx) => val === arr2[idx]);
    };

    // Test case 1: 3x3 matrix
    const result1 = solve([[1,2,3],[4,5,6],[7,8,9]]);
    const expected1 = [1,2,4,7,5,3,6,8,9];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: 3x4 matrix
    const result2 = solve([[1,2,3,4],[5,6,7,8],[9,10,11,12]]);
    const expected2 = [1,2,5,9,6,3,4,7,10,11,8,12];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single row
    const result3 = solve([[1,2,3]]);
    const expected3 = [1,2,3];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single column
    const result4 = solve([[1],[2],[3]]);
    const expected4 = [1,2,3];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single element
    const result5 = solve([[5]]);
    const expected5 = [5];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 498. Diagonal Traverse!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 498. Diagonal Traverse ===');
    console.log('Category: Simulation');
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
 * - This solution focuses on simulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
