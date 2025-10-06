/**
 * 84. Largest Rectangle In Histogram
 * Medium
 *
 * Largest Rectangle in Histogram - Monotonic Stack Implementation Time Complexity: O(n) Space Complexity: O(n)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Largest Rectangle In Histogram is to understand the core problem pattern
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
 * Largest Rectangle in Histogram - Monotonic Stack Implementation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * @param {number[]} heights - Array of histogram bar heights
 * @return {number} - Maximum rectangular area possible
 */
function largestRectangleArea(heights) {
    if (!heights || heights.length === 0) return 0;
    
    const stack = [];
    let maxArea = 0;
    let i = 0;
    
    // Process all bars in the histogram
    while (i < heights.length) {
        // If stack is empty or current height is greater than top of stack
        // push current index to stack
        if (stack.length === 0 || heights[stack[stack.length - 1]] <= heights[i]) {
            stack.push(i);
            i++;
        } else {
            // Calculate area with the top bar as smallest bar
            maxArea = calculateArea(heights, stack, maxArea, i);
        }
    }
    
    // Process remaining bars in the stack
    while (stack.length > 0) {
        maxArea = calculateArea(heights, stack, maxArea, i);
    }
    
    return maxArea;
}

/**
 * Helper function to calculate area for current bar
 * @param {number[]} heights - Array of histogram bar heights
 * @param {number[]} stack - Monotonic stack containing indices
 * @param {number} maxArea - Current maximum area
 * @param {number} currentIndex - Current index being processed
 * @return {number} - Updated maximum area
 */
function calculateArea(heights, stack, maxArea, currentIndex) {
    const height = heights[stack.pop()];
    const width = stack.length === 0 ? currentIndex : currentIndex - stack[stack.length - 1] - 1;
    return Math.max(maxArea, height * width);
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [2, 1, 5, 6, 2, 3],
            expected: 10,
            description: "Test case 1: Regular histogram"
        },
        {
            input: [2, 4],
            expected: 4,
            description: "Test case 2: Two bars"
        },
        {
            input: [],
            expected: 0,
            description: "Test case 3: Empty histogram"
        },
        {
            input: [1],
            expected: 1,
            description: "Test case 4: Single bar"
        },
        {
            input: [2, 2, 2, 2],
            expected: 8,
            description: "Test case 5: Equal heights"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = largestRectangleArea(testCase.input);
        console.log(`${testCase.description}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    largestRectangleArea
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}