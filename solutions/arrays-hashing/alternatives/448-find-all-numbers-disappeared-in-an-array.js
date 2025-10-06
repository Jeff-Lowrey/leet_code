/**
 * 448. Find All Numbers Disappeared In An Array
 * Medium
 *
 * Find Disappeared Numbers Problem: Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all integers in the range [1, n] that do not appear in nums. @param {number[]} nums - Input array containing integers @return {number[]} - Array of numbers that are missing from the input array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find All Numbers Disappeared In An Array is to understand the core problem pattern
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
 * Find Disappeared Numbers
 * 
 * Problem: Given an array nums of n integers where nums[i] is in the range [1, n],
 * return an array of all integers in the range [1, n] that do not appear in nums.
 * 
 * @param {number[]} nums - Input array containing integers
 * @return {number[]} - Array of numbers that are missing from the input array
 */

/**
 * Main function to find disappeared numbers
 * Time Complexity: O(n)
 * Space Complexity: O(1) - excluding the output array
 */
function findDisappearedNumbers(nums) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return [];
    }

    const n = nums.length;
    const result = [];

    // Mark numbers that are present by making their corresponding indices negative
    for (let i = 0; i < n; i++) {
        // Get the absolute value since the number might have been marked negative
        const num = Math.abs(nums[i]);
        // Mark the number as seen by making the value at index (num-1) negative
        if (nums[num - 1] > 0) {
            nums[num - 1] *= -1;
        }
    }

    // Find indices that are still positive (these represent missing numbers)
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            // Add 1 to index to get the actual missing number
            result.push(i + 1);
        }
    }

    return result;
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [4,3,2,7,8,2,3,1],  // Expected: [5,6]
        [1,1],              // Expected: [2]
        [1,2,3,4],          // Expected: []
        [],                 // Expected: []
        [1,1,1,1],          // Expected: [2,3,4]
    ];

    testCases.forEach((test, index) => {
        const result = findDisappearedNumbers(test);
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${test}]`);
        console.log(`Output: [${result}]`);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = findDisappearedNumbers;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}