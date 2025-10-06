/**
 * 695. Max Area Of Island
 * Medium
 *
 * Max Area Island - Find the maximum area of an island in a 2D binary grid @param {number[][]} grid - 2D array where 1 represents land and 0 represents water @return {number} - The area of the largest island Time Complexity: O(m n) where m is number of rows and n is number of columns Space Complexity: O(m n) in worst case for recursive call stack
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Max Area Of Island is to understand the core problem pattern
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
 * Max Area Island - Find the maximum area of an island in a 2D binary grid
 * 
 * @param {number[][]} grid - 2D array where 1 represents land and 0 represents water
 * @return {number} - The area of the largest island
 * 
 * Time Complexity: O(m*n) where m is number of rows and n is number of columns
 * Space Complexity: O(m*n) in worst case for recursive call stack
 */

const maxAreaOfIsland = function(grid) {
    // Handle edge case of empty grid
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;
    
    // Helper function to check if a position is valid
    const isValid = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };
    
    // DFS function to explore and count connected land cells
    const exploreIsland = (row, col) => {
        // Base cases: invalid position or water or visited cell
        if (!isValid(row, col) || grid[row][col] !== 1) {
            return 0;
        }
        
        // Mark current cell as visited by changing it to 2
        grid[row][col] = 2;
        
        // Explore all four directions and sum up the areas
        return 1 + // Current cell
            exploreIsland(row + 1, col) + // Down
            exploreIsland(row - 1, col) + // Up
            exploreIsland(row, col + 1) + // Right
            exploreIsland(row, col - 1);  // Left
    };
    
    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // If we find a land cell, explore the island
            if (grid[row][col] === 1) {
                maxArea = Math.max(maxArea, exploreIsland(row, col));
            }
        }
    }
    
    return maxArea;
};

// Example usage and test cases
const testCases = [
    // Test Case 1: Grid with multiple islands
    [
        [1,1,0,0,0],
        [1,1,0,0,0],
        [0,0,0,1,1],
        [0,0,0,1,1]
    ],
    
    // Test Case 2: Grid with no islands
    [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ],
    
    // Test Case 3: Grid with single cell island
    [
        [1]
    ],
    
    // Test Case 4: Empty grid
    []
];

// Run test cases
testCases.forEach((grid, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input Grid:', grid);
    console.log('Max Area:', maxAreaOfIsland(grid));
    console.log('---');
});

module.exports = maxAreaOfIsland;