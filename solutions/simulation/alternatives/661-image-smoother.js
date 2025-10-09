/**

 *
 * This problem demonstrates key concepts in Simulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Simulate applying a 3×3 filter to each cell in the image. For each cell, calculate the
 * average of itself and all valid surrounding cells (up to 8 neighbors). This is a common
 * image processing technique called box blur.
 *
 * APPROACH:


 *    - Check all 8 surrounding positions plus the cell itself
 *    - Sum all valid neighboring values
 *    - Count how many valid neighbors exist
 *    - Set result[i][j] to floor(sum / count)

 *
 * WHY THIS WORKS:
 * We simulate the smoothing filter by examining each cell's neighborhood. By creating a
 * separate result matrix, we avoid modifying values while they're still needed for other
 * calculations.
 *
 * TIME COMPLEXITY: O(m × n) - visit each cell once, check constant 9 neighbors
 * SPACE COMPLEXITY: O(m × n) - space for result matrix
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [[1,1,1],[1,0,1],[1,1,1]]
 * Cell (0,0): neighbors = [1,1,1,0] → sum=3, count=4 → floor(3/4)=0
 * Cell (1,1): neighbors = [1,1,1,1,0,1,1,1,1] → sum=8, count=9 → floor(8/9)=0
 * Result: [[0,0,0],[0,0,0],[0,0,0]]
 *
 * EDGE CASES:
 * - Single element: Returns the element itself
 * - Corner cells: Have only 3 neighbors
 * - Edge cells: Have only 5 neighbors
 * - Center cells: Have all 8 neighbors
 */

/**
 * Main solution for Problem 661: Image Smoother
 *
 * @param {number[][]} img - m x n image matrix
 * @return {number[][]} - Smoothed image matrix
 *
 * Time Complexity: O(m × n)
 * Space Complexity: O(m × n)
 */
function solve(img) {
    if (!img || img.length === 0 || img[0].length === 0) {
        return img;
    }

    const m = img.length;
    const n = img[0].length;
    const result = Array(m).fill(0).map(() => Array(n).fill(0));

    // All 8 directions plus center
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],  [0, 0],  [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let sum = 0;
            let count = 0;

            // Check all neighbors including the cell itself
            for (const [dr, dc] of directions) {
                const newRow = i + dr;
                const newCol = j + dc;

                // Check if the neighbor is within bounds
                if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n) {
                    sum += img[newRow][newCol];
                    count++;
                }
            }

            // Store the average (floor division)
            result[i][j] = Math.floor(sum / count);
        }
    }

    return result;
}

/**
 * Test cases for Problem 661: Image Smoother
 */
function testSolution() {
    console.log('Testing 661. Image Smoother');

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

    // Test case 1: Basic 3x3 matrix
    const result1 = solve([[1,1,1],[1,0,1],[1,1,1]]);
    const expected1 = [[0,0,0],[0,0,0],[0,0,0]];
    console.assert(matricesEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: 3x3 with different values
    const result2 = solve([[100,200,100],[200,50,200],[100,200,100]]);
    const expected2 = [[137,141,137],[141,138,141],[137,141,137]];
    console.assert(matricesEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single element
    const result3 = solve([[1]]);
    const expected3 = [[1]];
    console.assert(matricesEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single row
    const result4 = solve([[1,2,3]]);
    const expected4 = [[1,2,2]];
    console.assert(matricesEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: 2x2 matrix
    const result5 = solve([[1,1],[1,1]]);
    const expected5 = [[1,1],[1,1]];
    console.assert(matricesEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 661. Image Smoother!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 661. Image Smoother ===');
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
