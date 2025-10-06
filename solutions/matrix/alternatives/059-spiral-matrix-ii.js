/**
 * 59. Spiral Matrix II
 * Medium
 *
 * Spiral Matrix II - JavaScript Implementation
 * Time Complexity: O(n²) where n is the matrix dimension
 * Space Complexity: O(1) - only using output matrix
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * We need to fill an n×n matrix in spiral order (clockwise from outside to inside).
 * We can maintain boundaries and move in the spiral pattern: right → down → left → up.
 *
 * ### APPROACH:
 * 1. **Initialize boundaries**: top, bottom, left, right
 * 2. **Fill in spiral order**:
 *    - Fill top row (left to right), then shrink top boundary
 *    - Fill right column (top to bottom), then shrink right boundary
 *    - Fill bottom row (right to left), then shrink bottom boundary
 *    - Fill left column (bottom to top), then shrink left boundary
 * 3. **Continue until all cells filled**
 *
 * ### WHY THIS WORKS:
 * - We systematically fill layer by layer from outside to inside
 * - Boundary tracking ensures we don't overlap or miss cells
 * - The spiral pattern naturally fills all n² positions
 *
 * ### EXAMPLE WALKTHROUGH:
 * n = 3:
 * Step 1: Fill top row    [1,2,3]
 *                         [0,0,0]
 *                         [0,0,0]
 *
 * Step 2: Fill right col  [1,2,3]
 *                         [0,0,4]
 *                         [0,0,5]
 *
 * Step 3: Fill bottom row [1,2,3]
 *                         [0,0,4]
 *                         [7,6,5]
 *
 * Step 4: Fill left col   [1,2,3]
 *                         [8,0,4]
 *                         [7,6,5]
 *
 * Step 5: Fill center     [1,2,3]
 *                         [8,9,4]
 *                         [7,6,5]
 *
 * </details>
 */

/**
 * Generate an n x n matrix filled with elements from 1 to n² in spiral order
 * @param {number} n - positive integer representing matrix size
 * @return {number[][]} - n x n matrix filled in spiral order
 */
function generateMatrix(n) {
    if (n <= 0) {
        return [];
    }

    // Initialize n x n matrix with zeros
    const matrix = Array(n).fill().map(() => Array(n).fill(0));

    // Define boundaries
    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;

    let num = 1;

    while (top <= bottom && left <= right) {
        // Fill top row (left to right)
        for (let col = left; col <= right; col++) {
            matrix[top][col] = num++;
        }
        top++;

        // Fill right column (top to bottom)
        for (let row = top; row <= bottom; row++) {
            matrix[row][right] = num++;
        }
        right--;

        // Fill bottom row (right to left) if we still have rows
        if (top <= bottom) {
            for (let col = right; col >= left; col--) {
                matrix[bottom][col] = num++;
            }
            bottom--;
        }

        // Fill left column (bottom to top) if we still have columns
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
 * Test cases for spiral matrix II
 */
function runTests() {
    // Test case 1: n = 1
    const result1 = generateMatrix(1);
    const expected1 = [[1]];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
                   `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: n = 3
    const result2 = generateMatrix(3);
    const expected2 = [[1,2,3],[8,9,4],[7,6,5]];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
                   `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: n = 4
    const result3 = generateMatrix(4);
    const expected3 = [[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
                   `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: n = 2
    const result4 = generateMatrix(2);
    const expected4 = [[1,2],[4,3]];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
                   `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: n = 5
    const result5 = generateMatrix(5);
    const expected5 = [
        [1,2,3,4,5],
        [16,17,18,19,6],
        [15,24,25,20,7],
        [14,23,22,21,8],
        [13,12,11,10,9]
    ];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
                   `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log("All test cases passed!");
}

// Export the function for use in other modules
module.exports = generateMatrix;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}