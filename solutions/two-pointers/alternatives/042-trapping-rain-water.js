/**
 * 42. Trapping Rain Water
 * Medium
 *
 * Trapping Rain Water - JavaScript Implementation Problem: Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining. Time Complexity: O(n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Trapping Rain Water is to understand the core problem pattern
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
 * Trapping Rain Water - JavaScript Implementation
 * 
 * Problem: Given n non-negative integers representing an elevation map 
 * where the width of each bar is 1, compute how much water it can trap after raining.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Calculates the amount of water that can be trapped between bars
 * @param {number[]} height - Array of non-negative integers representing bar heights
 * @return {number} - Total amount of trapped water
 */
function trap(height) {
    // Handle edge cases
    if (!height || height.length < 3) {
        return 0;
    }

    let totalWater = 0;
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;

    // Use two pointers approach
    while (left < right) {
        // Update the maximum height from left
        if (height[left] > leftMax) {
            leftMax = height[left];
        }

        // Update the maximum height from right
        if (height[right] > rightMax) {
            rightMax = height[right];
        }

        // Calculate trapped water
        if (leftMax < rightMax) {
            // Water trapped at current left position
            totalWater += Math.max(0, leftMax - height[left]);
            left++;
        } else {
            // Water trapped at current right position
            totalWater += Math.max(0, rightMax - height[right]);
            right--;
        }
    }

    return totalWater;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
            expected: 6,
            description: "Standard case with multiple traps"
        },
        {
            input: [4, 2, 0, 3, 2, 5],
            expected: 9,
            description: "Case with deep trap"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1, 2],
            expected: 0,
            description: "Array too short to trap water"
        },
        {
            input: [3, 3, 3, 3],
            expected: 0,
            description: "Flat surface"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = trap(testCase.input);
        const passed = result === testCase.expected;
        console.log(`Test ${index + 1} (${testCase.description}): ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}, Got: ${result}\n`);
    });
}

// Export the function for use in other modules
module.exports = trap;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}