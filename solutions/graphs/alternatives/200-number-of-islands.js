/**
 * # Difficulty: Medium
 *
 * # 200. Number Of Islands
 *
 * Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.
 *
 * An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[["1","1","1","1","0"]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>Number of islands in binary grid is 3</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This is a classic graph traversal problem where we need to find connected components. Each island is a connected component of '1's (land). We can use DFS or BFS to explore each island completely when we encounter it, then count how many separate islands we find.
 *
 * ### APPROACH:
 * 1. **Iterate through grid**: Check each cell in the grid
 * 2. **Find land**: When we find a '1' (land), it's part of an island
 * 3. **Explore island**: Use DFS/BFS to mark all connected land as visited
 * 4. **Count islands**: Each time we start a new DFS/BFS, we found a new island
 * 5. **Mark visited**: Change '1' to '0' or use separate visited array
 *
 * ### WHY THIS WORKS:
 * - DFS/BFS explores all connected components (islands) completely
 * - Once we've explored an island, we mark it as visited to avoid double-counting
 * - Each DFS/BFS start represents discovering a new island
 * - 4-directional connectivity defines what constitutes an island
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Grid: [["1","1","1","1","0"],
 *        ["1","1","0","1","0"],
 *        ["1","1","0","0","0"],
 *        ["0","0","0","0","0"]]
 *
 * Process:
 * - Start at (0,0): DFS explores entire connected land mass
 * - Mark all connected '1's as visited: (0,0), (0,1), (0,2), (0,3), (1,0), (1,1), (2,0), (2,1)
 * - Continue scanning: (1,3) is unvisited land → start new DFS
 * - DFS from (1,3) only marks (1,3) as it's isolated
 * - Total islands found: 2
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(M × N)
 * Where M and N are grid dimensions - we visit each cell at most once
 *
 * ### SPACE COMPLEXITY:
 * O(M × N)
 * For recursion stack in worst case (entire grid is one island) or visited array
 *
 * ### EDGE CASES:
 * - Empty grid
 * - All water ('0's)
 * - All land ('1's) - single island
 * - Single cell grid
 * - Grid with no islands
 *
 * </details>
 */

/**
 * Main solution for Problem 200: Number Of Islands
 *
 * @param {string[][]} grid - 2D grid of '1's (land) and '0's (water)
 * @return {number} - Number of islands (connected components of '1's)
 *
 * Time Complexity: O(m * n) - visit each cell at most once
 * Space Complexity: O(m * n) - recursion stack in worst case
 */
function solve(grid) {
    if (!grid || grid.length === 0 || grid[0].length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    function dfs(row, col) {
        // Base cases: out of bounds or water
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }

        // Mark current cell as visited by setting to '0'
        grid[row][col] = '0';

        // Explore all 4 directions
        dfs(row + 1, col); // down
        dfs(row - 1, col); // up
        dfs(row, col + 1); // right
        dfs(row, col - 1); // left
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === '1') {
                count++; // Found a new island
                dfs(row, col); // Mark entire island as visited
            }
        }
    }

    return count;
}

/**
 * Test cases for Problem 200: Number Of Islands
 */
function testSolution() {
    console.log('Testing 200. Number Of Islands');

    // Test case 1: Example from problem description
    const grid1 = [
        ["1","1","1","1","0"],
        ["1","1","0","1","0"],
        ["1","1","0","0","0"],
        ["0","0","0","0","0"]
    ];
    const result1 = solve(JSON.parse(JSON.stringify(grid1))); // Deep copy
    console.assert(result1 === 1, `Test 1 failed: expected 1, got ${result1}`);

    // Test case 2: Multiple islands
    const grid2 = [
        ["1","1","0","0","0"],
        ["1","1","0","0","0"],
        ["0","0","1","0","0"],
        ["0","0","0","1","1"]
    ];
    const result2 = solve(JSON.parse(JSON.stringify(grid2)));
    console.assert(result2 === 3, `Test 2 failed: expected 3, got ${result2}`);

    // Test case 3: No islands (all water)
    const grid3 = [
        ["0","0","0"],
        ["0","0","0"],
        ["0","0","0"]
    ];
    const result3 = solve(JSON.parse(JSON.stringify(grid3)));
    console.assert(result3 === 0, `Test 3 failed: expected 0, got ${result3}`);

    // Test case 4: All land (one big island)
    const grid4 = [
        ["1","1"],
        ["1","1"]
    ];
    const result4 = solve(JSON.parse(JSON.stringify(grid4)));
    console.assert(result4 === 1, `Test 4 failed: expected 1, got ${result4}`);

    // Test case 5: Single cell island
    const grid5 = [["1"]];
    const result5 = solve(JSON.parse(JSON.stringify(grid5)));
    console.assert(result5 === 1, `Test 5 failed: expected 1, got ${result5}`);

    // Test case 6: Empty grid
    const grid6 = [];
    const result6 = solve(grid6);
    console.assert(result6 === 0, `Test 6 failed: expected 0, got ${result6}`);

    // Test case 7: Diagonal islands (not connected)
    const grid7 = [
        ["1","0","1"],
        ["0","1","0"],
        ["1","0","1"]
    ];
    const result7 = solve(JSON.parse(JSON.stringify(grid7)));
    console.assert(result7 === 5, `Test 7 failed: expected 5, got ${result7}`);

    console.log('All test cases passed for 200. Number Of Islands!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 200. Number Of Islands ===');
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
