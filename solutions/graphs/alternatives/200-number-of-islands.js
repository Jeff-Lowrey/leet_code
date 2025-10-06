/**
 * 200. Number Of Islands
 * Medium
 *
 * Number of Islands - JavaScript Implementation Problem: Given a 2D grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. Time Complexity: O(m × n) where m is the number of rows and n is the number of columns Space Complexity: O(m × n) in worst case for recursive call stack
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Number Of Islands is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Number of Islands - JavaScript Implementation
 * 
 * Problem: Given a 2D grid map of '1's (land) and '0's (water), count the number
 * of islands. An island is surrounded by water and is formed by connecting adjacent
 * lands horizontally or vertically.
 * 
 * Time Complexity: O(m × n) where m is the number of rows and n is the number of columns
 * Space Complexity: O(m × n) in worst case for recursive call stack
 */

/**
 * @param {character[][]} grid
 * @return {number}
 */
const numIslands = function(grid) {
    // Input validation
    if (!grid || grid.length === 0) {
        return 0;
    }

    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;

    // Helper function to perform DFS and mark visited land
    const dfs = (row, col) => {
        // Check boundary conditions and if current cell is land
        if (row < 0 || col < 0 || row >= rows || col >= cols || grid[row][col] === '0') {
            return;
        }

        // Mark current land as visited by changing it to '0'
        grid[row][col] = '0';

        // Recursively check all adjacent cells (up, right, down, left)
        dfs(row - 1, col); // Up
        dfs(row + 1, col); // Down
        dfs(row, col - 1); // Left
        dfs(row, col + 1); // Right
    };

    // Iterate through each cell in the grid
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                islandCount++;
                dfs(i, j); // Start DFS from current land cell
            }
        }
    }

    return islandCount;
};

// Test cases
const testCases = [
    [
        ['1', '1', '1', '1', '0'],
        ['1', '1', '0', '1', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
    ],
    [
        ['1', '1', '0', '0', '0'],
        ['1', '1', '0', '0', '0'],
        ['0', '0', '1', '0', '0'],
        ['0', '0', '0', '1', '1']
    ],
    [] // Empty grid
];

// Run test cases
testCases.forEach((grid, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Grid:', grid);
    console.log('Number of Islands:', numIslands(grid));
    console.log('---');
});

// Export the function for use in other modules
module.exports = numIslands;