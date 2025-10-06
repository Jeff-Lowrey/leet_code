/**
 * 456. 132
 * Medium
 *
 * 132 Pattern Implementation Problem: Given an array of n integers, find if there exists a pattern of three integers (not necessarily consecutive) such that the pattern is: nums[i] < nums[k] < nums[j], where i < j < k Time Complexity: O(n) Space Complexity: O(n)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving 132 is to understand the core problem pattern
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
 * 132 Pattern Implementation
 * 
 * Problem: Given an array of n integers, find if there exists a pattern of three integers
 * (not necessarily consecutive) such that the pattern is: nums[i] < nums[k] < nums[j], where i < j < k
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

/**
 * Checks if the array contains a 132 pattern
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if 132 pattern exists, false otherwise
 */
function find132pattern(nums) {
    // Handle edge cases
    if (nums.length < 3) {
        return false;
    }

    // Stack to keep track of potential candidates
    const stack = [];
    
    // Keep track of the maximum third number (2 in 132)
    let thirdNum = Number.NEGATIVE_INFINITY;

    // Iterate through the array from right to left
    for (let i = nums.length - 1; i >= 0; i--) {
        // If current number is less than third number, we found a 132 pattern
        if (nums[i] < thirdNum) {
            return true;
        }

        // Update thirdNum while maintaining the stack property
        while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
            thirdNum = stack.pop();
        }

        // Push current number to stack
        stack.push(nums[i]);
    }

    return false;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [1, 2, 3, 4],
            expected: false,
            description: "Monotonically increasing array"
        },
        {
            input: [3, 1, 4, 2],
            expected: true,
            description: "Valid 132 pattern"
        },
        {
            input: [-1, 3, 2, 0],
            expected: true,
            description: "Valid 132 pattern with negative numbers"
        },
        {
            input: [1, 2],
            expected: false,
            description: "Array too short"
        },
        {
            input: [],
            expected: false,
            description: "Empty array"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = find132pattern(testCase.input);
        console.log(`Test ${index + 1} (${testCase.description}):`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = {
    find132pattern
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}