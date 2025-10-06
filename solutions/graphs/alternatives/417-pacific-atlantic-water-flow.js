/**
 * 417. Pacific Atlantic Water Flow
 * Medium
 *
 * Pacific Atlantic Water Flow Problem: Given an m x n matrix of non-negative integers representing the height of each unit cell, where water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower. Find all cells where water can flow to both the Pacific and Atlantic oceans. Pacific Ocean touches the left and top edges. Atlantic Ocean touches the right and bottom edges. @param {number[][]} heights - Matrix of heights @return {number[][]} - Array of coordinates [row, col] that can flow to both oceans
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Pacific Atlantic Water Flow is to understand the core problem pattern
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
 * Pacific Atlantic Water Flow
 * 
 * Problem: Given an m x n matrix of non-negative integers representing the height of each unit cell,
 * where water can only flow in four directions (up, down, left, or right) from a cell to another one
 * with height equal or lower. Find all cells where water can flow to both the Pacific and Atlantic oceans.
 * 
 * Pacific Ocean touches the left and top edges.
 * Atlantic Ocean touches the right and bottom edges.
 * 
 * @param {number[][]} heights - Matrix of heights
 * @return {number[][]} - Array of coordinates [row, col] that can flow to both oceans
 */

/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
const pacificAtlantic = function(heights) {
    if (!heights || !heights.length || !heights[0].length) return [];
    
    const rows = heights.length;
    const cols = heights[0].length;
    
    // Create two matrices to track cells that can reach each ocean
    const pacific = Array(rows).fill().map(() => Array(cols).fill(false));
    const atlantic = Array(rows).fill().map(() => Array(cols).fill(false));
    
    /**
     * DFS to mark cells that can reach the respective ocean
     * @param {number} row - Current row
     * @param {number} col - Current column
     * @param {boolean[][]} visited - Visited matrix for respective ocean
     * @param {number} prevHeight - Height of previous cell
     */
    const dfs = (row, col, visited, prevHeight) => {
        // Check bounds and if current cell is visitable
        if (row < 0 || row >= rows || col < 0 || col >= cols || 
            visited[row][col] || heights[row][col] < prevHeight) {
            return;
        }
        
        // Mark current cell as visited
        visited[row][col] = true;
        
        // Visit all adjacent cells
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (const [dx, dy] of directions) {
            dfs(row + dx, col + dy, visited, heights[row][col]);
        }
    };
    
    // Process Pacific Ocean (top and left edges)
    for (let col = 0; col < cols; col++) {
        dfs(0, col, pacific, heights[0][col]);
    }
    for (let row = 0; row < rows; row++) {
        dfs(row, 0, pacific, heights[row][0]);
    }
    
    // Process Atlantic Ocean (bottom and right edges)
    for (let col = 0; col < cols; col++) {
        dfs(rows - 1, col, atlantic, heights[rows - 1][col]);
    }
    for (let row = 0; row < rows; row++) {
        dfs(row, cols - 1, atlantic, heights[row][cols - 1]);
    }
    
    // Find cells that can reach both oceans
    const result = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (pacific[row][col] && atlantic[row][col]) {
                result.push([row, col]);
            }
        }
    }
    
    return result;
};

// Example usage and test cases
const testCases = [
    [
        [1,2,2,3,5],
        [3,2,3,4,4],
        [2,4,5,3,1],
        [6,7,1,4,5],
        [5,1,1,2,4]
    ],
    [[1]],
    []
];

// Run test cases
testCases.forEach((heights, index) => {
    console.log(`Test Case ${index + 1}:`);
    console.log('Input:', heights);
    console.log('Output:', pacificAtlantic(heights));
    console.log('---');
});

module.exports = pacificAtlantic;