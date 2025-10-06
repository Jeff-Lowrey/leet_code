/**
 * 84. Largest Rectangle In Histogram
 * Medium
 *
 * Largest Rectangle in Histogram Time Complexity: O(n) Space Complexity: O(n) @param {number[]} heights - Array of integers representing histogram bar heights @return {number} - The area of the largest rectangle
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
 * Largest Rectangle in Histogram
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} heights - Array of integers representing histogram bar heights
 * @return {number} - The area of the largest rectangle
 */
function largestRectangleArea(heights) {
    if (!heights || heights.length === 0) return 0;
    
    const stack = [];
    let maxArea = 0;
    let i = 0;
    
    // Process all bars in the histogram
    while (i < heights.length) {
        // If stack is empty or current height is larger than previous,
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
 * 
 * @param {number[]} heights - Array of heights
 * @param {number[]} stack - Stack of indices
 * @param {number} maxArea - Current maximum area
 * @param {number} i - Current index
 * @return {number} - Updated maximum area
 */
function calculateArea(heights, stack, maxArea, i) {
    const height = heights[stack.pop()];
    const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
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
            description: "Regular case with varying heights"
        },
        {
            input: [2, 4],
            expected: 4,
            description: "Small array"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element"
        },
        {
            input: [2, 2, 2, 2],
            expected: 8,
            description: "Equal heights"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = largestRectangleArea(testCase.input);
        console.log(`Test ${index + 1}: ${testCase.description}`);
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