/**
 * 66. Plus
 * Medium
 *
 * Plus One - LeetCode Problem Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer. The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit. @param {number[]} digits - Array of integers representing a large number @return {number[]} - Array of integers after adding one
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Plus is to understand the core problem pattern
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
 * Plus One - LeetCode Problem
 * 
 * Given a non-empty array of decimal digits representing a non-negative integer,
 * increment one to the integer.
 * The digits are stored such that the most significant digit is at the head of the list,
 * and each element in the array contains a single digit.
 * 
 * @param {number[]} digits - Array of integers representing a large number
 * @return {number[]} - Array of integers after adding one
 */

const plusOne = function(digits) {
    // Input validation
    if (!Array.isArray(digits) || digits.length === 0) {
        throw new Error('Input must be a non-empty array of digits');
    }

    // Start from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
        // If current digit is less than 9, simply increment and return
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        // If current digit is 9, set it to 0 and continue to next digit
        digits[i] = 0;
    }

    // If we get here, it means all digits were 9
    // Create new array with length + 1 and set first digit to 1
    return [1, ...digits];
};

// Example usage and test cases
function runTests() {
    const testCases = [
        [1, 2, 3],         // Normal case
        [4, 3, 2, 1],      // Multi-digit number
        [9],               // Single digit 9
        [9, 9, 9],        // All nines
        [0],              // Zero
    ];

    console.log('Running test cases:');
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`);
        console.log('Input:', test);
        console.log('Output:', plusOne([...test]));
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = plusOne;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}