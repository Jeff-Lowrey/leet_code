/**
 * 695. Max Area Of Island
 * Medium
 *
 * This problem demonstrates key concepts in Graphs.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the largest connected component of 1s in a 2D grid.
 * Use DFS to explore each island and calculate its area.
 *
 * APPROACH:
 * 1. Iterate through each cell in the grid
 * 2. When we find a 1, start DFS to calculate the area of that island
 * 3. Mark visited cells as 0 to avoid double counting
 * 4. Track the maximum area found
 *
 * WHY THIS WORKS:
 * - DFS explores the entire connected component in one traversal
 * - Marking cells as visited prevents counting the same cell multiple times
 * - Each DFS call returns the total area of one island
 *
 * TIME COMPLEXITY: O(m * n) - visit each cell at most once
 * SPACE COMPLEXITY: O(m * n) - recursion stack in worst case
 *
 * EXAMPLE WALKTHROUGH:
 * Grid: [[1,1,0],[0,1,0],[1,0,1]]
 * Island 1: DFS from (0,0) visits (0,0), (0,1), (1,1) → area = 3
 * Island 2: DFS from (2,0) visits (2,0) → area = 1
 * Island 3: DFS from (2,2) visits (2,2) → area = 1
 * Max area: 3
 *
 * EDGE CASES:
 * - Empty grid or all water (return 0)
 * - Single cell island
 * - Grid with all land (one big island)
 * - Multiple islands of same size
 */

/**
 * Main solution for Problem 695: Max Area Of Island
 *
 * @param {number[][]} grid - 2D grid of 0s and 1s
 * @return {number} - Maximum area of any island
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
    let maxArea = 0;

    function dfs(row, col) {
        // Base cases: out of bounds or water
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === 0) {
            return 0;
        }

        // Mark current cell as visited
        grid[row][col] = 0;

        // Calculate area: current cell (1) + areas of all connected cells
        let area = 1;
        area += dfs(row + 1, col); // down
        area += dfs(row - 1, col); // up
        area += dfs(row, col + 1); // right
        area += dfs(row, col - 1); // left

        return area;
    }

    // Iterate through each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 1) {
                const area = dfs(row, col);
                maxArea = Math.max(maxArea, area);
            }
        }
    }

    return maxArea;
}

/**
 * Test cases for Problem 695: Max Area Of Island
 */
function testSolution() {
    console.log('Testing 695. Max Area Of Island');

    // Test case 1: Example from problem description
    const grid1 = [
        [0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
    ];
    const result1 = solve(JSON.parse(JSON.stringify(grid1)));
    console.assert(result1 === 6, `Test 1 failed: expected 6, got ${result1}`);

    // Test case 2: No islands
    const grid2 = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    const result2 = solve(JSON.parse(JSON.stringify(grid2)));
    console.assert(result2 === 0, `Test 2 failed: expected 0, got ${result2}`);

    // Test case 3: Single cell island
    const grid3 = [
        [0,0,0],
        [0,1,0],
        [0,0,0]
    ];
    const result3 = solve(JSON.parse(JSON.stringify(grid3)));
    console.assert(result3 === 1, `Test 3 failed: expected 1, got ${result3}`);

    // Test case 4: Entire grid is one island
    const grid4 = [
        [1,1],
        [1,1]
    ];
    const result4 = solve(JSON.parse(JSON.stringify(grid4)));
    console.assert(result4 === 4, `Test 4 failed: expected 4, got ${result4}`);

    // Test case 5: Linear island
    const grid5 = [
        [1,1,1,1],
        [0,0,0,0]
    ];
    const result5 = solve(JSON.parse(JSON.stringify(grid5)));
    console.assert(result5 === 4, `Test 5 failed: expected 4, got ${result5}`);

    // Test case 6: Multiple small islands
    const grid6 = [
        [1,0,1],
        [0,0,0],
        [1,0,1]
    ];
    const result6 = solve(JSON.parse(JSON.stringify(grid6)));
    console.assert(result6 === 1, `Test 6 failed: expected 1, got ${result6}`);

    // Test case 7: Empty grid
    const grid7 = [];
    const result7 = solve(grid7);
    console.assert(result7 === 0, `Test 7 failed: expected 0, got ${result7}`);

    console.log('All test cases passed for 695. Max Area Of Island!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 695. Max Area Of Island ===');
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
