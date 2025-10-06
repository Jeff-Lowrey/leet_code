/**
 * 268. Missing
 * Medium
 *
 * Missing Number Bit - JavaScript Implementation This solution finds the missing number in an array containing n distinct numbers taken from 0 to n using bit manipulation (XOR operation). Time Complexity: O(n) Space Complexity: O(1)
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
 * Missing Number Bit - JavaScript Implementation
 * 
 * This solution finds the missing number in an array containing n distinct numbers 
 * taken from 0 to n using bit manipulation (XOR operation).
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

/**
 * Finds the missing number in an array using XOR bit manipulation
 * @param {number[]} nums - Array of numbers from 0 to n with one number missing
 * @return {number} - The missing number
 */
function findMissingNumber(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    let result = nums.length; // Initialize with n (array length)
    
    // XOR all numbers from 0 to n with array elements
    for (let i = 0; i < nums.length; i++) {
        result ^= i ^ nums[i];
    }
    
    return result;
}

/**
 * Alternative implementation using mathematical formula
 * @param {number[]} nums - Array of numbers from 0 to n with one missing
 * @return {number} - The missing number
 */
function findMissingNumberMath(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    
    return expectedSum - actualSum;
}

// Test cases
function runTests() {
    const testCases = [
        [3, 0, 1],           // Expected: 2
        [0, 1],              // Expected: 2
        [9, 6, 4, 2, 3, 5, 7, 0, 1], // Expected: 8
        [0],                 // Expected: 1
        []                   // Expected: 0
    ];

    console.log("Running test cases...");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log(`Input: [${test}]`);
        console.log(`XOR Method Result: ${findMissingNumber(test)}`);
        console.log(`Math Method Result: ${findMissingNumberMath(test)}`);
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