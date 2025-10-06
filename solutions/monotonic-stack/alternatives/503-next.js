/**
 * 503. Next
 * Medium
 *
 * Next Greater Element II - Circular Array Implementation Time Complexity: O(n), where n is the length of the input array Space Complexity: O(n) for the stack and result array @param {number[]} nums - Input array of integers @return {number[]} - Array containing next greater elements
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Next is to understand the core problem pattern
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
 * Next Greater Element II - Circular Array Implementation
 * Time Complexity: O(n), where n is the length of the input array
 * Space Complexity: O(n) for the stack and result array
 * 
 * @param {number[]} nums - Input array of integers
 * @return {number[]} - Array containing next greater elements
 */
function nextGreaterElements(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return [];
    }

    const n = nums.length;
    const result = new Array(n).fill(-1); // Initialize result array with -1
    const stack = []; // Stack to store indices

    // Iterate twice to handle circular array
    // We iterate 2n times because we need to check circular elements
    for (let i = 0; i < n * 2; i++) {
        const currentNum = nums[i % n];

        // While stack is not empty and current number is greater than number at stack's top index
        while (stack.length > 0 && nums[stack[stack.length - 1]] < currentNum) {
            const index = stack.pop();
            result[index] = currentNum;
        }

        // Only push indices for first n elements
        if (i < n) {
            stack.push(i);
        }
    }

    return result;
}

/**
 * Helper function to test the implementation
 * @param {number[]} nums - Input array
 */
function testNextGreater(nums) {
    console.log(`Input array: [${nums}]`);
    const result = nextGreaterElements(nums);
    console.log(`Next greater elements: [${result}]`);
    console.log('---');
}

// Test cases
function runTests() {
    // Test Case 1: Basic case
    testNextGreater([1, 2, 1]);

    // Test Case 2: Decreasing sequence
    testNextGreater([5, 4, 3, 2, 1]);

    // Test Case 3: Increasing sequence
    testNextGreater([1, 2, 3, 4, 5]);

    // Test Case 4: Same elements
    testNextGreater([1, 1, 1, 1]);

    // Test Case 5: Single element
    testNextGreater([1]);

    // Test Case 6: Empty array
    testNextGreater([]);
}

// Run the tests
runTests();

// Export the function for potential module usage
module.exports = {
    nextGreaterElements
};