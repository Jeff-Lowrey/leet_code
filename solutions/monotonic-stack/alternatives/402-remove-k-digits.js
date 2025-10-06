/**
 * 402. Remove K Digits
 * Medium
 *
 * Remove K Digits Monotonic - JavaScript Implementation This solution removes k digits from a given number string to create the smallest possible number while maintaining the relative order of the remaining digits. Uses a monotonic stack approach for optimal efficiency.
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove K Digits is to understand the core problem pattern
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
 * Remove K Digits Monotonic - JavaScript Implementation
 * 
 * This solution removes k digits from a given number string to create the smallest
 * possible number while maintaining the relative order of the remaining digits.
 * Uses a monotonic stack approach for optimal efficiency.
 */

/**
 * @param {string} num - The input number as a string
 * @param {number} k - Number of digits to remove
 * @return {string} - Smallest possible number after removing k digits
 */
function removeKdigits(num, k) {
    // Handle edge cases
    if (!num || k <= 0) return num;
    if (k >= num.length) return "0";

    // Initialize stack for monotonic approach
    const stack = [];
    let remainingToRemove = k;

    // Process each digit
    for (let digit of num) {
        // Remove digits while we can and current digit is smaller than stack top
        while (remainingToRemove > 0 && 
               stack.length > 0 && 
               stack[stack.length - 1] > digit) {
            stack.pop();
            remainingToRemove--;
        }
        stack.push(digit);
    }

    // Handle any remaining removals needed
    while (remainingToRemove > 0) {
        stack.pop();
        remainingToRemove--;
    }

    // Build result string
    let result = stack.join('');

    // Remove leading zeros
    result = result.replace(/^0+/, '');

    // Handle empty result
    return result || "0";
}

/**
 * Helper function to test the implementation
 * @param {string} num - Input number string
 * @param {number} k - Number of digits to remove
 */
function testRemoveKdigits(num, k) {
    console.log(`Input: num = "${num}", k = ${k}`);
    console.log(`Output: "${removeKdigits(num, k)}"`);
    console.log('---');
}

// Test cases
function runTests() {
    testRemoveKdigits("1432219", 3);  // Expected: "1219"
    testRemoveKdigits("10200", 1);    // Expected: "200"
    testRemoveKdigits("10", 2);       // Expected: "0"
    testRemoveKdigits("112", 1);      // Expected: "11"
    testRemoveKdigits("1234567890", 9); // Expected: "0"
    testRemoveKdigits("", 1);         // Expected: ""
    testRemoveKdigits("42", 0);       // Expected: "42"
}

// Export the function for use in other modules
module.exports = {
    removeKdigits,
    runTests
};

// Uncomment to run tests
// runTests();