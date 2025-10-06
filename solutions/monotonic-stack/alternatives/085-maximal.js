/**
 * 85. Maximal
 * Medium
 *
 * Maximal Rectangle - Find the largest rectangle containing only 1's in a binary matrix @param {character[][]} matrix - Input binary matrix @return {number} - Area of the largest rectangle
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Maximal is to understand the core problem pattern
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
 * Maximal Rectangle - Find the largest rectangle containing only 1's in a binary matrix
 * @param {character[][]} matrix - Input binary matrix
 * @return {number} - Area of the largest rectangle
 */
function maximalRectangle(matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return 0;
    }

    const rows = matrix.length;
    const cols = matrix[0].length;
    let maxArea = 0;
    
    // Heights array to store consecutive 1's in each column
    const heights = new Array(cols).fill(0);

    // Iterate through each row
    for (let i = 0; i < rows; i++) {
        // Update heights array for current row
        for (let j = 0; j < cols; j++) {
            // If current cell is 1, add to height, else reset to 0
            heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
        }
        
        // Calculate maximum rectangle area for current row
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

/**
 * Helper function to calculate largest rectangle area in histogram
 * @param {number[]} heights - Array representing histogram heights
 * @return {number} - Maximum rectangle area
 */
function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    let i = 0;

    // Process all heights
    while (i < heights.length) {
        // If stack is empty or current height is larger than top of stack
        if (stack.length === 0 || heights[stack[stack.length - 1]] <= heights[i]) {
            stack.push(i++);
        } else {
            // Calculate area with stack top as smallest height
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
    }

    // Process remaining elements in stack
    while (stack.length > 0) {
        const height = heights[stack.pop()];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Basic matrix
    const matrix1 = [
        ["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]
    ];
    console.log("Test 1:", maximalRectangle(matrix1)); // Expected: 6

    // Test Case 2: Empty matrix
    const matrix2 = [];
    console.log("Test 2:", maximalRectangle(matrix2)); // Expected: 0

    // Test Case 3: Single row matrix
    const matrix3 = [["1","1","1"]];
    console.log("Test 3:", maximalRectangle(matrix3)); // Expected: 3

    // Test Case 4: Single column matrix
    const matrix4 = [["1"],["1"],["1"]];
    console.log("Test 4:", maximalRectangle(matrix4)); // Expected: 3
}

// Export for use in other modules
module.exports = {
    maximalRectangle,
    largestRectangleArea
};

// Run tests if not being imported
if (require.main === module) {
    runTests();
}