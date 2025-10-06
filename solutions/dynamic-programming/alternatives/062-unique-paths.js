/**
 * 62. Unique Paths
 * Medium
 *
 * Unique Paths Problem Solution Problem: A robot is located at the top-left corner of a m x n grid. The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid. How many possible unique paths are there? @param {number} m - Number of rows in the grid @param {number} n - Number of columns in the grid @return {number} - Number of unique paths
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Unique Paths is to understand the core problem pattern
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
 * Unique Paths Problem Solution
 * 
 * Problem: A robot is located at the top-left corner of a m x n grid.
 * The robot can only move either down or right at any point in time.
 * The robot is trying to reach the bottom-right corner of the grid.
 * How many possible unique paths are there?
 * 
 * @param {number} m - Number of rows in the grid
 * @param {number} n - Number of columns in the grid
 * @return {number} - Number of unique paths
 */

/**
 * Dynamic Programming solution for the Unique Paths problem
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
function uniquePaths(m, n) {
    // Handle edge cases
    if (m <= 0 || n <= 0) return 0;
    if (m === 1 || n === 1) return 1;

    // Create a 2D array to store the number of paths for each cell
    const dp = Array(m).fill().map(() => Array(n).fill(0));

    // Initialize first row with 1 as there's only one way to reach each cell in first row
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    // Initialize first column with 1 as there's only one way to reach each cell in first column
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }

    // Fill the dp array
    // For each cell, paths = paths from above + paths from left
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }

    // Return the value at bottom-right cell
    return dp[m-1][n-1];
}

/**
 * Space-optimized solution using 1D array
 * Time Complexity: O(m*n)
 * Space Complexity: O(n)
 */
function uniquePathsOptimized(m, n) {
    // Handle edge cases
    if (m <= 0 || n <= 0) return 0;
    if (m === 1 || n === 1) return 1;

    // Create 1D array for current row
    const dp = Array(n).fill(1);

    // Process each row
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[j] += dp[j-1];
        }
    }

    return dp[n-1];
}

// Test cases
function runTests() {
    const testCases = [
        { m: 3, n: 7, expected: 28 },
        { m: 3, n: 2, expected: 3 },
        { m: 7, n: 3, expected: 28 },
        { m: 1, n: 1, expected: 1 },
        { m: 2, n: 2, expected: 2 }
    ];

    console.log("Running tests...");
    testCases.forEach((test, index) => {
        const result = uniquePaths(test.m, test.n);
        const optimizedResult = uniquePathsOptimized(test.m, test.n);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: m = ${test.m}, n = ${test.n}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Regular Solution Result: ${result}`);
        console.log(`Optimized Solution Result: ${optimizedResult}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Run the tests
runTests();

// Export the functions for external use
module.exports = {
    uniquePaths,
    uniquePathsOptimized
};