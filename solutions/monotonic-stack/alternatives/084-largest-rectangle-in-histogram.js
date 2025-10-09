/**

 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For each bar in the histogram, we want to find the maximum rectangle that has this bar as the shortest bar.
 * The width of this rectangle is determined by the first smaller bar to the left and right of the current bar.
 * A monotonic increasing stack helps us efficiently find these boundaries.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - The monotonic stack maintains indices in increasing order of heights
 * - When we pop, we know exactly where the rectangle can extend (between boundaries)
 * - Each bar is pushed and popped exactly once, achieving O(n) time
 * - The stack holds indices, allowing us to calculate widths efficiently
 *
 * TIME COMPLEXITY: O(n) - each element pushed and popped once
 * SPACE COMPLEXITY: O(n) - stack can hold all bars in worst case
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: heights = [2,1,5,6,2,3]
 *
 * Step 1: i=0, h=2, stack=[] → push 0, stack=[0]
 * Step 2: i=1, h=1, h<2 → pop 0, area=2*1=2, push 1, stack=[1]
 * Step 3: i=2, h=5, h>1 → push 2, stack=[1,2]
 * Step 4: i=3, h=6, h>5 → push 3, stack=[1,2,3]
 * Step 5: i=4, h=2, h<6 → pop 3, area=6*1=6
 *                   h<5 → pop 2, area=5*2=10
 * Step 6: push 4, stack=[1,4]
 * Step 7: i=5, h=3, h>2 → push 5, stack=[1,4,5]
 * Step 8: Process remaining: pop 5, area=3*2=6
 *                           pop 4, area=2*4=8
 *                           pop 1, area=1*6=6
 *
 * Maximum area = 10
 * ```
 *
 * EDGE CASES:
 * - Empty array: return 0
 * - Single bar: return height of that bar
 * - All bars same height: return height * number of bars
 * - Increasing heights: process all at end
 * - Decreasing heights: process each immediately
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
