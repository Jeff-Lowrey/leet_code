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
 * Main solution for Problem 827: Making A Large Island
 *
 * @param {number[][]} grid - 2D grid of 0s and 1s
 * @return {number} - Maximum possible island size after changing one 0 to 1
 *
 * Time Complexity: O(n²) - two passes through the grid
 * Space Complexity: O(n²) - island size map and labeled grid
 */
function solve(grid) {
    if (!grid || grid.length === 0) return 1;

    const n = grid.length;
    const islandSizes = new Map();
    let islandId = 2; // Start from 2 to distinguish from 0 and 1
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    // Step 1: Label all islands and calculate their sizes
    function dfs(row, col, id) {
        if (row < 0 || row >= n || col < 0 || col >= n || grid[row][col] !== 1) {
            return 0;
        }

        grid[row][col] = id;
        let size = 1;

        for (const [dr, dc] of directions) {
            size += dfs(row + dr, col + dc, id);
        }

        return size;
    }

    // Label all existing islands
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 1) {
                const size = dfs(row, col, islandId);
                islandSizes.set(islandId, size);
                islandId++;
            }
        }
    }

    // Step 2: Try changing each 0 to 1 and calculate resulting island size
    let maxSize = 0;

    // If there are existing islands, find their max size as baseline
    for (const size of islandSizes.values()) {
        maxSize = Math.max(maxSize, size);
    }

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            if (grid[row][col] === 0) {
                const adjacentIslands = new Set();

                // Check all 4 directions for adjacent islands
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;

                    if (newRow >= 0 && newRow < n && newCol >= 0 && newCol < n) {
                        const cellValue = grid[newRow][newCol];
                        if (cellValue > 1) { // It's an island
                            adjacentIslands.add(cellValue);
                        }
                    }
                }

                // Calculate total size if we change this 0 to 1
                let totalSize = 1; // The cell itself
                for (const islandId of adjacentIslands) {
                    totalSize += islandSizes.get(islandId);
                }

                maxSize = Math.max(maxSize, totalSize);
            }
        }
    }

    // Special case: if grid is already all 1s, return n²
    return maxSize === 0 ? 1 : maxSize;
}

/**
 * Test cases for Problem 827: Making A Large Island
 */
function testSolution() {
    console.log('Testing 827. Making A Large Island');

    // Test case 1: Basic case with separate islands
    const grid1 = [[1,0],[0,1]];
    const result1 = solve(JSON.parse(JSON.stringify(grid1)));
    console.assert(result1 === 3, `Test 1 failed: expected 3, got ${result1}`);

    // Test case 2: Grid with one large island
    const grid2 = [[1,1],[1,0]];
    const result2 = solve(JSON.parse(JSON.stringify(grid2)));
    console.assert(result2 === 4, `Test 2 failed: expected 4, got ${result2}`);

    // Test case 3: All water
    const grid3 = [[0,0],[0,0]];
    const result3 = solve(JSON.parse(JSON.stringify(grid3)));
    console.assert(result3 === 1, `Test 3 failed: expected 1, got ${result3}`);

    // Test case 4: All land
    const grid4 = [[1,1],[1,1]];
    const result4 = solve(JSON.parse(JSON.stringify(grid4)));
    console.assert(result4 === 4, `Test 4 failed: expected 4, got ${result4}`);

    // Test case 5: Single cell
    const grid5 = [[0]];
    const result5 = solve(JSON.parse(JSON.stringify(grid5)));
    console.assert(result5 === 1, `Test 5 failed: expected 1, got ${result5}`);

    // Test case 6: Single land cell
    const grid6 = [[1]];
    const result6 = solve(JSON.parse(JSON.stringify(grid6)));
    console.assert(result6 === 1, `Test 6 failed: expected 1, got ${result6}`);

    // Test case 7: Connecting multiple islands
    const grid7 = [
        [1,0,0,1],
        [0,0,0,0],
        [0,0,0,0],
        [1,0,0,1]
    ];
    const result7 = solve(JSON.parse(JSON.stringify(grid7)));
    console.assert(result7 === 3, `Test 7 failed: expected 3, got ${result7}`);

    // Test case 8: Large connected component possible
    const grid8 = [
        [1,1,0],
        [1,0,1],
        [0,1,1]
    ];
    const result8 = solve(JSON.parse(JSON.stringify(grid8)));
    console.assert(result8 === 7, `Test 8 failed: expected 7, got ${result8}`);

    console.log('All test cases passed for 827. Making A Large Island!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 827. Making A Large Island ===');
    console.log('Category: Graphs');
    console.log('Difficulty: Hard');
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
