/**
 * 7. Reverse
 * Medium
 *
 * Reverse Integer - JavaScript Implementation Given a signed 32-bit integer x, returns x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, then return 0. @param {number} x - The integer to reverse @return {number} - The reversed integer, or 0 if out of range
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reverse is to understand the core problem pattern
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
 * Reverse Integer - JavaScript Implementation
 * 
 * Given a signed 32-bit integer x, returns x with its digits reversed.
 * If reversing x causes the value to go outside the signed 32-bit integer range,
 * then return 0.
 * 
 * @param {number} x - The integer to reverse
 * @return {number} - The reversed integer, or 0 if out of range
 */

const reverse = function(x) {
    // Constants for 32-bit integer limits
    const MAX_INT = 2147483647;  // 2^31 - 1
    const MIN_INT = -2147483648; // -2^31

    // Handle edge case of zero
    if (x === 0) return 0;

    // Convert to string, handle negative numbers
    const isNegative = x < 0;
    let numStr = Math.abs(x).toString();

    // Reverse the string
    let reversed = '';
    for (let i = numStr.length - 1; i >= 0; i--) {
        reversed += numStr[i];
    }

    // Convert back to number and handle negative sign
    let result = parseInt(reversed);
    if (isNegative) {
        result = -result;
    }

    // Check if result is within 32-bit integer range
    if (result > MAX_INT || result < MIN_INT) {
        return 0;
    }

    return result;
};

// Export the function for use in other modules
module.exports = reverse;

// Test cases
const testCases = [
    123,        // Expected: 321
    -123,       // Expected: -321
    120,        // Expected: 21
    0,          // Expected: 0
    1534236469, // Expected: 0 (out of range)
];

// Run test cases
console.log("Test Cases:");
testCases.forEach(test => {
    console.log(`Input: ${test}`);
    console.log(`Output: ${reverse(test)}`);
    console.log("---");
});