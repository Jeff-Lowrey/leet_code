/**
 * 238. Product Of Array Except Self
 * Medium
 *
 * Product Except Self - JavaScript Implementation Problem: Given an array nums, return an array answer where answer[i] is equal to the product of all elements in nums except nums[i]. The algorithm should run in O(n) time and without using the division operation. @param {number[]} nums - The input array of numbers @return {number[]} - Array where each element is the product of all numbers except self
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Product Of Array Except Self is to understand the core problem pattern
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
 * Product Except Self - JavaScript Implementation
 * 
 * Problem: Given an array nums, return an array answer where answer[i] 
 * is equal to the product of all elements in nums except nums[i].
 * 
 * The algorithm should run in O(n) time and without using the division operation.
 * 
 * @param {number[]} nums - The input array of numbers
 * @return {number[]} - Array where each element is the product of all numbers except self
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const productExceptSelf = function(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return [];
    if (nums.length === 1) return [0];

    const n = nums.length;
    
    // Initialize result array
    const result = new Array(n).fill(1);
    
    // Calculate products of all elements to the left of each element
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }
    
    // Calculate products of all elements to the right and combine with left products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
};

// Example usage and test cases
function runTests() {
    const testCases = [
        {
            input: [1, 2, 3, 4],
            expected: [24, 12, 8, 6],
            description: "Basic test case"
        },
        {
            input: [-1, 1, 0, -3, 3],
            expected: [0, 0, 9, 0, 0],
            description: "Test case with zero"
        },
        {
            input: [2, 2, 2, 2],
            expected: [8, 8, 8, 8],
            description: "Test case with same numbers"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = productExceptSelf(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Test ${index + 1} (${testCase.description}): ${passed ? 'PASSED' : 'FAILED'}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: [${testCase.expected}]`);
        console.log(`Got: [${result}]\n`);
    });
}

// Export the function for use in other modules
module.exports = productExceptSelf;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}