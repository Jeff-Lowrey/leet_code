/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Helper function to find largest rectangle in histogram
 */
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    let i = 0;

    while (i < heights.length) {
        if (stack.length === 0 || heights[i] >= heights[stack[stack.length - 1]]) {
            stack.push(i);
            i++;
        } else {
            const topIndex = stack.pop();
            const height = heights[topIndex];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    while (stack.length > 0) {
        const topIndex = stack.pop();
        const height = heights[topIndex];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
}

/**
 * Main solution for Problem 085: Maximal Rectangle
 *
 * @param {string[][]} matrix - Binary matrix with '0' and '1'
 * @return {number} - Maximum rectangle area containing only 1's
 *
 * Time Complexity: O(m * n)
 * Space Complexity: O(n)
 */
function solve(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

    const rows = matrix.length;
    const cols = matrix[0].length;
    const heights = new Array(cols).fill(0);
    let maxArea = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Update heights: increment if '1', reset to 0 if '0'
            if (matrix[i][j] === '1') {
                heights[j]++;
            } else {
                heights[j] = 0;
            }
        }
        // Find max rectangle for current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

/**
 * Test cases for Problem 085: Maximal Rectangle
 */
function testSolution() {
    console.log('Testing 085. Maximal Rectangle');

    // Test case 1: Example from problem
    const result1 = solve([
        ["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]
    ]);
    const expected1 = 6;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single cell with 1
    const result2 = solve([["1"]]);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All zeros
    const result3 = solve([["0","0"],["0","0"]]);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All ones
    const result4 = solve([["1","1"],["1","1"]]);
    const expected4 = 4;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Complex pattern
    const result5 = solve([["0","1"],["1","0"]]);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 085. Maximal Rectangle!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 085. Maximal ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
