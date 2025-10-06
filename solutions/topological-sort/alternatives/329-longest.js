/**
 * 329. Longest
 * Medium
 *
 * Longest Increasing Path in a Matrix Time Complexity: O(m n) where m and n are the dimensions of the matrix Space Complexity: O(m n) for the memoization cache @param {number[][]} matrix - The input matrix of integers @return {number} - Length of the longest increasing path
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Longest is to understand the core problem pattern
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
 * Longest Increasing Path in a Matrix
 * Time Complexity: O(m * n) where m and n are the dimensions of the matrix
 * Space Complexity: O(m * n) for the memoization cache
 * 
 * @param {number[][]} matrix - The input matrix of integers
 * @return {number} - Length of the longest increasing path
 */
function longestIncreasingPath(matrix) {
    // Handle edge cases
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    
    // Create memoization cache
    const memo = Array(rows).fill().map(() => Array(cols).fill(0));
    
    // Track maximum path length
    let maxPath = 0;
    
    // Direction arrays for exploring adjacent cells
    const directions = [
        [-1, 0],  // up
        [1, 0],   // down
        [0, -1],  // left
        [0, 1]    // right
    ];
    
    /**
     * DFS helper function to explore paths starting from a cell
     * @param {number} row - Current row
     * @param {number} col - Current column
     * @param {number} prevVal - Value of the previous cell
     * @returns {number} - Length of the longest path from current cell
     */
    function dfs(row, col, prevVal) {
        // Check boundaries and if current value is less than or equal to previous
        if (row < 0 || row >= rows || col < 0 || col >= cols || matrix[row][col] <= prevVal) {
            return 0;
        }
        
        // If we have already computed this path, return cached result
        if (memo[row][col] !== 0) {
            return memo[row][col];
        }
        
        let currentMax = 1;
        
        // Explore all four directions
        for (const [dx, dy] of directions) {
            const newRow = row + dx;
            const newCol = col + dy;
            
            const pathLength = 1 + dfs(newRow, newCol, matrix[row][col]);
            currentMax = Math.max(currentMax, pathLength);
        }
        
        // Cache the result
        memo[row][col] = currentMax;
        return currentMax;
    }
    
    // Try starting from each cell in the matrix
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            maxPath = Math.max(maxPath, dfs(i, j, -Infinity));
        }
    }
    
    return maxPath;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [
                [9,9,4],
                [6,6,8],
                [2,1,1]
            ],
            expected: 4
        },
        {
            input: [
                [3,4,5],
                [3,2,6],
                [2,2,1]
            ],
            expected: 4
        },
        {
            input: [[1]],
            expected: 1
        },
        {
            input: [],
            expected: 0
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const result = longestIncreasingPath(testCases[i].input);
        console.log(`Test case ${i + 1}:`);
        console.log(`Input: ${JSON.stringify(testCases[i].input)}`);
        console.log(`Expected: ${testCases[i].expected}`);
        console.log(`Got: ${result}`);
        console.log(`Pass: ${result === testCases[i].expected}\n`);
    }
}

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}

// Export for use in other modules
module.exports = longestIncreasingPath;