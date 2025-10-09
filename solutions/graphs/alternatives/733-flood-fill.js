/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 733: Flood Fill
 *
 * @param {number[][]} image - 2D array representing the image
 * @param {number} sr - Starting row position
 * @param {number} sc - Starting column position
 * @param {number} newColor - New color to fill with
 * @return {number[][]} - Modified image after flood fill
 *
 * Time Complexity: O(m * n) - might visit all pixels
 * Space Complexity: O(m * n) - recursion stack in worst case
 */
function solve(image, sr, sc, newColor) {
    if (!image || image.length === 0 || image[0].length === 0) {
        return image;
    }

    const originalColor = image[sr][sc];

    // If new color is same as original, no change needed
    if (originalColor === newColor) {
        return image;
    }

    const rows = image.length;
    const cols = image[0].length;

    function dfs(row, col) {
        // Base cases: out of bounds or different color
        if (row < 0 || row >= rows || col < 0 || col >= cols ||
            image[row][col] !== originalColor) {
            return;
        }

        // Change current pixel to new color
        image[row][col] = newColor;

        // Explore all 4 directions
        dfs(row + 1, col); // down
        dfs(row - 1, col); // up
        dfs(row, col + 1); // right
        dfs(row, col - 1); // left
    }

    dfs(sr, sc);
    return image;
}

/**
 * Test cases for Problem 733: Flood Fill
 */
function testSolution() {
    console.log('Testing 733. Flood Fill');

    // Helper function to compare 2D arrays
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i].length !== b[i].length) return false;
            for (let j = 0; j < a[i].length; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    }

    // Test case 1: Basic flood fill
    const image1 = [[1,1,1],[1,1,0],[1,0,1]];
    const result1 = solve(JSON.parse(JSON.stringify(image1)), 1, 1, 2);
    const expected1 = [[2,2,2],[2,2,0],[2,0,1]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Same color (no change)
    const image2 = [[0,0,0],[0,1,1]];
    const result2 = solve(JSON.parse(JSON.stringify(image2)), 1, 1, 1);
    const expected2 = [[0,0,0],[0,1,1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single pixel
    const image3 = [[1]];
    const result3 = solve(JSON.parse(JSON.stringify(image3)), 0, 0, 2);
    const expected3 = [[2]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Corner pixel
    const image4 = [[1,1,1],[1,0,1],[1,1,1]];
    const result4 = solve(JSON.parse(JSON.stringify(image4)), 0, 0, 2);
    const expected4 = [[2,2,2],[2,0,2],[2,2,2]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Isolated pixel
    const image5 = [[0,1,0],[1,1,1],[0,1,0]];
    const result5 = solve(JSON.parse(JSON.stringify(image5)), 0, 0, 2);
    const expected5 = [[2,1,0],[1,1,1],[0,1,0]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Large connected area
    const image6 = [[1,1,1],[1,1,1],[1,1,1]];
    const result6 = solve(JSON.parse(JSON.stringify(image6)), 1, 1, 0);
    const expected6 = [[0,0,0],[0,0,0],[0,0,0]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 733. Flood Fill!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 733. Flood Fill ===');
    console.log('Category: Graphs');
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
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
