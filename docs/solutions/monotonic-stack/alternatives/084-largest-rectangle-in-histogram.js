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
 * - **Empty stack:** Handle operations on empty stack
 * - **Single element:** Push/pop with one item
 * - **Balanced pairs:** Match opening/closing elements
 * - **Nested structures:** Handle deeply nested cases
 * - **Underflow:** Prevent popping from empty stack
 *
 * </details>
 */

/**
 * Main solution for Problem 084: Largest Rectangle In Histogram
 *
 * @param {number[]} heights - Array of bar heights
 * @return {number} - Maximum rectangular area
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(heights) {
    if (!heights || heights.length === 0) return 0;

    const stack = []; // Store indices
    let maxArea = 0;
    let i = 0;

    while (i < heights.length) {
        // If current bar is higher or equal, push to stack
        if (stack.length === 0 || heights[i] >= heights[stack[stack.length - 1]]) {
            stack.push(i);
            i++;
        } else {
            // Current bar is lower, calculate area with popped bar as smallest
            const topIndex = stack.pop();
            const height = heights[topIndex];
            // Width: if stack empty, width is i; else i - stack.top - 1
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            const area = height * width;
            maxArea = Math.max(maxArea, area);
        }
    }

    // Process remaining bars in stack
    while (stack.length > 0) {
        const topIndex = stack.pop();
        const height = heights[topIndex];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        const area = height * width;
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}

/**
 * Test cases for Problem 084: Largest Rectangle In Histogram
 */
function testSolution() {
    console.log('Testing 084. Largest Rectangle In Histogram');

    // Test case 1: Example from problem
    const result1 = solve([2,1,5,6,2,3]);
    const expected1 = 10;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single bar
    const result2 = solve([2]);
    const expected2 = 2;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All same height
    const result3 = solve([3,3,3,3]);
    const expected3 = 12;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Increasing heights
    const result4 = solve([1,2,3,4,5]);
    const expected4 = 9;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Decreasing heights
    const result5 = solve([5,4,3,2,1]);
    const expected5 = 9;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Empty array
    const result6 = solve([]);
    const expected6 = 0;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 084. Largest Rectangle In Histogram!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 084. Largest Rectangle In Histogram ===');
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
