/**
 * # Difficulty: Easy
 *
 * # 661. Image Smoother
 *
 * An image smoother is a filter of the size 3 x 3 that can be applied to each cell of an
 * image by rounding down the average of the cell and the eight surrounding cells (or as
 * many as there are if the cell is on an edge or corner).
 *
 * Given an m x n integer matrix img representing the grayscale of an image, return the
 * image after applying the smoother on each cell of it.
 *
 * Example 1:
 * Input: img = [[1,1,1],[1,0,1],[1,1,1]]
 * Output: [[0,0,0],[0,0,0],[0,0,0]]
 *
 * Example 2:
 * Input: img = [[100,200,100],[200,50,200],[100,200,100]]
 * Output: [[137,141,137],[141,138,141],[137,141,137]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 1, 1]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Image smoother replaces each cell with average of itself and 8 neighbors</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * For each cell, compute the average of itself and its 8 neighbors (or fewer if on edge).
 * The challenge is to use original values for all calculations, not partially smoothed values.
 *
 * ### APPROACH:
 * 1. **Create Result Matrix**: Store smoothed values separately to avoid using partial results
 * 2. **For Each Cell**: Calculate average of valid neighbors
 * 3. **Neighbor Counting**: Check all 8 directions, count only valid cells
 * 4. **Floor Division**: Use integer division for rounding down
 *
 * **Key Pattern**: 3×3 filter with boundary handling
 * - Center cell + up to 8 neighbors
 * - Edge cells have fewer neighbors
 * - Corner cells have only 3 neighbors
 *
 * ### WHY THIS WORKS:
 * - Separate result matrix ensures we always use original values
 * - Direction array simplifies checking all 8 neighbors
 * - Boundary checks handle edges and corners automatically
 * - Integer division naturally floors the average
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * img = [[100,200,100],
 *        [200,50,200],
 *        [100,200,100]]
 *
 * Cell [0,0] (corner, 4 cells):
 *   Neighbors: [0,0], [0,1], [1,0], [1,1]
 *   Sum: 100 + 200 + 200 + 50 = 550
 *   Average: 550 // 4 = 137
 *
 * Cell [1,1] (center, 9 cells):
 *   Neighbors: all 9 cells
 *   Sum: 100+200+100+200+50+200+100+200+100 = 1250
 *   Average: 1250 // 9 = 138
 *
 * Cell [0,1] (edge, 6 cells):
 *   Neighbors: [0,0], [0,1], [0,2], [1,0], [1,1], [1,2]
 *   Sum: 100+200+100+200+50+200 = 850
 *   Average: 850 // 6 = 141
 *
 * Result: [[137,141,137],[141,138,141],[137,141,137]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(m × n)
 * - Visit each cell once, check constant number of neighbors
 *
 * ### SPACE COMPLEXITY:
 * O(m × n)
 * - Need separate result matrix (or O(1) with bit manipulation)
 *
 * ### EDGE CASES:
 * - Single cell: [[5]] → [[5]]
 * - Single row/column: Only horizontal/vertical neighbors
 * - All same values: Output same as input
 * - Large values: Ensure no overflow (Python handles this)
 *
 * </details>
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
