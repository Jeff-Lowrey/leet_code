/**
 * 268. Missing
 * Medium
 *
 * Missing Number - JavaScript Implementation Problem: Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array. @param {number[]} nums - Array of numbers from 0 to n with one number missing @return {number} - The missing number
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Missing is to understand the core problem pattern
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
 * Missing Number - JavaScript Implementation
 * 
 * Problem: Given an array nums containing n distinct numbers in the range [0, n],
 * return the only number in the range that is missing from the array.
 * 
 * @param {number[]} nums - Array of numbers from 0 to n with one number missing
 * @return {number} - The missing number
 */

/**
 * Solution using XOR operation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const findMissingNumber = function(nums) {
    let missing = nums.length; // Initialize with n (array length)
    
    // XOR all numbers from 0 to n with array elements
    for (let i = 0; i < nums.length; i++) {
        missing ^= i ^ nums[i];
    }
    
    return missing;
};

/**
 * Alternative solution using mathematical formula
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
const findMissingNumberMath = function(nums) {
    const n = nums.length;
    // Expected sum of numbers from 0 to n
    const expectedSum = (n * (n + 1)) / 2;
    // Actual sum of array elements
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    return expectedSum - actualSum;
};

// Test cases
function runTests() {
    const testCases = [
        [3, 0, 1],           // Expected: 2
        [0, 1],              // Expected: 2
        [9, 6, 4, 2, 3, 5, 7, 0, 1], // Expected: 8
        [0],                 // Expected: 1
    ];

    console.log("Running test cases...");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${test}]`);
        console.log(`XOR Solution Output: ${findMissingNumber(test)}`);
        console.log(`Math Solution Output: ${findMissingNumberMath(test)}`);
        console.log("---");
    });
}

// Export functions for external use
module.exports = {
    findMissingNumber,
    findMissingNumberMath
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}