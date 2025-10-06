/**
 * 11. Container With Most Water
 * Medium
 *
 * Container With Most Water - LeetCode #11 Problem: Given n non-negative integers representing an array of heights where the width between each integer is 1, find two lines that together with the x-axis forms a container that would hold the most water. @param {number[]} height - Array of heights @return {number} - Maximum area of water that can be contained
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Container With Most Water is to understand the core problem pattern
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
 * Container With Most Water - LeetCode #11
 * 
 * Problem: Given n non-negative integers representing an array of heights where
 * the width between each integer is 1, find two lines that together with the x-axis
 * forms a container that would hold the most water.
 * 
 * @param {number[]} height - Array of heights
 * @return {number} - Maximum area of water that can be contained
 */

const maxArea = function(height) {
    // Input validation
    if (!Array.isArray(height) || height.length < 2) {
        return 0;
    }

    let maxWater = 0;
    let left = 0;                    // Left pointer
    let right = height.length - 1;   // Right pointer

    // Use two-pointer technique to find maximum area
    while (left < right) {
        // Calculate width between the two lines
        const width = right - left;
        
        // Calculate height (minimum of the two lines)
        const containerHeight = Math.min(height[left], height[right]);
        
        // Calculate area and update maxWater if current area is larger
        const area = width * containerHeight;
        maxWater = Math.max(maxWater, area);

        // Move the pointer with smaller height inward
        // This is optimal because keeping the smaller height line
        // cannot yield a larger area with any other line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxWater;
};

/**
 * Test cases
 */
const testCases = [
    [1, 8, 6, 2, 5, 4, 8, 3, 7],  // Expected: 49
    [1, 1],                        // Expected: 1
    [4, 3, 2, 1, 4],              // Expected: 16
    [1, 2, 1],                     // Expected: 2
    [],                            // Expected: 0
    [1]                            // Expected: 0
];

/**
 * Run test cases and display results
 */
function runTests() {
    testCases.forEach((testCase, index) => {
        const result = maxArea(testCase);
        console.log(`Test Case ${index + 1}:`);
        console.log(`Input: [${testCase}]`);
        console.log(`Output: ${result}`);
        console.log('---');
    });
}

// Execute tests if running directly (not being imported as a module)
if (require.main === module) {
    runTests();
}

// Export the function for potential use in other modules
module.exports = maxArea;