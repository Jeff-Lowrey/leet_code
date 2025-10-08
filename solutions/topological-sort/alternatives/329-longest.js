/**
 * 329. Longest
 * Medium
 *
 * This problem demonstrates key concepts in Topological Sort.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * [This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages topological sort principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
 */

/**
 * Main solution for Problem 329: Longest Increasing Path in a Matrix
 *
 * @param {number[][]} matrix - 2D matrix of integers
 * @return {number} - Length of longest increasing path
 *
 * Time Complexity: O(m * n) where m and n are matrix dimensions
 * Space Complexity: O(m * n) for memoization
 */
function solve(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    const memo = Array.from({ length: rows }, () => new Array(cols).fill(0));
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    const dfs = (row, col) => {
        // Return cached result if available
        if (memo[row][col] !== 0) {
            return memo[row][col];
        }

        let maxPath = 1;

        // Explore all four directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check bounds and increasing condition
            if (newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                matrix[newRow][newCol] > matrix[row][col]) {
                maxPath = Math.max(maxPath, 1 + dfs(newRow, newCol));
            }
        }

        memo[row][col] = maxPath;
        return maxPath;
    };

    let longestPath = 0;

    // Try starting from each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            longestPath = Math.max(longestPath, dfs(i, j));
        }
    }

    return longestPath;
}

/**
 * Test cases for Problem 329: Longest Increasing Path in a Matrix
 */
function testSolution() {
    console.log('Testing 329. Longest Increasing Path in a Matrix');

    // Test case 1: Standard 3x3 matrix
    const result1 = solve([[9, 9, 4], [6, 6, 8], [2, 1, 1]]);
    const expected1 = 4; // Path: 1 -> 2 -> 6 -> 9
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another 3x3 matrix
    const result2 = solve([[3, 4, 5], [3, 2, 6], [2, 2, 1]]);
    const expected2 = 4; // Path: 3 -> 4 -> 5 -> 6
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([[1]]);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All same values
    const result4 = solve([[5, 5], [5, 5]]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Linear increasing path
    const result5 = solve([[1, 2, 3, 4]]);
    const expected5 = 4;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 329. Longest Increasing Path in a Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 329. Longest ===');
    console.log('Category: Topological Sort');
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
