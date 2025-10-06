/**
 * 42. Trapping Rain Water
 * Medium
 *
 * Trapping Rain Water - Monotonic Stack Implementation Time Complexity: O(n) where n is the length of the height array Space Complexity: O(n) for the stack @param {number[]} height - Array of heights representing elevation map @return {number} - Total amount of trapped rainwater
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
 * Trapping Rain Water - Monotonic Stack Implementation
 * Time Complexity: O(n) where n is the length of the height array
 * Space Complexity: O(n) for the stack
 * 
 * @param {number[]} height - Array of heights representing elevation map
 * @return {number} - Total amount of trapped rainwater
 */
function trap(height) {
    // Handle edge cases
    if (!height || height.length < 3) {
        return 0;
    }

    let totalWater = 0;
    const stack = []; // Monotonic stack to store indices

    // Iterate through each position in the height array
    for (let current = 0; current < height.length; current++) {
        // While stack is not empty and current height is greater than height at stack top
        while (stack.length > 0 && height[current] > height[stack[stack.length - 1]]) {
            const top = stack.pop(); // Get the top element

            // If stack is empty after pop, no left boundary exists
            if (stack.length === 0) {
                break;
            }

            // Calculate the distance between boundaries
            const distance = current - stack[stack.length - 1] - 1;

            // Calculate the bounded height
            const boundedHeight = Math.min(
                height[current],
                height[stack[stack.length - 1]]
            ) - height[top];

            // Add trapped water for this section
            totalWater += distance * boundedHeight;
        }

        // Push current index to stack
        stack.push(current);
    }

    return totalWater;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    const testCases = [
        {
            input: [0,1,0,2,1,0,1,3,2,1,2,1],
            expected: 6,
            description: "Standard case with multiple traps"
        },
        {
            input: [4,2,0,3,2,5],
            expected: 9,
            description: "Case with larger values"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array"
        },
        {
            input: [1],
            expected: 0,
            description: "Single element"
        },
        {
            input: [1,2],
            expected: 0,
            description: "Two elements"
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