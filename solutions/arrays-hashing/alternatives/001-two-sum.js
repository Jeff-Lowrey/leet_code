/**
 * 1. Two Sum
 * Medium
 *
 * Two Sum - JavaScript Implementation Problem: Given an array of integers nums and an integer target, return indices of the two numbers in the array that add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. @author Assistant @date 2024
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Two Sum is to understand the core problem pattern
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
 * Two Sum - JavaScript Implementation
 * 
 * Problem: Given an array of integers nums and an integer target,
 * return indices of the two numbers in the array that add up to target.
 * You may assume that each input would have exactly one solution,
 * and you may not use the same element twice.
 * 
 * @author Assistant
 * @date 2024
 */

/**
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Array containing indices of the two numbers that add up to target
 */
function twoSum(nums, array) {
    // Input validation
    if (!Array.isArray(nums) || nums.length < 2) {
        throw new Error('Input must be an array with at least 2 numbers');
    }
    if (typeof target !== 'number') {
        throw new Error('Target must be a number');
    }

    // Create a hash map to store number-index pairs
    const numMap = new Map();

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in map
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        // Add current number and index to map
        numMap.set(nums[i], i);
    }

    // If no solution is found
    throw new Error('No two numbers found that add up to target');
}

/**
 * Test cases for the twoSum function
 */
function runTests() {
    try {
        // Test case 1: Basic case
        console.log('Test 1:', twoSum([2, 7, 11, 15], 9)); // Should return [0, 1]

        // Test case 2: Numbers in different order
        console.log('Test 2:', twoSum([3, 2, 4], 6)); // Should return [1, 2]

        // Test case 3: Same numbers
        console.log('Test 3:', twoSum([3, 3], 6)); // Should return [0, 1]

        // Test case 4: Negative numbers
        console.log('Test 4:', twoSum([-1, -2, -3, -4], -7)); // Should return [2, 3]

    } catch (error) {
        console.error('Test failed:', error.message);
    }
}

// Export the function for use in other modules
module.exports = {
    twoSum
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}