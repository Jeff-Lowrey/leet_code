/**
 * 50. Pow
 * Medium
 *
 * Pow(x, n) - Calculates x raised to the power of n Time Complexity: O(log n) Space Complexity: O(log n) due to recursive call stack @param {number} x - The base number @param {number} n - The exponent @return {number} - Result of x^n
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Pow is to understand the core problem pattern
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
 * Pow(x, n) - Calculates x raised to the power of n
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursive call stack
 *
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} - Result of x^n
 */
function myPow(x, n) {
    // Handle edge cases
    if (n === 0) return 1;
    if (x === 0) return 0;
    if (x === 1) return 1;
    if (n === 1) return x;
    
    // Handle negative exponents
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    
    // Use fast power algorithm (divide and conquer)
    return fastPow(x, n);
}

/**
 * Helper function implementing fast power algorithm
 * Uses divide and conquer approach to calculate power efficiently
 *
 * @param {number} x - The base number
 * @param {number} n - The exponent
 * @return {number} - Result of x^n
 */
function fastPow(x, n) {
    // Base case
    if (n === 0) return 1;
    
    // Recursively calculate half of the power
    const half = fastPow(x, Math.floor(n / 2));
    
    // If n is odd, multiply by x one extra time
    if (n % 2 === 0) {
        return half * half;
    } else {
        return half * half * x;
    }
}

// Export the function for use in other modules
module.exports = myPow;

// Test cases
function runTests() {
    const testCases = [
        { x: 2.0, n: 10, expected: 1024.0 },
        { x: 2.1, n: 3, expected: 9.261 },
        { x: 2.0, n: -2, expected: 0.25 },
        { x: 0.0, n: 5, expected: 0.0 },
        { x: 1.0, n: 5555, expected: 1.0 },
    ];

    testCases.forEach((test, index) => {
        const result = myPow(test.x, test.n);
        const isCorrect = Math.abs(result - test.expected) < 0.0001;
        console.log(`Test ${index + 1}:`);
        console.log(`Input: x = ${test.x}, n = ${test.n}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${isCorrect ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
    });
}

// Run tests if this file is being executed directly
if (require.main === module) {
    runTests();
}