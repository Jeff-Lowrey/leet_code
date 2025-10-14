/**
 * # Difficulty: Medium
 *
 * # 59. Spiral Matrix II
 *
 * Given a positive integer n, generate an n x n matrix filled with elements from 1 to n²
 * in spiral order.
 *
 * Example 1:
 * Input: n = 3
 * Output: [[1,2,3],[8,9,4],[7,6,5]]
 *
 * Example 2:
 * Input: n = 1
 * Output: [[1]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 2, 3]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Spiral matrix filled 1 to n²</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * Similar to Spiral Matrix I, but instead of reading, we're writing values in spiral order.
 * Use the same boundary-tracking technique, filling the matrix layer by layer from outside to inside.
 *
 * ### APPROACH:
 * 1. **Initialize**: Create n×n matrix, counter starting at 1
 * 2. **Maintain Boundaries**: top, bottom, left, right
 * 3. **Fill in Spiral Order**:
 *    - Right: Fill top row from left to right
 *    - Down: Fill right column from top to bottom
 *    - Left: Fill bottom row from right to left
 *    - Up: Fill left column from bottom to top
 * 4. **Shrink Boundaries**: After each direction, adjust boundary
 * 5. **Increment Counter**: Use sequential numbers 1 to n²
 *
 * **Key Pattern**: Same as Spiral Matrix I traversal, but filling instead of reading
 *
 * ### WHY THIS WORKS:
 * - Boundary tracking ensures we fill each cell exactly once
 * - Spiral pattern (right→down→left→up) creates the required order
 * - Sequential counter ensures values go from 1 to n²
 * - Shrinking boundaries naturally moves us inward
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * n = 3, total = 9
 *
 * Initial: matrix = [[0,0,0],[0,0,0],[0,0,0]]
 *          top=0, bottom=2, left=0, right=2, num=1
 *
 * Step 1 - Right (top row): Fill [0,0] to [0,2]
 *   [[1,2,3],[0,0,0],[0,0,0]], num=4, top=1
 *
 * Step 2 - Down (right col): Fill [1,2] to [2,2]
 *   [[1,2,3],[0,0,4],[0,0,5]], num=6, right=1
 *
 * Step 3 - Left (bottom row): Fill [2,1] to [2,0]
 *   [[1,2,3],[0,0,4],[7,6,5]], num=8, bottom=1
 *
 * Step 4 - Up (left col): Fill [1,0]
 *   [[1,2,3],[8,0,4],[7,6,5]], num=9, left=1
 *
 * Step 5 - Right (center): Fill [1,1]
 *   [[1,2,3],[8,9,4],[7,6,5]], done
 *
 * Result: [[1,2,3],[8,9,4],[7,6,5]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n²)
 * - Fill each of n² cells once
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Only use constant extra space (not counting output matrix)
 *
 * ### EDGE CASES:
 * - n = 1: Single element [[1]]
 * - n = 2: [[1,2],[4,3]]
 * - Even vs odd n: Different center handling
 *
 * </details>
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
