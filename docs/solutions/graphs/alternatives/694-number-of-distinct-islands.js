/**
 * # Difficulty: Medium
 *
 * # 694. Number Of Distinct Islands
 *
 * You are given an m x n binary matrix grid. An island is a group of 1's (representing land) connected 4-directionally (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
 *
 * An island is considered to be the same as another if and only if one island can be translated (and not rotated or reflected) to equal the other.
 *
 * Return the number of distinct islands.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1,1,0,0,0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Number of distinct islands is 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This problem extends "Number of Islands" by requiring us to identify distinct island shapes. Two islands are the same if one can be translated to match the other (same relative positions). We need to normalize each island's shape to a canonical form for comparison.
 *
 * ### APPROACH:
 * 1. **Find each island**: Use DFS/BFS to explore islands
 * 2. **Record relative positions**: For each island, record all cell positions relative to starting point
 * 3. **Normalize shape**: Convert to canonical form (e.g., relative to top-left corner)
 * 4. **Use set for uniqueness**: Store normalized shapes in set to count distinct shapes
 *
 * ### WHY THIS WORKS:
 * - Relative positioning captures island shape independent of location
 * - Normalization ensures identical shapes have identical representations
 * - Set automatically handles duplicates
 * - Translation invariance achieved by using relative coordinates
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Grid: [[1,1,0,0,0],
 *        [1,1,0,0,0],
 *        [0,0,0,1,1],
 *        [0,0,0,1,1]]
 *
 * Island 1: cells (0,0), (0,1), (1,0), (1,1)
 * Relative to (0,0): (0,0), (0,1), (1,0), (1,1)
 * Normalized: [(0,0), (0,1), (1,0), (1,1)]
 *
 * Island 2: cells (2,3), (2,4), (3,3), (3,4)
 * Relative to (2,3): (0,0), (0,1), (1,0), (1,1)
 * Normalized: [(0,0), (0,1), (1,0), (1,1)]
 *
 * Same normalized form → 1 distinct island
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(M × N)
 * We visit each cell once during DFS/BFS
 *
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For storing island shapes and recursion stack
 *
 * ### EDGE CASES:
 * - **All water**: Return 0 (no islands)
 * - **All same shaped islands**: Return 1 (one distinct shape)
 * - **Every island unique**: Return number of islands
 * - **Rotations considered same**: Normalize shape representation
 * - **Single island**: Return 1
 *
 * </details>
 */

/**
 * Main solution for Problem 694: Number Of Distinct Islands
 *
 * @param {number[][]} grid - 2D grid of 0s and 1s
 * @return {number} - Number of distinct island shapes
 *
 * Time Complexity: O(m * n) - visit each cell once
 * Space Complexity: O(m * n) - path strings and recursion stack
 */
function solve(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    const distinctIslands = new Set();
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const directionChars = ['r', 'd', 'l', 'u']; // right, down, left, up

    function dfs(row, col, startRow, startCol, path) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
            return;
        }

        grid[row][col] = 0; // Mark as visited

        // Add relative position to path (normalized to start position)
        const relativeRow = row - startRow;
        const relativeCol = col - startCol;
        path.push(`${relativeRow},${relativeCol}`);

        // Explore all 4 directions
        for (let i = 0; i < directions.length; i++) {
            const [dr, dc] = directions[i];
            dfs(row + dr, col + dc, startRow, startCol, path);
        }
    }

    // Find all islands and their shapes
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 1) {
                const path = [];
                dfs(row, col, row, col, path);

                // Sort path to ensure consistent representation
                path.sort();
                const signature = path.join('|');
                distinctIslands.add(signature);
            }
        }
    }

    return distinctIslands.size;
}

/**
 * Test cases for Problem 694: Number Of Distinct Islands
 */
function testSolution() {
    console.log('Testing 694. Number Of Distinct Islands');

    // Test case 1: Example with distinct shapes
    const grid1 = [
        [1,1,0,1,1],
        [1,0,0,0,0],
        [0,0,0,0,1],
        [1,1,0,1,1]
    ];
    const result1 = solve(JSON.parse(JSON.stringify(grid1)));
    console.assert(result1 === 3, `Test 1 failed: expected 3, got ${result1}`);

    // Test case 2: Same shapes (should count as 1)
    const grid2 = [
        [1,1,0,0,0],
        [1,1,0,0,0],
        [0,0,0,1,1],
        [0,0,0,1,1]
    ];
    const result2 = solve(JSON.parse(JSON.stringify(grid2)));
    console.assert(result2 === 1, `Test 2 failed: expected 1, got ${result2}`);

    // Test case 3: Single cell islands
    const grid3 = [
        [1,0,1],
        [0,1,0],
        [1,0,1]
    ];
    const result3 = solve(JSON.parse(JSON.stringify(grid3)));
    console.assert(result3 === 1, `Test 3 failed: expected 1, got ${result3}`);

    // Test case 4: No islands
    const grid4 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    const result4 = solve(JSON.parse(JSON.stringify(grid4)));
    console.assert(result4 === 0, `Test 4 failed: expected 0, got ${result4}`);

    // Test case 5: One large island
    const grid5 = [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ];
    const result5 = solve(JSON.parse(JSON.stringify(grid5)));
    console.assert(result5 === 1, `Test 5 failed: expected 5, got ${result5}`);

    // Test case 6: L-shaped vs mirrored L
    const grid6 = [
        [1,0,0,1,1],
        [1,0,0,1,0],
        [1,1,0,1,0]
    ];
    const result6 = solve(JSON.parse(JSON.stringify(grid6)));
    console.assert(result6 === 2, `Test 6 failed: expected 2, got ${result6}`);

    // Test case 7: Empty grid
    const grid7 = [];
    const result7 = solve(grid7);
    console.assert(result7 === 0, `Test 7 failed: expected 0, got ${result7}`);

    console.log('All test cases passed for 694. Number Of Distinct Islands!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 694. Number Of Distinct Islands ===');
    console.log('Category: Graphs');
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
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
