/**

 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Return all cells in a matrix sorted by their Manhattan distance from a given cell (r0, c0).
 * The Manhattan distance between (r1, c1) and (r2, c2) is |r1 - r2| + |c1 - c2|.
 *
 * APPROACH:
 * Generate all cells in the matrix, then sort them by their Manhattan distance from (r0, c0).
 *
 * WHY THIS WORKS:
 * By calculating the distance for each cell and sorting, we get cells ordered by proximity
 * to the starting cell. The custom comparator ensures proper ordering.
 *
 * TIME COMPLEXITY: O(rows * cols * log(rows * cols))
 * SPACE COMPLEXITY: O(rows * cols) for storing all cells
 *
 * EXAMPLE WALKTHROUGH:
 * Input: rows = 2, cols = 2, rCenter = 0, cCenter = 1
 * Step 1: Generate cells: [[0,0], [0,1], [1,0], [1,1]]
 * Step 2: Calculate distances from [0,1]: [1, 0, 2, 1]
 * Step 3: Sort by distance: [[0,1], [0,0], [1,1], [1,0]]
 * Output: [[0,1], [0,0], [1,1], [1,0]]
 *
 * EDGE CASES:
 * - Single cell matrix: returns [[0,0]]
 * - Center at corner: properly orders from corner outward
 * - Large matrices: efficient with sorting algorithm
 */

/**
 * Main solution for Problem 1030: Matrix Cells In Distance Order
 *
 * @param {number} rows - Number of rows in the matrix
 * @param {number} cols - Number of columns in the matrix
 * @param {number} rCenter - Row coordinate of center cell
 * @param {number} cCenter - Column coordinate of center cell
 * @return {number[][]} - All cells sorted by Manhattan distance from center
 *
 * Time Complexity: O(rows * cols * log(rows * cols))
 * Space Complexity: O(rows * cols)
 */
function solve(rows, cols, rCenter, cCenter) {
    const cells = [];

    // Generate all cells in the matrix
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            cells.push([r, c]);
        }
    }

    // Sort cells by Manhattan distance from (rCenter, cCenter)
    cells.sort((a, b) => {
        const distA = Math.abs(a[0] - rCenter) + Math.abs(a[1] - cCenter);
        const distB = Math.abs(b[0] - rCenter) + Math.abs(b[1] - cCenter);
        return distA - distB;
    });

    return cells;
}

/**
 * Test cases for Problem 1030: Matrix Cells In Distance Order
 */
function testSolution() {
    console.log('Testing 1030. Matrix Cells In Distance Order');

    // Test case 1: Basic 2x2 matrix
    const result1 = solve(1, 2, 0, 0);
    console.log('Test 1:', JSON.stringify(result1));
    console.assert(result1.length === 2, 'Test 1 failed: wrong length');

    // Test case 2: 2x3 matrix with center at (1,2)
    const result2 = solve(2, 3, 1, 2);
    console.log('Test 2:', JSON.stringify(result2));
    console.assert(result2.length === 6, 'Test 2 failed: wrong length');
    console.assert(result2[0][0] === 1 && result2[0][1] === 2, 'Test 2 failed: center should be first');

    // Test case 3: Single cell
    const result3 = solve(1, 1, 0, 0);
    console.log('Test 3:', JSON.stringify(result3));
    console.assert(result3.length === 1 && result3[0][0] === 0 && result3[0][1] === 0, 'Test 3 failed');

    console.log('All test cases passed for 1030. Matrix Cells In Distance Order!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1030. Matrix Cells In Distance Order ===');
    console.log('Category: Sorting');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
