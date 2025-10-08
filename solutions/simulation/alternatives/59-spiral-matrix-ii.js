/**
 * 59. Spiral Matrix II
 * Medium
 *
 * This problem demonstrates key concepts in Simulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Generate an n×n matrix filled with numbers 1 to n² in spiral order. Similar to reading
 * a spiral, but instead we're writing values in spiral pattern: right → down → left → up.
 *
 * APPROACH:
 * 1. Create an n×n matrix initialized with zeros
 * 2. Use four boundaries: top, bottom, left, right
 * 3. Maintain a counter starting at 1
 * 4. For each layer, fill in spiral order:
 *    - Fill right along top row, increment top
 *    - Fill down along right column, decrement right
 *    - Fill left along bottom row, decrement bottom
 *    - Fill up along left column, increment left
 * 5. Increment counter after each cell filled
 *
 * WHY THIS WORKS:
 * By systematically filling cells layer by layer in spiral order and shrinking boundaries,
 * we ensure each cell is filled exactly once with consecutive numbers.
 *
 * TIME COMPLEXITY: O(n²) - fill each cell once
 * SPACE COMPLEXITY: O(n²) - space for the output matrix
 *
 * EXAMPLE WALKTHROUGH:
 * Input: n = 3
 * Fill right: [1,2,3] in top row
 * Fill down: [6,9] in right column
 * Fill left: [8,7] in bottom row
 * Fill up: [4] in left column
 * Fill center: [5]
 * Result: [[1,2,3],[8,9,4],[7,6,5]]
 *
 * EDGE CASES:
 * - n = 1: Single element matrix [[1]]
 * - n = 2: 2×2 matrix [[1,2],[4,3]]
 * - Large n: Algorithm scales linearly with n²
 */

/**
 * Main solution for Problem 59: Spiral Matrix II
 *
 * @param {number} n - Size of the square matrix
 * @return {number[][]} - n×n matrix filled in spiral order
 *
 * Time Complexity: O(n²)
 * Space Complexity: O(n²)
 */
function solve(n) {
    // Initialize n×n matrix with zeros
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));

    let top = 0;
    let bottom = n - 1;
    let left = 0;
    let right = n - 1;
    let num = 1;

    while (top <= bottom && left <= right) {
        // Fill right along top row
        for (let col = left; col <= right; col++) {
            matrix[top][col] = num++;
        }
        top++;

        // Fill down along right column
        for (let row = top; row <= bottom; row++) {
            matrix[row][right] = num++;
        }
        right--;

        // Fill left along bottom row (if still valid)
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                matrix[bottom][col] = num++;
            }
            bottom--;
        }

        // Fill up along left column (if still valid)
        if (left <= right) {
            for (let row = bottom; row >= top; row--) {
                matrix[row][left] = num++;
            }
            left++;
        }
    }

    return matrix;
}

/**
 * Test cases for Problem 59: Spiral Matrix II
 */
function testSolution() {
    console.log('Testing 59. Spiral Matrix II');

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

    // Test case 1: n = 3
    const result1 = solve(3);
    const expected1 = [[1,2,3],[8,9,4],[7,6,5]];
    console.assert(matricesEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: n = 1
    const result2 = solve(1);
    const expected2 = [[1]];
    console.assert(matricesEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: n = 4
    const result3 = solve(4);
    const expected3 = [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]];
    console.assert(matricesEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: n = 2
    const result4 = solve(2);
    const expected4 = [[1,2],[4,3]];
    console.assert(matricesEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: n = 5
    const result5 = solve(5);
    const expected5 = [
        [1,2,3,4,5],
        [16,17,18,19,6],
        [15,24,25,20,7],
        [14,23,22,21,8],
        [13,12,11,10,9]
    ];
    console.assert(matricesEqual(result5, expected5),
        `Test 5 failed: n=5 matrix incorrect`);

    console.log('All test cases passed for 59. Spiral Matrix II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 59. Spiral Matrix Ii ===');
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
