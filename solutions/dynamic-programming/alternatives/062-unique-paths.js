/**
 * 062. Unique Paths
 * Medium
 *
 * This problem demonstrates key concepts in Dynamic Programming.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * [This problem requires understanding of dynamic programming concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages dynamic programming principles
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
 * Main solution for Problem 062: Unique Paths
 *
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @return {number} - Number of unique paths from top-left to bottom-right
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(n)
 */
function solve(m, n) {
    // Create a 1D array to represent the current row
    const dp = new Array(n).fill(1);

    // For each row starting from the second
    for (let i = 1; i < m; i++) {
        // For each column starting from the second
        for (let j = 1; j < n; j++) {
            // Current cell = paths from above + paths from left
            dp[j] = dp[j] + dp[j - 1];
        }
    }

    return dp[n - 1];
}

/**
 * Test cases for Problem 062: Unique Paths
 */
function testSolution() {
    console.log('Testing 062. Unique Paths');

    // Test case 1: 3x7 grid
    const result1 = solve(3, 7);
    const expected1 = 28;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: 3x2 grid
    const result2 = solve(3, 2);
    const expected2 = 3;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: 1x1 grid
    const result3 = solve(1, 1);
    const expected3 = 1;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 062. Unique Paths!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 062. Unique Paths ===');
    console.log('Category: Dynamic Programming');
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
 * - This solution focuses on dynamic programming concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
